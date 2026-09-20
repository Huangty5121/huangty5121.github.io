import {works,experiences} from './content.mjs';
const L=(zh,en)=>({zh,en});
const social=experiences.find(e=>e.id==='x-social');
export const entries=[
 works.find(w=>w.id==='heatwave'),
 {...works.find(w=>w.id==='ninetoothed'),title:L('NineToothed','NineToothed')},
 works.find(w=>w.id==='structrace'),
 {id:'social',kind:'project',year:'2024 —',context:'X-Institute',title:L('社会创新参与','Social innovation'),summary:L('访谈、测试、原型与路演。','Interviews, testing, prototypes, and presentations.'),body:social.body,version:L('项目参与 · 最佳创意奖为团队奖','Project participation · Best Innovation Award is a team award'),links:[],experience:'x-social'},
 ...works.filter(w=>!['heatwave','ninetoothed','structrace'].includes(w.id))
].map((entry,order)=>({...entry,order,date:Math.max(...[...entry.year.matchAll(/\d{4}|\d{2}/g)].map(([year])=>year.length===2?2000+Number(year):Number(year))),cover:`covers/${entry.id}.svg`}));
export const selectedIds=['heatwave','ninetoothed','structrace','social'];
