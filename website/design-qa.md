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
