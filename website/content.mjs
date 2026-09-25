import {works as originalWorks,experiences as originalExperiences} from '../material-demo/dist/desk-data.mjs';
const L=(zh,en)=>({zh,en});
// This layer edits website copy without changing the historical design demos.
// Appointment/contribution detail follows the supplied master CV and fact register.
const experienceCopy={
 'academic-reviewing':{body:L(['2026 年参与 ICLR FM4Science workshop 审稿；2025 年参与 ICML AI4Math workshop 及 F1000Research 审稿。'],['Reviewed for ICLR FM4Science in 2026 and ICML AI4Math and F1000Research in 2025.'])},
 qiyuan:{role:L('联合培养实习生','Joint-training intern'),body:L([
  '在启元实验室智能计算系统中心与天数智芯的联合培养实习中，参与 NineToothed 工具开发与 DSL 移植，支持在天数智芯加速器上使用相关 kernel 与 operator。',
  '制作 NineToothed 网页学习游戏，并整理 CUDA、推理、Triton 与 NineToothed 的教学演示和适配材料，用于拟议的本科教学合作。',
  '也参与开源合作研究与生态发展建议，并在兰州大学介绍 NineToothed。'
 ],[
  'Joint-training work at Qiyuan’s Intelligent Computing Systems Center and Iluvatar CoreX includes NineToothed tooling and DSL porting for kernels and operators on Iluvatar accelerators.',
  'Built a NineToothed web learning game and prepared teaching demonstrations and adapted materials on CUDA, inference, Triton, and NineToothed for proposed undergraduate collaborations.',
  'Also researched open-source partnerships, contributed ecosystem-growth recommendations, and presented NineToothed at Lanzhou University.'
 ]),links:[['兰州大学宣讲记录 / Presentation record','https://www.infinitensor.com/news/52']]},
 shi:{role:L('研究实习生','Research intern'),body:L([
  '在清华大学生命科学学院 SHI Lab 与北京生物结构前沿研究中心参与研究实习。参与 StrucTrace 的初稿文字和图稿，并在投稿至接收过程中修改文字与插图。',
  '研究之外，制作发往 Science/AAAS 订阅者的响应式 HTML 邮件与 FRCBS 活动视觉，并测试 2025 肽设计竞赛网站的数据库、排行榜与内容功能。'
 ],[
  'Research internship at The SHI Lab, School of Life Sciences, Tsinghua University, and FRCBS. Contributed to initial StrucTrace text and figures and revised the manuscript and illustrations through submission and acceptance.',
  'Also built responsive HTML emails distributed to Science/AAAS subscribers, created FRCBS programme visuals, and tested database, leaderboard, and content functions for the 2025 Peptide Design Competition website.'
 ])},
 cas:{role:L('研究学生 · 热浪风险','Research student · Heatwave risks'),body:L(['在中科院地理科学与资源研究所参与级联热浪风险研究。参与研究设计与正式分析，整理数据、制作可视化，并支持论文写作。'],['Contributed to cascading heatwave risk research at IGSNRR, CAS: study design and formal analysis, data curation, visualisations, and manuscript preparation.'])},
 kteo:{body:L(['曾任香港理工大学知识转移及创业处兼职学生助理。'],['Worked as a part-time student assistant at PolyU’s Knowledge Transfer and Entrepreneurship Office.'])},
 hotel:{body:L(['在帝京酒店会计与 IT 部门实习。制作 Python 与 pandas 工具，将获授权的数据库记录整理为会计与营运所需的 Excel 报表。','维护服务器机房与办公 IT 系统，提供日常技术支持，并参与外部业务发展相关的软件开发会议。'],['Accounting and IT internship at Royal Plaza Hotel. Built Python and pandas tools to transform authorised database records into Excel reports for accounting and operations.','Maintained server-room and office IT systems, provided day-to-day technical support, and joined software-development meetings for external business-development initiatives.'])},
 'x-social':{body:L(['参与教育与技能获取平台、长者智能手机学习与 AI 数字人陪伴相关的社会创新项目，负责过用户访谈、演示开发与测试、原型和路演。'],['Worked on social innovation projects covering education and skills access, smartphone learning for older adults, and AI digital-human companionship, with user interviews, demo development and testing, prototypes, and pitches.'])},
 'gov-committee':{body:L(['担任油尖旺地区青年发展及公民教育委员会委员，也参与旗下的社区体育委员会和推广「一国两制」委员会。'],['Serves on the Yau Tsim Mong District Youth Development and Civic Education Committee and its Community Sports Committee and Committee on the Promotion of “One Country, Two Systems”.']),links:[['民政事务总署委员名单 / HAD membership list','https://www.had.gov.hk/chs/public_services/youth_participation_initiative/dydce_committee_district.htm?district=ytm']]},
 'gov-tutor':{body:L(['担任国家安全教育地区导师，任期为 2026 至 2027 年。'],['Serves as a National Security Education District Tutor for the 2026–2027 term.'])},
};
export const experiences=originalExperiences.map(e=>({...e,...experienceCopy[e.id]}));
const workCopy={
 heatwave:{body:L(['研究热浪风险如何通过生态和社会系统形成连锁健康影响。','参与研究设计、正式分析、数据整理、可视化和论文写作。'],['The study examines how heatwave risks cascade through ecological and social systems into health impacts.','Contributed to study design, formal analysis, data curation, visualisation, and manuscript writing.'])},
 structrace:{authors:'Xu Wang, Chi Wang, Tin-Yeh Huang, Yiquan Wang, Siyuan Jiang, Yafei Yuan',version:L('已接收 · 2026','Accepted · 2026'),body:L(['StrucTrace 利用傅里叶水印追踪生物分子结构的来源。','在 SHI Lab 参与初稿文字和图稿，并在投稿至接收期间修改论文与插图。'],['StrucTrace uses Fourier watermarking to trace biomolecular structures.','At SHI Lab, contributed to initial text and figures and revised the manuscript and illustrations through acceptance.'])},
 crypto:{body:L(['研究 RNA 折叠复杂度能否用于构造密码学原语。','AI4NA 研讨会稿和后来的 arXiv v2 预印本属于同一项研究。'],['Explores whether RNA folding complexity can support a cryptographic primitive.','The AI4NA workshop paper and later arXiv v2 preprint are versions of the same study.'])},
 olympic:{body:L(['使用时空图网络与 LSTM 建模奥运奖牌预测。','相关海报发表于 ICML 2025 的 New In ML Affinity Event。'],['Uses a spatiotemporal graph network and LSTM for Olympic medal prediction.','A related poster appeared at the New In ML Affinity Event at ICML 2025.'])},
 glm7:{body:L(['针对 GLM7 研究的方法和解释提出评论，并刊有原作者回应。'],['A correspondence discussing the methods and interpretation of the GLM7 study, followed by an author response.'])},
 disease:{version:L('期刊短文 · 2025','Journal letter · 2025'),body:L(['讨论 AI 疾病预测研究的性能评估与临床应用边界。'],['A letter on performance evaluation and clinical limits of AI disease prediction studies.'])},
 oio:{version:L('会议论文 · 2025','Conference paper · 2025'),body:L(['提出用于蛋白质适应度景观搜索的分层优化框架。'],['Proposes a hierarchical optimisation framework for searching protein fitness landscapes.'])},
 ninetoothed:{version:L('工程实践 · 2026','Engineering work · 2026'),body:experienceCopy.qiyuan.body,links:[...originalWorks.find(w=>w.id==='ninetoothed').links,...experienceCopy.qiyuan.links]},
};
export const works=originalWorks.map(w=>({...w,...workCopy[w.id]}));
