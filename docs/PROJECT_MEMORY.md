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

## Open items

- Image provenance (awaiting the user): `assets/top10/*` and `assets/scratch/*` look AI-generated, yet the Top-10 atlas calls them a "physical micrograph atlas" (實物微觀圖譜). Some photos are reused for unrelated failure modes (e.g. a BGA cross-section photo labelled "die tilt / warpage"). Either label them as illustrations or replace them with sourced micrographs. 2026-11-04 · Claude Code
- `assets/litho/01–12_*.png` are 145×107 px crops, too small for the zoom lightbox. 2026-11-04 · Claude Code
