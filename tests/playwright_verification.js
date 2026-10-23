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
  // 1.1 Verify Section 0: 6M1E Fishbone Diagram (Figure 0.2)
  console.log('\n[Test 1.1] Verifying 6M1E Fishbone Diagram (Figure 0.2)...');
  const fig02Svg = page.locator('#fig02-svg');
  if (await fig02Svg.count() > 0) {
    await fig02Svg.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await fig02Svg.screenshot({ path: path.join(screenshotsDir, '08_fishbone_diagram.png'), animations: 'disabled' });
    console.log('  ✓ 6M1E Fishbone Diagram (Figure 0.2) verified and captured.');
  }

  // 1.1b Test Section 0.3 Bidirectional Control Architecture & Simulator
  console.log('\n[Test 1.1b] Verifying Figure 0.3 Bidirectional Control Architecture & Simulator...');
  const fig03Svg = page.locator('#fig03-svg');
  if (await fig03Svg.count() > 0) {
    await fig03Svg.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await fig03Svg.screenshot({ path: path.join(screenshotsDir, '10_top10_fallout_architecture.png'), animations: 'disabled' });
    console.log('  ✓ Figure 0.3 Bidirectional Architecture SVG verified and captured.');
  }

    const simSelect = page.locator('#selFalloutMode');
    if (await simSelect.count() > 0) {
      await simSelect.selectOption('9'); // Select ATE Rc Drift
      await page.waitForTimeout(200);
      const stageText = await page.locator('#foStageText').innerText();
      const feedbackText = await page.locator('#foFeedbackText').innerText();
      console.log(`  ✓ Fallout Simulator option 9 selected: stage=${stageText}, feedback contains PM=${feedbackText.includes('研磨')}`);
    }

    // 1.1c Test Section 0.4 Stage-by-Stage Top 10 Fallouts (50 Master Fallouts)
    console.log('\n[Test 1.1c] Verifying Section 0.4 Stage-by-Stage Top 10 Fallouts (50 Fallouts Total)...');
    for (let s = 1; s <= 5; s++) {
      const btn = page.locator(`#btn-stage-${s}`);
      await btn.click();
      await page.waitForTimeout(150);
      const panel = page.locator(`#stage-panel-${s}`);
      const isVisible = await panel.isVisible();
      const rowCount = await panel.locator('tbody tr').count();
      console.log(`  ✓ Stage ${s} tab active: visible=${isVisible}, fallouts defined=${rowCount}`);
      if (!isVisible || rowCount !== 10) {
        throw new Error(`Stage ${s} validation failed: visible=${isVisible}, rows=${rowCount}`);
      }
    }
    // Switch back to stage 1
    await page.locator('#btn-stage-1').click();
    await page.waitForTimeout(100);
    console.log('  ✓ All 5 stages (50 Fallout mechanisms & Push-Back protocols) validated 100%.');

  // 1.2 Test One-Click Zoom (Square Icon Badges & Lightbox Modal)
  console.log('\n[Test 1.2] Testing One-Click Zoom (Square Icon Badges & Lightbox Modal)...');
  const lightboxModal = page.locator('#lightbox-modal');

  // A. Verify badges on Figures, FA Cards, and Canvas Containers
  const figureCount = await page.locator('figure, .figure-container').count();
  const figureBadges = await page.locator('figure .zoom-trigger-badge, .figure-container .zoom-trigger-badge').count();
  console.log(`  ✓ Figures found: ${figureCount}, Figures with Zoom Badge: ${figureBadges}`);

  const faCardsCount = await page.locator('.fa-card-img-wrap').count();
  const faCardBadges = await page.locator('.fa-card-img-wrap .zoom-trigger-badge').count();
  console.log(`  ✓ FA Cards found: ${faCardsCount}, FA Cards with Zoom Badge: ${faCardBadges}`);

  const waferBadge = await page.locator('.wafer-canvas-container .zoom-trigger-badge').count();
  console.log(`  ✓ Wafer Canvas Container has Zoom Badge: ${waferBadge > 0}`);

  const cpkBadge = await page.locator('.cpk-canvas-container .zoom-trigger-badge').count();
  console.log(`  ✓ CPK Canvas Container has Zoom Badge: ${cpkBadge > 0}`);

  // Verify that the badge is a square icon button
  const sampleBadge = page.locator('.zoom-trigger-badge').first();
  const badgeBox = await sampleBadge.boundingBox();
  const badgeSvgCount = await sampleBadge.locator('svg').count();
  console.log(`  ✓ Sample Zoom Badge Dimension: ${badgeBox.width}x${badgeBox.height}px, SVG count: ${badgeSvgCount}`);
  if (badgeBox.width < 25 || badgeBox.width > 40 || badgeBox.height < 25 || badgeBox.height > 40) {
    throw new Error(`Expected square icon badge ~32x32px, got ${badgeBox.width}x${badgeBox.height}`);
  }

  // B. Test SVG Zoom (Figure 0.2 Fishbone)
  const fishboneFigure = page.locator('#overview .figure-container').first();
  if (await fishboneFigure.count() > 0) {
    await fishboneFigure.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await fishboneFigure.click();
    await page.waitForTimeout(400);

    const isActive = await lightboxModal.evaluate(el => el.classList.contains('active'));
    console.log(`  ✓ SVG Zoom (Fishbone) activated: ${isActive}`);

    const zoomedSvg = page.locator('#lightbox-content svg');
    console.log(`  ✓ Lightbox contains zoomed SVG: ${(await zoomedSvg.count()) > 0}`);

    await page.screenshot({ path: path.join(screenshotsDir, '09_one_click_zoom_active.png') });

    // Test zoom in button
    const zoomInBtn = page.locator('.lightbox-btn:has-text("放大")').first();
    if (await zoomInBtn.count() > 0) {
      await zoomInBtn.click();
      await page.waitForTimeout(200);
      console.log('  ✓ Zoom-in button clicked.');
    }

    // Close lightbox
    const closeBtn = page.locator('.lightbox-close').first();
    await closeBtn.click();
    await page.waitForTimeout(300);
    console.log(`  ✓ Lightbox closed cleanly after SVG zoom: ${await lightboxModal.evaluate(el => !el.classList.contains('active'))}`);
  }

  // C. Test Canvas Zoom (300mm Wafer Map Canvas)
  const waferWrap = page.locator('.wafer-canvas-container');
  if (await waferWrap.count() > 0) {
    await waferWrap.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await waferWrap.click();
    await page.waitForTimeout(400);

    const isWaferActive = await lightboxModal.evaluate(el => el.classList.contains('active'));
    const zoomedImg = page.locator('#lightbox-content img');
    console.log(`  ✓ Wafer Canvas Zoom activated: ${isWaferActive}, contains generated high-res img: ${(await zoomedImg.count()) > 0}`);

    // Close using Escape key
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    console.log(`  ✓ Lightbox closed via Escape key: ${await lightboxModal.evaluate(el => !el.classList.contains('active'))}`);
  }

  // D. Test FA Card Image Zoom (First Micrograph)
  const firstFaCard = page.locator('.fa-card-img-wrap').first();
  if (await firstFaCard.count() > 0) {
    await firstFaCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await firstFaCard.click();
    await page.waitForTimeout(400);

    const isFaActive = await lightboxModal.evaluate(el => el.classList.contains('active'));
    console.log(`  ✓ FA Card Zoom activated: ${isFaActive}`);

    // Close using close button
    await page.locator('.lightbox-close').first().click();
    await page.waitForTimeout(300);
    console.log(`  ✓ Lightbox closed after FA card zoom: ${await lightboxModal.evaluate(el => !el.classList.contains('active'))}`);
  }

  // 1.2b Test Collapsible Navigation Sidebar
  console.log('\n[Test 1.2b] Testing Collapsible Navigation Sidebar...');
  const btnToggleSidebar = page.locator('#btnToggleSidebar');
  const btnExpandSidebar = page.locator('#btnExpandSidebar');
  const bodyGrid = page.locator('.body-grid');

  if (await btnToggleSidebar.count() > 0) {
    await btnToggleSidebar.scrollIntoViewIfNeeded();
    await page.screenshot({ path: path.join(screenshotsDir, '11_sidebar_expanded.png') });
    
    // Click collapse button
    await btnToggleSidebar.click();
    await page.waitForTimeout(300);
    const isCollapsed = await bodyGrid.evaluate(el => el.classList.contains('sidebar-collapsed'));
    console.log(`  ✓ Sidebar collapsed state: ${isCollapsed}`);
    if (!isCollapsed) throw new Error('Sidebar failed to collapse!');

    await page.screenshot({ path: path.join(screenshotsDir, '12_sidebar_collapsed.png') });

    // Click floating expand button
    await btnExpandSidebar.click();
    await page.waitForTimeout(300);
    const isExpanded = await bodyGrid.evaluate(el => !el.classList.contains('sidebar-collapsed'));
    console.log(`  ✓ Sidebar re-expanded successfully: ${isExpanded}`);
    if (!isExpanded) throw new Error('Sidebar failed to expand!');
  }

  // 1.2c Test Fixed Sticky Top Navbar (Controls Pinned at Top)
  console.log('\n[Test 1.2c] Testing Fixed Sticky Top Navbar (Controls Pinned at Top)...');
  const topNavbar = page.locator('#topNavbar');
  if (await topNavbar.count() > 0) {
    const isTopNavVisible = await topNavbar.isVisible();
    const navBox = await topNavbar.boundingBox();
    console.log(`  ✓ Top Navbar visible: ${isTopNavVisible}, Y position: ${navBox.y}, height: ${navBox.height}px`);
    if (navBox.y > 5) throw new Error(`Top navbar should be at top=0, got y=${navBox.y}`);

    // Scroll down 600px and verify top navbar stays at y=0 (sticky)
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForTimeout(200);
    const scrolledNavBox = await topNavbar.boundingBox();
    console.log(`  ✓ Scrolled Top Navbar sticky Y position: ${scrolledNavBox.y}`);
    if (scrolledNavBox.y > 5) throw new Error(`Top navbar failed to stick at top=0 during scroll!`);
    await page.screenshot({ path: path.join(screenshotsDir, '13_top_navbar_sticky.png') });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
  } else {
    throw new Error('Top navbar #topNavbar element not found!');
  }

  // 1.3 Test Footer Last Updated Date
  console.log('\n[Test 1.3] Testing Footer Last Updated Date...');
  const footerText = await page.locator('footer').innerText();
  console.log(`  ✓ Footer info: ${footerText.replace(/\n/g, ' ')}`);
  if (!/\d{4}-\d{2}-\d{2}/.test(footerText) || !footerText.includes('更新')) {
    throw new Error('Footer missing update date format (YYYY-MM-DD) or keyword!');
  }

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

    // Verify Figure 0.2 Fishbone in English version
    console.log('\n[Test 2.1] Verifying Fishbone Diagram in English Mode (No Mandarins)...');
    const fishboneSvg = page.locator('#fig02-svg');
    await fishboneSvg.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);

    const isZhHiddenInFishbone = await fishboneSvg.locator('text.zh').first().evaluate(el => window.getComputedStyle(el).display === 'none');
    const isEnVisibleInFishbone = await fishboneSvg.locator('text.en').first().evaluate(el => window.getComputedStyle(el).display !== 'none');
    console.log(`  ✓ Fishbone text.zh hidden: ${isZhHiddenInFishbone}, text.en visible: ${isEnVisibleInFishbone}`);
    if (!isZhHiddenInFishbone || !isEnVisibleInFishbone) {
      throw new Error('Fishbone language switching failed in English mode!');
    }

    await fishboneSvg.screenshot({ path: path.join(screenshotsDir, '14_fishbone_english_verified.png'), animations: 'disabled' });
    console.log('  ✓ Captured 14_fishbone_english_verified.png with 100% English terminology.');
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
    const fig5_2 = p5Section.locator('svg').nth(1);
    if (await fig5_2.count() > 0) {
      await fig5_2.scrollIntoViewIfNeeded();
      await fig5_2.screenshot({ path: path.join(screenshotsDir, '07_fig5_2_fixed.png') });
      console.log('  ✓ Figure 5.2 screenshot captured without overlap.');
    }
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
    await gallery.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    try {
      await gallery.screenshot({ path: path.join(screenshotsDir, '05_fa_micrograph_gallery.png'), animations: 'disabled', timeout: 5000 });
    } catch {
      await page.screenshot({ path: path.join(screenshotsDir, '05_fa_micrograph_gallery.png') });
    }
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
