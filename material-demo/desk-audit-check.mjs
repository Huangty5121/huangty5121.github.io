import {createRequire} from 'node:module';
import {mkdirSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require('/Users/tinyeh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const sharp=require('/Users/tinyeh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const dest=fileURLToPath(new URL('./design-audit-2026-09-12/final/',import.meta.url));mkdirSync(dest,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'/Users/tinyeh/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'});
const checks=[],errors=[];
const page=await browser.newPage({viewport:{width:1440,height:900}});
page.on('pageerror',e=>errors.push(e.message));
await page.addInitScript(()=>localStorage.setItem('ty-desk-v1',JSON.stringify({material:'vellum',lettering:'hand',grain:40,ink:68,relief:74,frost:3,lang:'zh',theme:'light',size:100})));
const settle=()=>page.evaluate(async()=>{await document.fonts.ready;await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));});
const fits=async()=>assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
const rowPosition=async()=>assert.ok(await page.evaluate(()=>{const g=document.querySelector('.organisation-grid'),c=document.querySelector('#organisation-context'),bs=[...g.querySelectorAll('[data-org]')],i=bs.findIndex(b=>b.getAttribute('aria-expanded')==='true'),cols=getComputedStyle(g).gridTemplateColumns.split(/\s+/).length;return bs[Math.min(bs.length-1,(Math.floor(i/cols)+1)*cols-1)].nextElementSibling===c;}));
try{
 await page.goto('http://127.0.0.1:8772/desk.html#experiences');await settle();
 assert.equal(await page.locator('.education-item:visible').count(),1);
 await page.locator('.earlier-studies summary').click();assert.equal(await page.locator('.education-item:visible').count(),3);
 await page.locator('[data-group="research"]').click();assert.equal(await page.locator('.earlier-studies').getAttribute('open'),'');
 await page.locator('[data-group="organisations"]').click();checks.push('Current study leads; other studies remain available and open state survives filters');
 for(const target of ['study','current','records','credentials']){
  await page.locator(`[data-background-jump="${target}"]`).click();
  const position=await page.locator(`#background-${target}`).evaluate(e=>{const h=e.querySelector('h2,summary'),r=h.getBoundingClientRect();return {top:r.top,bottom:r.bottom,viewport:innerHeight,focused:h===document.activeElement};});
  assert.ok(position.top>=0&&position.bottom<position.viewport&&position.focused,`${target}: ${JSON.stringify(position)}`);
 }
 assert.equal(await page.locator('.membership-records').getAttribute('open'),'');
 assert.equal(await page.locator('.credential-groups section').count(),2);
 assert.equal(await page.locator('.credential-groups li').count(),4);
 assert.equal(await page.locator('.credential-groups a').count(),0);
 checks.push('Page index lands on each section; credentials open without fabricated proof links');
 await page.locator('.earlier-studies summary').click();
 for(const width of [360,390,650,768,851,1024,1440]){
  await page.setViewportSize({width,height:900});await settle();
  for(const id of ['polyu','iluvatar','hksar']){
   await page.locator(`#org-${id}`).click();await rowPosition();await fits();
   assert.ok(await page.locator(`#org-${id}`).evaluate(e=>{const r=e.getBoundingClientRect();return r.top>=0&&r.bottom<innerHeight;}));
   await page.locator('[data-close-org]').click();
   assert.equal(await page.locator(`#org-${id}`).evaluate(e=>e===document.activeElement),true);
  }
  checks.push(`Selected row and source badge remain together at ${width}px`);
 }
 await page.locator('#org-iluvatar').click();await page.locator('#selected-organisation').focus();
 for(const width of [390,1440,768]){await page.setViewportSize({width,height:900});await settle();await rowPosition();assert.equal(await page.locator('#selected-organisation').evaluate(e=>e===document.activeElement),true);}
 checks.push('Expanded records reposition to the correct row on resize without losing keyboard focus');
 await page.locator('#language').click();await page.locator('#size').click();await page.locator('#size').click();await page.locator('#theme').click();
 await page.setViewportSize({width:390,height:900});await settle();await rowPosition();await fits();
 await page.locator('[data-background-jump="credentials"]').click();await page.screenshot({path:`${dest}credentials-dark-large.png`});
 await page.locator('.crumb a').first().click();await settle();await fits();
 assert.equal(await page.locator('.home-experience a').getAttribute('href'),'#experiences');
 assert.ok(await page.locator('.dossier-object').evaluate(e=>e.complete&&e.naturalWidth>0));
 await page.locator('.home-photo img').scrollIntoViewIfNeeded();
 await page.waitForFunction(()=>{const i=document.querySelector('.home-photo img');return i.complete&&i.naturalWidth>0;});
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await settle();
 await page.screenshot({path:`${dest}home-dark-large.png`,fullPage:true});checks.push('Same folder/objects in mobile dark English 130%, no horizontal overflow');
 const metadata=await sharp(fileURLToPath(new URL('./dist/desk-assets/study-folder-v1.png',import.meta.url))).metadata();assert.ok(metadata.hasAlpha);checks.push('Generated folder preserves real alpha transparency');
 assert.deepEqual(errors,[]);
 writeFileSync(`${dest}audit-checks.json`,JSON.stringify({result:'passed',checks,errors,limits:['Chromium emulation only','No user study or independent credential verification']},null,2));
 console.log(JSON.stringify({result:'passed',checks},null,2));
}finally{await browser.close();}
for(const [name,file,width,height] of [['selection-comparison','org-selected-390.png',390,900],['home-comparison','home-1440-viewport.png',1440,900]]){
 await sharp({create:{width:width*2+16,height,channels:4,background:'#ffffff'}}).composite([{input:`${dest}../before/${file}`,left:0,top:0},{input:`${dest}${file}`,left:width+16,top:0}]).png().toFile(`${dest}${name}.png`);
}
