---
title: "Docker 入门到放弃再到真香"
description: "容器化部署的学习曲线和实战经验，从本地开发到 CI/CD 流水线。"
pubDate: 2024-01-25
channel: "frequency"
tags: ["devops", "docker", "deployment"]
---

# Docker 入门到放弃再到真香

第一次接触 Docker 是在大二的课程项目里。当时觉得"我本地跑得好好的，为什么要用容器？"

## 转折点

直到有一天，队友说"你的代码在我电脑上跑不起来"。

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

这几行代码解决了所有环境问题。

## 真正的价值

Docker 的价值不在于容器本身，而在于它带来的可复现性。同一个镜像，在开发、测试、生产环境的行为完全一致。

> It works on my machine → It works on every machine.

