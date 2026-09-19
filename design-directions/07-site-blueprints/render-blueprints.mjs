// Local rendering and checks for the design document, not a website runtime.
import {spawn} from 'node:child_process';
import {mkdtemp, mkdir, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join, dirname} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const folder=dirname(fileURLToPath(import.meta.url));
const profile=await mkdtemp(join(tmpdir(),'personal-site-drawings-'));
const child=spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',[
  '--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check',
  '--disable-background-networking','--disable-component-update','--disable-sync',
  `--user-data-dir=${profile}`,'--remote-debugging-port=0','about:blank'
],{stdio:['ignore','ignore','pipe']});
let ws;
try {
  const endpoint=await new Promise((resolve,reject)=>{
    let log=''; const timer=setTimeout(()=>reject(new Error('Browser startup timed out')),20000);
    child.stderr.on('data',data=>{log+=data;const m=log.match(/DevTools listening on (ws:\/\/[^\s]+)/);if(m){clearTimeout(timer);resolve(m[1]);}});
    child.on('error',reject);child.on('exit',code=>{clearTimeout(timer);reject(new Error(`Browser exited: ${code}`));});
  });
  ws=new WebSocket(endpoint);await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true});});
  let serial=0;const calls=new Map(),errors=[];
  ws.addEventListener('message',e=>{const msg=JSON.parse(e.data);if(msg.id){const p=calls.get(msg.id);if(p){calls.delete(msg.id);clearTimeout(p.timer);msg.error?p.reject(new Error(JSON.stringify(msg.error))):p.resolve(msg.result);}}if(msg.method==='Runtime.exceptionThrown')errors.push(msg.params.exceptionDetails.text);});
  const send=(method,params={},sessionId)=>new Promise((resolve,reject)=>{const id=++serial;const timer=setTimeout(()=>{calls.delete(id);reject(new Error(`Timeout: ${method}`));},25000);calls.set(id,{resolve,reject,timer});ws.send(JSON.stringify({id,method,params,...(sessionId?{sessionId}:{})}));});
  const {targetId}=await send('Target.createTarget',{url:'about:blank'});
  const {sessionId}=await send('Target.attachToTarget',{targetId,flatten:true});
  const cmd=(method,params={})=>send(method,params,sessionId);
  const evaluate=async expression=>{const result=await cmd('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(result.exceptionDetails)throw new Error(JSON.stringify(result.exceptionDetails));return result.result.value;};
  await cmd('Runtime.enable');await cmd('Page.enable');
  await cmd('Emulation.setDeviceMetricsOverride',{width:1600,height:1320,deviceScaleFactor:1,mobile:false});
  await cmd('Page.navigate',{url:pathToFileURL(join(folder,'index.html')).href});
  await evaluate(`new Promise(resolve=>{if(document.readyState==='complete')resolve(true);else window.addEventListener('load',()=>resolve(true),{once:true})})`);
  await evaluate('document.fonts.ready.then(()=>true)');
  const settle=()=>evaluate('new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve(true))))');
  await settle();
  const results={sheetCount:await evaluate('document.querySelectorAll(".sheet").length'),checks:{},svgOverflow:[],screenshots:[]};
  if(results.sheetCount!==12)throw new Error('Expected 12 sheets');
  const out=join(folder,'previews');await mkdir(out,{recursive:true});
  for(let i=0;i<12;i++){
    const id=String(i).padStart(2,'0');
    await evaluate(`location.hash='sheet-${id}'`);await settle();
    const geometry=await evaluate(`(()=>{const el=document.querySelector('.sheet:not([hidden]) .drawing');const b=el.getBoundingClientRect();return {x:b.left+scrollX,y:b.top+scrollY,width:b.width,height:b.height}})()`);
    const overflow=await evaluate(`Array.from(document.querySelectorAll('.sheet:not([hidden]) svg text')).filter(el=>{const b=el.getBBox();return b.x<0||b.x+b.width>1280||b.y<0||b.y+b.height>800}).map(el=>el.textContent)`);
    if(overflow.length)results.svgOverflow.push({sheet:id,text:overflow});
    const shot=await cmd('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{...geometry,scale:1}});
    const name=`${id}.png`;await writeFile(join(out,name),Buffer.from(shot.data,'base64'));results.screenshots.push(name);
    console.log(`Rendered sheet ${id}`);
  }
  await evaluate("location.hash='sheet-00'");await settle();
  await evaluate('document.getElementById("next").click()');await settle();
  results.checks.next=await evaluate("location.hash==='#sheet-01' && document.querySelectorAll('.sheet:not([hidden])').length===1");
  await evaluate('document.getElementById("prev").click()');await settle();
  results.checks.previous=await evaluate("location.hash==='#sheet-00' && document.getElementById('prev').disabled");
  await evaluate('document.getElementById("theme").click()');
  results.checks.theme=await evaluate("document.body.classList.contains('view-dark') && document.getElementById('theme').getAttribute('aria-pressed')==='true'");
  await evaluate('document.getElementById("theme").click()');
  await evaluate("location.hash='sheet-08'");await settle();
  await cmd('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await settle();
  results.checks.mobileShell=await evaluate('document.documentElement.scrollWidth<=innerWidth');
  const mobile=await cmd('Page.captureScreenshot',{format:'png'});await writeFile(join(out,'document-mobile.png'),Buffer.from(mobile.data,'base64'));
  await cmd('Emulation.setDeviceMetricsOverride',{width:1600,height:1320,deviceScaleFactor:1,mobile:false});await settle();
  await evaluate("document.title='个人网站完整设计图纸 V1 · 12 张结构与交互图'");
  await cmd('Emulation.setEmulatedMedia',{media:'print'});
  results.checks.printAll=await evaluate("Array.from(document.querySelectorAll('.sheet')).every(el=>getComputedStyle(el).display!=='none')");
  const pdf=await cmd('Page.printToPDF',{printBackground:true,preferCSSPageSize:true,displayHeaderFooter:false});
  await writeFile(join(folder,'site-blueprints-v1.pdf'),Buffer.from(pdf.data,'base64'));
  results.runtimeErrors=errors;
  await writeFile(join(folder,'validation.json'),JSON.stringify(results,null,2)+'\n');
  console.log(JSON.stringify(results,null,2));
  if(results.svgOverflow.length||errors.length||Object.values(results.checks).some(x=>!x))process.exitCode=1;
  await send('Browser.close').catch(()=>{});
} finally {if(ws)ws.close();child.kill('SIGTERM');}
