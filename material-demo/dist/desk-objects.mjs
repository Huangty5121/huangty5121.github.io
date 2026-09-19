import {music,desk} from './desk-config.mjs';
import {works,notes,pictures} from './desk-data.mjs';
import Play from './vendor/play.js';
import Pause from './vendor/pause.js';

const h=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const tr=(lang,zh,en)=>lang==='zh'?zh:en;
const link=(path,label,classes='')=>`<a href="#${h(path)}" class="${classes}">${label}</a>`;
let audioState='idle';

export function experiencePin(id,kind='row'){
 const pin=desk.pins[id];if(!pin)return '';
 return `<span class="experience-pin pin-${kind}" aria-hidden="true"><img src="${h(pin.src)}" alt="" width="96" height="96" decoding="async"></span>`;
}

export function deskHome(lang){
 const t=(zh,en)=>tr(lang,zh,en),featured=notes.find(n=>n.id===desk.featuredNote),lower=notes.find(n=>n.id===desk.lowerNote);
 const pins=[...new Set(desk.featuredPins)].filter(id=>desk.pins[id]).slice(0,4);
 const paperCount=works.filter(w=>w.kind==='paper').length,projectCount=works.length-paperCount;
 return `<div class="desk-stage mixed-desk">
  <section class="home-intro" aria-label="${t('简单介绍','Introduction')}"><h1 id="page-title" tabindex="-1" class="written ink">${h(desk.intro.name)}</h1><p class="intro-study">${h(desk.intro.study[lang])}</p><p class="intro-note written">${h(desk.intro.text[lang])}</p></section>
  <article class="home-folder">${link('works',`<span class="paper-preview"><img src="desk-assets/heatwave-heda-arxiv-v2.jpg" alt="${t('热浪风险论文首页','First page of the heatwave paper')}"></span><span class="folder-label"><h2 class="piece-title written ink">${t('论文和项目','Papers & projects')}</h2></span><span class="folder-meta"><span>${t(`${paperCount} 篇论文 · ${projectCount} 份工作记录`,`${paperCount} papers · ${projectCount} work record`)}</span><span>${t('打开','Open')}</span></span>`,'piece-link')}</article>
  <aside class="home-music" aria-label="${t('音乐播放器','Music player')}">
   <div class="mp3-device player-petrol"><img class="mp3-housing" src="desk-assets/mp3-petrol-v2.png" alt="" aria-hidden="true" width="1536" height="1024">
    <div class="mp3-screen"><strong id="home-track" title="${h(music.title)}">${h(music.title)}</strong><span class="mp3-artist" title="${h(music.artist)}">${h(music.artist)}</span></div>
    <button id="music-play" class="mp3-play" type="button" aria-label="${t('播放','Play')} ${h(music.title)}" aria-pressed="false" ${music.src?'':'disabled'}></button>
   </div>
   <div class="music-caption"><span id="home-audio-state" role="status"></span>${music.sourceUrl?`<a href="${h(music.sourceUrl)}" target="_blank" rel="noopener noreferrer">${t(music.preview?'Apple Music · 官方试听':'歌曲来源',music.preview?'Apple Music · Preview':'Track source')}</a>`:''}</div>
  </aside>
  ${featured?`<article class="home-slip mixed-note"><img class="oxide-backing" src="desk-assets/oxide-plate-v2.png" alt="" aria-hidden="true" width="1536" height="1024">${link(`note/${featured.id}`,`<span class="surface note"><span class="tiny">${t('随手记 / 整理稿','Note / edited draft')}</span><h2 class="written ink">${h(featured.title[lang])}</h2><span class="piece-caption">${t('这版先看能不能用。','Trying this version out.')}</span></span>`,'piece-link')}</article>`:''}
  <article class="home-experience ${pins.length?'has-pins':''} ${desk.experienceFolder?'has-dossier':''}">${link('experiences',`<span class="experience-objects">${desk.experienceFolder?`<img class="dossier-object" src="${h(desk.experienceFolder)}" alt="" aria-hidden="true" width="1536" height="1024">`:''}${pins.length?`<span class="pin-scatter">${pins.map((id,i)=>`<span class="scatter-slot scatter-${i}">${experiencePin(id,'desk')}</span>`).join('')}</span>`:''}</span><h2 class="piece-title written ink">${t('读书与经历','Education & experience')}</h2><p class="piece-caption">${t('读过的学校，待过的地方。','Places I have studied and worked.')}</p>`,'piece-link')}</article>
 </div>
 <section class="desk-continuation" aria-label="${t('桌上的其他记录','Further notes on the desk')}">
  <div class="continuation-label"><span class="written ink">${t('还有一些随手记的','A few more notes')}</span>${link('notes',t('翻开笔记','Open notes'))}</div>
  ${lower?`<article class="loose-note">${link(`note/${lower.id}`,`<span class="tiny">${h(lower.date)} · ${t('整理稿','Edited draft')}</span><h2 class="written ink">${h(lower.title[lang])}</h2><p class="written ink">${h(lower.paragraphs[lang][0])}</p><span class="tiny">${t('接着读','Read on')}</span>`,'piece-link')}</article>`:''}
  <article class="home-photo">${link('images',`<span class="surface"><img src="assets/fold.jpg" alt="${h(pictures[0].alt[lang])}" loading="lazy"></span><h2 class="piece-title written ink">${t('几张材质图','Material studies')}</h2><p class="piece-caption">${t('为这个网站生成的图。','Generated studies for this website.')}</p>`,'piece-link')}</article>
  ${desk.showUpdates&&desk.updates.length?`<aside class="desk-updates"><h2 class="written ink">${t('最近','Lately')}</h2>${desk.updates.map(u=>`<div class="update-entry"><time>${h(u.date)}</time><a href="${h(u.href)}">${h(u[lang])}</a></div>`).join('')}</aside>`:''}
 </section>`;
}

