// News and footprint data. Press items must link to real published mentions;
// profiles are the owner's public academic pages; updates are site milestones.
const L=(zh,en)=>({zh,en});
export const press=[
 {id:'recite',date:'2024 · 09',source:L('中华吟诵学会 · 活动报道','Zhonghua Recitation Society · event report'),
  title:L('参加第二届天涯共此时海内外诗友中秋联谊会','Joined the second Mid-Autumn recitation gathering'),
  summary:L('作为香港理工大学学生参与联谊会，表演吟诵节目。','Performed classical recitation at the gathering as a PolyU student.'),
  url:'https://www.zhscxh.com'},
];
export const profiles=[
 {id:'scholar',source:'Google Scholar',title:L('论文与引用记录','Papers & citations'),url:'https://scholar.google.com/citations?user=zrVCdOkAAAAJ&hl=en'},
 {id:'researchgate',source:'ResearchGate',title:L('研究主页','Research profile'),url:'https://www.researchgate.net/profile/Tin-Yeh-Huang'},
 {id:'ieee',source:'IEEE Xplore',title:L('作者档案','Author record'),url:'https://ieeexplore.ieee.org'},
];
export const siteUpdates=[
 {id:'redesign',date:'2026 · 09',title:L('网站改版上线','The site redesign is live'),
  summary:L('新的版式、分离的论文与实践、真实地图和一套站内阅读器。','A fresh layout, separated papers and practice, a real map, and on-site PDF readers.')},
 {id:'readers',date:'2026 · 09',title:L('原始论文 PDF 站内可读','Original paper PDFs now read on site'),
  summary:L('三篇论文的原始 PDF 未做任何修改，直接在站内翻页阅读。','All three papers keep their original PDFs, page for page, readable in place.')},
 {id:'archive',date:'2026 · 09',title:L('历史设计稿整理归档','Historical design studies archived'),
  summary:L('早期页面作为设计实验保留在仓库中，不再作为正式页面。','Earlier pages stay in the repository as design experiments, no longer formal pages.')},
];
