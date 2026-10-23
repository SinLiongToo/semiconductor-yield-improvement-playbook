# 專案規則 / Project Rules

這份文件記錄維護 `index.html`（半導體良率改善分析工具主文件）時應該遵守的規則，是本專案累積的工程慣例與品質準則——良率分析方法論與 SOP 請直接看 `index.html` 內的 Phase 0–10 與 5 大互動工具。

## 內容規則（文件與工具標準）

1. **雙語是硬性要求**：每一段可見文字都要有成對的 `<span class="zh">` / `<span class="en">`，靠根元素的 `data-lang` 屬性切換顯示（CSS `[data-lang="en"] .zh{display:none}` 與 `:root:not([data-lang="en"]) .en{display:none}` 規則），不是機器即時翻譯。新增任何內容都要中英雙語寫齊。
2. **Phase 編號 vs Section 編號兩套系統**：Phase 0–10 代表良率改善工程的實務生命週期階段（Baseline 分解、跨站追溯、空間分佈、非製程假異常過濾、晶圓製程變異/Corners/批次相依性與共模分析、FT/SLT 成品封測、參數 Margin、FA 實體驗證、客訴 RMA/GDBN 溯源、改善閉環、稽核治理），不隨篇幅重組而異動。TOC 與段落編號需嚴格同步（含桌面端 `nav.toc` 與行動端 `details.toc-m`）。編號規則：Phase N 的小節與圖號一律用 `N.x`（如 4.2、圖 4.1）；開頭的「總覽」章節不屬於任何 Phase，使用 `OV.x`（如 OV.2、圖 OV.1），避免與 Phase 0 的 `0.x` 重疊。
3. **callout 語意分級標準**：
   - `callout danger`（紅）：重大良率災情、假性相關陷阱（Simpson's Paradox）、4 線式 Kelvin Sense 斷線退化、GDBN 惡鄰晶粒漏測、高額 Overkill / Underkill、違背稽核要求之不可逆操作。
   - `callout warn`（橘）：工程盲點、多站點測試針卡偏位（Multi-site skew）、Retest 政策失真、樣本數統計不足之虛假安全感。
   - `callout good`（綠）：成功改善案例、最佳實踐（Best Practice）、顯著性判定通過。
   - `callout`（預設 accent 藍/青）：中性工程技術背景、架構說明、公式背景。
4. **能從硬體、軟體與量測前置擋掉的假異常，不要留到晶圓廠製程機台浪費產能**：測試針卡 Contact 阻抗、Pogo 針磨損、測試程式 Strobe 選通時間、多 DUT 平行 IR Droop、OTP/Trim 寫入高壓壓降、Gage R&R 誤差與原始矽晶圓長晶氧含量 \(O_i\)/外延變異必須優先排查隔離。
5. **公式一律使用 KaTeX 規範排版**：`\[ ... \]` / `\( ... \)` 放置於 `.formula .eq` 或行內，禁止使用手打不規格符號，並於附錄「公式參考卡」同步收錄推導依據。
6. **所有圖表與互動工具必須支援深色與淺色模式**：
   - SVG 最外層 `<g>` 設 `fill="var(--ink)"` 或 `stroke="var(--ink)"`，嚴禁寫死黑白色碼導致 Dark Mode 破圖。
   - Canvas 互動工具繪圖（如晶圓圖 Wafer Map、常態分佈曲線）必須動態讀取 CSS 自訂變數（`getComputedStyle`）重繪。
   - 所有圖表均置於 `<figure>` 內，附有中英雙語 `figcaption`。

## 技術規則（HTML / CSS / JS）

1. **色彩一律使用語意化 CSS Token**（`var(--bg)`, `var(--surface)`, `var(--surface-2)`, `var(--ink)`, `var(--ink-soft)`, `var(--border)`, `var(--accent)`, `var(--good)`, `var(--warn)`, `var(--danger)` 等），淺色、深色媒體查詢以及 `[data-theme="dark"]` / `[data-theme="light"]` 三重定義完整。
2. **單一自包含檔案（Zero External Build Dependency）**：核心分析工具、演算法（Poisson / Murphy / Seeds 數值計算、Chi-square 檢定、ANOVA 變異數分析、Wafer Map 網格渲染、Cpk 數值求解、Root Cause Triangulator）均以乾淨原生 Vanilla JavaScript 實作，唯一第三方函式庫 KaTeX 放在 `assets/vendor/` 本地載入（見協作規則 5）。
3. **即時站內搜尋（Find in Document）**：搜尋時支援展開當前收合之章節並平滑捲動，鍵盤快捷鍵（Enter / Shift+Enter / Esc）運作順暢。
4. **互動工具實用性要求**：
   - Tool 1: 缺陷密度與良率模型計算機（Poisson, Murphy, Seeds, Negative Binomial）。
   - Tool 2: 晶圓空間分佈簽名模擬器與根因分類器（8 種經典晶圓瑕疵分佈即時運算）。
   - Tool 3: 非製程假異常與客訴根因排查決策矩陣（Hardware, Program, Metrology, Material, OTP/Trim, RMA/GDBN）。
   - Tool 4: 機台 Chamber 共模相關性與統計檢定工具（ANOVA / 卡方獨立性檢定）。
   - Tool 5: 參數型良率與 Cpk / PAT 臨界邊界分析器（常態分佈動態偏移與 DPPM 換算）。

