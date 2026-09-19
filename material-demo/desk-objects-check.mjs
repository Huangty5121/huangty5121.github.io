import {createRequire} from 'node:module';
import {mkdirSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require('/Users/tinyeh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const dest=fileURLToPath(new URL('./desk-objects-review/',import.meta.url));mkdirSync(dest,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'/Users/tinyeh/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'});
const context=await browser.newContext({viewport:{width:1672,height:941},deviceScaleFactor:1});
await context.addInitScript(()=>{if(!localStorage.getItem('ty-desk-test-init')){localStorage.setItem('ty-material-demo-v1',JSON.stringify({material:'vellum',lettering:'hand',grain:40,ink:68,relief:74,frost:3,lang:'zh',theme:'light',size:100}));localStorage.setItem('ty-desk-test-init','1');}});
const page=await context.newPage(),errors=[],badResponses=[],requests=[],checks=[];
page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)badResponses.push({status:r.status(),url:r.url()});});page.on('request',r=>requests.push(r.url()));
const base='http://127.0.0.1:8772/desk.html';
const snap=async name=>{await page.evaluate(async()=>{await document.fonts.ready;scrollTo({top:0,behavior:'instant'});await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));});await page.screenshot({path:`${dest}${name}.png`,fullPage:true});};
const navigate=async hash=>{await page.goto(`${base}#${hash}`);await page.locator('#page-title').waitFor();await page.evaluate(()=>document.fonts.ready);};
const check=async(name,fn)=>{await fn();checks.push(name);console.log(`PASS ${name}`);};
try{
 await navigate('home');await snap('desktop-home');
 await check('no autoplay, external media or PDF request before a click',async()=>{assert.equal(requests.filter(u=>!u.startsWith('http://127.0.0.1:8772/')).length,0);assert.equal(requests.filter(u=>/\.pdf(?:[?#]|$)/.test(u)).length,0);assert.equal(await page.locator('#audio').getAttribute('src'),null);assert.equal(await page.locator('#audio').evaluate(a=>a.paused),true);});
 await check('no visitor music editor or music dialog',async()=>{assert.equal(await page.locator('#music-dialog,input[type=file]').count(),0);assert.equal(await page.locator('#home-track').innerText(),'尘大师');assert.equal(await page.locator('.pin-scatter img').count(),2);});
 await check('official preview plays, pauses and survives route change',async()=>{
  await page.locator('#music-play').click();await page.waitForFunction(()=>document.querySelector('#audio').currentTime>0.1,{},{timeout:25000});
  assert.equal(await page.locator('#music-play').getAttribute('aria-pressed'),'true');
  await page.locator('.home-experience a').click();await page.locator('.archive-tabs').waitFor();assert.equal(await page.locator('#audio').evaluate(a=>a.paused),false);
  await page.locator('.wordmark').click();await page.locator('#music-play').click();assert.equal(await page.locator('#audio').evaluate(a=>a.paused),true);assert.equal(await page.locator('#music-play').getAttribute('aria-pressed'),'false');
  console.log('Official preview duration:',await page.locator('#audio').evaluate(a=>a.duration));
 });
 await navigate('experiences');await snap('desktop-experiences');
 await check('study-first tab distinguishes current, exchange and incomplete studies',async()=>{assert.equal(await page.locator('.study-record').count(),3);assert.match(await page.locator('.study-record').first().innerText(),/在读/);assert.match(await page.locator('.study-record').nth(1).innerText(),/交换/);assert.match(await page.locator('.study-record').nth(2).innerText(),/未取得/);assert.equal(await page.locator('#archive-tab-study').getAttribute('aria-selected'),'true');});
 await page.locator('#archive-tab-records').click();await page.locator('[data-group="all"]').click();
 await check('all 16 records render with available source marks; multiple rows visible',async()=>{assert.equal(await page.locator('.experience-item').count(),16);assert.equal(await page.locator('.experience-item img').count(),11);assert.ok(await page.locator('.experience-item img').evaluateAll(imgs=>imgs.every(i=>i.complete&&i.naturalWidth>0)));await page.locator('.experience-item').first().evaluate(e=>e.scrollIntoView({block:'start',behavior:'instant'}));assert.ok(await page.locator('.experience-item').evaluateAll(rows=>rows.filter(e=>e.getBoundingClientRect().top>=0&&e.getBoundingClientRect().bottom<innerHeight).length)>=3);});
 await check('experience filters and detail work',async()=>{await page.locator('[data-group="projects"]').click();assert.equal(await page.locator('.experience-item').count(),2);await page.locator('[data-group="all"]').click();await page.locator('a[href="#experience/cas"]').click();await page.locator('.document-grid').waitFor();await page.locator('.related-block a').click();assert.ok(page.url().endsWith('#work/heatwave'));await page.locator('.primary-link').click();assert.match(await page.locator('.pdf-frame').getAttribute('data'),/heatwave-heda-arxiv-v2\.pdf/);});
 await navigate('works');await check('search and filter',async()=>{await page.locator('#work-search').fill('热浪');assert.equal(await page.locator('.work-row').count(),1);await page.locator('#work-search').fill('no-match-token');assert.equal(await page.locator('#work-empty').isVisible(),true);await page.locator('#clear-search').click();assert.equal(await page.locator('.work-row').count(),8);await page.locator('[data-kind="project"]').click();assert.equal(await page.locator('.work-row').count(),1);});
 for(const width of [360,390,540,650,768,1024,1440,1672]){
  await page.setViewportSize({width,height:width<=650?844:941});
  for(const hash of ['home','works','experiences','experience/smart','note/website','work/heatwave','notes','images']){
   await navigate(hash);const sizes=await page.evaluate(()=>({w:innerWidth,body:document.body.scrollWidth,doc:document.documentElement.scrollWidth}));assert.ok(sizes.body<=sizes.w+1&&sizes.doc<=sizes.w+1,`overflow ${width} ${hash}: ${JSON.stringify(sizes)}`);
   if(hash==='home'){
    const box=await page.locator('#music-play').boundingBox();assert.ok(box.width>=42&&box.height>=40,`small play target ${width}: ${JSON.stringify(box)}`);
    const clipped=await page.locator('.mp3-screen').evaluate(e=>e.scrollHeight>e.clientHeight+1);assert.equal(clipped,false,`clipped player text ${width}`);
   }
   if([390,768,1672].includes(width)&&['home','experiences','experience/smart'].includes(hash))await snap(`${width}-${hash.replaceAll('/','-')}`);
  }checks.push(`no overflow, readable screen and usable player at ${width}px`);console.log(`PASS width ${width}`);
 }
 await page.setViewportSize({width:390,height:844});await navigate('home');await page.locator('#size').click();await page.locator('#size').click();await page.locator('#language').click();await page.locator('#theme').click();await snap('mobile-dark-en-large');
 await check('130% English/dark mobile and persistence',async()=>{await page.reload();assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');assert.equal(await page.locator('#size').innerText(),'130%');for(const hash of ['home','experiences','notes']){await navigate(hash);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);if(hash==='home')assert.equal(await page.locator('.mp3-screen').evaluate(e=>e.scrollHeight>e.clientHeight+1),false);}});
 await navigate('home');await check('keyboard operation and settings preservation',async()=>{await page.locator('#music-play').focus();assert.equal(await page.locator('#music-play').evaluate(e=>document.activeElement===e),true);await page.locator('#settings-open').click();assert.equal(await page.locator('#pref-ink').inputValue(),'68');await page.keyboard.press('Escape');});
 const failurePage=await context.newPage();await failurePage.route('https://audio-ssl.itunes.apple.com/**',r=>r.abort());await failurePage.goto(`${base}#home`);await failurePage.locator('#music-play').click();await failurePage.waitForFunction(()=>document.querySelector('#music-play').dataset.state==='error');await failurePage.waitForTimeout(200);assert.equal(await failurePage.locator('#music-play').getAttribute('data-state'),'error');checks.push('unavailable preview keeps an inline error, not a fake playing state');await failurePage.unroute('https://audio-ssl.itunes.apple.com/**');await failurePage.locator('#music-play').click();await failurePage.waitForFunction(()=>document.querySelector('#audio').currentTime>0.1,{},{timeout:25000});checks.push('retry after failed media load successfully plays');await failurePage.close();
 assert.deepEqual(errors,[]);assert.deepEqual(badResponses,[]);checks.push('no uncaught page errors or failed production asset responses');
 writeFileSync(`${dest}browser-results.json`,JSON.stringify({result:'passed',checks,errors,badResponses,limitations:['Independent Chromium, not real iOS/Safari/foldable hardware','2.5D layout; no 3D model or physics engine','Two generated pin renders, other rows use source marks']},null,2));
 console.log(JSON.stringify({result:'passed',checks:checks.length}));
}catch(e){writeFileSync(`${dest}browser-results.json`,JSON.stringify({result:'failed',error:e.stack,checks,errors,badResponses},null,2));await snap('failure').catch(()=>{});throw e;}finally{await browser.close();}
