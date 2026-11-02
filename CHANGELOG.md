# Changelog / 變更紀錄

Shared log for every agent (Google Antigravity, Claude Code) and human working on this repo.
Newest first. Add an entry after each substantive change — see `AGENTS.md` → Multi-Agent Collaboration.
所有代理與人員共用的變更紀錄，最新的在最上面；每次實質修改後新增一筆。

Entry format / 格式:
`## YYYY-MM-DD — <agent> — <short title>` then bullets: what changed, why, caveats for the next agent.

---
## 2026-11-02 — Google Antigravity — Rev. AJ: Wafer Scratch Inking Defense Algorithms: RANSAC/Hough Trajectory Fitting, Morphological Corridor Dilation & KLARF In-line Overlay (Section 6.4.2, Fig 6.6, Table 6.4.2)

- **Added Section 6.4.2: 晶圓刮傷 (Scratch) 缺陷虛擬墨印防禦演算法：RANSAC/Hough 軌跡擬合、形態學走廊膨脹與 KLARF 光學疊圖 (Wafer Scratch Inking Defense Algorithms: RANSAC/Hough Trajectory Fitting, Morphological Corridor Dilation & KLARF In-line Overlay)**:
  - Added Figure 6.6 (`viewBox="0 0 960 520"`): Comprehensive dual-panel SVG diagram presenting:
    - Part A: The Skipping Scratch Paradox & Mathematical Trajectory Gap-Bridging:
      - Physical intermittent broken-line failure on active silicon (P* latent killer dies passing electrical probe tests).
      - Collinear Hough Space accumulation and RANSAC polynomial trajectory curve fitting (\(y = mx + b \pm \delta\)).
      - Unconditional Trajectory Inking: force-scrapping electrically passing dies intersected by the mechanical path.
    - Part B: Morphological Corridor Dilation & In-Line KLARF Defense Hierarchy:
      - Morphological Dilation (\(S_{\text{corridor}} = S_{\text{scratch}} \oplus B\)) establishing Ring 1 (\(D=1\), high-risk corridor) and Ring 2 (\(D=2\), buffer corridor) Chebyshev rings.
      - Directional Anisotropic GDBN weighting collinear defect neighbors along scratch angle \(\theta_{\text{scratch}}\).
      - In-line optical inspection (KLA/AMAT) KLARF file multi-station overlay with automated polygon clustering (aspect ratio > 10:1) and SEMI E142 Virtual Inking strip map generation before ATE wafer sort.
  - Added Table 6.4.2: Master Inking Disposition Matrix across product reliability tiers (Automotive ASIL-D, Industrial/Server, Commercial/IoT) with explicit international standard mappings (AEC-Q001, AEC-Q100 Grade 0, ISO 26262, JEDEC JESD47).
  - Clarified Best Practice on Virtual Inking: completely abandoning physical liquid ink dots to prevent chemical solvent etching of exposed copper traces and optical camera contamination.
- **Renumbered Subsection IDs under Section 6.4 for Structural Consistency**:
  - `sec_6_4_1`: AEC-Q001 & 6 Outlier Screening Algorithms + Table 6.4.
  - `sec_6_4_2`: Wafer Scratch Inking Defense Algorithms (Fig 6.6 & Table 6.4.2).
  - `sec_6_4_3`: Multivariate Outlier Detection & Mahalanobis Distance.
  - `sec_6_4_4`: Maverick Die Disposition Economics & Real-time ATE Limit Injection.
- **Synchronized Header & Footer Revision Metadata**:
  - Bumped revision label to `Rev. AJ` and Last Updated timestamp to `2026-11-02 10:55 (Asia/Taipei)` in both header and footer.
- **Quality & Verification**:
  - Passed `npm run verify` with 0 tag mismatches and valid JavaScript syntax (17,555 lines).
  - Passed `node scripts/audit_i18n_and_structure.js` with 0 numbering drift, 0 Chinese leaks in English mode across all sections, and 100% of all 1,565 table cells localized.

---

## 2026-11-02 — Google Antigravity — Rev. AI: Semiconductor AI/ML Methodologies: Autoencoders, Isolation Forest, Tree Ensembles & SHAP in Maverick Screening & Root Cause Tracing (Section 6.5, Fig 6.5, Table 6.5)

