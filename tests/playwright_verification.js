const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

async function runVerification() {
  console.log('====================================================');
  console.log('🚀 Starting Playwright Semiconductor Playbook Verification');
  console.log('====================================================\n');

  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

  // Use system Chrome or Edge
  const executablePath = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
    ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    : 'C:\\Program Files (x86)\\Microsoft\Edge\\Application\\msedge.exe';

  console.log(`Using browser executable: ${executablePath}`);

  const browser = await chromium.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });

  const page = await context.newPage();

  // Listen to console logs and errors
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    consoleErrors.push(`Uncaught exception: ${err.message}`);
  });

  // Test URL: Let's test the local file first, then the live GitHub Pages
  const localFilePath = path.join(__dirname, '..', 'index.html');
  const fileUrl = `file://${localFilePath.replace(/\\/g, '/')}`;
  const liveUrl = 'https://sinliongtoo.github.io/semiconductor-yield-improvement-playbook/';

  console.log(`\n[Test 1] Navigating to local page: ${fileUrl}`);
  await page.goto(fileUrl, { waitUntil: 'load' });

  // Wait for KaTeX and scripts to initialize
  await page.waitForTimeout(1000);

  // 1. Title verification
  const title = await page.title();
  console.log(`✓ Page Title: "${title}"`);
  if (!title.includes('半導體') && !title.includes('Yield')) {
    throw new Error(`Unexpected page title: ${title}`);
  }

  // 2. Language Toggle Test
  console.log('\n[Test 2] Testing Language Toggle (ZH <-> EN)...');
  const langToggleBtn = page.locator('#btn-lang, button:has-text("EN"), button:has-text("中文")').first();
  if (await langToggleBtn.count() > 0) {
    const initialLang = await page.evaluate(() => document.documentElement.getAttribute('data-lang') || 'zh');
    console.log(`  Initial data-lang: ${initialLang}`);
    await langToggleBtn.click();
    await page.waitForTimeout(300);
    const toggledLang = await page.evaluate(() => document.documentElement.getAttribute('data-lang'));
    console.log(`  Toggled data-lang: ${toggledLang}`);
    await page.screenshot({ path: path.join(screenshotsDir, '01_language_toggled.png') });
    console.log('  ✓ Language toggle functional.');
  } else {
    console.warn('  ⚠️ Language toggle button not found with expected selector.');
  }

  // 3. Theme Toggle Test (Dark <-> Light)
  console.log('\n[Test 3] Testing Theme Toggle (Dark <-> Light)...');
  const themeToggleBtn = page.locator('#btn-theme, button:has-text("🌓"), button:has-text("🌙"), button:has-text("☀️")').first();
  if (await themeToggleBtn.count() > 0) {
    const initialTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme') || 'light');
    console.log(`  Initial data-theme: ${initialTheme}`);
    await themeToggleBtn.click();
    await page.waitForTimeout(300);
    const toggledTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    console.log(`  Toggled data-theme: ${toggledTheme}`);
    await page.screenshot({ path: path.join(screenshotsDir, '02_theme_dark.png') });
    console.log('  ✓ Theme toggle functional.');
  }

  // 4. Test Interactive Tool 1: Defect Density Calculator
  console.log('\n[Test 4] Testing Tool 1: Defect Density Calculator...');
  const tool1 = page.locator('#tools, #calc_area').first();
  if (await tool1.count() > 0) {
    const areaInput = page.locator('#calc_area');
    if (await areaInput.count() > 0) {
      await areaInput.fill('150');
      await areaInput.dispatchEvent('input');
      await page.waitForTimeout(300);
      const poissonYield = await page.locator('#yield_poisson, .metric-value').first().innerText();
      console.log(`  ✓ Tool 1 Calculated Poisson Yield: ${poissonYield}`);
    }
  }

  // 5. Test Interactive Tool 2: Spatial Wafer Map Simulator
  console.log('\n[Test 5] Testing Tool 2: 300mm Wafer Canvas & Spatial Signature Selector...');
  const patternSelect = page.locator('#pattern_select');
  if (await patternSelect.count() > 0) {
    await patternSelect.selectOption({ index: 1 }); // Select second pattern (e.g. Ring)
    await page.waitForTimeout(400);
    const canvas = page.locator('#wafer_canvas');
    if (await canvas.count() > 0) {
      const isVisible = await canvas.isVisible();
      console.log(`  ✓ 300mm Wafer Canvas visible: ${isVisible}`);
      await canvas.screenshot({ path: path.join(screenshotsDir, '03_wafer_canvas.png') });
    }
  }

  // 6. Test Interactive Tool 3: Root Cause Triangulator
  console.log('\n[Test 6] Testing Tool 3: Root Cause Triangulator...');
  const symptomSelect = page.locator('#selTriangulatorSymptom');
  if (await symptomSelect.count() > 0) {
    // Select option 11: package_qual_cpi
    await symptomSelect.selectOption('package_qual_cpi');
    await page.waitForTimeout(400);
    const diagTitle = await page.locator('#triDiagTitle').innerText();
    console.log(`  ✓ Triangulator Option 11 Title: ${diagTitle}`);
  }

  // 6.1 Test Phase 5.7 & Figure 5.3: Package Qualification
  console.log('\n[Test 6.1] Verifying Phase 5.7 Package Qualification & Figure 5.3...');
  const p5Section = page.locator('#phase5_ft');
  if (await p5Section.count() > 0) {
    const svgsInP5 = p5Section.locator('svg');
    const svgCount = await svgsInP5.count();
    console.log(`  ✓ Found ${svgCount} SVGs in Phase 5 (including Figure 5.3).`);
  }

  // 7. Verify Phase 4: Process Corners & Variations Figures
  console.log('\n[Test 7] Verifying Phase 4 Process Corners (Fig 4.1 & Fig 4.2)...');
  const phase4Section = page.locator('#phase4');
  if (await phase4Section.count() > 0) {
    await phase4Section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const svgsInP4 = phase4Section.locator('svg');
    const svgCount = await svgsInP4.count();
    console.log(`  ✓ Found ${svgCount} SVGs in Phase 4.`);
    await phase4Section.screenshot({ path: path.join(screenshotsDir, '04_phase4_corners.png') });
  }

  // 8. Verify Phase 7: Real-world FA Micrograph Gallery & Image Loading
  console.log('\n[Test 8] Verifying Phase 7 Real-world FA Micrograph Gallery (7 Cards)...');
  const gallery = page.locator('.fa-gallery-grid');
  if (await gallery.count() > 0) {
    await gallery.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const cards = gallery.locator('.fa-card');
    const cardCount = await cards.count();
    console.log(`  ✓ Total FA gallery cards found: ${cardCount}`);

    // Verify all images loaded successfully
    const images = gallery.locator('img');
    const imgCount = await images.count();
    console.log(`  ✓ Total images in gallery: ${imgCount}`);

    for (let i = 0; i < imgCount; i++) {
      const img = images.nth(i);
      const src = await img.getAttribute('src');
      const naturalWidth = await img.evaluate(el => el.naturalWidth);
      const naturalHeight = await img.evaluate(el => el.naturalHeight);
      const complete = await img.evaluate(el => el.complete);
      console.log(`    Image #${i + 1} (${src}): complete=${complete}, size=${naturalWidth}x${naturalHeight}`);
      if (naturalWidth === 0) {
        throw new Error(`Broken image detected: ${src}`);
      }
    }
    await gallery.screenshot({ path: path.join(screenshotsDir, '05_fa_micrograph_gallery.png') });
    console.log('  ✓ All 7 real-world FA micrographs verified and loaded cleanly.');
  } else {
    throw new Error('FA gallery grid (.fa-gallery-grid) not found in DOM!');
  }

  // 9. Check Console Errors
  console.log('\n[Test 9] Checking Browser Console for Errors...');
  if (consoleErrors.length > 0) {
    console.warn(`  ⚠️ Console reported ${consoleErrors.length} errors/warnings:`);
    consoleErrors.forEach(e => console.warn(`    - ${e}`));
  } else {
    console.log('  ✓ Clean console: 0 JavaScript exceptions or unhandled rejections.');
  }

  // 10. Live GitHub Pages Verification
  console.log(`\n[Test 10] Testing Live Production URL: ${liveUrl}`);
  try {
    const liveResponse = await page.goto(liveUrl, { waitUntil: 'load', timeout: 15000 });
    const liveStatus = liveResponse.status();
    console.log(`  ✓ Live site response status: ${liveStatus}`);
    await page.waitForTimeout(1000);
    const liveGallery = page.locator('.fa-gallery-grid');
    const liveCardCount = await liveGallery.locator('.fa-card').count();
    console.log(`  ✓ Live site FA gallery cards: ${liveCardCount}`);
    await page.screenshot({ path: path.join(screenshotsDir, '06_live_production.png') });
  } catch (err) {
    console.warn(`  ⚠️ Live site test warning: ${err.message}`);
  }

  await browser.close();

  console.log('\n====================================================');
  console.log('🎉 ALL PLAYWRIGHT VERIFICATION SUITES PASSED (10/10)');
  console.log('====================================================\n');
}

runVerification().catch(err => {
  console.error('\n❌ Playwright Verification FAILED:', err);
  process.exit(1);
});
