const zh=document.body.dataset.lang!=='en';
const t=(a,b)=>zh?a:b;
const modules=new Map(Object.entries({
 'message-circle':[['path',{d:'M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z'}]],
 'maximize':[['path',{d:'M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5'}]],
 'plus':[['path',{d:'M12 5v14M5 12h14'}]],'minus':[['path',{d:'M5 12h14'}]],
 'arrow-right':[['path',{d:'M5 12h14m-6-6 6 6-6 6'}]],'chevron-down':[['path',{d:'m6 9 6 6 6-6'}]],
 'copy':[['rect',{x:'9',y:'9',width:'11',height:'11',rx:'2'}],['path',{d:'M15 9V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h4'}]]
}));
async function paintIcons(root=document){for(const el of root.querySelectorAll('[data-icon]')){const name=el.dataset.icon;try{if(!modules.has(name))modules.set(name,(await import(`../assets/icons/${name}.js`)).default);if(!el.isConnected)continue;const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');for(const[k,v]of Object.entries({viewBox:'0 0 24 24',fill:'none',stroke:'currentColor','stroke-width':'1.5','stroke-linecap':'round','stroke-linejoin':'round','aria-hidden':'true'}))svg.setAttribute(k,v);for(const[tag,attrs]of modules.get(name)){const path=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const[k,v]of Object.entries(attrs))path.setAttribute(k,v);svg.append(path);}el.replaceChildren(svg);}catch{el.hidden=true;}}}
const menu=document.querySelector('#site-menu'),menuButton=document.querySelector('[data-menu-toggle]');
// Move the same controls into the mobile menu so state and focus stay shared.
const displayControls=document.querySelector('.display-controls');
const mobileNavigation=matchMedia('(max-width:1100px)');
function arrangeNavigation(){
 const target=mobileNavigation.matches?document.querySelector('.menu-preferences'):document.querySelector('.header-actions');
 if(mobileNavigation.matches)target.append(displayControls);else target.prepend(displayControls);
 if(!mobileNavigation.matches&&menu.open)menu.close();
}
arrangeNavigation();mobileNavigation.addEventListener('change',arrangeNavigation);
menuButton.addEventListener('click',()=>{menu.showModal();document.body.classList.add('menu-open');menuButton.setAttribute('aria-expanded','true');});
document.querySelector('[data-menu-close]').addEventListener('click',()=>menu.close());
menu.addEventListener('click',e=>{if(e.target===menu&&e.clientX<menu.getBoundingClientRect().left)menu.close();});
menu.addEventListener('close',()=>{document.body.classList.remove('menu-open');menuButton.setAttribute('aria-expanded','false');if(document.activeElement===document.body||menu.contains(document.activeElement))menuButton.focus();});
function preference(key){try{return localStorage.getItem(key);}catch{return null;}}
function savePreference(key,value){try{localStorage.setItem(key,value);}catch{}}
const systemTheme=matchMedia('(prefers-color-scheme:dark)');
function applyTheme(value,{persist=false}={}){document.body.dataset.theme=value;document.querySelector('meta[name="theme-color"]').content=value==='dark'?'#202124':'#f7f7f5';const button=document.querySelector('[data-theme-toggle]');button.setAttribute('aria-pressed',String(value==='dark'));button.querySelector('[data-icon]').dataset.icon=value==='dark'?'moon':'sun';document.querySelector('[data-theme-label]').textContent=value==='dark'?t('深色','Dark'):t('淺色','Light');paintIcons(button);if(persist)savePreference('tyh-theme',value);}
document.documentElement.dataset.largeText=preference('tyh-large-text')||'false';
const themeButton=document.querySelector('[data-theme-toggle]'),sizeButton=document.querySelector('[data-text-size]');
applyTheme(preference('tyh-theme')||(systemTheme.matches?'dark':'light'));
themeButton.addEventListener('click',()=>applyTheme(document.body.dataset.theme==='dark'?'light':'dark',{persist:true}));
systemTheme.addEventListener('change',()=>{if(!preference('tyh-theme'))applyTheme(systemTheme.matches?'dark':'light');});
function syncSizeButton(){const large=document.documentElement.dataset.largeText==='true';sizeButton.setAttribute('aria-pressed',String(large));sizeButton.setAttribute('aria-label',large?t('使用較小字號','Use smaller text'):t('使用較大字號','Use larger text'));sizeButton.textContent=large?'A−':'A+';document.querySelector('[data-size-label]').textContent=large?t('放大','Larger'):t('標準','Standard');}
syncSizeButton();
sizeButton.addEventListener('click',()=>{document.documentElement.dataset.largeText=String(document.documentElement.dataset.largeText!=='true');syncSizeButton();savePreference('tyh-large-text',document.documentElement.dataset.largeText);});
const music=document.querySelector('#music'),musicButton=document.querySelector('[data-music-toggle]'),audioStatus=document.querySelector('[data-audio-status]');
const musicDock=document.querySelector('.music-dock'),musicPanel=document.querySelector('#music-panel'),musicSeek=document.querySelector('[data-music-seek]'),musicVolume=document.querySelector('[data-music-volume]');
// 頁腳進入視口時收起懸浮音樂鈕，避免壓住頁腳右側鏈接（名片頁等短頁面尤其明顯）。
if(musicDock&&document.querySelector('.site-footer')){new IntersectionObserver(([entry])=>{musicDock.dataset.footerNear=String(entry.isIntersecting);}).observe(document.querySelector('.site-footer'));}
music.volume=.55;
const audioTime=seconds=>`${Math.floor(seconds/60)}:${String(Math.floor(seconds%60)).padStart(2,'0')}`;
function audioState(){musicButton.setAttribute('aria-pressed',String(!music.paused));musicButton.setAttribute('aria-label',music.paused?t('播放音樂試聽','Play music preview'):t('暫停音樂試聽','Pause music preview'));musicButton.querySelector('[data-icon]').dataset.icon=music.paused?'play':'pause';musicDock.dataset.playing=String(!music.paused);document.querySelector('[data-music-label]').textContent=music.paused?t('聽點音樂','A little music'):t('正在播放 · 葉子','Playing · Ye Zi');paintIcons(musicButton);}
function audioProgress(){const duration=Number.isFinite(music.duration)?music.duration:0;musicSeek.disabled=!duration;musicSeek.max=duration||30;musicSeek.value=music.currentTime;document.querySelector('[data-music-elapsed]').textContent=audioTime(music.currentTime);if(duration)document.querySelector('[data-music-duration]').textContent=audioTime(duration);}
musicSeek.addEventListener('input',()=>{if(Number.isFinite(music.duration))music.currentTime=Number(musicSeek.value);audioProgress();});
musicVolume.addEventListener('input',()=>{music.volume=Number(musicVolume.value);});
for(const name of ['loadedmetadata','durationchange','timeupdate'])music.addEventListener(name,audioProgress);
musicPanel.addEventListener('toggle',()=>{document.querySelector('.music-launcher').setAttribute('aria-expanded',String(musicPanel.matches(':popover-open')));});
musicButton.addEventListener('click',async()=>{if(!music.paused)music.pause();else try{audioStatus.textContent=t('加載試聽…','Loading preview…');await music.play();audioStatus.textContent=t('約 30 秒官方試聽','~30-second official preview');}catch{audioStatus.textContent=t('暫時無法播放試聽','Preview unavailable');}});
for(const name of ['play','pause','ended'])music.addEventListener(name,audioState);
music.addEventListener('playing',()=>{audioStatus.textContent=t('約 30 秒官方試聽','~30-second official preview');});
music.addEventListener('waiting',()=>{audioStatus.textContent=t('正在緩衝試聽…','Buffering preview…');});
music.addEventListener('error',()=>{audioStatus.textContent=t('試聽連接暫不可用','Preview connection unavailable');});
const contactPanel=document.querySelector('#contact-panel');
// Click-only construction avoids a plain phone link in HTML, not determined scraping.
document.addEventListener('click',e=>{if(e.target.closest('[data-whatsapp]'))window.open('https://wa.me/'+[852,9449,8934].join(''),'_blank','noopener,noreferrer');});
document.addEventListener('click',e=>{if(e.target.closest('[popovertarget="contact-panel"]')&&menu.open)menu.close();});
document.querySelector('[data-copy-email]').addEventListener('click',async()=>{const status=document.querySelector('[data-copy-status]');try{await navigator.clipboard.writeText('tin-yeh.huang@connect.polyu.hk');status.textContent=t('郵箱已複製','Email copied');}catch{status.textContent=t('請選中上方郵箱複製','Select the email above to copy it');}});
let viewAbort;
function revealHash({scroll=true}={}){
 const id=decodeURIComponent(location.hash.slice(1));if(!id)return;
 if(id==='contact'){contactPanel.showPopover();return;}
 // Preserve incoming bookmarks after moving the self-note and CV records.
 if(document.body.dataset.page==='about'){
  const personal=['personal','personal-title','feelings'].includes(id);
  const record=/^(org-|record-|study-)/.test(id)||['records','experience','education','honours','credentials','peer-review','tools','skills'].includes(id);
  if(personal||record){location.replace((personal?'index.html':'experience.html')+'#'+encodeURIComponent(id));return;}
 }
 let target=document.getElementById(id);if(!target)return;
 if(target.dataset.recordTarget)target=document.getElementById(target.dataset.recordTarget)||target;
 for(let parent=target.parentElement;parent;parent=parent.parentElement)if(parent instanceof HTMLDetailsElement)parent.open=true;
 if(target instanceof HTMLDetailsElement)target.open=true;
 if(scroll)target.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'instant'});
}
function initialiseView({scrollToHash=true}={}){
 viewAbort?.abort();viewAbort=new AbortController();const options={signal:viewAbort.signal};const main=document.querySelector('main');paintIcons(main);
 document.body.classList.toggle('reading-pdf',!!main.querySelector('.pdf-viewer'));
 document.body.classList.remove('city-note-open');
 // Loading transition, matching Order's 750 ms filter / 500 ms opacity timing.
 // Cached/decoded images stay sharp; scrolling never restarts the transition.
 for(const img of main.querySelectorAll('.hero-bg,.origin-harbour,.moment-photo img')){
  if(img.complete||matchMedia('(prefers-reduced-motion: reduce)').matches)continue;
  img.classList.add('image-pending');
  const ready=async()=>{try{await img.decode();}catch{}if(img.isConnected)img.classList.remove('image-pending');};
  img.addEventListener('load',ready,{once:true,signal:options.signal});
  img.addEventListener('error',()=>img.classList.remove('image-pending'),{once:true,signal:options.signal});
 }
 const experience=main.querySelector('.exp-page');
 if(experience){
  const density=experience.querySelector('[data-exp-density]');
  density.addEventListener('click',()=>{const compact=experience.classList.toggle('is-compact');density.setAttribute('aria-pressed',String(compact));density.textContent=compact?t('顯示説明','Show descriptions'):t('簡覽','Compact view');},options);
  const anchors=[...experience.querySelectorAll('.exp-index a')];
  const chapters=[...experience.querySelectorAll('.exp-section')];
  const markChapter=()=>{const current=[...chapters].reverse().find(e=>e.getBoundingClientRect().top<160)||chapters[0];for(const a of anchors){if(a.hash==='#'+current.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');}};
  window.addEventListener('scroll',markChapter,{...options,passive:true});markChapter();
 }
 // Horizontal media keeps its own scroll position; a swipe is never a click.
 const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
 const preventDragClick=element=>{
  let start=null,moved=false;
  element.addEventListener('pointerdown',e=>{start={x:e.clientX,y:e.clientY};moved=false;},options);
  element.addEventListener('pointermove',e=>{if(start&&Math.hypot(e.clientX-start.x,e.clientY-start.y)>8)moved=true;},{...options,passive:true});
  element.addEventListener('pointercancel',()=>{start=null;moved=true;},options);
  element.addEventListener('pointerup',()=>{start=null;},options);
  element.addEventListener('click',e=>{if(moved){e.preventDefault();e.stopImmediatePropagation();moved=false;}},{...options,capture:true});
 };
 const photoDialog=main.querySelector('#photo-viewer');
 if(photoDialog){
  let opener,photos=[],photoIndex=0;
  const image=photoDialog.querySelector('[data-photo-image]');
  const showPhoto=()=>{
   const button=photos[photoIndex],original=button.querySelector('img');
   photoDialog.querySelector('[data-photo-error]').textContent='';
   image.src=original.currentSrc||original.src;image.alt=original.alt;
   photoDialog.querySelector('[data-photo-caption]').textContent=button.dataset.photoCaption;
   photoDialog.querySelector('[data-photo-position]').textContent=`${photoIndex+1} / ${photos.length}`;
   for(const control of photoDialog.querySelectorAll('[data-photo-step]'))control.disabled=Number(control.dataset.photoStep)<0?photoIndex===0:photoIndex===photos.length-1;
  };
  image.addEventListener('error',()=>{photoDialog.querySelector('[data-photo-error]').textContent=t('照片暫時無法載入','Photograph unavailable');},options);
  for(const gallery of main.querySelectorAll('.moment-gallery')){
   const strip=gallery.querySelector('.moment-photos'),controls=gallery.querySelector('.gallery-controls');
   const buttons=[...strip.querySelectorAll('[data-photo-open]')];preventDragClick(strip);
   const nearest=()=>buttons.reduce((best,el,i)=>Math.abs(el.offsetLeft-buttons[0].offsetLeft-strip.scrollLeft)<Math.abs(buttons[best].offsetLeft-buttons[0].offsetLeft-strip.scrollLeft)?i:best,0);
   const syncGallery=()=>{
    const movable=strip.scrollWidth>strip.clientWidth+2;
    controls.querySelector('[data-gallery-count]').textContent=movable?`${nearest()+1} / ${buttons.length}`:'';
    for(const button of controls.querySelectorAll('button')){button.hidden=!movable;button.disabled=Number(button.dataset.galleryStep)<0?strip.scrollLeft<2:strip.scrollLeft+strip.clientWidth>=strip.scrollWidth-2;}
   };
   strip.addEventListener('scroll',syncGallery,{...options,passive:true});const observer=new ResizeObserver(syncGallery);observer.observe(strip);options.signal.addEventListener('abort',()=>observer.disconnect(),{once:true});syncGallery();
   for(const button of controls.querySelectorAll('[data-gallery-step]'))button.addEventListener('click',()=>{
    const next=Math.max(0,Math.min(buttons.length-1,nearest()+Number(button.dataset.galleryStep)));
    strip.scrollTo({left:buttons[next].offsetLeft-buttons[0].offsetLeft,behavior:reduced()?'instant':'smooth'});
   },options);
   for(const button of buttons){
    const img=button.querySelector('img');
    img.addEventListener('error',()=>{button.classList.add('photo-unavailable');button.setAttribute('aria-label',img.alt+' · '+t('暫時無法載入','Unavailable'));},options);
    button.addEventListener('click',()=>{opener=button;photos=buttons;photoIndex=buttons.indexOf(button);showPhoto();photoDialog.showModal();document.body.classList.add('photo-open');},options);
   }
  }
  for(const button of photoDialog.querySelectorAll('[data-photo-step]'))button.addEventListener('click',()=>{photoIndex=Math.max(0,Math.min(photos.length-1,photoIndex+Number(button.dataset.photoStep)));showPhoto();},options);
  photoDialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();photoIndex=Math.max(0,Math.min(photos.length-1,photoIndex+(e.key==='ArrowLeft'?-1:1)));showPhoto();}},options);
  photoDialog.querySelector('[data-photo-close]').addEventListener('click',()=>photoDialog.close(),options);
  photoDialog.addEventListener('click',e=>{if(e.target===photoDialog){const r=photoDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)photoDialog.close();}},options);
  photoDialog.addEventListener('close',()=>{document.body.classList.remove('photo-open');if(document.activeElement===document.body||photoDialog.contains(document.activeElement))opener?.focus({preventScroll:true});},options);
  options.signal.addEventListener('abort',()=>{photoDialog.close();document.body.classList.remove('photo-open');},{once:true});
 }
 const shelf=main.querySelector('.shelf-stage');
 if(shelf){
  const scroller=shelf.querySelector('.shelf-scroll'),caption=shelf.querySelector('.shelf-caption');
  const sleeves=[...shelf.querySelectorAll('.album-sleeve')];let selected=0;
  preventDragClick(scroller);
  const revealSleeve=index=>{
   const r=sleeves[index].getBoundingClientRect(),v=scroller.getBoundingClientRect();
   const delta=r.left<v.left+8?r.left-v.left-8:r.right>v.right-8?r.right-v.right+8:0;
   if(delta)scroller.scrollBy({left:delta,behavior:reduced()?'instant':'smooth'});
  };
  const selectSleeve=(index,reveal=true)=>{
   selected=index;const sleeve=sleeves[index];
   for(const item of sleeves){item.classList.toggle('is-selected',item===sleeve);item.setAttribute('aria-pressed',String(item===sleeve));item.tabIndex=item===sleeve?0:-1;}
   caption.querySelector('[data-album-title]').textContent=sleeve.dataset.albumTitle;
   caption.querySelector('[data-album-artist]').textContent=sleeve.dataset.albumArtist;
   const track=caption.querySelector('[data-album-track]');track.textContent=sleeve.dataset.albumTrack;track.hidden=!track.textContent;
   const source=caption.querySelector('[data-album-source]');source.href=sleeve.dataset.albumUrl;source.setAttribute('aria-label',sleeve.dataset.albumTitle+' · Apple Music');
   shelf.querySelector('[data-album-position]').textContent=`${index+1} / ${sleeves.length}`;
   for(const button of shelf.querySelectorAll('[data-album-step]'))button.disabled=Number(button.dataset.albumStep)<0?index===0:index===sleeves.length-1;
   if(reveal)revealSleeve(index);
  };
  for(const [i,sleeve] of sleeves.entries()){
   sleeve.addEventListener('click',()=>selectSleeve(i),options);
   sleeve.addEventListener('focus',()=>selectSleeve(i),options);
   sleeve.addEventListener('keydown',e=>{let next=selected;if(e.key==='ArrowRight')next=Math.min(sleeves.length-1,next+1);else if(e.key==='ArrowLeft')next=Math.max(0,next-1);else if(e.key==='Home')next=0;else if(e.key==='End')next=sleeves.length-1;else return;e.preventDefault();selectSleeve(next);sleeves[next].focus({preventScroll:true});},options);
  }
  for(const button of shelf.querySelectorAll('[data-album-step]'))button.addEventListener('click',()=>selectSleeve(Math.max(0,Math.min(sleeves.length-1,selected+Number(button.dataset.albumStep)))),options);
  selectSleeve(0,false);
 }
 const impressionTabs=[...main.querySelectorAll('[data-impression-tab]')];
 if(impressionTabs.length){
  const scroller=main.querySelector('[data-impression-scroll]');
  const positions=new Map();let active=impressionTabs[0].dataset.impressionTab;
  const chooseImpression=id=>{
   positions.set(active,scroller.scrollTop);active=id;
   for(const tab of impressionTabs){const selected=tab.dataset.impressionTab===id;tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;main.querySelector('#'+tab.getAttribute('aria-controls')).hidden=!selected;}
   scroller.scrollTop=positions.get(id)||0;
  };
  impressionTabs.forEach((tab,i)=>{
   tab.addEventListener('click',()=>chooseImpression(tab.dataset.impressionTab),options);
   tab.addEventListener('keydown',e=>{let n;if(['ArrowDown','ArrowRight'].includes(e.key))n=(i+1)%impressionTabs.length;else if(['ArrowUp','ArrowLeft'].includes(e.key))n=(i+impressionTabs.length-1)%impressionTabs.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=impressionTabs.length-1;else return;e.preventDefault();chooseImpression(impressionTabs[n].dataset.impressionTab);impressionTabs[n].focus();},options);
  });
 }
 const skillFilters=[...main.querySelectorAll('[data-skill-filter]')];
 if(skillFilters.length){
  const cards=[...main.querySelectorAll('[data-tool-group]')];
  const chooseGroup=id=>{
   for(const chip of skillFilters)chip.setAttribute('aria-pressed',String(chip.dataset.skillFilter===id));
   for(const card of cards){
    const match=!id||card.dataset.toolGroup===id;
    card.classList.toggle('is-focused',!!id&&match);
    card.classList.toggle('is-dimmed',!!id&&!match);
    if(match&&id)card.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'instant',block:'nearest',inline:'center'});
   }
  };
  for(const chip of skillFilters)chip.addEventListener('click',()=>chooseGroup(chip.dataset.skillFilter),options);
 }
 const workTabs=[...main.querySelectorAll('[data-work-tab]')]; if(workTabs.length){
  const selectWork=kind=>{for(const tab of workTabs)tab.setAttribute('aria-pressed',String(tab.dataset.workTab===kind));for(const panel of main.querySelectorAll('[data-work-panel]'))panel.hidden=panel.dataset.workPanel!==kind;};
  const workKind=()=>location.hash==='#practice'||['ninetoothed','social'].includes(location.hash.slice(1))||new URLSearchParams(location.search).get('filter')==='engineering'?'engineering':'research';
  selectWork(workKind());
  for(const tab of workTabs)tab.addEventListener('click',()=>selectWork(tab.dataset.workTab),options);
  window.addEventListener('hashchange',()=>selectWork(workKind()),options);
 }
 const clock=main.querySelector('[data-local-time]');
 if(clock){const now=new Date();clock.textContent=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Hong_Kong',hour:'2-digit',minute:'2-digit',hour12:false}).format(now);clock.dateTime=now.toISOString();}
 const printLink=main.querySelector('[data-print]');
 if(printLink)printLink.addEventListener('click',event=>{event.preventDefault();window.print();},{...options,passive:false});
 const drawer=main.querySelector('.drinks-drawer');
 if(drawer){
  let opener;
  for(const button of main.querySelectorAll('[data-cabinet-open]'))button.addEventListener('click',()=>{
   opener=button;const kind=button.dataset.cabinetOpen;
   for(const panel of drawer.querySelectorAll('[data-cabinet-panel]'))panel.hidden=panel.dataset.cabinetPanel!==kind;
   drawer.setAttribute('aria-labelledby','drinks-'+kind+'-title');drawer.showModal();
   document.body.classList.add('drawer-open');
   if(!matchMedia('(prefers-reduced-motion: reduce)').matches)drawer.animate([{transform:matchMedia('(max-width:700px)').matches?'translateY(100%)':'translateX(100%)',opacity:.4},{transform:'translate(0)',opacity:1}],{duration:220,easing:'cubic-bezier(.2,.8,.2,1)'});
  },options);
  drawer.querySelector('[data-cabinet-close]').addEventListener('click',()=>drawer.close(),options);
  drawer.addEventListener('click',e=>{if(e.target===drawer){const rect=drawer.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)drawer.close();}},options);
  drawer.addEventListener('close',()=>{document.body.classList.remove('drawer-open');if(document.activeElement===document.body||drawer.contains(document.activeElement))opener?.focus({preventScroll:true});},options);
  options.signal.addEventListener('abort',()=>{if(drawer.open)drawer.close();document.body.classList.remove('drawer-open');},{once:true});
 }
 const journal=main.querySelector('.city-journal');
 if(journal){
  const viewport=journal.querySelector('[data-journal-map]'),note=journal.querySelector('.city-note'),stage=journal.querySelector('.journal-stage');
  const places=JSON.parse(viewport.dataset.places);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let map,selectedCity=null,animation,noteOpener;
  const markers=new Map();
  const develop=element=>{animation?.cancel();if(!reduced)animation=element.animate([{opacity:.3,filter:'blur(5px)',transform:'translateY(5px) rotate(.4deg)'},{opacity:1,filter:'blur(0)',transform:'translateY(0) rotate(0)'}],{duration:220,easing:'ease-out'});};
  const closeNote=({focus=false}={})=>{note.hidden=true;stage.classList.remove('has-note');document.body.classList.remove('city-note-open');selectedCity=null;for(const marker of markers.values())marker.getElement()?.classList.remove('is-selected');if(focus)(noteOpener||viewport).focus({preventScroll:true});};
  const choosePlace=(id,{focus=false,fromPin=false}={})=>{
   const city=places.find(place=>place.id===id);if(!city)return;
   selectedCity=city;noteOpener=markers.get(id)?.getElement()||document.activeElement;
   for(const panel of journal.querySelectorAll('[data-journal-city-panel]'))panel.hidden=panel.dataset.journalCityPanel!==id;
   journal.querySelector('[data-journal-city]').textContent=city.name+' / '+city.level;
   note.hidden=false;stage.classList.add('has-note');document.body.classList.add('city-note-open');develop(note);
   if(matchMedia('(max-width:700px)').matches)requestAnimationFrame(()=>note.scrollIntoView({block:'start',behavior:'instant'}));
   if(map){
    // Keep the selected pin in the free part of the map beside the paper.
    const zoom=fromPin?map.getZoom():['uk','fujian'].includes(id)?5:6;
    map.stop();map.setView(city.coordinates,zoom,{animate:false});
    if(!matchMedia('(max-width:700px)').matches)map.panBy([stage.clientWidth*.18,0],{animate:false});
   }
   for(const [key,marker] of markers)marker.getElement()?.classList.toggle('is-selected',key===id);
   if(focus)note.querySelector('[data-journal-close]').focus({preventScroll:true});
  };
  journal.querySelector('[data-journal-close]').addEventListener('click',()=>closeNote({focus:true}),options);
  journal.addEventListener('keydown',e=>{if(e.key==='Escape'&&!note.hidden){e.preventDefault();closeNote({focus:true});}},options);
  for(const button of journal.querySelectorAll('[data-journal-entry]'))button.addEventListener('click',()=>{
   const panel=button.closest('[data-journal-city-panel]');
   for(const item of panel.querySelectorAll('[data-journal-entry]'))item.setAttribute('aria-pressed',String(item===button));
   for(const page of panel.querySelectorAll('.journal-page'))page.hidden=page.id!==button.getAttribute('aria-controls');
   develop(panel.querySelector('.journal-page:not([hidden])'));
  },options);
  const fallback=journal.querySelector('[data-map-fallback]');
  const showFallback=()=>{fallback.hidden=false;};
  for(const button of journal.querySelectorAll('[data-place-open]'))button.addEventListener('click',()=>choosePlace(button.dataset.placeOpen,{focus:true}),options);
  const L=window.L;
  const reset=()=>{closeNote();if(map)map.fitBounds(places.map(place=>place.coordinates),{padding:[55,55],maxZoom:5,animate:false});};
  if(L){
   map=L.map(viewport,{zoomControl:false,scrollWheelZoom:true,minZoom:1,maxZoom:8});
   viewport.addEventListener('wheel',e=>{if(!e.ctrlKey)e.stopPropagation();},{capture:true,passive:true,...options});
   map.attributionControl.setPrefix('');L.control.zoom({position:'bottomleft'}).addTo(map);
   const Overview=L.Control.extend({options:{position:'bottomleft'},onAdd(){const button=L.DomUtil.create('button','journal-overview');button.type='button';button.textContent=t('總覽','Overview');button.addEventListener('click',e=>{L.DomEvent.stop(e);reset();});return button;}});
   map.addControl(new Overview());
   map.on('click',()=>{if(selectedCity)reset();});
   const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,keepBuffer:1,attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'}).addTo(map);
   const status=journal.querySelector('[data-map-status]');let loadedTiles=0;
   tiles.on('tileload',()=>{loadedTiles++;status.textContent='';});
   tiles.on('tileerror',()=>{showFallback();if(!loadedTiles)status.textContent=t('底圖暫時未能加載，仍可點圖釘翻頁。','The basemap is unavailable; pins still open their pages.');});
   reset();
   for(const city of places){
    const label=document.createElement('span');label.textContent=city.name;
    const marker=L.marker(city.coordinates,{title:city.name,keyboard:true,riseOnHover:true,icon:L.divIcon({className:'journal-map-pin',html:`<span class="map-pin-head" style="--pin-color:${city.color}"></span>`,iconSize:[44,44],iconAnchor:[22,39]})});
    marker.bindTooltip(label,{permanent:false,direction:'top',offset:[0,city.id==='hk'?5:-22],className:'journal-map-label'});
    marker.on('click',()=>choosePlace(city.id,{fromPin:true}));markers.set(city.id,marker);
    marker.on('add',()=>marker.getElement().addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();event.stopPropagation();choosePlace(city.id,{fromPin:true,focus:true});}},options));
    marker.addTo(map);
   }
   reset();
   const resize=new ResizeObserver(()=>map.invalidateSize({pan:false}));resize.observe(viewport);
   options.signal.addEventListener('abort',()=>{resize.disconnect();animation?.cancel();map.remove();},{once:true});
  }else{showFallback();viewport.hidden=true;journal.querySelector('[data-map-status]').textContent=t('可以使用上方地名打開記錄。','Choose a place above to open its notes.');}
 }
 if(new URLSearchParams(location.search).get('contact')==='open')contactPanel.showPopover();
 revealHash({scroll:scrollToHash});
}
paintIcons();initialiseView();window.addEventListener('hashchange',revealHash);
setInterval(()=>{const clock=document.querySelector('[data-local-time]');if(!clock)return;const now=new Date();clock.textContent=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Hong_Kong',hour:'2-digit',minute:'2-digit',hour12:false}).format(now);clock.dateTime=now.toISOString();},30000);
// Keep normal HTML URLs and browser history, while retaining the player on same-language navigation.
let navigationController,navigationId=0,renderedPath=location.pathname;
let loadingTimer;
history.scrollRestoration='manual';
history.replaceState({...history.state,scroll:scrollY},'');
function syncHead(doc){
 const selector='meta[name="description"],meta[name="robots"],meta[property^="og:"],link[rel="canonical"],link[rel="alternate"][hreflang],script[type="application/ld+json"]';
 document.head.querySelectorAll(selector).forEach(node=>node.remove());
 doc.head.querySelectorAll(selector).forEach(node=>document.head.append(node.cloneNode(true)));
}
async function navigate(url,{pop=false,scroll=0}={}){const id=++navigationId;navigationController?.abort();navigationController=new AbortController();clearTimeout(loadingTimer);loadingTimer=setTimeout(()=>document.body.classList.add('is-loading'),140);try{const response=await fetch(url,{signal:navigationController.signal,cache:'no-cache'});if(!response.ok)throw new Error('Navigation failed');const doc=new DOMParser().parseFromString(await response.text(),'text/html');if(!doc.querySelector('main')){location.href=url;return;}const nextScript=doc.querySelector('script[type=module]')?.getAttribute('src'),currentScript=document.querySelector('script[type=module]')?.getAttribute('src');if(nextScript&&currentScript&&nextScript!==currentScript){location.href=url;return;}if(id!==navigationId)return;if(!pop){history.replaceState({...history.state,scroll:scrollY},'');history.pushState({scroll:0},'',url);}menu.close();if(contactPanel.matches(':popover-open'))contactPanel.hidePopover();viewAbort?.abort();document.querySelector('main').replaceChildren(...doc.querySelector('main').childNodes);document.title=doc.title;syncHead(doc);document.body.dataset.page=doc.body.dataset.page;renderedPath=new URL(url,location.href).pathname;document.querySelector('.desktop-nav').replaceChildren(...doc.querySelector('.desktop-nav').childNodes);const nextLangLinks=[...doc.querySelectorAll('.language-link')];document.querySelectorAll('.language-link').forEach((link,i)=>{if(nextLangLinks[i])link.href=nextLangLinks[i].href;});document.querySelector('#site-menu nav').replaceChildren(...doc.querySelector('#site-menu nav').childNodes);paintIcons(menu);paintIcons(document.querySelector('.site-header'));initialiseView({scrollToHash:!pop});if(pop||!new URL(url,location.href).hash)window.scrollTo({top:scroll,behavior:'instant'});document.querySelector('main').focus({preventScroll:true});}catch(error){if(error.name!=='AbortError')location.href=url;}finally{if(id===navigationId){clearTimeout(loadingTimer);document.body.classList.remove('is-loading');}}}
document.addEventListener('click',e=>{const anchor=e.target.closest('a[href]');if(!anchor||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||anchor.target||anchor.hasAttribute('download')||anchor.classList.contains('language-link'))return;const url=new URL(anchor.href),current=new URL(location.href);if(url.origin!==current.origin||url.pathname.split('/').slice(0,-1).join('/')!==current.pathname.split('/').slice(0,-1).join('/')||!url.pathname.endsWith('.html'))return;if(url.pathname===current.pathname&&url.search===current.search)return;e.preventDefault();navigate(url.href);});
window.addEventListener('popstate',e=>{if(location.pathname===renderedPath){initialiseView({scrollToHash:!!location.hash});if(!location.hash)window.scrollTo({top:e.state?.scroll||0,behavior:'instant'});return;}navigate(location.href,{pop:true,scroll:e.state?.scroll||0});});
