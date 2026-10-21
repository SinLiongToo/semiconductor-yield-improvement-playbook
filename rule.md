# 專案規則 / Project Rules

這份文件記錄維護 `index.html`（半導體良率改善分析工具主文件）時應該遵守的規則，是本專案累積的工程慣例與品質準則——良率分析方法論與 SOP 請直接看 `index.html` 內的 Phase 0–7 與互動工具。

## 內容規則（文件與工具標準）

1. **雙語是硬性要求**：每一段可見文字都要有成對的 `<span class="zh">` / `<span class="en">`，靠根元素的 `data-lang` 屬性切換顯示（CSS `[data-lang="en"] .zh{display:none}` 與 `:root:not([data-lang="en"]) .en{display:none}` 規則），不是機器即時翻譯。新增任何內容都要中英雙語寫齊。
2. **Phase 編號 vs Section 編號兩套系統**：Phase 0–7 代表良率改善工程的實務生命週期階段（Baseline 分解、跨站追溯、空間分佈、共模分析、參數 Margin、FA 實體驗證、改善閉環、稽核治理），不隨篇幅重組而異動。TOC 與段落編號需嚴格同步（含桌面端 `nav.toc` 與行動端 `details.toc-m`）。
3. **callout 語意分級標準**：
   - `callout danger`（紅）：重大良率災情、假性相關陷阱（Simpson's Paradox）、高額 Overkill / Underkill、違背稽核要求之不可逆操作。
   - `callout warn`（橘）：工程盲點、多站點測試針卡偏位（Multi-site skew）、Retest 政策失真、樣本數統計不足之虛假安全感。
   - `callout good`（綠）：成功改善案例、最佳實踐（Best Practice）、顯著性判定通過。
   - `callout`（預設 accent 藍/青）：中性工程技術背景、架構說明、公式背景。
4. **能從資料架構（Phase 0/1）擋掉的假異常，不要留到 Phase 3/4 浪費產能**：例如測試座針磨損、Multi-site 偏斜、Slot 效應需在資料前處理時標註過濾，避免誤啟動製程機台全面停機檢查。
5. **公式一律使用 KaTeX 規範排版**：`\[ ... \]` / `\( ... \)` 放置於 `.formula .eq` 或行內，禁止使用手打不規格符號，並於附錄「公式參考卡」同步收錄推導依據。
6. **所有圖表與互動工具必須支援深色與淺色模式**：
   - SVG 最外層 `<g>` 設 `fill="var(--ink)"` 或 `stroke="var(--ink)"`，嚴禁寫死黑白色碼導致 Dark Mode 破圖。
   - Canvas 互動工具繪圖（如晶圓圖 Wafer Map、常態分佈曲線）必須動態讀取 CSS 自訂變數（`getComputedStyle`）重繪。
   - 所有圖表均置於 `<figure>` 內，附有中英雙語 `figcaption`。

## 技術規則（HTML / CSS / JS）

1. **色彩一律使用語意化 CSS Token**（`var(--bg)`, `var(--surface)`, `var(--surface-2)`, `var(--ink)`, `var(--ink-soft)`, `var(--border)`, `var(--accent)`, `var(--good)`, `var(--warn)`, `var(--danger)` 等），淺色、深色媒體查詢以及 `[data-theme="dark"]` / `[data-theme="light"]` 三重定義完整。
2. **單一自包含檔案（Zero External Build Dependency）**：核心分析工具、演算法（Poisson / Murphy / Seeds 數值計算、Chi-square 檢定、ANOVA 變異數分析、Wafer Map 網格渲染、Cpk 數值求解）均以乾淨原生 Vanilla JavaScript 實作，CDN 僅引用 KaTeX 提供數學公式渲染。
3. **即時站內搜尋（Find in Document）**：搜尋時支援展開當前收合之章節並平滑捲動，鍵盤快捷鍵（Enter / Shift+Enter / Esc）運作順暢。
4. **互動工具實用性要求**：
   - Tool 1: 缺陷密度與良率模型計算機（Poisson, Murphy, Seeds, Negative Binomial）。
   - Tool 2: 晶圓空間分佈簽名模擬器與根因分類器（8 種經典晶圓瑕疵分佈即時運算）。
   - Tool 3: 機台 Chamber 共模相關性與統計檢定工具（ANOVA / 卡方獨立性檢定）。
   - Tool 4: 參數型良率與 Cpk / PAT 臨界邊界分析器（常態分佈動態偏移與 DPPM 換算）。

## 工作流程規則

1. **本地優先，乾淨純原生**：產出單一 `index.html` 確保在無外網工廠內網環境或本機瀏覽器皆可 100% 獨立運行。
2. **提交品質把關**：每次實質修改均確保標籤成對平衡、時間戳同步更新、JavaScript 無語法錯誤後進行 git 提交。
