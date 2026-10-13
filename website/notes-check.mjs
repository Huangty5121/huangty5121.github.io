import {readFile,readdir} from 'node:fs/promises';
import {join} from 'node:path';
import {notes} from './notes.mjs';
import {renderNoteMarkdown} from './notes-renderer.mjs';

export async function checkNotes(root){
 const failures=[];
 const fail=(file,reason)=>failures.push({file,reason});
 const ids=new Set(),routes=new Set(),sources=new Set();
 const sitemap=await readFile(join(root,'sitemap.xml'),'utf8');
 for(const note of notes){
  if(!note.id||ids.has(note.id))fail('notes.mjs',`Duplicate or missing note ID: ${note.id}`);
  if(routes.has(note.route)||note.route!==`writing-${note.id}.html`)fail('notes.mjs',`Invalid or duplicate route: ${note.route}`);
  ids.add(note.id);routes.add(note.route);
  if(!/^\d{4}-\d{2}-\d{2}$/.test(note.date)||!['draft','published'].includes(note.status))fail('notes.mjs',`Invalid date/status: ${note.id}`);
  for(const lang of ['zh','en']){
   if(!note.title[lang]?.trim()||!note.summary[lang]?.trim())fail('notes.mjs',`Missing ${lang} metadata: ${note.id}`);
   const source=note.sources[lang];
   if(source===null){
    if(lang!=='en'||note.review!=='awaiting-author'||note.status!=='draft')fail('notes.mjs',`Missing required ${lang} source: ${note.id}`);
    continue;
   }
   if(source!==`notes/${note.id}.${lang}.md`||sources.has(source)){fail('notes.mjs',`Invalid or duplicate source: ${source}`);continue;}
   sources.add(source);
   try{
    const text=await readFile(new URL(source,import.meta.url),'utf8');
    if(!text.trim()||/^#\s/m.test(text))fail(source,'Empty body or duplicate page-level heading');
    if(/<script|app:\/\/localhost|\/Users\/|\.private-notes\/|local-agent-mode-sessions|INTERNAL-NOTES-PROVENANCE/i.test(text))fail(source,'Private material or script in article source');
    if(lang==='zh'){
     const html=await readFile(join(root,note.route),'utf8');
     if(!html.includes(renderNoteMarkdown(text)))fail(note.route,'Generated body diverges from its Markdown source');
    }
   }catch(error){fail(source,error.message);}
  }
  for(const locale of ['','tw/','en/']){
   const file=locale+note.route;
   try{
    const html=await readFile(join(root,file),'utf8');
    if(!html.includes('data-page="notes"')||!html.includes('href="notes.html"'))fail(file,'Missing Notes navigation or back link');
    if(!html.includes(`<time datetime="${note.date}">`))fail(file,'Missing actual draft date');
    if(note.status==='draft'&&!html.includes('name="robots" content="noindex,follow"'))fail(file,'Unreviewed draft must be marked noindex');
    const translated=locale==='en/';
    if(translated&&note.sources.en===null){
     if(!html.includes('class="note-pending"')||html.includes('data-note-body')||!html.includes(`href="../tw/${note.route}"`))fail(file,'Pending translation must be explicit and link to the Chinese draft');
    }else if(!html.includes('data-note-body'))fail(file,'Missing article body');
    if(!sitemap.includes(`<loc>https://tyhuang.hk/${file}</loc>`))fail(file,'Missing registered route in sitemap');
   }catch(error){fail(file,error.message);}
  }
 }
 for(const entry of await readdir(new URL('./notes/',import.meta.url)))if(entry.endsWith('.md')&&!sources.has(`notes/${entry}`))fail(entry,'Unregistered article source');
 for(const locale of ['','tw/','en/'])for(const page of ['index.html','notes.html']){
  const html=await readFile(join(root,locale+page),'utf8');
  let previous=-1;
  for(const note of notes){const position=html.indexOf(`data-note-id="${note.id}"`);if(position<=previous)fail(locale+page,'Notes order differs from the shared register');previous=position;if(!html.includes(`href="${note.route}"`))fail(locale+page,`Missing note link: ${note.id}`);}
  if(html.includes('href="writing-modernization.html"'))fail(locale+page,'Legacy essay still promoted');
 }
 // Scan generated first-party text and filenames, not just the new articles.
 async function scan(dir){for(const entry of await readdir(dir,{withFileTypes:true})){
  const file=join(dir,entry.name);
  if(/private-notes|source-audit|\.jsonl$/.test(entry.name))fail(file,'Private editorial file reached output');
  if(entry.isDirectory()){if(!['pdfjs','leaflet'].includes(entry.name))await scan(file);}
  else if(/\.(html|css|mjs|js|json|xml|md|txt)$/.test(entry.name)){
   const text=await readFile(file,'utf8');
   if(/INTERNAL-NOTES-PROVENANCE|local-agent-mode-sessions|app:\/\/localhost\/space\/|\.private-notes\/|\/Users\/tinyeh\//.test(text))fail(file,'Private provenance reached output');
  }
 }}
 await scan(root);
 // Regression checks for the parser boundary, including active URL schemes.
 const probe=renderNoteMarkdown('<script>alert(1)</script>\n\n[bad](javascript:alert(1))\n\n[good](https://example.com)');
 if(probe.includes('<script>')||/href="javascript:/i.test(probe)||!probe.includes('href="https://example.com"'))fail('notes-renderer.mjs','Markdown safety boundary failed');
 return failures;
}
