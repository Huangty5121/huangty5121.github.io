# 全站排版·表达统一计划（合并两轮调研）

调研证据三路：①渲染实测（11 路由 × 1440/390/320 × 亮暗主题）②site.css 912 行全文审计 + views/build 文案层盘点 ③design-qa.md 历史挖掘。结论分四层：

## A. 布局/定位（上轮已确认 + 本轮补充）
- P0-1 About 印象阅读器手机版：≤700 堆叠规则（site.css:619-623）被 809 基础 + 909 max-900 反杀 → 180px 双列、GLM-5.3 会话项叠压正文
- P0-2 经历页手机版：≤700 单列（631）被 882/883 反杀 → sticky 侧栏占半屏、正文列 ~157px；study-record 内部 72px 年份列（74/89）雪上加霜
- P0-3 首页自述手机版：.personal-note 网格全宽度保持 1fr 1.6fr（492），L655 `personal-prose` 少个点、手机重置从未生效 → 390px 下正文列 ~200px 且被 62ch 帽住
- P1 hero 名字号永不生效（55 vs 388 特异性；82 min-1440 与 241 min-1441 互斥）；landing 移动媒体栈死代码（408 重写杀 84-111）；固定音乐钮压首屏署名与短页 footer；news 图 height:auto(759, 特异性更高) 压过 object-fit(760) → 双列标题错位
- P2 断点 13 种、联系卡三代共存、死 z-index、15 处间距违规、88/90/100/173/176 等 magic offsets 无 --header-height 令牌

## B. 字型系统（本轮新）
- 行高 9 值并存（1.55–2.1）；同一「卡片摘要」角色三种节奏（1.55/1.7/1.75）
- 同角色字号漂移：记录标题 h3 三种（study=body / role=subheading / ledger=small 未文档化）；同一 w.summary 在 reader-lede=small vs publication-copy=body；栏目描述五组件三种字号；.role-record header p 的 meta 声明已被 246 行顶成死规则
- 段落节奏：全局 p+p=16 vs 博客 margin-bottom:20 vs 日志 12 vs listening-note 4px 覆盖
- 字距 7 种无令牌；.eyebrow .09em 与 .reader-aside-label .08em 双轨；WenKai 标题两套矛盾处理（journal/home 继承 DM Sans 负字距、blog 显式 +.02em）；hero 手机 .26em CJK 字距过散（观感项）
- 行长：62ch 对 CJK 失真（≈34 字）vs 博客 735px（≈56 字）；730/735 两个近似值并存
- 图文：缩略图对齐两派（home center vs 列表 start）+ 间距三套（32/20/16）；music 字幕指针 var(--caption-pointer,48px) 永远指向 48px；酒柜架子线 mobile 16px vs desktop 18px 漂移
- 对比度：身份墙暗色 w-purple #77678e / w-brown #936456 在 #191c1e 上 <3:1（accent/moss/hollow 有暗色值，这三色漏配）；hero-latin 56% alpha 偏弱

## C. 文案表达（本轮新；frozen 内容不动）
- 日期：区间主流「2025 — 2027」vs 「2025–26」en dash 4 处；月份主流 2026.06 vs news「2025 · 03」；en 页三种格式混排
- 箭头语义：内部链接违规用↗ 3 处（试听《叶子》/ 我自己写的那一段 / 我的自述）；返回键两派（项目页 →返回工作 vs 论文页 ←返回工作成果）
- 分隔符：·与 / 职责不分——同为「类型+年份」三种写法
- zh 引号：「」为主但 “挑战杯” 与 「疆芯智种」同行混用；同一活动名 “AI助力一小帮一老”（views.mjs:39）vs 「AI 助力一小帮一老」（views.mjs:87）两种拼写、AI 无空格
- 命名：苦艾马天尼是 6 杯中唯一译名（4:1…5:1）；NineToothed 在经历页相关链接=「NineToothed 与教学 demo」、卡片/h1=NineToothed
- 眉标：01/EDUCATION 等 5 处纯英文未走 t()；动态/经历/关于我 眉标与导航同名（工作成果/个人文字却不同名，3:2 分裂）；音乐角落 en 两名（A little music vs Listening corner）、小酒柜 en 两名、架上收藏 aria 不一致
- 结构：collection 计数 07/02 硬编码、三组空 <p></p>、work-social.html 404、?filter=papers 死参数、honours 内联 views.mjs 不受 check.mjs 配对检查保护

