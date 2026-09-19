import {readFile,stat,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {join,dirname} from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
const folder=dirname(fileURLToPath(import.meta.url));
const dist=join(folder,'dist');
const html=await readFile(join(dist,'index.html'),'utf8');
const css=await readFile(join(dist,'style.css'),'utf8');
const js=await readFile(join(dist,'app.js'),'utf8');
const checks=[];
function check(name,fn){fn();checks.push({name,passed:true});}
check('JavaScript syntax',()=>assert.equal(spawnSync(process.execPath,['--check',join(dist,'app.js')]).status,0));
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
check('Unique element IDs',()=>assert.equal(new Set(ids).size,ids.length));
const knownIds=[...ids,...[...js.matchAll(/\.id\s*=\s*'([^']+)'/g)].map(m=>m[1])];
check('Script element references',()=>{for(const m of js.matchAll(/\$\('([^']+)'\)/g))assert(knownIds.includes(m[1]),m[1]);});
check('Accessible label targets',()=>{for(const m of html.matchAll(/(?:aria-labelledby|aria-controls|for)="([^"]+)"/g))for(const id of m[1].split(' '))assert(knownIds.includes(id),id);});
const assets=new Set([...html.matchAll(/(?:src|href)="([^"#][^"]*)"/g),...css.matchAll(/url\(['"]?([^'"\)]+)['"]?\)/g)].map(m=>m[1]).filter(v=>!v.startsWith('#')));
assets.add('assets/fold.jpg');assets.add('assets/sketch.jpg');assets.add('assets/metal.jpg');
for(const asset of assets){assert(!asset.includes('://'),'No runtime external resource expected');assert((await stat(join(dist,asset))).size>0,asset);}
checks.push({name:'All local static assets exist',passed:true,count:assets.size});
// Pure parameter tests only. This does not emulate a browser or certify rendering.
const stateSource=js.slice(js.indexOf('  const presets ='),js.indexOf('  let state ='));
const sanitize=vm.runInNewContext(`${stateSource}; sanitize`);
check('Safe defaults',()=>{assert.equal(sanitize(null).grain,18);assert.equal(sanitize(null).lang,'zh');});
check('Ranges clamp non-finite and out-of-range values',()=>{const s=sanitize({grain:900,ink:-20,relief:Infinity,frost:NaN});assert.equal(s.grain,40);assert.equal(s.ink,0);assert.equal(s.relief,35);assert.equal(s.frost,3);});
check('Unknown preferences are ignored',()=>{const s=sanitize({theme:'javascript:',material:'glass',size:999,lang:'bad'});assert.equal(s.theme,'light');assert.equal(s.material,'paper');assert.equal(s.size,100);assert.equal(s.lang,'zh');});
check('Custom note length is bounded',()=>assert.equal(sanitize({sample:{zh:'文'.repeat(200)}}).sample.zh.length,90));
const copySource=js.slice(js.indexOf('  const copy ='),js.indexOf('  const t ='));
const copy=vm.runInNewContext(`${copySource}; copy`);
check('All static copy keys translated',()=>{for(const m of html.matchAll(/data-(?:i18n|alt|aria)="([^"]+)"/g)){assert.equal(typeof copy.zh[m[1]],'string',m[1]);assert.equal(typeof copy.en[m[1]],'string',m[1]);}});
check('Translations have matching keys',()=>assert.deepEqual(Object.keys(copy.zh).sort(),Object.keys(copy.en).sort()));
check('No Three.js or continuous animation loop',()=>{assert(!/three\.js|requestAnimationFrame\(animate|setInterval/.test(js));});
const result={checkedAt:new Date().toISOString(),checks,browserRuntime:'not tested',visualQA:'not performed',mobileSafari:'not tested',webMCP:'not verified in supported browser'};
await writeFile(join(folder,'validation.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
