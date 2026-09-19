// Diagnostic evidence only: put the existing reference and browser render together.
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const require=createRequire(import.meta.url);
const sharp=require('/Users/tinyeh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const here=fileURLToPath(new URL('./',import.meta.url));
const ref=here+'../design-directions/08-site-visuals/01-desktop-home.png';
const shot=here+'desk-review/desktop-home-final.png';
const [r,s]=await Promise.all([sharp(ref).metadata(),sharp(shot).metadata()]);
const width=1672,height=941;
const source=await sharp(ref).resize(width,height,{fit:'contain',background:'#eeeee7'}).png().toBuffer();
const rendered=await sharp(shot).extract({left:0,top:0,width,height}).png().toBuffer();
await sharp({create:{width:width*2,height,channels:3,background:'#eeeee7'}}).composite([{input:source,left:0,top:0},{input:rendered,left:width,top:0}]).png().toFile(here+'desk-review/reference-and-demo.png');
// Inspect original handwritten labels and current handwriting at native scale.
await sharp(ref).extract({left:500,top:440,width:540,height:270}).png().toFile(here+'desk-review/reference-detail.png');
await sharp(shot).extract({left:690,top:430,width:650,height:280}).png().toFile(here+'desk-review/implementation-detail.png');
console.log(JSON.stringify({reference:[r.width,r.height],rendered:[s.width,s.height],comparison:[width*2,height],note:'Left: source art direction. Right: functional demo, first viewport. Content and inner architecture intentionally changed.'},null,2));
