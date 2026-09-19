import {createRequire} from 'node:module';
import {mkdirSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const require=createRequire(import.meta.url);
const {chromium}=require('/Users/tinyeh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const phase=process.argv[2]??'before', flow=process.argv[3]??'home';
const dest=fileURLToPath(new URL(`./design-audit-2026-09-12/${phase}/`,import.meta.url));mkdirSync(dest,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'/Users/tinyeh/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'});
const results=[];
try{for(const width of [1440,390]){
 const context=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:1});
 await context.addInitScript(()=>localStorage.setItem('ty-desk-v1',JSON.stringify({material:'vellum',lettering:'hand',grain:40,ink:68,relief:74,frost:3,lang:'zh',theme:'light',size:100})));
 const page=await context.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`http://127.0.0.1:8772/desk.html#${flow==='home'?'home':'experiences'}`);
 await page.evaluate(async()=>{await document.fonts.ready;await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));scrollTo(0,0);});
 await page.screenshot({path:`${dest}${flow}-${width}.png`,fullPage:true});
 await page.screenshot({path:`${dest}${flow}-${width}-viewport.png`});
 if(flow!=='home'){
  results.push({width,positions:await page.evaluate(()=>Object.fromEntries(['.education-sheet','.current-roles','.organisation-grid','.membership-records'].map(s=>{const r=document.querySelector(s).getBoundingClientRect();return [s,{top:r.top+scrollY,height:r.height}]})))});
  await page.locator('#org-polyu').scrollIntoViewIfNeeded();
  const before=await page.evaluate(()=>({scroll:scrollY,button:document.querySelector('#org-polyu').getBoundingClientRect().top}));
  await page.locator('#org-polyu').click();
  await page.screenshot({path:`${dest}org-selected-${width}.png`});
  results.push({width,selection:{before,after:await page.evaluate(()=>({scroll:scrollY,button:document.querySelector('#org-polyu').getBoundingClientRect().top,context:document.querySelector('#organisation-context').getBoundingClientRect().top}))}});
  await page.locator('[data-close-org]').click();
  await page.locator('.membership-records summary').click();
  await page.locator('.membership-records').scrollIntoViewIfNeeded();
  await page.screenshot({path:`${dest}credentials-${width}.png`});
 }
 results.push({width,flow,errors});await context.close();
}}finally{await browser.close();}
writeFileSync(`${dest}${flow}-measurements.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