## D. 根因（历史挖掘，防复发设计依据）
①批量编辑删活 CSS 已 5 次，仍无 (media,selector) 机械守卫 ②边界双 owner→尾部补丁反模式 ③绿 check 盲区：零溢出测不出挤压、首屏测不出中段 ④样式注入旁路：inline style 压媒体查询、JS 注入 CSS 不过 contract ⑤三语×浏览器缓存放大「说了怎么没改」循环

---

## 执行批次（0→6，每批独立可验证）

**批次 0｜基线与武器**：写 site.css 解析脚本，按 (media, selector, property) 建索引，输出 ①617-656 移动块被 734-912 反杀的完整受害者清单 ②死规则/死属性清单；review/typography-2026-10/ 存当前基线截图；design-qa.md 开续篇。

**批次 1｜手机端 P0**：909、882/883 改 range query（先例=896 酒柜行）；personal-note ≤700 折单列 + L655 补点；study-record 手机年份列复查；按脚本清单一次修完其余反杀项。恢复块原文一字不删。验证：390/320 内容列宽度量化 + 截图对照。

**批次 2｜渲染 bug 与死代码（近零观感）**：news 图高矛盾按多数实践统一；entry-summary 600px 矛盾取 small；死规则清理（342/343/352/336-337/725 撤销层/241/89 死 meta/63+98 死 h2 选择器/123 重复动画）；dock 让位（署名/短页 footer 不再被压）；试听基线对齐；music 假指针删除或落实；card 链接行箭头贴标签；身份墙暗色补三色值（附截图）。

**批次 3｜排版系统统一（同角色拉齐，小步+截图）**：行高两级制（UI 1.8 / WenKai 2.0）收敛离群值；论文摘要统一 body/1.9；栏目描述统一 small+30em；ledger h3 文档化裁决；段落节奏归一到 p+p:16；字距 eyebrow 系统一 .09em、WenKai 标题 +.02em；730/735 合一、62ch→px；缩略图对齐统一 start + 间距归 --sp 档；架子线 16/18 归一。

**批次 4｜文案表达统一（views/build 层）**：日期区间统一 em dash、月份统一 YYYY.MM；事实对 meta 一律 ·、/ 保留给 slug 类眉标；内部目标一律 → 或无箭头、返回键统一 ←返回工作成果；zh 引号统一「」+ AI 空格 + 单一活动名拼写；en 标签一对一（三处双名各定其一）；5 处英文眉标 t() 化；NineToothed 单一公开名；苦艾马天尼改 Absinthe Martini（默认，可反转）；About h1 默认 zh/tw=黄天野、en=Tin-Yeh Huang（可反转）；计数动态化、空 <p>、work-social stub、死参数清理、honours 迁数据文件+check 覆盖。

**批次 5｜设计意图恢复（每项前后截图，确认后保留）**：hero 名字号特异性修复 + 1440/1441 合并（不满意可钉回 26px）；landing 死媒体栈验尸清理；header 毛玻璃去留；hero 手机 .26em 字距复核。

**批次 6｜防回归守卫**：check.mjs 新增五条——(media,selector) 顺序冲突 lint、生成 HTML inline 布局样式禁令（--r 白名单）、括号配平、JS 注入 CSS 过同一 font/--sp contract、zh 页拉丁词白名单；architecture.md 补断点分工表；design-qa.md 记录全部前后证据。

## 验证矩阵（每批通用）
build+check 零失败；1440/390/320 × 亮暗截图；关键页全查 + 手机端内容列宽量化（≥280px）；zh/en/tw 抽查；A+ 一次查 line-wrap；IAB 截图 quirks 按 design-qa 备忘执行。

## 明确不动
frozen 文案与数据（自述/两份印象/专辑/地点/酒偏好/press）；地图默认取景、酒柜密度、GLM 日期、>1440 impression 留白（owner 已挂起的决策）；恢复块原文；个人散文一字不改。

## 风险与回滚
批次 1 动媒体查询顺序：脚本逐条判定+三视口对照；批次 3/4 触面大：小步粒度=单条规则/单组字符串，按 (media,selector) 键精确回滚；全程不 push，完成后交验收。