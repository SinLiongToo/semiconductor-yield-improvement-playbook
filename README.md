# 半導體良率改善分析工具與實務方法論平台
# Semiconductor Yield Improvement Analysis Suite & Engineering Playbook

一套專為晶圓代工（Foundry）、IDM 與 IC 設計廠（Fabless）良率工程師（Yield Enhancement Engineer, YEE）、產品工程師（Product Engineer, PE）、整合工程師（Process Integration Engineer, PIE）及測試工程師（Test Engineer, TE）打造的**半導體良率改善分析工具與工程實務指南**。

**線上版（GitHub Pages）：** https://sinliongtoo.github.io/semiconductor-yield-improvement-playbook/

單一自包含 HTML 離線工具（[`index.html`](./index.html)），兼具**高階互動分析計算機**與**系統化工程方法論**，無需安裝 Node.js 或後端伺服器，直接在瀏覽器即可運行。

---

## 核心設計理念與全景架構（Phase 0–10）

良率改善（Yield Improvement）的實務第一要務，是**在第一時間辨識並排除「非製程假異常（Pseudo Yield Loss）」**，運用**「半導體 6M1E 因果全景魚骨圖（Ishikawa Diagram）」**解構潛在缺陷來源，建立**「封裝成品測試 (FT) 與 SLT 系統級測試全攻略」**、**「FA 物理缺陷對應晶圓機台反應矩陣」**，並落實**「晶片電子身分證（ECID）反向溯源與客訴閉環防線」**：

```
Phase 0 [良率基線與損失解構] ──▶ Phase 1 [跨站資料架構與履歷鏈接]
       │
       ▼
Phase 2 [晶圓空間分佈簽名辨識] ──▶ Phase 3 [非製程假異常：硬體/程式/量測/材料/OTP-Trim] ⚠️ (過濾網)
       │                                     │
       │                                     ▼
       └─────────────────────────────▶ Phase 4 [晶圓變異/Corners/批次/Chamber共模] ⭐
                                             │
                                             ▼
Phase 9 [改善戰術閉環] ◀── Phase 8 [客訴 RMA] ◀── Phase 7 [FA 物理缺陷] ◀── Phase 6 [參數 Cpk] ◀── Phase 5 [FT/SLT 攻略] ⭐
       │
       ▼
Phase 10 [Ramp 學習曲線與稽核防禦]
```

---

## 5 組內建即時互動分析工具 (Interactive Tools)

本套件在 `index.html` 中直接內嵌 5 個具備即時數值運算與視覺化繪圖的工程工具：

1. **缺陷密度與良率模型計算機 (Defect Density & Yield Modeling Calculator)**
   - 支援經典 Poisson 模型 \( Y = e^{-A D_0} \)、Murphy 模型 \( Y = \left(\frac{1 - e^{-A D_0}}{A D_0}\right)^2 \)、Seeds 模型 \( Y = \frac{1}{1 + A D_0} \) 以及考量群聚效應的負二項分佈（Negative Binomial / Stapper 模型）。
   - 輸入晶圓直徑（200mm / 300mm / 150mm）、晶粒尺寸（Die Area）、邊緣無效區（Edge Exclusion）即時推算 Gross Die、Net Die、預測良率曲線與缺陷敏感度。

2. **晶圓空間分佈簽名模擬器與根因分類器 (Wafer Map Spatial Pattern Simulator & Classifier)**
   - 繪製 300mm 晶圓網格（1,200+ 顆 Die），模擬 8 大經典空間分佈特徵：
     - **邊緣環形（Edge Ring）**：CMP 邊緣過拋研磨、光阻邊緣珠去除（EBR）瑕疵、電漿 Focus Ring 磨耗。
     - **中心圓點（Center Defect）**：旋轉塗佈中心厚度異常、氣體噴淋頭（Showerhead）中心微孔堵塞。
     - **刮痕線形（Scratch / Streak）**：Robot 搬運夾爪刮傷、CMP 殘留研磨顆粒刮痕。
     - **局部聚集（Cluster）**：乾蝕刻腔體聚合物掉落、靶材電弧微粒飛濺。
     - **同心靶心（Bullseye）**：爐管熱傳導梯度、高溫退火放射狀溫度不均。
     - **棋盤格／測試座（Checkerboard / Multi-site Skew）**：測試機針卡（Probe Card）單一 Site 接觸阻抗高、探針沾黏。
     - **曝光光罩重覆項（Reticle Shot Repeater）**：微影 Scanner 鏡頭或光罩保護膜（Pellicle）微孔。
     - **純隨機分佈（Random Poisson）**：背景清淨度隨機微粒。
   - 提供即時良率計算、一鍵導出晶圓圖 PNG 與排查處方籤。

