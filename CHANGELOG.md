# Changelog / 變更紀錄

Shared log for every agent (Google Antigravity, Claude Code) and human working on this repo.
Newest first. Add an entry after each substantive change — see `AGENTS.md` → Multi-Agent Collaboration.
所有代理與人員共用的變更紀錄，最新的在最上面；每次實質修改後新增一筆。

Entry format / 格式:
`## YYYY-MM-DD — <agent> — <short title>` then bullets: what changed, why, caveats for the next agent.

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
