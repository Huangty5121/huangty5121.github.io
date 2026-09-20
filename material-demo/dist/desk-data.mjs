// Public CV/source facts and explicitly provisional website copy only.
// Private conversations are not a content source for this shipped demo.
export const L = (zh, en) => ({zh, en});
export const works = [
  {id:'heatwave', title:L('热浪风险研究','Cascading heatwave risks'), year:'2026', kind:'paper', context:'Physics and Chemistry of the Earth',
    fullTitle:'AI Driven Discovery of Bio Ecological Mediation in Cascading Heatwave Risks',
    authors:'Yiquan Wang, Tin-Yeh Huang, Qingyun Gao, Yuhan Chang, Jialin Zhang',
    summary:L('参与研究设计、分析、数据整理、图稿和论文写作。','Contributed to study design, analysis, data, figures, and writing.'),
    body:L(['这项研究是我在中科院地理科学与资源研究所参与的工作，讨论热浪风险怎样在不同系统之间传递。','这里先把论文和参与内容放上来。具体怎么开始、过程中的取舍，还需要另写。'],['This work grew out of my time at the Institute of Geographic Sciences and Natural Resources Research, CAS. It examines cascading heatwave risks.','The paper and contribution record are available here. A personal account of the process has not been written yet.']),
    version:L('arXiv v2 · 2026.02.11 · 预印本，非期刊最终版','arXiv v2 · 11 Feb 2026 · Preprint, not the journal version'),
    pdf:'heatwave-heda-arxiv-v2.pdf', thumb:'heatwave-heda-arxiv-v2.jpg', pages:13, experience:'cas',
    links:[['DOI / 期刊','https://doi.org/10.1016/j.pce.2026.104560'],['arXiv','https://arxiv.org/abs/2509.25112']]},
  {id:'structrace',title:L('StrucTrace','StrucTrace'),year:'2026',kind:'paper',context:'npj Structural Biology',fullTitle:'StrucTrace: A universal Fourier watermark for traceable biomolecular structures',
    summary:L('参与文字、图稿及修改稿。','Contributed to writing, figures, and revisions.'),
    body:L(['在 SHI Lab 的这段时间，我参与了 StrucTrace 的文字和图稿工作，也参与了修改稿。','CV 记载论文已获接收。最新版全文和出版社页面还没有补入这份 demo，下面先保留项目入口。'],['At SHI Lab, I contributed to the text, figures, and revisions of StrucTrace.','The CV records acceptance. The latest manuscript and publisher record have not yet been added to this demo. Project links are available below.']),
    version:L('已接收，依据 CV；正式出版信息待核对','Accepted according to the CV; publication details to be checked'),experience:'shi',links:[['代码 / Code','https://github.com/JLU-WangXu/Structrace'],['PyPI','https://pypi.org/project/structrace/']]},
  {id:'crypto',title:L('Crypto-ncRNA','Crypto-ncRNA'),year:'2025–26',kind:'paper',context:'AI4NA @ ICLR 2025 · arXiv',fullTitle:'Crypto-ncRNA: a bio-inspired post-quantum cryptographic primitive exploiting RNA folding complexity',
    authors:'Xu Wang, Yiquan Wang, Tin-Yeh Huang, Zhaorui Jiang, Kai Wei',
    summary:L('早期 workshop 稿和后来的预印本，收在同一个条目里。','The workshop paper and later preprint are versions of the same work.'),
    body:L(['这里收的是同一项研究的不同版本，不是两项独立成果。','早期 AI4NA workshop 稿与后来的 arXiv 稿，标题和作者列表都有变化。下方阅读器打开的是新版预印本；版本入口分别保留。'],['These are different versions of one research project, not separate achievements.','The title and author list changed between the early AI4NA workshop paper and the later arXiv manuscript. The reader shows the later preprint.']),
    version:L('arXiv v2 · 2026.02.02 · 预印本','arXiv v2 · 2 Feb 2026 · Preprint'),pdf:'crypto-ncrna-arxiv-v2.pdf',thumb:'crypto-ncrna-arxiv-v2.jpg',pages:11,
    links:[['arXiv','https://arxiv.org/abs/2504.17878'],['早期 workshop 稿 / Workshop version','https://openreview.net/pdf?id=j6ODUDw4vN']]},
  {id:'olympic',title:L('奥运奖牌预测','Olympic medal prediction'),year:'2025',kind:'paper',context:'New In ML · ICML Affinity Event',fullTitle:'STGCN-LSTM for Olympic Medal Prediction: Dynamic Power Modeling and Causal Policy Optimization',
    authors:'Yiquan Wang, Jiaying Wang, Tin-Yeh Huang, Jingyi Yang, Zihao Xu',summary:L('论文预印本及 New In ML 海报记录。','Preprint and New In ML poster record.'),
    body:L(['论文和海报记录放在这里，方便查找。','会议入口对应 ICML 的 New In ML Affinity Event，并不是 ICML 主会论文。更具体的参与经过还没有写。'],['The preprint and poster record are collected here.','The conference record is for the New In ML Affinity Event at ICML, not a main-conference paper. A fuller personal account is still to be written.']),
    version:L('arXiv v3 · 2025.04.06 · 预印本','arXiv v3 · 6 Apr 2025 · Preprint'),pdf:'olympic-medals-arxiv-v3.pdf',thumb:'olympic-medals-arxiv-v3.jpg',pages:18,
    links:[['arXiv','https://arxiv.org/abs/2501.17711'],['会议记录 / Event record','https://icml.cc/virtual/2025/50686']]},
  {id:'glm7',title:L('关于 GLM7 的评论','Comment on GLM7'),year:'2026',kind:'paper',context:'Advanced Science · Correspondence',fullTitle:'Comment on GLM7',summary:L('一篇评论，连同作者回应的入口。','A correspondence, with a link to the authors’ reply.'),
    body:L(['这是对 GLM7 研究的评论，不是被评论的原始研究。出版社有开放正文，本地 PDF 还没有补入。'],['This is correspondence about the GLM7 study, not the original study itself. The publisher provides the text online; a local PDF is not included.']),
    version:L('出版社正文 · 2026','Publisher text · 2026'),links:[['出版社正文 / Publisher','https://advanced.onlinelibrary.wiley.com/doi/10.1002/advs.74610'],['作者回应 / Reply','https://advanced.onlinelibrary.wiley.com/doi/10.1002/advs.75147'],['PubMed','https://pubmed.ncbi.nlm.nih.gov/41770882/']]},
  {id:'disease',title:L('疾病预测的局限','Limits of disease prediction'),year:'2025',kind:'paper',context:'Journal of Clinical Neuroscience · Letter',fullTitle:'AI for disease prediction: Performance insights and key limitations',summary:L('Letter；目前保留出版记录。','Letter; publication record available.'),
    body:L(['这篇是 Letter。目前先放出版记录，全文尚未取得。'],['This item is a Letter. The publication record is linked; the full text has not been obtained.']),version:L('全文待补','Full text not yet available here'),links:[['DOI','https://doi.org/10.1016/j.jocn.2025.111360'],['PubMed','https://pubmed.ncbi.nlm.nih.gov/40466238/']]},
  {id:'oio',title:L('OIO','OIO'),year:'2025',kind:'paper',context:'IEEE BIBM',fullTitle:'Octopus inspired optimization (OIO): A hierarchical framework for navigating protein fitness landscapes',summary:L('论文集入口；全文待补。','Proceedings link; full text to be added.'),body:L(['先保留 DOI 入口。还没有在这份 demo 中核对和收录最终全文。'],['The DOI is linked here. The final full text has not been checked and added to this demo.']),version:L('最终全文待核对','Final text to be checked'),links:[['IEEE / DOI','https://doi.org/10.1109/BIBM66473.2025.11356718']]},
  {id:'ninetoothed',title:L('NineToothed 与教学 demo','NineToothed & teaching demos'),year:'2026',kind:'project',context:'Qiyuan National Lab · Iluvatar CoreX',fullTitle:'NineToothed',summary:L('工具移植、教学材料和演示。','Tooling, teaching materials, and demonstrations.'),
    body:L(['这段实习涉及 NineToothed 工具和 DSL 移植，也做过 CUDA、推理、Triton 等内容的教学材料，以及 WebGPU 教学游戏的 demo。','这里先记录参与过的内容，不把 demo 写成一门已经交付完成的课程。可公开的演示和具体贡献链接，后面再补。'],['This internship involved NineToothed tooling and DSL porting, teaching materials on CUDA, inference, and Triton, and a WebGPU educational-game demo.','This records the work I participated in; a demo should not be described as a fully delivered course. Public demonstrations and contribution links will be added separately.']),
    version:L('工作记录 · 演示材料待整理','Work record · Demonstration materials pending'),experience:'qiyuan',links:[['项目仓库 / Repository','https://github.com/InfiniTensor/ninetoothed'],['官方文档 / Documentation','https://ninetoothed.org/']]}
];
export const experiences = [
 {id:'qiyuan',date:'2026.03 —',group:'work',name:L('启元实验室（国家实验室）/ 天数智芯','Qiyuan National Laboratory / Iluvatar CoreX'),role:L('联合培养实习','Joint-training internship'),body:L(['参与 NineToothed 工具与 DSL 移植，整理教学材料和 demo，也接触了开源生态合作方面的工作。'],['Work on NineToothed tooling, DSL porting, teaching demos, and open-source ecosystem collaboration.']),related:['ninetoothed']},
 {id:'shi',date:'2025.09 — 2026.09',group:'work',name:L('清华大学 SHI Lab / FRCBS','Tsinghua SHI Lab / FRCBS'),role:L('研究与传播设计','Research and communication design'),body:L(['参与 StrucTrace 的文字、图稿和修改稿。','也做过 HTML 邮件模板、项目活动视觉，以及肽设计竞赛网站的测试。论文之外的设计稿还没有放进这份 demo。'],['Contributed to the text, figures, and revisions of StrucTrace.','Also worked on HTML email templates, programme visuals, and testing for a peptide-design competition website. Those design files are not yet included.']),related:['structrace']},
 {id:'smart',date:'2025.06 — 2025.07',group:'work',name:L('SMART · Mingxu Hu 课题组','SMART · Mingxu Hu group'),role:L('访问学生','Visiting student'),body:L(['接触 cryo-ET / cryo-EM 图像对齐问题，参与相关概念与方案的讨论。'],['Explored concepts for cryo-ET / cryo-EM image alignment.']),links:[['课题组 / Group','https://smart.org.cn/en/faculty/humingxu']]},
 {id:'cas',date:'2024.10 — 2025.09',group:'work',name:L('中科院地理科学与资源研究所','IGSNRR, Chinese Academy of Sciences'),role:L('热浪风险研究','Heatwave risk research'),body:L(['参与热浪风险研究的设计、正式分析、数据整理、图稿和论文写作。'],['Contributed to study design, formal analysis, data curation, figures, and manuscript writing for heatwave risk research.']),related:['heatwave']},
 {id:'kteo',date:'2024.10 — 2025.09',group:'work',name:L('PolyU KTEO','PolyU KTEO'),role:L('兼职学生助理','Part-time student assistant'),body:L(['先记录这段经历，具体工作内容待补。'],['This records the appointment. A fuller account of the work remains to be added.'])},
 {id:'polysmart',date:'2024.11 — 2024.12',group:'work',name:L('PolySmart','PolySmart'),role:L('研究实习','Research internship'),body:L(['在 Qing Li 和 Xiaoyong Wei 指导下参与研究实习。'],['Research internship supervised by Qing Li and Xiaoyong Wei.']),links:[['课题组 / Group','https://polysmartgroup.github.io/']]},
 {id:'hotel',date:'2023.12 — 2024.01',group:'work',name:L('帝京酒店','Royal Plaza Hotel'),role:L('会计 / IT 实习','Accounting / IT internship'),body:L(['用 Python 和 pandas 将获授权的数据库内容整理成 Excel 报表，也参与服务器、办公 IT 和日常支持工作。'],['Used Python and pandas to turn authorised database records into Excel reports, alongside server, office IT, and support work.'])},
 {id:'x-social',date:'2024 —',group:'participation',name:L('X-Institute · X-Scholar','X-Institute · X-Scholar'),role:L('社会创新项目','Social innovation projects'),body:L(['接触过教育与技能平台、长者智能手机学习、数字人陪伴等项目，参与用户访谈、测试、原型和路演。','每项的具体过程需要另行整理，目前先保留这段参与记录。'],['Participated in projects around education and skills, smartphone learning for older adults, and digital-human companionship, including interviews, tests, prototypes, and presentations.','Detailed accounts of the individual projects remain to be written.'])},
 {id:'x-microbial',date:'2023.07 — 2023.08',group:'participation',name:L('X-Institute · 暑期项目','X-Institute · Summer programme'),role:L('微生物系统','Microbial systems'),body:L(['接触广义 Lotka–Volterra 模型、非线性动力学，以及利用生物相互作用进行计算和检测的早期设想。'],['Explored generalised Lotka–Volterra models, nonlinear dynamics, and early concepts for interaction-based biological computing and detection.'])},
 {id:'gov-committee',date:'2025 — 2027',group:'service',name:L('油尖旺地区青年发展及公民教育委员会','District Youth Development and Civic Education Committee (Yau Tsim Mong)'),role:L('委员','Committee member'),body:L(['在香港特区政府民政事务总署辖下的油尖旺地区青年发展及公民教育委员会担任委员，也参与委员会下的社区体育委员会及推广「一国两制」委员会。','这里先记录任期与参与身份，具体活动和可公开的记录后续整理。'],['Member of the Yau Tsim Mong District Youth Development and Civic Education Committee under the Home Affairs Department, HKSAR Government, also serving on its Community Sports Committee and Committee on the Promotion of “One Country, Two Systems”.','This records the term and role. Public accounts of individual activities remain to be added.'])},
 {id:'gov-tutor',date:'2026 — 2027',group:'service',name:L('香港特区政府','HKSAR Government'),role:L('国家安全教育地区导师','National Security Education District Tutor'),body:L(['CV 中记录的任期为 2026–2027 年。具体参与内容与可公开材料后续补充。'],['The CV records a 2026–2027 term as National Security Education District Tutor. An account of the work and public materials remain to be added.'])},
 {id:'polyu-representative',date:'2025 — 2028',group:'service',name:L('香港理工大学','The Hong Kong Polytechnic University'),role:L('学生代表','Student representative'),body:L(['担任产品工程相关学位课程的学生代表，包括 Product Engineering with Marketing，以及 Product Engineering with a Secondary Major in Innovation and Entrepreneurship。'],['Student representative for Product Engineering with Marketing and Product Engineering with a Secondary Major in Innovation and Entrepreneurship.'])},
 {id:'polyu-representative-previous',date:'2024 — 2025',group:'service',name:L('香港理工大学','The Hong Kong Polytechnic University'),role:L('学生代表 · 产品及工业工程组合课程','Student representative · Product and Industrial Engineering scheme'),body:L(['在产品及工业工程组合课程就读期间担任学生代表。'],['Served as student representative for the Product and Industrial Engineering scheme.'])},
 {id:'cpce-ambassador',date:'2023 — 2024',group:'service',name:L('理大专业及持续教育学院（CPCE）','PolyU College of Professional and Continuing Education'),role:L('学生大使','Student ambassador'),body:L(['在 CPCE 担任学生大使。'],['Served as a student ambassador at CPCE.'])},
 {id:'hkcc-representative',date:'2023 — 2024',group:'service',name:L('香港专上学院（HKCC）','Hong Kong Community College'),role:L('学生代表 · Statistics and Data Science','Student representative · Statistics and Data Science'),body:L(['在 Statistics and Data Science 课程担任学生代表。'],['Served as student representative for the Statistics and Data Science programme.'])},
 {id:'academic-reviewing',date:'2025 — 2026',group:'service',name:L('学术审稿','Academic peer review'),role:L('FM4Science、AI4Math、F1000Research','FM4Science, AI4Math, F1000Research'),body:L(['2026 年参与 ICLR FM4Science workshop 审稿；2025 年参与 ICML AI4Math workshop 及 F1000Research 审稿。','这是一组审稿记录，不代表在主办机构任职。公开报告与来源链接后续逐项补充。'],['Reviewed for ICLR FM4Science in 2026 and for ICML AI4Math and F1000Research in 2025.','These are reviewing records, not appointments at the host organisations. Public reports and source links remain to be added individually.'])}
];
export const notes = [
 {id:'website',title:L('先把网站做出来','Getting this site made'),date:'2026.09',tag:L('网站','Website'),draft:true,
  paragraphs:L(['改了好几轮，现在纸张和半透明的效果，我觉得有点感觉了。反而是东西放进去以后怎么排，还没想清楚。','有些我做过，有些只是接触过。我想放上来，也不是觉得每件都做得很好，只是这些确实是我的经历。','这版先看能不能用，文字后面再改。'],['After several rounds, the paper and translucent materials are getting closer. How the content should fit together is less settled.','Some things I made; others I only took part in. Keeping them here does not mean I think each one turned out especially well. They are part of what I have done.','For now, I want to try the site. The writing can be revised later.'])},
 {id:'simple',title:L('简约就一定好吗','Is simpler always better?'),date:'2026.09',tag:L('设计','Design'),draft:true,
  paragraphs:L(['简约不代表就是好的设计。每个 component 要有意义，但这个意义不一定只是功能。','比如外观。它可能没让一个东西更耐用，也没让生产更方便，但它让人愿意买，那也不能说它没用。','所以还是得看具体在做什么，有没有其他方案，选哪个更合适。不能因为说了“做减法”，就默认减完会更好。'],['Simplicity does not automatically make a design good. Each component should have a reason to exist, but that reason need not be purely functional.','Appearance may not improve durability or manufacturing, yet it can matter to someone deciding what to buy.','The choice still depends on the situation and the alternatives. Removing something is not an improvement by itself.'])}
];
export const pictures = [
 {id:'fold',file:'fold.jpg',title:L('折面','Folded sheet'),alt:L('生成素材：侧光下折弯的银色金属薄片','Generated material study: folded silver sheet in side light')},
 {id:'metal',file:'metal.jpg',title:L('红色金属','Red metal'),alt:L('生成素材：红色氧化金属表面','Generated material study: red oxidised metal')},
 {id:'mesh',file:'mesh.jpg',title:L('织物','Mesh'),alt:L('生成素材：织物表面细节','Generated material study: woven surface')},
 {id:'sketch',file:'sketch.jpg',title:L('形态草图','Form sketch'),alt:L('生成素材：折面形态的铅笔草图，不是实测工程图','Generated pencil study of a folded form, not a measured technical drawing')}
];
export const findWork = id => works.find(x => x.id === id);
export const findExperience = id => experiences.find(x => x.id === id);
export const findNote = id => notes.find(x => x.id === id);
export function routeFrom(hash) {
 let path; try {path=decodeURIComponent(hash.replace(/^#\/?/,''));}catch{return {page:'missing'};}
 const [page='home',id,...extra]=path.split('/');
 if(extra.length) return {page:'missing'};
 if(!path) return {page:'home'};
 if(['home','works','experiences','notes','images','structure'].includes(page)&&!id)return {page};
 if(page==='work'&&findWork(id))return {page,id};
 if(page==='paper'&&findWork(id)?.pdf)return {page,id};
 if(page==='experience'&&findExperience(id))return {page,id};
 if(page==='note'&&findNote(id))return {page,id};
 if(page==='image'&&pictures.some(x=>x.id===id))return {page,id};
 return {page:'missing'};
}
export function filteredWorks(query='',kind='all',lang='zh') {
 const q=query.trim().toLocaleLowerCase();
 return works.filter(w=>(kind==='all'||w.kind===kind)&&[w.title[lang],w.fullTitle,w.context,w.year,w.summary[lang]].join(' ').toLocaleLowerCase().includes(q));
}
