# Personal website review — 20 September 2026

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
