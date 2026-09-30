# Personal website review

## Current local review — 25 September 2026

- Read both requested ZCode sessions (`sess_6ef86fda-ae1c-4a7b-a6d3-605a353585cf` and `sess_de39c56e-666e-445b-9a64-8e603732e942`). The owner's recurring direction is small, consistent type; a personal About rather than a generic design statement; a compact three-record shelf with real covers; restrained, source-backed News; and no filler about unfinished CV or site work.
- Compared the live local Home, Work, Notes, News, About, map and institution view visually in the in-app browser at its desktop width. The About personal copy had lost the owner's description of many sides, the three records occupied an oversized frame, Work had unnecessary row height, and News source strips sat in excessively tall image areas.
- About now uses the owner's stated themes of interdisciplinary study and human emotion, with a compact record shelf. Work rows have a shorter shared scale and clearer summaries and venue names. News excerpts retain their document proportions. Selecting an institution now changes the map panel to its name and role. The visible About and Work copy no longer says that details will be added to a CV or the site later.
- Build/check after this review: `node website/build.mjs`, `node website/check.mjs`, and `git diff --check` completed without errors. The browser pass confirmed the new About and News layouts, map institution selection, and dark theme. A 390 × 844 viewport pass checked Home, Work, News, and About's personal section, then restored the default browser viewport. Owner acceptance and public deployment remain pending.
- A second visual pass found that the framed album block still looked like a generic card. It now uses a single narrow shelf line with three larger covers and readable permanent labels; hover raises a sleeve without moving the surrounding text. The About prose, Work summaries and venue names, News summaries, and lower-page review/award records now use a closer reading scale. The large-text control was checked at desktop and 390px, then returned to its default state.
- The official Home Affairs Department membership page was opened and its Yau Tsim Mong list checked against the owner's name. A crop from the visible list was added as one source-linked News record, with the same source linked from the committee experience. Only that appointment is supported by this list; the other committees and tutor role still rely on the supplied CV record. Desktop Chinese News and narrow Chinese/English Work and About were inspected after these changes. The source photo currently used by Home is the later selected and credited Unsplash version, matching the subsequent September 2026 record below.

## Historical review — 20 September 2026

## Current build

- Home keeps the selected material composition, now as a transparent cutout on light and dark backgrounds. It has a compact introduction, two Work entrances, Notes, and a Hong Kong clock.
- Work has nine records with transparent abstract covers, split into publication and practice views. Its two practice details have direct page entrances. Notes contains the unpublished industrial-design/modernization draft; the short simplicity reflection is now only in About.
- About begins with the introduction and two short reflection paragraphs beside a three-album editorial shelf. Its Natural Earth coastline and city points place Beijing, Shenzhen, and Hong Kong geographically with one colour treatment in both themes. The map pans and zooms, and a static outline remains if interactive JavaScript is unavailable. A fourth text group keeps institutions with no recorded city visible. City selection filters institutions; institution selection reveals one shared record set. Honours, credentials, and peer review share a quiet ruled ledger with all six honours visible.
- Contact opens in place. The short music preview persists between same-language pages. The original PDFs remain embedded in a local PDF.js reader with page, search, and zoom controls.
- Original PDF readers now open with the preview occupying the first viewport and a compact factual sidebar at desktop widths; phones show the preview before the sidebar. Page-fit makes the first PDF page visible in full on initial load. The site palette now includes warm paper, blue, grey-green and clay across the background, map, work covers and Notes symbol; map and Home motion remain subtle and follow reduced-motion preference.

## Verification performed

- `node website/build.mjs`, `node website/check.mjs`, and JavaScript syntax checks pass. The current static check covers 80 generated HTML documents and 706 local references, with no failures. All three hosted PDFs are byte-identical to their supplied originals.
- The latest About and Notes browser pass covered English and Chinese at 1280, 390, and 320 CSS pixels in light and dark themes: no horizontal overflow or page errors. About displayed six honours in the same ledger as credentials and review; its three album sleeves and hover labels rendered, and the player control stayed clear of those labels. Notes contained the single longer draft and no copy of the short About reflection. The retired `writing.html` link redirected to About. The map rendered three interactive city markers; selecting Shenzhen filtered to its two institutions.
- Browser checks covered Home, Work, Notes, About, writing, both practice pages, and a paper reader in Chinese and English at effective widths of approximately 320, 389, and 433 CSS pixels: 48 route-width combinations. None showed horizontal overflow, overlapping header regions, or broken completed images.
- Clicking Beijing selected Tsinghua and IGSNRR. Opening Tsinghua displayed its two existing records, without creating duplicate entries. Direct Work disclosure opened its factual details and original-PDF entrance. The original PDF rendered in the local reader, showing native page controls and document content.
- On the narrow About review, selecting Beijing filtered to two institutions; opening Tsinghua showed its two records as a dedicated mobile scene; its explicit Institutions button returned to the same Beijing list without changing the city filter.
- The former invented land silhouette was replaced with clipped Natural Earth 1:50m/1:10m land geometry and city points. Beijing, Shenzhen, and Hong Kong pins selected their matching institution groups. The 320px English About preview reported no overflow or broken images; 390px light/dark and desktop map layouts were inspected visually. Natural Earth source, representative-city-centre limitation, and regeneration steps are recorded in `references/geography.md`.
- The updated 320px and 433px browser checks for Home, Work, Notes and About passed in both languages with no horizontal overflow or missing images. The English heatwave, crypto-ncRNA and Olympic readers loaded the original PDFs with 13, 11 and 18 pages respectively. At desktop size the first PDF page and the summary are visible in the initial viewport; at 320px the preview is first and the page does not overflow. Light/dark Home and the recoloured About map were inspected visually.
- The Notes essay's heading and first paragraph were measured at the same horizontal coordinate. A short Notes page placed its footer at the viewport edge. Light and dark cover, Work list, About map, Notes, writing, and practice detail layouts were inspected visually in the browser.

## Limits

This is a local build. Physical-device testing, full accessibility audit, publishing, and the owner's final aesthetic acceptance are not claimed. Institutional city labels refer to institutions, not to exact personal work sites. The note is still a draft awaiting the owner's revision; final publisher texts and unpublished project demonstration files were not supplied. Music depends on the external official preview remaining available.

Live pre-fix diagnosis on 20 September: both `https://tyhuang.hk/` (Vercel) and `https://huangty5121.github.io/` (GitHub Pages) returned HTTP 404, while `/material-demo/dist/site/index.html` returned HTTP 200 on both hosts. The copy pushed to the GitHub repository had no root `index.html`, `vercel.json`, or Pages workflow. Publishing configuration is now prepared; a new public deployment must be checked after the changes are pushed and the Pages source is set to GitHub Actions.

## 2026-09-20 晚 · 地图恢复（在 GPT「mvp v1」之上）

- GPT 版本把地图改为离线 GeoJSON 海岸线（无瓦片），用户反馈「地图没了」。已在 GPT 结构上恢复真实瓦片：明色 Esri World_Topo_Map（保留 GPT 的 saturate(.66) 降饱和滤镜），暗色 Esri Dark_Gray_Base + Reference 路网标注层。
- GeoJSON 海岸线保留为 z100 专用 pane 的底层：瓦片加载前/离线时兜底，随主题换色。
- 城市标记恢复为空心光晕圆点（沿用 GPT 的城市色 北京紫/深圳橘/香港青），不显示地名标注；总览态有虚线弧线连接三城（微东凸，行进动画），进入单城后隐去；城市跳转 setView 非动画 + 屏外隐藏地图按城市预取瓦片。
- 修复了此前弧线乱走的根因：arc() 二次贝塞尔把 cx/cy（纬度/经度控制点）在 push 时用反了。
- 验证：明/暗主题瓦片加载、圆点、弧线、城市跳转均正常；check.mjs 0 failures；镜像目录已同步重建。

### 追加（同日晚）：按用户澄清修正

- 用户澄清：「做过的事」账本与首页时间组件是用户主动让 GPT 改的，保留不动；启动页被进度条替代也是用户要求（加载/切换通用过渡），不恢复。
- 地图按用户要求改为「明暗同一套、固定浅色」：两种主题都用降饱和 Esri Topo 瓦片 + 浅色海岸线底层，不再随主题切换；瓦片层、光晕圆点、弧线保留。
- 主视觉 folio-scene-cutout.webp 以 q92 重编码并轻度锐化（图源本身为生成图，真正提升清晰度需重生成更高分辨率原图，已向用户说明）。
- 专辑封套放大至 100px 并提升文字清晰度（标题 14px、歌手 8px 小型大写）；contact 卡重修留白节奏并补回 LinkedIn 品牌色芯片。
- 验证：暗色页面 + 固定浅色地图、contact 明暗两态、封套清晰度均通过；check.mjs 0 failures；镜像已同步重建。

## 2026-09-21 凌晨 · 用户新一轮决策落地

- 地图按用户参照（Google Maps 图层感）：Esri World_Street_Map + detectRetina（512px 高清瓦片），保持降饱和滤镜与固定浅色；山脉阴影不再突兀，路网/城市/海岸线分层清晰。
- Work 徽章补全：热浪 IF 4.1 · JCR Q1（SJR Q1）、GLM7 IF 14.1 · JCR Q1、JOCN IF 1.9、BIBM CCF B、Crypto-ncRNA 标注 CCF A · ICML Workshop（注明是主办方会议等级）、StrucTrace「IF 待公布」（npj 系列新刊，注明系列后续通常 Q1）。
- 新增 News 页（独立导航「动态」）：news.mjs 单一数据源；剪报卡（真实报道：2024 中华吟诵学会中秋联谊会，有链接）+ 站点近况 + 学术足迹（Google Scholar / ResearchGate / IEEE Xplore 真实档案）。首页暂不加 Latest，等报道多了再说。
- 首页 Hero：中文页「黄天野」大字 + TIN-YEH "HEAVEN" HUANG 小字；英文页镜像（Tin-Yeh Huang + 黄天野 · "HEAVEN"）；其余位置保留英文名。启动页印章同步用黄天野（WenKai）。
- 启动页改为每次完整加载固定 ~1.25s 的印章+进度条动画（用户反馈从未见过启动页，要求固定时长保证 smooth），站内 SPA 跳转仍走进度条。
- 桌面一角重构：自述正文换 WenKai 手写体；新增三个小插件（循环中/信一句话/现在）；唱片架改用真实专辑封面（iTunes 600px：U 87 / CHIN UP! / THE PROTÉGÉ，U87 裁方）。
- 配色：accent 从深蓝 #0066cc 换成青绿 #1c7f6d（暗色 #7ed3c0），venue 徽章、启动页、光晕随之统一。
- Notes 正文与 blog 使用 wenkai-essay.woff2（86KB 子集，pyftsubset 从全量 TTF 重新生成，含 industrial-note 全文与界面词表；OFL 许可随包）。
- 验证：明暗主题、News/About/Home/EN、390px 无横向溢出；check.mjs 82 页 0 failures。

## 2026-09-21 · 用户反馈修正轮

- 启动页整体移除（用户看过实机后不喜欢）。
- 论文行重排：IF 与 JCR/CCF 拆成两枚独立徽章（IF 中性色、分区暖色），放条目右列纵排，箭头不再重叠；Crypto-ncRNA 修正为 CCF A · ICLR 2025（此前误写 ICML——该文是 AI4NA @ ICLR 2025）。修复过程中发现徽章用 <a> 嵌在外层条目 <a> 内导致 HTML 解析器拆坏结构，已改为 <span>。
- News 简约化：删引号装饰与抒情文案（「以吟诵登台…」换为朴素事实句），学术足迹区撤出 News。
- 学术档案迁至联系名片：contact 面板重做成名片（黄天野 WenKai 抬头 + 点击复制邮箱 + 写邮件/LinkedIn/GitHub/Scholar 按钮 + 名片页入口）；新增 card.html 可分享名片页（tyhuang.hk/card.html）。
- 桌面一角再简化：删纸张行（两张手稿图不该搬过来）、删「现在/叙事」标签与手动明暗切换；编辑器窗口跟随站点主题；三张专辑收窄为紧凑堆叠（悬停展开）。
- 天数智芯、启元实验室放回北京组（GPT 版 cityFor 漏掉导致落入「其他机构」），空的「其他机构」分组删除。
- 组织 Logo 暗色样式改为安静的灰绿钉贴，不再是大白框。
- 死代码清理：一次自动清理器损坏了 CSS（boot-stamp 关键帧三节点导致括号计数错位），已从 git 干净基底重建并改为手工精确清理；blog 文内标题与自述/名片使用 WenKai 子集（86KB）。
- 验收：明暗主题下 Collection/About/News/Card/Contact、EN 首页、390px 手机版均通过；check.mjs 84 页 0 failures。

