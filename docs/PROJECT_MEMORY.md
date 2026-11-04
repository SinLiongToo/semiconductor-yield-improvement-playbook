# Project Memory / 專案記憶

Facts, decisions, gotchas and open items shared by every AI tool (Claude Code, Google Antigravity) and human on this repo.
Rules live in `AGENTS.md`; the change history lives in `CHANGELOG.md`. Keep entries to one or two lines, end each with `YYYY-MM-DD · <tool>`, and fix or delete entries that turn out wrong.

## Verified facts

- The KLA I-PAT original source is D. W. Price, D. G. Sutherland, J. Rathert et al., "Inline Defect Part Average Testing (I-PAT)", 20th AEC Automotive Electronics Reliability Workshop, April 2018. kla.com blocks automated fetches of the PDF, so check it in a browser. 2026-11-04 · Claude Code
- Verified I-PAT follow-ups: "The emergence of inline screening for high-volume manufacturing", Proc. SPIE 11611, 1161107 (2021); US Patent 10,761,128. 2026-11-04 · Claude Code
- No public source exists for the KLA "Klarity® Defect … Software Architecture" (2021) or "Broadband Plasma … DL-ADC Application Guide" (2023) whitepapers that were cited in Rev. AQ; both were removed. Do not re-add them. 2026-11-04 · Claude Code

## Decisions

- Image budget: keep each image ≤ ~500 KB and ≤ 1600 px wide, with no byte-identical copies under new names. To show the same photo again, reference its existing path. 2026-11-04 · Claude Code
- Every reference in Appendix D must be checkable (author/venue/year, or a DOI/patent/URL that resolves). Never invent a plausible-looking title. 2026-11-04 · Claude Code

## Gotchas

- Writing TeX through a Python or JS string eats escapes: `\t`→Tab, `\b`→Backspace, `\f`→Form feed, `\r`→CR, `\n`→newline, and other backslashes may be stripped. Rev. AP corrupted all of Phase 6.4.5 this way. Use raw strings (`r'...'`) or write files with an editor; `npm run verify` now fails on control characters. 2026-11-04 · Claude Code
- Inline math must use `\( … \)`. Plain `(\sigma_{x})` shows as raw text. About 80 such formulas (Phase 1, 3 and 6) were fixed in Rev. AR. 2026-11-04 · Claude Code
- Reading `index.html` in Python text mode turns a stray CR into a newline, which shifts line numbers. Use `open(..., newline='')`. 2026-11-04 · Claude Code
- `<svg height="auto">` is invalid and logs a console error; put `height:auto` in `style` instead. 2026-11-04 · Claude Code
- Inline grids with fixed minimums (`minmax(320px, …)`, `1fr 1fr`) overflow 360–390 px phones; use `repeat(auto-fit, minmax(min(280px, 100%), 1fr))`. 2026-11-04 · Claude Code
- Image paths are also referenced from JS (`img_src: '…'` in `falloutData`), not only `src="…"`. Before deleting or renaming an asset, search the whole file for the path. 2026-11-04 · Claude Code
- Wikimedia Commons can find the exact source of an unmodified image by SHA-1 (`api.php?action=query&list=allimages&aisha1=…`). That is how the FA photos were attributed and how the Antigravity images were shown to have no Commons source. 2026-11-04 · Claude Code

## Image provenance (decided 2026-11-04, user: "replace with sourced photo if any, otherwise label illustration")

- Real, credited photos (Wikimedia Commons, author and license under each card; `REAL_PHOTO_PATHS` in JS lists them): all 7 in `assets/fa/`, plus `top10/10_serdes_eye_closure.png` (A. D. Zonenberg, CC BY 4.0), `litho/07_line_edge_roughness.jpg` (NIST/SEMATECH, public domain) and `litho/08_standing_waves.jpg` (J. Drouard, CAMECA, CC BY-SA 3.0). 2026-11-04 · Claude Code
- Every other image in `assets/top10/`, `assets/scratch/` and `assets/litho/` has no findable source (likely AI-generated). Each is tagged 「示意圖 / Illustration」. New images must either carry a verified credit or this tag. 2026-11-04 · Claude Code

- The replaced originals (12 litho crops, the 2 litho atlas sheets, the old Top-10 #10 eye image) are kept in `assets/archive/` (user request). The page does not reference them. See `assets/archive/README.md`. 2026-11-04 · Claude Code
- **Copyright:** the original litho images (Rev. AF–AT) were cropped from a screenshot of a *Thin Film Engineer* social-media post ("Lithography Defect Atlas", with logo and like counters visible), i.e. third-party copyrighted work. Never display them without the creator's permission. Decision (user, 2026-11-04): credit the source instead. §4.6 now has a "參考來源 / Source" note and Appendix D an entry linking the LinkedIn posts by Nuño Amador-Mendez (litho atlas, #ThinFilmEngineer), Wayne Peng and Aiman Sanusi (related thin-film atlases). The original author is not confirmed, because LinkedIn blocks automated access; if the post URL or author becomes known, update both places. Since Rev. AW (user request), `assets/archive/index.html` shows the archived originals with a third-party notice and the same links, and §4.6 and Appendix D link to it. If the creator objects, remove that page and the two links. The other unsourced images (`top10/*`, `scratch/*`) may have similar origins, so treat any image without a verified source as unpublishable unless you created it. 2026-11-04 · Claude Code
- `assets/litho/01–06, 09–12` are vector SVG schematics (generated, SEM-style grey palette, with scale bars), replacing 145 px raster crops. Their badges say "Schematic", not "SEM". 2026-11-04 · Claude Code

## Verified facts (standards)

- AEC-Q001 (Part Average Testing) covers electrical-parameter outliers. Static PAT limits = robust mean (median) ± 6 robust σ, with robust σ = (Q3 − Q1)/1.35, from ≥ 6 passing lots. Tighter limits such as 3.5σ are customer or internal choices, not AEC-Q001 values. Scratch-path inking is automotive zero-defect practice (customer agreements / control plans), not an AEC-Q001 clause. Sources: AEC-Q001 Rev D summaries (Keysight, yieldWerx, EDN), 2026-11-04. 2026-11-04 · Claude Code

## Gotchas (time)

- On this Windows machine, Git Bash does not know `TZ=Asia/Taipei`: `date` silently prints UTC, which is 8 h behind. Timestamps up to Rev. AW were written this way. For the "Last Updated (Asia/Taipei)" stamps use `TZ=UTC-8 date '+%Y-%m-%d %H:%M'` (POSIX sign: UTC-8 means UTC+8), or in PowerShell `[TimeZoneInfo]::ConvertTimeBySystemTimeZoneId([DateTime]::UtcNow,'Taipei Standard Time')`. 2026-11-04 · Claude Code

## Gotchas (SVG)

- KaTeX does not render inside SVG `<text>`: `\(\sigma\)` there shows as raw code (or as invisible markup). Use Unicode (σ, ±, ≤, ², ᵀ) and `<tspan baseline-shift="sub" font-size="70%">` for subscripts. 2026-11-04 · Claude Code

## Open items

- No free real micrographs were found on Commons for gate-oxide TDDB, via open, wafer chipping, CMP scratch, pogo-pin wear or most litho defects. Real images would need licensed sources (papers under CC BY, or vendor permission). 2026-11-04 · Claude Code
