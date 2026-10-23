# Changelog / 變更紀錄

Shared log for every agent (Google Antigravity, Claude Code) and human working on this repo.
Newest first. Add an entry after each substantive change — see `AGENTS.md` → Multi-Agent Collaboration.
所有代理與人員共用的變更紀錄，最新的在最上面；每次實質修改後新增一筆。

Entry format / 格式:
`## YYYY-MM-DD — <agent> — <short title>` then bullets: what changed, why, caveats for the next agent.

---

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