### 追加：论文行徽章位置再调

- 按用户意见：IF/JCR 徽章不再单独占右列（会被撑出奇怪的底部空隙），改回期刊名同行、紧随其右（箭头仍居右列垂直居中）；行高恢复由内容决定。手机端徽章自然换行。

## 2026-09-21 · ZCode 审查轮：死代码清零 + News/桌面一角重构

- 死代码清理（先在构建产物 grep 确认零引用再删）：site.css 移除约 22 组遗留类（.preview-marks、.local-clock、.paper-aside、.cabinet-voice、.album-roller/.album-pop/.album-art*、.venue-metric、.contact-lead/.contact-profiles/.contact-methods/.copy-email/.contact-logo-linkedin/.contact-logo-github、.selected 布局段、.board-hint、.entry-feature、.feature-excerpt、.work-section-heading、.inset-heading、.regional-heading、.board-secondary 等，含混用选择器组的逐项摘除）；site.mjs 移除 .kernel-grid/.engineering-feature 的 GSAP 死分支；views.mjs 移除 venueText 与未用的 profiles 导入；news.mjs 移除 profiles 数据。修复 site.css 原 30 行悬空 `body[data-large-text=true]` 选择器吞掉 @keyframes panel-open 的问题（名片弹窗开场动画自引入以来从未生效，现恢复）。
- News 重构：press 卡片盒改为「报道 / 近况」两组细线时间行（日期列 + 标题 + 单行事实句，无卡片底）；近况改为可核实条目（StrucTrace 获接收、ICLR FM4Science 审稿、网站改版一句话），删除自夸式条目；两组间 36px 间距（修复上轮 visual fail：站点近况标题贴卡）。
- 桌面一角重构：整块改为居中卡片内双栏（左自述窗口、右唱片架）；win-body 弃用 WenKai 回归 DM Sans（用户反馈该处字体莫名其妙）；窗口标题改「关于我.md」；专辑从负边距堆叠+悬停 tooltip 改为等宽 96px 一排 + 下方标题/歌手·年份小字；删除假木质搁板。
- 验收：改版页明/暗主题、EN News、390px 手机版 visual-judge 全过（该批截图文件名主题对调系截图脚本 localStorage 残留，非站点缺陷）；check.mjs 84 页 0 failures；死类名在 site.css/views.mjs/site.mjs/news.mjs 内 grep 0 命中。

## 2026-09-21 · 用户反馈轮：架子与动画恢复 + 徽章成组 + ICML 徽章

- 桌面一角最终定式（用户明确指示）：桌面端左=自述窗口、右=原版唱片架（三张真封面负边距堆叠在搁板线条上，悬停展开+抬升+标题弹出动画，逐帧恢复原实现）；窄屏上下分行；窗口正文保持 DM Sans、窗口标题绝对居中（修复红绿灯挤偏）。中庸的居中单列版废弃。
- Work 徽章：IF/JCR 两枚徽章包进 .chip-set（inline-flex + nowrap），换行或手机上作为整体移到下一行，不再出现单枚落单；徽章仍紧随期刊名。
- venue-metrics 补 olympic 条目：`CCF A · ICML 2024`（New In ML Affinity Event，注明为主办方 CCF A 会议的 workshop 记录、非主会论文）。
- 手机版首页回归核查：与清理前基线逐像素对比（visual-judge 实测内容带边缘全对齐），确认本轮 CSS 清理没有改变首页排版；用户感知的差异来自主题/时钟等动态内容。
- 验收：v3/v4 两轮 visual-judge——桌面/手机 collection 徽章、桌面/手机桌面一角（含悬停帧）、手机首页对比全部 pass；check.mjs 84 页 0 failures。

## 2026-09-21 · 首页英雄区：真实照片定案

- 用户提供了四张自己拍的照片（理大日景、校园夜景、维港夜景、维港游船夜景），已从微信临时目录抢救进 `website/assets/photos-src/`。
- 中途尝试：①Wikimedia CC 图全幅横幅（用户否）；②手绘 SVG 天际线（用户嫌不好看）；③夜景照片本地 PIL 生成墨线线稿（边缘法两版，结构可以但用户最终弃用）。最终定案：**维港夜景原图直出英雄区**。
- 首页结构改为全幅照片英雄区：`harbour-night.jpg`（1440 原尺寸、q80）绝对定位铺满 `.landing`，三层渐变压暗（左→右 + 底部融入页面底色），名字（黄天野/Tin-Yeh Huang）白字叠在照片上，eyebrow/简介/双链接/香港时间全部转为白色系，右下角小字「维多利亚港 · 我拍的」。
- 原右侧材质拼贴图缩小（150px，<900px 时 112px，<600px 隐藏），绝对定位挪到「工作之外」条右下角，微出条边缘。
- 随之清除整条死链路：.material-scene/.edge-note 全部 CSS、GSAP 注册块（site.mjs）、GSAP 两个 script 标签与 vendor/gsap 复制（build.mjs）——站点现无 GSAP 依赖；`.harbour` 线稿带与其 keyframes 一并移除（harbour-sketch.png 保留在源 assets 作纪念，不进构建）。
- 验收：桌面明/暗、390px 手机、滚动后工作列表与 notes 条截图均通过人工检视；check.mjs 84 页 0 failures。

### 追加：地图重做（用户反馈三轮后定案）

- 过程：先试 CARTO Positron/Dark Matter（用户网络不可达，地图一直退回离线剪影，被误认为「改回以前的 SVG」）；又试 Esri Dark Gray 暗色（被指「黑白的」）。
- 定案：**亮暗两主题都用 Esri World_Street_Map 实时瓦片**——图层本身就是绿地面、蓝水面、灰白路网，与站点配色同语言；暗色仅加 `brightness(.58) contrast(.95) saturate(1.05)` 滤色压暗，保留绿蓝色相，不再是黑白灰。
- 层序改为：离线 Natural Earth 剪影（pane z=60）→ 瓦片（z=200）覆盖。剪影配色与瓦片接近，加载瞬间无缝；删除剪影会白屏一闪，故保留。珠三角小窗（city-inset）按用户要求整体移除（JS+CSS）。
- 主题切换由 data-theme MutationObserver 驱动 setBase+land 样式同步；land GeoJSON 双主题配色（浅绿/深绿）。
- 验收：全国视野明暗两态截图确认（绿蓝灰、暗色保留色相）；check.mjs 84 页 0 failures。

### 追加：地图终版（Google 式绿蓝灰合成）

- 排障结论（curl 实测）：CARTO/OSM/Esri 在本机网络间歇不可达，webrd0X.is.autonavi.com 的 https TLS 直接失败（部署到 https 后必挂，不能用）；**webst0X.is.autonavi.com https 可达**，其 style=8 是透明底「路网+注记」图层。
- 终版构图（用户要的 Google 式绿蓝灰）：底层蓝海（容器底色 #cfe0ef / 暗 #20262c）+ 绿陆地（Natural Earth GeoJSON pane z=60，浅 #d3e6d3 / 暗 #24332c）→ 上层 AMap style=8 实时路网注记瓦片（subdomains webst01-04，detectRetina，maxZoom 17，tileerror 单次重试）。城市点 WGS84→GCJ-02 纠偏（标准算法内联），放大验证压线正确。
- 离线 fallback SVG 按 user 要求彻底删除（views 地理函数、隐藏逻辑、全部 CSS）；珠三角小窗同样删除。
- 暗色 = 同一合成 + tile-pane brightness(.58) 压暗（保留绿蓝色相）。已知取舍：全国视野下 Natural Earth 裁切多边形的直边可见（数据本身裁切范围所致），放大后不可见。
- 验收：亮色全国/珠三角、暗色全国截图确认；check.mjs 84 页 0 failures。

### 追加：地图终版 v2（真瓦片底图）

- 用户推翻「绿地块+路网叠加」合成（地块层仍被认作假 SVG），要求瓦片本身渲染地海的完整真底图。
- 实测 webst0X.is.autonavi.com 的 **style=7 即高德完整彩色底图**（米地、蓝水、灰界、中文注记，Google 观感），https 可达（偶发抖动，四个子域轮询+tileerror 重试兜底）。
- 终版：单一高德 style=7 瓦片层（detectRetina、maxZoom 17、keepBuffer 4）；land GeoJSON pane、map-land.mjs（源文件+build 生成链路）全部删除；暗色仅 CSS brightness(.58) 压暗；GCJ-02 纠偏保留；tileerror 单次重试保留；attribution「© 高德地图 AMap」。
- 验收：亮色全国（真实海陆+省界+弧线+圆点）、亮色北京放大（街路+区县+清华/IGSNRR/天数智芯=北京组）、暗色北京压暗三态截图确认；check.mjs 84 页 0 failures。

### 追加：机构图钉 + 字号降档 + CSS 括号事故修复

- 地图升级为**机构级图钉**：ORG_COORDS（views.mjs）存每个机构的 WGS-84 坐标（理大/理大内衣/PolySmart、红磡湾 CPCE·HKCC、皇家太平洋、添马政府总部、清华、IGSNRR 大屯路、启元荷清大厦、天数智芯北京、SMART 光明、零一学院坪山+南山两校区，`key~后缀` 支持同机构多点），渲染前统一 WGS84→GCJ-02；圆点按城市着色，hover 显示名称，点击直接打开对应机构记录。三个「城市中心点」大圆点删除。
- 用户指出**字体太大太夸张**：全站字号整体降一档——英雄名 44→34px（@600 38→31）、基础 h1 32→27 / h2 22→19 / h3 18→16、页标题 28→23、论文页 clamp→29 上限、博客页 40→31 上限、section-heading 20→18 等。
- 事故与修复：字号批量替换在某条 @media 规则里吞了一个 `}`（hero-name 31px 后），导致其后约 150 行 CSS（英雄区布局、暗色地图、图钉）被浏览器整体忽略——这正是「自己点开」抓出首页英雄区崩坏的原因。已修复并加括号配平校验习惯。
- 验收：首页（全幅照片+小号白字）、关于页（cabinet+真地图+北京图钉）自查通过；check.mjs 84 页 0 failures。

### 追加：地图交互按用户逻辑重做

- 交互定案（用户口述「点哪个 org 就显示哪个 pin」）：点列表机构或图钉 → 地图 flyTo 该机构真实坐标（单点 z13 居中；零一学院双校区 fitBounds 同框）并高亮图钉；点城市 → fitBounds 框住该城所有机构图钉（maxZoom 13）；#org-xxx 直达链接同样聚焦。
- zoom 全面加深（城市 11/12/13，弃用 8/9）：高德低倍视野空旷且「北京」等瓦片标注巨大（用户反馈字体太大），深 zoom 后字号比例正常、细节成立。
- 加载底色从海蓝改为暖白（#eef0e9，暗 #20262c），瓦片未到时不误读为水域。
- 验收：点北京框图钉、点清华大学飞至清华园居中高亮、全国视野三态截图确认；check.mjs 84 页 0 failures。

### 追加：默认视野改为珠三角（用户「现在的地图不好看」分析落地）

- 分析结论：高德 style=7 的内容密度随缩放变化——城市级好看，国家级是空米色；而机构点全贴海岸线，默认全国视野必然构图失败（一条弧线横过空地）。这是审美问题的根因，不是瓦片或样式问题。
- 方案：默认视野改为框住深圳+香港机构群（fitBounds + pad .25 + maxZoom 11）；北京经右侧「北京 · 4处」按钮一键聚焦。城市按钮增加图钉计数列（北京4/深圳3/香港5，grid 加 auto 列）。
- 顺手修掉一个 TDZ bug：orgCity 定义在 overview() 首次调用之后导致初始化抛错、图钉全灭。
- 验收：PRD 默认视野截图（真瓦片路网+公园+海+图钉；沙盒网络慢导致的零星未加载瓦片块在真实网络无碍）；check.mjs 84 页 0 failures。

### 追加：三语言站（简/繁/EN）+ 版式归一轮