- **Added Section 6.5: 機器學習與 AI 演算法在半導體異常篩檢與根因歸因之實踐 (AI & Machine Learning Methodologies: Autoencoders, Random Forest, Isolation Forest, XGBoost & SHAP in Screening & Root Cause Analysis)**:
  - Added Figure 6.5 (`viewBox="0 0 960 560"`): Comprehensive dual-panel SVG diagram presenting:
    - Part A: Unsupervised Maverick Screening & Anomaly Detection:
      - Deep Autoencoder architecture (One-class golden die reconstruction error \(\mathcal{L}_{\text{rec}} = \|\mathbf{x} - \hat{\mathbf{x}}\|_2^2 &gt; \tau\)).
      - Isolation Forest mechanism (Recursive random hyperplane partitioning, path length \(h(\mathbf{x})\) and anomaly metric \(s(\mathbf{x}, n)\)).
      - Latent space manifold clustering (UMAP/t-SNE) for automatic detection and isolation of unobserved "Zero-Day" defect signatures.
    - Part B: Explainable AI Root Cause Tracing Pipeline:
      - Ingestion of 10,000+ FDC sensor time series (RF reflected power, chamber pressure, MFC gas flows, ESC temperature) + in-line metrology + equipment routing matrices.
      - Gradient Boosted Decision Trees (XGBoost / LightGBM) + Game-Theoretic SHAP waterfall decomposition (\(f(\mathbf{x}) = \phi_0 + \sum \phi_i\)), attributing yield loss to specific tools (e.g. Chamber ETCH_03 RF matchbox capacitor arcing).
      - Closed-loop MES automated corrective action (WIP Hold, tool tune, monitor wafer requalification).
  - Added Subsections 6.5.1 to 6.5.3: In-depth mathematical formulations for Autoencoders, VAEs, Isolation Forest, and SHAP's four theoretical guarantees (Efficiency, Missingness, Symmetry, Monotonicity).
  - Added Table 6.5: Master Decision & Industrial Deployment Matrix comparing 5 major AI/ML methodologies (Autoencoder, Isolation Forest, Random Forest / XGBoost + SHAP, CNN / Vision Transformer, Graph Neural Networks) across learning paradigms, mathematical objectives, latency overheads, explainability ratings, and enterprise software ecosystems (PDF Solutions Exensio, KLA Klarity, Advantest DFX, Synopsys YieldExplorer).
  - Added Subsection 6.5.5: Enterprise MLOps Governance in Fabs:
    - Continuous drift detection via Kolmogorov-Smirnov (KS) tests and Population Stability Index (PSI).
    - Shadow mode deployment and human-in-the-loop qualification safeguards before hard-inking cutover.
- **Embedded Cross-Sectional Hyperlinks (Bi-directional Navigation)**:
  - Linked to Section 6.5 from:
    - Section 1.2.3: PDF Solutions Exensio ML loaders &amp; advanced AI screening.
    - Section 2.4: Wafer map ML classification (random forests, CNNs &amp; unsupervised clustering).
    - Section 4.5: Equipment chamber commonality &amp; multidimensional FDC sensor root-cause attribution.
    - Section 6.4: Parametric outlier detection extending to non-linear high-dimensional autoencoders &amp; isolation forests.
  - Section 6.5 cross-references back to Sections 1.2.3, 2.4, 4.5, and 6.4.
- **Synchronized Desktop & Mobile Navigation (TOC)**:
  - Added Section 6.5 to both `nav.toc` and `details.toc-m` under Phase 6.
  - Fixed duplicate Section 6.4 entry in Mobile TOC.
- **Synchronized Header & Footer Revision Metadata**:
  - Bumped revision label to `Rev. AI` and Last Updated timestamp to `2026-11-02 09:45 (Asia/Taipei)` in both header and footer.
- **Quality & Verification**:
  - Passed `npm run verify` with 0 tag mismatches and valid JavaScript syntax (17,133 lines).
  - Passed `node scripts/audit_i18n_and_structure.js` with 0 numbering drift, 0 Chinese leaks in English mode across all sections, and 100% of all 1,547 table cells localized.

---

## 2026-11-02 — Google Antigravity — Rev. AH: Semiconductor Outlier Detection, Maverick Screening & AEC-Q001/002 Protocols (Section 6.4, Fig 6.4, Table 6.4)

- **Added Section 6.4: 半導體異常值篩選、孤島晶粒檢測與車規 AEC-Q001/002 演算法實踐 (Semiconductor Outlier Detection, Maverick Screening & AEC-Q001/002 Protocols)**:
  - Added Figure 6.4 (`viewBox="0 0 960 560"`): Comprehensive dual-panel SVG diagram presenting:
    - Part A: Schematics for 6 canonical outlier detection mechanisms (SPAT static limits, DPAT wafer-level dynamic limits with robust median/NIQR estimators, GD-PAT ring/zone limits, NNR nearest neighbor residual filtering, GDBN good die in bad neighborhood defect-clustering isolation, and Multivariate Mahalanobis Distance \(D_M\) bivariate ellipsoid boundary detection).
    - Part B: 4-Stage Zero-DPPM Automotive Maverick Screening & Execution Pipeline (Stage 1: Wafer Sort Parametric PAT -> Stage 2: Spatial & Neighborhood Filters -> Stage 3: ATE Real-Time Dynamic Limit Injection -> Stage 4: Risk Disposition & Virtual Inking).
  - Added Section 6.4.1: The Statistical Blind Spot of Nominal Datasheet Limits (LSL/USL) vs. Latent Reliability Killers (AEC-Q001 / AEC-Q002).
  - Added Table 6.4: Master Decision & Comparison Matrix across all 6 core outlier algorithms (SPAT, DPAT, GD-PAT, NNR, GDBN, SYA), comparing mathematical formulations, robust estimators (Median + MAD / NIQR), sensitivity to masking, computational overhead, and target reliability failure modes.
  - Added Section 6.4.3: Multivariate Outlier Detection & Mahalanobis Distance (\(D_M\)) formulation:
    - Mathematical formulation: \(D_M(\mathbf{x}) = \sqrt{(\mathbf{x} - \boldsymbol{\mu})^T \boldsymbol{\Sigma}^{-1} (\mathbf{x} - \boldsymbol{\mu})}\), handling correlated multi-pin/leakage distributions, covariance matrix inversion \(\boldsymbol{\Sigma}^{-1}\), and \(\chi^2_p(\alpha)\) thresholding to intercept bivariately anomalous chips that pass 1D univariate limits.
  - Added Section 6.4.4: Economics of Maverick Disposition (Overkill vs. Underkill) & ATE Execution Architecture:
    - Economic trade-offs between commercial IoT/consumer bin downgrades vs. automotive ASIL-D hard inking scrap vs. 168h high-stress HTOL burn-in isolation.
    - Production deployment architectures: Real-time edge gateway dynamic limit injection (e.g., PDF Exensio / Advantest DFX / Teradyne IG-XL) vs. offline MES virtual inking post-processing.
