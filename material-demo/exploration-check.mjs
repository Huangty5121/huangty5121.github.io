import assert from 'node:assert/strict';
import {access,readFile} from 'node:fs/promises';
import {works,experiences,notes} from './dist/desk-data.mjs';
import {education} from './dist/desk-background.mjs';
import {organisations,credentials} from './dist/desk-affiliations.mjs';
const root=new URL('./dist/',import.meta.url);
assert.equal(works.length,8);assert.equal(experiences.length,16);assert.equal(education.length,3);
assert.equal(new Set(experiences.map(e=>e.id)).size,16);
assert.equal(education[0].id,'polyu');assert.equal(notes.length,2);
assert.ok(notes.every(n=>n.draft));assert.equal(credentials.length,4);
for(const o of organisations){for(const id of o.records)assert.ok(experiences.some(e=>e.id===id));for(const id of o.study??[])assert.ok(education.some(e=>e.id===id));if(o.mark)await access(new URL('desk-assets/pins/'+o.mark,root));}
const grouped=new Set(organisations.flatMap(o=>o.records));grouped.add('academic-reviewing');assert.equal(grouped.size,16);
const pdfs=works.filter(w=>w.pdf);assert.equal(pdfs.length,3);
for(const w of pdfs){await access(new URL('desk-assets/'+w.pdf,root));await access(new URL('desk-assets/'+w.thumb,root));for(let i=1;i<=w.pages;i++)await access(new URL(`explorations/assets/papers/${w.id}-${String(i).padStart(2,'0')}.jpg`,root));}
for(const name of ['bench','drawer','editorial'])await access(new URL('explorations/assets/'+name+'.jpg',root));
const js=await readFile(new URL('explorations/lab.mjs',root),'utf8');
assert.ok(!js.includes("import {pictures"));assert.ok(!js.includes('#images'));
assert.ok(js.includes('preload')===false); // Audio's preload is set to none in HTML.
const html=await readFile(new URL('explorations/index.html',root),'utf8');assert.ok(html.includes('preload="none"'));assert.ok(!html.includes('autoplay'));
console.log(JSON.stringify({status:'passed',directions:3,works:works.length,uniqueExperiences:grouped.size,education:education.length,localPdfs:pdfs.length,credentials:credentials.length,materialGallery:false,noteDrafts:true,note:'Static content and asset checks only; browser QA is recorded separately.'},null,2));
