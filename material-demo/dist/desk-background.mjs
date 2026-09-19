export const education=[
 {id:'polyu',mark:'polyu',date:'2024 —',name:{zh:'香港理工大学',en:'The Hong Kong Polytechnic University'},status:{zh:'在读',en:'Current studies'},course:{zh:'Product Engineering',en:'Product Engineering'},extra:{zh:'Innovation & Entrepreneurship 第二专业 · Management 辅修',en:'Second major: Innovation & Entrepreneurship · Minor: Management'}},
 {id:'tsinghua',mark:'tsinghua',date:'2025–26',name:{zh:'清华大学 · 新雅书院',en:'Tsinghua University · Xinya College'},status:{zh:'交换',en:'Exchange'},course:{zh:'创意设计与智能工程',en:'Creative Design and Intelligent Engineering'},extra:{zh:'交换学习，不列作独立学位。',en:'An exchange period, not a separate degree.'}},
 {id:'hkcc',date:'2023–24',name:{zh:'香港专上学院（HKCC）',en:'Hong Kong Community College'},status:{zh:'曾就读',en:'Previous studies'},course:{zh:'Statistics and Data Science',en:'Statistics and Data Science'},extra:{zh:'一年学习经历，未取得该学位。',en:'One year of study; qualification not conferred.'}},
];
const h=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function educationSection(lang){
 const t=(zh,en)=>lang==='zh'?zh:en;
 const row=e=>`<li class="education-item ${e.mark?'':'no-mark'}">${e.mark?`<span class="experience-pin pin-row" aria-hidden="true"><img src="desk-assets/pins/${e.mark}.png" width="62" height="62" alt=""></span>`:''}<time>${h(e.date)}</time><div><div class="education-name"><h3>${h(e.name[lang])}</h3><span>${h(e.status[lang])}</span></div><p>${h(e.course[lang])}</p><small>${h(e.extra[lang])}</small></div></li>`;
 return `<section class="education-sheet" aria-labelledby="education-title"><h2 class="written ink" id="education-title">${t('学位与学习经历','Education')}</h2><ul>${row(education[0])}</ul><details class="earlier-studies"><summary><span>${t('其他学习经历','Other studies')}</span><small>${t('清华交换 · HKCC','Tsinghua exchange · HKCC')}</small></summary><ul>${education.slice(1).map(row).join('')}</ul></details></section>`;
}