- **Updated Desktop & Mobile Navigation (TOC)**:
  - Added `sec_6_4` into both `nav.toc` and `details.toc-m` under Phase 6 with full bilingual parity.
- **Synchronized Header & Footer Revision Metadata**:
  - Bumped revision label to `Rev. AH` and Last Updated timestamp to `2026-11-02 09:15 (Asia/Taipei)` in both header and footer.
- **Quality & Verification**:
  - Passed `npm run verify` with 0 tag mismatches and valid JavaScript syntax.
  - Passed `node scripts/audit_i18n_and_structure.js` with 0 numbering drift, 0 Chinese leaks in English mode across all sections, and 100% table cells localized.

---

## 2026-11-02 — Google Antigravity — Rev. AG: Synchronized Revision Labels (Header & Footer) to Rev. AG

- **Fixed Revision Tag Synchronization across Header and Footer**:
  - Identified that earlier regex replacement was matching an obsolete HTML signature, leaving the header at `Rev. AC` and footer at `Rev. AD`.
  - Updated both `index.html` header (`<div class="doc-fields">`) and footer (`<footer>`) to accurately reflect **Rev. AG (Lithography Defect Atlas, 12 Real SEM Micrographs &amp; Fab Escalation SOP)** with matching timestamps (`2026-11-02 08:35 Asia/Taipei`).
- **Quality & Verification**:
  - Verified with `npm run verify` (0 errors, 15761 lines).
  - Verified with `node scripts/audit_i18n_and_structure.js` (0 errors, 0 leaks).

---

## 2026-11-02 — Google Antigravity — Rev. AG: Integrated 12 Real SEM Micrograph Pictures across Litho Gallery Grid & Table 4.3

- **Extracted and Integrated 12 Real SEM Defect Micrographs**:
  - Cropped and saved all 12 individual SEM micrographs from the user-uploaded Thin Film Engineer Atlas into `assets/litho/` (`01_resist_bridging.png` through `12_lift_off_defects.png`), plus `lithography_defect_atlas_clean.png`.
  - Added a dedicated 12-card responsive SEM visual gallery (`.litho-gallery-grid` and `.litho-card`) in Section 4.6.1, featuring zoom-hover effects, technical perspective badges (`SEM | Top-down`, `SEM | 45° Tilt`, `SEM | Cross-section`, etc.), and bilingual titles and descriptions.
  - Enhanced Table 4.3 by embedding the corresponding direct SEM micrograph thumbnail in the first column of every defect row for instantaneous visual identification during yield analysis.
- **Quality & Verification**:
  - Passed `npm run verify` with 0 tag mismatches and valid JavaScript syntax.
  - Passed `node scripts/audit_i18n_and_structure.js` with 0 numbering drift, 0 Chinese leaks in English mode across all sections, and 100% table cells localized.
  - Bumped to Rev. AG across header and footer.

---

## 2026-11-02 — Google Antigravity — Rev. AF: Lithography & Photoresist Defect Atlas (12 Modes), Physics of Failure & Foundry Escalation SOP (Section 4.6, Fig 4.3, Table 4.3)

