const fs = require('fs');
const path = require('path');

const indexPath = path.resolve(__dirname, '../index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Build Section 0.3 HTML
const section03Html = `
          <!-- SUBSECTION 0.3: TOP 10 FALLOUTS & BIDIRECTIONAL FEEDFORWARD / FEEDBACK MATRIX -->
          <div style="margin-top:45px; border-top:1px dashed var(--border); padding-top:30px;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:15px;">
              <h3 style="border-left:4px solid var(--accent); padding-left:12px; margin:0; font-size:18px;">
                <span class="zh">0.3 半導體十大核心良率失效模式審查與雙向閉環前饋 / 反饋控制矩陣</span>
                <span class="en">0.3 Top 10 Semiconductor Yield Fallouts Deep Review & Bidirectional Feedforward / Feedback Control Matrix</span>
              </h3>
              <span class="badge badge-blue">R2R APC &amp; Adaptive Quality</span>
            </div>

            <p>
              <span class="zh">
                現代先進製程良率工程已由單純的「事後失效分析（Post-Mortem RCA）」全面轉向<b>跨工序雙向閉環工程控制（Bidirectional Cross-Stage Closed-Loop Control）</b>。
                當特定缺陷或電氣失效在下游（如 Wafer Sort、封裝組裝或 ATE 終測）發生時，工程體系必須同時執行兩大核心控制流：
                <b>(1) 逆向溯源修正（Feedback to Previous Stage）</b>：將失控參數即時反饋至上游製造機台，透過 Run-to-Run (R2R) 進階製程控制（APC）動態微調配方、鎖定機台 SPC 或觸發 PM，從源頭消除缺陷；
                <b>(2) 前向主動補償（Feedforward to Next Stage）</b>：將上游量測之殘餘物理變異（如膜厚拓撲、WAT 參數、晶粒邊緣空間特徵）前饋傳遞至下游製程或測試站點，啟動自適應電壓調節（AVS）、微調封裝點膠參數或動態加強篩選，化解潛在報廢；
                <b>(3) 下游數據前饋重工挽救（Feedforward to Rework Stations）</b>：針對特定可逆工序（如光阻顯影後 ADI 散焦、封膠前 NSOP 虛焊、探針接觸阻抗漂移過殺），將失效座標前饋至指定重工設備，直接挽回良率損失！
              </span>
              <span class="en">
                Advanced yield engineering has evolved from passive post-mortem failure analysis into <b>Bidirectional Cross-Stage Closed-Loop Control</b>.
                When a yield fallout or electrical deviation is detected at downstream nodes (Wafer Sort, Packaging, or ATE Final Test), two synchronized control vectors must engage:
                <b>(1) Feedback to Previous Stages</b>: Transmit fallout signatures upstream to execute Run-to-Run (R2R) Advanced Process Control (APC), interlock SPC drifts, or trigger equipment PM;
                <b>(2) Feedforward to Next Stages</b>: Relay upstream in-situ metrology signatures (topography, PCM Vth, wafer edge coordinates) downstream to trigger Adaptive Voltage Scaling (AVS), adjust dispensing trajectories, or enforce dynamic screening to salvage marginal dies;
                <b>(3) Feedforward Rework Salvage</b>: For reversible processing stages (e.g., ADI photoresist rework, pre-mold wire rebonding, controlled clean retest), route fallout dies to precision rework cells to recover gross yield loss!
              </span>
            </p>

            <!-- FIGURE 0.3: BIDIRECTIONAL CONTROL ARCHITECTURE SVG -->
            <div class="figure-container" style="margin:25px 0;">
              <svg viewBox="0 0 1060 480" style="max-width:100%; height:auto; font-family:var(--font-mono, monospace);" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arr-ff" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#38bdf8"/>
                  </marker>
                  <marker id="arr-fb" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f87171"/>
                  </marker>
                  <marker id="arr-rw" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#4ade80"/>
                  </marker>
                  <filter id="shadow3" x="-5%" y="-10%" width="110%" height="130%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.25"/>
                  </filter>
                </defs>

                <!-- Background Panel -->
                <rect x="10" y="10" width="1040" height="460" rx="10" fill="var(--surface-2)" stroke="var(--border)" stroke-width="1.5"/>

                <!-- Top Title Bar -->
                <rect x="10" y="10" width="1040" height="42" rx="10" fill="var(--surface-3, rgba(255,255,255,0.05))"/>
                <text x="30" y="36" fill="var(--ink)" font-size="13.5" font-weight="700">Figure 0.3: 半導體跨工序雙向閉環前饋 (Feedforward) 與反饋 (Feedback) 控制體系架構圖</text>
                <text x="730" y="36" fill="var(--ink-soft)" font-size="11">Bidirectional Cross-Stage APC Architecture</text>

                <!-- Stage 1: Fab FEOL/BEOL -->
                <g transform="translate(40, 190)">
                  <rect x="0" y="0" width="200" height="110" rx="8" fill="var(--surface-1)" stroke="var(--border)" stroke-width="2" filter="url(#shadow3)"/>
                  <rect x="0" y="0" width="200" height="28" rx="8" fill="rgba(56, 189, 248, 0.15)"/>
                  <text x="100" y="20" fill="var(--accent)" font-size="12" font-weight="700" text-anchor="middle">1. 晶圓製造站 (Fab)</text>
                  <text x="100" y="48" fill="var(--ink)" font-size="11" text-anchor="middle">FEOL 擴散 / 薄膜 / 微影</text>
                  <text x="100" y="66" fill="var(--ink)" font-size="11" text-anchor="middle">BEOL 金屬電鍍 / CMP</text>
                  <text x="100" y="92" fill="var(--ink-soft)" font-size="10" text-anchor="middle">CD-SEM / Defect Klarf</text>
                </g>

                <!-- Stage 2: Wafer Sort & WAT -->
                <g transform="translate(295, 190)">
                  <rect x="0" y="0" width="200" height="110" rx="8" fill="var(--surface-1)" stroke="var(--border)" stroke-width="2" filter="url(#shadow3)"/>
                  <rect x="0" y="0" width="200" height="28" rx="8" fill="rgba(56, 189, 248, 0.15)"/>
                  <text x="100" y="20" fill="var(--accent)" font-size="12" font-weight="700" text-anchor="middle">2. 晶圓針測站 (Sort/CP)</text>
                  <text x="100" y="48" fill="var(--ink)" font-size="11" text-anchor="middle">WAT / PCM 參數測試</text>
                  <text x="100" y="66" fill="var(--ink)" font-size="11" text-anchor="middle">CP1 / CP2 晶圓測試</text>
                  <text x="100" y="92" fill="var(--ink-soft)" font-size="10" text-anchor="middle">Vth / Idde / PAT Outliers</text>
                </g>

                <!-- Stage 3: Packaging & Assembly -->
                <g transform="translate(555, 190)">
                  <rect x="0" y="0" width="205" height="110" rx="8" fill="var(--surface-1)" stroke="var(--border)" stroke-width="2" filter="url(#shadow3)"/>
                  <rect x="0" y="0" width="205" height="28" rx="8" fill="rgba(56, 189, 248, 0.15)"/>
                  <text x="102" y="20" fill="var(--accent)" font-size="12" font-weight="700" text-anchor="middle">3. 封裝組裝站 (PKG)</text>
                  <text x="102" y="48" fill="var(--ink)" font-size="11" text-anchor="middle">薄化研磨 / 晶粒黏貼</text>
                  <text x="102" y="66" fill="var(--ink)" font-size="11" text-anchor="middle">打線 (WB) / 覆晶 (FCB)</text>
                  <text x="102" y="92" fill="var(--ink-soft)" font-size="10" text-anchor="middle">C-SAM / Underfill / Mold</text>
                </g>

                <!-- Stage 4: Final Test & System -->
                <g transform="translate(820, 190)">
                  <rect x="0" y="0" width="200" height="110" rx="8" fill="var(--surface-1)" stroke="var(--border)" stroke-width="2" filter="url(#shadow3)"/>
                  <rect x="0" y="0" width="200" height="28" rx="8" fill="rgba(56, 189, 248, 0.15)"/>
                  <text x="100" y="20" fill="var(--accent)" font-size="12" font-weight="700" text-anchor="middle">4. 終測與系統驗證 (FT)</text>
                  <text x="100" y="48" fill="var(--ink)" font-size="11" text-anchor="middle">ATE 常溫/高低溫測試</text>
                  <text x="100" y="66" fill="var(--ink)" font-size="11" text-anchor="middle">Burn-In / SLT 系統測</text>
                  <text x="100" y="92" fill="var(--ink-soft)" font-size="10" text-anchor="middle">Eye Margin / AVS Fuse</text>
                </g>

                <!-- TOP SECTION: FORWARD FEEDFORWARD PATHS (Blue/Cyan) -->
                <g fill="none" stroke="#38bdf8" stroke-width="2.5">
                  <!-- Fab -> Sort Feedforward -->
                  <path d="M 140 190 C 140 100, 395 100, 395 180" marker-end="url(#arr-ff)"/>
                  <!-- Sort -> PKG Feedforward -->
                  <path d="M 400 190 C 400 110, 655 110, 655 180" marker-end="url(#arr-ff)"/>
                  <!-- PKG -> FT Feedforward -->
                  <path d="M 660 190 C 660 100, 920 100, 920 180" marker-end="url(#arr-ff)"/>
                  <!-- Fab -> FT Direct High-Speed Feedforward -->
                  <path d="M 170 190 C 170 65, 890 65, 890 180" stroke-dasharray="6,4" marker-end="url(#arr-ff)"/>
                </g>

                <g font-size="10" fill="#38bdf8" font-weight="700">
                  <text x="260" y="95" text-anchor="middle">前饋 1: 膜厚拓撲/缺陷座標 (APC Focus &amp; EPD)</text>
                  <text x="525" y="105" text-anchor="middle">前饋 2: 晶粒厚度/翹曲/Vth (點膠軌跡 &amp; 配對)</text>
                  <text x="790" y="95" text-anchor="middle">前饋 3: C-SAM 氣泡/金線弧高 (四線式 Kelvin 測試)</text>
                  <text x="530" y="60" text-anchor="middle">前饋 4: 晶圓 WAT 參數向量 → ATE 啟動自適應電壓調整 (AVS eFuse Trimming)</text>
                </g>

                <!-- BOTTOM SECTION: BACKWARD FEEDBACK PATHS (Red/Amber) -->
                <g fill="none" stroke="#f87171" stroke-width="2.5">
                  <!-- FT -> PKG Feedback -->
                  <path d="M 910 300 C 910 380, 665 380, 665 310" marker-end="url(#arr-fb)"/>
                  <!-- PKG -> Fab Feedback -->
                  <path d="M 645 300 C 645 390, 150 390, 150 310" marker-end="url(#arr-fb)"/>
                  <!-- Sort -> Fab Feedback -->
                  <path d="M 385 300 C 385 375, 175 375, 175 310" marker-end="url(#arr-fb)"/>
                  <!-- FT -> Fab Direct RCA Feedback -->
                  <path d="M 935 300 C 935 435, 120 435, 120 310" stroke-dasharray="6,4" marker-end="url(#arr-fb)"/>
                </g>

                <g font-size="10" fill="#f87171" font-weight="700">
                  <text x="790" y="380" text-anchor="middle">反饋 1: 虛焊/沖線/接觸阻抗 (機台 PM &amp; 磨針清潔)</text>
                  <text x="500" y="375" text-anchor="middle">反饋 2: WAT Vth 角落漂移 / PID 天線 (微調 RIE / 爐管)</text>
                  <text x="390" y="395" text-anchor="middle">反饋 3: 覆晶 CPI 開裂 (增厚 Polyimide 緩衝層 &amp; 凸塊平整度)</text>
                  <text x="530" y="440" text-anchor="middle">反饋 4: 終測 TDDB 崩潰 / 系統邊限不足 → 閉環修正設計時序與光罩 OPC DRC</text>
                </g>

                <!-- REWORK / SALVAGE LOOPS (Green) -->
                <g fill="none" stroke="#4ade80" stroke-width="2" stroke-dasharray="4,3">
                  <path d="M 90 190 C 70 140, 110 140, 130 185" marker-end="url(#arr-rw)"/>
                  <path d="M 680 190 C 720 150, 750 150, 740 185" marker-end="url(#arr-rw)"/>
                  <path d="M 950 190 C 990 150, 1020 150, 985 185" marker-end="url(#arr-rw)"/>
                </g>
                <text x="95" y="145" fill="#4ade80" font-size="9" font-weight="700" text-anchor="middle">ADI 光阻重工</text>
                <text x="720" y="150" fill="#4ade80" font-size="9" font-weight="700" text-anchor="middle">封膠前補打線</text>
                <text x="990" y="150" fill="#4ade80" font-size="9" font-weight="700" text-anchor="middle">受控清潔複測</text>
              </svg>
              <div class="figure-caption">
                <span class="zh">圖 0.3: 半導體跨工序雙向閉環前饋（藍色）與反饋（紅色）工程控制架構圖（含綠色關鍵重工救回迴路）</span>
                <span class="en">Figure 0.3: Cross-stage bidirectional feedforward (blue) and feedback (red) quality engineering architecture with green rework loops.</span>
              </div>
            </div>

            <!-- INTERACTIVE TOP 10 FALLOUT SIMULATOR -->
            <div class="tool-card" style="margin:25px 0;">
              <div class="tool-header">
                <div>
                  <div class="tool-title">
                    <span class="zh">🔍 十大失效模式即時前饋 / 反饋決策模擬器</span>
                    <span class="en">🔍 Top 10 Fallouts Real-Time Feedforward &amp; Feedback Decision Simulator</span>
                  </div>
                  <span class="mono" style="font-size:12px; color:var(--ink-soft);">Select a failure mechanism to inspect PoF, Feedback RCA Knobs, and Feedforward Salvage Actions</span>
                </div>
                <span class="badge badge-green">LIVE INTERACTIVE</span>
              </div>

              <div style="margin-top:15px; display:flex; gap:15px; flex-wrap:wrap; align-items:center;">
                <label style="font-weight:700; font-size:13px; font-family:var(--font-mono);">
                  <span class="zh">選擇失效模式：</span><span class="en">Select Fallout Mode:</span>
                </label>
                <select id="selFalloutMode" class="ctrl-input" style="min-width:320px; font-weight:600;" onchange="updateFalloutSimulator()">
                  <option value="1">1. 閘極氧化層經時擊穿 (TDDB) 與接面超額漏電</option>
                  <option value="2">2. 後段金屬層短路橋接與 CMP 殘留/凹陷 (Puddling)</option>
                  <option value="3">3. 微影散焦、線寬細頸與接觸孔開路 (Via Open)</option>
                  <option value="4" selected>4. 製程角落漂移與批次間變異 (FF/SS/FS/SF Drift)</option>
                  <option value="5">5. 常態分佈動態離群值 (Part Average Testing / Maverick)</option>
                  <option value="6">6. 晶片-封裝交互作用 (CPI) 與超低介電層開裂</option>
                  <option value="7">7. 打線未著銲墊 (NSOP) 與封膠模流沖線短路</option>
                  <option value="8">8. 覆晶底部填膠空洞與微凸塊熱疲勞開裂</option>
                  <option value="9">9. ATE 接觸阻抗漂移與探針沾錫假性報廢</option>
                  <option value="10">10. 高速介面眼圖邊限與極端溫度時序邊界失效</option>
                </select>
              </div>

              <!-- SIMULATOR DISPLAY PANELS -->
              <div style="margin-top:20px; display:grid; grid-template-columns:repeat(auto-fit, minmax(310px, 1fr)); gap:15px;">
                <!-- Card 1: PoF & Stage -->
                <div style="background:var(--surface-1); border:1px solid var(--border); border-radius:6px; padding:14px;">
                  <div style="font-family:var(--font-mono); font-size:11px; color:var(--accent); font-weight:700; text-transform:uppercase;">
                    [Detection Stage &amp; Physics of Failure]
                  </div>
                  <div id="foStageText" style="margin-top:6px; font-size:12.5px; font-weight:700; color:var(--ink);">WAT / PCM Parametric Testing &amp; Sort Fmax</div>
                  <div id="foPofText" style="margin-top:8px; font-size:12px; color:var(--ink-soft); line-height:1.5;">離子植入機離子束劑量/能量微幅漂移、高溫退火活化熱梯度不均，造成 NMOS/PMOS 閾值電壓（Vth）失衡脫離黃金工作區。</div>
                  <div style="margin-top:12px; padding:6px 10px; background:var(--surface-2); border-radius:4px; font-family:var(--font-mono); font-size:11px;">
                    <span style="color:var(--warn); font-weight:700;">SPC Threshold: </span><span id="foSpcMetric">Delta Vth &lt; 15mV, Cpk &gt; 1.67</span>
                  </div>
                </div>

                <!-- Card 2: Feedback Upstream -->
                <div style="background:rgba(239, 68, 68, 0.05); border:1px solid rgba(239, 68, 68, 0.3); border-radius:6px; padding:14px;">
                  <div style="font-family:var(--font-mono); font-size:11px; color:#ef4444; font-weight:700; text-transform:uppercase;">
                    [Feedback to Previous Stage / Upstream RCA]
                  </div>
                  <div id="foFeedbackText" style="margin-top:8px; font-size:12px; color:var(--ink); line-height:1.5;">
                    <b>回饋離子植入與活化 (Implanter &amp; RTA)：</b>自動校驗法拉第杯電流感測器；交叉比對爐管熱電偶溫度曲線（Thermocouple Profiling），鎖定偏差機台實施 SPC 閉環鎖定。
                  </div>
                </div>

                <!-- Card 3: Feedforward Downstream -->
                <div style="background:rgba(56, 189, 248, 0.05); border:1px solid rgba(56, 189, 248, 0.3); border-radius:6px; padding:14px;">
                  <div style="font-family:var(--font-mono); font-size:11px; color:#0284c7; font-weight:700; text-transform:uppercase;">
                    [Feedforward to Next Stage / Adaptive Compensation]
                  </div>
                  <div id="foFeedforwardText" style="margin-top:8px; font-size:12px; color:var(--ink); line-height:1.5;">
                    <b>前饋終測與封裝 (ATE Final Test &amp; Packaging)：</b>前饋晶圓 WAT 測得之精準 Vth/Idsat 偏移向量至測試機，啟動「自適應電壓調節（AVS）」透過 eFuse 動態寫入最優驅動電壓代碼；將快/慢晶片配對封裝。
                  </div>
                </div>
              </div>

              <!-- BOTTOM REWORK & RECOVERY BANNER -->
              <div style="margin-top:15px; background:rgba(34, 197, 94, 0.06); border:1px solid rgba(34, 197, 94, 0.3); border-radius:6px; padding:12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                <div style="font-size:12px; color:var(--ink); line-height:1.4; max-width:750px;">
                  <span id="foReworkText"><b>前饋重工救回途徑：</b>若植入後未退火檢出劑量不足，前饋至植入站追加微劑量修補植入（Trim Implantation）；已成型晶粒則透過內部可程式 DAC 暫存器軟體補償。</span>
                </div>
                <div style="text-align:right;">
                  <span class="badge badge-green" id="foDeltaYield" style="font-size:12px; padding:4px 10px;">+4.2% Yield Saved (AVS eFuse Trimming)</span>
                </div>
              </div>
            </div>

            <!-- COMPREHENSIVE TOP 10 FALLOUT MASTER TABLE -->
            <div class="table-container" style="margin-top:25px;">
              <table style="width:100%; border-collapse:collapse; font-size:12px;">
                <thead>
                  <tr style="background:var(--surface-3, rgba(255,255,255,0.05)); text-align:left;">
                    <th style="padding:10px; border-bottom:2px solid var(--border); width:45px;">#</th>
                    <th style="padding:10px; border-bottom:2px solid var(--border); width:180px;">
                      <span class="zh">核心失效模式 (Fallout)</span><span class="en">Fallout Mode</span>
                    </th>
                    <th style="padding:10px; border-bottom:2px solid var(--border); width:120px;">
                      <span class="zh">檢出站點</span><span class="en">Detection Stage</span>
                    </th>
                    <th style="padding:10px; border-bottom:2px solid var(--border); width:240px;">
                      <span class="zh">逆向溯源修正 (Feedback to Previous Stage)</span>
                      <span class="en">Feedback to Upstream Stage</span>
                    </th>
                    <th style="padding:10px; border-bottom:2px solid var(--border); width:240px;">
                      <span class="zh">前向主動補償 (Feedforward to Next Stage)</span>
                      <span class="en">Feedforward to Downstream Stage</span>
                    </th>
                    <th style="padding:10px; border-bottom:2px solid var(--border); width:160px;">
                      <span class="zh">重工救回可行性</span><span class="en">Rework / Salvage</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>1</b></td>
                    <td><b>Gate Oxide Breakdown &amp; TDDB</b><br><span style="font-size:11px; color:var(--ink-soft);">閘極氧化層擊穿與超額漏電</span></td>
                    <td>Wafer Sort (CP) / FT Idde</td>
                    <td><b>回饋 Fab FEOL：</b>微調電漿去膠偏壓、限制 Antenna 比率；強化熱氧化爐微污染監測（Qox, Dit）。</td>
                    <td><b>前饋 ATE FT：</b>傳遞漏電晶圓座標圖，啟動自適應 Idde 動態限額；引導至加長型高溫動態 Burn-In。</td>
                    <td>晶圓無物理重工；前饋至 eFuse 啟動逆向基極偏壓（RBB）補償。</td>
                  </tr>
                  <tr>
                    <td><b>2</b></td>
                    <td><b>BEOL Metal Bridging &amp; CMP Puddling</b><br><span style="font-size:11px; color:var(--ink-soft);">金屬走線短路與銅研磨殘留</span></td>
                    <td>Inline Defect Scan / Sort</td>
                    <td><b>回饋 CMP &amp; Plating：</b>微調研磨墊多區壓力、優化 Slurry 選擇比；裝設渦電流 EPD 杜絕過拋。</td>
                    <td><b>前饋 Litho Scanner：</b>前饋殘餘膜厚拓撲高度圖，動態執行 Run-to-Run 焦平面自動水平補償。</td>
                    <td>微影後未塗保護層前，前饋缺陷座標至飛秒雷射修補機切除金屬橋接。</td>
                  </tr>
                  <tr>
                    <td><b>3</b></td>
                    <td><b>Lithography Defocus &amp; Via Open</b><br><span style="font-size:11px; color:var(--ink-soft);">微影散焦、線寬細頸與接觸孔開路</span></td>
                    <td>Inline CD-SEM &amp; ATE</td>
                    <td><b>回饋微影曝光機：</b>即時校準吸盤溫控平坦度矩陣；啟動光罩保護膜（Pellicle）自動雷射除塵。</td>
                    <td><b>前饋乾蝕刻機 (RIE)：</b>將量測 Delta CD 前饋至蝕刻機微調時間與氣體偏壓（Etch Bias Feedforward）。</td>
                    <td><b>100% 顯影後重工 (ADI Rework)：</b>在未蝕刻前直接退回去光阻並重新曝光塗佈！</td>
                  </tr>
                  <tr>
                    <td><b>4</b></td>
                    <td><b>Process Corner Skew (FF/SS/FS/SF)</b><br><span style="font-size:11px; color:var(--ink-soft);">製程角落漂移與批次間變異</span></td>
                    <td>WAT/PCM &amp; Sort Fmax</td>
                    <td><b>回饋離子植入/退火：</b>校正法拉第杯束流計；檢驗 RTA 熱電偶老化，鎖定漂移機台。</td>
                    <td><b>前饋 ATE 終測機：</b>前饋精準 Vth 數據啟動自適應電壓調整（AVS eFuse），動態補償核心電壓降。</td>
                    <td>退火前劑量不足可追加修補植入；成型晶粒透過內部可程式 DAC 暫存器軟體校準。</td>
                  </tr>
                  <tr>
                    <td><b>5</b></td>
                    <td><b>Part Average Testing (PAT) Maverick</b><br><span style="font-size:11px; color:var(--ink-soft);">常態分佈離群值 (車規潛在早夭)</span></td>
                    <td>Sort &amp; FT Parametric</td>
                    <td><b>回饋晶圓缺陷檢驗：</b>將離群座標疊加於 Klarf 資料庫，交叉排查邊緣晶格滑移線與熱場畸變。</td>
                    <td><b>前饋封裝與可靠度：</b>啟動動態 PAT 與 GDBN 壞鄰居剔除；強制周邊晶粒延長 HTOL 燒機壽命測試。</td>
                    <td>車規產品嚴禁出貨；前饋降級（Downgrade Routing）轉為消費級或工業級次檔應用。</td>
                  </tr>
                  <tr>
                    <td><b>6</b></td>
                    <td><b>Chip-Package Interaction (CPI)</b><br><span style="font-size:11px; color:var(--ink-soft);">晶片-封裝應力與超低介電層開裂</span></td>
                    <td>Package Qual (HAST) &amp; FT</td>
                    <td><b>回饋 Fab BEOL：</b>增厚頂層鈍化層（Polyimide Buffer）膜厚；優化 UBM 結合力與微凸塊共面度。</td>
                    <td><b>前饋封裝點膠機：</b>前饋晶圓薄化厚度與翹曲度量測矩陣，動態調整底部填膠點膠溫度與路徑。</td>
                    <td>填膠硬化前若貼片偏差，可前饋至熱風解銲重工站（Hot-Gas Desolder）重新植球貼片。</td>
                  </tr>
                  <tr>
                    <td><b>7</b></td>
                    <td><b>Wirebond NSOP &amp; Wire Sweep Short</b><br><span style="font-size:11px; color:var(--ink-soft);">打線未著銲墊與高黏度模流沖線</span></td>
                    <td>Assembly AOI / X-Ray / FT</td>
                    <td><b>回饋電漿清洗與打線機：</b>延長 Ar/O2 電漿除碳時間；重新微調超音波功率與打線弧形強度。</td>
                    <td><b>前饋模壓封膠機：</b>前饋金線弧高與長度至模壓機，動態限制 EMC 環氧樹脂前段射出流速（Sweep&lt;3%）。</td>
                    <td>封膠前 3D AOI 檢出未著線晶粒，前饋退回打線機在預備墊實施安全二次補打線！</td>
                  </tr>
                  <tr>
                    <td><b>8</b></td>
                    <td><b>Underfill Voiding &amp; Solder Fatigue</b><br><span style="font-size:11px; color:var(--ink-soft);">覆晶填膠空洞與銲點熱循環斷裂</span></td>
                    <td>C-SAM &amp; FT Thermal Cycle</td>
                    <td><b>回饋真空迴銲爐：</b>導入液相線真空抽除微氣泡（Void&lt;1%）；優化超音波去離子水清洗去除殘留。</td>
                    <td><b>前饋 ATE 測試站：</b>前饋超音波掃描氣泡座標，在對應引腳啟動四線式克爾文微阻抗測試。</td>
                    <td>樹脂完全固化前，可前饋至高壓滅菌釜（Autoclave / 6 bar N2）進行高壓消泡二次重烤。</td>
                  </tr>
                  <tr>
                    <td><b>9</b></td>
                    <td><b>ATE Rc Drift &amp; Socket Pin Wear</b><br><span style="font-size:11px; color:var(--ink-soft);">測試探針接觸阻抗漂移與假性過殺</span></td>
                    <td>ATE Final Test Multi-Site</td>
                    <td><b>回饋測試機維護：</b>插拔次數達標（15k 次）自動觸發砂紙研磨針尖清潔行程；警示更換老化彈簧針。</td>
                    <td><b>前饋自適應複測控制器：</b>多站失效計數器即時前饋，自動隔離故障座，啟動受控乾淨複測。</td>
                    <td><b>85% 以上過殺直接救回：</b>探針清潔後自動將暫存托盤晶片實施受控二次複測，挽回巨額良率！</td>
                  </tr>
                  <tr>
                    <td><b>10</b></td>
                    <td><b>High-Speed SerDes Eye Margin Fallouts</b><br><span style="font-size:11px; color:var(--ink-soft);">高速介面眼圖與高低溫時序邊界失效</span></td>
                    <td>FT &amp; SLT (-40C / +125C)</td>
                    <td><b>回饋晶片設計與晶圓廠：</b>傳遞時序違規路徑微調時脈樹緩衝器；反饋晶圓廠對齊 NMOS/PMOS 速度中心。</td>
                    <td><b>前饋系統測試 (SLT)：</b>傳遞眼圖抖動數據至 SLT 測試機，動態校準韌體 CTLE/FFE/DFE 等化器暫存器。</td>
                    <td>透過二級燒錄站前饋調整晶片內部 PLL 倍頻偏壓與 ODT 晶片內終端電阻，使時序邊限完全達標。</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
`;

// Insert Section 0.3 right before closing of overview </section>
const overviewEndPattern = /<\/div>\s*<\/section>\s*<!-- SECTION: INTERACTIVE TOOLS -->/;
if (!overviewEndPattern.test(html)) {
  console.error('Could not find overview end pattern!');
  process.exit(1);
}

html = html.replace(overviewEndPattern, `${section03Html}\n        </div>\n      </section>\n\n      <!-- SECTION: INTERACTIVE TOOLS -->`);

// 2. Add JavaScript simulator logic before setupOneClickZoomTriggers
const jsSimulatorCode = `
  // ===================================================
  // TOP 10 FALLOUTS & FEEDFORWARD SIMULATOR ENGINE
  // ===================================================
  const falloutData = {
    1: {
      stage: 'Wafer Sort (CP) / Final Test (FT Idde)',
      pof_zh: '高溫高壓下電漿充放電損傷（PID / Antenna Effect）及閘極氧化層沉積微粒雜質，導致介電崩潰與接面漏電。',
      pof_en: 'Plasma charging damage (Antenna Effect) and gate dielectric contaminants causing early TDDB breakdown and excess subthreshold leakage.',
      feedback_zh: '<b>回饋晶圓廠 (Fab FEOL/Etch)：</b>縮減電漿去膠偏壓、嚴格實施 Antenna DRC 規範限制金屬面積比；即時閉環調控氧化爐管微污染（監視 Qox 與 Dit 介面態密度）。',
      feedback_en: '<b>Feedback to Fab FEOL/Etch:</b> Reduce plasma strip bias, enforce Antenna DRC area ratios; tight closed-loop control of oxidation furnace contamination (monitor Qox & Dit).',
      feedforward_zh: '<b>前饋下游測試 (Assembly & FT)：</b>將 CP 測得之漏電圖譜前饋至 ATE 執行「自適應 Idde 測試（Adaptive Idde Guardbanding）」；對邊緣高漏電晶粒加長高溫動態 Burn-In，或降額（Binning Downgrade）至低功耗次級品。',
      feedforward_en: '<b>Feedforward to Assembly & FT:</b> Send CP leakage spatial maps to ATE for adaptive Idde guardbanding; route edge high-leakage dies to extended Burn-In or downgrade to low-power tier.',
      rework_zh: '<b>前饋重工救回：</b>晶圓級無重工途徑；但可前饋至 eFuse 燒錄區塊啟動「動態基極偏壓（Body-Biasing Trim）」補償漏電，救回邊緣晶粒。',
      rework_en: '<b>Rework/Salvage:</b> No raw silicon rework; feedforward to eFuse block for adaptive reverse body-biasing (RBB) trim to recover marginal dies.',
      delta_yield: '+1.8% Yield Saved (Avoid Scrap / Overkill)',
      spc_metric: 'Qox > 10 C/cm2, PID Antenna Ratio < 250:1'
    },
    2: {
      stage: 'In-line Optical Defect Scan & Wafer Sort (CP)',
      pof_zh: '銅雙鑲嵌電鍍過量填充（Overburden）、CMP 研磨過度（Dishing）或研磨不均殘留（Puddling），致使微米導線微橋接短路。',
      pof_en: 'Copper dual-damascene plating overburden, CMP dishing, or incomplete slurry removal (puddling) bridging adjacent metal lines.',
      feedback_zh: '<b>回饋金屬研磨與電鍍 (Fab CMP & Plating)：</b>微調 CMP 研磨墊同心環壓力區（Multi-zone Head Profile）、調整 Slurry 化學選擇比；安裝即時渦電流終點偵測（Eddy Current EPD）終止過拋。',
      feedback_en: '<b>Feedback to Fab CMP/Plating:</b> Fine-tune multi-zone CMP head pressure profiles, optimize slurry chemical selectivity; deploy real-time eddy-current endpoint detection to stop over-polishing.',
      feedforward_zh: '<b>前饋微影與後續製程 (Litho Scanner)：</b>前饋 CMP 殘餘膜厚拓撲高度圖（Topography Map）至後續光罩微影步進機，動態調整曝光焦平面（Run-to-Run Focus Leveling Feedforward）防止散焦短路。',
      feedforward_en: '<b>Feedforward to Litho Scanner:</b> Feedforward CMP residual thickness topography maps to subsequent litho steppers for run-to-run focus/leveling compensation to prevent defocus shorts.',
      rework_zh: '<b>前饋重工救回：</b>在金屬蝕刻後未封裝前，若檢出局部金屬殘留橋接，前饋座標至高精度飛秒雷射修補機（Laser Trimming/Blowing）切斷微橋接短路。',
      rework_en: '<b>Rework/Salvage:</b> Feedforward defect coordinates to femtosecond laser repair tools to sever localized metal shorts prior to passivation coating.',
      delta_yield: '+2.4% Yield Saved (Recover Pattern Defects)',
      spc_metric: 'CMP Dishing < 15nm, Metal Bridging Defect Density < 0.02 /cm2'
    },
    3: {
      stage: 'Inline CD-SEM & ATE Continuity / Scan Test',
      pof_zh: '浸潤式曝光機液滴浸潤不均、晶圓熱翹曲、曝光光阻顯影殘渣，導致接觸通孔未打穿（Unopened Via）或導線細頸斷裂。',
      pof_en: 'Immersion scanner liquid droplet defects, wafer thermal warpage, and photoresist residue causing unlanded/unopened vias or wire necking.',
      feedback_zh: '<b>回饋微影曝光機 (Litho DUV/EUV Scanner)：</b>即時平整化校準吸盤溫控平坦度（Wafer Chuck Thermal Matrix）；觸發光罩保護膜（Pellicle）自動雷射異物檢測與清潔流程。',
      feedback_en: '<b>Feedback to Litho Scanner:</b> Real-time wafer chuck thermal leveling calibration; trigger automated in-situ pellicle laser defect inspection and purge cycles.',
      feedforward_zh: '<b>前饋電漿蝕刻機 (RIE Etcher)：</b>前饋 CD-SEM 量測之臨界線寬偏差（Delta CD）至乾蝕刻機，自動微調蝕刻時間、氣體偏壓比例（Run-to-Run Etch Bias Feedforward）主動拉回線寬至中心值。',
      feedforward_en: '<b>Feedforward to RIE Etcher:</b> Feedforward CD-SEM measured delta CD to plasma etchers to dynamically adjust etch duration and RF bias (Etch Bias Feedforward), restoring critical dimensions to nominal.',
      rework_zh: '<b>前饋重工救回：</b>在顯影後檢查（ADI / After Development Inspection）若發現線寬失超或散焦，立即前饋至濕式去光阻站（Resist Strip）徹底去阻並重新塗佈曝光（Zero Silicon Loss Rework）。',
      rework_en: '<b>Rework/Salvage:</b> Immediate feedforward at ADI inspection to resist stripping station for complete rework and recoating before etch—zero raw silicon damage!',
      delta_yield: '+3.5% Yield Saved (100% Reprocessable at ADI)',
      spc_metric: 'CD 3-Sigma < 1.2nm, Via Resistance Rc < 2.5 Ohm'
    },
    4: {
      stage: 'WAT / PCM Parametric Testing & Sort Fmax',
      pof_zh: '離子植入機離子束劑量/能量微幅漂移、高溫退火活化熱梯度不均，造成 NMOS/PMOS 閾值電壓（Vth）失衡脫離黃金工作區。',
      pof_en: 'Ion implantation dose/energy drift and rapid thermal annealing gradients shifting NMOS and PMOS threshold voltages into skewed corners.',
      feedback_zh: '<b>回饋離子植入與活化 (Implanter & RTA)：</b>自動校驗法拉第杯電流感測器；交叉比對爐管熱電偶溫度曲線（Thermocouple Profiling），鎖定偏差機台實施 SPC 閉環鎖定。',
      feedback_en: '<b>Feedback to Implanter & RTA:</b> Recalibrate Faraday cup dose integrators; audit RTP thermocouple arrays and multi-zone heating banks; interlock drifted chambers.',
      feedforward_zh: '<b>前饋終測與封裝 (ATE Final Test & Packaging)：</b>前饋晶圓 WAT 測得之精準 Vth/Idsat 偏移向量至測試機，啟動「自適應電壓調節（AVS）」透過 eFuse 動態寫入最優驅動電壓代碼；將快/慢晶片配對封裝。',
      feedforward_en: '<b>Feedforward to ATE FT & Packaging:</b> Feedforward WAT PCM Vth offsets to ATE to trigger Adaptive Voltage Scaling (AVS) eFuse programming; match complementary speed bin dies during multi-chip packaging.',
      rework_zh: '<b>前饋重工救回：</b>若植入後未退火檢出劑量不足，前饋至植入站追加微劑量修補植入（Trim Implantation）；已成型晶粒則透過內部可程式 DAC 暫存器軟體補償。',
      rework_en: '<b>Rework/Salvage:</b> Pre-anneal inline dose fallout can be salvaged via precision touch-up trim implantation; finished silicon compensated via on-chip programmable register trims.',
      delta_yield: '+4.2% Yield Saved (AVS eFuse Voltage Trimming)',
      spc_metric: 'Delta Vth < 15mV, Cpk > 1.67 across 25 Wafers/Lot'
    },
    5: {
      stage: 'Wafer Sort & Final Test (Parametric Distribution)',
      pof_zh: '晶粒電氣參數落在規格上下限內，但顯著遠離同批次晶粒常態分佈峰值（> 4-Sigma），內部存在次微米晶格滑移或隱蔽閘極缺陷。',
      pof_en: 'Die electrical parameters fall within broad spec limits but significantly deviate from the main Gaussian distribution population (>4-Sigma Maverick Dies).',
      feedback_zh: '<b>回饋晶圓缺陷檢驗 (Fab Defect Metrology)：</b>將離群晶粒座標傳回 Klarf 檢測資料庫，交叉對比非破壞性光學暗場掃描，鎖定晶圓邊緣晶格滑移線（Slip Lines）與熱場異常。',
      feedback_en: '<b>Feedback to Fab Defect Review:</b> Overlay maverick die wafer coordinates onto inline Klarf defect databases to identify microscopic crystal slip lines and thermal gradient signatures.',
      feedforward_zh: '<b>前饋封裝與車規測試 (Assembly & High-Rel Test)：</b>啟動「動態 PAT 演算法」及「壞鄰居晶粒剔除（GDBN）」，自動標記並攔截離群晶粒周圍 8 顆相鄰晶片，前饋至加長型高溫運作壽命試驗（HTOL）。',
      feedforward_en: '<b>Feedforward to Packaging & High-Rel Screening:</b> Execute dynamic PAT and Good Die in Bad Neighborhood (GDBN) filtering; feedforward maverick flags to enforce extended HTOL burn-in on neighbor dies.',
      rework_zh: '<b>前饋降級轉用：</b>車規高可靠性線（Zero-Defect AEC-Q100）嚴禁出貨；前饋降級改標（Downgrade Routing）轉為消費級或工業級非關鍵產品線使用。',
      rework_en: '<b>Rework/Salvage:</b> Disqualified from Tier-1 automotive shipments; feedforward routing to commercial or consumer product bins recovering packaging and wafer cost.',
      delta_yield: '0 DPPM Customer Quality Escape Risk Avoided',
      spc_metric: 'PAT Limit = Mean ± 3.5 Sigma, GDBN Reject Yield Delta < 0.5%'
    },
    6: {
      stage: 'Package Reliability Qual (HAST/TC) & ATE FT',
      pof_zh: '覆晶封裝微凸塊銲接熱應力傳遞、無鉛銲錫與矽晶片 CTE 巨大熱膨脹失配，剪切破壞晶片內部脆弱之多孔 ELK/ULK 介電層。',
      pof_en: 'Micro-bump thermal contraction shear stress and CTE mismatch between silicon and organic substrate tearing delicate porous ELK/ULK dielectrics.',
      feedback_zh: '<b>回饋晶圓廠後段與凸塊製程 (Fab BEOL & Bump Fab)：</b>增加頂層保護鈍化層（Polyimide Buffer）膜厚、優化凸塊下金屬層（UBM）剪切強度與微凸塊共面平整度（Coplanarity < 3um）。',
      feedback_en: '<b>Feedback to Fab BEOL & Bump Line:</b> Increase top polyimide buffer layer thickness; optimize UBM barrier adhesion metallurgy and bump coplanarity (<3um).',
      feedforward_zh: '<b>前饋封裝點膠與黏晶 (Assembly Underfill & Bonding)：</b>前饋晶圓薄化背面研磨厚度與熱翹曲量測數據至封裝貼片機，自動補償點膠針頭加熱溫度與點膠軌跡，嚴選低熱膨脹係數填膠材料。',
      feedforward_en: '<b>Feedforward to Assembly Underfill & Flip-Chip:</b> Feedforward wafer backgrind thickness and bow/warp profiles to flip-chip bonders; dynamically adjust dispense temperature trajectory and underfill cure ramps.',
      rework_zh: '<b>前饋重工救回：</b>在底部填膠固化前若熱壓貼片檢測出高度或對位偏差，可前饋至熱風解銲重工站（Hot Gas De-soldering Rework）清除重焊；固化後則無重工可能。',
      rework_en: '<b>Rework/Salvage:</b> Prior to underfill dispensing/cure, misaligned chips can be salvaged via closed-loop hot-gas desoldering and re-bumping.',
      delta_yield: '+2.1% Reliability Yield Protected',
      spc_metric: 'Die Warpage < 40um, Microbump Shear Strength > 15g/mil2'
    },
    7: {
      stage: 'Assembly Post-Bond AOI / X-Ray & FT Continuity',
      pof_zh: '晶片鋁墊表面氟/碳有機微污染導致金線球焊無法合金化（NSOP）；環氧模塑料（EMC）高黏度射出衝擊導致金線偏移短路（Wire Sweep）。',
      pof_en: 'Pad surface fluorine/carbon contamination causing Non-Stick on Pad (NSOP); high mold compound transfer velocity inducing lateral wire sweep shorts.',
      feedback_zh: '<b>回饋打線前電漿清洗與打線機 (Plasma Clean & Bonder)：</b>加長氬氣/氧氣電漿清潔銲墊時間；微調超音波銲頭超音波能量、壓力及打線弧度高度（Loop Profile Stiffness）。',
      feedback_en: '<b>Feedback to Plasma Clean & Wire Bonder:</b> Extend Argon/Oxygen plasma pad de-oxidation duration; re-tune ultrasonic bonding energy/force and stiffen wire looping profiles.',
      feedforward_zh: '<b>前饋模壓封膠機 (Transfer Mold Press)：</b>前饋打線機測得之跨線長度與弧高資料至模壓控制器，動態調降 EMC 環氧模塑料前段射出流速（Injection Profile），確保金線側向位移率 < 3%。',
      feedforward_en: '<b>Feedforward to Transfer Mold Press:</b> Feedforward wire length and loop height metrology to mold presses to automatically throttle initial compound transfer ram velocity (Sweep < 3%).',
      rework_zh: '<b>前饋重工救回：</b>在封膠前經三維 AOI 檢出 NSOP 或虛焊晶粒，前饋退回打線機進行「安全二次補打線（Controlled Re-bond on Spare Pad）」；完全避免整顆封裝報廢。',
      rework_en: '<b>Rework/Salvage:</b> Pre-mold 3D AOI detection of NSOP feeds forward to automated rebonding stations targeting designated spare pad areas—rescuing the entire package!',
      delta_yield: '+3.1% Assembly Yield Recovered',
      spc_metric: 'Wire Sweep Rate < 3.0%, Wire Pull Strength > 5.0g'
    },
    8: {
      stage: 'Acoustic Microscopy (C-SAM) & FT Thermal Cycle Test',
      pof_zh: '底部填膠毛細滲透遇冷凝死角、助焊劑未洗淨受熱放氣（Outgassing），在冷熱循環應力下誘發微凸塊界面空洞裂紋擴展斷裂。',
      pof_en: 'Underfill capillary entrapment voids and flux residue outgassing triggering thermal fatigue solder joint micro-cracking during TC stress.',
      feedback_zh: '<b>回饋真空迴銲與清洗機 (Vacuum Reflow & Wash)：</b>導入真空抽氣迴銲爐在液相線抽除微氣泡（Void Rate < 1%）；升級多段超音波去離子水清洗去除助焊劑殘留。',
      feedback_en: '<b>Feedback to Vacuum Reflow & Solvent Cleaner:</b> Deploy vacuum reflow below liquidus to pull micro-voids (<1% area); optimize ultrasonic wash stages to eliminate ionic flux residues.',
      feedforward_zh: '<b>前饋可靠度篩檢與 ATE (Screening & 4-Wire Test)：</b>將 C-SAM 掃描之填膠微小邊緣氣泡座標前饋至終測機，啟動精準「四線式克爾文微歐姆開短路阻抗測試（4-wire Kelvin Test）」進行嚴格篩檢。',
      feedforward_en: '<b>Feedforward to Reliability Screening & ATE:</b> Forward C-SAM void location coordinates to ATE; enforce precision 4-wire Kelvin micro-resistance measurements on adjacent high-risk pins.',
      rework_zh: '<b>前饋除泡重烤：</b>在樹脂完全交聯硬化前，若超音波掃描發現輕微孔洞，前饋至高壓滅菌釜（Autoclave / Pressure Oven）在 6 bar 高壓下進行二次消泡重烤。',
      rework_en: '<b>Rework/Salvage:</b> Pre-cure stage voids can be feedforwarded to high-pressure autoclaves (6 bar N2) for void collapse and secondary bubble elimination.',
      delta_yield: '+1.6% Package Reliability Scrap Avoided',
      spc_metric: 'Underfill Void Area < 1.0% of total die area, No Corner Voids'
    },
    9: {
      stage: 'ATE Final Test / Sort (Site-to-Site Imbalance)',
      pof_zh: '測試探針卡尖端或 Socket 彈簧針（Pogo Pin）沾黏無鉛銲錫氧化皮膜，導致接觸電阻（Rc）飆升，誘發大量假性連續開路與功能誤判（Overkill）。',
      pof_en: 'Test probe needle tips and test socket pogo pins accumulating lead-free solder oxide debris (Tin Pick-up), driving Rc spikes and severe pseudo-failure overkill.',
      feedback_zh: '<b>回饋測試機台硬體管理 (Test Hardware Maintenance)：</b>自動計數器達到門檻（例如 15,000 次接觸）時，自動暫停並觸發「研磨清潔片行程（Abrasive Cleaning Pad Cycle）」；警示更換磨耗探針。',
      feedback_en: '<b>Feedback to Test Hardware Maintenance:</b> Automated touchdown counters trigger abrasive probe cleaning cycles every 15k insertions; flag worn socket pins for immediate PM replacement.',
      feedforward_zh: '<b>前饋自適應複測控制器 (Adaptive Retest Controller)：</b>前饋各測試站（Site 1~Site 8）連續失效率統計矩陣至主控軟體，動態隔離問題測試座，並僅對連續報廢晶粒啟動清潔後受控二次複測。',
      feedforward_en: '<b>Feedforward to Adaptive Retest Controller:</b> Feedforward multi-site fail counter deltas to test executive software to dynamically isolate bad test sockets and route suspected pseudo-fails to clean retest.',
      rework_zh: '<b>前饋受控清潔複測救回：</b>所有接觸阻抗超標晶片暫留緩衝托盤，待探針清潔與校正完成後執行自動化二次乾淨複測（Controlled Clean Retest），直接救回 85% 以上過殺晶粒！',
      rework_en: '<b>Rework/Salvage:</b> Suspected false-fail dies held in staging trays for automated retest immediately following probe cleaning—recovering >85% of pseudo yield loss!',
      delta_yield: '+2.8% False Yield Overkill Recovered',
      spc_metric: 'Socket Contact Resistance Rc < 0.15 Ohm, Site-to-Site Delta < 0.5%'
    },
    10: {
      stage: 'ATE Final Test / System-Level Test (Cold -40C & Hot +125C)',
      pof_zh: '傳輸線高速抖動（Jitter）、阻抗失配反射，以及內建邏輯時脈樹在極端溫度角落下的建立/保持時間（Setup/Hold Margin）不足。',
      pof_en: 'High-speed jitter, impedance mismatch reflections, and clock tree delay skews eroding setup/hold margins at cold (-40C) and hot (+125C) temperature extremes.',
      feedback_zh: '<b>回饋晶片設計與晶圓角落 (RTL/Timing Signoff & Fab Vth)：</b>反饋時序違規路徑向量至設計團隊，微調時脈樹緩衝器（Clock Buffer Tree）；反饋晶圓廠調整 NMOS/PMOS 速度角落中心值。',
      feedback_en: '<b>Feedback to Chip Design & Fab:</b> Feed timing violation vectors to design teams to optimize clock buffer distribution; feedback to fab to center NMOS/PMOS speed corner ratios.',
      feedforward_zh: '<b>前饋系統級測試與韌體 (SLT & System Bootloader)：</b>前饋 ATE 測得之眼圖開口寬度與抖動數據至 SLT 測試機，動態配置發射端/接收端均衡器抽頭參數（CTLE/FFE/DFE Registers）透過韌體最佳化補償。',
      feedforward_en: '<b>Feedforward to SLT & Firmware Calibration:</b> Forward ATE measured eye-diagram jitter and opening margins to SLT to dynamically calibrate firmware equalizer tap coefficients (CTLE/FFE/DFE).',
      rework_zh: '<b>前饋晶片內部 eFuse 暫存器微調救回：</b>透過二級測試站或開機微碼前饋調整晶片內部鎖相迴路（PLL）倍頻驅動電流與終端電阻（On-Die Termination），使時序邊限不足晶片完全達標！',
      rework_en: '<b>Rework/Salvage:</b> Re-tune on-chip PLL charge-pump currents and on-die termination (ODT) values via secondary eFuse burning—fully rehabilitating marginal silicon!',
      delta_yield: '+1.9% High-Speed Functional Yield Saved',
      spc_metric: 'Eye Width > 0.45 UI, Eye Height > 120mV at -40C to +125C'
    }
  };

  function updateFalloutSimulator() {
    const sel = document.getElementById('selFalloutMode');
    if (!sel) return;
    const item = falloutData[sel.value] || falloutData[4];
    
    const stageEl = document.getElementById('foStageText');
    const pofEl = document.getElementById('foPofText');
    const fbEl = document.getElementById('foFeedbackText');
    const ffEl = document.getElementById('foFeedforwardText');
    const rwEl = document.getElementById('foReworkText');
    const dyEl = document.getElementById('foDeltaYield');
    const spcEl = document.getElementById('foSpcMetric');

    if (stageEl) stageEl.textContent = item.stage;
    if (pofEl) pofEl.innerHTML = (currentLang === 'zh') ? item.pof_zh : item.pof_en;
    if (fbEl) fbEl.innerHTML = (currentLang === 'zh') ? item.feedback_zh : item.feedback_en;
    if (ffEl) ffEl.innerHTML = (currentLang === 'zh') ? item.feedforward_zh : item.feedforward_en;
    if (rwEl) rwEl.innerHTML = (currentLang === 'zh') ? item.rework_zh : item.rework_en;
    if (dyEl) dyEl.textContent = item.delta_yield;
    if (spcEl) spcEl.textContent = item.spc_metric;
  }
`;

// Insert jsSimulatorCode before setupOneClickZoomTriggers
html = html.replace('function setupOneClickZoomTriggers()', `${jsSimulatorCode}\n  function setupOneClickZoomTriggers()`);

// Update TOC link
html = html.replace(
  '<li><a href="#overview"><span class="zh">0. 流程總覽與 6M1E 魚骨圖</span><span class="en">0. Overview & 6M1E Fishbone</span></a></li>',
  '<li><a href="#overview"><span class="zh">0. 流程總覽、6M1E 魚骨圖與十大失效前饋控制</span><span class="en">0. Overview, 6M1E Fishbone & Top 10 Feedforward</span></a></li>'
);

// Update Footer Date and Rev
html = html.replace('Rev. H', 'Rev. I');
html = html.replace(/2026-10-21 19:55/, '2026-10-21 20:15');

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Successfully injected Section 0.3 and Fallout Simulator into index.html');