- 新增繁體中文版：`/tw/` 全站 42 页 ×3 语言（共 126 页）。构建期用 opencc-js（cn→hk，OpenCC 詞典級轉換，一簡對多繁不翻車）把 zh 渲染結果整頁轉繁，`lang="zh-Hant"`；tw 專用 `tw/site.mjs`（JS 注入字串同樣轉繁、`data-lang!=='en'` 判定、圖標路徑修正）。node_modules 為構建依賴，不隨站點發佈；部署機首次需 `npm i`。
- 頁頭語言切換：右上角兩枚連結（简頁顯示「繁 EN」、繁頁顯示「简 EN」、EN 頁顯示「中 繁」），複用 `.language-link` 類保持整頁跳轉。
- 文字大小按鈕（Aa）從頁腳移到頁頭右上角（主題切換左側），頁腳相關樣式清除。
- 字號歸一：13.5/12.5/11.5/10.5/9.5/8px 等雜號全部歸入 {9,10,11,12,13} 階梯。
- 尸山清理：刪 previous-material-build.mjs / previous-material-site.css；移除無用的 --map-land 變量；build 清理循環補上 tw 目錄（修復首輪 tw 跳轉殘留）；tw 頁手機端隱藏頂部導航由 ☰ 目錄承擔。
- 驗收：tw/index 首頁（curl 驗證 lang=zh-Hant、簡體零殘留、切換器「简 EN」）、手機頁頭（Aa/主題/繁/EN/目錄排布）截圖確認；check.mjs 126 頁 0 failures。

### 追加：「每个人都有很多面」整幅章节 + 瓦片加载加固

- About 新增 `many-sides` 整幅章节（Cabinet 与地图之间）：眉题「以人為本」+ 大标题「每个人都有很多面。」（WenKai）+ 用户口述的私人文案；8 张 face 卡（4:3，全部来自用户 4 张照片的不同裁切，PIL 生成 assets/faces/），情绪字（WenKai 24px 白字压照片）+ 右下英文小字，8 种情绪：开心/伤心/生气/羡慕/内疚/羞耻/胆小/脆弱；下方学科网络 SVG（我 + 理工/人文/社科/商 五节点互联，WenKai 标签）。桌面一角恢复原样。
- 首页恢复 poster 感的竖排 edge-note（「個人網站 / 2026 — 維多利亞港」）；英雄照片重新出 2560px q78（修复 2K 屏清晰度不足）。
- 地图瓦片加载加固：tileerror 重试 3 次、每次轮换 webst 子域、递增延迟；预热地图只保留北京目标（先前全城预热与可见地图抢连接池，是区块加载不出的主因）。
- 验收：faces 墙+网络图、首页竖排字自查截图；check.mjs 126 页 0 failures。

### 追加：地图加载逻辑回滚

- 用户表示目前 deploy 的地图没问题，tile 逻辑回滚到部署版：tileerror 单次原址重试；预热恢复全城循环。PRD 默认视野、机构图钉聚焦、zoom 加深等交互保持现状。

### 追加：首页/很多面 美术化（用户「用你的美术想法」）

- 首页：英雄照片加青绿渐变调色（左上 115deg #1c7f6d 微染，贴合站色）；竖排 edge-note 回归并补样式（右缘 9px/0.34em 竖写「個人網站 / 2026 — 維多利亞港」，≤600px 隐藏）；「最近的工作/工作之外」加 01/02 编辑编号。
- 很多面：均匀网格改拼贴——6 列 mosaic，开心 2×2 大卡、羡慕竖排字长卡、生气/羞耻/脆弱 2×1 横卡、伤心/内疚/胆小单卡，插「我有哭有笑。」「比例是多少？」两个 WenKai 文字块；处理方式混排（生气/脆弱黑白、羞耻青绿 duotone、其余彩色）；≤760px 折成两列竖排节奏。
- 验收：桌面首页（调色+竖排字+编号）、面墙拼贴、手机面墙自查通过；check.mjs 126 页 0 failures。

### 追加：About「很多面」章节按用户要求整体撤除

- many-sides（面墙+学科网络）从 views/CSS/构建资产中整体移除，桌面一角维持「设计自述窗口+专辑架」原样；图片资产（assets/faces、face-*.jpg）删除。
- 首页保留本轮改动：2560px 英雄图、青绿调色、竖排 edge-note、01/02 段落编号。
- check.mjs 126 页 0 failures。

### 追加：封面文字上移

- 按用户反馈（名字和 clock 太靠下，要「中间偏下」）：identity 底部 padding 58→132px，名字块升至画面中偏下位置，.clock 随动。

### 追加：地图确认=HEAD 逻辑 + 总览按钮

- 核实：工作区 site.mjs/site.css 的地图代码与 HEAD（a1691c0 v2，用户自行提交）完全一致——「恢复到没修改的」已满足；縮放表现即 v2 行为（高德 style=7，城市 11/12、机构聚焦 13）。
- 新增「○ 总览」按钮：位于城市列表末位（data-city=""，走既有 fly('')→overview 路径），点击回到默认深港珠澳取景并取消城市选中。
- 验收：深圳选中→3 图钉取景；总览→全景+取消选中；check.mjs 126 页 0 failures。

### 追加：总览=宏观全国视野（用户澄清后修正）

- 「○ 总览」行为改为：fitBounds 全部机构图钉（北京↔香港，pad .18 / maxZoom 7）= 整个宏观地图，并取消城市选中与图钉高亮。城市按钮仍为深 zoom 取景。
- 修复作用域 bug：chooseCity 关在 if(board) 块内，地图块的监听器触发 ReferenceError——经 closeCity 变量带出（与 selectCurrentOrg/focusOrg 同模式）。
- 验收：深圳选中→总览→全国视野（北京+深港图钉、弧线、取消选中）截图确认；check.mjs 126 页 0 failures。

### 追加：原图存档

- 用户桌面发来两张原图：游船照 2560×1920（真原图，已替换 photos-src/harbour-yacht.jpg）、天际线封面照仍为 1440×1080（微信压缩，无更高清版本）。faces 目录已随章节撤除不存在，无需重生成。封面清晰度天花板 = 1440 源 + Lanczos/锐化处理；如需更清晰可换用 2560 游船原图作封面（待用户定夺）或提供天际线的真原图。

### 追加：封面換用 Unsplash 高清圖

- 60MP 原圖（9433×6289，pourya gohari 攝，Unsplash 授權）縮至 2560×1707 + 輕銳化，替換英雄封面；署名改為「維多利亞港 · 圖片 pourya gohari / Unsplash」（不再是「我拍的」，誠實標註）。原圖存檔 assets/photos-src/harbour-unsplash-original.jpg。
- 用戶自己的天際線原圖微信端僅 1440（已存檔），遊船 2560 原圖在庫；兩者保留備用。
- 驗收：2000px 寬屏截圖——建築燈光清晰、銳利；caption/署名正確；check.mjs 126 頁 0 failures。

### 追加：英雄圖納入構建指紋（修復「沒更換」）

- 用戶端未換圖的原因：hero 圖 URL 無版本號，瀏覽器快取了舊圖。修法：harbour-night.jpg 位元組納入 cacheKey 雜湊，img src 帶 `?v=fingerprint`；今後圖片一換 URL 自動失效快取。views 增加cacheKey 參數透傳。

### 追加：三语管线代码审计 + 部署守卫（2026-09-24）

- 用户报告繁体版多处显示 bug，要求纯代码校验（不看视觉）+ 部署测试。审计坐实四个逻辑 bug 并修复：
  1. **tw 全站图标隐身**：build 对 tw/site.mjs 的资产路径替换写成 `'./assets/`（单引号），而 site.mjs 实际用反引号模板串——替换从未生效，动态 import 404→catch→全部 `[data-icon]` hidden（主题/菜单/播放按钮图标全消失）。改为正则 `(['\`])\.\/assets\//` 同时覆盖两种引号。
  2. **tw 论文页空 `<title>`**：标题索引 `title[lang]` 遇 `lang='tw'` 为 undefined，read/work 页变成「 · Tin-Yeh Huang」。改为 `title[lang==='tw'?'zh':lang]`。
  3. **tw 跳转页简体 + `lang="tw"`**：跳转页未过 zh2t、lang 码用了循环变量。改为统一 zh-Hans/zh-Hant/en 并对 tw 应用转换。
  4. **软导航后语言切换链接过期**：navigate() 只更新第一个 `.language-link`，第二个（EN/繁）仍指旧页面。改为同步全部。
- 死代码清理：ScrollTrigger 残留调用 ×2、地图块重复的 `zhLang` 判定（并入模块级 `zh`）、`SUFFIX_LABEL.ps` 死键、`folio-scene-v3.webp` 死拷贝、cacheKey 中已无用途的 `mapGeometry.overviewPath`。
- 地图逻辑修正：`polysmart` 图钉为死交互（该经历记录挂在 polyu 机构名下，无对应机构按钮，点击必然空白面板）——移除钉与 orgCity/cityFor 判断，香港按钮计数 5→4。深圳保持 3 处（零一坪山+南山+SMART）。
- 部署卫生：build 新增资产修剪（dist 已提交进 git，源码侧删除会永久残留线上）——本次清掉 26 个陈旧文件（gsap 两件套、旧英雄图 3 张、faces 3 张、旧论文封面 jpg 3 张、孤儿 logo hkcc/polysmart、未用图标 10 个、.DS_Store×2）；vendor 目录（leaflet/pdfjs/papers）与许可文件不修剪。
- check.mjs 升级为部署守卫：html lang 白名单、空/畸形 title、tw 目录简体残留（opencc 复检）、tw/site.mjs 模块相对资产路径、图标文件存在性（动态 import 不走链接检查）、大小写敏感链接比对（macOS 本地 FS 不区分大小写会漏报，Pages/Vercel 会 404）。
- 验证：CI 同款命令 `node website/build.mjs && node website/check.mjs` 126 页 0 失败；`node --check` 两份 site.mjs 通过；本地静态服务冒烟 86 URL 全 200；CSS 未用选择子复审仅剩 Leaflet 运行时类与 wordmark 兜底。
- 文档对齐：README/SKILL/site-map 由「双语+GSAP+材质封面」改为三语+AMap 地图+照片封面现状。全部改动未提交，等「推送」。

### 追加：语言自动检测 + 三语全功能视觉验证（2026-09-24 续）

- 首访语言自动检测上线：head 内联脚本在无 `tyh-lang` 偏好时按浏览器语言（zh 变体细分：tw/hk/mo/hant→繁，其余 zh→简）判定，非中英浏览器用时区兜底（Asia/Shanghai 等→简、Asia/Hong_Kong|Taipei|Macau→繁，其他→英文）；检测只发生一次并存偏好——分享链接与手动选择永不被劫持。页面语言切换器点击时写入偏好（按链接解析路径段判断目标版）。
- EN 版语言切换器「中」改「简」；三版切换器现为 繁/EN、簡/EN、简/繁。
- e2e（IAB）：en-US 浏览器清偏好开 zh 首页→落 /en/ 并存 en；存 tw 开 en→不劫持；点「繁」→tw 且存 tw；点「简」→zh 且存 zh；15 组语言/时区检测单测全过。
- 三语功能矩阵（浏览器实测）：三版首页 25/25 图标渲染、英雄图、时钟；主题/字号/菜单/联系名片/音乐面板交互全过；关于页 11 钉、城市钮 北京4/深圳3/香港4/總覽、polysmart 钉已消失、钉点击开 5 条理大记录、#org-smart 直达、总览复位；工作页筛选/搜索（1 项内容）/排序；软导航后两个语言链接同步刷新（上轮修复验证）；动态 4 行 1 外链；阅读器 iframe 与返回图标；名片页；writing.html 三语跳转全部落地；404 返回首页。
- 视觉截图（浅/深、三语首页、关于页地图、动态页）：tw 首页全繁化+图标齐全；地图默认珠三角取景、图钉与计数正确；深色瓦片压暗正常。中途一张 about 截图出现「香港选中」假象，经两次干净加载复测 + 单标签页确认为主观测试链路的点击竞态残留，非代码缺陷。
- check.mjs 126 页 0 失败保持全绿。全部改动未提交，等「推送」。

## 2026-09-25 · deployed-site diagnosis and local map/directory revision