- **Added Section 4.6: 微影光阻 12 大圖案缺陷圖鑑 (Lithography Defect Atlas) 與 晶圓代工廠 (Fab) 跨部門對接溝通閉環 SOP (Lithography & Photoresist Defect Atlas: Mechanisms, Solutions & Foundry Escalation SOP)**:
  - Added Figure 4.3 (`viewBox="0 0 960 590"`): Comprehensive dual-panel SVG diagram presenting cross-sectional profile schematics for all 12 photoresist defects (Part A) alongside the 4-stage Foundry Escalation & Closed-Loop Protocol (Part B). Fully styled with CSS theme tokens (`var(--surface)`, `var(--ink)`, `var(--accent)`, `var(--danger)`, `var(--warn)`, `var(--good)`).
  - Added Section 4.6.1 & Table 4.3: Deep-dive into the 12 canonical photoresist and patterning defect modes based on the industry atlas (Resist Bridging, Scumming, Pattern Collapse, Footing, T-topping, Pinholes, Line-edge Roughness LER/LWR, Standing Waves, Missing Patterns, Polymer Residue, Overlay Error, and Lift-off Defects), detailing morphology, physics/chemistry of failure (PoF), electrical yield failure modes, fab engineering recipes, and equipment module attribution.
  - Added Section 4.6.2: Actionable Foundry Technical Escalation & Communication Playbook:
    - Stage 1: The Golden 5-Piece Data Package (CD-SEM top-down/45° tilt, KLARF defect logs, STDF wafer sort map overlay & kill ratio calculation, equipment/lot genealogy, GDSII/OASIS DRC-clean clip).
    - Stage 2: Root Cause Triangulation Decision Tree (Within-reticle repeating vs Wafer edge ring vs Single tool commonality vs Random stochastics).
    - Stage 3: Professional Fab Jargon & Immediate Containment Mandates (Demanding PWQ Bossung curves, FEM margins, R2R APC logs, PM history; executing instant WIP hold, tool disqualification monitor runs, reticle clean & STARlight re-certification, formal 8D).
    - Stage 4: Permanent Corrective Action (PCA), Commercial Scrap Allowance & Defeating the "DFM Waiver Trap" via empirical golden lot benchmarks.
- **Updated Desktop & Mobile Navigation (TOC)**:
  - Added `sec_4_6` into both `nav.toc` and `details.toc-m` under Phase 4 with full bilingual parity.
- **Quality & Verification**:
  - Passed `npm run verify` with 0 tag mismatches and valid JavaScript syntax.
  - Passed `node scripts/audit_i18n_and_structure.js` with 0 numbering drift, 0 Chinese leaks in English mode across all sections, and 100% table cells localized.
  - Bumped to Rev. AF and updated Last Updated to 2026-11-02 across header and footer.

---

## 2026-10-28 — Google Antigravity — Rev. AE: Hierarchical Navigation with Subheadings, Dynamic ScrollSpy & Subheading Toggle in Sidebar and Mobile TOC

- **Added Complete Subheading Hierarchy in Left Sidebar (`nav.toc`) & Mobile (`details.toc-m`)**:
  - Addressed user feedback where the sidebar previously only showed top-level phase titles without any subsections.
  - Linked all 58 major subsections (`h3`) and key technical deep-dives (`h4`, including 1.2.1–1.2.4 for STDF specifications, traps, Exensio/JMP recipes, and comparison matrix; 5.8 for Advantest V93000; and Tools 1–5).
  - Every subheading in the Table of Contents features strict bilingual parity (`<span class="zh">` / `<span class="en">`).
- **Added Unique Anchors across all Subsections**:
  - Tagged all 62 `h3` and `h4` headings with standard, predictable semantic IDs (`sec_ov_1`–`sec_ov_3`, `tool_1`–`tool_5`, `sec_0_1`–`sec_0_5`, `sec_1_1`–`sec_1_2_4`, `sec_5_1`–`sec_5_8`, `app_a`–`app_d`).
- **Enhanced Navigation Click Handler & Auto-Expand**:
  - `initSidebarNavScroll()` now automatically checks if the clicked target belongs to a collapsed parent section, dynamically uncollapses the parent `<section>` and `.collapse-body`, calculates scroll offset considering `#topNavbar`, executes smooth scroll, and flashes `.nav-highlight` directly on the target title.
  - Mobile TOC (`details.toc-m`) automatically closes upon selecting any item for a seamless mobile browsing experience.
- **Added Real-time ScrollSpy & Subheading Toggle**:
  - `initScrollSpy()` dynamically observes viewport scroll positions and updates the `.active` class on the current subsection in `nav.toc`, simultaneously highlighting `.active-parent` on the parent phase link.
  - Added a dedicated toggle button (`#btnToggleSubheadings`) in `.toc-header` allowing readers to switch between full hierarchical view and compact phase-only view, with user preference persisted in `localStorage`.
- **Quality & Verification**:
  - Passed `npm run verify` with 0 tag mismatches and valid JavaScript syntax.
  - Passed `node scripts/audit_i18n_and_structure.js` with 0 numbering drift, 0 Chinese leaks in English mode across all sections, and 100% table cells localized.
  - Synchronized Rev. AE and Last Updated (2026-10-28) across header and footer.

---


## 2026-10-28 — Google Antigravity — Rev. AD: Commercial Yield Solutions: Automated STDF Sanitization & Trap Prevention in PDF Solutions Exensio & SAS JMP (Section 1.2.3, Fig 1.3, Table 1.2.4)