function mountIcon(node,icon){
 if(!node)return;
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
 for(const [k,v] of Object.entries({viewBox:'0 0 24 24',fill:'currentColor',stroke:'currentColor','stroke-width':'1','aria-hidden':'true'}))svg.setAttribute(k,v);
 for(const [tag,attrs] of icon){const child=document.createElementNS(svg.namespaceURI,tag);for(const [k,v] of Object.entries(attrs))child.setAttribute(k,v);svg.append(child);}
 node.replaceChildren(svg);
}
export function updateDeskMusic(lang){
 const a=document.getElementById('audio'),button=document.getElementById('music-play'),status=document.getElementById('home-audio-state');
 if(!button)return;
 const playing=!a.paused&&!a.ended;
 button.setAttribute('aria-pressed',String(playing));button.setAttribute('aria-label',`${tr(lang,playing?'暂停':'播放',playing?'Pause':'Play')} ${music.title}`);
 button.dataset.state=audioState;mountIcon(button,playing?Pause:Play);
 const message=!music.src?tr(lang,'音源未设置','No audio source'):audioState==='error'?tr(lang,'试听暂时无法连接，可再试一次','Unable to load preview; try again'):audioState==='loading'?tr(lang,'正在连接试听…','Loading preview…'):playing?tr(lang,'正在播放','Playing'):tr(lang,'点击播放','Press play');
 status.textContent=message;
}
export async function toggleDeskMusic(lang){
 const a=document.getElementById('audio');if(!music.src)return;
 if(!a.paused){a.pause();audioState='idle';updateDeskMusic(lang);return;}
 if(!a.getAttribute('src')){a.src=music.src;const volume=Number(music.volume);a.volume=Number.isFinite(volume)?Math.min(1,Math.max(0,volume)):0.55;}
 if(a.error)a.load();
 if(a.ended)a.currentTime=0;
 audioState='loading';updateDeskMusic(lang);
 try{await a.play();audioState='playing';}catch(e){if(e.name!=='AbortError')audioState='error';}
 updateDeskMusic(lang);
}
export function bindDeskAudio(getLang){
 const a=document.getElementById('audio');
 for(const event of ['playing','pause','ended','waiting','error'])a.addEventListener(event,()=>{audioState=a.error||event==='error'?'error':event==='waiting'?'loading':event==='playing'?'playing':'idle';updateDeskMusic(getLang());});
}
