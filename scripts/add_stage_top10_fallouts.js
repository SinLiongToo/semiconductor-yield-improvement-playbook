const fs = require('fs');
const path = require('path');

const indexPath = path.resolve(__dirname, '../index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Build the Stage-by-Stage Top 10 Fallouts Section (Section 0.4)
const section04Html = `
          <!-- SUBSECTION 0.4: STAGE-BY-STAGE TOP 10 FALLOUTS REVIEW & PUSH-BACK MATRIX -->
          <div style="margin-top:45px; border-top:1px dashed var(--border); padding-top:30px;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:15px;">
              <h3 style="border-left:4px solid var(--accent); padding-left:12px; margin:0; font-size:18px;">
                <span class="zh">0.4 跨工序分站審查：五大製造階段各站 Top 10 失效模式、物理根因與逆向推回溯源矩陣</span>
                <span class="en">0.4 Stage-by-Stage Top 10 Fallouts Review: Physics of Failure (PoF) &amp; Push-Back to Earlier Stages</span>
              </h3>
              <span class="badge badge-green">50 Master Failure Mechanisms</span>
            </div>

            <p>
              <span class="zh">
                為落實製造生命週期的全面品質防禦，工程團隊不能僅在最後測試階段被動承受報廢。本節針對半導體晶片製造的<b>五大核心工序站點</b>（晶圓前段製造 FEOL、後段導線與凸塊 BEOL/WLP、晶圓針測 Sort/WAT、封裝組裝 Packaging、終測與可靠度驗證 FT/Qual），<b>各精選出排名前 10 大最關鍵良率失效模式（共計 50 項核心失效）</b>。
                對每一項失效進行<b>失效物理學（Physics of Failure, PoF）深入根因剖析</b>，並具體制定如何<b>逆向推回（Push Back）至更早期的工序節點</b>執行源頭攔截、SPC 防呆扣留與設備配方修正，徹底實現「源頭工程防禦」！
              </span>
              <span class="en">
                To establish comprehensive quality containment across the silicon manufacturing lifecycle, engineering teams cannot passively absorb fallout at final test.
                This section dissects the <b>5 Core Manufacturing Stages</b> (Fab FEOL, Fab BEOL &amp; WLP, Wafer Sort &amp; WAT, Packaging &amp; Assembly, and Final Test &amp; Qual), profiling the <b>Top 10 most critical fallouts per stage (50 master mechanisms total)</b>.
                Each mechanism details its <b>Physics of Failure (PoF) root cause</b> and actionable protocols to <b>Push Back upstream to earlier processing steps</b> for containment, SPC interlocks, and recipe centerings.
              </span>
            </p>

            <!-- STAGE TAB CONTROLS -->
            <div style="display:flex; gap:8px; flex-wrap:wrap; margin:20px 0 15px 0;">
              <button type="button" class="ctrl-btn active" id="btn-stage-1" onclick="switchStageFalloutTab(1)" style="flex:1; min-width:180px; text-align:center; padding:10px 14px;">
                <span class="zh">Stage 1: 晶圓前段 FEOL (10)</span><span class="en">Stage 1: Fab FEOL (10)</span>
              </button>
              <button type="button" class="ctrl-btn" id="btn-stage-2" onclick="switchStageFalloutTab(2)" style="flex:1; min-width:180px; text-align:center; padding:10px 14px;">
                <span class="zh">Stage 2: 後段與凸塊 BEOL/WLP (10)</span><span class="en">Stage 2: BEOL &amp; WLP (10)</span>
              </button>
              <button type="button" class="ctrl-btn" id="btn-stage-3" onclick="switchStageFalloutTab(3)" style="flex:1; min-width:180px; text-align:center; padding:10px 14px;">
                <span class="zh">Stage 3: 晶圓針測 Sort/WAT (10)</span><span class="en">Stage 3: Sort &amp; WAT (10)</span>
              </button>
              <button type="button" class="ctrl-btn" id="btn-stage-4" onclick="switchStageFalloutTab(4)" style="flex:1; min-width:180px; text-align:center; padding:10px 14px;">
                <span class="zh">Stage 4: 封裝組裝 Packaging (10)</span><span class="en">Stage 4: Packaging (10)</span>
              </button>
              <button type="button" class="ctrl-btn" id="btn-stage-5" onclick="switchStageFalloutTab(5)" style="flex:1; min-width:180px; text-align:center; padding:10px 14px;">
                <span class="zh">Stage 5: 終測與可靠度 FT/Qual (10)</span><span class="en">Stage 5: FT &amp; Qual (10)</span>
              </button>
            </div>

            <!-- ========================================== -->
            <!-- STAGE 1 PANEL: FAB FEOL TOP 10 FALLOUTS -->
            <!-- ========================================== -->
            <div id="stage-panel-1" class="stage-fallout-panel" style="display:block;">
              <div style="background:var(--surface-1); border:1px solid var(--border); border-radius:6px; padding:12px 16px; margin-bottom:15px; font-size:12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                <div>
                  <b>Stage 1: 晶圓前段製造 (Front-End of Line, FEOL)</b><br>
                  <span style="color:var(--ink-soft);">涵蓋矽基板、淺溝槽隔離 (STI)、阱區植入、閘極堆疊 (HKMG)、源極/汲極 (S/D) 與矽化物工程</span>
                </div>
                <div style="font-family:var(--font-mono); color:var(--accent);">
                  典型失控影響: ±3.5% 基線良率 · 早期攔截效益: 極高 (阻止高昂後段加工成本)
                </div>
              </div>

              <div class="table-container">
                <table style="width:100%; border-collapse:collapse; font-size:12px;">
                  <thead>
                    <tr style="background:var(--surface-3, rgba(255,255,255,0.05)); text-align:left;">
                      <th style="padding:8px; border-bottom:2px solid var(--border); width:40px;">#</th>
                      <th style="padding:8px; border-bottom:2px solid var(--border); width:180px;">失效模式 (Fallout Mechanism)</th>
                      <th style="padding:8px; border-bottom:2px solid var(--border); width:130px;">檢測站點與特徵</th>
                      <th style="padding:8px; border-bottom:2px solid var(--border); width:240px;">物理根因剖析 (Physics of Failure, PoF)</th>
                      <th style="padding:8px; border-bottom:2px solid var(--border); width:280px;">逆向推回早期工序之溯源點與管控動作 (Push-Back)</th>
                      <th style="padding:8px; border-bottom:2px solid var(--border); width:130px;">關鍵 SPC 監控指標</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><b>1</b></td>
                      <td><b>閘極氧化層微孔洞與 TDDB 擊穿</b><br><span style="color:var(--ink-soft); font-size:11px;">Gate Dielectric Breakdown</span></td>
                      <td>WAT 氧化層擊穿電壓 (Vbd) &amp; 漏電</td>
                      <td>閘極氧化前濕式清洗殘留微量金屬雜質（Fe, Cu）或微粒，引發局部電場集中與高溫經時擊穿。</td>
                      <td><b>推回：晶圓清洗 RCA/SC-1 站與原材料</b><br>強化 HF 去氧化層與 SC-1 巨觀微粒過濾（微濾膜孔徑 &lt; 10nm）；加強原始磊晶晶圓表面顆粒檢驗（SP5 顆粒數 &lt; 15 顆/片）。</td>
                      <td>Qox &gt; 12 C/cm2, Dit &lt; 1e10 eV-1cm-2</td>
                    </tr>
                    <tr>
                      <td><b>2</b></td>
                      <td><b>接面超額漏電與晶格殘留位錯</b><br><span style="color:var(--ink-soft); font-size:11px;">Junction Leakage (EOR Loops)</span></td>
                      <td>WAT P-N 接面反向偏壓漏電流 (Ijunc)</td>
                      <td>重離子源極/汲極植入後，非晶化界面端（End-of-Range, EOR）殘留填隙原子團聚成差排環，形成中能隙復合陷阱。</td>
                      <td><b>推回：離子植入機 (Implant) 與高溫退火 (RTA)</b><br>提高快速熱退火峰值溫度至 1050°C 並延長平坦保溫時間促使差排湮滅；優化植入機光束能量分布抑制晶格深層破壞。</td>
                      <td>Ijunc &lt; 0.5 pA/um2 at 1.2V</td>
                    </tr>
                    <tr>
                      <td><b>3</b></td>
                      <td><b>短通道效應與臨界電壓滾降</b><br><span style="color:var(--ink-soft); font-size:11px;">Vth Roll-off &amp; Short Channel Effect</span></td>
                      <td>WAT 短通道饱和電流 (Idsat) 與 Vth</td>
                      <td>暈輪植入（Halo/Pocket Implant）傾角偏移或高厚光阻陰影效應，導致通道兩側摻雜不對稱，汲極引致能障降低（DIBL）。</td>
                      <td><b>推回：暈輪離子植入機與微影光阻站</b><br>校準離子機旋轉傾斜晶圓吸盤（Tilt/Twist Angle ±0.1°）；在微影站減薄暈輪光阻膜厚並優化側壁陡直度，消除陰影遮蔽。</td>
                      <td>DIBL &lt; 65 mV/V, Vth Roll-off &lt; 40mV</td>
                    </tr>
                    <tr>
                      <td><b>4</b></td>
                      <td><b>淺溝槽邊角寄生漏電 (STI Divot)</b><br><span style="color:var(--ink-soft); font-size:11px;">STI Corner Subthreshold Hump</span></td>
                      <td>Id-Vg 曲線次臨界區隆起 (Hump)</td>
                      <td>墊氧化層剝離（Hot H3PO4）過蝕刻，導致 STI 氧化物在矽邊角下陷（Divot），閘極覆蓋時在銳角形成尖端寄生導通。</td>
                      <td><b>推回：STI CMP 研磨與墊層氮化矽濕蝕刻站</b><br>嚴格控制熱磷酸濕蝕刻時間與槽液濃度比，導入邊角預圓化氧化（Corner Rounding Oxidation）將矽邊角倒角半徑加大至 &gt; 10nm。</td>
                      <td>Divot 深度 &lt; 8nm, 次臨界擺幅 SS &lt; 70 mV/dec</td>
                    </tr>
                    <tr>
                      <td><b>5</b></td>
                      <td><b>矽化物尖峰刺穿接面 (Silicide Spiking)</b><br><span style="color:var(--ink-soft); font-size:11px;">NiSi / CoSi2 Junction Puncturing</span></td>
                      <td>WAT 接面軟擊穿 (Soft Breakdown)</td>
                      <td>鎳/鈷金屬沉積不均或一階段退火熱失控，使金屬沿晶界加速異常擴散刺穿超淺接面（USJ）。</td>
                      <td><b>推回：金屬沉積 PVD 與二階段活化爐 (RTP)</b><br>微調預濺鍍清潔（Pre-sputter Ar RF Clean）均勻性；嚴格實施二階段低溫形成-剝離未反應金屬-高溫相變退火溫度窗口。</td>
                      <td>接面漏電突波率 &lt; 0.05%, Rs 均勻度 &lt; 2.5%</td>
                    </tr>
                    <tr>
                      <td><b>6</b></td>
                      <td><b>電漿充電損傷 (PID / Antenna Effect)</b><br><span style="color:var(--ink-soft); font-size:11px;">Plasma Induced Damage</span></td>
                      <td>薄閘極介電層電容 C-V 曲線頻率色散</td>
                      <td>複晶矽與金屬乾蝕刻時電漿非均勻電位差，使大面積天線導線收集電荷經極薄氧化層放電擊穿。</td>
                      <td><b>推回：乾蝕刻機 (Etcher) 與 IC 版圖設計 DRC</b><br>蝕刻機加裝高頻電漿自動平衡阻抗匹配器，消除晶圓表面電位梯度；在設計端強制插入天線二極體（Antenna Diode）保護開關。</td>
                      <td>天線比 (Antenna Ratio) &lt; 250:1, Vbd 漂移 &lt; 3%</td>
                    </tr>
                    <tr>
                      <td><b>7</b></td>
                      <td><b>井區穿通與閂鎖效應 (Latch-up)</b><br><span style="color:var(--ink-soft); font-size:11px;">Well-to-Well Punchthrough &amp; Latch-up</span></td>
                      <td>WAT 閂鎖觸發電流 (I-trigger)</td>
                      <td>高能 MeV 倒退阱（Retrograde Well）植入劑量偏低或能量不足，基底寄生雙極性電晶體（BJT）增益過高。</td>
                      <td><b>推回：高能量離子植入機 (MeV Implanter)</b><br>核對植入機能量倍增加速腔高壓校準；提高基底磊晶層摻雜濃度以降低基板電阻（Rsub），提升閂鎖觸發閥值。</td>
                      <td>I-trigger &gt; 350mA, V-hold &gt; 1.5x Vdd</td>
                    </tr>
                    <tr>
                      <td><b>8</b></td>
                      <td><b>晶圓高溫滑移線與熱翹曲 (Slip Lines)</b><br><span style="color:var(--ink-soft); font-size:11px;">Thermal Stress Induced Slip Lines</span></td>
                      <td>光學暗場全晶圓掃描 (Slip Lines)</td>
                      <td>立式高溫氧化/擴散爐降溫降溫斜率過快（&gt;10°C/min），晶圓邊緣與中心極大熱梯度引發晶格剪切滑移。</td>
                      <td><b>推回：高溫擴散氧化爐 (Furnace)</b><br>平緩化爐管降溫曲線（升降溫速度限制在 3~5°C/min）；優化晶圓碳化矽支撐舟（SiC Boat）接觸點結構分散接觸應力。</td>
                      <td>滑移線長度 = 0mm (邊緣 3mm 內免驗除外)</td>
                    </tr>
                    <tr>
                      <td><b>9</b></td>
                      <td><b>鰭片彎曲與線寬波動 (Fin Bending)</b><br><span style="color:var(--ink-soft); font-size:11px;">FinFET / GAA Fin CD Collapse</span></td>
                      <td>CD-SEM / 傾斜掃描電子顯微鏡 (T-SEM)</td>
                      <td>自對準多重曝光（SAQP）間隔層應力失衡，或溝槽填充氧化物沉積硬化時體積收縮牽引鰭片倒塌。</td>
                      <td><b>推回：間隔層沉積 ALD 與淺溝槽流動化 CVD (FCVD)</b><br>微調 ALD 沉積薄膜殘留應力至中性（&lt; 50 MPa）；調降 FCVD 水解硬化蒸氣溫度斜率，避免局部收縮應力剪切鰭片。</td>
                      <td>Fin Height 變異 &lt; 0.8nm, Fin 傾斜角 &gt; 88.5°</td>
                    </tr>
                    <tr>
                      <td><b>10</b></td>
                      <td><b>熱載子射入退化 (HCI Degradation)</b><br><span style="color:var(--ink-soft); font-size:11px;">Hot Carrier Injection Wear-out</span></td>
                      <td>加速電氣壽命測試 (100 hrs stress @ 1.3V)</td>
                      <td>汲極端夾止區橫向高電場加速熱電子撞擊介面產生陷阱，造成電晶體跨導（Gm）隨時間衰減與 Vth 漂移。</td>
                      <td><b>推回：輕摻雜汲極 (LDD) 離子植入與間隔層 LPCVD</b><br>微調 LDD 植入雜質濃度梯度降低接面峰值橫向電場；低溫沉積含氫量極低之氮化矽間隔層，減少介面態缺陷。</td>
                      <td>Gm 衰減率 &lt; 5% after 100k sec Stress</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- ========================================== -->
            <!-- STAGE 2 PANEL: FAB BEOL / WLP TOP 10 -->
            <!-- ========================================== -->
            <div id="stage-panel-2" class="stage-fallout-panel" style="display:none;">
              <div style="background:var(--surface-1); border:1px solid var(--border); border-radius:6px; padding:12px 16px; margin-bottom:15px; font-size:12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                <div>
                  <b>Stage 2: 晶圓後段導線與凸塊 (Back-End of Line, BEOL &amp; WLP)</b><br>
                  <span style="color:var(--ink-soft);">涵蓋多層雙鑲嵌銅導線 (Cu Damascene)、超低介電常數薄膜 (ULK)、通孔 (Via)、CMP 研磨與晶圓級凸塊 (Bumping)</span>
                </div>
                <div style="font-family:var(--font-mono); color:var(--accent);">
                  典型失控影響: ±4.8% 基線良率 · 早期攔截效益: 避免封裝後高昂材料浪費
                </div>
              </div>

              <div class="table-container">
                <table style="width:100%; border-collapse:collapse; font-size:12px;">
                  <thead>
                    <tr style="background:var(--surface-3, rgba(255,255,255,0.05)); text-align:left;">
                      <th style="padding:8px; border-bottom:2px solid var(--border); width:40px;">#</th>
                      <th style="padding:8px; border-bottom:2px solid var(--border); width:180px;">失效模式 (Fallout Mechanism)</th>
                      <th style="padding:8px; border-bottom:2px solid var(--border); width:130px;">檢測站點與特徵</th>
                      <th style="padding:8px; border-bottom:2px solid var(--border); width:240px;">物理根因剖析 (Physics of Failure, PoF)</th>
                      <th style="padding:8px; border-bottom:2px solid var(--border); width:280px;">逆向推回早期工序之溯源點與管控動作 (Push-Back)</th>
                      <th style="padding:8px; border-bottom:2px solid var(--border); width:130px;">關鍵 SPC 監控指標</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><b>1</b></td>
                      <td><b>低介電常數層開裂與多孔塌陷</b><br><span style="color:var(--ink-soft); font-size:11px;">Low-k / ULK Delamination</span></td>
                      <td>C-SAM / 聚焦離子束切片 (FIB-SEM)</td>
                      <td>多孔有機矽酸鹽玻璃（SiCOH）介電質經電漿蝕刻受損脫碳，機械楊氏模數劇降（E &lt; 5 GPa），在 CMP 應力下撕裂。</td>
                      <td><b>推回：介電質沉積 PECVD 與 UV 固化爐</b><br>優化前驅物化學配比並導入微弱還原性電漿保護表面；微調 UV 光硬化光譜與腔體氦氣流量，提升薄膜機械抗撕裂強度。</td>
                      <td>Young's Modulus E &gt; 8.5 GPa, k-value &lt; 2.45</td>
                    </tr>
                    <tr>
                      <td><b>2</b></td>
                      <td><b>應力引致銅導線空洞 (SIV)</b><br><span style="color:var(--ink-soft); font-size:11px;">Stress-Induced Voiding (SIV)</span></td>
                      <td>高溫烘烤後通孔鏈電阻飆升 (Via Chain)</td>
                      <td>寬金屬導線（Wide Metal Leads）熱膨脹係數失配使內部累積過飽和空位，在高溫烘烤（175~200°C）下游移在通孔根部凝聚成空洞。</td>
                      <td><b>推回：銅電鍍機台 (ECP) 與 Ta/TaN 阻障層 PVD</b><br>調整電鍍添加劑（Suppressor/Accelerator）防止銅晶粒過早粗化；提高 PVD 阻障層在高深寬比通孔底部的沉積階梯覆蓋率。</td>
                      <td>Via Chain Resistance Shift &lt; 2.0%</td>
                    </tr>
                    <tr>
                      <td><b>3</b></td>
                      <td><b>CMP 金屬殘留橋接與凹陷</b><br><span style="color:var(--ink-soft); font-size:11px;">Metal Bridging &amp; CMP Dishing</span></td>
                      <td>光學暗場缺陷掃描 / 梳狀電容漏電短路</td>
                      <td>研磨墊磨耗失真、研磨液（Slurry）化學選擇比劣化，導致金屬密集區嚴重凹陷，相鄰細金屬線間殘留微銅皮短路。</td>
                      <td><b>推回：化學機械研磨機 (CMP) 與 IC 佈局 DRC</b><br>在 CMP 導入多區壓電同心環壓力微調系統（Multi-zone Head）；在設計端落實啞元金屬填充規則（Dummy Metal Fill），均衡局部圖形密度。</td>
                      <td>CMP Dishing &lt; 15nm, Erosion &lt; 10nm</td>
                    </tr>
                    <tr>
                      <td><b>4</b></td>
                      <td><b>通孔未打穿與對位偏移開路</b><br><span style="color:var(--ink-soft); font-size:11px;">Unlanded Via / High Via Rc</span></td>
                      <td>WAT Via Chain 斷路或接觸阻抗離群</td>
                      <td>金屬層與通孔層微影套刻誤差（Overlay Drift &gt; 4nm），或介電蝕刻時底部蝕刻停止層（ESL）聚合物聚合殘留阻礙導通。</td>
                      <td><b>推回：微影步進曝光機 (Litho) 與通孔乾蝕刻機</b><br>動態補償曝光機高階非線性套刻模型（Run-to-run High-Order Overlay）；通孔蝕刻增加原位去聚合物電漿清洗（Polymer Strip Ash）。</td>
                      <td>Overlay 3-Sigma &lt; 2.5nm, Via Rc &lt; 2.8 Ohm</td>
                    </tr>
                    <tr>
                      <td><b>5</b></td>
                      <td><b>電致遷移界面孔洞與突丘 (EM)</b><br><span style="color:var(--ink-soft); font-size:11px;">Electromigration Interfacial Voiding</span></td>
                      <td>封裝級高溫高電流 EM 壽命試驗 (Black's Law)</td>
                      <td>高電流密度下金屬離子沿銅/阻障層介面高速遷移，界面附著力不足引發電子風吹走金屬形成空洞，陽極端形成突丘擠破介電質。</td>
                      <td><b>推回：金屬頂部覆蓋層沉積機 (Cap Layer CVD)</b><br>在 CMP 後導入氨氣（NH3）電漿去氧化，並選擇性無電鍍沉積鈷（Co-cap）或釕（Ru）合金覆蓋層，提升介面結合強度。</td>
                      <td>EM 啟動能 Ea &gt; 0.95 eV, MTTF &gt; 100,000 hrs</td>
                    </tr>
                    <tr>
                      <td><b>6</b></td>
                      <td><b>保護層微孔與金屬受潮腐蝕</b><br><span style="color:var(--ink-soft); font-size:11px;">Passivation Pinhole &amp; Corrosion</span></td>
                      <td>濕熱試驗 (HAST 130°C/85%RH) 後開路</td>
                      <td>最頂層氮化矽（SiN）與氧化矽保護層沉積顆粒微孔，外界水分與氯/氟離子侵入水解腐蝕頂層鋁/銅金屬墊。</td>
                      <td><b>推回：頂層保護層沉積 PECVD 站點</b><br>調整 SiH4/NH3 氣體流量比，沉積具備壓應力（-150 MPa）的緻密零缺陷氮化矽薄膜；定期執行反應室乾式 NF3 原位等離子體自清潔。</td>
                      <td>Passivation Pinhole Density = 0 /wafer</td>
                    </tr>
                    <tr>
                      <td><b>7</b></td>
                      <td><b>凸塊下金屬層脫層 (UBM Delamination)</b><br><span style="color:var(--ink-soft); font-size:11px;">UBM Barrier Adhesion Failure</span></td>
                      <td>銲球剪切強度測試 (Ball Shear Test &lt; 15g)</td>
                      <td>鋁銲墊表面未去除之緻密自然氧化鋁皮膜（Al2O3），使濺鍍沉積之 Ti/NiV 阻障層鍵結力極差，受力時介面整體剝離。</td>
                      <td><b>推回：UBM 濺鍍機 (PVD) 腔體前處理</b><br>加嚴 PVD 原位氬氣逆濺鍍蝕刻深度（Ar Sputter Clean 深度 &gt; 15nm），確保徹底裸露純金屬晶格後再沉積鈦阻障層。</td>
                      <td>Ball Shear Strength &gt; 25 g/mil2 (100% 破於球體)</td>
                    </tr>
                    <tr>
                      <td><b>8</b></td>
                      <td><b>微凸塊共面度失真與尺寸偏差</b><br><span style="color:var(--ink-soft); font-size:11px;">Microbump Coplanarity Skew</span></td>
                      <td>3D 光學表面輪廓儀量測凸塊高度</td>
                      <td>晶圓級電鍍（ECD）電場周邊邊緣效應，加上晶圓邊緣電鍍輔助陰極環（Thieving Ring）電流補償失衡，凸塊高度兩端差值 &gt; 5um。</td>
                      <td><b>推回：晶圓電鍍機 (Wafer Electroplating Cup)</b><br>動態分區電流陽極控制（Multi-segment Anodes）；優化電鍍光阻厚度均勻度與光阻開口直徑（CD 變異 &lt; 2%）。</td>
                      <td>Bump Height 變異 Coplanarity &lt; 2.5um 全晶圓</td>
                    </tr>
                    <tr>
                      <td><b>9</b></td>
                      <td><b>銲墊表面氟/碳有機微污染 (Black Pad)</b><br><span style="color:var(--ink-soft); font-size:11px;">Pad Fluorine Residue / Oxidation</span></td>
                      <td>X射線光電子能譜 (XPS) / 打線虛焊</td>
                      <td>頂層鋁墊開窗蝕刻後，去光阻電漿不完全使含氟氣體與鋁反應生成氟化鋁（AlF3）惰性薄膜，打線時超音波無法融合。</td>
                      <td><b>推回：鋁墊開窗乾蝕刻與去阻機 (Ash &amp; Strip)</b><br>在去阻機導入下游水氣加氫退火電漿；串聯多段高純去離子水超音波溢流清洗，徹底置換洗除水溶性氟化物。</td>
                      <td>XPS 表面原子比例: Fluorine &lt; 1.5%, Carbon &lt; 8%</td>
                    </tr>
                    <tr>
                      <td><b>10</b></td>
                      <td><b>晶圓背面薄化研磨深層微裂紋</b><br><span style="color:var(--ink-soft); font-size:11px;">Backgrind Subsurface Micro-cracks</span></td>
                      <td>紅外線穿透檢測 / 晶粒抗折強度 (BSR &lt; 400MPa)</td>
                      <td>晶圓背面粗磨金剛石砂輪粒徑過大、進給下壓力量劇烈，在矽基板背面留下深達 10~25um 的次表面微脆性微裂痕。</td>
                      <td><b>推回：背面研磨機 (Backgrind) 與化學拋光機</b><br>粗磨後強制串聯超細金剛石砂輪（#2000~#8000 粒度精磨）；最後工步實施化學濕蝕刻或拋光（CMP Stress Relief）去除 3um 損傷層。</td>
                      <td>晶粒抗彎抗折強度 (BSR) &gt; 700 MPa</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- ========================================== -->
            <!-- STAGE 3 PANEL: WAFER SORT & WAT TOP 10 -->
            <!-- ========================================== -->
            <div id="stage-panel-3" class="stage-fallout-panel" style="display:none;">
              <div style="background:var(--surface-1); border:1px solid var(--border); border-radius:6px; padding:12px 16px; margin-bottom:15px; font-size:12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                <div>
                  <b>Stage 3: 晶圓針測與參數測試 (Wafer Sort / CP &amp; WAT)</b><br>
                  <span style="color:var(--ink-soft);">涵蓋晶圓允收測試 (WAT/PCM)、探針卡電性針測 (CP1/CP2)、雷射修補與動態品質過濾</span>
                </div>
                <div style="font-family:var(--font-mono); color:var(--accent);">
                  典型失控影響: ±5.2% 假性過殺與逃逸 · 早期攔截效益: 避免瑕疵晶粒流向封裝組裝
                </div>
              </div>

              <div class="table-container">
                <table style="width:100%; border-collapse:collapse; font-size:12px;">
                  <thead>
                    <tr style="background:var(--surface-3, rgba(255,255,255,0.05)); text-align:left;">
                      <th style="padding:8px; border-bottom:2px solid var(--border); width:40px;">#</th>
                      <th style="padding:8px; border-bottom:2px solid var(--border); width:180px;">失效模式 (Fallout Mechanism)</th>
                      <th style="padding:8px; border-bottom:2px solid var(--border); width:130px;">檢測站點與特徵</th>
                      <th style="padding:8px; border-bottom:2px solid var(--border); width:240px;">物理根因剖析 (Physics of Failure, PoF)</th>
                      <th style="padding:8px; border-bottom:2px solid var(--border); width:280px;">逆向推回早期工序之溯源點與管控動作 (Push-Back)</th>
                      <th style="padding:8px; border-bottom:2px solid var(--border); width:130px;">關鍵 SPC 監控指標</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><b>1</b></td>
                      <td><b>探針下壓過度打穿銲墊 (Pad Punchthrough)</b><br><span style="color:var(--ink-soft); font-size:11px;">Probe Overdrive Pad Cracking</span></td>
                      <td>光學顯微鏡 (AOI) 針痕檢查 / ILD 崩裂</td>
                      <td>針測機 Z 軸設定行程過深（Overdrive &gt; 80um）或探針頭平整度失真，探針尖銳穿刺衝擊壓碎墊下低介電絕緣層。</td>
                      <td><b>推回：晶圓針測機 (Prober) 與 Fab 墊下設計 (POUD)</b><br>硬體上限位限制 Z 軸下壓量（OD &lt; 45um）；推回 Fab 強化 Pad-Over-Active-Area (POAA) 設計，在銲墊下加鋪多層金屬虛擬網格吸震。</td>
                      <td>針痕面積佔比 &lt; 25% Pad 面積, 針坑深度 &lt; 0.5um</td>
                    </tr>
                    <tr>
                      <td><b>2</b></td>
                      <td><b>探針尖端沾錫與接觸電阻飆升</b><br><span style="color:var(--ink-soft); font-size:11px;">Probe Needle Tip Rc Spikes</span></td>
                      <td>連續多顆晶粒特定引腳報廢 (Bin 1 to Bin 2)</td>
                      <td>懸臂式/垂直式探針尖端反覆刺入無鉛微凸塊，沾黏氧化錫渣（Tin Debris），使接觸阻抗自 0.2Ω 驟增至 &gt; 5Ω 引發開路誤判。</td>
                      <td><b>推回：針測操作磨針配方 (Online Cleaning Recipe)</b><br>啟動機台線上研磨清潔片行程（每 100 晶圓或連測 2 顆接觸報廢自動觸發 5 次磨針）；優化探針材質改採自清潔貴金屬合金（Paliney7）。</td>
                      <td>接觸阻抗 Rc &lt; 0.35 Ohm, 清潔週期 Cpk &gt; 1.5</td>
                    </tr>
                    <tr>
                      <td><b>3</b></td>
                      <td><b>高溫高壓熱膨脹針尖滑移 (Thermal Walk)</b><br><span style="color:var(--ink-soft); font-size:11px;">High-Temp Probe Skew &amp; Shift</span></td>
                      <td>125°C 高溫針測邊緣晶片針痕脫靶出界</td>
                      <td>高溫熱吸盤（Thermal Chuck）加熱使矽晶圓與探針卡多層 PCB 熱膨脹失配，針尖沿徑向向外滑移偏移出銲墊開口。</td>
                      <td><b>推回：針測機熱場校準與探針卡材料工程</b><br>在探針卡採用極低膨脹係數的多層陶瓷基板（MLC Space Transformer）；針測機每隔 25 片強制執行光學相機自動針尖對位再校正。</td>
                      <td>針尖熱漂移量 (Thermal Drift) &lt; 4.5um at 125°C</td>
                    </tr>
                    <tr>
                      <td><b>4</b></td>
                      <td><b>多晶粒並行測試漏電串擾 (Cross-Talk)</b><br><span style="color:var(--ink-soft); font-size:11px;">Multi-Site Probing Interference</span></td>
                      <td>Site-to-Site 良率天秤失衡 (如 Site 3 偏低)</td>
                      <td>16-site 或 32-site 超高並行測試時，探針卡基板接地層高頻回流路徑阻抗不匹配，相鄰 DUT 瞬態開關噪聲耦合。</td>
                      <td><b>推回：探針介面板 (PIB) 與探針卡 PCB 佈線設計</b><br>重構探針卡信號接地配比（S:G 比例優化至 1:1）；在探針針座下方增設超薄高頻旁路去耦電容（Decoupling Array），隔離各 Site。</td>
                      <td>Site-to-Site Delta 良率差額 &lt; 0.35%</td>
                    </tr>
                    <tr>
                      <td><b>5</b></td>
                      <td><b>WAT 參數批次偏離 (Vth / Idsat Drift)</b><br><span style="color:var(--ink-soft); font-size:11px;">PCM Electrical Parametric Skew</span></td>
                      <td>WAT 測試儀自動畫布統計 (Box-plot 失控)</td>
                      <td>微影曝光劑量跨批次漂移，或蝕刻氣體比例受前批沉積物記憶效應干擾，閘極臨界尺寸（CD）整體粗化或細化。</td>
                      <td><b>推回：晶圓廠光罩微影與閘極乾蝕刻機</b><br>將 WAT 測得之飽和電流中位數即時反饋回微影步進機，自動微調下批曝光能量（Energy Dose APC Feedback），拉回電晶體速度中心。</td>
                      <td>Idsat Cpk &gt; 1.67, 批次間變異 Delta &lt; 2.0%</td>
                    </tr>
                    <tr>
                      <td><b>6</b></td>
                      <td><b>常態分佈動態離群值 (PAT Maverick Die)</b><br><span style="color:var(--ink-soft); font-size:11px;">Dynamic PAT Statistical Outlier</span></td>
                      <td>Sort 電氣參數高斯常態分佈雙側尾翼 (&gt;3.5σ)</td>
                      <td>晶粒內部存在次微米隱蔽閘極孔洞或晶格滑移，電氣特性雖符合規格書上限，但在統計群體中顯著孤立（早夭高危險群）。</td>
                      <td><b>推回：晶圓針測機動態 PAT 演算法與晶圓地圖</b><br>啟動動態限制線演算法（DPAT Limit = Median ± 3.5x IQR）；自動將離群晶粒標記為軟體廢品（Bin 88），嚴禁混入正常量產批次。</td>
                      <td>DPAT 剔除率 &lt; 0.6%, 車規客戶 0 DPPM</td>
                    </tr>
                    <tr>
                      <td><b>7</b></td>
                      <td><b>SRAM 記憶體位元失效與修補耗盡</b><br><span style="color:var(--ink-soft); font-size:11px;">Memory BIST Cell Failure &amp; Repair</span></td>
                      <td>內建自檢 (BIST) 演算法回報行/列不可修復</td>
                      <td>SRAM 六管單元（6T Cell）鰭片尺寸失配導致靜態雜訊邊限（SNM）坍塌，或隨機微粒落於字元線（WL）引發整行短路。</td>
                      <td><b>推回：SRAM 陣列光罩光學鄰近修正 (OPC) 與雷射修補</b><br>在光罩端增設散射條助記特徵強化位元單元均勻度；在針測端啟動智慧冗餘列/行雷射保險絲燒斷置換演算法（Redundancy Allocation）。</td>
                      <td>SRAM 修補成功率 &gt; 98.2%</td>
                    </tr>
                    <tr>
                      <td><b>8</b></td>
                      <td><b>壞鄰居良品可靠度陷阱 (GDBN Hazard)</b><br><span style="color:var(--ink-soft); font-size:11px;">Good Die in Bad Neighborhood</span></td>
                      <td>晶圓圖譜壞品叢聚中央孤立合格晶粒 (Pass)</td>
                      <td>良品晶粒周圍環繞 5~8 顆各類功能失效晶片，顯示該微區受到乾蝕刻腔體剝落聚合物或微污染波及，良品具極高潛伏裂紋。</td>
                      <td><b>推回：晶圓針測自動劃片地圖生成器 (Map Converter)</b><br>在針測資料庫強制套用 GDBN 空間過濾演算法，凡相鄰壞品數超過 3 顆的合格晶片，一律自動改標廢除，阻止流向封裝。</td>
                      <td>GDBN 攔截晶粒車規逃逸率 = 0 DPPM</td>
                    </tr>
                    <tr>
                      <td><b>9</b></td>
                      <td><b>雷射保險絲熔斷飛濺短路 (Laser Fuse)</b><br><span style="color:var(--ink-soft); font-size:11px;">Laser Fuse Incomplete Blow / Splatter</span></td>
                      <td>修補後二次針測電氣驗證開短路 (Continuity)</td>
                      <td>雷射能量功率計漂移或光斑焦平面失焦，使金屬熔斷時汽化爆炸，金屬液滴飛濺覆蓋至鄰近導線造成二次橋接短路。</td>
                      <td><b>推回：雷射修補機 (Laser Trimmer)</b><br>加裝光學雷射光斑焦距即時自動補償相機；每日定期執行石英校正片熔斷能量能量計標定，控制脈衝寬度在 15ps 內超短脈衝。</td>
                      <td>Fuse 熔斷開路阻抗 &gt; 10 MOhm, 飛濺率 &lt; 0.01%</td>
                    </tr>
                    <tr>
                      <td><b>10</b></td>
                      <td><b>二次複測良率大幅發散 (Retest Divergence)</b><br><span style="color:var(--ink-soft); font-size:11px;">Retest Yield Delta &amp; Overkill</span></td>
                      <td>初測 (First Pass) 與複測 (Retest) 良率差距 &gt; 2%</td>
                      <td>測試機接觸不良誘發人為過度複測，或探針多次重刺同一個銲墊導致銲墊鋁皮翻起剝離（Pad Peeling）。</td>
                      <td><b>推回：針測廠作業系統 MES 複測管制規則</b><br>在 MES 鎖定晶圓重測原則（嚴禁整批無條件重測）；僅允許受控針對單一接觸相關 Bin 執行局部二次測試，單晶圓重刺上限 2 次。</td>
                      <td>初測與複測良率差 Delta &lt; 0.8%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- ========================================== -->
            <!-- STAGE 4 PANEL: PACKAGING & ASSEMBLY TOP 10 -->
            <!-- ========================================== -->
            <div id="stage-panel-4" class="stage-fallout-panel" style="display:none;">
              <div style="background:var(--surface-1); border:1px solid var(--border); border-radius:6px; padding:12px 16px; margin-bottom:15px; font-size:12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                <div>
                  <b>Stage 4: 晶片封裝與先進組裝 (Packaging &amp; Advanced Assembly)</b><br>
                  <span style="color:var(--ink-soft);">涵蓋晶圓切割 (Dicing)、晶片黏著 (Die Attach)、打線 (Wirebond)、覆晶銲接 (Flip-Chip)、填膠 (Underfill) 與模壓成型 (Molding)</span>
                </div>
                <div style="font-family:var(--font-mono); color:var(--accent);">
                  典型失控影響: ±4.2% 封裝良率 · 早期攔截效益: 避免昂貴基板與封裝工時浪費
                </div>
              </div>

              <div class="table-container">
                <table style="width:100%; border-collapse:collapse; font-size:12px;">
                  <thead>
                    <tr style="background:var(--surface-3, rgba(255,255,255,0.05)); text-align:left;">
                      <th style="padding:8px; border-bottom:2px solid var(--border); width:40px;">#</th>
                      <th style="padding:8px; border-bottom:2px solid var(--border); width:180px;">失效模式 (Fallout Mechanism)</th>
                      <th style="padding:8px; border-bottom:2px solid var(--border); width:130px;">檢測站點與特徵</th>
                      <th style="padding:8px; border-bottom:2px solid var(--border); width:240px;">物理根因剖析 (Physics of Failure, PoF)</th>
                      <th style="padding:8px; border-bottom:2px solid var(--border); width:280px;">逆向推回早期工序之溯源點與管控動作 (Push-Back)</th>
                      <th style="padding:8px; border-bottom:2px solid var(--border); width:130px;">關鍵 SPC 監控指標</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><b>1</b></td>
                      <td><b>晶圓切割崩角與背面微裂紋 (Die Chipping)</b><br><span style="color:var(--ink-soft); font-size:11px;">Wafer Saw Chipping &amp; Backside Cracks</span></td>
                      <td>切割後光學自動檢查 (Post-Saw AOI)</td>
                      <td>金剛石切割刀片機械磨耗鈍化、主軸震動（Spindle Run-out &gt; 1um），使脆性矽材料發生貝殼狀邊緣崩角。</td>
                      <td><b>推回：晶圓切割機 (Dicing Saw) 與刀片更換管制</b><br>落實切割刀片切削米數壽命自動計數器強制修刀；切換導入雷射隱形切割（Stealth Dicing）技術，消除表面機械衝擊裂紋。</td>
                      <td>崩角尺寸 (Chipping Size) &lt; 15um (距有效線路 &gt; 25um)</td>
                    </tr>
                    <tr>
                      <td><b>2</b></td>
                      <td><b>銀膠黏晶傾斜與導熱空洞 (Die Tilt &amp; Void)</b><br><span style="color:var(--ink-soft); font-size:11px;">Die Attach Tilt &amp; Thermal Voids</span></td>
                      <td>X-Ray 射線透視檢驗 / 熱阻 Rth 測試</td>
                      <td>導電銀膠點膠路徑不均夾帶氣泡，或固晶機下壓力量傾斜，導致高散熱晶片熱阻異常飆升誘發熱崩潰。</td>
                      <td><b>推回：固晶點膠機 (Die Bonder Dispenser)</b><br>改採多點星形或交叉型點膠軌跡防止流動包覆氣孔；點膠前銀膠強制進行離心真空脫泡，定期校正固晶吸嘴水平度。</td>
                      <td>Die Attach 空洞率 &lt; 5.0%, 傾斜度 Tilt &lt; 0.5°</td>
                    </tr>
                    <tr>
                      <td><b>3</b></td>
                      <td><b>打線未著銲墊與脫球 (NSOP / Lifted Ball)</b><br><span style="color:var(--ink-soft); font-size:11px;">Non-Stick on Pad &amp; Ball Shear Failure</span></td>
                      <td>破壞性拉力測試 (Wire Pull &lt; 3g) / AOI</td>
                      <td>銲墊表面氟/碳有機鈍化層阻隔、超音波能量不足，金屬間化合物（IMC 金鋁共晶）形成面積小於 70%。</td>
                      <td><b>推回：打線前電漿清洗機 (Plasma Cleaner)</b><br>加大打線前氬氣/氫氣電漿轟擊清潔時間（Plasma Clean 時間 &gt; 180s）；微調超音波銲頭功率與加熱台溫度（維持 175°C ± 5°C）。</td>
                      <td>IMC 覆蓋率 &gt; 85%, Wire Pull &gt; 6.5g</td>
                    </tr>
                    <tr>
                      <td><b>4</b></td>
                      <td><b>環氧封膠模流沖線短路 (Wire Sweep)</b><br><span style="color:var(--ink-soft); font-size:11px;">EMC Mold Injection Wire Sweep</span></td>
                      <td>高解析 X-Ray 透視檢驗相鄰金線間距</td>
                      <td>模壓成型時環氧模塑料（EMC）熔融黏度過高、前段注模柱塞衝擊流速過大，側向動態阻力沖彎長打線弧。</td>
                      <td><b>推回：模壓注塑機 (Transfer Molding) 與打線機弧度</b><br>在打線機調高打線跨度弧形剛性結構（Triangular Loop）；在模壓機建立多段柱塞注膠流速曲線（前段平緩注膠）。</td>
                      <td>Wire Sweep 率 &lt; 3.0%, 金線間隙 &gt; 2.5 倍線徑</td>
                    </tr>
                    <tr>
                      <td><b>5</b></td>
                      <td><b>晶片-封裝交互應力撕裂 (CPI Delamination)</b><br><span style="color:var(--ink-soft); font-size:11px;">Chip-Package Interaction ELK Tear</span></td>
                      <td>冷熱衝擊試驗 (TCB) 後超音波 C-SAM 開裂</td>
                      <td>覆晶凸塊無鉛銲錫與有機基板熱膨脹係數（CTE 差距 6 倍）引發巨大剪切應力，自晶片四角撕裂超低介電層（ULK）。</td>
                      <td><b>推回：晶圓廠頂層鈍化設計與封裝底部填膠選擇</b><br>推回晶圓廠在四個邊角禁止佈置微凸塊並加厚 Polyimide 應力緩衝層；封裝改採極低 CTE（&lt; 22 ppm）高抗撕裂填膠配方。</td>
                      <td>C-SAM 四角無脫層開裂 (0 Delamination)</td>
                    </tr>
                    <tr>
                      <td><b>6</b></td>
                      <td><b>底部填膠毛細滲透空洞 (Underfill Voids)</b><br><span style="color:var(--ink-soft); font-size:11px;">Capillary Underfill Voiding</span></td>
                      <td>超音波顯微鏡 (C-SAM) 晶片下界面反射</td>
                      <td>底部填膠毛細流動遇微凸塊排布阻礙產生流動波前交會死角，或助焊劑未乾淨受熱揮發放氣（Outgassing）。</td>
                      <td><b>推回：覆晶迴銲清洗站與點膠基板預熱</b><br>優化迴銲後助焊劑離子清洗水流角度；點膠前基板升溫至 95°C 降低填膠瞬間黏度，導入單邊 L 型或 I 型點膠路徑。</td>
                      <td>Underfill Void 面積佔比 &lt; 1.0% (周邊微凸塊間無氣泡)</td>
                    </tr>
                    <tr>
                      <td><b>7</b></td>
                      <td><b>回焊爆米花開裂 (Popcorn Failure / MSL)</b><br><span style="color:var(--ink-soft); font-size:11px;">Moisture Induced Popcorn Cracking</span></td>
                      <td>MSL-3 吸濕後 260°C 迴銲聲學掃描膨脹裂紋</td>
                      <td>封裝材料吸濕受潮，在 SMT 表面貼裝 260°C 高溫迴銲爐內瞬間汽化膨脹，水蒸氣壓力撕裂膠體與晶片界面。</td>
                      <td><b>推回：封裝烘烤製程與防潮鋁箔包裝站</b><br>落實封裝打帶出貨前 125°C / 24hrs 完全去濕烘烤；導入真空充氮防潮袋與濕度指示卡（HIC &lt; 10%），符合 JEDEC J-STD-020。</td>
                      <td>MSL-1 / MSL-3 吸濕耐熱試驗 0 裂紋</td>
                    </tr>
                    <tr>
                      <td><b>8</b></td>
                      <td><b>BGA 銲球枕頭效應虛焊 (Head-in-Pillow)</b><br><span style="color:var(--ink-soft); font-size:11px;">BGA Solder Joint Head-in-Pillow (HiP)</span></td>
                      <td>斜角 X-Ray 檢測 / 染色敲擊試驗 (Dye &amp; Pry)</td>
                      <td>封裝載板在高溫迴銲時動態熱翹曲（Dynamic Warpage），銲球與錫膏分離，表面氧化後再接觸無法熔合。</td>
                      <td><b>推回：封裝載板 (Substrate) 疊構設計與迴銲溫度曲線</b><br>在載板設計端實施銅箔殘銅率上下對稱平衡佈局；在迴銲爐導入高活性抗氧化氮氣保護氛圍（N2 氧含量 &lt; 50 ppm）。</td>
                      <td>封裝高溫熱翹曲 (Dynamic Warpage) &lt; 90um</td>
                    </tr>
                    <tr>
                      <td><b>9</b></td>
                      <td><b>封膠模具溢膠與毛邊 (Mold Flash)</b><br><span style="color:var(--ink-soft); font-size:11px;">Resin Bleed on Leads &amp; Pads</span></td>
                      <td>自動光學檢查導線架或基板銲點表面沾膠</td>
                      <td>模具分型面（Parting Line）磨損或液壓合模夾緊力量不足，低黏度熔融樹脂沿微小間隙滲出污染外引腳。</td>
                      <td><b>推回：模具維護保養 (Mold Chase PM) 與合模壓力</b><br>定期以光學三次元檢驗模具平整度；合模壓力提升 15%，並串聯高壓水刀或化學除膠去毛邊機（De-flash Unit）。</td>
                      <td>Resin Flash 厚度 &lt; 5um, 露出金屬腳無殘膠</td>
                    </tr>
                    <tr>
                      <td><b>10</b></td>
                      <td><b>引腳表面氧化與潤濕不良 (De-wetting)</b><br><span style="color:var(--ink-soft); font-size:11px;">Solderability Solder De-wetting</span></td>
                      <td>可銲性測試 (Wetting Balance Test &lt; 2.0s)</td>
                      <td>封裝長時間高溫烘烤固化使外引腳鍍錫/鍍金層鈍化，底層銅或鎳擴散至表面形成金屬間化合物被氧化。</td>
                      <td><b>推回：電鍍後處理與烘烤環境管控</b><br>晶片後固化烘烤（PMC）加裝高純氮氣隔絕氧氣；要求引腳電鍍代工廠將鎳/金鍍層厚度分別加嚴至 Ni &gt; 2.0um, Au &gt; 0.03um。</td>
                      <td>潤濕平衡時間 (Wetting Time) &lt; 1.2s, 覆蓋率 &gt; 95%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- ========================================== -->
            <!-- STAGE 5 PANEL: FINAL TEST & QUAL TOP 10 -->
            <!-- ========================================== -->
            <div id="stage-panel-5" class="stage-fallout-panel" style="display:none;">
              <div style="background:var(--surface-1); border:1px solid var(--border); border-radius:6px; padding:12px 16px; margin-bottom:15px; font-size:12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                <div>
                  <b>Stage 5: 終端測試與可靠度驗證 (Final Test, SLT &amp; Reliability Qual)</b><br>
                  <span style="color:var(--ink-soft);">涵蓋 ATE 終測、三溫測試 (-40°C~125°C)、系統級測試 (SLT)、Burn-In 預燒與可靠度壽命試驗 (HTOL/HAST)</span>
                </div>
                <div style="font-family:var(--font-mono); color:var(--accent);">
                  典型失控影響: ±3.8% 出貨良率與客戶退貨風險 · 早期攔截效益: 杜絕 DPPM 巨額賠償
                </div>
              </div>

              <div class="table-container">
                <table style="width:100%; border-collapse:collapse; font-size:12px;">
                  <thead>
                    <tr style="background:var(--surface-3, rgba(255,255,255,0.05)); text-align:left;">
                      <th style="padding:8px; border-bottom:2px solid var(--border); width:40px;">#</th>
                      <th style="padding:8px; border-bottom:2px solid var(--border); width:180px;">失效模式 (Fallout Mechanism)</th>
                      <th style="padding:8px; border-bottom:2px solid var(--border); width:130px;">檢測站點與特徵</th>
                      <th style="padding:8px; border-bottom:2px solid var(--border); width:240px;">物理根因剖析 (Physics of Failure, PoF)</th>
                      <th style="padding:8px; border-bottom:2px solid var(--border); width:280px;">逆向推回早期工序之溯源點與管控動作 (Push-Back)</th>
                      <th style="padding:8px; border-bottom:2px solid var(--border); width:130px;">關鍵 SPC 監控指標</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><b>1</b></td>
                      <td><b>測試座彈簧針磨損與接觸阻抗漂移</b><br><span style="color:var(--ink-soft); font-size:11px;">Socket Pogo Pin Wear &amp; Rc Spikes</span></td>
                      <td>特定測試槽 (Socket) 連續開路假性報廢</td>
                      <td>Socket 鍍金彈簧探針反覆受 BGA 無鉛銲球機械衝擊磨耗，鍍層剝落並沾黏錫屑，接觸阻抗自 50mΩ 飆升破 1Ω。</td>
                      <td><b>推回：測試機台硬體 PM 與插拔計數管制</b><br>導入 Socket 插入次數自動計數器（達到 25,000 次自動停機更換探針針座）；每日測試班交接強制執行五金校準件（Gold Unit）健康度比對。</td>
                      <td>Socket Pin Rc &lt; 0.12 Ohm, 假性過殺率 &lt; 0.1%</td>
                    </tr>
                    <tr>
                      <td><b>2</b></td>
                      <td><b>高速 SerDes 眼圖閉合與時脈抖動</b><br><span style="color:var(--ink-soft); font-size:11px;">High-Speed SerDes Eye Closure &amp; Jitter</span></td>
                      <td>ATE 高速數位通道眼圖高度/寬度不足</td>
                      <td>ATE 測試板（Load Board）高頻傳輸線阻抗不匹配（&gt;50Ω ± 10%）、過孔殘段反射，或晶片內部鎖相迴路（PLL）抖動過大。</td>
                      <td><b>推回：測試載板 PCB 製造與晶片 eFuse 暫存器</b><br>重新設計 Load Board 高頻走線（採用 Rogers 4350B 高頻板材並回鑽消除 Via Stub）；前饋透過 eFuse 暫存器調校內部發射端預加重（Pre-emphasis）。</td>
                      <td>Eye Height &gt; 120mV, Eye Width &gt; 0.45 UI</td>
                    </tr>
                    <tr>
                      <td><b>3</b></td>
                      <td><b>動態電壓頻率調整分檔失效 (DVFS)</b><br><span style="color:var(--ink-soft); font-size:11px;">Speed Bin &amp; Minimum Voltage (Vmin)</span></td>
                      <td>在最低工作電壓 (Vmin) 下最高頻率 (Fmax) 跌落</td>
                      <td>晶圓製造製程角落落在「慢-慢（SS）」極限，電晶體飽和電流偏低，在額定低電壓下關鍵路徑延遲超出時鐘週期。</td>
                      <td><b>推回：晶圓針測 WAT 數據與晶片自適應電壓</b><br>推回 Sort 階段將 PCM Vth 參數前饋至終測機，啟動自適應電壓調節（AVS），透過晶片內部 eFuse 動態燒錄較高之供電電壓識別碼（VID）。</td>
                      <td>Fmax 達標率 &gt; 98.5% at Nominal Vdd</td>
                    </tr>
                    <tr>
                      <td><b>4</b></td>
                      <td><b>極端溫度 (-40°C / +125°C) 時序邊限崩潰</b><br><span style="color:var(--ink-soft); font-size:11px;">Tri-Temp Extreme Timing Marginality</span></td>
                      <td>冷溫 (-40°C) 或高溫 (+125°C) 掃描測試失效</td>
                      <td>低溫下載子遷移率提高引發保持時間（Hold Time）違規；高溫下臨界電壓漂移與導通電阻上升引發建立時間（Setup Time）違規。</td>
                      <td><b>推回：晶片靜態時序分析 (STA) 與晶圓角落配比</b><br>推回 IC 設計端要求對極端三溫角落（-40°C, 25°C, 125°C）重新執行嚴格的時序簽核；推回晶圓廠微調 NMOS/PMOS 速度平衡比。</td>
                      <td>Tri-temp 測試良率差距 (Hot/Cold Delta) &lt; 0.5%</td>
                    </tr>
                    <tr>
                      <td><b>5</b></td>
                      <td><b>高溫高壓預燒早夭爆發 (Infant Mortality)</b><br><span style="color:var(--ink-soft); font-size:11px;">Burn-In HTOL Early Failure Burst</span></td>
                      <td>動態預燒 (Dynamic Burn-In) 前 12 小時批量損耗</td>
                      <td>潛在閘極介電層缺陷、淺溝槽隔離微縫隙在高電壓（1.4x Vdd）與高溫（125°C）加速應力下迅速劣化為硬擊穿。</td>
                      <td><b>推回：晶圓廠潔淨室缺陷管理與針測動態 PAT</b><br>推回晶圓廠稽核關鍵層在線顆粒缺陷（Defect Adder）；在晶圓 Sort 端加大動態 PAT 剔除嚴格度，提前攔截潛在邊緣早夭晶粒。</td>
                      <td>Burn-In 早期失效率 &lt; 0.05% (500 DPPM)</td>
                    </tr>
                    <tr>
                      <td><b>6</b></td>
                      <td><b>靜電放電與電氣過載擊穿 (ESD / EOS)</b><br><span style="color:var(--ink-soft); font-size:11px;">Electrostatic Discharge &amp; EOS Damage</span></td>
                      <td>I/O 引腳對地漏電流飆升 / 內部箝位二極體燒燬</td>
                      <td>自動化測試機械臂（Handler）真空吸嘴或金屬軌道接地不良引發摩擦帶電；測試時機台電源突波湧浪電壓超出耐受限額。</td>
                      <td><b>推回：測試廠機台靜電接地維護 (ESD Control)</b><br>加裝連續式即時接地電阻監控器（接地電阻 &lt; 1.0Ω）；在機械手吸嘴加裝離子風蛇消除殘留靜電；測試向量啟動平緩上電軟啟動（Soft Ramp）。</td>
                      <td>靜電帶電量 &lt; 50V, ESD HBM 耐受 &gt; 2000V</td>
                    </tr>
                    <tr>
                      <td><b>7</b></td>
                      <td><b>系統級測試開機死機與協定異常 (SLT Hang)</b><br><span style="color:var(--ink-soft); font-size:11px;">System-Level Test Boot Failure</span></td>
                      <td>SLT 實機主機板載入作業系統時隨機崩潰</td>
                      <td>結構化 ATPG 掃描測試無法覆蓋的多核心非同步時脈切換毛刺、DDR 匯流排仲裁死鎖或快取記憶體（Cache）弱位元。</td>
                      <td><b>推回：晶片架構設計與驗證 (DFT/Verification)</b><br>在 IC 設計端強化多時鐘域交叉（CDC）靜態時序驗證；在 SLT 測試端建立精準暫存器日誌抓取核心宕機地址，推回晶片微碼修正。</td>
                      <td>SLT 首次通過良率 (SLT FPY) &gt; 99.2%</td>
                    </tr>
                    <tr>
                      <td><b>8</b></td>
                      <td><b>核心供電瞬態塌陷 (PDN Vdd Droop)</b><br><span style="color:var(--ink-soft); font-size:11px;">Power Distribution Network Vdd Droop</span></td>
                      <td>全速運算向量執行瞬間晶片內部邏輯重置</td>
                      <td>ATE 測試板（Load Board）供電環路電感偏大，晶片瞬態翻轉電流（di/dt &gt; 50A/ns）引發供電電壓跌落超出下限。</td>
                      <td><b>推回：測試載板供電網路 (PDN) 仿真與去耦</b><br>在 Load Board 測試座背面直徑 5mm 範圍內密集鋪設超低 ESR 0201 多層陶瓷電容（MLCC）；優化測試程式避免全核瞬間同時反相翻轉。</td>
                      <td>瞬態電壓降 (Vdd Droop) &lt; 35mV, 紋波 &lt; 20mV</td>
                    </tr>
                    <tr>
                      <td><b>9</b></td>
                      <td><b>晶片內置溫度感測器校準失真</b><br><span style="color:var(--ink-soft); font-size:11px;">Thermal Diode Sensor Skew</span></td>
                      <td>高溫保護提前誤動作導致頻率被強制降頻</td>
                      <td>晶片內部能隙參考電壓源（Bandgap Reference）製程變異，使晶片測得之內部溫度與真實結溫（Tj）誤差超過 ±5°C。</td>
                      <td><b>推回：ATE 測試端兩點溫度校準與 eFuse 燒錄</b><br>在 ATE 常溫（25°C）與高溫（100°C）進行兩點溫度校準，將斜率與截距偏差代碼動態燒入晶片 eFuse，確保系統測溫誤差 &lt; ±1.5°C。</td>
                      <td>溫度感測器校準誤差 &lt; ±1.5°C across -40~125°C</td>
                    </tr>
                    <tr>
                      <td><b>10</b></td>
                      <td><b>冷熱循環試驗銲點熱疲勞開裂 (TC)</b><br><span style="color:var(--ink-soft); font-size:11px;">Thermal Cycle Solder Joint Cleavage</span></td>
                      <td>JEDEC 條件 C (-65°C to 150°C, 1000 次循環) 斷路</td>
                      <td>BGA 銲球介面金屬間化合物（IMC，如 (Cu,Ni)6Sn5）過厚脆化，在長期交變熱剪應力下沿 IMC 邊緣微裂縫失穩開裂。</td>
                      <td><b>推回：封裝迴銲峰值溫度與冷卻斜率管制</b><br>嚴格限制迴銲爐在液相線以上的時間（TAL &lt; 60s），控制 IMC 厚度在 1.5~3.0um 最佳韌性區間；迴銲後冷卻速率控制在 3~4°C/s 細化晶粒。</td>
                      <td>1000 次熱循環後銲點電阻變化 &lt; 10%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
`;

// Insert Section 0.4 right after the closing </div> of Section 0.3
const section03ClosePattern = /<!-- COMPREHENSIVE TOP 10 FALLOUT MASTER TABLE -->[\s\S]*?<\/tbody>\s*<\/table>\s*<\/div>\s*<\/div>/;
if (!section03ClosePattern.test(html)) {
  console.error('Could not find section 0.3 close pattern!');
  process.exit(1);
}

html = html.replace(section03ClosePattern, (match) => {
  return `${match}\n\n${section04Html}`;
});

// Add tab switcher JS code
const tabSwitcherJs = `
  // ===================================================
  // STAGE-BY-STAGE TOP 10 FALLOUT TAB SWITCHER
  // ===================================================
  function switchStageFalloutTab(stageNum) {
    // 1. Update Buttons
    for (let i = 1; i <= 5; i++) {
      const btn = document.getElementById('btn-stage-' + i);
      const panel = document.getElementById('stage-panel-' + i);
      if (btn) {
        if (i === stageNum) {
          btn.classList.add('active');
          btn.style.background = 'var(--accent)';
          btn.style.color = '#fff';
        } else {
          btn.classList.remove('active');
          btn.style.background = '';
          btn.style.color = '';
        }
      }
      if (panel) {
        panel.style.display = (i === stageNum) ? 'block' : 'none';
      }
    }
  }
`;

html = html.replace('function updateFalloutSimulator()', `${tabSwitcherJs}\n  function updateFalloutSimulator()`);

// Update Footer Date and Rev
html = html.replace('Rev. I', 'Rev. J');
html = html.replace(/2026-10-21 20:15/, '2026-10-21 20:30');

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Successfully injected Section 0.4 Stage-by-Stage Top 10 Fallouts into index.html');
