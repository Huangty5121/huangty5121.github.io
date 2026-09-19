# 个人网站：这一版的分层与内容安排

本地预览：http://127.0.0.1:8772/desk.html#home

这是独立于原 `home.html` 的结构 demo，不是正式发布稿。现有材质、字体文件和图片沿用；原页面与原参数不被覆盖。

## 分的是阅读层次，不是你的几种身份

| 层次 | 放什么 | 点击后发生什么 |
| --- | --- | --- |
| 首页 / 桌上 | 姓名、几件选出的内容、音乐、短笔记 | 单件可以直接打开，也可以打开它所属的一份目录；不把完整经历列在首页 |
| 内容集合 | 论文和项目、经历、笔记、图集 | 按阅读方式组织；目录可搜索，经历可筛选，笔记露出一小段，图片按图集看 |
| 单件内容 | 一篇论文、一段经历、一篇笔记、一张图片 | 先读具体内容，再找有关的经历、工作、版本和来源 |
| 附件阅读 | 原始 PDF | 从具体论文打开；退出后回到该论文，不另建重复的成果条目 |

音乐是跨页面保留的页内播放器，不开弹窗、不自动播放。曲名、歌手和音源由 `dist/desk-config.mjs` 修改，访客没有上传或编辑入口。当前是陈奕迅《尘大师》的 Apple 官方约 30 秒试听，不是完整歌曲。点击后才请求远程音频；刷新后恢复暂停。

2026-09-12 调整：左上角先给姓名、在读背景和简短介绍；没有以生成图冒充个人照片。材质图下移到延伸的桌面。读书与经历页先显示在读学习背景，再分别标明交换和未取得学位的过往学习，随后展示实习、研究与其他参与。

同日继续调整：教育后增加“目前的参与”，显示 CV 所列持续／现任角色摘要。组织视图替换原先默认的“一起看”：十二个组织入口，悬停／聚焦显示名字，选中后在页内展开该组织对应的学习及经历。手机直接显示名字，点按展开。另可选择全部经历、研究、实习与工作、服务与代表、项目参与；标签允许交叉，不复制记录。会员及证书独立收起，不冒充任职。

现任摘要按 2026-09-12 检查的 CV 任期配置，包括联合培养实习、政府委员会及地区导师、学生代表、X-Scholar 项目参与；没有统称为雇员或公务员。任期和正式名称仍待本人最终确认，不能把 CV 的日期当成独立核实任命的证据。

## 内容多起来时

- 新论文、新经历、新笔记进入对应的数据集合，沿用已有页面。目录数字随数据更新，首页不无限增加物件。
- 首页的摆放是人工选择的稳定构图，不随机撒满整个屏幕；桌面、平板、手机分别有排布。
- 一段经历可以包含研究、传播设计和社会参与，不因跨领域而拆成几个身份。
- 同一篇论文的 DOI、预印本、会议记录和作者回应，留在同一条目里。主入口直接显示，其余放进“其他版本与来源”。
- 关系必须是具体的，例如“在这段经历里参与这篇论文”。不能因为两张图片颜色相近就画关系线。
- 目前首页各物件彼此独立，因此没有把它们用线串起来。未来项目细节中的图和草图，若确有对应特征，再加入有准确端点的注释线。
- 内容类型不是永久分类法。以后有足够的实际设计作品，可以从现有项目里形成一个设计图集；不用现在先造一个空的设计子站。

## 这版每一部分需要的图

| 位置 | 已使用 | 正式版需要什么 |
| --- | --- | --- |
| 首页主图 / 图集 | 原演示生成的折面、金属、织物、草图 | 可以保留为网站材质练习；如替换成个人摄影，需本人选图。不能把生成图说成真实研究或作品 |
| 论文入口及详情 | 三份真实预印本的首页缩略图 | 另外几篇取得可用全文后再渲染；不生成假论文封面 |
| 读书与经历 | 学校／机构真实标志；两款生成徽章；日期、角色和相关工作 | 其余标志的徽章质感和真正多视角模型后续处理；列表维持同时呈现多条 |
| 笔记 | 原有纸张 / 描图纸表面；正文独立阅读 | 不要求每篇有配图；能解释内容的图片才加入 |
| 音乐 | 已生成的播放器机壳，独立可交互文字和播放按钮 | 更现代的机壳、实际斜视角模型后续定；目前是平面资产加轻量透视 |

这轮使用生成的 MP3 机壳、SMART 和 X-Institute 徽章。原始标志、简单抠图和来源记录见 `PIN-ASSETS.md`。没有引入 Three.js 或持续运行的物理模拟：现在用稳定排布、轻量透视和接触阴影验证关系，不能视作真实建模。