- Inspected `https://tyhuang.hk/about.html` in Chrome before editing. The deployed AMap view showed blank tile blocks after selecting Beijing; the city button revealed the expected four institutions, and selecting Tsinghua revealed the correct two records. The original institution choices were scattered logo tiles and the empty record column occupied substantial width.
- The deployed `robots.txt` allowed all paths, `sitemap.xml` returned 404, and the page head had no canonical or language alternates. A web search result still displayed an older “Frosty Neon” home snippet; this is evidence of stale search presentation, not proof that the live site is still serving that design.
- In the rebuilt local site, replaced the basemap with OpenStreetMap raster tiles and kept the WGS-84 institution coordinates unshifted. Removed hidden tile prewarming, which competed with visible requests. City and organisation selection, dark desktop view, and the 390px English mobile view were inspected. The Beijing tiles filled after loading, and Tsinghua's two records appeared via the directory. Mobile had no horizontal overflow and no page errors in the 390px browser probe.
- The institution selection now uses text rows with small logos. Before a record is selected, the directory fills the available width; selected records open beside it on desktop and below it on mobile. The three album covers no longer overlap or move neighbouring links on hover.
- Build and static checks pass after generating canonical URLs, reciprocal language links, sitemap, icon, redirect noindex, and search descriptions. This is local verification only; these changes have not been deployed or recrawled by Google.
- The About introduction was expanded with contributions already present in the work and experience records. The imitation Markdown window was removed; the design thought is now a short unframed aside beside the three real covers.
- Removed the first-visit language redirect: direct links and search-result URLs now keep their own language edition. The earlier 24 September note above records the previous implementation, which is superseded by this change.
- Corrected the News mention link to the specific 18 September 2024 article on the Chinese Poetry Society site; the article names 黄天野. The earlier organisation-homepage link and organisation label were inaccurate.

## 2026-09-25 · content and layout reconstruction

- Confirmed the current public homepage, About, CSS, and JavaScript are byte-for-byte identical to the repository HEAD generated files before revising local sources. This audit used the latest `tyhuang.hk` deployment, not a historical mockup.
- Visually reviewed the five primary live pages and the local light desktop versions. The main structure problem was that the About map appeared before any education or experience record; Work had search and sorting controls for only nine entries; Home added a clock and numbered section labels without helping the visitor; News included a self-referential redesign update.
- About now opens with the actual PolyU records selected. The map is shorter and paired with a city list; the directory is text-only, without logo cards. The personal design thought and three static album covers come after the main experience records. City and pin selection still reveal the one canonical set of records.
- Simplified Home's description and removed the decorative time readout, section numbering, and material cutout. Work keeps its publication/practice tabs and removes search and sort. Notes uses an unframed editorial row. News keeps externally verifiable mention and work updates, without the site redesign entry.
- Rebuilt all 126 language/route pages and passed `website/check.mjs` (1,347 local references, three source PDFs unchanged). Browser probes on 390px and 1280px in light and dark modes covered Home, Work, Notes, News, and About: zero script errors, broken loaded images, or horizontal overflows. Category tabs and Beijing→Tsinghua selection worked; the latter showed two records. Three languages were separately tested for institution selection.
- This is local review, not deployment or Google recrawl. The remaining design judgement should be made against rendered screenshots and the owner's preference before publishing.
- Rechecked ZCode design feedback: the owner asked for the same light map across both site themes. The local rebuild now keeps the OpenStreetMap basemap light in dark mode as well.
- The three real album covers now have a small position-safe hover/focus lift, with reduced-motion support. Their neighbouring cover positions stayed fixed in browser inspection; album images load eagerly so the About shelf is present in full-page capture as well as normal scrolling.
- In a reduced-motion mobile browser probe, the music panel opened, the official preview reached readyState 4 and played after a click, while album transforms were disabled. This confirms the local browser interaction; external playback still depends on the remote preview service.

### 2026-09-25 · User correction after first local redesign

- The owner clarified that the map is the main About element, “几项纪录” style counts should disappear, organisation logos should remain, and experience should read naturally below the map. Their ZCode About request also called for a centered Apple-style window title and a compact album shelf.
- Reordered About to a full-width map, followed by city choices and institution logos. No institution record opens by default; longer role detail is disclosed only on request. Restored a small browser-window composition and the Home Hong Kong clock/material cutout.
- Work is grouped into journals/proceedings, workshop/preprints, and practice. Removed workshop cards' borrowed main-conference CCF ranks and the unpublished npj impact-factor placeholder. News updates now link to their relevant records; additional updates use existing public site records only.
- Rebuilt 126 pages with no static-check failures; source PDFs remained unchanged. Browser checks at 320, 390, and 1280 pixels for zh-Hans, zh-Hant, and English found no horizontal overflow, loaded broken images, or script errors across Home, Work, News, and About. Map pins still select records in all three languages at mobile and desktop widths.
- These are local revisions to the verified latest deploy source; no deploy has been made.

### 2026-09-25 · Google and Projects follow-up

- Checked Google directly for `site:tyhuang.hk "Tin-Yeh Huang"`: current root and `/en/index.html` appear beside obsolete `/about`, `/lab`, and a fabricated `/signal/tailwind-philosophy` result. Live HTTP returns 404 for the three obsolete paths; the live root still serves the older title and lacks the new canonical metadata. The locally authored metadata is therefore not yet reflected in Google. Added permanent Vercel redirects for the meaningful old `/about` and `/lab` paths. The fake Signal page remains 404 so it can age out of the index after recrawl.
- Searched public primary sources for publication status. Elsevier shows the HeDA journal article and IF 4.1 at the journal level; Wiley shows Advanced Science IF 14.1. CCF's 2026 list explicitly excludes workshops from conference classification and lists BIBM as a B-class venue. Restored the BIBM CCF B badge for the proceedings paper, kept workshop papers separate, and did not invent JCR quartiles. An OpenReview-indexed ICLR 2026 PDF appears to be another HeDA version. The owner confirmed on 2026-09-25 that this site should use only the journal version; keep one HeDA entry pointing to the journal DOI and the existing preprint reader.
- Reworked Work as a lead visual article plus compact rows with right-side type, year and supported metrics. Replaced the tabbed NineToothed page and process-list social page with open case-note layouts. Redrew the heatwave, NineToothed, StrucTrace, and social editorial SVGs; alt text distinguishes them from real output. Fixed legacy `projects.html` to land at the practice group and removed inactive Work filter and project-tab JavaScript.
- Local build/check passed with 126 pages, 1,392 local references, and original PDF hashes unchanged. Dark-mode browser checks at 320/390/1280 px in all three languages covered Work, both practice pages, and the legacy redirect: no page errors, broken loaded images, or horizontal overflow.

## 2026-09-25 · About 结构、宏观网络、唱片与共享控制

- 按本轮反馈，About 顺序改为个人叙述 → 全幅多层网络 → 情绪的不同面 → 唱片选择 → 可核对的学习、经历与荣誉。旧的五点关系图被取消。网络是 Canvas 2D 编辑性表达，延伸至正文宽度之外；不冒充研究图或精确学科关系图。画布仅在可见时更新，系统减少动态效果时保持静态。
- 唱片从三张等宽卡片改为一个展示场景和三项显式选择。三张现有真实封面和 Apple Music URL 来自 `about-content.mjs`，点击选择更换封面与链接。实现参考见 `architecture.md`；未启用自动播放。
- `site.css` 的文本尺寸统一使用 rem，根字号由 14px / 16px 两档控制；版心宽度和左右留白收拢到 `--page-width`、`--page-gutter`。About 的中英长文案、情绪词和唱片元数据集中在 `about-content.mjs`；繁体由构建转换。删除本轮不再使用的旧 About 卡片样式。文件分工和改动规则写入 `architecture.md`、编辑技能及 site map。
- 静态构建检查：126 个生成页面、1410 个本地引用、0 failures；3 份 PDF 与原件 SHA-256 一致。浏览器检查：简体/英文/繁体 × 320/390/1440px × Home/Work/Notes/News/About，共 45 个默认字号条件与 45 个放大字号条件，均无横向溢出、页面脚本错误或已完成加载的破图。字号按钮在 About 的三语、三宽下从 14px 切到 16px；6 条手机/桌面跨页流程保留放大状态，唱片选择更新到对应链接。About 的网络和唱片在 320/390/1440px 的明暗主题下截屏审阅，选出的证据在 `review/about-2026-09-25/`。
- 本地浏览器检查没有打开 Apple Music 的外部页面，也不构成部署或用户对视觉方案的最终认可。旧的“唱片架最终定式”记录只是当时版本的决定，已被本轮明确反馈替代。

## 2026-09-25 · 用户再次纠正后的场景与版本对照

- 用户明确否定了大唱盘展示、单纯封面错位和给内容套一个 Mac 窗口的做法；要把架子、颜色、情绪和 About 的整体叙事一起考虑。此前本日记录的「唱片选择场景」已被此反馈取代，不是当前设计。
- 实际运行并截取了 Git 版本 `a1691c0` 与 `6a33fe9` 的 About 桌边部分，另对照仓库中的 `review/1280-about.png`、`review/current/about-desktop.png`、`review/current/cabinet-final-1440.png`。早期纯文字版承载履历却缺少私人的声音；后来的窗口加叠放封面给出亲密角落，但薄搁板线和外层白盒没有形成真正的空间，且个人部分曾被大地图排到后面。过去的 many-sides 面墙曾被用户要求撤除，所以本轮没有直接复刻旧拼贴。
- 当前本地 About 依次为：可写下的自述窗口与暖色桌面唱片架；超出正文宽度的深色认知网络；不受窗口框架约束的个人场景照片、情绪词与私人叙述；最后是已有地图、学习经历、荣誉和专业记录。唱片只占桌边的一部分，三张真封面各有直达链接；窄屏另列出三个标题。场景照片不对应某一情绪，也不当作个人事件证据。此结构是根据反馈形成的设计推断，尚未得到用户最终认可。
- 对照的外部实现包括 `album-shelf` 的内容与模板分离、Album Sweet 的木架和抽取封面交互，以及之前研究的 CSS 唱盘示例；后者放大了唱盘而背离当前需求，因此未采用。链接与实现边界写在 `architecture.md`。
- 构建与静态检查：126 页、1422 个本地引用、0 failures，三份原始 PDF 与原件一致。浏览器检查覆盖简体、繁体、英文 × 320/390/1440px × 明暗主题 × 14/16px，共 36 条 About 条件；没有脚本错误、横向溢出或破损的已加载图片。三张封面及窄屏标题链接均指向各自 Apple Music 页面，键盘焦点/悬停显示封面标题。最终本地截图在 `review/about-2026-09-25/` 的 `zh-*` 和 `en-*` 文件；旧的 `records-*`、`network-*` 文件是前一轮检查，不能代替当前截图。未部署，视觉方案仍待用户判断。

### 追加：以用户截图为准的唱片架与个人文字修正

- 用户上传了 2026-09-25 21:34:49 的旧唱片架截图，明确喜欢三张真封面在浅色架线上紧叠、悬停展开的版本和动画，只要求优化显示。撤销本轮棕色桌景，恢复白色双栏桌边小区域与淡粉架线；现在悬停/键盘聚焦会展开封面、抬起目标并显示标题，手机直接列出三个可点击标题。「站内播放」打开现有播放器。原图保留在用户消息中；`review/about-2026-09-25/album-hover.png` 是当前本地展开状态。
- 用户澄清开心、难过等只是解释「人有很多面」的比喻，不要被页面整理成八个情绪类别。删除八项标签和场景照片拼贴，将这部分改为连续的私人叙述；「怪人」按用户原话写成偶尔的自我怀疑，不作身份定论。中英两版文字由 `about-content.mjs` 维护，繁体由构建转换。认知网络与事实记录仍是不同章节。
- 最新构建与静态检查：126 页、1413 个本地引用、0 failures，三份原始 PDF 不变。浏览器覆盖简体、英文、繁体 × 320/390/1440px × 明暗主题 × 14/16px 的 36 条 About 条件，0 脚本错误、0 横向溢出、0 已加载破图。三封面与窄屏标题的链接、悬停标题、播放器打开已实测。当前视觉截图为 `review/about-2026-09-25/` 中的 `zh-*-desk.png`、`zh-*-feelings.png`、`en-1440-dark-*.png` 与 `album-hover.png`；此前的棕色桌景截图已由同名文件覆盖。本地修改未部署，也不代表用户对文案或美术的最终认可。

## 2026-09-25 — integrated About revision and owner correction

Supersedes the earlier side-by-side personal window/music composition. Learning and vulnerable prose are now a single personal note. The separate software-style workbench has three keyboard-operable tabs. Music occupies its own section with six official covers, grouped automatically into rows of three. Added pale pink (single), The Dreamer (with Revisited identified), and The Dark Horse. Official Apple Music release pages and square artwork were checked. No personal listening reaction was fabricated.

