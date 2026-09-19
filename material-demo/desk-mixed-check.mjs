import {createRequire} from 'node:module';
import {mkdirSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require('/Users/tinyeh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const dest=fileURLToPath(new URL('./mixed-review/',import.meta.url));mkdirSync(dest,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'/Users/tinyeh/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'});
const page=await browser.newPage({viewport:{width:1440,height:900}}),checks=[],errors=[];
page.on('pageerror',e=>errors.push(e.message));
await page.addInitScript(()=>{if(!localStorage.getItem('mixed-test')){localStorage.setItem('ty-desk-v1',JSON.stringify({material:'vellum',lettering:'hand',grain:40,ink:68,relief:74,frost:3,lang:'zh',theme:'light',size:100}));localStorage.setItem('mixed-test','1');}});
const settle=()=>page.evaluate(async()=>{await document.fonts.ready;await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));});
const capture=async name=>{await page.evaluate(async()=>{for(const i of document.images)i.loading='eager';await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));scrollTo({top:0,behavior:'instant'});});await settle();await page.screenshot({path:`${dest}${name}.png`,fullPage:true});};
try{
 await page.goto('http://127.0.0.1:8772/desk.html#home');await capture('home-wide');await page.screenshot({path:`${dest}home-viewport.png`});
 await page.locator('.home-experience a').click();await settle();await capture('study-wide');
 assert.equal(await page.locator('.study-record').count(),3);assert.equal(await page.locator('.current-roles,.organisation-grid,.experience-list,.background-index').count(),0);
 checks.push('Study-first view has no repeated current-role lists or secondary sidebar');
 await page.locator('#archive-tab-records').click();await capture('records-wide');assert.equal(await page.locator('.experience-item').count(),16);
 assert.equal(await page.locator('.experience-item a').evaluateAll(a=>new Set(a.map(x=>x.hash)).size),16);
 await page.locator('[data-group="current"]').click();assert.equal(await page.locator('.experience-item').count(),5);
 await page.locator('[data-group="research"]').click();assert.ok(await page.locator('a[href="#experience/shi"]').count());
 await page.locator('[data-group="work"]').click();assert.ok(await page.locator('a[href="#experience/shi"]').count());checks.push('Sixteen canonical records, five CV-declared current roles, overlapping category membership');
 await page.locator('#archive-tab-organisations').click();await capture('organisations-wide');await page.locator('#org-polyu').click();assert.equal(await page.locator('.organisation-records a').count(),3);assert.equal(await page.locator('.organisation-study').count(),1);
 await page.keyboard.press('Escape');assert.equal(await page.locator('#org-polyu').evaluate(e=>e===document.activeElement),true);
 await page.locator('#archive-tab-credentials').click();await capture('credentials-wide');assert.equal(await page.locator('.credential-groups li').count(),4);assert.equal(await page.locator('.credential-groups a').count(),0);checks.push('Organisation relationships and credential evidence boundaries preserved');
 await page.locator('#archive-tab-study').focus();await page.keyboard.press('ArrowRight');assert.equal(await page.locator('#archive-tab-records').evaluate(e=>e===document.activeElement),true);await page.keyboard.press('Enter');assert.equal(await page.locator('#archive-tab-records').getAttribute('aria-selected'),'true');checks.push('Keyboard manual-activation tab navigation');
 for(const width of [360,390,540,650,768,1024,1440,1672]){
  await page.setViewportSize({width,height:900});await page.locator('.wordmark').click();await settle();
  if([390,768].includes(width))await capture(`home-${width}`);
  const overflow=await page.evaluate(()=>[...document.querySelectorAll('main *')].map(e=>({c:e.className,r:e.getBoundingClientRect()})).filter(x=>x.r.right>innerWidth+1||x.r.left<0).map(x=>({c:x.c,left:x.r.left,right:x.r.right})));
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`home overflow ${width}: ${JSON.stringify(overflow)}`);
  for(const selector of ['.home-folder .piece-title','.home-experience .piece-title','.home-slip h2','#music-play']){
   const el=page.locator(selector);await el.scrollIntoViewIfNeeded();
   assert.ok(await el.evaluate(e=>{const r=e.getBoundingClientRect(),hit=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return e.contains(hit)||hit?.contains(e);}),`${selector} occluded at ${width}`);
  }
  await page.locator('.home-experience a').click();
  for(const id of ['study','records','organisations','credentials']){await page.locator(`#archive-tab-${id}`).click();await settle();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`${id} overflow ${width}`);if(width===390)await capture(`${id}-390`);}
  checks.push(`Readable exposed controls and responsive views at ${width}px`);
 }
 await page.setViewportSize({width:390,height:900});await page.locator('#size').click();await page.locator('#size').click();await page.locator('#language').click();await page.locator('#theme').click();
 await page.locator('.wordmark').click();await capture('home-dark-large');assert.equal(await page.locator('.mp3-screen').evaluate(e=>e.scrollHeight>e.clientHeight+1),false);
 await page.locator('.home-experience a').click();for(const id of ['study','records','organisations','credentials']){await page.locator(`#archive-tab-${id}`).click();await settle();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`large ${id}`);}await capture('credentials-dark-large');
 checks.push('130% English dark mobile');assert.deepEqual(errors,[]);
 writeFileSync(`${dest}checks.json`,JSON.stringify({result:'passed',checks,errors},null,2));console.log(JSON.stringify({result:'passed',checks},null,2));
}catch(e){console.log(e.message);await capture('failure').catch(()=>{});throw e;}finally{await browser.close();}
