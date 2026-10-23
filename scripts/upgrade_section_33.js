const fs = require('fs');
const path = require('path');

const section33Content = `
          <!-- 3.3 METROLOGY & GAGE R&R -->
          <h3>
            <span class="zh">3.3 量測系統誤差、MSA 與機台對齊 (Measurement System Analysis & Gage R&R)</span>
            <span class="en">3.3 Metrology Error, Measurement System Analysis (MSA) & Tool-to-Tool Matching</span>
          </h3>
          <p>
            <span class="zh">
              「如果尺本身在縮放，就無法測量零件的尺寸」。在先進半導體製程（7nm/5nm/3nm 及以下）中，電晶體關鍵尺寸（CD）公差已緊縮至 \(\\pm 0.5\\text{ nm}\) 以內。若忽視<b>量測系統分析（MSA: Measurement System Analysis）</b>與<b>機台重複性與再現性（Gage R&amp;R）</b>，工程師往往會將「量測儀器本身的高頻雜訊、探針磨耗或機台間偏差（Tool-to-Tool Offset）」誤判為「晶圓製造反應室失控」，在錯誤的方向盲目調校配方，甚至將大批良品（Good Dies）誤殺報廢！
            </span>
            <span class="en">
              "If the ruler expands and contracts, measuring the workpiece is impossible." In advanced technology nodes (7nm, 5nm, 3nm and below), critical dimension (CD) tolerances have tightened to within \(\\pm 0.5\\text{ nm}\). Ignoring <b>Measurement System Analysis (MSA)</b> and <b>Gage Repeatability &amp; Reproducibility (Gage R&amp;R)</b> causes engineers to mistake instrument noise, probe wear, or tool-to-tool offsets for silicon process excursions, triggering unwarranted recipe tweaks and catastrophic false yield fallout.
            </span>
          </p>

          <!-- 3.3.1 VARIANCE DECOMPOSITION -->
          <div style="background:var(--surface); border:1px solid var(--border); border-left:4px solid var(--accent); border-radius:6px; padding:16px; margin:16px 0;">
            <div style="font-weight:700; color:var(--accent); font-size:14px; margin-bottom:8px;">
              <span class="zh">3.3.1 半導體量測變異分解數學架構與三大判定指標</span>
              <span class="en">3.3.1 Mathematical Variance Decomposition of Metrology & Three Critical Acceptance Metrics</span>
            </div>
            <p style="font-size:13px; line-height:1.7; margin-bottom:12px;">
              <span class="zh">
                在統計製程管制中，工程師於在線 CD-SEM、橢圓儀厚度、WAT 電性測試或 ATE 測試機上所觀測到的總變異（Total Observed Variance, \(\\sigma^2_{\\text{Total}}\)），本質上是<b>真實晶圓製程變異</b>與<b>量測系統本身變異</b>之正交平方和：
              </span>
              <span class="en">
                In statistical quality engineering, the total observed variance (\(\\sigma^2_{\\text{Total}}\)) captured across inline CD-SEM, ellipsometry, WAT, or ATE test cells represents the orthogonal sum of <b>true silicon process variance</b> and <b>metrology system uncertainty</b>:
              </span>
            </p>

            <div class="formula" style="margin:12px 0;">
              \\[ \\sigma^2_{\\text{Total}} = \\sigma^2_{\\text{Process}} + \\sigma^2_{\\text{MS}} = \\sigma^2_{\\text{Part}} + \\left( \\sigma^2_{\\text{Repeatability (EV)}} + \\sigma^2_{\\text{Reproducibility (AV)}} + \\sigma^2_{\\text{Tool-to-Tool (T2T)}} \\right) \\]
            </div>

            <p style="font-size:12.5px; line-height:1.7; color:var(--ink-soft); margin-bottom:12px;">
              <span class="zh">
                &bull; <b>重複性 (Repeatability / Equipment Variation, EV)</b>：同機台、同治具、同設定下對同一測試點連續重測的純隨機高斯白雜訊（如 CD-SEM 電子束散粒雜訊、ADC 量化噪訊、探針接觸微阻力擾動）。<br>
                &bull; <b>再現性 (Reproducibility / Appraiser Variation, AV)</b>：跨班別人員、跨換模治具、或無人晶圓廠跨日溫濕度漂移引起的基準偏移。<br>
                &bull; <b>機台間偏差 (Tool-to-Tool Bias, T2T)</b>：半導體晶圓廠特有核心。同型號 10 台乾蝕刻檢驗機或 8 台 ATE 測試站之間的靜態校準差（Calibration Delta）。
              </span>
              <span class="en">
                &bull; <b>Repeatability (Equipment Variation, EV)</b>: Pure stochastic white noise during consecutive measurements on the same physical site (e.g., e-beam shot noise, ADC thermal quantization, probe micro-contact resistance jitter).<br>
                &bull; <b>Reproducibility (Appraiser Variation, AV)</b>: Shifts induced across operator shifts, fixture setups, or automated cleanroom diurnal environmental fluctuations.<br>
                &bull; <b>Tool-to-Tool Bias (T2T)</b>: Fab-specific systematic delta across equivalent fleet tools (e.g., matching across 10 CD-SEMs or 8 multi-site ATE testers).
              </span>
            </p>

            <!-- 3 METRIC BOXES -->
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:12px; margin-top:14px;">
              <div style="background:var(--surface-2); border:1px solid var(--border); border-radius:6px; padding:12px;">
                <div style="font-weight:700; color:var(--ink); font-size:13px; margin-bottom:6px;">
                  <span class="zh">指標 1：%GRR（相對於總變異）</span>
                  <span class="en">Metric 1: %GRR of Total Variation (%GRR_TV)</span>
                </div>
                <div class="formula" style="font-size:12px; padding:6px 0;">
                  \\[ \\%GRR_{\\text{TV}} = \\frac{\\sigma_{\\text{MS}}}{\\sigma_{\\text{Total}}} \\times 100\\% \\]
                </div>
                <ul style="font-size:11.5px; line-height:1.6; margin:6px 0 0 16px; padding:0; color:var(--ink-soft);">
                  <li><b style="color:var(--good);">&lt; 10%</b>：<span class="zh">優異（可直接用於 APC 閉環與高階 SPC）</span><span class="en">Excellent (APC and SPC fully reliable)</span></li>
                  <li><b style="color:var(--warn);">10% ~ 30%</b>：<span class="zh">邊際可接受（關鍵站點需多次抽樣平均）</span><span class="en">Marginal (acceptable with multi-point averaging)</span></li>
                  <li><b style="color:var(--danger);">&gt; 30%</b>：<span class="zh">不可接受（量測雜訊淹沒製程，資料失效）</span><span class="en">Unacceptable (noise drowns process variance)</span></li>
                </ul>
              </div>

              <div style="background:var(--surface-2); border:1px solid var(--border); border-radius:6px; padding:12px;">
                <div style="font-weight:700; color:var(--ink); font-size:13px; margin-bottom:6px;">
                  <span class="zh">指標 2：精度容差比 (P/T Ratio)</span>
                  <span class="en">Metric 2: Precision-to-Tolerance (P/T Ratio)</span>
                </div>
                <div class="formula" style="font-size:12px; padding:6px 0;">
                  \\[ P/T = \\frac{6 \\cdot \\sigma_{\\text{MS}}}{\\text{USL} - \\text{LSL}} \\times 100\\% \\]
                </div>
                <ul style="font-size:11.5px; line-height:1.6; margin:6px 0 0 16px; padding:0; color:var(--ink-soft);">
                  <li><b style="color:var(--good);">&lt; 10%</b>：<span class="zh">量測護欄幾乎不侵蝕生產良率</span><span class="en">Guardband negligibly impacts production yield</span></li>
                  <li><b style="color:var(--warn);">10% ~ 30%</b>：<span class="zh">需加裝 Guardband 防止客戶端漏測逃逸</span><span class="en">Guardbanding required to prevent test escapes</span></li>
                  <li><b style="color:var(--danger);">&gt; 30%</b>：<span class="zh">公差窗被儀器誤差吃光，必然引發大量假殺</span><span class="en">Tolerance window consumed by gage noise; severe false kill</span></li>
                </ul>
              </div>

              <div style="background:var(--surface-2); border:1px solid var(--border); border-radius:6px; padding:12px;">
                <div style="font-weight:700; color:var(--ink); font-size:13px; margin-bottom:6px;">
                  <span class="zh">指標 3：可分辨類別數 (ndc)</span>
                  <span class="en">Metric 3: Number of Distinct Categories (ndc)</span>
                </div>
                <div class="formula" style="font-size:12px; padding:6px 0;">
                  \\[ ndc = 1.41 \\times \\frac{\\sigma_{\\text{Process}}}{\\sigma_{\\text{MS}}} \\]
                </div>
                <ul style="font-size:11.5px; line-height:1.6; margin:6px 0 0 16px; padding:0; color:var(--ink-soft);">
                  <li><b style="color:var(--good);">&ge; 5</b>：<span class="zh">連續高解析度（符合 AIAG/半導體標準）</span><span class="en">Continuous resolution (meets semiconductor standard)</span></li>
                  <li><b style="color:var(--warn);">2 ~ 4</b>：<span class="zh">粗糙分級（僅能區分高/中/低批次）</span><span class="en">Coarse grouping (only distinguishes high/med/low)</span></li>
                  <li><b style="color:var(--danger);">&lt; 2</b>：<span class="zh">退化為 Go/No-Go 離散布林旗標，SPC 失效</span><span class="en">Degrades to discrete binary flag; SPC invalid</span></li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 3.3.2 DOMAIN TABLE -->
          <p style="margin-top:16px;">
            <span class="zh">
              下表解構半導體前段（FEOL）、中段（MOL）、後段（BEOL）及測試端 6 大核心量測領域的 Gage R&amp;R 典型失效機理與工程對策：
            </span>
            <span class="en">
              The table below deconstructs typical Gage R&amp;R failure mechanisms, false signatures, and engineering mitigations across the 6 major semiconductor metrology domains:
            </span>
          </p>

          <div class="data-table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th style="min-width:140px;"><span class="zh">量測站點與核心參數</span><span class="en">Metrology Domain &amp; Target</span></th>
                  <th style="min-width:150px;"><span class="zh">重複性誤差來源 (EV)</span><span class="en">Repeatability Sources (EV)</span></th>
                  <th style="min-width:160px;"><span class="zh">再現性與機台間差 (AV &amp; T2T)</span><span class="en">Reproducibility &amp; T2T Sources</span></th>
                  <th style="min-width:160px;"><span class="zh">良率假異常表徵</span><span class="en">False Yield Fallout Signature</span></th>
                  <th style="min-width:180px;"><span class="zh">工程消減防禦措施 (Actionable SOP)</span><span class="en">Engineering Mitigation SOP</span></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <b><span class="zh">1. 在線關鍵尺寸 (Inline CD-SEM)</span><span class="en">1. Inline CD-SEM</span></b><br>
                    <span class="badge badge-purple">FEOL Gate CD / Fin Width</span>
                  </td>
                  <td>
                    <span class="zh">高能電子束照射致光阻收縮 (PR Shrinkage)、碳氫化合物污染積碳 (Hydrocarbon Carbon Deposition)、電子束像散 (Astigmatism) 飄移。</span>
                    <span class="en">Electron beam-induced photoresist shrinkage, hydrocarbon contamination deposition, e-beam focus/astigmatism drift.</span>
                  </td>
                  <td>
                    <span class="zh">加速電壓（500V vs 800V）次級電子偵測器效率衰減差異、機台載台真空震動、演算法邊界門檻判定（Threshold % vs Derivative Max）。</span>
                    <span class="en">Secondary electron detector gain aging, stage vacuum vibration, edge-detection algorithmic threshold mismatch across tools.</span>
                  </td>
                  <td>
                    <span class="zh">量測愈多次 CD 愈小（假性過蝕刻）、多機台混合生產出現<b>雙峰（Bimodal）分佈</b>，觸發 APC 錯誤補償。</span>
                    <span class="en">Consecutive measurements artificially shrink CD; fleet mixing creates bimodal distributions that misguide APC feedback.</span>
                  </td>
                  <td>
                    <span class="zh">1. 實施非破壞單次掃描量測配方；<br>2. 每日跑標定黃金晶圓（Pitch Master）；<br>3. 建立機台間常數 Offset 虛擬補償矩陣。</span>
                    <span class="en">1. Deploy single-scan low-dose recipes;<br>2. Run daily certified Pitch Master wafers;<br>3. Enforce virtual T2T offset calibration matrices.</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b><span class="zh">2. 膜厚與光學關鍵尺寸 (Ellipsometry &amp; OCD)</span><span class="en">2. Thin Film Ellipsometry &amp; OCD</span></b><br>
                    <span class="badge badge-blue">Gate Oxide Tox / High-k Cap</span>
                  </td>
                  <td>
                    <span class="zh">雷射光源強度波動、微小光斑定位偏離微結構靶標（Box-in-Box Target 邊緣光溢出）、偏振器偏角光學熱噪聲。</span>
                    <span class="en">Laser source intensity noise, micro-spot wandering off target grating boundary, polarizer thermal angle noise.</span>
                  </td>
                  <td>
                    <span class="zh">光譜儀分光光柵波長標定誤差、薄膜折射率 \(n, k\) 模型未隨基板底層摻雜濃度連動更新、光源燈管老化光譜紅移。</span>
                    <span class="en">Spectrometer grating wavelength calibration skew, optical \(n, k\) dispersion model mismatch, lamp aging spectral redshift.</span>
                  </td>
                  <td>
                    <span class="zh">同一批晶圓換機量測時，膜厚整體平移 2~4Å；假性判定高溫氧化爐管「沉積速率異常」而空停機。</span>
                    <span class="en">Lot mean thickness artificially shifts 2-4Å upon tool swap; triggers false furnace deposition rate alarms and tool holds.</span>
                  </td>
                  <td>
                    <span class="zh">1. 導入自適應 \(n, k\) 聯動回歸模型；<br>2. 嚴格執行多機台對齊（Matching Delta &lt; 0.5Å）；<br>3. 光斑自動對焦影像輔助辨識。</span>
                    <span class="en">1. Couple \(n, k\) multi-layer dispersion fits;<br>2. Enforce cross-fleet matching delta &lt; 0.5Å;<br>3. Auto-align spot camera centering.</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b><span class="zh">3. 對準套刻誤差 (Overlay Metrology)</span><span class="en">3. Litho Overlay (Archer / AIM)</span></b><br>
                    <span class="badge badge-amber">Layer-to-Layer Alignment</span>
                  </td>
                  <td>
                    <span class="zh">載台步進干涉儀空氣紊流噪訊、光學焦點深度（DOF）微擾、邊緣晶粒光阻堆積（Edge Bead）光場畸變。</span>
                    <span class="en">Interferometer air turbulence noise, focus depth jitter, optical distortion near wafer-edge resist bead piles.</span>
                  </td>
                  <td>
                    <span class="zh">CMP 化學機械研磨引發標記非對稱侵蝕（Asymmetric Mark Erosion）、光學遠心度（Telecentricity）誤差引發成像視差。</span>
                    <span class="en">CMP-induced asymmetric target polishing, illumination telecentricity error causing apparent shift between focal planes.</span>
                  </td>
                  <td>
                    <span class="zh">晶圓邊緣 Overlay 殘差假性暴衝，微影機自動補償配方引入人為「棋盤狀對齊殘差」，導致接觸孔 Via 斷路。</span>
                    <span class="en">Apparent edge overlay flyer triggers overcorrection by scanner, generating high-order grid distortion that breaks vias.</span>
                  </td>
                  <td>
                    <span class="zh">1. 採用衍射型對準標記（SCOL / DBO 代替 IBO）；<br>2. 實施標記波形對稱度品質指標（Mark Quality Q-factor &gt; 0.9）；<br>3. 濾除研磨損傷標記點。</span>
                    <span class="en">1. Transition to diffraction-based overlay (SCOL/DBO);<br>2. Mark symmetry quality filtering (Q-factor &gt; 0.9);<br>3. Exclude CMP-deformed target sites.</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b><span class="zh">4. 晶圓電性驗證 (WAT / PCM Tester)</span><span class="en">4. Parametric WAT / PCM</span></b><br>
                    <span class="badge badge-teal" style="background:#0d9488; color:#fff;">Vth / Idsat / Ron / Breakdown</span>
                  </td>
                  <td>
                    <span class="zh">探針微接觸電阻（\(R_c\)）隨針壓微動抖動、低漏電 SMU 飛安級（fA）電流積分充電暫態延遲、繼電器開關抖動。</span>
                    <span class="en">Micro-contact resistance jitter, fA-level SMU settling time truncation on high-impedance nodes, relay bounce.</span>
                  </td>
                  <td>
                    <span class="zh">4-Wire Kelvin Sense 開路退化、切換矩陣板（Switch Matrix）漏電差異、晶圓吸盤（Chuck）溫控校準偏差（\(\\pm 1^\\circ\\text{C}\) 漂移）。</span>
                    <span class="en">Kelvin sense line open degradation, switch matrix isolation degradation, prober thermal chuck calibration delta (\(\\pm 1^\\circ\\text{C}\)).</span>
                  </td>
                  <td>
                    <span class="zh">跨機台測試 \(V_{th}\) 系統性偏移 15mV、大電流測試 \(R_{on}\) 假性飆高爆規；誤判植入劑量（Dose）機台漂移。</span>
                    <span class="en">15mV systemic \(V_{th}\) shift across testers, false high \(R_{on}\) fallout on power FETs; false dopant dose alarms.</span>
                  </td>
                  <td>
                    <span class="zh">1. 測試程式強制前置 Kelvin Loop 導通閉環檢查；<br>2. 建立自動清針打磨卡（Cleaning Wafer Pad）；<br>3. 嚴格限定矩陣板殘餘漏電 &lt; 50fA。</span>
                    <span class="en">1. Mandatory Kelvin continuity loop pre-test;<br>2. In-situ probe abrasive cleaning recipes;<br>3. Enforce prober switch matrix leakage &lt; 50fA.</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b><span class="zh">5. 晶圓針測 (CP Wafer Sort Multi-Site)</span><span class="en">5. CP Sort Multi-Site ATE</span></b><br>
                    <span class="badge badge-green">Scan / BIST / Functional Bins</span>
                  </td>
                  <td>
                    <span class="zh">探針針尖沾黏鋁屑或氧化錫微粒、針痕中心偏移（Off-center Scrub）、探針接觸下壓量（Overdrive, OD）疲勞回彈不足。</span>
                    <span class="en">Probe tips collecting Al/Sn oxide debris, scrub mark off-centering, mechanical overdrive (OD) spring fatigue.</span>
                  </td>
                  <td>
                    <span class="zh">Multi-site (Dual/Quad/Octal) 探針卡各 Site 訊號線長阻抗不匹配、載板繼電器接觸電阻老化、不同針卡製造公差。</span>
                    <span class="en">Multi-site trace impedance mismatch across Sites 1-8, relay contact degradation on probe interface boards, card-to-card variance.</span>
                  </td>
                  <td>
                    <span class="zh">晶圓圖出現規則跳躍式<b>「棋盤格失效（Checkerboard Pattern）」</b>，特定 Site 2/Site 3 良率持續低於其他站點 5%~20%。</span>
                    <span class="en">Wafer map displays checkerboard failure patterns; Site 3 yield lags other sites by 5-20% systematically.</span>
                  </td>
                  <td>
                    <span class="zh">1. 即時計算 Multi-Site Chi-Square 良率同質性；<br>2. 觸發 Site-to-Site Delta &gt; 2% 自動停機警報；<br>3. 每 250 片晶圓自動執行針尖雷射整形與清針。</span>
                    <span class="en">1. Real-time Chi-Square site homogeneity tracking;<br>2. Auto-alarm when site-to-site delta &gt; 2%;<br>3. Automated laser tip reconditioning every 250 wafers.</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b><span class="zh">6. 成品測試 (FT ATE Pogo Socket)</span><span class="en">6. Final Test Handler &amp; Socket</span></b><br>
                    <span class="badge badge-red">Tri-Temp / High-Speed PAM4 / SLT</span>
                  </td>
                  <td>
                    <span class="zh">高溫（125°C）封裝熱脹引發 Pogo Pin 接觸熱阻暴增、低溫（-40°C）凝露引發微短路、高頻高速訊號接觸點寄生電感抖動。</span>
                    <span class="en">Socket pogo spring relaxation at 125°C, moisture condensation micro-leakage at -40°C, high-speed PAM4 return-loss jitter.</span>
                  </td>
                  <td>
                    <span class="zh">不同測試機 Handler 壓合下壓力（Contact Force）不均勻、測試座更換後同軸線纜衰減率差異、ATC 主動控溫暫態響應延遲。</span>
                    <span class="en">Handler plunge force mechanical non-uniformity across tester bays, RF coaxial cable loss delta, active thermal control delay.</span>
                  </td>
                  <td>
                    <span class="zh">特定測試座（Socket #4）開路/短路（OS Fail）或高速 SerDes 眼圖測試大量失效率飆高，更換測試座即恢復正常。</span>
                    <span class="en">Specific socket cavity (#4) suffers massive OS or SerDes eye closure fails; recovered immediately upon socket swap.</span>
                  </td>
                  <td>
                    <span class="zh">1. 記錄每個 Socket 的累計插拔次數（Touchdown Counter &lt; 50k）；<br>2. 部署實時連續 3 顆相同 Bin-Fail 停機機制（Spike Interlock）；<br>3. 定期 TDR 時域反射計量測阻抗連續性。</span>
                    <span class="en">1. Track socket touchdown count (retire &lt; 50k);<br>2. Consecutive 3-fail tester interlock trigger;<br>3. Periodic TDR impedance discontinuity profiling.</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 3.3.3 GUARDBANDING MODEL -->
          <div style="background:var(--surface); border:1px solid var(--border); border-left:4px solid var(--warn); border-radius:6px; padding:16px; margin:18px 0;">
            <div style="font-weight:700; color:var(--warn); font-size:14px; margin-bottom:8px;">
              <span class="zh">3.3.3 量測護欄防線：Guardband 統計模型與 Type I / Type II 成本最佳化</span>
              <span class="en">3.3.3 Guardband Optimization Model: Balancing Type I False Kills vs. Type II Test Escapes</span>
            </div>
            <p style="font-size:13px; line-height:1.7; margin-bottom:12px;">
              <span class="zh">
                當量測系統的不確定度（Measurement Uncertainty, \(\\sigma_{\\text{MS}}\)）無法進一步壓縮時，半導體測試工程必須在<b>客戶規格極限（Customer Spec Limits: LSL / USL）</b>內側退縮一個安全防護區間，此即為<b>測試護欄（Guardband, GB）</b>：
              </span>
              <span class="en">
                When measurement uncertainty (\(\\sigma_{\\text{MS}}\)) reaches physical limits, test engineering must shrink the operational test limits inward from the <b>Customer Specification Limits (LSL / USL)</b> by an offset termed the <b>Guardband (GB)</b>:
              </span>
            </p>

            <div class="formula" style="margin:12px 0;">
              \\[ \\text{TUL (Test Upper Limit)} = \\text{USL} - k \\cdot \\sigma_{\\text{MS}}, \\qquad \\text{TLL (Test Lower Limit)} = \\text{LSL} + k \\cdot \\sigma_{\\text{MS}} \\]
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:12px;">
              <div style="background:var(--surface-2); border-radius:6px; padding:12px;">
                <div style="font-weight:700; color:var(--danger); font-size:12.5px; margin-bottom:4px;">
                  <span class="zh">生產者風險 (Type I / &alpha; 錯誤：假殺 False Kill)</span>
                  <span class="en">Producer's Risk (Type I / &alpha; Error: False Kill)</span>
                </div>
                <p style="font-size:12px; line-height:1.6; margin:0; color:var(--ink-soft);">
                  <span class="zh">
                    真實晶片參數合格（在規格內），但因量測系統正向高斯噪聲疊加，測量值被推高超出 TUL 而被誤判報廢。<b>後果：晶圓廠良率被冤枉殺死（Yield Loss），製造成本飆高。</b>
                  </span>
                  <span class="en">
                    True silicon parameter is conforming, but positive gage noise pushes the observed reading past the TUL. <b>Consequence: Direct unrecoverable yield loss and scrap cost.</b>
                  </span>
                </p>
              </div>

              <div style="background:var(--surface-2); border-radius:6px; padding:12px;">
                <div style="font-weight:700; color:var(--warn); font-size:12.5px; margin-bottom:4px;">
                  <span class="zh">消費者風險 (Type II / &beta; 錯誤：漏測 Test Escape)</span>
                  <span class="en">Consumer's Risk (Type II / &beta; Error: Test Escape)</span>
                </div>
                <p style="font-size:12px; line-height:1.6; margin:0; color:var(--ink-soft);">
                  <span class="zh">
                    真實晶片參數超規（次級瑕疵品），但因負向儀表噪聲抵銷，測量值落入 TUL 內而被判定合格放行。<b>後果：瑕疵晶片流至客戶端組裝，引發車用/資料中心死機與千萬級 RMA 索賠。</b>
                  </span>
                  <span class="en">
                    True silicon parameter is non-conforming, but negative gage noise pulls it inside test limits. <b>Consequence: Latent defect escapes to customer, triggering field failures and millions in RMA claims.</b>
                  </span>
                </p>
              </div>
            </div>

            <p style="font-size:12px; line-height:1.6; margin-top:12px; color:var(--ink);">
              <span class="zh">
                <b>現代動態自適應護欄 (Dynamic Adaptive Guardband)</b>：固定式 \(k=3\) 護欄會永久犧牲 1%~3% 良率。現代頂尖晶圓廠導入即時製程能力連動機制：當該批次參數 \(C_{pk} &gt; 2.0\)（製程離邊界極遠）時，自動將 \(k\) 下調至 \(1.5\\sigma_{\\text{MS}}\) 釋放良率；若 \(C_{pk} &lt; 1.33\)（製程邊際），系統自動擴張護欄至 \(3.5\\sigma_{\\text{MS}}\) 封死任何外流可能。
              </span>
              <span class="en">
                <b>Modern Dynamic Adaptive Guardbanding</b>: Fixed \(k=3\) guardbands permanently sacrifice 1%-3% yield. Tier-1 fabs link guardbands to instantaneous process capability: when lot \(C_{pk} &gt; 2.0\) (distribution far from limits), \(k\) drops to \(1.5\\sigma_{\\text{MS}}\) to recover yield; when \(C_{pk} &lt; 1.33\) (marginal), the engine expands guardbands to \(3.5\\sigma_{\\text{MS}}\) to eliminate customer escapes.
              </span>
            </p>
          </div>

          <!-- 3.3.4 TOOL-TO-TOOL MATCHING 5-STEP SOP -->
          <div style="background:var(--surface); border:1px solid var(--border); border-radius:6px; padding:16px; margin:16px 0;">
            <div style="font-weight:700; color:var(--accent); font-size:14px; margin-bottom:8px;">
              <span class="zh">3.3.4 機台間校準與對齊實務 SOP (Tool-to-Tool Matching 5-Step Protocol)</span>
              <span class="en">3.3.4 Tool-to-Tool Matching 5-Step Engineering Standard Operating Procedure</span>
            </div>
            <ol style="font-size:12.5px; line-height:1.7; margin:0 0 0 20px; padding:0;">
              <li>
                <b><span class="zh">建立受控黃金晶圓循環庫 (Golden Wafer Library)</span><span class="en">Deploy a Controlled Golden Wafer Library</span></b>：
                <span class="zh">嚴禁使用客戶生產晶圓做為校準依據。必須製備永久固化、具備防刮塗層與雷射刻印識別的標準黃金晶圓（包含標準 CD、厚度、阻抗及標準合格 Die），真空封裝於專用標定 FOUP 內。</span>
                <span class="en">Never use production wafers for calibration. Prepare certified, scratch-resistant, laser-serialized golden wafers (featuring calibrated CD, film thickness, sheet resistance, and known good dies) stored in dedicated vacuum FOUPs.</span>
              </li>
              <li>
                <b><span class="zh">Bland-Altman 一致性檢定 (Limits of Agreement)</span><span class="en">Bland-Altman Agreement &amp; Bias Analysis</span></b>：
                <span class="zh">針對基準機台（Tool A）與候選機台（Tool B）重複量測同一批測試點，計算差值平均值（Mean Bias \(\\bar{d}\)）與差值標準差（\(S_d\)）。若 95% 一致性限額（\(\\bar{d} \\pm 1.96 S_d\)）超越規格公差的 10%，判定機台間未對齊。</span>
                <span class="en">Measure the same targets across baseline Tool A and candidate Tool B; evaluate mean difference (\(\\bar{d}\)) and standard deviation (\(S_d\)). If 95% limits of agreement (\(\\bar{d} \\pm 1.96 S_d\)) exceed 10% of tolerance, tool matching fails.</span>
              </li>
              <li>
                <b><span class="zh">Youden 雙變數散佈圖分離系統誤差 (Youden Plot Diagnostics)</span><span class="en">Youden Plot Systemic vs. Random Decomposition</span></b>：
                <span class="zh">在兩片不同特徵晶圓（Wafer 1 與 Wafer 2）上比對各機台量測值。落在 45 度對角線上的離散點代表純隨機雜訊；沿著對角線整體平移的偏離點則指示機台存在<b>系統性增益/截距偏差（Systematic Scale/Offset Error）</b>。</span>
                <span class="en">Plot measurements of two distinct standard wafers across all tools. Scatter perpendicular to the 45° diagonal represents random noise; distance along or parallel to the diagonal isolates systematic scale and offset errors.</span>
              </li>
              <li>
                <b><span class="zh">YMS 虛擬機台校準係數補償 (Virtual Tool Offset in YMS/MES)</span><span class="en">Virtual Tool Offset Compensation in YMS/MES</span></b>：
                <span class="zh">在硬體無法進一步機械微調時，禁止現場操作員私自修改機台配方常數。應於 YMS 資料庫中建立機台校正表（\(Y_{\\text{calibrated}} = \\alpha_i \\cdot Y_{\\text{raw}} + \\beta_i\)），在資料入庫時自動對齊至基準機台，徹底消弭跨機台雙峰假象。</span>
                <span class="en">When hardware mechanical tuning reaches limits, operators are prohibited from altering tool recipe constants. Deploy software offsets in YMS (\(Y_{\\text{calibrated}} = \\alpha_i \\cdot Y_{\\text{raw}} + \\beta_i\)) to normalize all data entering the repository.</span>
              </li>
              <li>
                <b><span class="zh">動態機台偏差控制圖 (Dynamic Matching SPC Interlock)</span><span class="en">Dynamic Matching SPC Interlock</span></b>：
                <span class="zh">各檢驗機台每 24 小時強制跑一片標定晶圓，將機台對齊偏差（Tool Delta）納入 SPC 管制圖。一旦 Tool Delta 連續 3 點超出 \(\\pm 2\\sigma_{\\text{MS}}\)，MES 自動鎖定該機台進料（Machine Auto-Inhibit），防範失真量測流入產線。</span>
                <span class="en">Force a daily 24-hour golden wafer verification run per tool; plot Tool Delta on real-time SPC charts. If Delta breaches \(\\pm 2\\sigma_{\\text{MS}}\) for 3 consecutive points, MES auto-inhibits the tool from production.</span>
              </li>
            </ol>
          </div>

          <!-- 3.3.5 RETIRED CALLOUT ENHANCED -->
          <div class="callout danger" style="margin-top:16px;">
            <div class="callout-title">
              <span>📐</span>
              <span class="zh">硬體陷阱專題：4 線式 Kelvin 量測開路陷阱 (4-Wire Kelvin Sense Open Trap)</span>
              <span class="en">Hardware Trap: 4-Wire Kelvin Sense Open Degradation</span>
            </div>
            <p>
              <span class="zh">
                <b>致命現象</b>：在 WAT 或 CP 測量導通電阻（\(R_{on}\)）、閘極臨界電壓（\(V_{th}\)）或大電流開關時，若探針卡 Sense 訊號線虛焊、老化或斷針，量測系統會悄然無聲地由<b>「4 線精準 Kelvin 感測」退化為「2 線粗略量測」</b>。<br>
                此時，測試電纜、繼電器與探針接觸電阻（約 1.5–3.0Ω）被直接累加到晶片元件數值中，導致整體批次被判定為「導通阻抗飆高爆規報廢」。<br>
                <b>防禦檢驗 SOP</b>：測試程式前置必須加入強制 <b>Kelvin Loop Continuity Check</b>，確認 Force 與 Sense 迴路阻抗 &lt; 0.5Ω；若阻抗異常立即終止測試並報警清針。
              </span>
              <span class="en">
                <b>Fatal Phenomenon</b>: When measuring on-resistance (\(R_{on}\)), \(V_{th}\), or high-current switches, a broken or oxidised Kelvin Sense needle silently degrades the instrument from <b>4-wire true Kelvin sensing into a 2-wire loop</b> without triggering an instrument error.<br>
                Cable, switch matrix, and probe contact resistances (1.5–3.0Ω) are directly summed into the measured device, falsely scrapping entire lots for "high on-resistance".<br>
                <b>Defense SOP</b>: Test programs must execute a mandatory <b>Kelvin Loop Continuity Check</b> prior to parametric measurement, ensuring Force-Sense loop resistance &lt; 0.5Ω.
              </span>
            </p>
          </div>
`;

const indexPath = path.resolve(__dirname, '../index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Target block in index.html to replace
const targetStart = '<!-- 3.3 METROLOGY & GAGE R&R -->';
const targetEnd = '<!-- 3.4 RAW MATERIALS & DIFFUSION -->';

const idxStart = html.indexOf(targetStart);
const idxEnd = html.indexOf(targetEnd);

if (idxStart === -1 || idxEnd === -1) {
  console.error('Target anchors not found!');
  process.exit(1);
}

const before = html.substring(0, idxStart);
const after = html.substring(idxEnd);

const newHtml = before + section33Content.trim() + '\n\n          ' + after;
fs.writeFileSync(indexPath, newHtml, 'utf8');
console.log('Successfully upgraded Section 3.3 in index.html!');
