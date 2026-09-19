// Reproducible crops of downloaded marks. No logos are redrawn here.
// Local background cleanup was authorised for this demo; original files stay intact.
import {createRequire} from 'node:module';
import {mkdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const require=createRequire(import.meta.url);
const sharp=require('/Users/tinyeh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root=fileURLToPath(new URL('./',import.meta.url));
const output=`${root}dist/desk-assets/pins/`;
const generated='/Users/tinyeh/.codex/generated_images/01a065be-f8ee-71e2-8254-1e581048f537/';
mkdirSync(output,{recursive:true});
async function crop(name,rect,out,mode){
 let pipeline=sharp(`${root}pin-sources/${name}`);
 if(rect)pipeline=pipeline.extract(rect);
 const {data,info}=await pipeline.ensureAlpha().raw().toBuffer({resolveWithObject:true});
 for(let i=0;i<data.length;i+=4){
  if(mode==='white-background'){const light=Math.min(data[i],data[i+1],data[i+2]);if(light>232)data[i+3]=Math.round(data[i+3]*(255-light)/23);}
  if(mode==='dark-mark'){data[i]=75;data[i+1]=78;data[i+2]=70;}
  if(mode==='seal'){const x=(i/4)%info.width,y=Math.floor(i/4/info.width);if(Math.hypot(x-35,y-35)>35)data[i+3]=0;}
 }
 await sharp(data,{raw:info}).trim({threshold:8}).resize(256,256,{fit:'inside'}).png().toFile(`${output}${out}.png`);
}
await crop('polyu.png',null,'polyu');
await crop('polysmart.jpg',{left:34,top:44,width:294,height:289},'polysmart','white-background');
await crop('frcbs.png',{left:0,top:0,width:335,height:344},'tsinghua');
await crop('cas.png',{left:0,top:0,width:71,height:71},'cas','seal');
await crop('royal-plaza.png',{left:0,top:0,width:106,height:123},'royal-plaza','dark-mark');
await crop('iluvatar.png',{left:0,top:0,width:500,height:365},'iluvatar');
await sharp(`${generated}exec-96dd62b5-fb14-4a69-a194-7430afc6d275.png`).trim().resize(360,360,{fit:'inside'}).png().toFile(`${output}smart-pin.png`);
// The X render has a baked neutral checkerboard. Remove connected neutral
// background only (including the two real cut-outs), retaining warm metal.
const {data,info}=await sharp(`${generated}exec-7527bd54-acc9-4b5e-a937-ecd90a44da03.png`).ensureAlpha().raw().toBuffer({resolveWithObject:true});
const {width:w,height:h}=info,seen=new Uint8Array(w*h),queue=new Int32Array(w*h);let head=0,tail=0;
const add=(x,y)=>{if(x<0||y<0||x>=w||y>=h)return;const n=y*w+x,i=n*4;if(seen[n])return;seen[n]=1;const low=Math.min(data[i],data[i+1],data[i+2]),high=Math.max(data[i],data[i+1],data[i+2]);if(low>150&&high-low<16)queue[tail++]=n;};
for(let x=0;x<w;x++){add(x,0);add(x,h-1);}for(let y=0;y<h;y++){add(0,y);add(w-1,y);}add(540,540);add(1050,615);
while(head<tail){const n=queue[head++],x=n%w,y=Math.floor(n/w);data[n*4+3]=0;add(x+1,y);add(x-1,y);add(x,y+1);add(x,y-1);}
await sharp(data,{raw:info}).trim().resize(360,360,{fit:'inside'}).png().toFile(`${output}x-pin.png`);
console.log('Prepared 8 distinct source-based marks; SMART and X are generated pin renders.');
