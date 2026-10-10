# 本地生图用的提示

这些图都不是已经生成的网站素材。没有白底大头照在仓库里，不要把生成的人脸当成本人照片放上去。港口夜景继续用 Unsplash / pourya gohari，换图的话不要写成「我拍的」。

## 白底大头照

仓库里没有这张。如果用你自己的照片，导出成 `website/assets/face-portrait.jpg`，正方形或 4:5，脸在上半，背景用和页面一样的暖纸色 `#f3efe6`，不要纯白，也不要再修成证件照蓝底。

若本地模型要先出一张占位，不要用真人姓名，也不要放进页面：

```
Editorial head-and-shoulders portrait of a young East Asian man, early twenties, short black hair, calm expression, looking slightly off camera. Plain warm-paper background #f3efe6, soft daylight, no studio flash, no suit, no logo, no text. Photograph, not illustration. Square crop.
```

占位图不能当正式头像。等你的原图到了再放。

## 港口，如果夜景那张太黑

现在页面只裁掉了黑天空，图还是夜景。若要换一张更亮的，生成后标成插画或另找可署名的照片，不要冒充 Unsplash 那张。

```
Victoria Harbour, Hong Kong, late afternoon, the skyline and the water filling the frame, little empty sky. Warm haze, not a black night, not a postcard sunset. No people in the foreground, no text, no watermark. Horizontal photograph, 3:2.
```

## 工作页的小图

现有封面是淡色线稿，单列之后会小很多。若要重画，一套六个，同一支笔，透明底，不要画成论文配图或项目截图：

```
A small editorial line drawing on a transparent background, warm brown ink #6b5344, a few uneven strokes, lots of empty space. Subject: [heat waves over a coast | nested circles | a folded letter | an open notebook | a small grid of tiles | two speech bubbles]. No text, no photorealism, no color fill.
```

## 不要生成的

新闻页那些截图是公开记录的裁切，不要重画成假文件。关于页的河、人和流星已经定过，不要再出一整张水彩房间。
