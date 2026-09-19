import {education} from './desk-background.mjs';
import {experiences} from './desk-data.mjs';
import {currentRoleIds,filters,filteredExperiences,organisationBoard,membershipsSection} from './desk-affiliations.mjs';
import {experiencePin} from './desk-objects.mjs';
const h=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const archiveSections=['study','records','organisations','credentials'];
export function archiveContents(lang,section,group,selectedOrg){
 const t=(zh,en)=>lang==='zh'?zh:en;
 const titles={study:t('学习','Studies'),records:t('经历','Experience'),organisations:t('组织','Organisations'),credentials:t('会员 / 证书','Memberships / certificates')};
 let content='';
 if(section==='study')content=`<ul class="study-records">${education.map(e=>`<li class="study-record" data-study="${e.id}">${e.mark?`<img src="desk-assets/pins/${e.mark}.png" width="56" height="56" alt="" aria-hidden="true">`:'<span aria-hidden="true"></span>'}<div><div class="study-heading"><h2>${h(e.name[lang])}</h2><span>${h(e.status[lang])}</span></div><p>${h(e.course[lang])}</p><small>${h(e.extra[lang])}</small></div><time>${h(e.date)}</time></li>`).join('')}</ul>`;
 if(section==='records'){
  const rows=(group==='current'?experiences.filter(e=>currentRoleIds.includes(e.id)):filteredExperiences(group)).slice().sort((a,b)=>Number(b.date.slice(0,4))-Number(a.date.slice(0,4)));
  content=`<div class="archive-filters" aria-label="${t('筛选经历','Filter experience')}">${[...filters.filter(([id])=>id!=='organisations'),['current',{zh:'目前参与',en:'Current involvement'}]].map(([id,name])=>`<button type="button" data-group="${id}" aria-pressed="${id===group}">${h(name[lang])}</button>`).join('')}</div><p class="archive-note">${t('按开始年份整理。同一段经历可以属于不止一个分类。','Ordered by starting year. A record may belong to more than one category.')}</p><ul class="experience-list">${rows.map(e=>`<li class="experience-item"><a href="#experience/${e.id}">${experiencePin(e.id)}<time>${h(e.date)}</time><div class="experience-text"><h2>${h(e.name[lang])}</h2><p>${h(e.role[lang])}</p>${currentRoleIds.includes(e.id)?`<small class="current-mark">${t('CV 列为目前参与','Listed as current in CV')}</small>`:''}</div><span class="arrow" aria-hidden="true">↗</span></a></li>`).join('')}</ul>`;
 }
 if(section==='organisations')content=organisationBoard(lang,selectedOrg);
 if(section==='credentials')content=membershipsSection(lang,true);
 return `<div class="experience-archive"><div class="archive-tabs" role="tablist" aria-label="${t('浏览背景','Browse background')}">${archiveSections.map(id=>`<button type="button" role="tab" id="archive-tab-${id}" data-archive-section="${id}" aria-selected="${section===id}" tabindex="${section===id?0:-1}" aria-controls="archive-panel">${titles[id]}</button>`).join('')}</div><section id="archive-panel" role="tabpanel" tabindex="0" aria-labelledby="archive-tab-${section}">${content}</section><p class="provenance">${t('依据所提供的 CV 整理。学习、任职、参与和专业资格分别记录；公开凭证与个人叙述仍在补充。','Based on the supplied CV. Studies, appointments, participation and credentials remain distinct; public evidence and personal accounts are still being added.')}</p></div>`;
}
