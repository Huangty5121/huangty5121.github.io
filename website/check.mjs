import {readdir,readFile,stat,writeFile,mkdir} from 'node:fs/promises';
import {dirname,join,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {works} from './content.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../material-demo/dist/site');
const files=[];
async function walk(dir){for(const item of await readdir(dir,{withFileTypes:true})){if(item.name==='assets')continue;const p=join(dir,item.name);if(item.isDirectory())await walk(p);else if(item.name.endsWith('.html'))files.push(p);}}
await walk(root);let checked=0;const failures=[];
for(const file of files){const html=await readFile(file,'utf8');if((html.match(/<h1[ >]/g)||[]).length!==1)failures.push({file,reason:'Expected one h1'});
for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){const value=match[1];if(/^(https?:|mailto:|data:)/.test(value))continue;
const [path,fragment]=value.split('#');const target=resolve(dirname(file),decodeURIComponent(path.split('?')[0]||file));checked++;
try{await stat(target);const isViewer=target===join(root,'assets/pdfjs/web/viewer.html');if(isViewer){const pdf=new URLSearchParams(value.split('?')[1]?.split('#')[0]??'').get('file');if(!pdf)failures.push({file,value,reason:'Viewer has no PDF source'});else await stat(resolve(dirname(target),pdf));}if(fragment&&target.endsWith('.html')&&!isViewer){const content=target===file?html:await readFile(target,'utf8');if(!content.includes(`id="${fragment}"`))failures.push({file,value,reason:'Missing fragment'});}}catch{failures.push({file,value,reason:'Missing target'});}
}
if(/Management 辅修|Minor: Management|fold\.jpg|sketch\.jpg|John Doe|lorem ipsum/i.test(html))failures.push({file,reason:'Excluded or placeholder content'});
if(/read-[a-z-]+-\d+\.html|assets\/papers\/|paper-page|data-reader-page/.test(html))failures.push({file,reason:'Extracted PDF reading interface must not return'});
}
const pdfs=[];
for(const w of works.filter(w=>w.pdf)){
 const source=await readFile(resolve(root,'../desk-assets',w.pdf));
 const generated=await readFile(join(root,'assets',w.pdf));
 const equal=createHash('sha256').update(source).digest('hex')===createHash('sha256').update(generated).digest('hex');
 pdfs.push({file:w.pdf,identicalToOriginal:equal});
 if(!equal)failures.push({file:w.pdf,reason:'PDF changed from original'});
}
const review=join(dirname(fileURLToPath(import.meta.url)),'review');
const result={pages:files.length,localReferences:checked,pdfs,failures};await mkdir(review,{recursive:true});await writeFile(join(review,'static-check.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));if(failures.length)process.exitCode=1;
