import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
const run=promisify(execFile);
const sites=process.argv.slice(2);
await Promise.all(sites.map(async url=>{
 try{
  const {stdout}=await run('curl',['-L','--fail','--max-time','25','-sS',url],{maxBuffer:8e6});
  const imgs=[...stdout.matchAll(/<img\b[^>]*>|<link\b[^>]*(?:icon|stylesheet)[^>]*>/gi)].map(m=>m[0]);
  const candidates=imgs.filter(s=>/logo|brand|icon|head|favicon/i.test(s));
  const urls=[...new Set([...stdout.matchAll(/(?:src|href)=["']([^"']+\.(?:png|svg|webp|jpg|css)(?:\?[^"']*)?)["']/gi)].map(m=>new URL(m[1],url).href))];
  console.log(JSON.stringify({url,images:candidates.length?candidates:imgs.slice(0,10),assets:urls.filter(s=>/logo|brand|icon|\.css/i.test(s)).slice(0,16)}));
 }catch(e){console.log(JSON.stringify({url,error:e.message.slice(0,220)}));}
}));
