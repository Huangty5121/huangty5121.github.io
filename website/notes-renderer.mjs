import {readFile} from 'node:fs/promises';
import MarkdownIt from 'markdown-it';
import {notes} from './notes.mjs';

const markdown=new MarkdownIt({html:false,linkify:false,typographer:false});
const headingOpen=markdown.renderer.rules.heading_open;
markdown.renderer.rules.heading_open=(tokens,index,options,env,self)=>{
 if(tokens[index].tag==='h2'&&['参考资料','References'].includes(tokens[index+1]?.content))tokens[index].attrSet('id','references');
 return headingOpen?headingOpen(tokens,index,options,env,self):self.renderToken(tokens,index,options);
};
export const renderNoteMarkdown=text=>markdown.render(text);

export async function loadNoteBodies(){
 return Object.fromEntries(await Promise.all(notes.map(async note=>[
  note.id,Object.fromEntries(await Promise.all(['zh','en'].map(async lang=>{
   const source=note.sources[lang];
   if(source===null)return [lang,null];
   const text=await readFile(new URL(source,import.meta.url),'utf8');
   if(!text.trim())throw new Error(`Empty note source: ${source}`);
   return [lang,renderNoteMarkdown(text)];
  })))
 ])));
}
