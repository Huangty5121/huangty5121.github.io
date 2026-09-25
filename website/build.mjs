import {mkdir,writeFile,cp,readdir,unlink,rm,readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {join,dirname} from 'node:path';
import {createHash} from 'node:crypto';
import {works,experiences} from './content.mjs';
import {createViews} from './views.mjs';
import {aboutContent} from './about-content.mjs';
import {entries} from './entries.mjs';
import {coverArt} from './cover-art.mjs';
import {music} from '../material-demo/dist/desk-config.mjs';
import * as OpenCC from 'opencc-js';
const zh2t=OpenCC.Converter({from:'cn',to:'hk'});
const source=dirname(fileURLToPath(import.meta.url));
const out=join(source,'../material-demo/dist/site');
const legacy=join(source,'../material-demo/dist');
const cacheKey=createHash('sha256').update(await readFile(join(source,'site.css'))).update(await readFile(join(source,'site.mjs'))).update(await readFile(join(source,'assets/harbour-night.jpg'))).digest('hex').slice(0,10);
const siteOrigin='https://tyhuang.hk';
const publicUrl=(file,lang)=>`${siteOrigin}/${lang==='zh'?'':lang+'/'}${file==='index.html'?'':file}`;
const h=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
await mkdir(join(out,'assets'),{recursive:true});
await mkdir(join(out,'en'),{recursive:true});
await mkdir(join(out,'tw'),{recursive:true});
await mkdir(join(out,'assets/covers'),{recursive:true});
await mkdir(join(out,'assets/notes'),{recursive:true});

await writeFile(join(out,'.nojekyll'),'');
await writeFile(join(out,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${siteOrigin}/sitemap.xml\n`);
await writeFile(join(out,'favicon.svg'),'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#20242b"/><text x="32" y="44" text-anchor="middle" font-size="37" font-family="serif" fill="#f5f5f7">野</text></svg>');
for(const entry of entries)await writeFile(join(out,'assets',entry.cover),coverArt(entry.id));
for(const dir of [out,join(out,'en'),join(out,'tw')])for(const file of await readdir(dir))if(file.endsWith('.html'))await unlink(join(dir,file));
await rm(join(out,'assets/papers'),{recursive:true,force:true});
for(const file of ['site.css','site.mjs'])await cp(join(source,file),join(out,file));
const siteJs=await readFile(join(source,'site.mjs'),'utf8');
await writeFile(join(out,'tw/site.mjs'),zh2t(siteJs).replaceAll("document.body.dataset.lang==='zh'","document.body.dataset.lang!=='en'").replaceAll(/(['`])\.\/assets\//g,'$1../assets/'));
await cp(join(source,'assets/folio-scene-cutout.webp'),join(out,'assets/folio-scene-cutout.webp'));
await cp(join(source,'assets/harbour-night.jpg'),join(out,'assets/harbour-night.jpg'));
for(const file of ['design-decision-cover.png','design-process-sketch.png'])await cp(join(source,'assets/notes',file),join(out,'assets/notes',file));
for(const file of ['dm-sans-400.ttf','dm-sans-500.ttf','dm-sans-600.ttf','OFL-DMSans.txt','wenkai-essay.woff2','OFL-WenKai.txt'])await cp(join(source,'assets',file),join(out,'assets',file));
await cp(join(source,'assets/about'),join(out,'assets/about'),{recursive:true});
await cp(join(source,'assets/albums'),join(out,'assets/albums'),{recursive:true});
await cp(join(source,'assets/news'),join(out,'assets/news'),{recursive:true});
await cp(join(source,'vendor/leaflet'),join(out,'assets/leaflet'),{recursive:true});
await cp(join(source,'vendor/pdfjs'),join(out,'assets/pdfjs'),{recursive:true});
// Skin the official viewer without changing its original-PDF parsing or controls.
await writeFile(join(out,'assets/pdfjs/web/site-reader.css'),':root{--toolbar-bg-color:#f4f3f0;--toolbar-border-color:#dddcd7;--body-bg-color:#e5e4df;--toolbar-icon-bg-color:#464843;--main-color:#242722;--field-bg-color:#fff;--field-color:#242722;--field-border-color:#d0d1ca}#toolbarContainer{box-shadow:none}#toolbarViewer{font-family:Arial,sans-serif}#openFile,#print,#editorModeButtons,#editorModeSeparator{display:none!important}.pdfViewer .page{box-shadow:0 2px 18px #0000000c}');
const viewer=await readFile(join(out,'assets/pdfjs/web/viewer.html'),'utf8');
await writeFile(join(out,'assets/pdfjs/web/viewer.html'),viewer.replace('</head>','<link rel="stylesheet" href="site-reader.css"></head>'));
await cp(join(legacy,'leaves/icons'),join(out,'assets/icons'),{recursive:true});
await cp(join(legacy,'desk-assets/pins'),join(out,'assets/logos'),{recursive:true});
await cp(join(legacy,'leaves/assets/hkcc.svg'),join(out,'assets/logos/hkcc.svg'));
await cp(join(legacy,'leaves/assets/cpce-logo-2.png'),join(out,'assets/logos/cpce.png'));
for(const w of works.filter(w=>w.pdf))await cp(join(legacy,'desk-assets',w.pdf),join(out,'assets',w.pdf));
const specs=[['index.html','home'],['collection.html','collection'],['about.html','about'],['notes.html','notes'],['news.html','news'],['card.html','card'],['writing-modernization.html','writingModern'],['project-ninetoothed.html','engineering'],['project-social-innovation.html','social'],...works.filter(w=>w.pdf).map(w=>['read-'+w.id+'.html','read-'+w.id]),...works.filter(w=>w.kind==='paper'&&!w.pdf).map(w=>['work-'+w.id+'.html','work-'+w.id]),['404.html','missing']];
const sitemapEntries=specs.filter(([file])=>file!=='404.html').flatMap(([file])=>['zh','tw','en'].map(lang=>`  <url><loc>${publicUrl(file,lang)}</loc></url>`));
await writeFile(join(out,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.join('\n')}\n</urlset>\n`);
for(const lang of ['zh','tw','en']){
 const genLang=lang==='tw'?'zh':lang;
 const prefix=lang==='zh'?'':'../';
 const dest=lang==='zh'?out:join(out,lang);
 const t=(zh,en)=>genLang==='zh'?zh:en;
 const nav=[['index.html','home',t('首页','Home')],['collection.html','collection',t('工作','Work')],['notes.html','notes',t('文字','Notes')],['news.html','news',t('动态','News')],['about.html','about',t('关于我','About')]];
 const icon=n=>`<span data-icon="${n}" aria-hidden="true"></span>`;
 const a=(url,txt,cls='')=>`<a href="${h(url)}" class="${cls}">${txt}</a>`;
 const contactButton=`<button class="contact-trigger" popovertarget="contact-panel">${t('联系','Contact')}${icon('plus')}</button>`;
 const contactPanel=`<aside id="contact-panel" class="contact-panel" popover aria-label="${t('联系名片','Contact card')}"><div class="biz-card"><div class="biz-topline"><span>TYHUANG.HK</span><button class="biz-close" popovertarget="contact-panel" popovertargetaction="hide" aria-label="${t('关闭','Close')}">${icon('x')}</button></div><div class="biz-identity"><span class="biz-cn">黄天野</span><span class="biz-en">TIN-YEH HUANG</span><p class="biz-role">${t('产品工程 · 研究 · 公共服务','Product engineering · Research · Public service')}</p></div><button class="biz-mail" data-copy-email aria-label="${t('复制邮箱','Copy email')}"><span class="biz-mail-text"><small>EMAIL</small><strong>tin-yeh.huang@connect.polyu.hk</strong></span>${icon('copy')}</button><div class="biz-actions"><a class="biz-btn" href="mailto:tin-yeh.huang@connect.polyu.hk">${t('写邮件','Email')}${icon('arrow-up-right')}</a><a class="biz-btn" href="https://www.linkedin.com/in/tin-yeh-huang-59bba3289/" target="_blank" rel="noopener noreferrer">LinkedIn${icon('arrow-up-right')}</a><a class="biz-btn" href="https://github.com/Huangty5121" target="_blank" rel="noopener noreferrer">GitHub${icon('arrow-up-right')}</a><a class="biz-btn" href="https://scholar.google.com/citations?user=zrVCdOkAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">Scholar${icon('arrow-up-right')}</a></div><div class="biz-foot"><a href="${prefix}card.html">${t('打开可分享的名片','Open shareable card')}${icon('arrow-up-right')}</a><span data-copy-status role="status"></span></div></div></aside>`;
 const views=createViews({lang:genLang,prefix,h,t,icon,a,cacheKey});
 for(const [file,page] of specs){
  const active=page==='news'?'news':page==='card'?'about':page==='writingModern'?'notes':['engineering','social'].includes(page)||page.startsWith('read-')||page.startsWith('work-')?'collection':page;
 const langLinks=lang==='zh'
 ?`<a href="tw/${file}" class="language-link">繁</a><a href="en/${file}" class="language-link">EN</a>`
 :lang==='tw'
 ?`<a href="../${file}" class="language-link">简</a><a href="../en/${file}" class="language-link">EN</a>`
 :`<a href="../${file}" class="language-link">简</a><a href="../tw/${file}" class="language-link">繁</a>`;
  const title=page==='home'?'Tin-Yeh Huang':page==='card'?t('名片','Card'):page==='engineering'?'NineToothed':page==='social'?t('社会创新','Social innovation'):page==='writingModern'?t('工业设计与中国现代化','Industrial design and modernization'):page.startsWith('read-')?works.find(w=>'read-'+w.id===page).title[lang==='tw'?'zh':lang]:page.startsWith('work-')?works.find(w=>'work-'+w.id===page).title[lang==='tw'?'zh':lang]:page==='missing'?'404':nav.find(n=>n[1]===active)[2];
  const canonical=publicUrl(file,lang);
  const description=page==='about'?aboutContent.metaDescription[genLang]
   :page==='home'
   ?t('黄天野（黃天野，Tin-Yeh Huang）的个人网站。这里介绍我的学习、研究、工程实践、公共服务与个人文字。','Personal website of Tin-Yeh Huang (Huang Tin Yeh): studies, research, engineering work, public service, and personal writing.')
   :t('黄天野（黃天野，Tin-Yeh Huang）的个人网站：学习、研究、工程实践、公共服务与个人文字。','Tin-Yeh Huang’s personal website: studies, research, engineering work, public service, and writing.');
  const pageTitle=page==='home'?t('黄天野 · Tin-Yeh Huang | 个人网站','Tin-Yeh Huang | Personal website'):`${title} · Tin-Yeh Huang`;
  const alternates=['zh','tw','en'].map(edition=>`<link rel="alternate" hreflang="${edition==='zh'?'zh-Hans':edition==='tw'?'zh-Hant':'en'}" href="${publicUrl(file,edition)}">`).join('');
  const person=page==='home'?`<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'Person',name:'Tin-Yeh Huang',alternateName:['黄天野','黃天野','Tin Yeh','Huang Tin Yeh'],url:siteOrigin+'/',description:'Product Engineering student at The Hong Kong Polytechnic University; research, engineering work, and public service.'})}</script>`:'';
  const headMeta=`<meta name="description" content="${h(description)}"><meta name="theme-color" content="#f7f7f5"><meta name="robots" content="${page==='missing'?'noindex,follow':'index,follow'}">${page==='missing'?'':`<link rel="canonical" href="${canonical}">${alternates}`}<link rel="icon" type="image/svg+xml" href="${prefix}favicon.svg"><meta property="og:type" content="website"><meta property="og:site_name" content="Tin-Yeh Huang"><meta property="og:title" content="${h(pageTitle)}"><meta property="og:description" content="${h(description)}"><meta property="og:url" content="${canonical}">${person}<title>${h(pageTitle)}</title>`;
  const brandName='Tin-Yeh Huang';
  const html=`<!doctype html><html lang="${genLang==='zh'?'zh-Hans':'en'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${headMeta}<link rel="stylesheet" href="${prefix}assets/leaflet/leaflet.css?v=${cacheKey}"><link rel="preload" href="${prefix}assets/wenkai-essay.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="${prefix}site.css?v=${cacheKey}"><script defer src="${prefix}assets/leaflet/leaflet.js"></script><script type="module" src="${lang==='tw'?'site.mjs':prefix+'site.mjs'}?v=${cacheKey}"></script></head><body id="top" data-page="${active}" data-lang="${lang}"><script>try{const theme=localStorage.getItem('tyh-theme')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.body.dataset.theme=theme;document.documentElement.dataset.largeText=localStorage.getItem('tyh-large-text')||'false';document.querySelector('meta[name="theme-color"]').content=theme==='dark'?'#191c1e':'#f7f7f5'}catch{document.body.dataset.theme='light'}</script><a href="#main" class="skip-link">${t('跳到内容','Skip to content')}</a><header class="site-header"><a href="index.html" class="brand">${brandName}</a><nav class="desktop-nav" aria-label="${t('主导航','Main navigation')}">${nav.map(([url,n,txt])=>`<a href="${url}" ${n===active?'aria-current="page"':''}>${txt}</a>`).join('')}${contactButton}</nav><div class="header-actions"><button data-text-size aria-label="${t('调整文字大小','Adjust text size')}" aria-pressed="false">Aa</button><button data-theme-toggle aria-label="${t('切换明暗主题','Toggle light and dark theme')}">${icon('sun')}</button>${langLinks}<button data-menu-toggle aria-expanded="false" aria-controls="site-menu" aria-label="${t('打开目录','Open menu')}">${icon('menu')}</button></div></header><dialog class="site-menu" id="site-menu"><header><span>Tin-Yeh Huang</span><button data-menu-close aria-label="${t('关闭目录','Close menu')}">${icon('x')}</button></header><nav>${nav.map(([url,n,txt],i)=>a(url,`<small>0${i+1}</small>${txt}${icon('chevron-right')}`,n===active?'active':'')).join('')}${contactButton}</nav></dialog>${contactPanel}<main id="main" tabindex="-1">${views[page]()}</main><footer class="site-footer"><div><span>© 2026 Tin-Yeh Huang</span><a href="#top" class="back-top">${t('回到顶部 ↑','Back to top ↑')}</a>${contactButton}<a class="footer-email" href="mailto:tin-yeh.huang@connect.polyu.hk">${t('邮箱','Email')}${icon('arrow-up-right')}</a></div></footer><aside class="music-dock" aria-label="${t('音乐播放器','Music player')}"><button class="music-launcher" popovertarget="music-panel" aria-label="${t('打开音乐播放器','Open music player')}"><span class="music-bars" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span data-music-label>${t('听点音乐','A little music')}</span>${icon('plus')}</button><section id="music-panel" class="music-panel" popover aria-labelledby="music-title"><header><span class="eyebrow">${t('音乐角落','A little music')}</span><button popovertarget="music-panel" popovertargetaction="hide" aria-label="${t('收起播放器','Close music player')}">${icon('minus')}</button></header><div class="music-track"><span class="record-disc" aria-hidden="true"></span><div><h2 id="music-title">${h(music.title)}</h2><p>${h(music.artist)}</p><a href="${h(music.sourceUrl)}" target="_blank" rel="noopener noreferrer">Apple Music${icon('arrow-up-right')}</a></div></div><div class="music-transport"><button data-music-toggle aria-pressed="false" aria-label="${t('播放音乐试听','Play music preview')}">${icon('play')}</button><div class="music-timeline"><input type="range" data-music-seek min="0" max="30" value="0" step="0.1" disabled aria-label="${t('播放进度','Playback position')}"><div><time data-music-elapsed>0:00</time><span>${t('官方试听','Official preview')} · <time data-music-duration>0:30</time></span></div></div></div><label class="music-volume"><span>${t('音量','Volume')}</span><input type="range" data-music-volume min="0" max="1" step="0.05" value="0.55" aria-label="${t('音量','Volume')}"></label><p data-audio-status role="status"></p></section></aside><audio id="music" preload="none" src="${h(music.src)}"></audio></body></html>`;
  const out2=lang==='tw'?zh2t(html).replaceAll('傅里葉','傅裏葉').replaceAll('<html lang="zh-Hans"','<html lang="zh-Hant"'):html;
  await writeFile(join(dest,file),out2);
 }
 const redirects=[['writing.html','about.html#personal-title'],['research.html','collection.html?filter=papers'],['projects.html','collection.html#practice'],['experience.html','about.html#experience'],['contact.html','about.html?contact=open'],...works.filter(w=>w.pdf||w.kind!=='paper').map(w=>[`work-${w.id}.html`,w.pdf?'read-'+w.id+'.html':'project-ninetoothed.html']),...experiences.map(e=>[`experience-${e.id}.html`,`about.html#record-${e.id}`])];
 const langCode=genLang==='zh'?(lang==='tw'?'zh-Hant':'zh-Hans'):'en';
 for(const [file,target] of redirects){const redirectHtml=`<!doctype html><html lang="${langCode}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=${target}"><meta name="robots" content="noindex,follow"><link rel="canonical" href="${publicUrl(target.split(/[?#]/)[0],lang)}"><title>Tin-Yeh Huang</title></head><body><h1>${t('进入完整页面','Open the complete page')}</h1><a href="${target}">${t('继续浏览','Continue')}</a></body></html>`;await writeFile(join(dest,file),lang==='tw'?zh2t(redirectHtml):redirectHtml);}
}
// The dist tree is committed, so source-side deletions would otherwise linger in
// the deployed output. Sweep assets/ for orphans; vendor trees keep internal files.
const htmlFiles=[];async function collectHtml(dir){for(const e of await readdir(dir,{withFileTypes:true})){const p=join(dir,e.name);if(e.isDirectory())await collectHtml(p);else if(e.name.endsWith('.html'))htmlFiles.push(p);}}
await collectHtml(out);
const corpus=[siteJs,await readFile(join(out,'site.css'),'utf8'),...await Promise.all(htmlFiles.map(f=>readFile(f,'utf8')))].join('\n');
const KEEP_DIRS=new Set(['assets/leaflet','assets/pdfjs','assets/papers']);
// Icons load by name: keep those named in page markup plus any stem switched
// at runtime via dataset.icon assignments in site.mjs.
const iconStems=new Set(['sun','moon','play','pause']);
for(const m of corpus.matchAll(/data-icon="([a-z-]+)"/g))iconStems.add(m[1]);
for(const line of siteJs.matchAll(/dataset\.icon=[^;]*;/g))for(const word of line[0].matchAll(/'([a-z-]+)'/g))iconStems.add(word[1]);
const pruned=[];
async function sweep(dir){for(const e of await readdir(dir,{withFileTypes:true})){const p=join(dir,e.name),rel=p.slice(out.length+1);if(e.isDirectory()){if(!KEEP_DIRS.has(rel))await sweep(p);continue;}
 if(/OFL|LICENSE|NOTICE/.test(e.name))continue;
 const keep=rel.startsWith('assets/icons/')?iconStems.has(e.name.replace('.js','')):corpus.includes(rel);
 if(!keep){await rm(p,{force:true});pruned.push(rel);}}}
await sweep(join(out,'assets'));
async function dotClean(dir){for(const e of await readdir(dir,{withFileTypes:true})){const p=join(dir,e.name);if(e.isDirectory())await dotClean(p);else if(e.name==='.DS_Store'){await rm(p,{force:true});pruned.push(p.slice(out.length+1));}}}
await dotClean(out);
for(const e of await readdir(join(out,'assets'),{withFileTypes:true}))if(e.isDirectory())await readdir(join(out,'assets',e.name)).then(d=>{if(!d.length)return rm(join(out,'assets',e.name),{recursive:true,force:true});}).catch(()=>{});
console.log(`Built the trilingual personal site (zh-Hans / zh-Hant / en): Home, Work, Notes, News, About, practice pages, publication records, and original-PDF readers. Pruned ${pruned.length} stale asset file(s): ${pruned.map(p=>p.split('/').pop()).join(', ')||'none'}`);
