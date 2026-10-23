const fs = require('fs');
const path = require('path');

const content336_337 = `
          <!-- 3.3.6 16-SITE MULTI-SITE IDENTIFICATION -->
          <div style="background:var(--surface); border:1px solid var(--border); border-left:4px solid #6366f1; border-radius:6px; padding:18px; margin:20px 0;">
            <div style="font-weight:700; color:#6366f1; font-size:14px; margin-bottom:8px;">
              <span class="zh">3.3.6 16-Site（及高多工多站點）量測異常快速辨識與定位方法論</span>
              <span class="en">3.3.6 16-Site (and High-Parallelism Multi-Site) Measurement Anomaly Identification & Diagnostics</span>
            </div>
            <p style="font-size:13px; line-height:1.7; margin-bottom:12px;">
              <span class="zh">
                現代高產量（HVM）晶圓測試（CP）與成品測試（FT）普遍採用 <b>16-Site（4×4 排列）甚至 32/64-Site 平行測試</b>以極大化產能（UPH）。然而，多站點測試引入了高度複雜的硬體交互作用：探針卡訊號走線偏斜、繼電器損耗、多通道 SMU 校準差、載台機械傾角、以及多晶粒並行抽電時的瞬態電源壓降（IR Drop）。工程師必須掌握以下 <b>4 大快速辨識演算法與物理定位維度</b>：
              </span>
              <span class="en">
                Modern high-volume manufacturing (HVM) wafer sort (CP) and final test (FT) deploy <b>16-site (4×4 array) or 32/64-site parallel testing</b> to maximize units-per-hour (UPH). However, multi-site architectures introduce complex instrumentation cross-talk: probe card trace skew, relay aging, multi-channel SMU calibration drift, chuck planarity tilt, and transient power droop (IR drop) during simultaneous vector bursts. Engineers rely on the following <b>4 rapid diagnostic algorithms and physical localization dimensions</b>:
              </span>
            </p>

            <!-- 4 DIMENSIONS GRID -->
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:12px; margin-top:12px;">
              <div style="background:var(--surface-2); border-radius:6px; padding:12px; border:1px solid var(--border);">
                <div style="font-weight:700; color:var(--ink); font-size:12.5px; margin-bottom:4px;">
                  <span class="zh">1. 幾何步進映射與 Modulo 簽名 (Touchdown Mapping)</span>
                  <span class="en">1. Touchdown Modulo Geometric Mapping</span>
                </div>
                <p style="font-size:12px; line-height:1.6; margin:0; color:var(--ink-soft);">
                  <span class="zh">
                    將晶圓晶粒座標 \((X, Y)\) 透過下壓步進向量進行餘數映射：
                    <br><code style="background:var(--surface); padding:2px 4px; border-radius:3px;">Site = (X mod 4) + 4 &times; (Y mod 4) + 1</code><br>
                    若晶圓良率地圖呈現週期性跳躍的<b>「16 晶粒步進棋盤格（Touchdown Footprint Artifact）」</b>，可 100% 斷定為測試座/針卡站點異常，徹底排除 Fab 製程問題。
                  </span>
                  <span class="en">
                    Map die coordinates \((X, Y)\) via modulo touchdown indexing:
                    <br><code style="background:var(--surface); padding:2px 4px; border-radius:3px;">Site = (X mod 4) + 4 &times; (Y mod 4) + 1</code><br>
                    A periodic 16-die stepping footprint artifact on the wafer map guarantees 100% test hardware culpability, clearing the wafer fab.
                  </span>
                </p>
              </div>

              <div style="background:var(--surface-2); border-radius:6px; padding:12px; border:1px solid var(--border);">
                <div style="font-weight:700; color:var(--ink); font-size:12.5px; margin-bottom:4px;">
                  <span class="zh">2. 卡方同質性即時檢定 (Chi-Square Homogeneity Test)</span>
                  <span class="en">2. Real-Time Chi-Square Site Homogeneity Test</span>
                </div>
                <p style="font-size:12px; line-height:1.6; margin:0; color:var(--ink-soft);">
                  <span class="zh">
                    檢定各站點間良品/不良品數值分佈是否同質：
                    \\[ \\chi^2 = \\sum_{i=1}^{16} \\frac{(O_{i} - E_{i})^2}{E_{i}}, \\quad df = 15 \\]
                    在 \(\\alpha=0.001\) 顯著水準下，若 \(\\chi^2 &gt; 37.7\) 或站點間良率差 <b>\(\\Delta Y_{\\text{site}} &gt; 2.0\\%\)</b>，ATE 立即觸發自動警報並暫停進料。
                  </span>
                  <span class="en">
                    Tests whether pass/fail counts are statistically homogeneous across all 16 sites:
                    \\[ \\chi^2 = \\sum_{i=1}^{16} \\frac{(O_{i} - E_{i})^2}{E_{i}}, \\quad df = 15 \\]
                    At \(\\alpha=0.001\), if \(\\chi^2 &gt; 37.7\) or site-to-site delta <b>\(\\Delta Y_{\\text{site}} &gt; 2.0\\%\)</b>, the ATE interlock halts testing immediately.
                  </span>
                </p>
              </div>

              <div style="background:var(--surface-2); border-radius:6px; padding:12px; border:1px solid var(--border);">
                <div style="font-weight:700; color:var(--ink); font-size:12.5px; margin-bottom:4px;">
                  <span class="zh">3. 16-Site Bin 失效柏拉圖特徵矩陣 (Bin-by-Site Signature)</span>
                  <span class="en">3. 16-Site Bin-by-Site Failure Pareto Matrix</span>
                </div>
                <p style="font-size:12px; line-height:1.6; margin:0; color:var(--ink-soft);">
                  <span class="zh">
                    &bull; <b>單一 Site 專屬 Bin 2 (Open/Short) 飆高</b>：該站點探針斷針、沾黏錫渣氧化、或 Pogo 彈簧老化疲勞；<br>
                    &bull; <b>單一 Site 專屬 Bin 5 (PLL Clock/At-Speed) 失效</b>：該站點高速同軸線阻抗失配（\(&gt;50\\Omega\\)）、高頻衰減過大；<br>
                    &bull; <b>四外角 Site (1, 4, 13, 16) 同步低良率</b>：載台邊角下垂（Corner Droop）或地迴路阻抗偏大。
                  </span>
                  <span class="en">
                    &bull; <b>Isolated Site Bin 2 (Open/Short) spike</b>: Broken/dirty probe tip or worn pogo spring on that specific socket;<br>
                    &bull; <b>Isolated Site Bin 5 (At-Speed) failure</b>: Coaxial trace impedance mismatch (\(&gt;50\\Omega\)) or high-frequency attenuation;<br>
                    &bull; <b>Four corner sites (1, 4, 13, 16) lagging</b>: Probe card corner mechanical droop or localized ground bounce.
                  </span>
                </p>
              </div>

              <div style="background:var(--surface-2); border-radius:6px; padding:12px; border:1px solid var(--border);">
                <div style="font-weight:700; color:var(--ink); font-size:12.5px; margin-bottom:4px;">
                  <span class="zh">4. 載台傾角與多晶粒抽電壓降 (Tilt &amp; Dynamic IR Drop)</span>
                  <span class="en">4. Chuck Planarity Tilt &amp; Parallel IR Drop</span>
                </div>
                <p style="font-size:12px; line-height:1.6; margin:0; color:var(--ink-soft);">
                  <span class="zh">
                    &bull; <b>載台傾角 (Chuck Pitch/Roll Tilt)</b>：若良率呈左高右低（Site 1-4: 99%, Site 13-16: 75%），代表載台不平整，右側針壓不足；<br>
                    &bull; <b>中心站點壓降 (Center Droop)</b>：內部 Sites (6, 7, 10, 11) 共用內部電源平面，16 顆全速抽電時瞬態 \(L \\frac{di}{dt}\) 最大，引發假性頻率不足。
                  </span>
                  <span class="en">
                    &bull; <b>Chuck Tilt</b>: Directional gradient (e.g. Sites 1-4: 99%, Sites 13-16: 75%) indicates prober chuck tilt and insufficient overdrive on the low side;<br>
                    &bull; <b>Center Voltage Droop</b>: Inner sites (6, 7, 10, 11) suffer severe transient \(L \\frac{di}{dt}\) droop during simultaneous switching, triggering false timing fails.
                  </span>
                </p>
              </div>
            </div>

            <div style="background:var(--surface-2); border-radius:6px; padding:12px; margin-top:14px; font-size:12px; line-height:1.6;">
              <span class="zh">
                <b>16-Site 實戰現場應急 SOP</b>：當判定為特定 Site 失效（如 Site 7）：
                <b>Step 1</b> 立即啟動原位自動雷射清針（Auto Scrub Clean）；
                <b>Step 2</b> 若清針後 2 次 Touchdown 仍 Fail，測試系統自動進入<b>「單站隔離模式（Site Disable: 轉為 15-Site 運行）」</b>，既保證其餘 15 站繼續高速生產，又徹底防堵損壞針尖持續屠殺良品！
              </span>
              <span class="en">
                <b>16-Site Emergency Action SOP</b>: When an isolated site failure is detected (e.g., Site 7):
                <b>Step 1</b> Immediately execute in-situ automated laser/abrasive probe tip cleaning;
                <b>Step 2</b> If failures persist for 2 touchdowns after cleaning, the tester auto-engages <b>"Site Disable Mode" (runs as 15-site)</b>, allowing production to continue safely while completely eliminating false fallout from the defective site.
              </span>
            </div>
          </div>

          <!-- 3.3.7 MSA REAL MOCK DATASET -->
          <div style="background:var(--surface); border:1px solid var(--border); border-left:4px solid var(--good); border-radius:6px; padding:18px; margin:20px 0;">
            <div style="font-weight:700; color:var(--good); font-size:14px; margin-bottom:8px;">
              <span class="zh">3.3.7 MSA 實戰數據模擬：6 種量測漂移模式對照表（含真實 Mock 數據集）</span>
              <span class="en">3.3.7 MSA Real-World Mock Dataset: 6 Metrology Drift Signatures (Shifts, Skew, Loop Run &amp; Periodic Trends)</span>
            </div>
            <p style="font-size:13px; line-height:1.7; margin-bottom:12px;">
              <span class="zh">
                為讓工程師具備直觀的數據解讀能力，下表模擬同一標準黃金晶粒（Golden Die，標稱基準值 <b>Nominal = 1.0000 V</b>，工程規格門檻 <b>LSL = 0.9800 V, USL = 1.0200 V</b>）在 10 次連續循環測試（10 Loop Runs）中，遭遇 6 種典型量測儀表故障時的真實數據特徵與統計指標對比：
              </span>
              <span class="en">
                To build intuitive data diagnostics, the table below provides a quantified mock dataset of a certified Golden Device (<b>Nominal = 1.0000 V</b>, Specification Limits: <b>LSL = 0.9800 V, USL = 1.0200 V</b>) evaluated across 10 consecutive measurement loop runs under 6 canonical metrology degradation modes:
              </span>
            </p>

            <div class="data-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th><span class="zh">循環次數<br>(Run #)</span><span class="en">Loop<br>Run #</span></th>
                    <th><span class="zh">模式 1: 正常受控<br>(In-Control)</span><span class="en">Mode 1: Normal<br>In-Control</span></th>
                    <th><span class="zh">模式 2: 中位數平移<br>(Median Shift)</span><span class="en">Mode 2: Median<br>Shift (+18mV)</span></th>
                    <th><span class="zh">模式 3: 離散度暴增<br>(Total / Var Shift)</span><span class="en">Mode 3: Variance<br>Explosion (5x &sigma;)</span></th>
                    <th><span class="zh">模式 4: 高側偏斜<br>(High-Side Shift)</span><span class="en">Mode 4: High-Side<br>Asymmetric Tail</span></th>
                    <th><span class="zh">模式 5: 連續自發熱漂移<br>(Loop Run Drift)</span><span class="en">Mode 5: Self-Heat<br>Monotonic Drift</span></th>
                    <th><span class="zh">模式 6: 溫控正弦振盪<br>(Periodic Trend)</span><span class="en">Mode 6: Periodic<br>Thermal Sine Wave</span></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>Run 01</b></td>
                    <td>1.0002</td>
                    <td>1.0181</td>
                    <td>0.9991</td>
                    <td>1.0004</td>
                    <td>1.0002</td>
                    <td>1.0000</td>
                  </tr>
                  <tr>
                    <td><b>Run 02</b></td>
                    <td>0.9997</td>
                    <td>1.0179</td>
                    <td>1.0184</td>
                    <td>1.0001</td>
                    <td>1.0018</td>
                    <td>1.0071</td>
                  </tr>
                  <tr>
                    <td><b>Run 03</b></td>
                    <td>1.0005</td>
                    <td>1.0184</td>
                    <td>0.9842</td>
                    <td>1.0006</td>
                    <td>1.0039</td>
                    <td>1.0100 <span class="badge badge-amber" style="font-size:9.5px;">Peak</span></td>
                  </tr>
                  <tr>
                    <td><b>Run 04</b></td>
                    <td>0.9998</td>
                    <td>1.0180</td>
                    <td>1.0195</td>
                    <td>1.0002</td>
                    <td>1.0061</td>
                    <td>1.0071</td>
                  </tr>
                  <tr>
                    <td><b>Run 05</b></td>
                    <td>1.0003</td>
                    <td>1.0182</td>
                    <td>0.9811</td>
                    <td>1.0005</td>
                    <td>1.0084</td>
                    <td>1.0000</td>
                  </tr>
                  <tr>
                    <td><b>Run 06</b></td>
                    <td>0.9999</td>
                    <td>1.0185 <span class="badge badge-red" style="font-size:9.5px;">Near USL</span></td>
                    <td>1.0210 <span class="badge badge-red" style="font-size:9.5px;">&gt; USL Fail</span></td>
                    <td>1.0010</td>
                    <td>1.0105</td>
                    <td>0.9929</td>
                  </tr>
                  <tr>
                    <td><b>Run 07</b></td>
                    <td>1.0001</td>
                    <td>1.0180</td>
                    <td>0.9785 <span class="badge badge-red" style="font-size:9.5px;">&lt; LSL Fail</span></td>
                    <td>1.0003</td>
                    <td>1.0128</td>
                    <td>0.9900 <span class="badge badge-blue" style="font-size:9.5px;">Trough</span></td>
                  </tr>
                  <tr>
                    <td><b>Run 08</b></td>
                    <td>1.0004</td>
                    <td>1.0183</td>
                    <td>1.0172</td>
                    <td>1.0198 <span class="badge badge-red" style="font-size:9.5px;">Spike</span></td>
                    <td>1.0149</td>
                    <td>0.9929</td>
                  </tr>
                  <tr>
                    <td><b>Run 09</b></td>
                    <td>0.9996</td>
                    <td>1.0178</td>
                    <td>0.9830</td>
                    <td>1.0215 <span class="badge badge-red" style="font-size:9.5px;">&gt; USL Fail</span></td>
                    <td>1.0172</td>
                    <td>1.0000</td>
                  </tr>
                  <tr>
                    <td><b>Run 10</b></td>
                    <td>1.0001</td>
                    <td>1.0182</td>
                    <td>1.0218 <span class="badge badge-red" style="font-size:9.5px;">&gt; USL Fail</span></td>
                    <td>1.0004</td>
                    <td>1.0195 <span class="badge badge-red" style="font-size:9.5px;">Thermal Limit</span></td>
                    <td>1.0071</td>
                  </tr>
                  <tr style="background:var(--surface-2); font-weight:700;">
                    <td><b>平均值 &mu;</b></td>
                    <td>1.0001 V</td>
                    <td>1.0181 V</td>
                    <td>1.0004 V</td>
                    <td>1.0045 V</td>
                    <td>1.0095 V</td>
                    <td>1.0007 V</td>
                  </tr>
                  <tr style="background:var(--surface-2); font-weight:700;">
                    <td><b>中位數 &tilde;x</b></td>
                    <td>1.0001 V</td>
                    <td>1.0181 V</td>
                    <td>1.0081 V</td>
                    <td>1.0004 V</td>
                    <td>1.0095 V</td>
                    <td>1.0000 V</td>
                  </tr>
                  <tr style="background:var(--surface-2); font-weight:700;">
                    <td><b>標準差 &sigma;</b></td>
                    <td><b>0.0003 V</b></td>
                    <td>0.0002 V</td>
                    <td><b style="color:var(--danger);">0.0178 V (59x)</b></td>
                    <td>0.0084 V</td>
                    <td>0.0065 V (趨勢)</td>
                    <td>0.0071 V (正弦)</td>
                  </tr>
                  <tr style="background:var(--surface-2); font-weight:700;">
                    <td><b>全距 Range</b></td>
                    <td>0.0009 V</td>
                    <td>0.0007 V</td>
                    <td><b style="color:var(--danger);">0.0433 V</b></td>
                    <td>0.0214 V</td>
                    <td>0.0193 V</td>
                    <td>0.0200 V</td>
                  </tr>
                  <tr style="background:var(--surface-2); font-weight:700;">
                    <td><b>偏度 Skew</b></td>
                    <td>0.02 (對稱)</td>
                    <td>0.01 (對稱)</td>
                    <td>-0.08 (分散)</td>
                    <td><b style="color:var(--danger);">+2.31 (極度右偏)</b></td>
                    <td>0.05 (單調線性)</td>
                    <td>-0.01 (正弦對稱)</td>
                  </tr>
                  <tr style="background:var(--surface-2);">
                    <td><b>物理真因判定</b></td>
                    <td>
                      <span class="badge badge-green">完全受控</span><br>
                      <span style="font-size:11px; color:var(--ink-soft);">正常儀表白噪聲</span>
                    </td>
                    <td>
                      <span class="badge badge-amber">校準階躍偏差</span><br>
                      <span style="font-size:11px; color:var(--ink-soft);">電壓基準 DAC 偏移、更換線纜未做 Zero Cal</span>
                    </td>
                    <td>
                      <span class="badge badge-red">量測噪訊失控</span><br>
                      <span style="font-size:11px; color:var(--ink-soft);">接地屏蔽破損、探針機械共振抖動、接觸微弧</span>
                    </td>
                    <td>
                      <span class="badge badge-red">長尾非對稱洩漏</span><br>
                      <span style="font-size:11px; color:var(--ink-soft);">探針針尖沾黏氧化、繼電器偶發漏電微短路</span>
                    </td>
                    <td>
                      <span class="badge badge-purple">熱累積單調漂移</span><br>
                      <span style="font-size:11px; color:var(--ink-soft);">連續測試元件自發熱 (Self-Heating)、探針接觸電阻熱阻</span>
                    </td>
                    <td>
                      <span class="badge badge-blue">環境週期性共振</span><br>
                      <span style="font-size:11px; color:var(--ink-soft);">無塵室空調壓縮機/冰水循環 15 分鐘週期波動</span>
                    </td>
                  </tr>
                  <tr style="background:var(--surface-2);">
                    <td><b>工程矯正 SOP</b></td>
                    <td>定期維持每日 Golden Wafer 點檢即可。</td>
                    <td>執行儀表硬體歸零校準（Null/Zero Calibration），更新 YMS 偏移係數。</td>
                    <td>全面檢查同軸線屏蔽接地（Shield Grounding），更換損壞探針卡彈簧。</td>
                    <td>立即執行探針砂紙打磨（Probe Polish），更換老化切換矩陣板繼電器。</td>
                    <td>在測試向量中插入冷卻延遲（Cooling Delay 10ms），或開啟 ATC 主動致冷。</td>
                    <td>為測試機台裝設專用精密獨立恆溫箱，隔離外部空調氣流擾動。</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style="margin-top:14px; font-size:12.5px; line-height:1.7; color:var(--ink-soft);">
              <span class="zh">
                <b>診斷精髓</b>：
                &bull; 若發現 <b>平均值偏移但標準差極小（模式 2）</b>：問題出在校準係數，直接軟體補償即可恢復；<br>
                &bull; 若發現 <b>平均值不變但標準差暴增（模式 3）</b>：切忌調整配方！純屬機械或電氣接觸接觸不良；<br>
                &bull; 若發現 <b>中位數正常但偏度 &gt; 1.5 且頻頻出現上限單邊 Spike（模式 4）</b>：必為探針尖氧化物附著（Oxide Clogging）；<br>
                &bull; 若發現 <b>隨著 Loop 次數直線爬升（模式 5）</b>：測試程式未給予充足散熱時間，高溫引發載子遷移率衰減；<br>
                &bull; 若呈現 <b>上下規律波動（模式 6）</b>：將量測時序訊號進行傅立葉變換（FFT），必能對應到廠務冰水機或無塵室 FFU 風車的物理運行週期！
              </span>
              <span class="en">
                <b>Diagnostic Rule of Thumb</b>:
                &bull; <b>Shifted mean with tight sigma (Mode 2)</b>: Pure calibration delta; correctable via software offset calibration without hardware disruption;<br>
                &bull; <b>Identical mean with exploded sigma (Mode 3)</b>: Never adjust process recipes! Points strictly to mechanical chattering or RF ground shield loss;<br>
                &bull; <b>Normal median with skewness &gt; 1.5 and unilateral high-side spikes (Mode 4)</b>: Definitive signature of probe tip oxide accretion;<br>
                &bull; <b>Linear monotonic rise with loop run count (Mode 5)</b>: Missing inter-vector thermal cooling delay; device heating lowers mobility and shifts thresholds;<br>
                &bull; <b>Periodic sinusoidal cycling (Mode 6)</b>: FFT analysis of the time series directly maps to the facility chiller compressor or cleanroom FFU HVAC cycle!
              </span>
            </div>
          </div>
`;

const indexPath = path.resolve(__dirname, '../index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Target anchor: place immediately after 3.3.5 callout, before 3.4
const targetStart = '<!-- 3.3.5 RETIRED CALLOUT ENHANCED -->';
const targetEnd = '<!-- 3.4 RAW MATERIALS & DIFFUSION -->';

const idxStart = html.indexOf(targetStart);
const idxEnd = html.indexOf(targetEnd);

if (idxStart === -1 || idxEnd === -1) {
  console.error('Target anchors not found!');
  process.exit(1);
}

// Find the closing </div> of 3.3.5 callout
const closingDivIdx = html.indexOf('</div>', idxStart);
const endOfCallout = html.indexOf('</div>', closingDivIdx + 6) + 6;

const before = html.substring(0, endOfCallout);
const after = html.substring(idxEnd);

const newHtml = before + '\n' + content336_337.trim() + '\n\n          ' + after;
fs.writeFileSync(indexPath, newHtml, 'utf8');
console.log('Successfully inserted Section 3.3.6 and 3.3.7 into index.html!');