## 配置和摆放

- `dist/desk-config.mjs`：修改音乐的 `title`、`artist`、`src`、`sourceUrl`；`preview` 表示是否试听。修改 `desk.intro` 的双语介绍，以及首页笔记、近况、徽章选择。
- 这是公开的网站配置，不是私密后台，不能放密钥或不公开的个人记录。更换本地音源可以写 `audio/my-track.mp3`，并自行提供允许使用的文件。
- `dist/desk-background.mjs`：学习背景。`dist/desk-data.mjs`：完整经历、论文和笔记集合。增加条目不会自动在首页堆出新的物件。
- `dist/desk-affiliations.mjs`：组织与经历的多对多关系、分类标签、目前参与的记录 ID。现任摘要和分类列表读取 `desk-data.mjs` 中同一条记录。启元实验室与天数智芯共同指向同一段实习；同一个组织也能关联多段经历。
- 桌上最多挑四枚徽章。当前放两枚完成初步生成的徽章，其余内页使用真实标志；不伪装成全部已经制作完毕。
- 窄屏重排同一组对象，桌面向下延长；没有固定在底部的音乐 bar，也没有一屏一条的经历转盘。
- 手机的内容顺序为介绍、播放器、徽章、论文、短笔记，再到延伸桌面上的长笔记、材质图和近况。

## 文字与公开边界

目前收录 8 个工作条目、16 段经历／参与记录、12 个组织入口、2 篇网站/设计讨论整理稿、4 张生成材质图、3 份公开预印本。新加的政府、校园与审稿记录依据所提供 CV 的第 3 页。经历尚未作为最终事实档案独立核验全部角色与日期。论文出版状态及版本区别显示在各自条目内。

个人语气可以先写一版，但不替你补出“当时很激动”“这是我的第一次研究”或不存在的对话。两篇笔记明确标记为整理稿，等待本人确认。正式内容不必每篇都有前因后果；只放原文件、几句记录也成立。

读取聊天是为了理解设计选择，不等于公开授权。私聊、情绪记录、联系方式没有打包进这个 demo。层级深不代表私密，隐藏入口也不是权限控制。

正式上线前仍需：确认个人文字、补核 CV 事实、检查论文再分发许可、决定音乐来源、补齐需要的附件。此 demo 只在本机预览，没有公开部署。

## 当前实现

入口：`dist/desk.html`。页面与交互：`dist/desk.mjs`、`dist/desk-objects.mjs`。样式：`dist/desk.css` 和 `dist/desk-objects.css`。双语内容与关联：`dist/desk-data.mjs`。PDF 及真实首页：`dist/desk-assets/`。

新设置写入独立的 `ty-desk-v1`；首次读取原 `ty-material-demo-v1`，找不到才读取 `ty-home-v1`。材质面板可以重新读取原参数。短标题采用原有干笔画纹理，不加入整段模糊；长正文保持清晰。

## 建议先观察的一条路径

首页 → 经历 → 中科院地理科学与资源研究所 → 热浪风险研究 → 在这里读论文 → 浏览器返回。

这条路径检查的是：你能否知道自己在哪里、内容之间为什么有关、读完怎么回去。之后再判断首页选哪些物件，或某个内页是否需要更明显的个人风格。

## 本地检查

`node material-demo/validate-desk.mjs` 检查条目、路由、版本附件、关联与基本边界。

`node material-demo/desk-browser-check.mjs` 使用独立测试浏览器检查交互和响应式页面。浏览器路径是当前机器的配置，不是正式站点依赖。

详细记录见 `design-qa.md` 与 `desk-objects-review/browser-results.json`。原 `desk-review/` 保留为改动前的对照。

组织、悬停、触屏、现任摘要与交叉分类另由 `node material-demo/desk-organisations-check.mjs` 检查，结果在 `desk-organisations-review/results.json`。
# Current refinement — 2026-09-14

The experience collection now has a page-level reading index (study, current participation, places/records, memberships/certification), which becomes ordinary non-sticky text navigation at narrow widths. Record category filters sit above records, not in a second sidebar. Current studies remain open; other study entries use a disclosure. Organisation context appears immediately after the selected grid row and repositions on resize. Membership and certification have separate structured records with no fabricated proof links.

Home uses one generated thin paper folder beside the existing pins, sharing the same experience link. `desk.experienceFolder` controls this optional bitmap. It does not grow with the number of records. See `DESIGN-REVIEW-2026-09-14.md` for screenshots, judgments and unfinished content, and `FOLDER-PROMPT.md` for asset provenance. This refinement supersedes older descriptions of the default organisation panel location and fully expanded education list below.