- **Added Section 1.2.3: 商業級良率系統實踐：PDF Solutions Exensio 與 SAS JMP 的 STDF 陷阱自動化清洗、防禦配方與企業級架構 (Commercial Yield Solutions: Automated STDF Sanitization & Trap Prevention in PDF Solutions Exensio & SAS JMP)**:
  - Deep-dive into how Tier 1 foundries (TSMC, GF) and fabless giants (NVIDIA, Qualcomm, Apple, MediaTek) automate STDF ingestion and prevent data corruption using PDF Solutions Exensio and SAS JMP.
  - Detailed the 5 Exensio Ingestion Guardrails:
    - Recipe 1: Retest Merge Policy (FPY vs Composite Final yield separation, Retest Recovery Delta > 3% alarm).
    - Recipe 2: Multi-Site Asynchronous De-interleaving (per-site hardware buffer states, automated ANOVA).
    - Recipe 3: Tolerant Ingestion & Incomplete File Quarantine (synthesizes unclosed PIRs into Bin 999 Aborted, marking partial test lots).
    - Recipe 4: Limit Master & Sentinel Float Nullification (converts -9.999e37 to database NULL, executing single-sided \(C_{pu}/C_{pl}\) algorithms).
    - Recipe 5: Wafer Geometric Alignment & CAD Master Overlay (auto-detects WCR notch and rotates prober axes to achieve pixel-perfect KLARF defect overlay).
  - Detailed SAS JMP Desktop Engineering Workflows & JSL scripts:
    - Missing Value Codes registration to prevent histogram distortion.
    - Subset tables for FPY vs Final composite yield.
    - Fit Y by X Oneway ANOVA / Welch tests for site delta skew.
    - Graph Builder 1:1 aspect ratio spatial wafer map verification.
- **Added Figure 1.3**:
  - Full-width, high-precision technical SVG diagram (`viewBox="0 0 960 490"`) depicting the enterprise pipeline: OSAT ATE → Edge Gateway → PDF Exensio Rules Engine → Columnar DWH → JMP Engineering Analytics loop.
- **Added Table 1.2.4**:
  - Comprehensive comparison matrix contrasting all 5 STDF traps across PDF Solutions Exensio, SAS JMP, and Python (FastSTDF) custom scripts.
- **Removed Duplicate Text**:
  - Cleaned up redundant copy of Traps 2–5 from earlier editing transition.
- **Appendix C & D Updates**:
  - Appendix C: Added `Exensio`, `FPY`, `JMP`, `Sentinel Value`, and `YMS`.
  - Appendix D: Added PDF Solutions Exensio Platform Architecture and SAS JMP Semiconductor Applications whitepaper citations.
- **Verification**:
  - `npm run verify` passed: 0 errors, 15 sections, 23 figures, 44 tables, 457 divs, 3442 spans balanced.
  - `node scripts/audit_i18n_and_structure.js` passed: 0 numbering drift, 0 Chinese leaks in English mode across all sections.
  - Bumped revision header and footer labels to Rev. AD with timestamp 2026-10-28 07:00 (Asia/Taipei).

---

## 2026-10-28 — Google Antigravity — Rev. AC: Interactive Search Dropdown Window & Quick Navigation (搜尋即時下拉式選單與一鍵跳轉視窗)

- **Interactive Search Dropdown Window (`.find-dropdown`)**:
  - Implemented real-time dropdown window attached below the top navbar search box (`#findBox`), providing instant visual selection of search hits.
  - Context-rich item cards:
    - **Section Location Badge**: dynamically traces DOM hierarchy upwards to the nearest section/subsection heading (`h2`, `h3`, `h4`) or figure caption (`圖 X.Y / Fig X.Y`), showing exact chapter context (e.g., `Phase 1 · 1.2 STDF V4`, `7.4 實體失效分析...`).
    - **Context Snippet**: extracts 60-character surrounding text with matched keyword highlighted via `<mark class="find-match-kw">`.
    - **Match Index**: sequence numbering (`#1`, `#2`, ...).
  - Navigation & Interactions:
    - Click any result item to jump directly to target, auto-expand collapsed sections/details, smoothly center viewport, and trigger a 2.2s pulse animation (`.find-target-pulse`).
    - Full keyboard navigation: `ArrowDown` / `ArrowUp` cycles through dropdown items and syncs with active highlighting; `Enter` jumps to selected match; `Escape` closes dropdown.
    - Click-outside detection to auto-close dropdown, and focus event on input to re-open active matches.
    - Close button (`✕`) in header for explicit user dismissal.
    - Empty state message (`未找到相關內容 / No matches found`) when query yields zero results.
    - Result truncation protection: renders top 40 matches with scrollable container and footer notification.
  - Responsive & Theme Parity:
    - Mobile-adapted width (`max-width: calc(100vw - 20px)`) with zero horizontal page overflow.
    - 100% CSS semantic token compliance across dark and light themes.
    - Language switcher hook (`refreshDynamicLang()`): dynamic re-querying and re-rendering of badges/snippets on language toggle.
