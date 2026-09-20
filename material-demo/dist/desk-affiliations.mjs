import {experiences} from './desk-data.mjs';
import {education} from './desk-background.mjs';
const L=(zh,en)=>({zh,en});
const h=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// Explicit CV-declared current roles, reviewed 2026-09-12. Do not infer a job
// from membership, or infer current employment from an ambiguous end month.
export const currentRoleIds=['qiyuan','gov-committee','gov-tutor','polyu-representative','x-social'];
export const experienceTags={
 qiyuan:['work'],shi:['research','work'],smart:['research'],cas:['research'],kteo:['work'],polysmart:['research','work'],hotel:['work'],
 'x-social':['projects'],'x-microbial':['research','projects'],
 'gov-committee':['service'],'gov-tutor':['service'],'polyu-representative':['service'],'polyu-representative-previous':['service'],
 'cpce-ambassador':['service'],'hkcc-representative':['service'],'academic-reviewing':['service'],
};
// Organisation identity is independent of an appointment. A joint internship
// can belong to two organisations; both open the SAME experience record.
export const organisations=[
 {id:'polyu',name:L('香港理工大学','The Hong Kong Polytechnic University'),mark:'polyu.png',study:['polyu'],records:['kteo','polyu-representative','polyu-representative-previous','polysmart']},
 {id:'tsinghua',name:L('清华大学','Tsinghua University'),mark:'tsinghua.png',study:['tsinghua'],records:['shi']},
 {id:'smart',name:L('深圳医学科学院（SMART）','Shenzhen Medical Academy of Research and Translation'),mark:'smart-pin.png',records:['smart']},
 {id:'cas',name:L('中科院地理科学与资源研究所','IGSNRR, Chinese Academy of Sciences'),mark:'cas.png',records:['cas']},
 {id:'iluvatar',name:L('天数智芯','Iluvatar CoreX'),mark:'iluvatar.png',records:['qiyuan']},
 {id:'qiyuan',name:L('启元实验室（国家实验室）','Qiyuan National Laboratory'),mark:'qiyuan.png',records:['qiyuan']},
 {id:'royal-plaza',name:L('帝京酒店','Royal Plaza Hotel'),mark:'royal-plaza.png',records:['hotel']},
 {id:'x-institute',name:L('深圳零一学院（X-Institute）','X-Institute Shenzhen'),mark:'x-pin.png',records:['x-social','x-microbial']},
 {id:'hksar',name:L('香港特区政府','HKSAR Government'),mark:'hksar.png',records:['gov-committee','gov-tutor']},
 {id:'cpce',name:L('理大专业及持续教育学院 · 香港专上学院','PolyU CPCE · Hong Kong Community College'),mark:'cpce.png',study:['hkcc'],records:['hkcc-representative','cpce-ambassador']},
];
export const filters=[['organisations',L('组织','Organisations')],['all',L('全部经历','All records')],['research',L('研究','Research')],['work',L('实习与工作','Internships & work')],['service',L('服务与代表','Service & representation')],['projects',L('项目参与','Programmes & projects')]];
export const filteredExperiences=filter=>experiences.filter(e=>filter==='all'||experienceTags[e.id]?.includes(filter));

export function currentRolesSection(lang){
 const t=(zh,en)=>lang==='zh'?zh:en;
 return `<section class="current-roles" aria-labelledby="current-title"><header><h2 class="written ink" id="current-title">${t('目前的参与','Current involvement')}</h2><span>${t('按 CV 所列任期','Terms as listed in the CV')}</span></header><ul>${currentRoleIds.map(id=>{const e=experiences.find(x=>x.id===id);return `<li><a href="#experience/${h(id)}"><time>${h(e.date)}</time><div><h3>${h(e.role[lang])}</h3><p>${h(e.name[lang])}</p></div></a></li>`;}).join('')}</ul></section>`;
}

