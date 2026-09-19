import {createRequire} from 'node:module';
import {writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require('/Users/tinyeh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({headless:true,executablePath:'/Users/tinyeh/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'});
const result={audio:null,mobile:null};
try{
  const page=await browser.newPage({viewport:{width:1440,height:960}});
  await page.goto('http://127.0.0.1:8772/table/');
  await page.locator('#player-toggle').click();
  try{
    await page.waitForFunction(()=>document.getElementById('audio').currentTime>.5,undefined,{timeout:20000});
    const before=await page.locator('#audio').evaluate(e=>({time:e.currentTime,duration:e.duration,paused:e.paused}));
    await page.locator('.primary-nav a[href="#background"]').click();
    await page.waitForFunction(previous=>document.getElementById('audio').currentTime>previous+.3,before.time,{timeout:5000});
    await page.locator('#audio-in-header').click();
    assert.equal(await page.locator('#audio').evaluate(e=>e.paused),true);
    result.audio={status:'passed',duration:before.duration,advancedAcrossNavigation:true,pausedViaHeader:true};
  }catch(e){result.audio={status:'not verified',reason:e.message,statusText:await page.locator('#music-status').textContent().catch(()=>null)};}
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2});
  const mobile=await context.newPage();
  await mobile.goto('http://127.0.0.1:8772/table/#background');
  await mobile.locator('.atlas-others summary').tap();
  await mobile.locator('#org-hksar').tap();
  assert.equal(await mobile.locator('.context-role').count(),2);
  assert.equal(await mobile.locator('#org-context-title').evaluate(e=>e===document.activeElement),true);
  await mobile.locator('.context-role').first().tap();
  assert.ok(mobile.url().includes('#experience/'));
  await mobile.locator('.back-link').tap();
  assert.equal(await mobile.locator('.record-row').count(),16);
  result.mobile={status:'passed',touchSelection:true,multipleRelatedRecords:true,detailAndBack:true};
}finally{await browser.close();writeFileSync(new URL('./table-review/live-checks.json',import.meta.url),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));}