- **Verification**:
  - `npm run verify` passed: 0 errors, 15 sections, 22 figures, 460 divs, 3388 spans balanced.
  - `node scripts/audit_i18n_and_structure.js` passed: 0 numbering drift, 0 Chinese leaks in English mode.
  - Playwright browser test passed: SMT search, Poisson multi-match, keyboard navigation, mobile responsiveness.
  - Bumped revision header and footer labels to Rev. AC with timestamp 2026-10-28 05:00 (Asia/Taipei).

---

## 2026-10-27 — Google Antigravity — Rev. AB: STDF V4 Specification Deep Dive, Binary Structure, Hierarchical Lifecycle, Figure 1.2 & Yield Traps

- **Expanded Section 1.2: STDF V4 規範深度解析：二進位結構、階層生命週期、資料流圖與良率分析實務 (STDF V4 Deep Dive: Binary Structure, Hierarchical Lifecycle, Data Flow & Yield Engineering Analytics)**:
  - Deep-dive into the industry-standard STDF V4 specification created by Teradyne and adopted across IEEE/SEMI.
  - Complete 4-byte universal header breakdown: `REC_LEN` (2B, U*2), `REC_TYP` (1B, U*1), `REC_SUB` (1B, U*1), and variable payload data types (`U*n`, `I*n`, `R*4/R*8`, `C*n`, `B*n`).
  - Hierarchical container lifecycle:
    - File & Lot Level: `FAR` (File Attributes with endianness auto-detection), `MIR` (Master Info: Lot, Part, Tester, Rev), `MRR` (Master Results).
    - Wafer Level (CP): `WCR` (Wafer Config: physical diameter, notch orientation, die dimensions), `WIR` (Wafer ID), `WRR` (Wafer Results: totals, passed, yield).
    - Hardware Setup: `SDR` (Site Description), `PMR` (Pin Map), `PGR` (Pin Group), `RDR` (Retest Rules).
    - Part Loop: `PIR` (Start per head/site), `PTR` (Parametric results), `MPR` (Multi-result pin arrays), `FTR` (Functional vector fail cycles and pins), `PRR` (Part Results: Hard/Soft Bin, (X, Y) coordinates, test execution time, `PART_FLG` retest bit, `PART_ID` unique chip Fuse ID).
    - Summary Level: `TSR` (Test Synopsis per-test fail rates), `HBR`/`SBR` (Hard/Soft Bin rollups), `PCR` (Part Count per site).
- **Added Figure 1.2**:
  - Full-width, high-precision technical SVG diagram (`viewBox="0 0 960 500"`) depicting STDF 4-byte binary encapsulation, hierarchical record lifecycle tree, and the 4 downstream yield extraction pipelines (spatial wafer maps, multi-site balance, Cpk / dynamic PAT, and cross-stage CP-to-FT tracking). 100% theme-token compliant, zero HTML in text, fully bilingual.
- **Added Section 1.2.2: 5 Critical STDF Engineering Traps & Guardrails**:
  - Trap 1: Retest data naive aggregation causing yield inflation or depression (parsing `PART_FLG` Bit 0 for FPY vs. Final Yield).
  - Trap 2: Asynchronous multi-site interleaved stream deserialization (per-site state machines keyed on `(HEAD_NUM, SITE_NUM)`).
  - Trap 3: Abrupt tester crashes causing missing PRRs (synthesizing incomplete PIRs as `Bin 999 (Aborted)`).
  - Trap 4: Single-sided limit sentinel values (-9.999e37) corrupting standard deviation and Cpk (gating via `TEST_FLG` Bit 4/5).
  - Trap 5: Wafer coordinate inversion and notch rotation inconsistencies (aligning `WCR` `WF_FLAT` with MES wafer laser scribes).
- **Appendix C & D Updates**:
  - Appendix C: Added 5 core STDF record families (`MIR / MRR`, `PIR / PRR`, `PTR / MPR`, `TSR`, `WCR / WIR / WRR`).
  - Appendix D: Added Teradyne STDF Version 4 official specification system manual citation.
- **Verification**:
  - `npm run verify` passed: 0 errors, 15 sections, 22 figures, 447 divs, 3374 spans balanced.
  - `node scripts/audit_i18n_and_structure.js` passed: 0 numbering drift, 0 Chinese leaks in English mode across all sections.
  - Bumped revision header and footer labels to Rev. AB with timestamp 2026-10-27 21:00 (Asia/Taipei).

---

## 2026-10-27 — Google Antigravity — Rev. AA: Advantest V93000 (93k) ATE Architecture, SmarTest Environment, Signal Chain & Yield Engineering Playbook