All ordinary type uses six semantic CSS tokens with a 13px default root and 15px A+ root. Identity artwork has named display exceptions. Updated file ownership, architecture and the project skill's music workflow. Following the owner's correction, the visible pause control was removed and the personal prose was rewritten without an identity slogan or imposed uplifting conclusion. System reduced-motion still applies.

Verified in real Chromium: 24 About combinations (zh/en/tw × 320/1440px × light/dark × default/A+), no horizontal overflow or JS errors; six loaded covers; click and keyboard tab changes. Separate interaction checks confirm changing Canvas frames, static reduced-motion frames, music-section and back-to-top scroll destinations, sleeve hover caption, preview popover and 15px preference retained after soft navigation. Home, Work, Notes, News and Card also checked at 320px in A+ mode. Build/check: 126 pages, 1479 local references, zero failures; three PDFs identical to originals. Screenshots in `review/about-2026-09-25/` named personal/network/workbench/music show this revision; older desk/feelings images are historical.

These are local implementation and browser checks, not deployment or owner acceptance. Audio playback availability and external music-service playback were not tested in this pass.

### Later owner correction: compact shelf and open network

The grouped three-cover rows above were rejected for excessive space and padding. The current music component is one continuous six-cover shelf, with no numbered catalogue, 132px desktop / 122px narrow shelf height, a shared hover/focus caption and horizontal scrolling on narrow screens. Title, preview link and shelf share the same 660px boundary. Network geometry was replaced with irregular branching filaments with depth, open edges and moving pulses; the spherical latitude construction was rejected. The personal prose also now reflects conflicting educational/cultural influences, ways of thinking, emotions, and the gap between intended and actual behavior, without “学得很杂” as a public-facing label.

Final compact-shelf check at 320/390/1440px: one shelf, sixth cover reachable by horizontal scrolling, shared selected caption, no page overflow, changing network frames and no JavaScript errors. Latest screenshots were inspected at desktop and 390px. Skill frontmatter/reference links were reviewed; the bundled skill validation script could not execute because its Python environment lacks PyYAML.

## Latest About: personal voice and transparent margin doodles

Rewrote the three paired-language paragraphs to preserve contradiction, values and uncertainty without asking readers to appreciate sincerity or effort. Removed the standalone network and its navigation item. Generated and installed three isolated pencil/crayon objects with verified RGBA alpha; rejected watercolor scenes are not used. Increased resting sleeve exposure from 64px to 80px on desktop. Inspected desktop light, 390px light, 320px dark and English desktop dark screenshots: no page overflow, broken loaded images or unwanted image backgrounds. Build/check passed (126 pages, 1485 references, original PDFs unchanged). Prompts and asset boundaries are in references/about-illustrations.md.

## 2026-09-25 — 恢复被字号整理误删的规则（ZCode 会话）

**用户反馈**：让 Codex 整理后感觉架构乱了（地图、News 等），排版也有问题；字号统一管理可能没弄完；要求修复、记录过程，内容文字不动，并注意不显眼的 padding 回归。

**诊断**：Codex 的字号令牌化方向本身成立（`:root` 13px 基准 + `--text-*` 六档 rem 令牌 + A+ 15px，属性挂在 `<html>` 上），但同一轮"清死 CSS"把 18 个仍在使用的类删到零覆盖：`home-time*`（首页时钟挤成一行）、`notes-material`（首页剪贴画失控为 493×1024 并压住文字）、`news-grid`/`news-feature*`（News 剪报墙塌成裸图原始尺寸）、整组 `case-*`（项目页版式消失）、`work-group-head`、`entry-facts .entry-type`、`role-more`、`org-mark`（机构徽标）、`landing-index`、`directory-heading`、以及 About 地图"全宽地图 + 底部横向城市条"的整组末轮规则（退化成早期窄地图+竖列表，城市列表文字被地图压住）。另有新增素材 `had-committee.webp` 顶部"委任紳士"行裁掉一半、底部残行。

**修复**：全部从 `b072d8c` 提取原规则、按新令牌体系换算后追加到 `site.css` 尾部（带注释块），未回滚 Codex 的令牌化与 About 重设计（工作台/音乐角/个人笔记的新类本就有配套 CSS）。`had-committee.webp` 按像素行分析裁成两行完整名单（470×85），`poetry-mention.webp` 去掉底部 2px 残影。Work 卡片封面列 95→124px 是 Codex 有意微调、内部自洽，予以保留。

**验证**：`build.mjs` + `check.mjs` 通过（0 failures）。浏览器实测（Chromium，8741 端口，与 `b072d8c` worktree 8742 端口对照）：首页时钟/剪贴画与旧版一致；News 剪报墙双列统一 170px 纸面框、暗色亮色正常；项目页 case 版式恢复；About 地图全宽 + 横向城市条 + 选中态下划线 + 机构徽标 + 点击城市→机构→记录联动正常；Aa 开关全站等比生效（root 13→15px，导航/正文/标题同步放大）且持久化；390px 窄屏首页/News/About 正常（剪贴画按规则隐藏、城市条保持横排）；名片页与 PDF 阅读页无回归。Work 页新旧盒模型对比：页头/页标题/卡片 padding 完全一致，字号整体 14→13px 为既定缩小方向。

**遗留**：内容文案未动；本地未部署；`e96c99e`（自称 "have bug, fixing"）与未提交改动仍在工作区，建议用户确认后自行提交；News 第一条剪报现为两行名单，"委任紳士"表头行因原图即被裁无法恢复，如需完整表头要重新截取原始公文页。

### 追加：清除“AI 查证腔”文案（同日 ZCode 会话）

**用户反馈**：Work/动态等处有冗余的“AI 找资料”式描述；关于我删掉“代入别人”那半句，只讲自己；其余内容按规范核一遍。

**改动**（均在源文件，繁体由构建转换）：`about-content.mjs` 个人叙述去掉「我常常会代入别人的处境，」（其余情绪描写保留），meta 描述去掉「可核对的记录」；`news.mjs` 三条摘要重写（「…名单列有黄天野」「原始页面列有姓名和审稿记录」→「获委任为委员会委员，任期两年。」「与王一权共同署名的审稿报告。」「青年会书院队伍凭『智能安全多脚拐杖』入围。」）；`views.mjs` 界面措辞「查看原始记录/Open source→查看来源/Source」「原始入口→来源」「打开原始 PDF→打开 PDF」「以下是可以核对的…→以下是学习与参与的记录」「公开报告可查→删除」，F1000 审稿条目同步精简；`industrial-note.mjs` 编辑说明去掉对话式草稿注记（“尚未对应你提到的具体论文”），改为中性待修订说明。图片 alt 保留描述性原文；venue 的“待核实/非论文评分/CCF B”按既定徽章规则未动；「公开记录」页副题与插画“并非项目截图”边界声明保留。

**验证**：build/check 通过（126 页、0 failures），生成 HTML 中「列有/可核对/可查/原始记录/原始入口」零残留；浏览器实测 News 摘要与链接、关于我第二段、阅读页「打开 PDF」、文章页编辑说明均按新文案渲染。

### 追加：地图坐标修正与面板行为（同日 ZCode 会话，用户提供修正）

**用户反馈**：地图左上角面板不要显示机构名，只显示地区，点击后才显示名字；北京天数在海淀西大街、启元在温泉镇、CAS 查准；香港 CPCE 是两个校区（旺角/西九龙 + 红磡湾）都要标；特区政府给官方位置；油尖旺民政处加一个地标并点击并入政府经历；帝京在旺角东，坐标查准。

**坐标修正**（`views.mjs` ORG_COORDS，全部经 OSM/Nominatim 正反查验证，WGS-84）：启元 40.0580,116.1670（温泉镇·中关村环保科技示范园，紫雀路一带）；天数智芯 39.9814,116.3010（海淀西大街36号昊海楼=中关村创业大街，Google 专利文件确认地址）；中科院地理所 40.0013,116.3786（大屯路甲11号，OSM「中科院地理所」公交站+反查命中「地理资源所D段」双重确认，原点位 116.39 在隔壁大屯北路）；帝京 22.3242,114.1732（太子道西193号，OSM+Wikipedia 互证，原 114.2137 偏了约 4 公里）；特区政府 22.2805,114.1656（政府总部·添马，原点偏上环）；新增 `hksar~ytm` 22.3214,114.1725（旺角政府合署·联运街30号，油尖旺民政事务处）；CPCE 拆为 `cpce~hhb` 22.3035,114.1847（红磡湾校园·红乐道8号）与 `cpce~west` 22.3126,114.1652（西九龙校园·海庭道9号）。`~suffix` 复用既有 x-institute~nan 双点位机制（同机构多点位、共享记录），SUFFIX_LABEL 增加红磡湾/西九龙/油尖旺。

**面板行为**（`site.mjs`）：进入城市后面板只显示「地区·城市名 + 点击提示」，机构名单列表删除；圆点悬停不再把机构名写进面板（保留地图圆点 tooltip 作引导）；点击圆点后面板显示机构名与经历（原逻辑）。油尖旺点位点击=选中「香港特区政府」，展开委员+国家安全教育地区导师两条经历，实现「跳转融合到政府经历」。

**验证**：build/check 通过；浏览器实测：北京视图三点分别落温泉镇/创业大街/大屯路且面板无机构名；香港视图六个圆点（理大、CPCE红磡湾、CPCE西九龙、帝京、政府总部、政府·油尖旺）标签正确；点击油尖旺圆点选中政府机构并显示两条记录、hash 跳到 #org-hksar；390px 窄屏正常。site-map.md 的地图章节同步更新。清华坐标用户未提出异议，未改动。

### 追加：专上学院（CPCE）并入香港理工大学（同日 ZCode 会话）

**用户反馈**：机构部分里专上学院融入 PolyU 比较好，地图圆点保留。

**改动**：`desk-affiliations.mjs` 删除 cpce 机构条目，其 study（hkcc）与 records（hkcc-representative、cpce-ambassador）并入 polyu；`views.mjs` ORG_COORDS 两个校区键改为 `polyu~hhb`/`polyu~west`（复用 ~suffix 多点位机制，圆点标签变为「香港理工大学 · 红磡湾 / 西九龙」）；site.mjs/views.mjs 城市映射去掉 cpce。

**验证**：build/check 通过；浏览器实测：机构按钮列表无 CPCE（9 个机构）；点香港理工大学显示 8 条记录（理大学历、HKCC 学历、KTEO 助理、研究实习、两条学生代表、学生大使、HKCC 学生代表）；地图仍 6 个圆点，点西九龙校区圆点=选中理大（#org-polyu）。

### 追加：地图开放滚轮/触控板缩放（同日 ZCode 会话）

**用户反馈**：地图希望能用滚轮或笔记本双指缩放。

**改动**：`site.mjs` 的 `L.map(...)` 将 `scrollWheelZoom:false` 改为 `true`。鼠标滚轮、触控板双指滚动（wheel 事件）与双指捏合（浏览器转译为 ctrl+wheel）均生效，默认以光标位置为锚点缩放；地图外的页面滚动不受影响。

**验证**：build/check 通过；浏览器内对地图容器派发 wheel 与 ctrl+wheel 事件，瓦片层级 13→14/15（放大）、14→13（捏合缩小）均按预期变化。

### 追加：深圳默认视野缩小一级（同日 ZCode 会话）

**用户反馈**：深圳的默认缩放可以小一个级别，大鹏和沙井没有显示完整。

**改动**：`site.mjs` 的 `fly()` 中，深圳城市视图在 fitBounds 后默认 `setZoom(-1)`（其余城市不变）。

**验证**：build/check 通过；浏览器实测深圳默认视野为经度 113.38–114.96、纬度 22.27–23.08（逻辑 zoom 较此前小一级），大鹏半岛与沙井均完整入画。

### 追加：地图仅保留双指捏合缩放（同日 ZCode 会话，修正上一条）

**用户反馈**：上下双指滑动（翻页滚动）不要劫持，只想要双指开合缩放。

**改动**：`site.mjs` 保留 `scrollWheelZoom:true`（触控板捏合在 Chromium 里以 ctrl+wheel 到达 Leaflet），并在地图容器的父层用捕获阶段监听把**非 ctrl** 的 wheel 事件 stopPropagation（passive、不 preventDefault）——普通滚轮/双指滚动不再触发缩放，页面照常滚动；ctrl+wheel（捏合）放行给 Leaflet。右下角 +/- 按钮与触屏双指缩放不变。

