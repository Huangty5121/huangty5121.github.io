import {createRequire} from 'node:module';
import {mkdirSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require('/Users/tinyeh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const dest=fileURLToPath(new URL('./table-review/',import.meta.url));
mkdirSync(dest,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'/Users/tinyeh/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'});
const page=await browser.newPage({viewport:{width:1440,height:960}});
const errors=[],checks=[],httpErrors=[];
page.on('pageerror',e=>errors.push(e.message));
page.on('response',r=>{if(r.url().startsWith('http://127.0.0.1:8772/')&&r.status()>=400)httpErrors.push([r.status(),r.url()]);});
const settle=()=>page.evaluate(async()=>{await document.fonts.ready;await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));});
const go=async hash=>{await page.goto(`http://127.0.0.1:8772/table/#${hash}`);await settle();};
const capture=async name=>{await page.mouse.move(0,0);await page.evaluate(async()=>{for(const img of document.images)img.loading='eager';await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));scrollTo({top:0,behavior:'instant'});});await settle();await page.screenshot({path:`${dest}${name}.png`,fullPage:true});};
const overflow=async label=>{
  const metrics=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,elements:[...document.querySelectorAll('main *')].filter(e=>getComputedStyle(e).visibility!=='hidden'&&e.getBoundingClientRect().width>0).map(e=>({tag:e.tagName,c:e.className,left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right})).filter(e=>e.right>innerWidth+1||e.left<-.5)}));
  assert.ok(metrics.scroll<=metrics.width+1,`${label} overflow: ${JSON.stringify(metrics)}`);
};
try{
  await go('home');
  assert.equal(await page.locator('link[rel=stylesheet]').count(),1,'No inherited old layout CSS');
  assert.equal(await page.locator('#audio').evaluate(e=>e.paused&&!e.getAttribute('src')),true,'No autoplay or media request');
  await capture('home-desktop');
  assert.equal(await page.evaluate(()=>performance.getEntriesByType('resource').some(r=>r.name.endsWith('/assets/wenkai.woff2'))),false,'Known home lettering must not download full 6.9MB font');
  checks.push('Small lettering subset loaded; full CJK fallback not requested by current homepage');
  await page.locator('.folder-caption').click();
  await page.locator('.travel-mark').waitFor({state:'attached',timeout:2000});
  await page.locator('.travel-mark').waitFor({state:'detached',timeout:2000});
  await settle();await capture('background-desktop');
  checks.push('Shared university mark moves from folder to organisation index and cleans up');
  assert.equal(await page.locator('[data-org]').count(),12);
  assert.equal(await page.locator('.context-study').count(),1);
  assert.equal(await page.locator('.context-role').count(),3);
  await page.locator('#org-tsinghua').click();
  assert.equal(await page.locator('.context-study').count(),1);
  assert.equal(await page.locator('.context-role').count(),1);
  assert.match(await page.locator('.context-study').innerText(),/独立学位/);
  await page.locator('#org-qiyuan').click();const q=await page.locator('.context-role').getAttribute('href');
  await page.locator('#org-iluvatar').click();assert.equal(await page.locator('.context-role').getAttribute('href'),q);
  checks.push('12 organisation marks; study before roles; joint placement points to one canonical record');
  await go('background/years');
  assert.equal(await page.locator('.record-row').count(),16);
  assert.equal(await page.locator('.record-row a').evaluateAll(a=>new Set(a.map(e=>e.hash)).size),16);
  await page.locator('#record-group').selectOption('current');assert.equal(await page.locator('.record-row').count(),5);
  for(const group of ['work','research']){await page.locator('#record-group').selectOption(group);assert.equal(await page.locator('[data-record=shi]').count(),1);}
  await page.locator('#record-query').fill('zz-not-found');assert.equal(await page.locator('.record-row').count(),0);
  await page.locator('#record-query').fill('');await page.locator('#record-group').selectOption('all');
  await capture('timeline-desktop');
  checks.push('16 unique records; five CV-declared current roles; overlapping categories and empty search');
  await go('background/credentials');assert.equal(await page.locator('.credential-row').count(),4);assert.equal(await page.locator('.credential-row a').count(),0);
  checks.push('Memberships and certification separated; no invented verification links');
  await go('works');assert.equal(await page.locator('.work-row').count(),8);
  await page.locator('#work-kind').selectOption('project');assert.equal(await page.locator('.work-row').count(),1);
  await page.locator('#work-kind').selectOption('all');await page.locator('#work-query').fill('crypto');assert.equal(await page.locator('.work-row').count(),1);
  await page.locator('.work-row a').click();await settle();assert.match(await page.locator('.version').innerText(),/预印本/);
  await page.locator('a[href="#paper/crypto"]').click();await settle();
  const pdf=await page.locator('.pdf-reader').getAttribute('src');const pdfResponse=await page.request.get(new URL(pdf,page.url()).href);assert.equal(pdfResponse.status(),200);assert.match(pdfResponse.headers()['content-type'],/pdf/);
  checks.push('8 works with search/filter; version disclosure; real local PDF responds 200');
  await go('note/website');assert.equal(await page.locator('.draft-notice').count(),1);
  await go('images');assert.equal(await page.locator('.gallery img').count(),4);
  for(const img of await page.locator('.gallery img').all())assert.match(await img.getAttribute('alt'),/生成/);
  checks.push('Draft writing and generated material studies are explicitly labelled');
  for(const width of [360,390,540,768,1024,1440]){
    await page.setViewportSize({width,height:900});await go('home');await overflow(`home ${width}`);
    if([390,768].includes(width))await capture(`home-${width}`);
    for(const selector of ['.folder-caption','.paper-label','.photo-caption','.note-label','#player-toggle']){
      const el=page.locator(selector);await el.scrollIntoViewIfNeeded();
      assert.ok(await el.evaluate(e=>{const r=e.getBoundingClientRect();const target=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return e===target||e.contains(target)||target?.contains(e);}),`${selector} occluded at ${width}`);
    }
    assert.ok(await page.locator('#player-toggle').evaluate(e=>{const r=e.getBoundingClientRect();return r.width>=40&&r.height>=40;}),'Touchable play target');
    for(const hash of ['background','background/years','background/credentials','works','work/heatwave','experience/gov-committee','notes']){await go(hash);await overflow(`${hash} ${width}`);}
    if(width===390){await go('organisation/polyu');await capture('background-390');await page.locator('.atlas-others summary').click();await page.locator('#org-hksar').click();await settle();assert.equal(await page.locator('.context-role').count(),2);assert.equal(await page.locator('#org-context-title').evaluate(e=>e===document.activeElement),true);await capture('government-390');}
    checks.push(`Responsive geometry and exposed entry controls at ${width}px`);
  }
  await page.evaluate(()=>localStorage.setItem('ty-table-v1',JSON.stringify({lang:'en',theme:'dark',size:130,grain:40,ink:68,relief:74,frost:3,material:'vellum'})));
  await page.reload();await settle();
  assert.equal(await page.locator('html').getAttribute('lang'),'en');
  assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
  assert.equal(await page.locator('html').getAttribute('data-size'),'130');
  for(const width of [360,540,768,1440]){
    await page.setViewportSize({width,height:900});
    for(const hash of ['home','background','background/years','background/credentials','work/heatwave','notes']){await go(hash);await overflow(`EN dark 130% ${hash} ${width}`);if(width===360&&['home','background'].includes(hash))await capture(`${hash}-dark-large`);}
  }
  checks.push('English, dark, 130% text across 360/540/768/1440 widths');
  await go('home');await page.locator('#settings-open').click();assert.equal(await page.locator('#preferences').evaluate(e=>e.open),true);
  await page.locator('[data-setting="ink"]').fill('90');assert.equal(await page.locator('#ink-displacement').getAttribute('scale'),'3');
  await page.locator('[data-setting="size"]').selectOption('115');await page.locator('[data-setting="material"]').selectOption('paper');
  await page.keyboard.press('Escape');assert.equal(await page.locator('#settings-open').evaluate(e=>e===document.activeElement),true);
  await page.reload();await settle();assert.equal(await page.locator('html').getAttribute('data-size'),'115');assert.equal(await page.locator('.note-object').getAttribute('data-material'),'paper');
  checks.push('Settings operate, persist and restore focus; dry ink remains an opacity/edge texture');
  await page.route('**/AudioPreview*/**',r=>r.abort());await page.locator('#player-toggle').click();await page.waitForFunction(()=>document.getElementById('music-status')?.textContent.includes('unavailable'),undefined,{timeout:15000});
  assert.equal(await page.locator('#player-toggle').getAttribute('aria-pressed'),'false');
  checks.push('Explicit failed-audio state; no fake playing state');
  await go('bad/route');assert.match(await page.locator('main').innerText(),/Page not found/);
  await page.emulateMedia({reducedMotion:'reduce'});await go('home');await page.locator('.folder-caption').click();await settle();
  assert.equal(await page.locator('.travel-mark').count(),0);
  assert.equal(await page.locator('#org-polyu').count(),1);
  checks.push('Reduced-motion preference skips spatial transition without disabling navigation');
  assert.deepEqual(errors,[]);
  assert.deepEqual(httpErrors,[]);
  writeFileSync(`${dest}checks.json`,JSON.stringify({result:'passed',checks,errors,actualAudioPlayback:'not part of deterministic test'},null,2));
  console.log(JSON.stringify({result:'passed',checks,errors},null,2));
}catch(error){await capture('failure').catch(()=>{});writeFileSync(`${dest}checks.json`,JSON.stringify({result:'failed',checks,error:error.message,errors},null,2));console.error(error);process.exitCode=1;}finally{await browser.close();}
