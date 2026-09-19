import {works, experiences, notes, pictures, findWork, findExperience, findNote, routeFrom, filteredWorks} from './desk-data.mjs';
import {cleanPreferences} from './home-data.mjs';
import {organisationContext} from './desk-affiliations.mjs';
import {archiveContents,archiveSections} from './desk-archive.mjs';
import {deskHome,experiencePin,updateDeskMusic,toggleDeskMusic,bindDeskAudio} from './desk-objects.mjs';

const $ = id => document.getElementById(id);
const root = document.documentElement;
const h = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function stored(key){try{const v=JSON.parse(localStorage.getItem(key));return v&&typeof v==='object'&&!Array.isArray(v)?v:null;}catch{return null;}}
function original(){return stored('ty-material-demo-v1')??stored('ty-home-v1');}
let prefs=cleanPreferences(stored('ty-desk-v1')??original());
let route=routeFrom(location.hash), currentHash=location.hash, query='', kind='all', group='all', archiveSection='study', selectedOrg=null, scrollTimer;

const local=value=>value[prefs.lang];
const text=(zh,en)=>prefs.lang==='zh'?zh:en;
const copy={
 skip:['跳到内容','Skip to content'],works:['论文和项目','Papers & projects'],experiences:['经历','Experience'],notes:['笔记','Notes'],structure:['这版怎么分层','How this demo is organised'],demo:['结构 demo · 未发布','Structure demo · Not published'],settings:['材质','Materials'],settingsTitle:['阅读与材质','Reading & materials'],close:['关闭','Close'],music:['音乐','Music'],musicHint:['还没选歌。先用一段本地音频试试，不会上传。','No track selected. Try a local audio file; nothing is uploaded.'],chooseAudio:['选择音频','Choose audio'],removeAudio:['移除音频','Remove audio'],audioPrivate:['只在当前页面播放，刷新后清空。不是公开歌单，也不会自动播放。','Local playback for this visit only. Cleared on refresh; no public playlist or autoplay.'],noteMaterial:['纸条底材','Note surface'],vellum:['半透明描图纸','Tracing paper'],paper:['纸张','Paper'],metal:['磨砂金属','Brushed metal'],inkSample:['先把网站做出来吧。','Let’s get the site made.'],settingsHint:['沿用原演示的材质参数。笔画效果只用于短标题，正文保持清晰。','Uses the original material settings. Ink texture affects short titles only; body text stays clear.'],restore:['重新读取原演示的参数','Read original material settings again']
};
const c=key=>copy[key]?.[prefs.lang==='zh'?0:1]??key;
const internal=(path,label,attrs='')=>`<a href="#${h(path)}" ${attrs}>${label}</a>`;
const external=(url,label,attrs='')=>`<a href="${h(url)}" target="_blank" rel="noopener noreferrer" ${attrs}>${h(label)}</a>`;
const backHome=()=>internal('home',text('回到桌上','Back to the desk'));
function crumb(parts=[]){return `<nav class="crumb" aria-label="${text('所在位置','Breadcrumb')}">${backHome()}${parts.map(([path,label])=>`<span aria-hidden="true">/</span>${path?internal(path,h(label)):`<span aria-current="page">${h(label)}</span>`}`).join('')}</nav>`;}
function heading(title,description='',count=''){return `<header class="page-top"><div><h1 id="page-title" tabindex="-1" class="written ink">${h(title)}</h1>${description?`<p>${h(description)}</p>`:''}</div>${count?`<span class="page-count">${h(count)}</span>`:''}</header>`;}
const draftTag=()=>`<span class="draft-tag">${text('整理稿 · 待本人确认','Edited draft · Pending approval')}</span>`;
const sourceNote=()=>`<p class="provenance">${text('经历依据所提供的 CV；论文版本见各条目。文字是结构演示用整理稿，尚未作为正式个人介绍发布。','Experience is based on the supplied CV. Paper versions are listed individually. This edited copy is for the demo and is not a published personal statement.')}</p>`;

