import {works, experiences, notes, pictures} from '../desk-data.mjs';
import {education} from '../desk-background.mjs';
import {organisations, credentials, currentRoleIds, experienceTags} from '../desk-affiliations.mjs';
import {home, music} from './config.mjs';
import Play from '../vendor/play.js';
import Pause from '../vendor/pause.js';

const $ = id => document.getElementById(id);
const escape = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const read = key => {try {const v = JSON.parse(localStorage.getItem(key)); return v && typeof v === 'object' ? v : {};} catch {return {};}};
const imported = {...read('ty-desk-v1'), ...read('ty-table-v1')};
const clamp = (v, low, high, fallback) => Number.isFinite(Number(v)) ? Math.min(high,Math.max(low,Number(v))) : fallback;
const prefs = {
  lang: imported.lang === 'en' ? 'en' : 'zh',
  theme: imported.theme === 'dark' ? 'dark' : 'light',
  size: [100,115,130].includes(imported.size) ? imported.size : 100,
  grain: clamp(imported.grain,0,40,40), ink: clamp(imported.ink,0,95,68),
  relief: clamp(imported.relief,0,100,74), frost: clamp(imported.frost,0,12,3),
  material: ['vellum','paper','metal'].includes(imported.material) ? imported.material : 'vellum',
};
const t = (zh,en) => prefs.lang === 'zh' ? zh : en;
const l = value => typeof value === 'object' ? value?.[prefs.lang] ?? '' : value ?? '';
const text = value => escape(l(value));
const asset = file => `../desk-assets/${file}`;
const media = file => `../assets/${file}`;
const workById = id => works.find(w => w.id === id);
const experienceById = id => experiences.find(e => e.id === id);
const orgById = id => organisations.find(o => o.id === id);
const shortNames = {'polyu':'PolyU','tsinghua':'Tsinghua','hkcc':'HKCC','smart':'SMART','cas':'CAS','polysmart':'PolySmart','iluvatar':'Iluvatar','qiyuan':'Qiyuan','royal-plaza':'Royal Plaza','x-institute':'X-Institute','hksar':'HKSAR','cpce':'CPCE'};
const studyOrgs = ['polyu','tsinghua','hkcc'];
let selectedOrg = 'polyu';
let workKind = 'all';
let workQuery = '';
let recordGroup = 'all';
let recordQuery = '';
let playing = false;
let loading = false;
let audioError = false;
let travellingMark = null;

