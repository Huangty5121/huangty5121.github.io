import {works,experiences,notes} from './content.mjs';
const L=(zh,en)=>({zh,en});
const social=experiences.find(e=>e.id==='x-social');
export const entries=[
 works.find(w=>w.id==='heatwave'),
 {...works.find(w=>w.id==='ninetoothed'),title:L('NineToothed','NineToothed')},
 works.find(w=>w.id==='structrace'),
 {id:'social',kind:'project',year:'2024 —',context:'X-Institute',title:L('社会创新参与','Social innovation'),summary:L('访谈、测试、原型与路演。','Interviews, testing, prototypes, and presentations.'),body:social.body,version:L('项目参与 · 最佳创意奖为团队奖','Project participation · Best Innovation Award is a team award'),links:[],experience:'x-social'},
 {id:'simple',kind:'writing',year:'2026',context:'Personal writing',title:notes[0].title,summary:L('形式、功能，以及设计为什么值得。','Form, function, and what makes a design worthwhile.'),body:notes[0].paragraphs,version:L('据网站讨论整理 · 待本人修订，尚未发表','Edited from website discussions · Awaiting personal revision, unpublished'),links:[]},
 ...works.filter(w=>!['heatwave','ninetoothed','structrace'].includes(w.id))
].map((entry,order)=>({...entry,order,date:Math.max(...[...entry.year.matchAll(/\d{4}|\d{2}/g)].map(([year])=>year.length===2?2000+Number(year):Number(year))),cover:`covers/${entry.id}.svg`}));
export const selectedIds=['heatwave','ninetoothed','structrace','social','simple'];
