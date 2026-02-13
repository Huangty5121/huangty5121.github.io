---
title: "从零搭建 RAG 系统：踩坑与思考"
description: "用 LangChain + Pinecone 搭建检索增强生成系统的实战记录，包括 embedding 选型、chunk 策略和 prompt 工程。"
pubDate: 2024-02-20
channel: "frequency"
tags: ["ai", "rag", "langchain", "python"]
---

# 从零搭建 RAG 系统

最近在做一个基于 RAG（Retrieval-Augmented Generation）的知识库问答系统。这篇文章记录了从选型到部署的全过程。

## 为什么选 RAG

纯 LLM 的幻觉问题在企业场景下是不可接受的。RAG 通过检索真实文档来 ground LLM 的回答，是目前最实用的方案。

## 技术栈

- **Embedding**: OpenAI `text-embedding-3-small`
- **Vector DB**: Pinecone
- **Orchestration**: LangChain
- **LLM**: GPT-4o-mini

```python
from langchain.chains import RetrievalQA
from langchain_openai import ChatOpenAI

qa_chain = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(model="gpt-4o-mini"),
    retriever=vectorstore.as_retriever(search_kwargs={"k": 5}),
)
```

## Chunk 策略的坑

最开始用固定 500 token 切分，效果很差。后来改成 recursive character splitter + overlap，效果好了很多。

> 数据质量 > 模型能力 > Prompt 技巧

