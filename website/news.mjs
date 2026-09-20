// News data. Press items must link to real published mentions; updates record
// one-line milestones that are already documented elsewhere on the site.
const L=(zh,en)=>({zh,en});
export const press=[
 {id:'recite',date:'2024 · 09',source:L('中华吟诵学会','Zhonghua Recitation Society'),
  title:L('第二届天涯共此时海内外诗友中秋联谊会','Second Mid-Autumn recitation gathering'),
  summary:L('作为香港理工大学学生参加联谊会，表演吟诵节目。','Performed classical recitation at the gathering as a PolyU student.'),
  url:'https://www.zhscxh.com'},
];
export const siteUpdates=[
 {id:'structrace',date:'2026',title:L('StrucTrace 论文获接收','StrucTrace accepted'),
  summary:L('参与初稿文字与图稿的论文被 npj Structural Biology 接收。','The paper I contributed text and figures to was accepted at npj Structural Biology.')},
 {id:'reviewing',date:'2026',title:L('参与 ICLR FM4Science workshop 审稿','Reviewed for the ICLR FM4Science workshop'),
  summary:L('此前也参与 ICML AI4Math workshop（2025）与 F1000Research 审稿。','Earlier: ICML AI4Math workshop (2025) and F1000Research reviews.')},
 {id:'redesign',date:'2026 · 09',title:L('个人网站改版','Site redesign'),
  summary:L('论文与实践分开整理，新增站内论文阅读器、动态页与名片页。','Papers and practice are now separate, with on-site PDF readers, a News page, and a shareable card.')},
];
