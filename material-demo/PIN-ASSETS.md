# 徽章与播放器素材记录

本机结构 demo，2026-09-12。两款徽章已初步生成，其他内页使用原始标志裁切。原文件保留在 `pin-sources/`；没有重新绘制 logo，也没有把上级机构标志说成实验室独有标志。

| 条目 | 取得标志的位置 | 当前呈现 |
| --- | --- | --- |
| SMART | https://smart.org.cn/assets/cn/images/logo.png | 仅符号作为生成参考；蓝绿珐琅徽章 |
| X-Institute | https://www.x-institute.edu.cn/logo-blue.png | 仅符号作为生成参考；蓝色徽章，初步去除生成器烘焙的棋盘格 |
| PolySmart | https://polysmartgroup.github.io/assets/img/polysmart_group_2.jpg | 原始图形裁切，去白底，暂未生成金属款 |
| 清华 / SHI / FRCBS | https://www.frcbs.tsinghua.edu.cn/static/home/images/LOGO-1.svg | 使用该官方联名标识中的清华校徽，不冒充 SHI Lab 独有标志 |
| CAS / 地理所 | https://www.cas.cn/images/z19_logo.png | 中科院院徽裁切；原图分辨率较低，不是地理所独有徽标 |
| Royal Plaza | https://www.royalplaza.com.hk/wp-content/uploads/royal-plaza-logo-horizontal-bw.svg | 原始 R 字形，去掉附属文字；转换为深色单色便于浅色底阅读 |
| 天数智芯 / 联培经历 | https://www.iluvatar.com/_nuxt/icons/icon_512x512.1247e4.png | 原始图形裁切，不声称找到启元实验室的独立标志 |
| PolyU / KTEO | https://en.wikipedia.org/wiki/File:Hong_Kong_Polytechnic_University_logo.svg | Wikimedia 的校徽复本；与 PolySmart 官方实验室页面照片上的标志交叉核对。理大主站本次请求超时；不声称从主站下载成功 |

生成原稿位于本机 `.codex/generated_images/01a065be-f8ee-71e2-8254-1e581048f537/`：

- `exec-96dd62b5-fb14-4a69-a194-7430afc6d275.png`：SMART，真透明。
- `exec-7527bd54-acc9-4b5e-a937-ecd90a44da03.png`：X，原图有烘焙棋盘格；本机只做背景清理，保留金属轮廓。
- `exec-c679203d-b5d4-4000-a289-33e6dbf5c680.png`：播放器壳体，真透明。当前为已有较旧壳体，不是已完成的新式多视角机型。

网页使用 `dist/desk-assets/pins/` 的小尺寸文件。`prepare-pin-assets.mjs` 记录处理步骤，原稿不覆盖；X 的细小抠图毛边和金属反射不作为本轮完稿目标。

后续建模重点：图形边界、实际厚度、落地面与接触阴影。光泽次之。首页需要斜视角，列表需要正面；当前 CSS 透视不是可自由观察的三维几何，也没有实时碰撞系统。

## 音乐

通过 Apple iTunes Search 返回的公开试听链接获取《塵大師》元数据；原始试听不打包下载，只在访客按播放后加载。

- 曲目页：https://music.apple.com/hk/album/塵大師/1675204502?i=1675204703
- 曲名与歌手由用户选定，不推断私人收听历史。
- 实测试听长度约 29.98 秒；不是完整歌曲。连接与试听可用性依赖外部提供方。
- 播放/暂停图标来自本机 Lucide 1.8.0，许可副本在 `dist/vendor/LUCIDE-LICENSE`。

这是来源记录，不是对正式公开使用中所有品牌、音频或论文权限的确认。