3. **非製程假異常與客訴根因排查決策矩陣 (Root Cause Triangulator)** ⭐
   - 解決「假異常誤導真因排查」與「客訴無從查起」痛點，依據現場 10 大臨床症狀即時演算 5 大根因類別的概率分佈，並輸出標準驗證實驗 SOP：
     - 探針卡特定 Site 接觸阻抗（\(R_c\)）偏高與針尖氧化。
     - 單顆測試 Pass 但多 DUT 平行測試 IR Droop 電源塌陷。
     - 探針卡研磨清潔（Sand Sheet）後良率顯著回升。
     - FT 測試更換 Pogo Socket 後 Open/Short 比例驟降。
     - 切換至高低溫（Hot/Cold）測試時 Strobe 選通時間邊限不足。
     - WAT 測試 4 線 Kelvin Sense 開路退化為 2 線。
     - 微小漏電取樣延時不足與 RC 充電位移電流截斷。
     - 換入特定外延片廠商（Epi Vendor B）後全廠良率集體下滑。
     - **OTP / eFuse 燒錄後 Verify Read 失敗或高溫烘烤後數據丟失**（\(V_{pp}\) 塌陷、二分搜尋算錯 Code 誤寫入、Post-Mold Shift）。
     - **客戶端退貨（RMA）晶片回測 Pass，但經追溯位於晶圓邊緣聚集缺陷旁**（惡鄰晶粒 GDBN 漏測、潛在 TDDB 早期失效）。

4. **機台／腔體共模相關性檢定工具 (Tool & Chamber Commonality Analyzer)**
   - 解決「數十道製程、數百個 Chamber」的良率殺手獵捕難題。
   - 內建卡方獨立性檢定（Chi-Square Test of Independence）與雙向變異數分析（Two-Way ANOVA），即時計算統計 \( p \)-value 與勝算比（Odds Ratio），自動標註誰是統計上顯著的「流氓機台（Rogue Chamber）」。

5. **參數型良率與 Cpk / PAT 臨界邊界分析器 (Parametric Margin & PAT Analyzer)**
   - 視覺化 WAT（PCM）與 CP 關鍵量測參數（\( V_{th} \), \( I_{on} \), \( R_{sheet} \) 等）常態分佈與規格界限（LSL, USL）。
   - 支援滑動調整製程平均值偏移（Mean Shift \(\delta\)）與變異擴大（\(\sigma\) Expansion），即時反算 \( C_{pk} \)、\( P_{pk} \) 與預期不合格率（DPPM）。
   - 示範車用零缺陷必備之動態 Part Average Testing (PAT) 統計臨界上下限演算。

---

## 方法論內容架構（Phase 0–10）

