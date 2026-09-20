import {works as originalWorks,experiences as originalExperiences} from '../material-demo/dist/desk-data.mjs';
const L=(zh,en)=>({zh,en});
// This layer edits website copy without changing the historical design demos.
// Appointment/contribution detail follows the supplied master CV and fact register.
const experienceCopy={
 'academic-reviewing':{body:L(['2026 年参与 ICLR FM4Science workshop 审稿；2025 年参与 ICML AI4Math workshop 及 F1000Research 审稿。'],['Reviewed for ICLR FM4Science in 2026 and ICML AI4Math and F1000Research in 2025.'])},
 qiyuan:{role:L('联合培养实习生','Joint-training intern'),body:L([
  '在启元实验室智能计算系统中心与天数智芯的联合培养实习中，参与 NineToothed 工具开发与 DSL 移植，支持在天数智芯加速器上使用相关 kernel 与 operator。',
  '制作 NineToothed 网页学习游戏，并整理 CUDA、推理、Triton 与 NineToothed 的教学演示和适配材料，用于拟议的本科教学合作。',
  '也参与开源合作研究与生态发展建议，并在兰州大学介绍 NineToothed。教学演示与拟议合作分别记录，不写成已经交付的完整课程。'
 ],[
  'Joint-training work at Qiyuan’s Intelligent Computing Systems Center and Iluvatar CoreX includes NineToothed tooling and DSL porting for kernels and operators on Iluvatar accelerators.',
  'Built a NineToothed web learning game and prepared teaching demonstrations and adapted materials on CUDA, inference, Triton, and NineToothed for proposed undergraduate collaborations.',
  'Also researched open-source partnerships, contributed ecosystem-growth recommendations, and presented NineToothed at Lanzhou University. Demonstrations and proposed collaborations are recorded separately from a delivered course.'
 ]),links:[['兰州大学宣讲记录 / Presentation record','https://www.infinitensor.com/news/52']]},
 shi:{role:L('研究实习生','Research intern'),body:L([
  '在清华大学生命科学学院 SHI Lab 与北京生物结构前沿研究中心参与研究实习。参与 StrucTrace 的初稿文字和图稿，并在投稿至接收过程中修改文字与插图。',
  '研究之外，制作发往 Science/AAAS 订阅者的响应式 HTML 邮件与 FRCBS 活动视觉，并测试 2025 肽设计竞赛网站的数据库、排行榜与内容功能。'
 ],[
  'Research internship at The SHI Lab, School of Life Sciences, Tsinghua University, and FRCBS. Contributed to initial StrucTrace text and figures and revised the manuscript and illustrations through submission and acceptance.',
  'Also built responsive HTML emails distributed to Science/AAAS subscribers, created FRCBS programme visuals, and tested database, leaderboard, and content functions for the 2025 Peptide Design Competition website.'
 ])},
 cas:{role:L('研究学生 · 热浪风险','Research student · Heatwave risks'),body:L(['在中科院地理科学与资源研究所参与级联热浪风险研究。参与研究设计与正式分析，整理数据、制作可视化，并支持论文写作。'],['Contributed to cascading heatwave risk research at IGSNRR, CAS: study design and formal analysis, data curation, visualisations, and manuscript preparation.'])},
 kteo:{body:L(['香港理工大学知识转移及创业处的临时兼职学生助理任职记录。'],['Temporary part-time student assistant appointment at PolyU’s Knowledge Transfer and Entrepreneurship Office.'])},
 hotel:{body:L(['在帝京酒店会计与 IT 部门实习。制作 Python 与 pandas 工具，将获授权的数据库记录整理为会计与营运所需的 Excel 报表。','维护服务器机房与办公 IT 系统，提供日常技术支持，并参与外部业务发展相关的软件开发会议。'],['Accounting and IT internship at Royal Plaza Hotel. Built Python and pandas tools to transform authorised database records into Excel reports for accounting and operations.','Maintained server-room and office IT systems, provided day-to-day technical support, and joined software-development meetings for external business-development initiatives.'])},
 'x-social':{body:L(['参与教育与技能获取平台、长者智能手机学习与 AI 数字人陪伴相关的社会创新项目。参与用户访谈、演示开发与测试、原型和路演。','相关创新挑战赛最佳创意奖按团队项目奖记录，完整奖项信息列于荣誉与奖学金。'],['Participated in social innovation projects covering education and skills access, smartphone learning for older adults, and AI digital-human companionship, including user interviews, demo development and testing, prototyping, and pitches.','The related Best Innovation Award is recorded as a team project award. Full award information appears under honours and scholarships.'])},
};
export const experiences=originalExperiences.map(e=>({...e,...experienceCopy[e.id]}));
const workCopy={
 heatwave:{body:L(['在中科院地理科学与资源研究所参与的研究，讨论热浪风险在不同系统间的级联传递。','参与研究设计、正式分析、数据整理、图稿与论文写作。站内阅读提供 arXiv v2 预印本；期刊 DOI 与预印本入口分别保留。'],['Research at IGSNRR, CAS, on cascading heatwave risks across systems.','Contributed to study design, formal analysis, data curation, figures, and manuscript writing. The reader provides the arXiv v2 preprint; the journal DOI and preprint are linked separately.'])},
 structrace:{authors:'Xu Wang, Chi Wang, Tin-Yeh Huang, Yiquan Wang, Siyuan Jiang, Yafei Yuan',body:L(['StrucTrace 利用 Fourier watermark 追踪生物分子结构。','在 SHI Lab 参与初稿文字与图稿，以及投稿至接收阶段的修改。所提供的 CV 记载论文已获接收；下方链接提供代码与工具，站内尚未收录出版社最终全文。'],['StrucTrace uses a Fourier watermark for traceable biomolecular structures.','At SHI Lab, contributed to initial text and figures and revisions through submission and acceptance. The supplied CV records acceptance; code and tooling are linked below. The publisher’s final text is not included here.'])},
 olympic:{body:L(['以 STGCN-LSTM 进行奥运奖牌预测的研究记录，收录预印本与 New In ML 海报入口。','会议记录对应 ICML 的 New In ML Affinity Event，不能视为 ICML 主会论文。'],['Research on Olympic medal prediction with STGCN-LSTM, with the preprint and New In ML poster record.','The event record belongs to the New In ML Affinity Event at ICML, rather than a main-conference paper.'])},
 ninetoothed:{body:experienceCopy.qiyuan.body,links:[...originalWorks.find(w=>w.id==='ninetoothed').links,...experienceCopy.qiyuan.links]},
};
export const works=originalWorks.map(w=>{
 const merged={...w,...workCopy[w.id]};
 const clean=p=>p.replaceAll('下方阅读器打开的是新版预印本','下方 PDF 链接打开新版预印本').replaceAll('站内阅读提供','PDF 链接提供').replaceAll('The reader shows the later preprint.','The PDF link opens the later preprint.').replaceAll('The reader provides','The PDF link provides');
 return {...merged,body:{zh:merged.body.zh.map(clean),en:merged.body.en.map(clean)}};
});
