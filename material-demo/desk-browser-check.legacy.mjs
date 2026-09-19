// Historical pre-inline-player regression run; use desk-browser-check.mjs now.
import {createRequire} from 'node:module';
import {mkdirSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require('/Users/tinyeh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const dest=fileURLToPath(new URL('./desk-review/',import.meta.url));mkdirSync(dest,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'/Users/tinyeh/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'});
const context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1});
await context.addInitScript(()=>{if(!localStorage.getItem('ty-desk-test-init')){localStorage.setItem('ty-material-demo-v1',JSON.stringify({material:'vellum',lettering:'hand',grain:40,ink:68,relief:74,frost:3,lang:'zh',theme:'light',size:100}));localStorage.setItem('ty-desk-test-init','1');}});
const page=await context.newPage();const errors=[],badResponses=[],requests=[],checks=[];
page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)badResponses.push({status:r.status(),url:r.url()});});page.on('request',r=>requests.push(r.url()));
const base='http://127.0.0.1:8772/desk.html';
const snap=async name=>{await page.evaluate(async()=>{await document.fonts.ready;scrollTo({top:0,behavior:'instant'});await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));});await page.screenshot({path:`${dest}${name}.png`,fullPage:true});};
const navigate=async hash=>{await page.goto(`${base}#${hash}`);await page.locator('#page-title').waitFor();await page.evaluate(()=>document.fonts.ready);};
const check=async(name,fn)=>{await fn();checks.push(name);console.log(`PASS ${name}`);};
try{
 await navigate('home');await snap('desktop-home-first');
 await check('PDFs and third-party media do not load on home',async()=>{assert.equal(requests.filter(u=>/\.pdf(?:[?#]|$)/.test(u)).length,0);assert.equal(requests.filter(u=>!u.startsWith('http://127.0.0.1:8772/')).length,0);});
 await check('original settings inherited',async()=>{assert.equal(await page.locator('html').getAttribute('data-material'),'vellum');assert.equal(await page.locator('#ink-opacity').getAttribute('slope'),'0.68');});
 await page.locator('.home-folder a').click();await page.locator('#work-search').waitFor();await snap('desktop-works');
 await check('search, empty state, and reset',async()=>{await page.locator('#work-search').fill('热浪');assert.equal(await page.locator('.work-row').count(),1);await page.locator('#work-search').fill('no-match-token');assert.equal(await page.locator('#work-empty').isVisible(),true);await page.locator('#clear-search').click();assert.equal(await page.locator('.work-row').count(),8);});
 await check('work format filter',async()=>{await page.locator('[data-kind="project"]').click();assert.equal(await page.locator('.work-row').count(),1);await page.locator('[data-kind="all"]').click();});
 await page.locator('.work-row a[href="#work/heatwave"]').click();await snap('desktop-work');
 await check('paper reader and local PDF',async()=>{await page.locator('.primary-link').click();await page.locator('.pdf-frame').waitFor();assert.match(await page.locator('.pdf-frame').getAttribute('data'),/heatwave-heda-arxiv-v2\.pdf/);const r=await context.request.get('http://127.0.0.1:8772/desk-assets/heatwave-heda-arxiv-v2.pdf');assert.equal(r.status(),200);assert.ok((await r.body()).subarray(0,5).toString()==='%PDF-');});
 await snap('desktop-paper');
 await check('back goes to the associated work',async()=>{await page.goBack();await page.locator('.document-grid').waitFor();assert.ok(page.url().endsWith('#work/heatwave'));});
 await page.locator('.related-block a').click();await snap('desktop-experience-detail');
 await check('experience links back to the same work',async()=>{assert.equal(await page.locator('.related-block a').getAttribute('href'),'#work/heatwave');});
 await navigate('experiences');await snap('desktop-experiences');
 await check('experience filtering',async()=>{await page.locator('[data-group="participation"]').click();assert.equal(await page.locator('.experience-item').count(),2);await page.locator('[data-group="all"]').click();assert.equal(await page.locator('.experience-item').count(),9);});
 await navigate('notes');await snap('desktop-notes');await navigate('note/website');await snap('desktop-note');
 await check('draft is labelled',async()=>{assert.match(await page.locator('.note-tail').innerText(),/尚未定稿/);});
 await navigate('images');await snap('desktop-images');await page.locator('a[href="#image/fold"]').click();await check('gallery navigation',async()=>{await page.locator('.photo-nav a[href="#image/metal"]').click();assert.ok(page.url().endsWith('#image/metal'));});
 await navigate('structure');await snap('desktop-structure');
 await navigate('home');
 await check('audio stays local, starts paused, survives navigation, and removes',async()=>{
  await page.locator('#music-open').click();await page.locator('#music-dialog').waitFor();
  const rate=8000,data=Buffer.alloc(rate*2*4);const wav=Buffer.alloc(44+data.length);wav.write('RIFF',0);wav.writeUInt32LE(36+data.length,4);wav.write('WAVEfmt ',8);wav.writeUInt32LE(16,16);wav.writeUInt16LE(1,20);wav.writeUInt16LE(1,22);wav.writeUInt32LE(rate,24);wav.writeUInt32LE(rate*2,28);wav.writeUInt16LE(2,32);wav.writeUInt16LE(16,34);wav.write('data',36);wav.writeUInt32LE(data.length,40);data.copy(wav,44);
  await page.locator('#audio-file').setInputFiles({name:'local-playback-test.wav',mimeType:'audio/wav',buffer:wav});
  await page.waitForFunction(()=>document.querySelector('#audio').readyState>=2);assert.equal(await page.locator('#audio').evaluate(a=>a.paused),true);assert.match(await page.locator('#audio').getAttribute('src'),/^blob:/);
  await page.locator('#audio').evaluate(a=>a.play());await page.locator('[data-close="music-dialog"]').click();await page.locator('[data-nav="notes"]').click();assert.equal(await page.locator('#audio').evaluate(a=>a.paused),false);
  await page.locator('.wordmark').click();await page.locator('#music-open').click();await page.locator('#remove-audio').click();assert.equal(await page.locator('#audio').isVisible(),false);await page.keyboard.press('Escape');assert.equal(await page.locator('#music-dialog').isVisible(),false);
 });
 await check('dark, English, text size and setting persistence',async()=>{await page.locator('#theme').click();await page.locator('#language').click();await page.locator('#size').click();assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');assert.equal(await page.locator('html').getAttribute('lang'),'en');await page.reload();assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');assert.equal(await page.locator('#size').innerText(),'115%');await page.locator('#size').click();await page.locator('#size').click();});
 await snap('desktop-dark-en');await page.locator('#theme').click();await page.locator('#language').click();
 await check('material controls preserve old settings',async()=>{const before=await page.evaluate(()=>localStorage.getItem('ty-material-demo-v1'));await page.locator('#settings-open').click();await page.locator('#material').selectOption('paper');await page.locator('#pref-ink').fill('75');assert.equal(await page.locator('#ink-opacity').getAttribute('slope'),'0.75');await page.locator('#restore-material').click();assert.equal(await page.locator('#ink-opacity').getAttribute('slope'),'0.68');assert.equal(await page.evaluate(()=>localStorage.getItem('ty-material-demo-v1')),before);await page.keyboard.press('Escape');});
 for(const width of [360,390,650,768,1024,1440,1672]){
  await page.setViewportSize({width,height:width<=650?844:941});
  for(const hash of ['home','works','experiences','note/website','work/heatwave','structure','images']){
   await navigate(hash);const sizes=await page.evaluate(()=>({w:innerWidth,body:document.body.scrollWidth,doc:document.documentElement.scrollWidth}));assert.ok(sizes.body<=sizes.w+1&&sizes.doc<=sizes.w+1,`overflow ${width} ${hash}: ${JSON.stringify(sizes)}`);
   if(width===390||width===1672)await snap(`${width===390?'mobile':'wide'}-${hash.replaceAll('/','-')}`);
  }checks.push(`no overflow at ${width}px`);console.log(`PASS width ${width}`);
 }
 await page.setViewportSize({width:390,height:844});await navigate('home');await page.locator('#size').click();await page.locator('#size').click();await page.locator('#language').click();await page.locator('#theme').click();await snap('mobile-dark-en-large');
 await check('large English type on mobile',async()=>{for(const hash of ['home','works','experiences','work/heatwave','notes','structure']){await navigate(hash);const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);assert.equal(overflow,false,hash);}});
 await navigate('bad-route');await check('unknown route recovers',async()=>{assert.match(await page.locator('#page-title').innerText(),/not here/);await page.locator('main a[href="#home"]').first().click();assert.ok(page.url().endsWith('#home'));});
 await page.evaluate(()=>localStorage.removeItem('ty-desk-v1'));await page.setViewportSize({width:1672,height:941});await page.reload();await navigate('home');assert.equal(await page.locator('html').getAttribute('data-theme'),'light');assert.equal(await page.locator('html').getAttribute('lang'),'zh-CN');assert.equal(await page.locator('#size').innerText(),'A / A+');await snap('desktop-home-final');
 await page.goto('http://127.0.0.1:8772/home.html#home');await page.evaluate(()=>document.fonts.ready);await snap('previous-home-same-viewport');
 assert.deepEqual(errors,[]);assert.deepEqual(badResponses,[]);checks.push('no uncaught page errors or failed asset responses');
 writeFileSync(`${dest}browser-results.json`,JSON.stringify({result:'passed',browser:'Chromium 1223, independent test context',checks,errors,badResponses,screenshots:dest,limitations:['Not real Safari or iOS hardware','PDF embed renderer is browser-dependent; local file and fallback links verified','Audio tested with a local silent WAV, not copyrighted music']},null,2));
 console.log(JSON.stringify({result:'passed',checks:checks.length,errors,badResponses}));
}catch(e){writeFileSync(`${dest}browser-results.json`,JSON.stringify({result:'failed',error:e.stack,checks,errors,badResponses},null,2));await page.screenshot({path:`${dest}failure.png`,fullPage:true}).catch(()=>{});throw e;}finally{await browser.close();}
