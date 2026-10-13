import {notes} from './notes.mjs';

export function createNoteViews({lang,h,t,icon,bodies}){
 const status=t('草稿 · 待确认','Draft · Awaiting author review');
 const metadata=note=>`<p class="note-meta"><time datetime="${note.date}">${note.date}</time><span>${status}</span></p>`;
 const entry=(note,level)=>`<article class="note-entry" data-note-id="${note.id}">${metadata(note)}<h${level}><a href="${note.route}">${h(note.title[lang])}${icon('arrow-right')}</a></h${level}><p>${h(note.summary[lang])}</p></article>`;
 const index=()=>`<header class="page-heading wrap"><span class="eyebrow">${t('个人文字','Notes')}</span><h1>${t('文字','Writing')}</h1></header><section class="notes-index wrap" aria-label="${t('文章列表','Essays')}">${notes.map(note=>entry(note,2)).join('')}</section>`;
 const home=()=>`<section class="home-notes wrap" aria-labelledby="home-notes-title"><header><h2 id="home-notes-title">${t('文字','Notes')}</h2><a class="text-link" href="notes.html">${t('全部文字','All notes')}${icon('arrow-right')}</a></header><div class="home-notes-list">${notes.map(note=>entry(note,3)).join('')}</div></section>`;
 const article=note=>{
  const body=bodies[note.id][lang];
  const content=body===null
   ?`<div class="note-pending"><p>This essay is being reviewed in Chinese. The English text will follow once its wording is confirmed.</p><p><a href="../tw/${note.route}" lang="zh-Hant">閱讀繁體中文草稿</a><a href="../${note.route}" lang="zh-Hans">阅读简体中文草稿</a></p></div>`
   :`<div class="blog-body note-body" data-note-body>${body}</div>`;
  return `<article class="blog-article wrap note-article" data-note-id="${note.id}"><header class="blog-header"><a class="reader-back" href="notes.html">${icon('arrow-left')}${t('返回文字','Back to Notes')}</a><div>${metadata(note)}<h1>${h(note.title[lang])}</h1><p>${h(note.summary[lang])}</p></div></header>${content}<footer class="note-footer"><p>${t('根据讨论整理的初稿，文字尚待确认。','An editorial draft based on discussions; the wording is awaiting author review.')}</p><a class="reader-back" href="notes.html">${icon('arrow-left')}${t('返回文字','Back to Notes')}</a></footer></article>`;
 };
 return {index,home,articles:Object.fromEntries(notes.map(note=>[`writing-${note.id}`,()=>article(note)]))};
}