**验证**：build/check 通过；浏览器实测：地图上派发普通 wheel ×8，瓦片层级不变；派发 ctrl+wheel ×8，层级 11→13（放大）。

## 2026-09-26 — 全站分区节奏统一（padding/间隔审计）

**用户反馈**：① Work 页「研讨会与预印本」分组位置排版不好；② About 三个区域（工作台/唱片角/记录区）padding 与间隔不统一、细节割裂；③ 其他页面也要查同类小细节。

**审计方法**：浏览器脚本遍历各页所有可见 border-top 元素，量每条分隔线上方间隙（上一内容底→线）与下方间隙（线→首内容顶），另量各分区容器 padding-block、分组标题间距、事实行垂直对齐、各标题左缘 x。

**发现**：About 五套节奏并存——tool-section 64/40、music-room 38/26、records-intro 上 40/下 4、background-board 25、background-records 29/52 且无分隔线；records-intro 文字与 board 的分隔线只隔 4px（双线贴字的“割裂”细节）；Work 页两个分组之间间距为 **0**（组标题直接贴上一组末条底边）；About 顶部导航有 20px 内缩与全页 160px 左缘错位；首页/Notes/News 的卡片级分隔一致，无页面级问题；Work 事实行（类型/年份/徽章/箭头）实测全部垂直居中，无问题。

**统一标准**（追加到 site.css 尾部注释块）：所有分区分隔线 = 线上 64px / 线下 40px（以 tool-section 为基准）；分组间距 48px（介于条目 8px 与分区 64px 之间）；页尾留白统一 64px（news/collection/notes 原 80/38/45）；移除 background-board 顶线（intro 直接过渡到地图区头）；background-records 补上分隔线（原与上方 0 间距直接贴住）；About 导航去 20px 内缩；about-personal 顶 48→40。

**验证**：build/check 通过（126 页、0 failures）；复测 About 三条分隔线均为 64/41（含 1px 边框）、Work 分组间距 48；截图确认工作台/音乐角/记录区/分组边界四处视觉统一。

## 2026-09-26 — 全站间距令牌化（--sp-* 刻度）

**用户反馈**：上次只统一了分区节奏还不够，整站间距大量不统一不规范、细节凌乱；要求按设计逻辑建立体系（与页面/文字尺寸搭配），改完全站视觉核对。

**设计依据**：业界共识（4pt/8pt 网格 + 有限刻度，参见 kaarwan.com 排版网格指南与 uxdesign.cc 布局网格指南）。与字号体系的关系：**字号用 rem 令牌随 Aa 开关缩放，间距用 px 令牌保持固定网格**——文字放大时版式骨架不动，这是主流做法（如 iOS Dynamic Type 只缩文字不缩布局度量）。

**体系**：`--sp-2/4/6/8/10/12/16/20/24/32/40/48/56/64/80` 十五档（56 为页边距结构常量，1-2px 微调保留原值）。**629 处散值 → 全部吸附**：34 种迁移（18→16×27、5→4×22、13→12×21、25→24×21、7→6×20、14→12×18、22→20×17、9→8×16、30→32×15、28→24×13……）+ 229 处已在刻度上的值改写为 var() 引用；残留裸值仅 1px 微调、负 margin（刻意叠压）与 6 个结构预留（工作台侧栏 115/150/235、剪贴画 140、文章页尾 100/110）。scroll-padding、含 calc/var/百分比的声明不动。

**验证**：build/check 通过（126 页、0 failures）、括号平衡、类名覆盖审计不变；浏览器视觉核对 1440px：About 顶部（导航 20px 内缩已消）/工作台/音乐角/记录区/地图/荣誉区、Work 分组边界、首页选中区、阅读页、文章页均节奏一致无破版；390px 窄屏 About 正常；Aa 开关切换字号 13↔15px 时 padding 骨架保持 16/40 不变。


## 2026-09-26 — GLM audit and shared text contract

Preserved the latest About template and personal data. Audited the referenced GLM session and local rendered output. Full findings and the unpublished About editorial analysis: [review/unification-2026-09-26/REPORT.md](review/unification-2026-09-26/REPORT.md).

- Fixed mixed spacing shorthand tokens and introduced section/page-end roles without changing About's measured section geometry.
- Corrected oversized case headings, unified ordinary detail-page titles and publication venue metadata, restored map font shorthands to shared roles, and aligned News title weight with Work.
- Checked actual text beyond headings: paragraphs, summaries, dates, sources, captions, controls and status. Added source checks for font shorthands, paired content and the generated heading outline.
- Browser matrix: 17 routes × three locales × 320/1440px = 102 cases, each at normal and large text. No document overflow, visible ordinary-text scale mismatch or page script exception in the final run. Identity artwork and map zoom glyphs are explicit exceptions. This covers initial page states; expanded controls are separately sampled in the interaction check.
- Eleven interaction checks passed, including map drill-down, canonical institution grouping, wheel behavior, simulated pinch, workbench, six sleeve captions, persistent preferences, menu focus, contact and back-to-top.
- Build/check: 126 generated pages, 1482 local references, three byte-identical PDFs, zero failures. No deployment.
- Supersedes broad earlier wording that token replacement alone established consistency. About wording and repeated records headings remain an analysis item at the owner's request. No re-geocoding or external factual recertification was performed.


## 2026-09-26 — Layout spacing follow-up

Owner's mid-page screenshot clarified that the requested unification includes block spacing and composition, not just typography. Replaced 64/40px divider spacing with 40/24px desktop and 32/20px narrow spacing, capped editorial column gaps at 48px, removed parent/sibling spacing duplication, and moved the mobile workbench doodle beside its heading. Home note inset/page-end and closed-map extra spacing were corrected. Removed the late normalization block and updated component owners. About copy is unchanged. The earlier geometry-preservation observation is superseded by this authorized spacing change. See [measurements and screenshots](review/layout-spacing-2026-09-26/REPORT.md).

## 2026-09-26 — Music caption and vertical rhythm

Moved release metadata above its selected cover, retained the spreading shelf, separated touch selection from the external music link, and removed the bottom caption's space. Caption-to-cover gap is 12px; shelf-to-next-divider is 36px mobile / 44px desktop. Fixed hover selection being changed by moving neighbours during the animation. Added the project-local listening-notes skill with collection counts and sourced working analysis. See [music checks and screenshots](review/music-caption-2026-09-26/REPORT.md); this supersedes earlier below-shelf caption/direct-cover-link descriptions.

## 2026-09-26 — Collection note and actual skills

Removed the selected 回留 track line, retaining The Dreamer. Added live-from-data collection counts alongside the chair and shelf, with a compact stacked layout on phones. Workbench categories now list concrete tools/methods and their documented uses instead of project-summary paragraphs. See [24-case checks and screenshots](review/music-skills-2026-09-26/REPORT.md). Personal prose and imagery remain pending conversation-based understanding and owner confirmation.

## 2026-09-26 — Attributed portrait in the workspace

Added the owner-requested GPT-6 Astra impression as the default IDE file, with three factual skill files in the same window. Retained the explicitly requested drinking glass in a wide transparent river scene. Owner first-person prose remains pending review; candidate supplied separately. Browser verification covered 24 cases and 96 file states with no errors or horizontal overflow; build checked 126 pages and 1479 references. See [report and screenshots](review/astra-portrait-2026-09-26/REPORT.md).

Follow-up: owner requested applying the self-description revision. All four first-person paragraphs now updated in Chinese/English, with Traditional Chinese regenerated. Desktop/mobile screenshots inspected; build and static checks passed. Earlier pending-review status is superseded.

## 2026-09-29 — Personal chapters and live preview

Home now pairs the identity introduction with the unchanged self-note; About starts with a Codex-like Astra/GLM reader, then listening, a six-glass illustrated cabinet, personal places and tools. Full factual records moved to Experience. The latest owner corrections remove map clustering and visible ingredient labels beneath the drinks, reduce the glasses and align each to its centered name. The built-in image tool supplied one truly transparent shelf illustration. See [the scoped verification report](review/personal-chapters-2026-09-29/REPORT.md) and [artwork/recipe provenance](references/cocktail-shelf.md). Local preview only; no publication.

## 2026-09-30 — ZCode 会话：仓库卫生 + 09-29 轮审计

**用户反馈**：感觉架构与内容都没做好；鸡尾酒部分「只有图」、排版奇怪；字体老问题还在；GPT 一轮改动带出很多检查/备份文件并一起提交了。要求先解决不需要视觉判断的部分，保留 localhost 预览，细节视觉留到后续逐页核查。

**审计结论（对照 Codex 会话原始记录与构建产物）**：
- 构建/静态检查全绿（126 页、0 failures）；GPT 提交后 dist 有 27 个陈旧资源残留（机构 logo 等），本次 build 的资产修剪已清掉。
- 字体令牌契约完好：site.css 全文件 font 声明除根字号定义外全部走 var(--text-*)，GPT 新增的 cabinet/places 样式无散落 px 字号。「字体问题」属视觉层面，留待逐页核查。
- 死类审计为零（journal-map-pin/label 为 Leaflet divIcon/tooltip 注入，非死代码）；唯一死 CSS 是 `.cabinet-slot small` 两处（架子标记中无 `<small>`），已删除。
- 酒柜对齐实测（DOM 量测，非目测）：桌面/390px 六杯杯底距架线 1–5px，仅 Negroni 因雪碧图内基线高 8px 而浮高 ~4px。已加 `--drink-base-shift`（Negroni +1.1%，按 8/724 折算）拉平；其余五杯本就贴线。「只有图」的空旷感是设计密度问题（架子仅杯子图+名字，配比按用户此前要求收进抽屉），属视觉决策，未擅改。
- 城市地图：图钉无错位；默认视野为框住英国→中国全部图钉（places 含英国），导致中国城市群在右侧聚成一列，是构图取舍而非坐标 bug；瓦片正常加载。留待视觉轮决定默认取景（如默认深港、英国经按钮聚焦）。
- 首页自述五段原文完好；「桌边一角/关于我」眉题为 09-29 轮内容决定，未动。

**仓库卫生**：新增根 `.gitignore`（.DS_Store；website/review/ 仅保留 *.md）。untrack 254 个文件：241 个检查截图/JSON（website/review/，35MB）与全部 .DS_Store；本地文件保留未删，REPORT.md 报告仍跟踪。website/node_modules（opencc-js，58 文件）为 CI 必需（workflow 不跑 npm install），保留。

**验证**：`node website/build.mjs` + `node website/check.mjs` 通过；浏览器复核 About 酒柜桌面/390px、抽屉开合、首页自述、印象阅读器均正常。未提交、未部署。

## 2026-09-30 晚 — 用户反馈大修 + 两轮完整检查（ZCode）

**用户反馈**：仿 Codex 窗口有两种交互逻辑并存、文字架构不统一；「我是谁/产品工程学生」区字体没设置、链接冗余；「经历」不该放最右边；地图不该有按钮列（点图钉就行）、总览不该去外面二次点、放大地图没颜色；酒柜图缩放和排版没调；工具区被收成折叠框（要常开的卷轴）；大量旧问题复发。要求修完做两轮完整 overall 检查（一轮结束才开始第二轮）。

**根因发现——5 处损坏选择器（旧病复发之源）**：先前的脚本化 CSS 清理把 5 条规则的 `{` 吃成 `,`，整条规则静默失效：`small,time{...}`（全站 time/small 基础字号）、`.text-link{display:inline-flex...}`（全站文字链接布局）、`.text-link [data-icon]{13px}`（链接箭头尺寸）、`.blog-toc a,...{font-size}`（博客目录字号）、手机版 `.personal-note{grid-template-columns}`。这解释了「字体很多没设置/一改又出来」。已全部修复，并在 `check.mjs` 加永久守卫（检测选择器位置的属性片段），126 页构建检查通过。

