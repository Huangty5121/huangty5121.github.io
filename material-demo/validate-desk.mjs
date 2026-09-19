import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {works,experiences,notes,pictures,routeFrom,filteredWorks} from './dist/desk-data.mjs';
const dist=fileURLToPath(new URL('./dist/',import.meta.url));
let assertions=0;const check=(condition,message)=>{assert.ok(condition,message);assertions++;};
for(const entries of [works,experiences,notes,pictures]){
 check(new Set(entries.map(x=>x.id)).size===entries.length,'unique ids');
 for(const e of entries)for(const key of ['title','name','body','paragraphs','summary','role','alt','version'])if(e[key])check(e[key].zh!==undefined&&e[key].en!==undefined,`bilingual ${e.id}.${key}`);
}
for(const w of works){check(routeFrom(`#work/${w.id}`).page==='work','work route');if(w.pdf){check(existsSync(`${dist}desk-assets/${w.pdf}`),'PDF exists');check(existsSync(`${dist}desk-assets/${w.thumb}`),'thumbnail exists');check(readFileSync(`${dist}desk-assets/${w.pdf}`).subarray(0,5).toString()==='%PDF-','PDF header');check(routeFrom(`#paper/${w.id}`).page==='paper','paper route');}if(w.experience)check(experiences.some(e=>e.id===w.experience),'experience relation resolves');for(const [,url] of w.links)check(new URL(url).protocol==='https:','https source');}
for(const e of experiences)for(const id of e.related??[])check(works.some(w=>w.id===id),'work relation resolves');
for(const p of pictures)check(existsSync(`${dist}assets/${p.file}`),'image asset exists');
for(const hash of ['#unknown','#work/nope','#paper/structrace','#note/nope','#works/extra','#home/a/b','#%E0%A4%A'])check(routeFrom(hash).page==='missing',`invalid route ${hash}`);
check(routeFrom('').page==='home','empty home');check(filteredWorks('热浪').length===1,'Chinese search');check(filteredWorks('heatwave','all','en').length===1,'English search');check(filteredWorks('','paper').length===7,'paper filter');check(filteredWorks('','project').length===1,'project filter');check(filteredWorks('no-match-token').length===0,'empty search');
const html=readFileSync(`${dist}desk.html`,'utf8');check(!/autoplay/i.test(html),'no autoplay');check(!html.includes('https://'),'no eager external services');check(html.includes('noindex,nofollow'),'not indexed');
console.log(JSON.stringify({result:'passed',assertions,works:works.length,experiences:experiences.length,notes:notes.length,pictures:pictures.length,pdfs:works.filter(w=>w.pdf).length},null,2));
