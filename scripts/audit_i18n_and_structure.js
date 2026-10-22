const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');

async function runAudit() {
  console.log('====================================================');
  console.log('🔍 Comprehensive Bilingual Parity & Structural Audit');
  console.log('====================================================\n');

  const indexPath = path.resolve(__dirname, '../index.html');
  const html = fs.readFileSync(indexPath, 'utf8');
  let errors = 0;
  let warnings = 0;

  // ----------------------------------------------------
  // TEST 1: Static Numbering & Hierarchy Audit
  // ----------------------------------------------------
  console.log('[Audit 1] Verifying Section & Subsection Numbering Integrity...');
  
  // Match sections like id="phase0", id="phase1", id="phase8_rma", etc.
  const sectionRegex = /<section\s+id="([^"]+)"[^>]*>([\s\S]*?)(?=<section\s+id=|$)/gi;
  let secMatch;
  
  while ((secMatch = sectionRegex.exec(html)) !== null) {
    const secId = secMatch[1];
    const secBody = secMatch[2];

    // Extract phase number if section is a phase (e.g., phase0, phase5_ft, phase8_rma)
    const phaseMatch = secId.match(/^phase(\d+)/i);
    if (!phaseMatch) continue;

    const expectedPhaseNum = parseInt(phaseMatch[1], 10);
    
    // Find all h3 headings inside this section
    const h3Regex = /<h3[^>]*>([\s\S]*?)<\/h3>/gi;
    let h3Match;
    
    while ((h3Match = h3Regex.exec(secBody)) !== null) {
      const h3Content = h3Match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      
      // Look for subsection number patterns like "7.1", "8.2", "0.3"
      const numMatch = h3Content.match(/^(\d+)\.(\d+)/);
      if (numMatch) {
        const actualPhaseNum = parseInt(numMatch[1], 10);
        const subNum = parseInt(numMatch[2], 10);

        if (actualPhaseNum !== expectedPhaseNum) {
          console.error(`  ❌ Numbering Mismatch in <section id="${secId}">:`);
          console.error(`     Found heading: "${h3Content}"`);
          console.error(`     Expected prefix: ${expectedPhaseNum}.${subNum}, but found ${actualPhaseNum}.${subNum}\n`);
          errors++;
        } else {
          console.log(`  ✓ Valid subsection: [${secId}] ${actualPhaseNum}.${subNum}`);
        }
      }
    }
  }

  // ----------------------------------------------------
  // TEST 2: Static Table Row Localization Tag Audit
  // ----------------------------------------------------
  console.log('\n[Audit 2] Auditing Table Data Cells for Bilingual Wrappers (.zh / .en)...');
  
  // Regex to check tbody tr
  const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let trMatch;
  let totalCells = 0;
  let unlocalizedCells = 0;

  while ((trMatch = trRegex.exec(html)) !== null) {
    const rowContent = trMatch[1];
    const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
    let tdMatch;

    while ((tdMatch = tdRegex.exec(rowContent)) !== null) {
      totalCells++;
      const cellContent = tdMatch[1].trim();

      // If cell contains Chinese characters, it MUST contain class="zh"
      const hasChinese = /[\u4e00-\u9fa5]/.test(cellContent);
      const hasZhClass = cellContent.includes('class="zh"') || cellContent.includes("class='zh'");

      if (hasChinese && !hasZhClass) {
        // Exclude purely inline code/math if any
        console.error(`  ❌ Table cell contains Chinese without <span class="zh"> wrapper:`);
        console.error(`     Snippet: ${cellContent.slice(0, 100).replace(/\s+/g, ' ')}...\n`);
        unlocalizedCells++;
        errors++;
      }
    }
  }

  if (unlocalizedCells === 0) {
    console.log(`  ✓ All ${totalCells} table cells verified with proper bilingual encapsulation.`);
  }

  // ----------------------------------------------------
  // TEST 3: Dynamic Playwright Crawler for English Leakage
  // ----------------------------------------------------
  console.log('\n[Audit 3] Launching Headless Browser to Crawl EN Mode for Untranslated Text...');
  
  const executablePath = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
    ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

  const browser = await chromium.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const fileUrl = 'file:///' + indexPath.replace(/\\/g, '/');
  await page.goto(fileUrl);

  // Switch to English mode
  await page.click('#langToggle');
  const activeLang = await page.getAttribute('html', 'data-lang');
  if (activeLang !== 'en') {
    console.error('  ❌ Failed to toggle into data-lang="en" mode.');
    errors++;
  } else {
    console.log('  ✓ Browser successfully toggled to data-lang="en".');
  }

  // Sections to scan
  const sectionIds = [
    'overview', 'tools', 'phase0', 'phase1', 'phase2', 'phase3_nonproc',
    'phase4', 'phase5_ft', 'phase6_cpk', 'phase7_fa', 'phase8_rma',
    'phase9_action', 'phase10_ramp', 'appendices'
  ];

  let enLeakCount = 0;

  for (const secId of sectionIds) {
    const secHandle = await page.$(`#${secId}`);
    if (!secHandle) {
      console.error(`  ❌ Missing section in DOM: #${secId}`);
      errors++;
      continue;
    }

    // Evaluate visible text inside the section
    const visibleChineseSnippets = await page.evaluate((id) => {
      const sec = document.getElementById(id);
      if (!sec) return [];

      const leaks = [];
      // Traverse all text nodes
      const walker = document.createTreeWalker(sec, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => {
          // Check if parent element is hidden
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          
          // Check computed style
          const style = window.getComputedStyle(parent);
          if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
            return NodeFilter.FILTER_REJECT;
          }

          // Check if inside SVG with class="zh" hidden
          if (parent.closest('.zh') || parent.classList.contains('zh')) {
            return NodeFilter.FILTER_REJECT;
          }

          const txt = node.textContent.trim();
          if (/[\u4e00-\u9fa5]/.test(txt)) {
            return NodeFilter.FILTER_ACCEPT;
          }
          return NodeFilter.FILTER_SKIP;
        }
      });

      let currentNode;
      while ((currentNode = walker.nextNode())) {
        const text = currentNode.textContent.trim();
        const parentTag = currentNode.parentElement.tagName.toLowerCase();
        const parentClass = currentNode.parentElement.className || '';
        leaks.push({ text, parentTag, parentClass });
      }

      return leaks;
    }, secId);

    if (visibleChineseSnippets.length > 0) {
      console.error(`  ❌ Chinese Leaks detected in English mode under #${secId} (${visibleChineseSnippets.length} occurrences):`);
      visibleChineseSnippets.slice(0, 5).forEach((leak, idx) => {
        console.error(`     [${idx + 1}] <${leak.parentTag} class="${leak.parentClass}">: "${leak.text.slice(0, 80)}"`);
      });
      if (visibleChineseSnippets.length > 5) {
        console.error(`     ... and ${visibleChineseSnippets.length - 5} more.`);
      }
      enLeakCount += visibleChineseSnippets.length;
      errors++;
    } else {
      console.log(`  ✓ Section #${secId}: 0 untranslated Chinese leaks in English mode.`);
    }
  }

  await browser.close();

  console.log('\n====================================================');
  if (errors === 0) {
    console.log('🎉 AUDIT PASSED: Zero Numbering Drift, Zero Chinese Leaks in English Mode!');
    console.log('====================================================');
    process.exit(0);
  } else {
    console.error(`🚨 AUDIT FAILED with ${errors} error(s)! Please resolve before shipping.`);
    console.log('====================================================');
    process.exit(1);
  }
}

runAudit().catch(err => {
  console.error('Fatal audit failure:', err);
  process.exit(1);
});