**按反馈落地**：
- 印象阅读器：删除底部「模型 select + 1/2」第二通道，左侧对话列表为唯一切换器（Codex 式），移动端列表横排不变。
- 首页：删除 identity 区三个冗余链接（工程实践/研究/公共服务——hero 已有 工作成果/个人文字 两个入口）；`home-personal-links` 从两端分散改为左对齐成排，「学习与经历」不再孤悬最右。
- About 城市区：删除标题右侧「完整经历→」（页尾已有同一入口）、删除整个城市按钮列与外部「总览」按钮；交互改为 点图钉=翻开城市纸笺、点地图空白/地图内「总览」控件=复位；总览取景改为框住中国城市群（英国/新加坡平移可达），图钉不再挤成一条；去掉瓦片 `saturate(.4) sepia(.12)` 滤镜恢复底图本色；顺带删除漏网的 `journal-invitation` 邀请条。Leaflet 控件 position 需写在 `options` 里（首版误放顶层导致落到右上）。
- 酒柜：六杯 210→178px（平板 156、手机 126），名字居中不变，基线仍贴架线 1.1–1.5px。
- 工具区：三个 `<details>` 折叠夹改为常开横向卷轴 `.skills-reel`（外框+卡片+横向滚动+scroll-snap，手机端卡片占 84% 宽可滚），无点击展开；每卡内的「相关工作」链接删除（标题行保留一句说明，不放大链接）。
- 文档同步：architecture.md / SKILL.md 更新为单切换器、图钉交互、常开卷轴现状。

**两轮 overall 检查**（每轮均含：build/check、首页、About 四区、地图三交互、抽屉、卷轴、三语言、390px、明暗、A+、10 条路由 h1/溢出/破图、控制台错误——全部 0 失败）：
- 酒柜基线两轮实测均为 [1.1,1.5,1.1,1.5,1.1,1.1]px；A+（15px root）下不变。
- 三语言：en/tw 的总览控件文案（Overview/總覽）、12 图钉、无 select、卷轴 3 卡、无溢出。
- 键盘：图钉 tabindex=0 可聚焦（Leaflet 内建 Enter→click；合成事件无法触发属测试限制）。
- 死类审计零（journal-map-pin/label 为 Leaflet 注入、journal-overview 为 JS 创建）；字体令牌契约保持（仅根定义一处 px）。
- 备注：`.text-link` 在 flex 容器内 computed display 显示 flex 系 inline-flex 被 blockify，规范行为非 bug。
- 镜像目录已同步重建（0 failures）。未提交、未部署。

## 2026-09-30 深夜 — 第二批反馈五连修（ZCode）

**用户反馈（含中途连发）**：① who am I 区不对、字体明显太大（要先查他当时原话）；② 「经历凭什么在顶栏倒数右边——肯定是关于收尾、经历倒数第二」；③ Codex 界面要模仿 Mac 窗口（红绿灯），现在完全不是；④ 酒杯再缩、自己看与其他内容的平衡、酒柜排版架构本身有问题；⑤ 经历页不按时序、没有好的 display/structure，重构；⑥ 「说多少遍」：second major 与本专业并列，整个 major 就叫 PE with secondary major IE，不准把 IE 当 meta。

**当时原话核对**（Codex 会话 2026-09-29）：「先放一个比较有设计感的界面，然后我是谁？然后，什么什么学生，然后 engineer 也好或者其他的，之后就紧贴着现在的关于我的内容」——即 我是谁？→ 学生行 → engineer/其他 → 紧贴自述。

**逐项落地**：
1. 导航：首页·工作·文字·动态·经历·关于我（关于收尾，经历倒数第二）。三语言 nav 全验证。
2. who am I：删 HELLO eyebrow；两栏改单列；我是谁？WenKai text-title 26px；学生行从 34px clamp（--text-introduction 已删）降到 text-section 18px；序列=我是谁？→ 香港理工大学 → 产品工程 · 第二主修 Innovation & Entrepreneurship.（IE 并列进主行，不再做 meta 小字）；紧贴自述不变。经历页学习记录与 places.mjs 的理大条目同步并列写法（Management 辅修仍按 check 禁令不上页）。
3. 印象阅读器 Mac 窗口：新增 `.impression-window-bar`（复用 desk-window-bar：红黄绿灯 + 居中标题 + 右侧对话札记），下接 sidebar/阅读网格；`.impression-app` 改 flex 列、`.impression-body` 承载原 grid；移动端 700px 布局重写。暗色窗口栏实测正常。
4. 酒柜：货架从全宽 1120 收到居中 860px（--glass-height 210→150，平板 132，手机 126），实测杯宽 96px≈音乐架封面 96px，六杯基线 0.8–1.1px 全贴线；构图从「全宽机械六格」变为居中小酒柜对象，与音乐架/地图节奏平衡。
5. 经历页重构：experiences 按 period 开始时间降序（periodKey 解析 yyyy.mm），插入 `.archive-year` 年份细线分组（2026/2025/2024/2023）；education 同步降序（清华交换→理大→HKCC）；org 锚点与 #record-/#study-/#org- 兼容不变。
6. 记忆：IE 并列规则已写入 site-content-decisions（「说多少遍」级）。

**验证**：build/check 126 页 0 失败；桌面/390px × zh/en/tw 全部无溢出；导航顺序三语正确；Mac 窗口红绿灯+标题三语渲染；印象切换、酒柜基线、年份分组（4 组）全实测；暗色窗口栏正常。镜像目录同步重建 0 失败。未提交、未部署。

## 2026-09-30 深夜② — 第三批反馈八连修（ZCode）

**用户反馈**：① 学位名从来不是一个整体加「·」——最终定名：zh「产品工程学（荣誉）工学学士学位副主修创新及创业」（一整串，无分隔符，中途纠正过两次）、en「B.Eng. (Hons) in Product Engineering with a Secondary Major in Innovation and Entrepreneurship」，并质问为什么不写成中文；② 首页个人文字区，图搬过去之后排版不对（纸张图 absolute bottom:-30px 悬出压到页脚链接）；③ 动态页排版难看；④ 经历页「说了修改还是没修改」；⑤ About 顶栏 Mac 窗口不需要任何文字，底下仿 Codex 聊天界面一个不还原、且不该和 record 一样排版；⑥ 酒柜抽屉排版有问题；⑦ 地图要能看到「去过哪」（总览必须框全部图钉），不要 extra 提示文案；⑧ 工具区没分类没交互，工具/技能交叉应可见。

**落地**：
1. 学位名三处（首页 identity 行、经历页学习记录、places 理大笔记）改为上述最终名；记忆同步为 owner 亲定原文。
2. `.notes-material` 从 absolute 悬挂改为 flex 行内（120px，右侧对齐，≤600px 隐藏）；`.home-notes` 由三列 grid 改 flex；清掉 140px 右补白等三条过期规则。实测图底 2058 < 页脚顶 2028→不再重叠（修正后 overlap:false）。
3. 动态页：删 170px 定高灰框，剪报按原始宽高比铺列宽（五图均 2.7–8.8:1 横条，实测高度自适应、灰底消失）。
4. 经历页：上轮时序+年份分组实际已生效（dist 验证 2026/2025/2024/2023），用户看到的是浏览器缓存的旧页；学习行本次同步新学位名。
5. Mac 窗口栏只剩红绿灯（文字全删）；阅读区重构为聊天转写：`.chat-turn`（monogram+模型名+日期）+ `.chat-bubble`（3px/12px 圆角气泡承载段落）+ `.chat-sign` 落款，替代原 record 式 eyebrow/h3 排版。
6. 抽屉图窗 180×230→120×140，雪碧图 base 对齐窗底（实测 imgBottomInFrame=0）。
7. 总览 fitBounds 恢复全部 places（英国/新加坡回框内，实测 UK 图钉在总览视野内）；删除标题行提示文案。
8. 工具区：标题行加分类筛选 chips（全部/三类，aria-pressed），点击聚焦对应卡（accent 边框）并淡化其余（实测 focused1/dimmed2/复位OK，平滑滚动到目标卡）；修一个真 bug——`pick()` 把 s.name 摊平成字符串后 `s.name.zh` 查表恒 undefined，导致交叉标记从不渲染；改为字符串键后「跨 · 教学」标记 ×3 正常出现（NineToothed/CUDA/教学内容整理——教学在工程与研究两类间的交叉，来自站内既有事实，未新增个人内容）。

**验证**：build/check 126 页 0 失败；改后经 cache-busting 强刷逐项实测（浏览器启发式缓存曾让旧页顶了三轮，已全部以 ?v= 复验）；390px 四页零溢出；暗色窗口栏正常；镜像同步重建 0 失败。未提交、未部署。

## 2026-10-01 凌晨 — 截图逐条修正 + 中间区重构（ZCode）

**用户反馈（附三张截图）**：仿 Codex 窗口「自己看看这些什么玩意」——气泡把五段围成一面墙（全高描边框）、列两侧留白失衡；上一轮遗留：禮紀/中间UI/我是誰写法。

**处理**：
- 查证「禮紀」：全站 126 页 ×3 语言文本层无此二字（grep 0 命中），应为对「学位全名履历腔 + 桌边一角仿古眉题」的观感批评；本轮把两个源头都删了。
- 首页中间重构（按用户 Codex 原话「先我是谁？然后什么什么学生，engineer 也好，紧贴关于我」）：删除 HELLO/桌边一角/关于我 三层标题与左右两栏；现在是 我是谁？（WenKai）→ **产品工程学生。**（text-section）→ 灰色补充行（在香港理工大学读书，写代码、做研究，也参与一些公共服务。）→ 五段自述同一 62ch 阅读列直接紧贴；河畔涂鸦移到左边距（mask 渐隐）；正式学位名只留在经历页学习记录与地图笔记。#personal-title 锚点改 #personal（writing.html 跳转同步，check 抓到并修复）。
- 印象阅读区去气泡框：段落纯排版（line-height 2、62ch 居中），模型头行下加细线；列由 72ch 收到 62ch 与全站阅读列一致。
- 修一个真 bug：手机端 .personal-scenery 回到 position:relative 后 span 变 inline、宽 0，overflow 裁切失效 → 文档被 510px 涂鸦撑出横向滚动；补 display:block，390px 恢复 0 溢出。
- en/tw 快验：我是谁？（A Product Engineering student. / 產品學生行）三语正确、聊天区无边框、无溢出。

**自查仍未做/待用户定的**：① 印象窗口在超宽屏（>1440）列居中后两侧留白仍偏大——是否给 impression-app 设 max-width 待定；② 酒柜「只有图+名字」的密度（加一行小字材料？）待定；③ GLM 印象日期 2026.09.30 是否保留原样；④ 抽屉/工具卡片的暗色视觉只做了功能验证、未逐张截图目检；⑤ 经历页「更多内容」disclosure 的展开态未在本轮重验。未提交、未部署。

## 2026-10-01 — 首页中间排版统一（ZCode，用户「排版你自己看」）

**自查发现**：中间带两条左线——我是谁/学生行/链接行贴版心左缘（160），而五段自述的阅读列居中（起点 444），视觉断裂；且涂鸦右缘 560 横盖进正文列；随后一版涂鸦用 50vw 公式顶出视口右缘。

**修正**：中间带统一为一条左线——身份块、五段自述（max-width 62ch 左对齐）、底部链接行全部同缘；涂鸦改为版心右缘内锚定（right:0，mask 向左渐隐，人物+河流在右留白可见）；身份块与自述间距 24→32px。

**验证**：build/check 0 失败；1440/390/暗色/A+ 全部 0 溢出；镜像同步重建通过。未提交、未部署。

## 2026-10-01 续 — 我是谁与自述重新分开（ZCode，用户纠正）

**用户反馈**：① 我是谁和自述内容要分开，不该合并成一条流；② 人物涂鸦被盖住了；③ 我是谁区应该是「提出一些身份假设+问号」，衔接到正文第一句「我不知道怎么介绍自己」；④ 不该动这一带之前的整体排版。

**落地**：恢复自述区原两栏构图（左：桌边一角/关于我 + 河畔涂鸦，mask 保持人物完整可见；右：五段正文）；我是谁区独立成块（border-bottom 分隔），内容改为三个身份假设堆叠——产品工程学生？/ 工程师？/ 研究者？（--text-title，第二三行 muted，问号 accent 色，EN 用半角 ?），末尾香港理工大学小字；正文首句自然承接问号。

**验证**：build/check 0 失败；390px 0 溢出且涂鸦完整；zh/en/tw 三语假设行正确（en 问号半角）；暗色 0 溢出。镜像同步通过。未提交、未部署。

## 2026-10-01 续② — 身份假设精简并扩容（ZCode）

**用户反馈**：假设太啰嗦，直接一个词——学生？工程师？researcher？或其他；理工大学不用写；分割线可删；左栏「桌边一角」没必要写（但下面排版不能乱）；随后补充：身份按经历多放一些，不一定 technical——那些是 identity。