5. **雙語實作陷阱（已實際踩過）**：
   - `<span class="zh|en">` 內**不可**放 `<ul>`、`<div>`、`<p>`、`<table>` 等區塊元素：瀏覽器會提早關閉 span，區塊內容就逃出語言切換。需要區塊時改用 `<div class="zh">` / `<div class="en">`，且外層不可是 `<p>`。
   - SVG `<text>` 內**不可**放 HTML 標籤（如 `<b>`、`<br>`、`<span>`）：HTML 解析器會把整個 `<svg>` 提早關閉。粗體請用 `<tspan font-weight="700">`；雙語文字用兩個 `<text class="zh">` / `<text class="en">`。
   - `<option>` 不能放 span：在 `<option>` 加 `data-en="..."`，由 `applyOptionLang()` 切換文字。
   - JS 產生的輸出文字要依 `currentLang` 選擇中英文，並把該函式加入 `refreshDynamicLang()`，切換語言時才會重繪。
   - JS 字串中的 KaTeX 要寫雙反斜線（`'\\(R_c\\)'`）；單反斜線的 `\(` 會被 JS 吃掉，`\text`、`\frac` 開頭的 `\t`、`\f` 還會變成 Tab 與換頁字元。插入 innerHTML 後呼叫 `typesetMath(el)`。
6. **提交前檢查**：`npm run verify`（標籤平衡與 JS 語法，CI 也會跑）＋ `node scripts/audit_i18n_and_structure.js`（英文模式中文外洩與編號，需本機 Chrome/Edge）。

## 工作流程規則

1. **本地優先，乾淨純原生**：產出單一 `index.html` 確保在無外網工廠內網環境或本機瀏覽器皆可 100% 獨立運行。
2. **每次編輯完 `index.html` 都要 commit + push**：GitHub Pages 網站（https://sinliongtoo.github.io/semiconductor-yield-improvement-playbook/）需要 `git add` + `git commit` + `git push` 到 `origin/master` 線上版本才會跟著更新。
3. **提交品質把關**：每次實質修改均確保標籤成對平衡、時間戳同步更新、JavaScript 無語法錯誤後進行 git 提交。
4. **版次號同步**：`index.html` 有兩處版次號（頁首「版次狀態 Revision」與頁尾 `Rev.`），兩處必須永遠相同；每次實質修改後兩處一起進一個字母（如 Rev. X → Rev. Y），並同步更新兩處「最後修訂 / Last Updated」時間戳。
   **Revision sync**: the header and footer `Rev.` labels must always match; bump both by one letter per substantive change and update both Last Updated timestamps.

## 多 AI 代理協作規則 / Multi-Agent Collaboration

本專案會交替使用 Google Antigravity 與 Claude Code 維護。各工具的私有記憶彼此不互通，**本檔（`AGENTS.md`）是唯一的規則來源**，`CHANGELOG.md` 是共用的變更紀錄。
This project is maintained alternately with Google Antigravity and Claude Code. Their private memories are not shared, so **this file is the single source of truth for rules** and `CHANGELOG.md` is the shared change log.

1. **開工前先讀**：本檔全文 + `CHANGELOG.md` 最新幾筆 + `git log --oneline -15`，了解其他代理最近改了什麼、為什麼改。
   **Before starting**: read this file, the latest `CHANGELOG.md` entries, and `git log --oneline -15`.
2. **完工後要寫**：每次實質修改，在 `CHANGELOG.md` 最上方新增一筆（日期、代理名稱、改了什麼、為什麼、注意事項）。
   **After finishing**: add an entry at the top of `CHANGELOG.md` (date, agent, what, why, caveats).
3. **新規則寫進本檔**：使用者提出的長期偏好或新慣例，寫進本檔而非任一工具的私有記憶，讓下一個代理也會遵守。
   **New rules go here**, not into any tool's private memory, so the next agent follows them too.
4. **一次性腳本不進版控**：臨時檢查/轉換腳本放 `scripts/archive/`（已列入 `.gitignore`）；只有可重複使用的工具（如 `scripts/verify_index.js`）才留在 `scripts/` 並提交。
   **One-off scripts** go in `scripts/archive/` (git-ignored); only reusable tools stay tracked in `scripts/`.
5. **離線資源**：第三方函式庫（KaTeX 等）放在 `assets/vendor/` 本地載入，不得改回 CDN，以維持工廠內網離線可用。
   **Vendored libraries** (KaTeX etc.) live in `assets/vendor/` and load locally — never switch back to a CDN.
