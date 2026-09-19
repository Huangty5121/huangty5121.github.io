import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const output=fileURLToPath(new URL('../material-demo/dist/site-review/',import.meta.url));
await mkdir(output,{recursive:true});
for(const lang of ['zh','en'])for(const page of ['index','collection','notes','about','project-ninetoothed','project-social-innovation','writing']){
 const route='../site/'+(lang==='en'?'en/':'')+page+'.html';
 await writeFile(output+lang+'-'+page+'.html',`<!doctype html><html><head><meta charset="utf-8"><title>390px review: ${lang}/${page}</title><style>body{margin:12px;font:11px sans-serif;background:#ddd}iframe{display:block;width:390px;height:844px;border:0}pre{white-space:pre-wrap;max-width:780px}</style></head><body><h1>${lang}/${page} — 390 × 844</h1><pre id="measurement">Loading</pre><iframe title="Narrow preview" src="${route}"></iframe><script>const frame=document.querySelector('iframe');frame.addEventListener('load',()=>{const doc=frame.contentDocument;document.querySelector('#measurement').textContent=JSON.stringify({path:frame.contentWindow.location.pathname,width:frame.contentWindow.innerWidth,height:frame.contentWindow.innerHeight,overflow:doc.documentElement.scrollWidth>frame.contentWindow.innerWidth,h1:doc.querySelector('h1')?.textContent,media:frame.contentWindow.matchMedia('(max-width:600px)').matches,missingImages:[...doc.images].filter(x=>x.complete&&x.currentSrc&&!x.naturalWidth).map(x=>x.currentSrc)})})</script></body></html>`);
}
console.log('Prepared isolated narrow previews outside the published site directory.');
