# 个人网站 · 轻材质演示

本地演示，2026-09-10。保留此前设计图纸不变；此次不是完整个人网站上线。

## 观察方式

打开 http://127.0.0.1:8772/ 。需要重启时，在此目录运行 `python3 -m http.server 8772 --bind 127.0.0.1 --directory dist`。

- 底部「纯净 / 轻微 / 明显一点」比较预设，默认轻微。
- 「关闭效果对照」临时移除网页层的手写字形、墨迹滤镜、颗粒和物件阴影；照片和草图本来就有的纹理不会消失。再次点击恢复参数。
- 右上「调整材质」可分开调节字形、笔画不规则程度、表面颗粒、阴影；试写一句话，直接观察中英文真实文字。
- 笔记底材可比较纸张、描图纸、磨砂金属。雾度仅对描图纸后方生效，不模糊文字。金属是二维视觉实验，不是物理材质模拟。
- 底部明暗、中英文和字号切换；内容物件打开阅读弹层，关闭或 Esc 返回。
- 参数仅存浏览器本机。正文和调节控件不做墨迹滤镜。没有登录、远端存储、真实联系信息或公开部署。

## 技术判断

这一级别不需要 Three.js 或专门的 JS 渲染库：

1. 字形：中文霞鹜文楷、英文 Caveat，作为本地 Web Font。不是对默认字体加噪点冒充手写。
2. 墨迹：SVG `feTurbulence` + `feDisplacementMap` 做非常小的边缘扰动，另用 alpha 变化模拟不均匀落墨。只作用于短标题和笔记，不作用于正文。
3. 表面：可复用的静态噪声小图叠加，纸张颜色和接触阴影独立；不持续跑帧动画。
4. 描图纸：半透明底色与 CSS `backdrop-filter`，雾度不作用于前景文字。
5. 金属：固定二维明暗、细纹和浅浮雕文字；不随观察角度或真实光源改变。这是视觉近似。
6. 关联：图片与其对应草图之间的 SVG 标注，根据物件实际布局计算；窄屏改为就近文字说明。无无关物件的连线。

Rough.js 能生成手绘风格的 SVG/Canvas 线条，可在以后需要更复杂手绘图形时加入。本 demo 未安装 Rough.js，也没有运行 WebGL。

原生网页文字仍可复制和编辑；没有使用整张设计图当页面。图片上的铅笔线是生成素材，不是可编辑工程图。

## 素材与字体

- `assets/fold.jpg`：根据已选图单独生成的铝片照片。
- `assets/sketch.jpg`：同物体的生成草图。阴影比最初设想略重；是示例，不代表实测资料。
- `assets/metal.jpg`：复用既有 `design-directions/03-field-cabinet/material-metal.png`。
- `assets/grain.svg`：原生 SVG 程序噪声，仅作非具象的表面效果。
- 霞鹜文楷来自官方仓库，Caveat 来自 Google Fonts；许可证随 `dist/assets/OFL-*.txt` 保留。
- 字体转换为 WOFF2，界面用字先加载小型子集；试写子集外的字时再按字形回退加载完整 BMP 中文字体。扩展区生僻字允许回退到系统字体。原 TTF 保留在 `source-assets/`，不随页面加载。
- 原始生成 PNG 保留，网页使用 JPEG 派生版本减少传输。

## 验证边界

交付时执行脚本语法、静态资源引用、纯参数校验及本地 HTTP 检查。运行 `node validate.mjs` 可复验静态和纯参数检查。未执行浏览器运行时/视觉自动化、真实 Safari/iOS、触屏或滤镜性能测量；本地可打开不代表跨浏览器视觉一致。请直接用此演示判断质感。浏览器不支持 SVG 滤镜或 backdrop-filter 时，仍能阅读原文字与图片。

若浏览器支持实验性的 `document.modelContext`，会注册一个仅切换本机视觉预设的工具。它不是核心依赖；当前环境没有该 API 的实际验证证据。

## 文档依据

- SVG 位移：[MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feDisplacementMap)
- SVG 噪声：[MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feTurbulence)
- 手绘线条库：[Rough.js](https://roughjs.com/)
- 中文手写字：[霞鹜文楷](https://github.com/lxgw/LxgwWenKai)
- 英文手写字：[Caveat](https://fonts.google.com/specimen/Caveat)