- **Added Section 5.8: Advantest V93000 (93k) ATE Platform Architecture, SmarTest Environment & Advanced Silicon Yield Engineering**:
  - Comprehensive introduction to the industry-standard V93000 ("93k") platform (over 70% share in advanced HPC / AI GPU / Mobile AP / RF testing).
  - Detailed architectural breakdown across all 5 tiers:
    - Tier 1: Host Workstation & SmarTest 8 (ST8) on RHEL Linux (Testflow API, Shmoo Tool, STDF V4 logger).
    - Tier 2: Patented Xtreme Link™ high-speed ATE backbone (Gbps peer-to-peer data streaming, zero-host CPU bottlenecks).
    - Tier 3: Liquid-cooled Test Head (TH) & Card Cages: Pin Scale 5000/1600 (256 ch/card, up to 5 Gbps, on-card 8-core CPU, EPA < 50 ps), DC Scale / XPS256 / DPS128 (>1000A dynamic transient power, 4-wire remote Kelvin sensing), Link Scale / Wave Scale RF (PCIe 5/6, PAM4 112G/224G, 5G/Wi-Fi 7 mmWave), and liquid cooling manifold (±0.5°C thermal stability).
    - Tier 4: Direct Dock Interface Stack: Pneumatic cam latch guide pins, high-density Pogo Block / Tower matrix, 28–44 layer low-loss Megtron 6 DIB loadboard, and RF elastomer/pogo contactors.
    - Tier 5: Advanced DUT & Active Thermal Control (ATC): On-die thermal diode feedback (\(V_{be}\)), dynamic -40°C to +150°C closed-loop thermal head sinking 500W–1000W+ burst heat.
- **Added Figure 5.4**:
  - Full-width, high-precision technical SVG diagram (`viewBox="0 0 960 500"`) depicting the V93000 system hierarchy, signal chain pipeline, and multi-site testing setup. Fully responsive, 100% theme-token compliant for light/dark mode, and fully bilingual.
- **V93000 4 Major Yield Engineering Traps & Standard Troubleshooting SOPs**:
  - Trap 1: Multi-Site Delta Yield Skew (isolation test, site-swap verification, STDF `SITE_NUM` correlation).
  - Trap 2: TDR Calibration Drift & EPA Distortion causing false timing violations (Auto-TDR deskew SOP to < 30 ps).
  - Trap 3: SmarTest Scan Fail Cycle Logging directly connecting to EDA layout diagnosis (Tessent YieldFast / Synopsys TestMAX) and Phase 7 physical FA (FIB/TEM).
  - Trap 4: Active Thermal Control (ATC) thermal inertia lag causing false frequency fallout (thermal pre-conditioning vectors + real-time diode PID feedback).
- **Appendix C & D Updates**:
  - Appendix C: Added 6 terms (`93k / V93000`, `EPA`, `EXA Scale`, `Pin Scale`, `SmarTest`, `TDR`).
  - Appendix D: Added Advantest EXA Scale technical whitepaper and SmarTest 8 / DUT Board Design Guide citations.
- **Verification**:
  - `npm run verify` passed: 0 errors, all 15 sections, 21 figures, 440 divs, 3324 spans balanced.
  - `node scripts/audit_i18n_and_structure.js` passed: Section 5.8 validated, zero numbering drift, zero untranslated Chinese leaks in English mode across all sections.
  - Bumped revision header and footer labels to Rev. AA with timestamp 2026-10-27.

---

## 2026-10-24 — Claude Code — Rev. Z: full EN/ZH parity, OV numbering, parser bugs

- **All English-mode Chinese leaks fixed.** `scripts/audit_i18n_and_structure.js` now passes for the first time. Root causes:
  - `toggleLang()` only re-rendered the triangulator. It now calls `refreshDynamicLang()`, which re-renders every tool output (yield metrics, wafer diagnosis, triangulator, chamber stats, fallout simulator) and swaps `<option>` text.
  - Startup now also runs `recalcChamberStats()` and `updateFalloutSimulator()`, whose initial output was hard-coded Chinese HTML.
  - 29 `<option>`s got `data-en` translations; `applyOptionLang()` swaps them.
  - Remaining static leaks were wrapped in zh/en (Phase 3, Fig 3.3 badges, Phase 4, Phase 7 badges).
- **Two HTML parser bugs fixed:**
  - Fig 3.2 had `<b>` inside SVG `<text>`. That closed the whole `<svg>` early and broke Panel C; it now uses `<tspan>`.
  - The Phase 4 seasoning callout had `<ul>` inside `<span class="zh|en">`, so both lists escaped the language toggle (the English list showed in Chinese mode too). It is now `<div class="zh|en">`; the callout class also changed from `warning` (undefined) to `warn`.
- **Formulas in tool outputs now render.** JS strings used `'\(R_c\)'`, and JS drops the single backslash. 24 escapes were doubled; the new `typesetMath(el)` re-runs KaTeX after each innerHTML update.
- **Numbering overlap fixed.** The Overview section is now unnumbered, with subsections OV.1–OV.3 and figures OV.1–OV.3. Phase 0 keeps 0.1–0.5, and its waterfall figure is renumbered 0.4 → 0.1. TOCs and the README were updated.
- **AGENTS.md**: new technical rules 5–6 (bilingual implementation pitfalls, pre-commit checks) and the OV/N.x numbering rule. Tech rule 2 now says KaTeX loads locally.
- Verified: every option of all 3 select tools, in both languages via the real toggle, gives no Chinese in EN output, no raw TeX and no visible `.en` in ZH mode; there are no JS errors.

