/**
 * SVG Plot Geometry & Bilingual Audit
 * ------------------------------------
 * For every content SVG figure (icons < 60px are skipped), in BOTH zh and en mode:
 *   1. CJK leak   : visible <text>/<tspan> containing CJK while data-lang="en"
 *   2. Overlap    : two visible <text> boxes intersecting (> 20% of the smaller box)
 *   3. Overflow   : visible <text> box extending outside the SVG viewport
 *   4. Empty      : SVG with zero visible text in a language mode (missing translation)
 * Screenshots of each figure in each language are written to tests/screenshots/svg_audit/.
 *
 * Usage: node scripts/audit_svg_plots.js [--no-shots]
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');

const SHOTS = !process.argv.includes('--no-shots');

(async () => {
  const indexPath = path.resolve(__dirname, '../index.html');
  const shotDir = path.resolve(__dirname, '../tests/screenshots/svg_audit');
  if (SHOTS) fs.mkdirSync(shotDir, { recursive: true });

  const executablePath = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
    ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox', '--disable-gpu'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
  await page.goto('file:///' + indexPath.replace(/\\/g, '/'), { waitUntil: 'load' });
  await page.waitForTimeout(800);

  // Expand every collapsible section so all figures are laid out
  await page.evaluate(() => {
    document.querySelectorAll('.collapsed').forEach(el => el.classList.remove('collapsed'));
    document.querySelectorAll('.collapse-body').forEach(el => { el.style.display = ''; el.style.maxHeight = 'none'; });
  });

  let totalIssues = 0;
  const report = [];

  for (const lang of ['zh', 'en']) {
    await page.evaluate(l => document.documentElement.setAttribute('data-lang', l), lang);
    await page.waitForTimeout(300);

    const results = await page.evaluate((lang) => {
      const CJK = /[\u3400-\u9fff\uf900-\ufaff]/;
      const vis = el => {
        let n = el;
        while (n && n.nodeType === 1) {
          const cs = getComputedStyle(n);
          if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return false;
          n = n.parentElement;
        }
        return true;
      };
      const out = [];
      const svgs = [...document.querySelectorAll('main svg, section svg')].filter(s => {
        const r = s.getBoundingClientRect();
        return r.width >= 60 && r.height >= 60 && !s.closest('.zoom-badge') && vis(s);
      });
      svgs.forEach((svg, idx) => {
        const sec = svg.closest('section');
        const cap = svg.closest('figure')?.querySelector('figcaption')?.innerText.trim().split('\n')[0]
          || svg.parentElement.querySelector('figcaption')?.innerText.trim().split('\n')[0] || '';
        const id = svg.id || `svg#${idx}`;
        const sr = svg.getBoundingClientRect();
        // leaf text-bearing elements: <text> without tspan children, or tspans
        const texts = [...svg.querySelectorAll('text, tspan')].filter(t => {
          if (t.tagName === 'text' && t.querySelector('tspan')) return false;
          return t.textContent.trim() && vis(t);
        });
        const boxes = texts.map(t => {
          const r = t.getBoundingClientRect();
          return { t: t.textContent.trim().slice(0, 50), x: r.left, y: r.top, w: r.width, h: r.height };
        }).filter(b => b.w > 0 && b.h > 0);
        const issues = [];
        if (!boxes.length) issues.push({ type: 'EMPTY', msg: 'no visible text' });
        if (lang === 'en') boxes.filter(b => CJK.test(b.t)).forEach(b => issues.push({ type: 'CJK', msg: b.t }));
        const tol = 1.5;
        boxes.forEach(b => {
          if (b.x < sr.left - tol || b.y < sr.top - tol || b.x + b.w > sr.right + tol || b.y + b.h > sr.bottom + tol)
            issues.push({ type: 'OVERFLOW', msg: b.t });
        });
        for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
          const a = boxes[i], b = boxes[j];
          const ix = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
          const iy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
          if (ix <= 0 || iy <= 0) continue;
          const minArea = Math.min(a.w * a.h, b.w * b.h);
          if ((ix * iy) / minArea > 0.2) issues.push({ type: 'OVERLAP', msg: `"${a.t}" ⟷ "${b.t}"` });
        }
        svg.setAttribute('data-audit-idx', idx);
        out.push({ idx, id, sec: sec ? sec.id : '?', cap, nText: boxes.length, issues });
      });
      return out;
    }, lang);

    for (const r of results) {
      totalIssues += r.issues.length;
      report.push({ lang, ...r });
      if (SHOTS) {
        const h = await page.$(`svg[data-audit-idx="${r.idx}"]`);
        if (h) {
          await h.scrollIntoViewIfNeeded();
          await h.screenshot({ path: path.join(shotDir, `${lang}_${String(r.idx).padStart(2, '0')}_${r.sec}_${r.id.replace(/[^\w-]/g, '')}.png`) });
        }
      }
    }
  }
  await browser.close();

  console.log('================ SVG PLOT AUDIT ================');
  for (const r of report) {
    const tag = r.issues.length ? '❌' : '✓';
    console.log(`${tag} [${r.lang}] #${r.idx} ${r.sec} ${r.id} (${r.nText} texts) ${r.cap.slice(0, 70)}`);
    const byType = {};
    r.issues.forEach(i => (byType[i.type] = byType[i.type] || []).push(i.msg));
    for (const [t, msgs] of Object.entries(byType)) {
      console.log(`     ${t} x${msgs.length}: ${msgs.slice(0, 6).join(' | ')}${msgs.length > 6 ? ' …' : ''}`);
    }
  }
  console.log(`================ TOTAL ISSUES: ${totalIssues} ================`);
  process.exit(totalIssues ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
