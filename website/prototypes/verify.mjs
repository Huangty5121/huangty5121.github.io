import {createRequire} from 'node:module';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {experiences} from '../content.mjs';
import {currentIds,researchIds,variants,dateKey} from './experience.mjs';
import * as OpenCC from 'opencc-js';

const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base=process.env.PREVIEW_URL || 'http://127.0.0.1:4180';
const here=dirname(fileURLToPath(import.meta.url));
const reportDir=join(here,'../review/layout-prototypes');
await mkdir(join(reportDir,'screenshots'),{recursive:true});
const zh2t=OpenCC.Converter({from:'cn',to:'hk'});
const results=[],failures=[];
const assert=(condition,message)=>{if(!condition)throw new Error(message);};
const browser=await chromium.launch({executablePath:process.env.CHROME_EXECUTABLE || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const locales=['','en/','tw/'];
const observedErrors=[];

async function inspect({route,locale,width,dark=false,large=false,experience=false,capture=false}) {
  const context=await browser.newContext({viewport:{width,height:900},colorScheme:'light',reducedMotion:'no-preference'});
  const page=await context.newPage();
  const key=`${locale}${route}@${width}${dark?'-dark':''}${large?'-large':''}`;
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
  try {
    const response=await page.goto(`${base}/${locale}${route}.html`,{waitUntil:'load'});
    assert(response.status()===200,`${key}: HTTP ${response.status()}`);
    if(dark)await page.locator('[data-theme-toggle]').click();
    if(large)await page.locator('[data-text-size]').click();
    await page.evaluate(()=>document.fonts.ready);
    const layout=await page.evaluate(()=>{
      const box=e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return{x:r.x,y:r.y,width:r.width,height:r.height,font:s.fontSize,padding:s.padding,visible:e.checkVisibility({checkVisibilityCSS:true})}};
      const recordRows=[...document.querySelectorAll('[data-record]')];
      const doc=document.scrollingElement;
      const nav=document.querySelector('.desktop-nav'),actions=document.querySelector('.header-actions');
      return {height:doc.scrollHeight,overflow:doc.scrollWidth>innerWidth+1,
        theme:document.body.dataset.theme,large:document.documentElement.dataset.largeText,
        navigationOverlap:nav.checkVisibility()&&nav.getBoundingClientRect().right>actions.getBoundingClientRect().left+1,
        current:[...document.querySelectorAll('[data-current]')].map(e=>({id:e.dataset.current,...box(e)})),
        records:recordRows.map(e=>({id:e.dataset.record,heading:e.querySelector('h3').textContent,topic:e.querySelector('.exp-topic')?.textContent,mentor:e.querySelector('.exp-mentor')?.textContent,mentorHidden:!!e.querySelector('.exp-mentor')?.closest('details'),...box(e),dateX:box(e.querySelector('time')).x,logoX:box(e.querySelector('.exp-marks')).x,titleX:box(e.querySelector('h3')).x})),
        sections:[...document.querySelectorAll('.exp-section')].map(e=>({id:e.id,dates:[...e.querySelectorAll('[data-start]')].map(x=>Number(x.dataset.start))})),
        motion:[...document.querySelectorAll('.exp-record,.exp-details,.exp-skill-choices button')].some(e=>{const s=getComputedStyle(e);return s.animationName!=='none'||s.transitionDuration.split(',').some(v=>parseFloat(v)>0)}),
        clip:[...document.querySelectorAll('main h1,main h2,main h3,main p')].filter(e=>e.checkVisibility()&&getComputedStyle(e).overflow==='hidden'&&e.scrollWidth>e.clientWidth+1).map(e=>e.textContent.slice(0,60))};
    });
    assert(!layout.overflow,`${key}: horizontal overflow`);
    assert(!layout.navigationOverlap,`${key}: overlapping header controls`);
    assert(!layout.clip.length,`${key}: clipped text`);
    assert(layout.theme===(dark?'dark':'light')&&layout.large===String(large),`${key}: wrong preference state`);
    if(experience) {
      assert(layout.current.length===6&&currentIds.every(id=>layout.current.some(r=>r.id===id&&r.visible)),`${key}: missing current appointment`);
      assert(layout.records.length===17,`${key}: missing records`);
      for(const record of layout.records) {
        const source=experiences.find(e=>e.id===record.id);
        const expected=locale==='en/'?source.name.en:locale==='tw/'?zh2t(source.name.zh):source.name.zh;
        assert(record.heading===expected,`${key}: institution must be the heading for ${record.id}`);
        assert(record.visible&&!record.mentorHidden,`${key}: hidden record or supervisor ${record.id}`);
        assert(record.padding==='12px 0px',`${key}: inconsistent record padding ${record.id}`);
        if(researchIds.includes(record.id))assert(record.topic,`${key}: missing topic ${record.id}`);
        if(source.mentor||record.id==='polysmart')assert(record.mentor?.includes('Supervisor'),`${key}: missing supervisor ${record.id}`);
      }
      for(const field of ['logoX','titleX'])assert(Math.max(...layout.records.map(r=>r[field]))-Math.min(...layout.records.map(r=>r[field]))<1,`${key}: misaligned ${field}`);
      for(const section of layout.sections)assert(section.dates.every((n,i,a)=>i===0||a[i-1]>=n),`${key}: incorrect chronology ${section.id}`);
      assert(!layout.motion,`${key}: unexpected motion`);
      assert(await page.locator('details[open]').count()===0,`${key}: disclosures should begin closed`);
      if(capture) {
        await page.screenshot({path:join(reportDir,'screenshots',`${locale.replace('/','-')}${route}-${width}${dark?'-dark-large':''}.png`),fullPage:true});
        await page.screenshot({path:join(reportDir,'screenshots',`${locale.replace('/','-')}${route}-${width}${dark?'-dark-large':''}-top.png`)});
      }
      await page.locator('#record-qiyuan summary').click();
      await page.locator('#record-x-microbial summary').click();
      assert(await page.locator('#record-qiyuan details').getAttribute('open')!==null,`${key}: first disclosure unexpectedly closed`);
      assert(await page.locator('#record-x-microbial details').getAttribute('open')!==null,`${key}: second disclosure failed`);
      assert(!await page.evaluate(()=>document.scrollingElement.scrollWidth>innerWidth+1),`${key}: expanded content overflows`);
    } else if(capture) await page.screenshot({path:join(reportDir,'screenshots',`${locale.replace('/','-')}${route}-${width}.png`),fullPage:true});
    assert(errors.length===0,`${key}: ${errors.join('; ')}`);
    results.push({key,...layout,errors});
  } catch(error) {failures.push(error.message);observedErrors.push(...errors);}
  finally {await context.close();}
}

const jobs=[];
for(const locale of locales)for(const variant of variants)for(const width of [320,390,768,1440,1920])for(const dark of [false,true])jobs.push({route:`experience-${variant}`,locale,width,dark,large:dark,experience:true,capture:!locale&&!dark&&[390,1440].includes(width)||locale==='en/'&&dark&&width===320});
const mainRoutes=['index','collection','notes','news','about','writing-modernization','project-ninetoothed','project-social-innovation','work-structrace','read-crypto','card'];
for(const locale of locales)for(const route of mainRoutes)for(const width of [390,1440])jobs.push({route,locale,width,capture:!locale&&['index','collection','about','news','notes'].includes(route)});
// Two independent contexts at a time; every run starts without saved preferences.
async function worker(){while(jobs.length){const job=jobs.shift();await inspect(job);}}
await Promise.all([worker(),worker()]);

try {
  const context=await browser.newContext({viewport:{width:390,height:900}});
  const page=await context.newPage();
  await page.goto(`${base}/experience-c.html`,{waitUntil:'load'});
  await page.locator('#skill-tab-computing').focus();await page.keyboard.press('ArrowRight');
  assert(await page.locator('#skill-tab-engineering').getAttribute('aria-selected')==='true','Keyboard skill switching failed');
  assert(await page.locator('#skill-panel-engineering').isVisible(),'Engineering panel not visible');
  await page.locator('#skill-tab-strategy').click();
  assert(await page.locator('#skill-panel-strategy').isVisible(),'Strategy panel not visible');
  await page.locator('#record-qiyuan summary').focus();await page.keyboard.press('Enter');
  assert(await page.locator('#record-qiyuan details').getAttribute('open')!==null,'Keyboard disclosure failed');
  await page.locator('.preview-toolbar a[href="experience-a.html"]').click();
  await page.waitForURL('**/experience-a.html');
  assert(await page.locator('[data-variant=a]').count()===1,'Soft navigation to A failed');
  await page.locator('.preview-toolbar a[href="experience-c.html"]').click();
  await page.waitForURL('**/experience-c.html');
  await page.locator('#skill-tab-engineering').click();
  assert(await page.locator('#skill-panel-engineering').isVisible(),'Workspace after soft navigation failed');
  await page.locator('.language-link[href$="en/experience-c.html"]').click();
  await page.waitForURL('**/en/experience-c.html');
  assert(await page.locator('[data-variant=c]').count()===1,'Language switch lost selected variant');
  await page.goto(`${base}/experience-polysmart.html`);
  await page.waitForURL('**/experience.html#record-polysmart');
  await page.waitForFunction(()=>Math.abs(document.querySelector('#record-polysmart').getBoundingClientRect().top)<160);
  await page.goto(`${base}/about.html#tools`);await page.waitForURL('**/experience.html#tools');
  assert(await page.locator('.exp-capabilities').count()===1,'Legacy skills redirect failed');
  await page.goto(`${base}/about.html`,{waitUntil:'load'});
  await page.locator('[data-impression-tab="glm"]').click();
  assert(await page.locator('[data-impression-tab="glm"]').getAttribute('aria-selected')==='true','About reader tabs failed');
  await page.locator('[data-cabinet-open]').first().click();
  assert(await page.locator('#drinks-drawer').evaluate(e=>e.open),'Drinks drawer failed');
  await page.keyboard.press('Escape');
  assert(!await page.locator('#drinks-drawer').evaluate(e=>e.open),'Drinks drawer Escape failed');
  await context.close();
}catch(error){failures.push(`Interaction: ${error.message}`);}

// Assertions independent of rendering: the CV dates and frozen prose must remain exact.
assert(dateKey('2024 —')>dateKey('2023.12 — 2024.01'),'Year-only dates collide with previous December');
const baselineHashes=JSON.parse(await readFile(join(reportDir,'baseline-hashes.json'),'utf8'));
for(const [file,digest] of Object.entries(baselineHashes)) {
  const data=await readFile(join(websiteRoot(),'../material-demo/dist/site',file));
  if(createHash('sha256').update(data).digest('hex')!==digest)failures.push(`Production changed: ${file}`);
}
for(const locale of locales)for(const route of ['index','about']) {
  const context=await browser.newContext();const page=await context.newPage();
  const selector=route==='index'?'.personal-prose':'.portrait-reading';
  await page.goto(`${base}/${locale}${route}.html`);const preview=await page.locator(selector).allTextContents();
  const baselineHTML=await readFile(join(websiteRoot(),'../material-demo/dist/site',locale,`${route}.html`),'utf8');
  const original=await page.evaluate(({html,selector})=>[...new DOMParser().parseFromString(html,'text/html').querySelectorAll(selector)].map(e=>e.textContent),{html:baselineHTML,selector});
  if(JSON.stringify(preview)!==JSON.stringify(original))failures.push(`Frozen prose changed: ${locale}${route}`);
  await context.close();
}
function websiteRoot(){return dirname(here);}
await browser.close();
await writeFile(join(reportDir,'verification.json'),JSON.stringify({checked:results.length,failures,observedErrors,results},null,2));
console.log(JSON.stringify({checked:results.length,failures,heights:results.filter(r=>/^experience-[abc]@(390|1440)$/.test(r.key)).map(r=>({key:r.key,height:r.height}))},null,2));
if(failures.length)process.exitCode=1;