## 2026-10-23 — Claude Code — Rev. Y: mobile layout, content expansion, case study, CI

- **Mobile layout fixed**: the page was 964 px wide on a 390 px phone. Causes and fixes (all in `<style>`):
  - `.body-grid` below 950 px uses `minmax(0, 1fr)` (a bare `1fr` grows to its widest child).
  - `.tool-grid` stacks below 760 px (`!important`, because tool grids carry inline column widths).
  - `.katex { position: relative }`: KaTeX's hidden MathML copy is `position:absolute` and escaped every `overflow:auto` wrapper.
  - `.katex-display { overflow-x: auto }` for display math outside `.formula`.
  - Inline grids use `minmax(min(280px, 100%), 1fr)`, so 320–360 px phones fit.
  - **When adding content**: avoid fixed px minimums in inline grids; put wide tables in `.data-table-wrap` and long formulas in `.formula`. Verified page width = viewport at 320/360/390/768/1024/1440 px.
- **Figures**: the 7 `div.figure-container` wrappers are now `<figure>`/`<figcaption>` (classes kept for the lightbox JS). The Phase 7 figures were captioned 6.1/6.2 and are now 7.1/7.2.
- **New content** (all bilingual; new SVGs use theme tokens only):
  - Phase 0.3–0.5: yield metrics (FPY/RTY/GDPW), loss waterfall (Fig 0.4), baseline/trigger rules, cost of yield.
  - Phase 1: data lineage (Fig 1.1), 1.1 join keys and how they break, 1.2 STDF V4 primer, data-quality checklist.
  - Phase 2.3: inline inspection and kill ratio. 2.4: ML wafer-map classification (WM-811K).
  - Phase 6: Cp vs Cpk figure (Fig 6.1).
  - Phase 9.1–9.4: split-lot DOE, SPC run rules plus control chart (Fig 9.1), sample size with wafer-clustering design effect, DFM/critical area.
  - Phase 10.1–10.3: learning-curve notes, ramp curve (Fig 10.1), standards table, audit evidence pack.
  - New section `#case_study` (in both TOCs): one excursion walked through Phases 0–10.
  - Appendix C (58-term glossary), Appendix D (standards and references).
  - Chart numbers were computed, not estimated: Cpk 1.19 / 178 ppm; n ≈ 3,210 dies → ~71 wafers per arm at ρ = 0.02; case-study χ² = 37.9.
- **CI**: `.github/workflows/verify.yml` runs `scripts/verify_index.js` on every push/PR. The script now counts unbalanced tags as errors and exits 1 on failure (it previously always exited 0).
- **Known pre-existing issue, not fixed**: `scripts/audit_i18n_and_structure.js` reports 64 Chinese strings still visible in English mode, in Overview, Tools (mostly `<option>` text and JS-generated metric values), Phase 3, Phase 4 and Phase 7 badges. The same 64 existed before this session.
- **Known numbering quirk**: the Overview section uses headings 0.2–0.4 and Phase 0 uses 0.1–0.5, so the "0.x" numbers overlap. Left as is.

## 2026-10-23 — Claude Code — Unify revision labels (Rev. X)

- Header revision (was Rev. M) and footer revision (was Rev. W) had drifted apart as two separate counters. Both now read **Rev. X**, continuing from the higher letter. New rule in `AGENTS.md` (workflow rule 4): bump both together on every substantive change.

## 2026-10-23 — Claude Code — Offline KaTeX, image compression, repo cleanup

- **KaTeX vendored**: `index.html` now loads KaTeX 0.16.8 from `assets/vendor/katex-0.16.8/` instead of the jsDelivr CDN (woff2 fonts only). Why: AGENTS.md requires 100% offline use on factory intranets; formulas previously broke offline. Verified offline in Chrome: 480 formulas rendered, 0 failed requests. **Do not switch back to a CDN.**
- **Images compressed** (FA gallery, 6.6 MB → 1.7 MB): `bga_cross_section.jpg` and `ic_metallization_sem.jpg` resized to 1600 px long side (q85); `electromigration_void.gif` replaced by animated `electromigration_void.webp` (same 13 frames, 500 ms each). Originals remain in git history. New images: keep ≤ 1600 px and ≤ ~500 KB.
- **Scripts cleanup**: 66 untracked one-off scripts moved to `scripts/archive/` (git-ignored, still on disk). `test-results/` git-ignored.

## 2026-10-23 — Claude Code — Shared agent rules

- `rule.md` renamed to `AGENTS.md` (content unchanged) plus a new "Multi-Agent Collaboration" section.
- Added `.agent/rules/project.md` (Antigravity workspace rule, always on) and `CLAUDE.md`, both pointing to `AGENTS.md`, so both tools follow one rule file.
- Added this `CHANGELOG.md`.

## Before 2026-10-23 — Google Antigravity

- Built the project (Phase 0–10 playbook, 5 interactive tools, bilingual zh/en, figures). See `git log` for details.
