// QA composites only: no fabricated artwork is used by the site.
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const require=createRequire(import.meta.url),sharp=require('/Users/tinyeh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root=fileURLToPath(new URL('./',import.meta.url));
const source=`${root}desk-review/wide-experiences.png`,target=`${root}desk-organisations-review/1672-overview.png`;
const meta=await sharp(source).metadata(),next=await sharp(target).metadata();
const width=1672,height=941;
const left=await sharp(source).resize({width}).extract({left:0,top:0,width,height}).png().toBuffer();
const right=await sharp(target).extract({left:0,top:0,width,height}).png().toBuffer();
await sharp({create:{width:width*2,height,channels:3,background:'#eeeee7'}}).composite([{input:left,left:0,top:0},{input:right,left:width,top:0}]).png().toFile(`${root}desk-organisations-review/before-and-after.png`);
const beforeMarks=await sharp(`${root}desk-objects-review/desktop-experiences.png`).resize({width}).extract({left:430,top:280,width:700,height:450}).png().toBuffer();
const afterMarks=await sharp(target).extract({left:430,top:1240,width:700,height:450}).png().toBuffer();
await sharp({create:{width:1400,height:450,channels:3,background:'#eeeee7'}}).composite([{input:beforeMarks,left:0,top:0},{input:afterMarks,left:700,top:0}]).png().toFile(`${root}desk-organisations-review/focused-comparison.png`);
console.log(JSON.stringify({source:[meta.width,meta.height],implementation:[next.width,next.height],cssViewport:[1672,941],density:1,note:'List baseline and revised education/current/organisation layout. New hierarchy is explicitly requested; not a pixel clone.'}));
