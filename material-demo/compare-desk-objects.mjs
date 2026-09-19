// Diagnostic comparison only; these composites are not website artwork.
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const require=createRequire(import.meta.url);
const sharp=require('/Users/tinyeh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const here=fileURLToPath(new URL('./',import.meta.url));
const ref=here+'../design-directions/08-site-visuals/01-desktop-home.png';
const shot=here+'desk-objects-review/1672-home.png';
const width=1672,height=941;
const source=await sharp(ref).resize(width,height,{fit:'contain',background:'#eeeee7'}).png().toBuffer();
const rendered=await sharp(shot).extract({left:0,top:0,width,height}).png().toBuffer();
await sharp({create:{width:width*2,height,channels:3,background:'#eeeee7'}}).composite([{input:source,left:0,top:0},{input:rendered,left:width,top:0}]).png().toFile(here+'desk-objects-review/reference-and-demo.png');
const before=await sharp(here+'desk-review/desktop-home-final.png').extract({left:0,top:0,width,height}).png().toBuffer();
await sharp({create:{width:width*2,height,channels:3,background:'#eeeee7'}}).composite([{input:before,left:0,top:0},{input:rendered,left:width,top:0}]).png().toFile(here+'desk-objects-review/before-and-after.png');
const detail1=await sharp(ref).extract({left:840,top:140,width:650,height:360}).png().toBuffer();
const detail2=await sharp(shot).extract({left:840,top:140,width:650,height:360}).png().toBuffer();
await sharp({create:{width:1300,height:360,channels:3,background:'#eeeee7'}}).composite([{input:detail1,left:0,top:0},{input:detail2,left:650,top:0}]).png().toFile(here+'desk-objects-review/focused-comparison.png');
console.log('Source art direction and current browser render paired at 1:1 density. Content intentionally differs.');
