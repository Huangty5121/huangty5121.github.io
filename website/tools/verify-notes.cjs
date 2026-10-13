// Scoped browser verification for the Notes index, articles and Home entry.
// Supply the provisioned Playwright through NODE_PATH; serve only dist/site.
const {chromium}=require('playwright');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const base=process.env.SITE_URL||'http://127.0.0.1:4175/';
const output=path.resolve('website/review/notes-2026-10-12');
const routes=['index.html','notes.html','writing-moon.html','writing-knowing.html','writing-understanding.html'];
fs.mkdirSync(output,{recursive:true});
(async()=>{
 const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
 const results=[];
 try{
  for(const locale of ['','tw/','en/'])for(const width of [320,1440])for(const theme of ['light','dark'])for(const large of [false,true]){
   const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
   await context.addInitScript(({theme,large})=>{localStorage.setItem('tyh-theme',theme);localStorage.setItem('tyh-large-text',String(large));},{theme,large});
   const page=await context.newPage();let errors=[];
   page.on('pageerror',error=>errors.push(error.message));
   page.on('requestfailed',request=>{if(request.url().startsWith(base))errors.push(request.url()+': '+request.failure()?.errorText);});
   for(const route of routes){
    errors=[];
    await page.goto(base+locale+route,{waitUntil:'load'});
    await page.evaluate(()=>document.fonts.ready);
    const metrics=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,h1:document.querySelectorAll('main h1').length,theme:document.body.dataset.theme,large:document.documentElement.dataset.largeText,active:document.querySelector('.desktop-nav [aria-current="page"]')?.getAttribute('href'),noteIds:[...document.querySelectorAll('main [data-note-id]')].map(element=>element.dataset.noteId),back:[...document.querySelectorAll('.note-article .reader-back')].map(element=>element.getAttribute('href')),paragraphs:document.querySelectorAll('[data-note-body]>p').length,pending:!!document.querySelector('.note-pending')}));
    const article=route.startsWith('writing-');
    const passed=metrics.overflow<=1&&metrics.h1===1&&metrics.theme===theme&&metrics.large===String(large)&&metrics.active===(route==='index.html'?'index.html':'notes.html')&&(!article||metrics.back.length===2&&metrics.back.every(url=>url==='notes.html')&&(metrics.pending||metrics.paragraphs>=8))&&(!article?metrics.noteIds.join(',')==='moon,knowing,understanding':true)&&errors.length===0;
    results.push({locale,width,theme,large,route,passed,...metrics,errors:[...errors]});
    if(locale==='tw/'&&!large&&['notes.html','writing-moon.html'].includes(route))await page.screenshot({path:path.join(output,`${route.replace('.html','')}-${width}-${theme}.png`),fullPage:true});
   }
   await context.close();
   if(results.length%30===0)console.log(`Checked ${results.length}/120 page states`);
  }
  const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  const page=await context.newPage();
  await page.goto(base+'tw/index.html');
  const audioBefore=await page.locator('#music').evaluate(element=>{element.dataset.notesTest='preserved';return true;});
  await page.locator('.home-notes [data-note-id="moon"] a').click();
  await page.waitForURL('**/tw/writing-moon.html');
  assert.equal(await page.locator('#music').getAttribute('data-notes-test'),'preserved','Same-language navigation replaced the persistent player');
  await page.locator('.reader-back').first().click();await page.waitForURL('**/tw/notes.html');
  await page.locator('[data-note-id="knowing"] a').click();await page.waitForURL('**/tw/writing-knowing.html');
  await page.locator('[data-menu-toggle]').click();
  await page.locator('#site-menu [data-text-size]').click();
  assert.equal(await page.locator('html').getAttribute('data-large-text'),'true');
  await page.locator('#site-menu [data-theme-toggle]').click();
  await page.locator('#site-menu .language-link[lang="en"]').click();await page.waitForURL('**/en/writing-knowing.html');
  assert.equal(await page.locator('html').getAttribute('lang'),'en');
  assert.equal(await page.locator('html').getAttribute('data-large-text'),'true');
  if(await page.locator('.note-pending').count()){
   await page.locator('.note-pending a[lang="zh-Hant"]').click();await page.waitForURL('**/tw/writing-knowing.html');
  }
  assert(audioBefore);
  await context.close();
  const failed=results.filter(result=>!result.passed);
  fs.writeFileSync(path.join(output,'browser-check.json'),JSON.stringify({cases:results.length,failed,interactionCheck:'passed',results},null,2));
  console.log(JSON.stringify({cases:results.length,failed:failed.length,interactionCheck:'passed'},null,2));
  if(failed.length)process.exitCode=1;
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