function home(){return deskHome(prefs.lang);}
function workRows(){const rows=filteredWorks(query,kind,prefs.lang);return rows.map(w=>`<li class="work-row">${internal(`work/${w.id}`,`<span class="row-num">${String(works.indexOf(w)+1).padStart(2,'0')}</span><div><h2>${h(local(w.title))}</h2><p class="row-context">${h(w.context)}</p><p class="row-summary">${h(local(w.summary))}</p></div><div class="row-end"><span>${h(w.year)}</span><span class="availability">${w.pdf?text('可读全文','Read PDF'):w.kind==='project'?text('工作记录','Record'):text('外部来源','Sources')}</span></div>`)}</li>`).join('');}
function workCollection(){
 return `${crumb([[null,c('works')]])}${heading(c('works'),text('做过、参与过的，先收在这里。','Work I have made or contributed to.'),String(works.length).padStart(2,'0'))}
 <div class="collection-layout"><aside class="collection-sidebar" aria-label="${text('筛选内容','Filter content')}"><p class="sidebar-label">${text('按内容找','Browse by format')}</p>${[['all',text('一起看','All')],['paper',text('论文','Papers')],['project',text('项目 / 工作记录','Projects / records')]].map(([key,name])=>`<button type="button" data-kind="${key}" aria-pressed="${kind===key}">${name}</button>`).join('')}<p class="sidebar-note">${text('不是每一项都有完整的故事。有的先放论文，有的还只是一段记录。','Some entries have a paper; others are still short records.')}</p></aside>
 <section aria-label="${c('works')}"><div class="search-line"><label class="visually-hidden" for="work-search">${text('搜索标题、机构或年份','Search titles, organisations, or years')}</label><input type="search" id="work-search" placeholder="${text('找标题、机构、年份','Title, organisation, year')}" value="${h(query)}"><output id="work-count" aria-live="polite">${filteredWorks(query,kind,prefs.lang).length} / ${works.length}</output></div><ul id="work-list">${workRows()}</ul><div id="work-empty" class="empty" ${filteredWorks(query,kind,prefs.lang).length?'hidden':''}><p>${text('没有找到。换个词，或者取消筛选试试。','No matches. Try another term or clear the filters.')}</p><button type="button" id="clear-search" class="underlined">${text('清除筛选','Clear filters')}</button></div>${sourceNote()}</section></div>`;
}
function experienceCollection(){
 return `${crumb([[null,c('experiences')]])}${heading(text('读书与经历','Education & experience'),text('读过的学校，待过的地方。','Places I have studied and spent time.'))}${archiveContents(prefs.lang,archiveSection,group,selectedOrg)}`;
}
function relatedWorks(ids=[]){if(!ids.length)return '';return `<section class="related-block"><h2>${text('这段经历里的工作','Work from this experience')}</h2>${ids.map(id=>internal(`work/${id}`,`${h(local(findWork(id).title))} ↗`)).join('')}</section>`;}
function workDetail(){const w=findWork(route.id);return `<article class="document-page">${crumb([['works',c('works')],[null,local(w.title)]])}<header class="document-heading"><p class="tiny">${h(w.year)} · ${h(w.context)}</p><h1 id="page-title" tabindex="-1">${h(local(w.title))}</h1>${w.fullTitle!==local(w.title)?`<p class="paper-title" lang="en">${h(w.fullTitle)}</p>`:''}${w.authors?`<p class="authors">${h(w.authors)}</p>`:''}</header><div class="document-grid"><div class="document-body">${draftTag()}${local(w.body).map(p=>`<p>${h(p)}</p>`).join('')}${w.experience?`<section class="related-block"><h2>${text('当时的经历','Associated experience')}</h2>${internal(`experience/${w.experience}`,`${h(local(findExperience(w.experience).name))} ↗`)}</section>`:''}</div><aside class="document-aside" aria-label="${text('论文与来源','Paper and sources')}">${w.pdf?`${internal(`paper/${w.id}`,`<img src="desk-assets/${h(w.thumb)}" alt="${text('论文首页','Paper first page')}" loading="lazy">`,'class="sheet-preview"')}${internal(`paper/${w.id}`,text('在这里读论文','Read the paper here'),'class="primary-link"')}`:`<h2>${text('现有材料','Available material')}</h2><p>${text('本站暂未收录全文或演示，以下是已有入口。','The full text or demo is not hosted here yet. Available links are listed below.')}</p>`}<p>${h(local(w.version))}${w.pages?` · ${w.pages} ${text('页','pages')}`:''}</p>${w.links.length?external(w.links[0][1],w.links[0][0]):''}${w.links.length>1?`<details><summary>${text('其他版本与来源','Other versions and sources')}</summary>${w.links.slice(1).map(([label,url])=>external(url,label)).join('')}</details>`:''}</aside></div><div class="document-bottom">${internal('works',text('回到论文和项目','Back to papers & projects'))}</div></article>`;}
function experienceDetail(){const e=findExperience(route.id);return `<article class="document-page">${crumb([['experiences',c('experiences')],[null,local(e.name)]])}<header class="document-heading experience-heading">${experiencePin(e.id)}<p class="tiny">${h(e.date)}</p><h1 id="page-title" tabindex="-1">${h(local(e.name))}</h1><p class="paper-title">${h(local(e.role))}</p></header><div class="document-grid"><div class="document-body">${local(e.body).map(p=>`<p>${h(p)}</p>`).join('')}${relatedWorks(e.related)}<p class="note-tail">${text('依据 CV 整理。个人叙述及可公开的过程材料尚待补充。','Based on the CV. Personal recollections and public process material remain to be added.')}</p></div><aside class="document-aside"><h2>${text('记录信息','Record details')}</h2><p>${h(e.date)}</p><p>${h(local(e.role))}</p>${(e.links??[]).map(([label,url])=>external(url,label)).join('')}</aside></div><div class="document-bottom">${internal('experiences',text('回到经历','Back to experience'))}</div></article>`;}
function noteCollection(){return `<section class="note-index">${crumb([[null,c('notes')]])}${heading(c('notes'),text('有的只写了几句。','Some are only a few sentences.'),String(notes.length).padStart(2,'0'))}${notes.map(n=>`<article class="note-entry">${internal(`note/${n.id}`,`<header><h2 class="written ink">${h(local(n.title))}</h2><span class="tiny">${h(n.date)}</span></header><p>${h(local(n.paragraphs)[0])}</p><span class="tiny">${h(local(n.tag))} · ${text('整理稿','Edited draft')}</span>`)}</article>`).join('')}<p class="provenance">${text('这两篇取自网站与设计讨论，由助手整理，尚待本人确认。私人交流没有放在这里。','These two drafts were edited from website and design discussions and await approval. Private conversations are not included.')}</p></section>`;}
function noteDetail(){const n=findNote(route.id);return `<article class="reading-note">${crumb([['notes',c('notes')],[null,local(n.title)]])}<header class="document-heading"><p class="tiny">${h(n.date)} · ${h(local(n.tag))}</p><h1 id="page-title" tabindex="-1" class="written ink">${h(local(n.title))}</h1></header><div class="document-body">${local(n.paragraphs).map(p=>`<p>${h(p)}</p>`).join('')}</div><p class="note-tail">${text('由现有讨论整理，尚未定稿。这里先看阅读和排版。','Edited from existing discussion, not final copy. This page tests reading and layout.')}</p><div class="document-bottom">${internal('notes',text('回到笔记','Back to notes'))}</div></article>`;}
function imageCollection(){return `${crumb([[null,text('几张材质图','Material studies')]])}${heading(text('几张材质图','A few material studies'),text('为这个网站生成的材质图。不是我的摄影或实物作品。','Generated material images for this website, not my photography or physical work.'),String(pictures.length).padStart(2,'0'))}<div class="photo-grid">${pictures.map(p=>`<figure>${internal(`image/${p.id}`,`<span class="surface"><img src="assets/${h(p.file)}" alt="${h(local(p.alt))}" loading="lazy" decoding="async"></span><figcaption>${h(local(p.title))}</figcaption>`)}</figure>`).join('')}</div>`;}
function imageDetail(){const i=pictures.findIndex(p=>p.id===route.id),p=pictures[i];return `${crumb([['images',text('几张材质图','Material studies')],[null,local(p.title)]])}${heading(local(p.title),'',`${i+1} / ${pictures.length}`)}<figure class="photo-reader"><img src="assets/${h(p.file)}" alt="${h(local(p.alt))}" decoding="async"><figcaption>${h(local(p.alt))}</figcaption><div class="photo-nav">${i?internal(`image/${pictures[i-1].id}`,text('上一张','Previous')):'<span></span>'}${internal('images',text('回到图集','Back to the collection'))}${i<pictures.length-1?internal(`image/${pictures[i+1].id}`,text('下一张','Next')):'<span></span>'}</div></figure>`;}
function paper(){const w=findWork(route.id),url=`desk-assets/${w.pdf}`;return `<section class="pdf-page">${crumb([['works',c('works')],[`work/${w.id}`,local(w.title)],[null,text('全文','Full text')]])}${heading(local(w.title))}<div class="pdf-toolbar"><p>${h(local(w.version))} · ${w.pages} ${text('页','pages')}</p><div>${external(url,text('单独打开 PDF','Open PDF separately'))} · <a href="${h(url)}" download>${text('下载','Download')}</a></div></div><object class="pdf-frame" type="application/pdf" data="${h(url)}#view=FitH" aria-label="${h(local(w.title))} PDF"><p class="pdf-fallback">${text('此浏览器不能嵌入 PDF。','This browser cannot display an embedded PDF.')} ${external(url,text('打开或下载全文','Open or download the full text'))}</p></object><p class="pdf-fallback">${text('如果这里没有显示，','If the document does not appear, ')}${external(url,text('单独打开 PDF','open the PDF separately'))}。${text('这是原文件，不是重新排过的论文。','This is the original file, not a reformatted paper.')}</p></section>`;}
function structure(){return `<article class="structure-page">${crumb([[null,c('structure')]])}${heading(text('内容分层，不给人分类','Layers for content, not labels for a person'))}<p class="structure-intro">${text('首页可以同时有论文、音乐、一张图和几句话。往里走时，再按内容需要，换成目录、长文或阅读器。没有“科研的我”“商业的我”几套互不相干的网站。','The desk can hold a paper, music, a picture, and a few words. Going deeper opens an index, a text, or a reader as needed. It does not split the person into separate research, business, or personal websites.')}</p><div class="levels">
 <section class="level"><div><span class="mono">01</span><h2>${text('桌上','The desk')}</h2></div><div><p>${text('只露出几件东西。位置是这次选择怎么摆，不是成就排名，也不随内容数量无限增加。','A small selection. Placement is a choice for this visit, not a ranking of achievements or an endless feed.')}</p><div class="level-links">${internal('home',text('回到首页看看','Open the home page'))}</div></div></section>
 <section class="level"><div><span class="mono">02</span><h2>${text('打开一份','Open a collection')}</h2></div><div><p>${text('论文和项目用能搜索的目录；经历按时间找到组织和参与；笔记先露出一小段；图片用图集。它们不必长得一样。','Papers and projects use a searchable index. Experience uses dated records. Notes have short excerpts, and images have a gallery. Each collection has a different reading rhythm.')}</p><div class="level-links">${internal('works',c('works'))}${internal('experiences',c('experiences'))}${internal('notes',c('notes'))}${internal('images',text('图集','Images'))}</div></div></section>
 <section class="level"><div><span class="mono">03</span><h2>${text('具体的一件事','One particular thing')}</h2></div><div><p>${text('点进来才读细节。经历可以连接论文，论文保留版本和来源。文字直接读，图片单独看。长 PDF 在点开时才加载。','Details live here. An experience can link to a paper, with its versions and sources intact. Text can simply be read, and an image seen on its own. Long PDFs load only when opened.')}</p><div class="level-links">${internal('experience/cas',text('经历 → 相关论文','Experience → related paper'))}${internal('work/heatwave',text('论文 → 全文','Paper → full text'))}${internal('note/website',text('读一段文字','Read a note'))}</div></div></section></div>
 <p class="structure-note">${text('这里的层级是阅读顺序，不是公开程度。私密笔记不打包进网页，也不能靠“隐藏链接”来保密。当前 demo 只包含 CV 事实、两篇待确认整理稿、生成试图和三份公开预印本。','These layers describe reading, not privacy. Private notes must not be bundled into the site or protected merely by hiding a link. This demo contains CV facts, two unapproved edited drafts, generated studies, and three public preprints.')}</p>
 <p class="structure-note">${text('不同页面共用材质、导航和阅读设置。内容多了，先增加目录里的条目；只有现有阅读方式确实不够用，才加新的页面形式。','Pages share materials, navigation, and reading settings. More content adds entries first; a new page format is needed only when the existing reading modes are insufficient.')}</p><div class="structure-links"><a href="home.html">${text('对照原来的主页','Compare the previous homepage')}</a>${internal('home',text('试用这版','Try this version'))}</div></article>`;}