// Carry the same university mark between the desk and the index, rather than
// applying an unrelated transition to every page. Animate one composited image.
function rememberMark(destination){
  const [page]=route();
  const selector=page==='home' && destination==='#background'?'.pin-pair img:first-child':
    ['background','organisation'].includes(page) && destination==='#home'?'#org-polyu img':null;
  if(!selector||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const original=document.querySelector(selector);if(!original)return;
  const r=original.getBoundingClientRect();
  if(r.bottom<0||r.top>innerHeight)return;
  travellingMark={src:original.src,x:r.x,y:r.y,width:r.width,height:r.height};
}
function moveMark(){
  const origin=travellingMark;travellingMark=null;if(!origin)return;
  const destination=document.querySelector(route()[0]==='home'?'.pin-pair img:first-child':'#org-polyu img');
  if(!destination)return;
  const r=destination.getBoundingClientRect();
  if(!r.width||r.top>innerHeight)return;
  const image=document.createElement('img');image.src=origin.src;image.alt='';image.className='travel-mark';image.setAttribute('aria-hidden','true');
  Object.assign(image.style,{position:'fixed',left:'0',top:'0',width:`${r.width}px`,height:`${r.height}px`,objectFit:'contain',transformOrigin:'0 0',zIndex:'90',pointerEvents:'none'});
  destination.style.visibility='hidden';document.body.append(image);
  const animation=image.animate([
    {transform:`translate(${origin.x}px,${origin.y}px) scale(${origin.width/r.width},${origin.height/r.height})`},
    {transform:`translate(${r.x}px,${r.y}px) scale(1,1)`}
  ],{duration:360,easing:'cubic-bezier(.2,.75,.2,1)',fill:'forwards'});
  const clear=()=>{image.remove();destination.style.visibility='';};
  animation.finished.then(clear,clear);
}

function savePrefs(){try {localStorage.setItem('ty-table-v1', JSON.stringify(prefs));} catch {}}
function applyPrefs(){
  const root = document.documentElement;
  root.lang = prefs.lang === 'en' ? 'en' : 'zh-CN';
  root.dataset.theme = prefs.theme;
  root.dataset.size = prefs.size;
  root.style.fontSize = `${16 * prefs.size / 100}px`;
  root.style.setProperty('--grain',String(prefs.grain / 265));
  root.style.setProperty('--shadow',String(prefs.relief / 300));
  root.style.setProperty('--frost',`${prefs.frost}px`);
  $('ink-displacement').setAttribute('scale',String(prefs.ink / 30));
  $('ink-opacity').setAttribute('slope',String(prefs.ink / 100));
  $('ink-opacity').setAttribute('intercept',String(1 - prefs.ink / 100));
  document.querySelectorAll('.note-object').forEach(n => n.dataset.material = prefs.material);
  document.querySelector('meta[name=theme-color]').content = prefs.theme === 'dark' ? '#272e30' : '#e9e8e1';
}
function route(){
  let raw;try {raw = decodeURIComponent(location.hash.replace(/^#\/?/,''));} catch {return ['missing'];}
  const parts = (raw || 'home').split('/');
  if(parts.length > 2)return ['missing'];
  const [page,id] = parts;
  if(['home','works','notes','images'].includes(page) && !id)return parts;
  if(page === 'background' && (!id || ['organisations','years','credentials'].includes(id)))return ['background',id || 'organisations'];
  if(page === 'organisation' && orgById(id))return parts;
  if(page === 'experience' && experienceById(id))return parts;
  if(page === 'work' && workById(id))return parts;
  if(page === 'paper' && workById(id)?.pdf)return parts;
  if(page === 'note' && notes.some(n=>n.id===id))return parts;
  if(page === 'image' && pictures.some(p=>p.id===id))return parts;
  return ['missing'];
}
function heading(title, description = '', back = '#home', backLabel = t('桌面','Desk')){
  return `<a class="back-link" href="${back}">← ${escape(backLabel)}</a><header class="page-head"><h1>${escape(title)}</h1>${description ? `<p>${escape(description)}</p>` : ''}</header>`;
}
function header(){
  const [page] = route();
  const selected = ['organisation','experience','background'].includes(page) ? 'background' : ['work','paper','works'].includes(page) ? 'works' : ['note','notes'].includes(page) ? 'notes' : '';
  $('header').innerHTML = `<a class="wordmark" href="#home" aria-label="${t('Tin-Yeh Huang，返回桌面','Tin-Yeh Huang, return to desk')}">TY H.</a><nav class="primary-nav" aria-label="${t('主导航','Main navigation')}">${[['works',t('论文与项目','Works')],['background',t('经历','Background')],['notes',t('笔记','Notes')]].map(([id,name])=>`<a href="#${id}" ${id===selected?'aria-current="page"':''}>${name}</a>`).join('')}</nav><div class="utility"><button type="button" id="language" aria-label="${t('Switch to English','切换中文')}">${t('EN','中')}</button><button type="button" id="settings-open" aria-haspopup="dialog">${t('外观','Appearance')}</button><button type="button" id="audio-in-header" class="active-audio" ${playing?'':'hidden'} aria-label="${t('暂停音乐','Pause music')}">Ⅱ</button></div>`;
}
function footer(){
  const isHome = route()[0] === 'home';
  $('footer').innerHTML = `<div class="footer-note">${isHome?`<span>${text(home.update)}</span><time>${home.update.date}</time>`:`<span>${t('个人网站 demo · 尚未发布','Personal site demo · Not published')}</span>`}</div><a href="#images">${t('材质示意','Material studies')} ↗</a>`;
}
function icon(nodes){return `<svg viewBox="0 0 24 24" aria-hidden="true">${nodes.map(([tag,attrs])=>`<${tag} ${Object.entries(attrs).map(([k,v])=>`${k}="${escape(v)}"`).join(' ')}/>`).join('')}</svg>`;}
function homePage(){
  const paper = workById(home.paper), note = notes.find(n=>n.id===home.note), photo = pictures.find(p=>p.id===home.photo);
  return `<section class="intro"><h1>${escape(home.name)}</h1><p>${text(home.study)}<br>${text(home.intro)}</p></section>
  <div class="tabletop">
    <section class="records-pile" aria-label="${t('文件、照片与经历','Papers, a material study and background')}">
      <a class="dossier" href="#background"><span class="folder-caption">${t('学习与经历','Background')} ↗<small>${t('学习 · 工作 · 参与','STUDY · WORK · PARTICIPATION')}</small></span><span class="pin-pair" aria-hidden="true"><img src="${asset('pins/polyu.png')}" width="66" height="66" alt=""><img src="${asset('pins/smart-pin.png')}" width="76" height="60" alt=""></span></a>
      <a class="photo-object" href="#image/${photo.id}" aria-label="${text(photo.alt)}"><img src="${media(photo.file)}" width="1672" height="941" alt=""><span class="photo-caption">${t('生成材质示意','Generated material study')}</span></a>
      <a class="paper-object" href="#works"><span class="paper-label">${t('论文与项目','Papers & projects')} ↗</span><div class="paper-cover"><img src="${asset(paper.thumb)}" width="800" height="1100" alt="${escape(paper.fullTitle)}"></div></a>
      <span class="pile-caption">${t('点开物件，也可以用上方目录。','Open an object, or use the navigation.')}</span>
    </section>
    <section class="objects-right" aria-label="${t('音乐与便笺','Music and a note')}">
      <div class="player-object"><img class="player-art" src="${asset('mp3-petrol-v2.png')}" width="1536" height="1024" alt=""><div class="player-screen"><strong>${escape(music.title)}</strong><span>${escape(music.artist)}</span></div><button type="button" id="player-toggle" class="player-button" aria-label="${t('播放音乐试听','Play music preview')}" aria-pressed="false">${icon(Play)}</button></div>
      <div class="player-foot"><span id="music-status" role="status">${t('约 30 秒试听','~30 sec preview')}</span><a href="${escape(music.sourceUrl)}" target="_blank" rel="noopener noreferrer">Apple Music ↗</a></div>
      <div class="notes-pile"><img class="metal-object" src="${asset('oxide-plate-v2.png')}" width="1536" height="1024" alt="" aria-hidden="true"><a class="note-object" data-material="${prefs.material}" href="#notes"><h2 class="hand">${text(note.title)}</h2><p class="hand">${t('有些做过，<br>有些只是接触过。','Some things I made;<br>others I took part in.')}</p><span class="note-label">${t('笔记','Notes')} ↗</span></a></div>
    </section>
  </div>`;
}
function backgroundNav(selected){return `<div class="archive-navigation"><a class="back-link" href="#home">← ${t('桌面','Desk')}</a><nav class="index-tabs" aria-label="${t('经历查看方式','Background views')}">${[['organisations',t('按组织','Organisations')],['years',t('按时间','By year')],['credentials',t('会员与证书','Memberships & credentials')]].map(([id,name])=>`<a href="#background/${id}" ${selected===id?'aria-current="page"':''}>${name}</a>`).join('')}</nav></div>`;}
function orgButton(o,index){
  const active = o.id === selectedOrg;
  return `<button type="button" id="org-${o.id}" class="atlas-pin ${o.mark?'has-mark':'word-pin'}" data-org="${o.id}" aria-pressed="${active}" aria-controls="organisation-context" aria-label="${text(o.name)}" style="--angle:${[-6,5,-4,7,-5,3][index%6]}deg">${o.mark?`<img src="${asset(`pins/${o.mark}`)}" width="110" height="110" alt="">`:`<span class="typographic-mark" aria-hidden="true">${escape(shortNames[o.id])}</span>`}<span class="pin-name" ${o.mark?'':'aria-hidden="true"'}>${o.mark?escape(shortNames[o.id]):'&nbsp;'}</span><span class="pin-fullname" aria-hidden="true">${text(o.name)}</span></button>`;
}
function sortedRecords(list){return [...list].sort((a,b)=>Number(b.date.match(/\d{4}/)?.[0]||0)-Number(a.date.match(/\d{4}/)?.[0]||0));}
function contextContents(id){
  const o = orgById(id);
  const studies = (o.study || []).map(id=>education.find(e=>e.id===id));
  const records = sortedRecords(o.records.map(experienceById));
  return `<div class="context-heading"><span class="context-kicker">${studies.length ? text(studies[0].status) : t('参与记录','Involvement')}</span><h1 id="org-context-title" tabindex="-1">${text(o.name)}</h1></div>
  ${studies.map(e=>`<section class="context-study" data-study="${e.id}"><h2>${text(e.course)}</h2><p>${text(e.extra)}</p><time>${escape(e.date)}</time></section>`).join('')}
  <section class="context-roles" aria-labelledby="context-roles-title"><h2 id="context-roles-title">${studies.length?t('也在这里','Also here'):t('在这里的经历','Records here')}</h2>${records.map(e=>`<a href="#experience/${e.id}" class="context-role" data-record="${e.id}"><div><h3>${text(e.role)}</h3><p>${escape(e.date)}${e.id==='kteo'?' · KTEO':''}</p></div><span aria-hidden="true">↗</span></a>`).join('')}</section>
  <p class="context-footnote">${t('学习与任职分别记录。内容依据 CV，细节与公开来源逐项补充。','Study and roles are separate records. Based on the CV; details and public sources are being added.')}</p>`;
}
function atlasPage(){
  return `${backgroundNav('organisations')}<h1 class="sr-only">${t('学习与经历：组织索引','Background: organisation index')}</h1><div class="atlas-layout"><div class="atlas-field"><section class="atlas-studies" aria-labelledby="studies-title"><h2 id="studies-title">${t('学习','Studies')}</h2><div class="study-pins">${studyOrgs.map((id,i)=>orgButton(orgById(id),i)).join('')}</div></section><details class="atlas-others" ${matchMedia('(min-width:761px)').matches?'open':''}><summary id="others-title">${t('其他参与过的地方','Other places')}<span aria-hidden="true">+</span></summary><div class="other-pins">${organisations.filter(o=>!studyOrgs.includes(o.id)).map(orgButton).join('')}</div></details><p class="atlas-hint">${t('点一个标记，看在那里的记录。没有图标的组织暂用文字。','Select a mark to see the records. Text is used where no logo is available.')}</p></div><section id="organisation-context" class="atlas-context" aria-labelledby="org-context-title">${contextContents(selectedOrg)}</section></div>`;
}
function recordRows(records){return records.map(e=>`<li class="record-row" data-record="${e.id}"><a href="#experience/${e.id}"><time>${escape(e.date)}${currentRoleIds.includes(e.id)?`<span class="current-label">${t('CV 所列任期内','CV-listed ongoing term')}</span>`:''}</time><div class="record-copy"><h2>${text(e.role)}</h2><p>${text(e.name)}</p></div><span class="row-arrow" aria-hidden="true">↗</span></a></li>`).join('');}
function filteredRecords(){const q=recordQuery.toLocaleLowerCase().trim();return sortedRecords(experiences.filter(e=>(recordGroup==='all'||(recordGroup==='current'?currentRoleIds.includes(e.id):experienceTags[e.id]?.includes(recordGroup)))&&[l(e.name),l(e.role),e.date].join(' ').toLocaleLowerCase().includes(q)));}
function recordsPage(){
  const groups = [['all',t('全部经历','All experiences')],['research',t('研究','Research')],['work',t('工作与实习','Work & internships')],['service',t('服务与代表','Service & representation')],['projects',t('项目参与','Programmes & projects')],['current',t('CV 所列当前参与','CV-listed current involvement')]];
  return `${backgroundNav('years')}<header class="page-head compact-head"><h1>${t('经历，按时间','Experiences, by year')}</h1></header><div class="collection-tools"><label>${t('类别','Category')}<select id="record-group">${groups.map(([id,label])=>`<option value="${id}" ${id===recordGroup?'selected':''}>${label}</option>`).join('')}</select></label><label><span class="sr-only">${t('查找经历','Find an experience')}</span><input id="record-query" type="search" placeholder="${t('查找组织或身份','Find a place or role')}" value="${escape(recordQuery)}"></label><span id="record-count" class="list-count" role="status"></span></div><ul id="record-list"></ul><p class="source-note">${t('分类可交叉，同一段经历只有一份记录。「当前」依据 CV 所列任期，并非实时任职验证。','Categories can overlap, but each experience has one record. “Current” follows the CV, not live employment verification.')}</p>`;
}
function credentialPage(){return `${backgroundNav('credentials')}<header class="page-head compact-head"><h1>${t('会员与证书','Memberships & credentials')}</h1></header>${['membership','certification'].map(kind=>`<section><h2 class="group-title">${kind==='membership'?t('会员身份','Memberships'):t('专业证书','Certification')}</h2><ul>${credentials.filter(c=>c.kind===kind).map(c=>`<li class="credential-row"><time>${escape(c.date)}</time><div><h3>${kind==='membership'?escape(c.issuer):text(c.title)}</h3><p>${kind==='membership'?text(c.title):escape(c.issuer)}</p>${c.evidence?`<a class="text-link" href="${escape(c.evidence)}" target="_blank" rel="noopener noreferrer">${t('公开凭证','Public credential')} ↗</a>`:''}</div></li>`).join('')}</ul></section>`).join('')}<p class="source-note">${t('依据 CV 记录；公开凭证尚未收录。会员身份不代表任职，也不等同专业认证。','Recorded from the CV; public credentials have not been added. Membership is neither employment nor professional certification.')}</p>`;}
function workRows(items){return items.map(w=>`<li class="work-row"><a href="#work/${w.id}"><span class="work-preview">${w.thumb?`<img src="${asset(w.thumb)}" width="90" height="123" alt="" loading="lazy">`:w.kind==='project'?'↗':t('正文待补','Text pending')}</span><div><h2>${text(w.title)}</h2><p>${escape(w.context)}</p><p>${text(w.summary)}</p></div><time>${escape(w.year)}</time></a></li>`).join('');}
function filteredWorks(){const q=workQuery.toLocaleLowerCase().trim();return works.filter(w=>(workKind==='all'||w.kind===workKind)&&[l(w.title),w.fullTitle,w.context].join(' ').toLocaleLowerCase().includes(q));}
function worksPage(){return `${heading(t('论文与项目','Papers & projects'))}<div class="collection-tools"><label>${t('类别','Category')}<select id="work-kind">${[['all',t('一起看','All')],['paper',t('论文','Papers')],['project',t('项目','Projects')]].map(([id,title])=>`<option value="${id}" ${workKind===id?'selected':''}>${title}</option>`).join('')}</select></label><label><span class="sr-only">${t('查找论文或项目','Find a paper or project')}</span><input id="work-query" type="search" placeholder="${t('查找标题','Find a title')}" value="${escape(workQuery)}"></label><span class="list-count" id="work-count" role="status"></span></div><ul class="work-list" id="work-list"></ul>`;}
function linksMarkup(links=[]){return links.map(([title,url])=>`<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(title)} ↗</a>`).join('');}
function workPage(id){const w=workById(id);return `${heading(l(w.title),w.context,'#works',t('论文与项目','Papers & projects'))}<div class="detail-layout"><article class="prose"><h2 class="full-title">${escape(w.fullTitle)}</h2>${w.authors?`<p class="source-note">${escape(w.authors)}</p>`:''}<div class="version">${text(w.version)}</div>${l(w.body).map(p=>`<p>${escape(p)}</p>`).join('')}${w.pdf?`<img class="pdf-preview" src="${asset(w.thumb)}" alt="${t('所收录 PDF 的首页','First page of the included PDF')}"><a class="text-link" href="#paper/${w.id}">${t('在这里阅读','Read here')} · ${w.pages} ${t('页','pages')} ↗</a>`:''}</article><aside class="detail-aside"><h2>${t('原始入口','Source links')}</h2>${linksMarkup(w.links)}${w.experience?`<h2>${t('相关经历','Related experience')}</h2><a href="#experience/${w.experience}">${text(experienceById(w.experience).name)}</a>`:''}</aside></div>`;}
function paperPage(id){const w=workById(id);return `${heading(l(w.title),l(w.version),`#work/${id}`,t('论文记录','Paper record'))}<div class="reader-choices"><a class="text-link" href="${asset(w.pdf)}" target="_blank" rel="noopener">${t('独立打开 PDF','Open PDF separately')} ↗</a><a class="text-link" href="${asset(w.pdf)}" download>${t('下载这个版本','Download this version')}</a></div><iframe class="pdf-reader" title="${escape(w.fullTitle)}" src="${asset(w.pdf)}#view=FitH"></iframe><p class="source-note">${t('如果手机浏览器没有显示阅读器，请独立打开 PDF。','If your mobile browser does not show the reader, open the PDF separately.')}</p>`;}
function experiencePage(id){const e=experienceById(id);const orgs=organisations.filter(o=>o.records.includes(id));return `${heading(l(e.role),`${l(e.name)} · ${e.date}`,'#background/years',t('经历索引','Experience index'))}<div class="detail-layout"><article class="prose">${l(e.body).map(p=>`<p>${escape(p)}</p>`).join('')}${e.related?.length?`<h2>${t('相关的东西','Related work')}</h2><ul class="work-list">${workRows(e.related.map(workById))}</ul>`:''}</article><aside class="detail-aside">${orgs.length?`<h2>${t('组织','Organisations')}</h2>${orgs.map(o=>`<a href="#organisation/${o.id}">${text(o.name)}</a>`).join('')}`:''}${e.links?.length?`<h2>${t('公开入口','Public sources')}</h2>${linksMarkup(e.links)}`:''}</aside></div>`;}
function notesPage(){return `${heading(t('随手写的','Notes'))}<p class="draft-notice">${t('以下是依据网站讨论整理的文字草稿，尚待本人确认，不是已发表文章。','These are edited drafts from discussions about this website, pending personal approval; they are not published essays.')}</p><ul class="note-list">${notes.map(n=>`<li><a href="#note/${n.id}"><time>${escape(n.date)}</time><div><h2 class="hand">${text(n.title)}</h2><p>${text(n.tag)} · ${t('草稿','Draft')}</p></div></a></li>`).join('')}</ul>`;}
function notePage(id){const n=notes.find(n=>n.id===id);return `${heading(l(n.title),n.date,'#notes',t('笔记','Notes'))}<article class="notes-reading"><p class="draft-notice">${t('整理稿，待本人确认。','Edited draft, pending personal approval.')}</p><div class="prose">${l(n.paragraphs).map(p=>`<p>${escape(p)}</p>`).join('')}</div></article>`;}
function galleryPage(){return `${heading(t('材质示意','Material studies'),t('这些是为网站生成的示意素材，不是我的照片或已完成作品。','These images were generated for the website, not personal photographs or completed work.'))}<div class="gallery">${pictures.map(p=>`<a href="#image/${p.id}"><figure><img src="${media(p.file)}" width="1672" height="941" alt="${text(p.alt)}" loading="lazy"><figcaption>${text(p.title)} ↗</figcaption></figure></a>`).join('')}</div>`;}
function imagePage(id){const p=pictures.find(p=>p.id===id);return `${heading(l(p.title),'','#images',t('材质示意','Material studies'))}<figure class="image-view"><img src="${media(p.file)}" width="1672" height="941" alt="${text(p.alt)}"><figcaption>${text(p.alt)}</figcaption></figure>`;}
function refreshLists(){
  if($('record-list')){const found=filteredRecords();$('record-list').innerHTML=recordRows(found)||`<li class="empty-message">${t('没有对应记录，试试其他词。','No matching records. Try another term.')}</li>`;$('record-count').textContent=t(`${found.length} 段记录`,`${found.length} records`);}
  if($('work-list')){const found=filteredWorks();$('work-list').innerHTML=workRows(found)||`<li class="empty-message">${t('没有找到对应内容。','No matching work.')}</li>`;$('work-count').textContent=t(`${found.length} 项`,`${found.length} items`);}
}
function render(moveFocus=false){
  const [page,id] = route();
  if(page==='organisation')selectedOrg=id;
  header();footer();
  const renderers={home:homePage,works:worksPage,work:()=>workPage(id),paper:()=>paperPage(id),background:()=>id==='years'?recordsPage():id==='credentials'?credentialPage():atlasPage(),organisation:atlasPage,experience:()=>experiencePage(id),notes:notesPage,note:()=>notePage(id),images:galleryPage,image:()=>imagePage(id),missing:()=>`${heading(t('这一页没有找到','Page not found'))}<a class="text-link" href="#home">${t('回桌面','Return to desk')} ↗</a>`};
  $('content').innerHTML=renderers[page]();
  document.body.dataset.page=page;
  refreshLists();applyPrefs();syncMusic();
  const title=$('content').querySelector('h1')?.textContent||'Tin-Yeh Huang';
  document.title=`${title} — Tin-Yeh Huang`;
  if(moveFocus){scrollTo({top:0,behavior:'instant'});$('content').focus({preventScroll:true});}
  moveMark();
}
function selectOrganisation(id){
  if(!orgById(id))return;
  selectedOrg=id;
  // Replace just the context, preserving the spatial index and pointer target.
  history.replaceState(null,'',`#organisation/${id}`);
  document.querySelectorAll('[data-org]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.org===id)));
  const context=$('organisation-context');
  context.innerHTML=contextContents(id);
  $('announcement').textContent=t(`已显示${l(orgById(id).name)}的相关记录。`,`Showing records for ${l(orgById(id).name)}.`);
  document.title=`${l(orgById(id).name)} — Tin-Yeh Huang`;
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches)context.animate([{opacity:.25,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:180,easing:'ease-out'});
  if(matchMedia('(max-width:760px)').matches){context.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});$('org-context-title').focus({preventScroll:true});}
}
function settings(){
  $('preferences').innerHTML=`<div class="dialog-heading"><h2 id="preferences-title">${t('外观与阅读','Appearance & reading')}</h2><button type="button" data-close-settings>${t('完成','Done')}</button></div><label class="setting"><span>${t('明暗','Colour mode')}</span><select data-setting="theme"><option value="light" ${prefs.theme==='light'?'selected':''}>${t('明','Light')}</option><option value="dark" ${prefs.theme==='dark'?'selected':''}>${t('暗','Dark')}</option></select></label><label class="setting"><span>${t('字号','Text size')}</span><select data-setting="size">${[100,115,130].map(size=>`<option value="${size}" ${prefs.size===size?'selected':''}>${size}%</option>`).join('')}</select></label><label class="setting"><span>${t('便笺底材','Note material')}</span><select data-setting="material">${[['vellum',t('半透明描图纸','Translucent vellum')],['paper',t('纸张','Paper')],['metal',t('磨砂金属','Satin metal')]].map(([id,name])=>`<option value="${id}" ${prefs.material===id?'selected':''}>${name}</option>`).join('')}</select></label>${[['grain',40,t('表面颗粒','Surface grain')],['ink',95,t('笔画粗糙','Dry ink')],['relief',100,t('物件阴影','Object shadows')],['frost',12,t('描图纸雾度','Vellum haze')]].map(([id,max,name])=>`<label class="setting"><span>${name}<output id="out-${id}">${prefs[id]}</output></span><input type="range" data-setting="${id}" min="0" max="${max}" value="${prefs[id]}"></label>`).join('')}<p class="hand ink-sample">${t('先把网站做出来。','Getting this site made.')}</p><p class="setting-hint">${t('笔画效果只用于短笔记，不模糊正文。歌曲与内容在配置文件里修改。','Ink texture is limited to short notes; body text stays sharp. Music and content are edited in the configuration files.')}</p>`;
}
function syncMusic(){
  const button=$('player-toggle');
  if(button){button.innerHTML=icon(playing?Pause:Play);button.setAttribute('aria-pressed',String(playing));button.setAttribute('aria-label',playing?t('暂停音乐','Pause music'):t('播放音乐试听','Play music preview'));button.setAttribute('aria-busy',String(loading));}
  const status=$('music-status');
  if(status)status.textContent=audioError?t('试听未载入，可重试或打开来源','Preview unavailable; retry or open source'):loading?t('正在载入…','Loading…'):playing?t('正在试听','Playing preview'):t('约 30 秒试听','~30 sec preview');
  if($('audio-in-header'))$('audio-in-header').hidden=!playing;
}
async function toggleMusic(){
  const audio=$('audio');
  if(!audio.paused||loading){audio.pause();loading=false;syncMusic();return;}
  audioError=false;loading=true;syncMusic();
  if(!audio.getAttribute('src'))audio.src=new URL(music.src,import.meta.url).href;
  audio.volume=clamp(music.volume,0,1,.55);
  try {await audio.play();} catch(e) {if(e.name!=='AbortError'){audioError=true;loading=false;syncMusic();}}
}
for(const event of ['playing','pause','ended','waiting','error'])$('audio').addEventListener(event,()=>{
  playing=!$('audio').paused&&!$('audio').ended;
  if(event==='playing'){loading=false;audioError=false;}
  if(['pause','ended'].includes(event))loading=false;
  if(event==='waiting')loading=true;
  if(event==='error'){audioError=true;loading=false;playing=false;}
  syncMusic();
});
document.addEventListener('click',event=>{
  const el=event.target.closest('button,a');if(!el)return;
  if(el.tagName==='A' && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey)rememberMark(el.hash);
  if(el.id==='language'){prefs.lang=prefs.lang==='zh'?'en':'zh';savePrefs();render();$('language').focus();}
  if(el.id==='settings-open'){settings();$('preferences').showModal();}
  if(el.hasAttribute('data-close-settings'))$('preferences').close();
  if(el.dataset.org)selectOrganisation(el.dataset.org);
  if(el.id==='player-toggle'||el.id==='audio-in-header')toggleMusic();
  if(el.classList.contains('skip-link')){event.preventDefault();$('content').focus();}
});
document.addEventListener('input',event=>{
  const el=event.target;
  if(el.id==='record-query'){recordQuery=el.value;refreshLists();}
  if(el.id==='work-query'){workQuery=el.value;refreshLists();}
  if(el.matches('input[data-setting]')){prefs[el.dataset.setting]=Number(el.value);$(`out-${el.dataset.setting}`).textContent=el.value;savePrefs();applyPrefs();}
});
document.addEventListener('change',event=>{
  const el=event.target;
  if(el.id==='record-group'){recordGroup=el.value;refreshLists();}
  if(el.id==='work-kind'){workKind=el.value;refreshLists();}
  if(el.matches('select[data-setting]')){prefs[el.dataset.setting]=el.dataset.setting==='size'?Number(el.value):el.value;savePrefs();applyPrefs();}
});
$('preferences').addEventListener('close',()=>$('settings-open')?.focus());
window.addEventListener('hashchange',()=>render(true));
render();
