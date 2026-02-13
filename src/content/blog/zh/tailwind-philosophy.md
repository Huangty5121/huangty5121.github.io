---
title: "Tailwind CSS 的哲学：为什么我不再写 CSS"
description: "从抵触到真香，聊聊原子化 CSS 如何改变了我的前端工作流。"
pubDate: 2024-03-05
channel: "frequency"
tags: ["frontend", "css", "tailwind", "design"]
---

# Tailwind CSS 的哲学

两年前我还是 CSS Modules 的忠实拥趸，觉得 Tailwind 就是在 HTML 里写内联样式。直到我真正用了一个月。

## 转变的契机

在一个需要快速迭代的项目里，我发现自己花了 40% 的时间在命名 CSS class 上。`.card-wrapper-inner-content-title` 这种命名让我开始怀疑人生。

## 原子化的本质

Tailwind 不是内联样式。它是一套设计约束系统。

```html
<!-- 这不是内联样式，这是设计 token -->
<div class="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/5 p-6">
```

当你用 `rounded-2xl` 而不是 `border-radius: 16px` 时，你在使用一个全局一致的设计决策。

> 约束即自由。