const view={home,works:workCollection,experiences:experienceCollection,notes:noteCollection,work:workDetail,experience:experienceDetail,note:noteDetail,images:imageCollection,image:imageDetail,paper,structure};
function render({focus=false,y=0}={}){
 const openDetails=['.earlier-studies','.membership-records'].filter(s=>document.querySelector(s)?.open);
 $('main').innerHTML=(view[route.page]??(()=>`${crumb()}${heading(text('这份内容不在这里','This entry is not here'))}${backHome()}`))();
 for(const s of openDetails){const detail=document.querySelector(s);if(detail)detail.open=true;}
 placeOrganisationContext();
 const collection={work:'works',paper:'works',experience:'experiences',note:'notes'}[route.page]??route.page;
 for(const a of document.querySelectorAll('[data-nav]')){if(a.dataset.nav===collection)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');}
 document.title=`${$('page-title')?.textContent??'TY H.'} · TY H.`;
 updateMusic();
 requestAnimationFrame(()=>{if(focus)$('page-title')?.focus({preventScroll:true});window.scrollTo({top:y,behavior:'instant'});});
}
function applyPrefs(){root.lang=prefs.lang==='zh'?'zh-CN':'en';root.dataset.theme=prefs.theme;root.dataset.lettering=prefs.lettering;root.dataset.material=prefs.material;root.style.fontSize=`${prefs.size}%`;
 for(const [key,value] of Object.entries({'--grain':prefs.grain/100,'--object-grain':prefs.grain/145,'--shadow-opacity':prefs.relief/220,'--shadow-y':`${prefs.relief/7}px`,'--shadow-blur':`${prefs.relief/4}px`,'--frost':`${prefs.frost}px`}))root.style.setProperty(key,value);
 // Match the original dry-ink response; no blur or dilation is added here.
 const ink=Math.min(prefs.ink,80);root.classList.toggle('no-ink',ink===0);$('ink-displacement').setAttribute('scale',String(ink/30));$('ink-opacity').setAttribute('slope',String(ink/100));$('ink-opacity').setAttribute('intercept',String(1-ink/100));
 document.querySelector('meta[name="theme-color"]').content=prefs.theme==='dark'?'#272c29':'#eeeee7';
 for(const n of document.querySelectorAll('[data-copy]'))n.textContent=c(n.dataset.copy);
 $('theme').textContent=text(prefs.theme==='light'?'暗色':'明色',prefs.theme==='light'?'Dark':'Light');$('theme').setAttribute('aria-pressed',String(prefs.theme==='dark'));
 $('language').textContent=prefs.lang==='zh'?'EN':'中文';$('language').lang=prefs.lang==='zh'?'en':'zh-CN';$('language').setAttribute('aria-label',text('切换为英文','Switch to Chinese'));
 $('size').textContent=prefs.size===100?'A / A+':`${prefs.size}%`;$('size').setAttribute('aria-label',text(`切换字号，当前 ${prefs.size}%`,`Change text size, currently ${prefs.size}%`));
 document.querySelector('.desk-header nav').setAttribute('aria-label',text('主导航','Main navigation'));
 $('material').value=prefs.material;
 $('ranges').innerHTML=[['grain',40,'表面颗粒','Surface grain'],['ink',80,'笔画粗糙','Ink roughness'],['relief',100,'物件阴影','Object shadows'],['frost',12,'描图纸雾度','Tracing-paper haze']].map(([key,max,zh,en])=>`<div class="range-control"><label for="pref-${key}">${text(zh,en)}</label><output id="val-${key}" for="pref-${key}">${Math.min(max,prefs[key])}</output><input type="range" id="pref-${key}" data-pref="${key}" min="0" max="${max}" value="${Math.min(max,prefs[key])}" ${key==='frost'&&prefs.material!=='vellum'?'disabled':''}></div>`).join('');
}
function savePrefs(){try{localStorage.setItem('ty-desk-v1',JSON.stringify(prefs));}catch{/* Reading does not depend on storage. */}}
function changePrefs(patch){const lang=prefs.lang,y=scrollY;prefs=cleanPreferences({...prefs,...patch});savePrefs();applyPrefs();if(lang!==prefs.lang)render({y});}
function snapshot(){history.replaceState({...history.state,desk:{y:scrollY,focus:document.activeElement?.id}},'',location.href);}
function navigate(hash){if(hash===currentHash)return;snapshot();history.pushState({desk:{y:0}},'',hash);currentHash=hash;route=routeFrom(hash);render({focus:true});}
function closeDialog(id){$(id)?.close();}
function updateMusic(){updateDeskMusic(prefs.lang);}
function placeOrganisationContext(){
 const context=$('organisation-context'),grid=document.querySelector('.organisation-grid');
 if(!context||!grid)return;
 context.hidden=!selectedOrg;
 if(!selectedOrg)return;
 const buttons=[...grid.querySelectorAll('[data-org]')];
 const index=buttons.findIndex(b=>b.dataset.org===selectedOrg);if(index<0)return;
 const columns=getComputedStyle(grid).gridTemplateColumns.trim().split(/\s+/).length;
 const rowEnd=buttons[Math.min(buttons.length-1,(Math.floor(index/columns)+1)*columns-1)];
 if(rowEnd.nextElementSibling!==context){
  const active=context.contains(document.activeElement)?document.activeElement:null;
  rowEnd.after(context);active?.focus({preventScroll:true});
 }
}
function selectOrganisation(id,keyboard=false){
 const previous=selectedOrg;selectedOrg=id===selectedOrg?null:id;
 const context=$('organisation-context');if(!context)return;
 context.innerHTML=organisationContext(prefs.lang,selectedOrg);
 placeOrganisationContext();
 document.querySelectorAll('[data-org]').forEach(b=>b.setAttribute('aria-expanded',String(b.dataset.org===selectedOrg)));
 if(selectedOrg){
  const title=$('selected-organisation'),button=$(`org-${selectedOrg}`);title.tabIndex=-1;
  if(keyboard)title.focus({preventScroll:true});
  // Keep the selected object and beginning of its records together, not the
  // bottom of a potentially long panel at the expense of the source object.
  const r=button.getBoundingClientRect(),panel=context.getBoundingClientRect();
  if(r.top<24||panel.top>innerHeight-200)window.scrollTo({top:Math.max(0,scrollY+r.top-24),behavior:'instant'});
 }
 else if(previous)$(`org-${previous}`)?.focus({preventScroll:true});
}
document.addEventListener('click',event=>{
 const a=event.target.closest('a[href^="#"]');if(a&&!event.defaultPrevented&&event.button===0&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey){if(a.hash==='#main'){event.preventDefault();$('main').focus();return;}event.preventDefault();navigate(a.hash);return;}
 const b=event.target.closest('button');if(!b)return;
 if(b.dataset.close){closeDialog(b.dataset.close);return;}
 if(b.hasAttribute('data-close-org')){selectOrganisation(null);return;}
 if(b.dataset.org){selectOrganisation(b.dataset.org,event.detail===0);return;}
 if(b.dataset.archiveSection){
  const y=Math.min(scrollY,document.querySelector('.archive-tabs').getBoundingClientRect().top+scrollY-24);
  archiveSection=b.dataset.archiveSection;selectedOrg=null;render({y:Math.max(0,y)});
  $(`archive-tab-${archiveSection}`)?.focus({preventScroll:true});return;
 }
 if(b.id==='theme')changePrefs({theme:prefs.theme==='light'?'dark':'light'});
 if(b.id==='language')changePrefs({lang:prefs.lang==='zh'?'en':'zh'});
 if(b.id==='size')changePrefs({size:({100:115,115:130,130:100})[prefs.size]});
 if(b.id==='settings-open')$('settings').showModal();
 if(b.id==='music-play')void toggleDeskMusic(prefs.lang);
 if(b.id==='restore-material'){prefs=cleanPreferences({...original(),lang:prefs.lang,theme:prefs.theme,size:prefs.size});savePrefs();applyPrefs();$('settings-status').textContent=text('已读取。原演示的设置没有改动。','Read successfully. The original settings were not changed.');}
 if(b.dataset.kind){kind=b.dataset.kind;render({y:scrollY});}
 if(b.dataset.group){group=b.dataset.group;selectedOrg=null;render({y:scrollY});document.querySelector(`[data-group="${group}"]`)?.focus({preventScroll:true});}
 if(b.id==='clear-search'){query='';kind='all';render({y:scrollY});$('work-search')?.focus();}
});
document.addEventListener('input',event=>{
 const el=event.target;if(el.id==='work-search'){query=el.value;$('work-list').innerHTML=workRows();const count=filteredWorks(query,kind,prefs.lang).length;$('work-count').textContent=`${count} / ${works.length}`;$('work-empty').hidden=count>0;}
 if(el.dataset.pref){const key=el.dataset.pref;prefs=cleanPreferences({...prefs,[key]:Number(el.value)});savePrefs();$(`val-${key}`).value=prefs[key];const css={grain:['--grain',prefs.grain/100],relief:['--shadow-opacity',prefs.relief/220],frost:['--frost',`${prefs.frost}px`]};if(css[key])root.style.setProperty(...css[key]);if(key==='grain')root.style.setProperty('--object-grain',prefs.grain/145);if(key==='relief'){root.style.setProperty('--shadow-y',`${prefs.relief/7}px`);root.style.setProperty('--shadow-blur',`${prefs.relief/4}px`);}if(key==='ink'){root.classList.toggle('no-ink',prefs.ink===0);$('ink-displacement').setAttribute('scale',String(prefs.ink/30));$('ink-opacity').setAttribute('slope',String(prefs.ink/100));$('ink-opacity').setAttribute('intercept',String(1-prefs.ink/100));}}
});
document.addEventListener('change',e=>{if(e.target.id==='material')changePrefs({material:e.target.value});});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&selectedOrg&&!document.querySelector('dialog[open]')){selectOrganisation(null);e.preventDefault();}});
document.addEventListener('keydown',e=>{const tab=e.target.closest('[data-archive-section]');if(!tab||!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;const i=archiveSections.indexOf(tab.dataset.archiveSection),next=e.key==='Home'?0:e.key==='End'?archiveSections.length-1:(i+(e.key==='ArrowRight'?1:-1)+archiveSections.length)%archiveSections.length;e.preventDefault();$(`archive-tab-${archiveSections[next]}`)?.focus();});
bindDeskAudio(()=>prefs.lang);
window.addEventListener('popstate',()=>{clearTimeout(scrollTimer);currentHash=location.hash;route=routeFrom(currentHash);render({focus:true,y:history.state?.desk?.y??0});requestAnimationFrame(()=>{const id=history.state?.desk?.focus;if(id)$(id)?.focus({preventScroll:true});});});
window.addEventListener('hashchange',()=>{if(location.hash===currentHash)return;currentHash=location.hash;route=routeFrom(currentHash);render({focus:true});});
window.addEventListener('scroll',()=>{clearTimeout(scrollTimer);scrollTimer=setTimeout(snapshot,130);},{passive:true});
let organisationResize;
window.addEventListener('resize',()=>{cancelAnimationFrame(organisationResize);organisationResize=requestAnimationFrame(placeOrganisationContext);},{passive:true});
applyPrefs();render({y:history.state?.desk?.y??0});