export function organisationBoard(lang,selected){
 const t=(zh,en)=>lang==='zh'?zh:en;
 return `<div class="organisation-board"><p class="organisation-hint">${t('点开一个组织，看在那里的记录。','Select an organisation to see the records.')}</p><div class="organisation-grid">${organisations.map(o=>`<button type="button" class="organisation-choice ${o.mark?'':'organisation-text'}" id="org-${o.id}" data-org="${o.id}" aria-label="${h(o.name[lang])}" aria-expanded="${selected===o.id}" aria-controls="organisation-context">${o.mark?`<img src="desk-assets/pins/${h(o.mark)}" width="74" height="74" alt="" aria-hidden="true"><span class="organisation-name">${h(o.name[lang])}</span>`:`<span class="organisation-word-name">${h(o.name[lang])}</span>`}</button>`).join('')}<div id="organisation-context" ${selected?'':'hidden'}>${organisationContext(lang,selected)}</div></div></div>`;
}
export function organisationContext(lang,id){
 const o=organisations.find(x=>x.id===id);if(!o)return '';
 const t=(zh,en)=>lang==='zh'?zh:en;
 return `<section class="organisation-records" aria-labelledby="selected-organisation"><header><h3 id="selected-organisation">${h(o.name[lang])}</h3><button type="button" data-close-org aria-label="${t('收起组织记录','Close organisation records')}">${t('收起','Close')}</button></header><ul>${(o.study??[]).map(id=>{const e=education.find(x=>x.id===id);return `<li class="organisation-study"><time>${h(e.date)}</time><div><strong>${h(e.status[lang])} · ${h(e.course[lang])}</strong><p>${h(e.extra[lang])}</p></div></li>`;}).join('')}${o.records.map(id=>{const e=experiences.find(x=>x.id===id);return `<li><a href="#experience/${e.id}"><time>${h(e.date)}</time><div><strong>${h(e.role[lang])}</strong><p>${h(e.name[lang])}</p></div><span aria-hidden="true">↗</span></a></li>`;}).join('')}</ul></section>`;
}

// A CV entry is not independently verified proof. Only attach public evidence
// URLs supplied/verified for this person, never a generic issuer homepage.
export const credentials=[
 {id:'idshk',kind:'membership',date:'2026 —',issuer:'Industrial Designers Society of Hong Kong',title:L('学生会员','Student member'),evidence:null},
 {id:'hkie',kind:'membership',date:'2025 —',issuer:'The Hong Kong Institution of Engineers',title:L('学生会员','Student member'),evidence:null},
 {id:'union',kind:'membership',date:'2023 —',issuer:'Hong Kong Union of Chinese Workers in Western Style Employment',title:L('会员','Member'),evidence:null},
 {id:'azure-ai',kind:'certification',date:'2021',issuer:'Microsoft',title:L('Microsoft Certified: Azure AI Fundamentals','Microsoft Certified: Azure AI Fundamentals'),evidence:null},
];
export function membershipsSection(lang,expanded=false){
 const t=(zh,en)=>lang==='zh'?zh:en;
 const items=kind=>credentials.filter(c=>c.kind===kind).map(c=>`<li><time>${h(c.date)}</time><div><strong>${h(kind==='membership'?c.issuer:c.title[lang])}</strong><span>${h(kind==='membership'?c.title[lang]:c.issuer)}</span>${c.evidence?`<a href="${h(c.evidence)}" target="_blank" rel="noopener noreferrer">${t('查看公开凭证','View public credential')} ↗</a>`:''}</div></li>`).join('');
 return `<details class="membership-records" ${expanded?'open':''}><summary>${t('会员与专业证书','Memberships & professional certification')}</summary><div class="credential-groups"><section aria-labelledby="membership-title"><h3 id="membership-title">${t('会员身份','Memberships')}</h3><ul>${items('membership')}</ul></section><section aria-labelledby="certification-title"><h3 id="certification-title">${t('专业证书','Professional certification')}</h3><ul>${items('certification')}</ul></section></div><p class="credential-evidence">${t('依据 CV 记录。公开凭证尚未收录；会员身份不代表任职。','Recorded from the CV. Public credentials have not been added; membership is not employment.')}</p></details>`;
}