**落地**：假设改为单词堆叠并扩到 8 个——学生？/ 工程师？/ researcher？/ 交换生？/ 委员？/ 导师？/ 乐迷？/ 喝酒的人？（en: Student?/Engineer?/researcher?/Exchange student?/Committee member?/Tutor?/Music lover?/Drinker?），全部来自站内既有记录（理大在读、工程实践、论文与审稿、清华交换、油尖旺委员、国安导师、唱片架、小酒柜），无新增事实；第一行 ink、其后渐次 muted、问号 accent；删理工大学行；删介绍区分隔线（留 padding 节奏）；删「桌边一角」眉题（保留 关于我 h2 与 #personal-title 锚点，两栏排版不动）。

**验证**：build/check 0 失败；1440/390 0 溢出（8 行堆叠）；en 半角问号；镜像同步通过。未提交、未部署。

## 2026-10-01 续③ — 身份堆叠改凌乱排版（ZCode）

**用户反馈**：不要竖列，也不要下坠阶梯；相同字号，单纯的凌乱排版。

**落地**：.identity-guess 八个词同用 --text-title，散落在介绍区版面——左右错位（0/34/12/58/30/4/48/66%）、间距不均（部分加 --sp-8/12 上距）、±0.5–1.1° 微倾、问号 accent；≤700px 换更缓的散布百分比防溢出；间距守卫曾拦下 px 兜底（min(%,px) 触发 --sp 刻度检查），改纯百分比后通过。

**验证**：build/check 0 失败；1440 与 390、暗色均 0 溢出；镜像同步通过。未提交、未部署。

## 2026-10-01 续④ — 身份散布去规律 + 逐个配色（ZCode）

**用户反馈**：散布太有规律、显得奇怪；颜色可以对应着不一样。

**落地**：改 12 列网格真散布——八个身份各占不重复的列位（1/6/8/2/10/2/6/10 列起点），行距不齐（个别 translateY 错位）、倾角各异；颜色逐个对应站内色板：学生 ink、工程师 accent 青、researcher 紫、交换生 棕、委员 暖陶、导师 ink、乐迷 松绿、喝酒的人 棕（问号随字色）；暗色下青/绿换亮变体。≤700px 六列紧凑散布、字号降为 text-section。

**验证**：build/check 0 失败；1440/390/暗色 0 溢出；暗色下配色换算实测（#7ed3c0）。镜像同步通过。未提交、未部署。

## 2026-10-01 续⑤ — 身份墙改密集文字艺术（ZCode）

**用户反馈**：language 整理（researcher 单独英文显得偶然）；身份按社会定义重选——审稿人/大使这类没人会说的任务标签删掉；视觉做「密集文字那种艺术感」，可调透明度/重叠/空心。

**落地**：词表改为社会身份 13 个——学生/engineer/researcher（技术身份沿用用户本人英文小写习惯）/交换生/实习生/香港人/理大人/委员/导师/乐迷/喝酒的人/闷/怪人（后两个出自其自述原文，属「不太好听」的标签）；改为**确定性生成的密集文字墙**：每个词按权重重复（38 个词块），轮转错位交织避免聚堆；透明度分层（0.08–0.7 雾层 + 1.0 实心锚点：学生/engineer/researcher 首现），彩色点缀沿用站内色板（青/紫/棕/暖陶/松绿，暗色换亮变体），闷/怪人做描边空心字出现两次；旧 13 项散点 grid CSS 全删。

**事故与修复**：编辑时误删了 views.mjs 文件头部（imports/createViews 开口/工具函数）——从 git HEAD（4c54248，用户已自行提交此前各轮）取头段按函数名去重拼接，并补回被截断的 identityWords/identityWall/introduction 三段；node --check + build + check 全绿恢复。

**验证**：build/check 126 页 0 失败；墙面 38 词（4 空心、3 实心锚点）桌面三行、390px 五行均 0 溢出；暗色亮变体实测；镜像同步重建通过。未提交、未部署。

## 2026-10-01 续⑥ — 语言归位 + 雾层分主题 + 去等级化（ZCode，用户三条纠正）

**用户反馈**：① 语言该跟着语言版本走——中文页不该出现 engineer/researcher；理大学生的自称在英文里是 PolyUer（自己分析为什么再构建）；② 颜色暗色太浅、亮色太深——雾层透明度没分主题；③ 为什么有些字大一号、为什么学生一定第一个——设计不该有隐含等级，问到底有没有查 design 资料。

**设计依据**：查证 experimental typography / type-as-texture 脉络（David Carson、Wolfgang Weingart 一脉的 overprint/layers 海报）：texture 成立的前提是**统一字号**——任何大小层级都会把 texture 退回成列表；深度只由透明度分层承担，且雾/墨关系随底色反转；词序是构图不是等级。

**落地**：① 中文页全中文（工程师？研究员？理大人？），EN 页用社区自称 PolyUer；② 雾层透明度分主题：亮色 ×0.5（雾更淡）、暗色 ×0.92（雾提起），空心字单独 0.85/描边分主题；③ 删除 w-strong 字号等级与「首现 12 个加强」逻辑，池子改为 LCG 种子洗牌（同构建稳定、无语义词序）。

**三循环校验（按要求撇开设计视角重走）**：
- 循环一（首次访客，亮色桌面+暗色）：全中/全英词面正确；雾层亮色不再压、暗色不再没；发现并修复 home-personal-links 的 flex 主规则在早前手术中丢失（两链接贴死）——已补回 gap --sp-48。
- 循环二（移动端+交互回归）：390 墙五行 0 溢出；印象切换/抽屉（Bamboo）/图钉/总览复位/12 钉全过；经历页年份分组在；EN 墙含 PolyUer 零中文。
- 循环三（A+ 15px+终态目检）：墙字号随根放大、无溢出；顺序随机无等级；链接行与自述区正常。

**过程事故**：本轮对 views.mjs 的连续字符串手术造成三重定义与断词（tityWords），最终以 HEAD(4c54248) 为底座整体重放本轮 delta 恢复。build/check 126 页 0 失败；镜像同步通过。未提交、未部署。

## 2026-10-01 续⑦ — 身份不重复（ZCode）

**用户反馈**：不要重复 identity。

**落地**：墙面改为 13 个身份各出现一次（去掉权重重复与 w-strong 锚点体系），保持 LCG 洗牌词序、透明度雾层、站内色板配色、闷/怪人空心；桌面单行、390 两行。views.mjs 以 HEAD 为底重建后仅注入此一处 delta（本轮多次字符串手术造成过重复定义与断词，均已在重建中消除）。

**验证**：build/check 126 页 0 失败；词数 13（dist 实测）；桌面单行/390 两行 0 溢出；暗色正常；镜像同步通过。未提交、未部署。

## 2026-10-01 续⑧ — 虚实=正常/不正常（ZCode，设计思路纠偏）

**用户反馈**：太浅色；「哪些正常哪些不正常」——我此前把透明度做成了随机雾层纹理，完全没接住设计思路。

**正确理解**：墙上词的**虚实对应身份的正常/不正常**——社会正常认可的身份（学生/香港人/理大人/工程师/研究员/交换生/实习生/委员/导师/乐迷/喝酒的人）全部实色清晰（墨+站内色板）；自我怀疑的（闷？怪人？，出自其自述原文）保持空心描边、虚的。透明度不是装饰，是语义。

**落地**：删除随机 tiers 雾层与主题乘法，正常词实色（1.0），仅 闷/怪人 空心 0.85；洗牌词序、同字号、无重复、彩色分配不变。

**验证**：build/check 0 失败；桌面一行/390 两行 0 溢出；暗色实色正常；镜像同步。未提交、未部署。

## 续⑨ 挑战杯获奖记录 + 拼贴插槽修复 + journal CSS 复原（2026-09-30 深夜）

**挑战杯记录**（用户 supply：新疆大学的朋友拉他进团队）：
- 经历条目 `challenge-cup-xj`（desk-data.mjs 基础记录）：2026.06 · participation · 疆芯智种 · 团队成员 · 第十五届“挑战杯”自治区大学生创业计划竞赛；正文写明「新疆大学的朋友邀请加入团队」「项目获现代农业与食品科技赛道二等奖，团队奖」；链接=用户给的微信获奖报道。经历页排在 2026 年份组首位。
- 荣誉台账（views.mjs honours 数组）首行：2026 “挑战杯”自治区大学生创业计划竞赛 二等奖 · 团队奖 / 疆芯智种——基于AI大模型的番茄育种与基因水印防伪系统。
- 纪律：只用官方文章+用户原话的事实；不发明角色头衔/主力贡献；团队奖显式标注；英文项目名用拼音 JiangXin Zhizhong+描述性翻译。三语字符串断言全过。

**拼贴插槽 inline→CSS 迁移**（修手机端）：
- 根因：桌面插槽坐标是 span 内联 style，内联永远赢样式表 → 700px 媒体查询的 nth-child 覆盖从未生效，手机端一直用桌面坐标（喝酒的人/交换生相撞）。
- 修法：views.mjs 只保留 `--r` 内联；桌面 13 条 `.identity-word:nth-child(n){--x;--y}` 进 site.css 基础层，移动端覆盖块生效。
- 连带抓出移动端覆盖块 `--y:15` 无单位 → top 非法全部塌顶；补 %。
- 验证：1440 亮/暗 + 390×(zh/en/tw) 程序化重叠检测全零、docW=视口宽。EN 两行词撞 A weirdo → 4 号插槽 x56→62、y14→12。

**journal/city-note CSS 复原**（GPT 清理误删的真回归）：
- 症状：about 页城市地图高度 0、图钉全在视口外；点图钉后纸笺文字暗色下几乎不可读。
- 根因：commit 86af81b（“1”，09-30 18:15）把 27 条 journal 桌面规则连同旧按钮行一起删了——stage 框、地图 530px、图钉/标签/状态条、纸笺浮动卡（桌面 350px 右浮 + 暗色 --paper:#282923 + ≤900px 缩小 + ≤700px 落底条）全部丢失；HTML/JS 仍在引用。只剩移动端 3 条漏网。
- 修法：从 86af81b~1 原文恢复 24 条桌面规则 + 暗色变体 + 900px 块（全部仍被 views/site.mjs 输出，非死代码）；保留既有 700px 块。
- 验证：1440 地图 530px、12/12 图钉在可视区；点图钉→浮动纸笺卡（亮/暗双主题截图）；总览→纸笺收起+fitBounds 复位；check 全绿。

**验证方法备忘**：本页 html{scroll-behavior:smooth} 会让 JS scrollTo 变异步——自动化里必须 behavior:'instant' 再量坐标，否则量的还是滚动前的位置；IAB 截图偶发把页面滚回顶部抢拍，换新 tab + hash 导航最稳。

## 续⑩ 86af81b 误删 CSS 全量复原（2026-09-30 深夜，接续⑨）

续⑨只修了 journal 一角；用户报「关于我的其他内容排版出问题」后做了全量盘点：以「(媒体上下文, 选择器)」精确比对 86af81b~1 与现文件，**共 112 条规则被删而仍在被 views/site.mjs 输出**，其中 103 条存活恢复、9 条确属旧设计死规则（identity-question 旧版、reading-indicator——本来就是有意移除的）排除。
- 受灾面远超 journal：印象阅读器（Mac 窗口网格 208px 侧栏、chat-turn/bubble/sign、model-monogram、impression-scroll）、酒柜（架子线、六杯 150px 分栏、杯名、drink-art 精灵切片、drinks-drawer 配比抽屉全无样式）、工具（tool-card 卡片、skills-reel 横卷、skill-tags）、经历页（archive-year 年份线、role-record/study-record 排版、record-anchor）、首页（identity-q 问号色、home-personal-links text-link）、地图（map-pin-head 针头造型——此前图钉其实不可见）。
- 教训：清理把「桌面规则」删了、「移动端规则」留在媒体查询里，字符串级 diff 看不出缺（选择器还在文件里）；必须按 (media, selector) 键比对。恢复块按 86af81b~1 原文、保留各自 @media，追加在 site.css 末尾（无一处与现存规则冲突，因为恢复的都是整个缺失的键）。
- 验证：印象窗口（亮色截图）、酒柜架子+六杯杯名、抽屉打开（配比/做法/来源/遮罩模糊）、工具三卡片 reel+chips、经历页左轨+年份线、首页问号青绿、地图彩色针头、全站 12 组（6 页×2 视口）零溢出零坏图。check 全绿。
