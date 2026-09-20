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
