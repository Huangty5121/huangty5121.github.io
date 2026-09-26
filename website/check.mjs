import {readdir,readFile,stat,writeFile,mkdir} from 'node:fs/promises';
import {dirname,join,resolve,relative,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import * as OpenCC from 'opencc-js';
import {works,experiences} from './content.mjs';
import {entries} from './entries.mjs';
import {press} from './news.mjs';
import {industrialNote} from './industrial-note.mjs';
import {aboutContent,aboutAlbums,aboutWorkbench,aboutPerspective} from './about-content.mjs';
const zh2t=OpenCC.Converter({from:'cn',to:'hk'});
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../material-demo/dist/site');
const siteOrigin='https://tyhuang.hk';
const files=[],paths=new Set();
const relOf=p=>relative(root,p).split(sep).join('/');
async function walk(dir){for(const item of await readdir(dir,{withFileTypes:true})){const p=join(dir,item.name);paths.add(relOf(p));if(item.isDirectory())await walk(p);else if(item.name.endsWith('.html')&&relOf(p).split('/')[0]!=='assets')files.push(p);}}
await walk(root);let checked=0;const failures=[];
for(const [key,value] of Object.entries(aboutContent)){
 const items=Array.isArray(value)?value:[value];
 for(const [index,item] of items.entries())for(const lang of ['zh','en'])if(typeof item?.[lang]!=='string'||!item[lang].trim())failures.push({file:'about-content.mjs',reason:`Missing ${lang} copy for ${key}${Array.isArray(value)?`[${index}]`:''}`});
}
for(const item of aboutWorkbench)for(const field of ['name'])for(const lang of ['zh','en'])if(!item[field]?.[lang])failures.push({file:'about-content.mjs',reason:`Missing ${lang} workbench ${field}`});
for(const item of aboutWorkbench){
 if(!item.skills?.length)failures.push({file:'about-content.mjs',reason:`Missing skills for ${item.id}`});
 for(const skill of item.skills||[])for(const field of ['name','detail'])for(const lang of ['zh','en'])if(!skill[field]?.[lang])failures.push({file:'about-content.mjs',reason:`Missing ${lang} skill ${field} in ${item.id}`});
}
for(const album of aboutAlbums){
 if(!album.title||!album.artist||!album.year||!album.url||!album.cover)failures.push({file:'about-content.mjs',reason:'Incomplete album metadata'});
 try{await stat(join(dirname(fileURLToPath(import.meta.url)),'assets/albums',album.cover));}catch{failures.push({file:'about-content.mjs',reason:`Missing album cover ${album.cover}`});}
}
// Check the shared design contract, including mixed shorthand declarations.
const css=await readFile(new URL('./site.css',import.meta.url),'utf8');
const plainCss=css.replace(/\/\*[\s\S]*?\*\//g,'');
const spacingScale=new Set([...plainCss.matchAll(/--sp-(\d+)\s*:/g)].map(m=>m[1]));
for(const m of plainCss.matchAll(/(?:^|[;{])\s*(font-size|(?:padding|margin)(?:-[\w]+)?|(?:row-|column-)?gap)\s*:\s*([^;}]+)/g)){
 const [,property,value]=m;
 if(property==='font-size'){
  if(value.trim()!=='0'&&!/^var\(--[\w-]+\)$/.test(value.trim()))failures.push({file:'site.css',reason:`Font size bypasses shared role: ${value}`});
 }else for(const px of value.matchAll(/(?<![\w.-])(\d+)px/g))if(spacingScale.has(px[1]))failures.push({file:'site.css',reason:`${property} bypasses --sp-${px[1]}: ${value}`});
}
// The font shorthand can silently reintroduce a component's own type scale.
for(const m of plainCss.matchAll(/(?:^|[;{])\s*font\s*:\s*([^;}]+)/g)){
 const value=m[1].trim();
 if(value!=='inherit'&&!/var\(--text-[\w-]+\)/.test(value))failures.push({file:'site.css',reason:`Font shorthand bypasses shared role: ${value}`});
}
// Paired copy belongs to data, including nested article sections and inherited records.
function pairedCopy(value,path){
 if(!value||typeof value!=='object')return;
 if('zh' in value||'en' in value)for(const lang of ['zh','en']){
  const copy=value[lang];if(!(typeof copy==='string'&&copy.trim())&&!(Array.isArray(copy)&&copy.length))failures.push({file:path,reason:`Missing ${lang} content`});
 }
 for(const [key,child]of Object.entries(value))pairedCopy(child,path+'.'+key);
}
for(const [name,data]of Object.entries({works,experiences,entries,press,industrialNote,aboutContent,aboutWorkbench,aboutPerspective}))pairedCopy(data,name);
for(const [name,data]of Object.entries({works,experiences,entries,press})){
 const ids=new Set();for(const item of data){if(!item.id||ids.has(item.id))failures.push({file:name,reason:`Missing or duplicate content id: ${item.id}`});ids.add(item.id);}
}
// Icons are dynamic imports, so a missing file would not surface as a broken link.
const INLINE_ICONS=new Set(['plus','minus','arrow-right','chevron-down','copy']);
const iconStems=new Set(['sun','moon','play','pause']);
const firstDiff=(a,b)=>{for(let i=0;i<Math.min(a.length,b.length);i++)if(a[i]!==b[i])return JSON.stringify(a.slice(Math.max(0,i-15),i+15));return 'end';};
for(const file of files){const html=await readFile(file,'utf8');if((html.match(/<h1[ >]/g)||[]).length!==1)failures.push({file,reason:'Expected one h1'});
const rel=relOf(file),redirect=html.includes('http-equiv="refresh"'),missing=rel.endsWith('404.html');
// Check the authored content outline; the shared music popover is outside main.
const main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
if(main){let previous=0;for(const match of main.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/g)){
 const level=Number(match[1]);
 if(level>previous+1)failures.push({file,reason:`Heading skips from h${previous} to h${level}`});
 // Selected organisation starts empty and is populated only when made visible.
 if(!match[2].replace(/<[^>]*>/g,'').trim()&&!match[0].includes('data-selected-org'))failures.push({file,reason:'Empty content heading'});
 previous=level;
}}
if(redirect||missing){if(!html.includes('name="robots" content="noindex,follow"'))failures.push({file,reason:'Retired or missing page must be noindex'});}
else{
 const expected=siteOrigin+'/'+(rel.endsWith('/index.html')?rel.slice(0,-10):rel==='index.html'?'':rel);
 if(!html.includes(`rel="canonical" href="${expected}"`))failures.push({file,reason:'Missing or incorrect canonical URL'});
 for(const code of ['zh-Hans','zh-Hant','en'])if(!html.includes(`hreflang="${code}"`))failures.push({file,reason:`Missing ${code} alternate`});
 if(!html.includes('rel="icon"'))failures.push({file,reason:'Missing site icon'});
}
for(const m of html.matchAll(/data-icon="([a-z-]+)"/g))iconStems.add(m[1]);
const langAttr=html.match(/<html lang="([^"]*)"/)?.[1];if(!['zh-Hans','zh-Hant','en'].includes(langAttr))failures.push({file,reason:`Unexpected html lang "${langAttr}"`});
const titleText=html.match(/<title>([^<]*)<\/title>/)?.[1]??'';if(!titleText.trim()||titleText.startsWith('·'))failures.push({file,reason:'Missing or malformed title'});
if(relOf(file).startsWith('tw/')&&zh2t(html)!==html)failures.push({file,reason:`Unconverted simplified Chinese: ${firstDiff(html,zh2t(html))}`});
for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){const value=match[1];if(/^(https?:|mailto:|data:)/.test(value))continue;
const [path,fragment]=value.split('#');const target=resolve(dirname(file),decodeURIComponent(path.split('?')[0]||file));checked++;
try{await stat(target);const rel=relOf(target);if(!rel.startsWith('..')&&!paths.has(rel))failures.push({file,value,reason:'Path case differs from the actual file; case-sensitive hosts would 404'});const isViewer=target===join(root,'assets/pdfjs/web/viewer.html');if(isViewer){const pdf=new URLSearchParams(value.split('?')[1]?.split('#')[0]??'').get('file');if(!pdf)failures.push({file,value,reason:'Viewer has no PDF source'});else await stat(resolve(dirname(target),pdf));}if(fragment&&target.endsWith('.html')&&!isViewer){const content=target===file?html:await readFile(target,'utf8');if(!content.includes(`id="${fragment}"`))failures.push({file,value,reason:'Missing fragment'});}}catch{failures.push({file,value,reason:'Missing target'});}
}
if(/Management 辅修|Minor: Management|fold\.jpg|sketch\.jpg|John Doe|lorem ipsum/i.test(html))failures.push({file,reason:'Excluded or placeholder content'});
if(/read-[a-z-]+-\d+\.html|assets\/papers\/|paper-page|data-reader-page/.test(html))failures.push({file,reason:'Extracted PDF reading interface must not return'});
}
const twJs=await readFile(join(root,'tw/site.mjs'),'utf8');
const sitemap=await readFile(join(root,'sitemap.xml'),'utf8');
if(!sitemap.includes('<loc>https://tyhuang.hk/</loc>')||!sitemap.includes('<loc>https://tyhuang.hk/tw/</loc>')||!sitemap.includes('<loc>https://tyhuang.hk/en/</loc>'))failures.push({file:'sitemap.xml',reason:'Missing main language editions'});
const robots=await readFile(join(root,'robots.txt'),'utf8');
if(!robots.includes('Sitemap: https://tyhuang.hk/sitemap.xml'))failures.push({file:'robots.txt',reason:'Missing sitemap location'});
if(/(?<!\.)\.\/assets\//.test(twJs))failures.push({file:'tw/site.mjs',reason:'Module-relative asset path would 404 on tw pages'});
if(zh2t(twJs)!==twJs)failures.push({file:'tw/site.mjs',reason:`Unconverted simplified Chinese: ${firstDiff(twJs,zh2t(twJs))}`});
for(const stem of iconStems){if(INLINE_ICONS.has(stem))continue;try{await stat(join(root,'assets/icons',stem+'.js'));}catch{failures.push({file:'assets/icons/'+stem+'.js',reason:'Icon referenced by markup or runtime is missing'});}}
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