| 階段 | 核心主題 | 關鍵方法與技術重點 |
|---|---|---|
| **Phase 0** | 良率基線與損失解構 ⭐ | 線良率（Line Yield）vs 晶粒良率（Die Yield）；功能性失效（Functional Bin）vs 參數型失效（Parametric Bin）；系統性缺陷 vs 隨機性缺陷分離；**圖 0.2（半導體良率損失根因 6M1E 全景因果魚骨圖 Ishikawa Fishbone Diagram，解構機台、原材、方法、量測、環境、人員 6 大來源與處方箋）**。 |
| **Phase 1** | 跨站資料架構與履歷鏈接 | 貫穿 MES Lot 譜系（拆批/併批）、STDF 測試原始記錄、Inline 晶圓光學檢查（KLA Defect Adder）、WAT/PCM 到 CP/FT 的全晶圓坐標精確對齊與 Notch 歸一化。 |
| **Phase 2** | 晶圓空間分佈簽名辨識 | 8 大特徵空間分佈（Ring, Center, Scratch, Cluster, Bullseye, Repeater, Checkerboard）之物理機理與特徵工程（Radon Transform / Polar Coordinates / 密度矩陣）。 |
| **Phase 3** | 非製程假異常深入排查 ⭐ | **測試硬體**（Contact 阻抗、針印深度、探針卡針尖氧化、Socket Pogo Pin 疲勞與錫屑、Loadboard 繼電器）；**測試程式**（Strobe 選通時序抖動、多 DUT 平行測試 IR Droop 電源塌陷、Clamp 限流截斷、軟硬 Bin 優先級倒置）；**量測系統**（MSA / Gage R&R \(%GRR > 30\%\)、4 線 Kelvin Sense 斷線退化為 2 線、pA 級漏電延時不足與 RC 充電位移電流）；**材料與擴散變異**（CZ 晶棒氧含量 \(O_i\) 與熱生施體、Epi 外延厚度廠商差異、離子植入穿隧與 RTA 熱預算 \(Dt\) 變異、CMP 研磨液批次粒徑分佈）；**OTP / eFuse / Laser Trim 寫入失效**（\(V_{pp}\) 塌陷、Verify Read 裕度不足、搜尋算法與 \(R_c\) 耦合誤寫入、Post-Mold Shift 封裝應力致 Trim 漂移）。 |
| **Phase 4** | 晶圓製程變異、Corners 與批次相依性 ⭐ | **變異層級分解**（Nested ANOVA: \(\sigma^2_{\text{total}} = \sigma^2_{\text{L2L}} + \sigma^2_{\text{W2W}} + \sigma^2_{\text{WIW}} + \sigma^2_{\text{WID}}\)，解構批次間 50%、晶圓間 20%、晶圓內 20%、晶粒內 10% 貢獻率）；**五大製程角落 (Process Corners: TT, FF, SS, FS, SF)** 物理成因、MOSFET 載子驅動電流 \(I_{\text{on}}\) 與漏電 \(I_{\text{off}}\) 行為、WAT/CP 建立/保持時間邊界、FT 高溫 \(I_{\text{ddq}}\) 漏電熱失控與低溫低壓 \(V_{\text{dd,min}}\) 頻率崩跌、Skewed 角落占空比失真 (DCD) 與 SerDes 眼圖畸變；**批次相依性 (Lot Dependency)**（機台 Seasoning 季移、Post-PM 初始冷腔 SS 漂移 vs EOL 聚焦環侵蝕外圈極限 FF 漂移與聚合物副產物微粒子風暴、單晶矽錠軸向偏析梯度、CMP 研磨液與光阻批號老化）；**先進製程控制 (APC)**（Run-to-Run 前饋膜厚補償蝕刻時間、EWMA 回饋劑量補償 \(\hat{\delta}_{k+1}\)、機台高頻 FDC 虛擬量測 VM）；**機台共模歸因**（\(\chi^2\) 檢定、勝算比 \(OR > 2.0\)、多因子 ANOVA、辛普森悖論分層校正）；**圖 4.1（Corners 2D 散佈圖與 Shmoo 邊界圖）與 圖 4.2（變異階層與機台 Seasoning 鋸齒圖）**。 |
| **Phase 5** | 封裝成品測試 (FT) / SLT 實務攻略 ⭐ | **封裝引致良率損失**（打線 Wire Sweep 與斷裂、倒裝微凸塊 Non-wetting 與 Underfill 空洞、封模熱收縮應力 Post-Mold Shift 150–200MPa、散熱 TIM 空洞與熱失控）；**三溫測試極限挑戰**（-40°C 保持時間違規、125°C/150°C 次臨界漏電暴增、ATC 主動熱控致冷片、Socket CTE 膨脹失配）；**FT 測試座與分選機管理**（Pogo Pin 疲勞 25g 閥值、Crown 錫屑清洗週期、PAM4 56G/112G 高頻阻抗失配、Handler 吸嘴與引腳共面度、DIB 繼電器與 MLCC 開裂）；**系統級測試 (SLT) vs ATE FT**（多核快取一致性、OS 開機死鎖、DDR/PCIe 訓練、0.3%–1.2% ATE 漏測攔截率）；**CP-to-FT 跨站 Bin 轉移診斷矩陣**；**Speed/Power Binning 與車用 HTOL 預燒老化（Arrhenius 加速模型）**；**封裝工程認證 (Package Qual) 低良率真因與防禦**（晶片-封裝交互作用 CPI 應力集中與 Corner DNP 凸塊撕裂 Ultra Low-k SiCOH 介電層 White Bump 缺陷；封模熱收縮雙軸壓縮應力誘發壓阻效應 Piezoresistive Effect 造成能隙電壓基準 Bandgap 與 Op-Amp Offset 漂移致 Trim 移位出界；動態高低溫翹曲 Shadow Moiré Warpage 笑臉/哭臉型致測試座針腳懸空假開路；JEDEC/AEC-Q100 可靠度預處理 MSL 爆米花裂紋、TCT 焊點剪切熱疲勞、HAST 偏壓鹵素電化學腐蝕、HTSL 金鋁介金屬紫瘟與柯肯達爾空洞脆斷；OSAT 轉廠機台基線微差防禦與五步閉環）；**圖 5.3（封裝認證 5 大失效機理與 CPI 應力傳遞圖）**。 |
| **Phase 6** | 參數 Margin 與 Cpk 飄移 | 關鍵電性參數裕度；Guardbanding 容差優化；車用動態 PAT 演算法（\(\mu \pm 4\sigma\) 剔除潛在早期失效晶粒）。 |
| **Phase 7** | 失效分析 (FA) 物理缺陷對應製程反應 ⭐ | **FA 手法階梯**（非破壞 X-Ray/C-SAM/SQUID ➔ 電性定位 OBIRCH/TIVA/EMMI/LVP ➔ Nano-probing 奈米探針 ➔ 逐層去層 Deprocessing ➔ 雙束 FIB 原位切片 ➔ 原子級 HR-TEM + EDX 元素定罪）；**8 大電性失效映射實體物理缺陷與晶圓製程化學/物理反應歸因矩陣**（金屬短路與 CMP 碟形下凹殘留、通孔開路與乾蝕刻碳氟聚合物清洗殘留、閘極氧化層穿孔與 RCA SC1 金屬污染及天線效應 PID、接面漏電與大劑量植入非晶化 RTA 熱應力差排、STI 側壁駝峰漏電與 DHF 邊角掏蝕 Corner Divot、矽化物橋接與 Spacer 蝕刻掏退及退火橫向擴散、銅導線空洞 SIV 與電鍍添加劑及 Cap 界面還原、微影對位偏差與 CMP 對位標記不對稱磨耗）；**實體失效分析真機顯微照片畫廊 (7 組權威公開案例)**（雙束 FIB 超薄切片取樣、FE-SEM 晶片多層金屬互連截面、原位電致遷移空洞與小丘動態演進、C-SAM 封裝熱應力分層、打線銲墊金球結合面與柯肯達爾空洞、SEM 錫鬚自發生長微間隙短路、BGA 錫球陣列金相截面）。 |
| **Phase 8** | 客訴案件分析與良率溯源閉環 ⭐ | **晶片身分追溯（ECID）**反向解碼原始生產批次與 Die X/Y 坐標；**惡鄰晶粒效應（Good Die in Bad Neighborhood, GDBN）**揭露隱性可靠度微裂紋；**漏測根因分析（Test Escape）**（向量覆蓋率盲區、極限溫角環境、TDDB 閘極氧化層潛在擊穿、電致遷移 EM）；**客訴 8D 處分戰略與「同批 24 片姊妹晶圓（Sister Wafers）」即時攔截隔離協議**。 |
| **Phase 9** | 系統性改善戰術與閉環 | 戰術三部曲：短期 OOC/OOS 防堵隔離與出界停機；中期 APC 進階製程控制（Run-to-Run / Feed-forward）與 Chamber Matching；長期 DFM 規則修訂、SRAM 冗餘雷射/eFuse 容錯修復。 |
| **Phase 10** | Ramp 學習曲線與稽核防禦 | 經典半導體良率爬坡數學模型 \( Y(t) = Y_\infty - (Y_\infty - Y_0)e^{-kt} \)；IATF 16949 / JEDEC 變更管理（4M1E 變更）與車用客戶稽核對應標準。 |

---

## 附錄與工程範本 (Templates)

- **Appendix A**: 經典半導體良率數學模型公式卡（Poisson, Murphy, Seeds, Stapper, Gross Die）
- **Appendix B**: 半導體良率突降（Yield Excursion）8D 調查報告範本
- **Appendix C**: 測試硬體、測試程式、量測系統、材料擴散變異與 OTP/Trim 綜合排查表
- **Appendix D**: FT 測試座保養與 CP-to-FT Bin 轉移分析對照範本

---

## 操作指南

直接使用現代瀏覽器開啟 `index.html`：

- **🌙 / ☀️ 深色與淺色模式切換**：頂部控制列隨時切換，支援系統偏好自動偵測。
- **🌐 EN / 中文 雙語即時切換**：全篇具備專業半導體英文與繁體中文工程術語對應。
- **🔍 站內即時搜尋（Find）**：支援中英關鍵字搜尋，自動展開收合區塊並精準高亮跳轉。
- **📐 互動工具即時計算**：滑動參數桿即可動態觀察良率、晶圓缺陷分佈、根因排查矩陣、Chamber 統計顯著性與 Cpk 變化。
