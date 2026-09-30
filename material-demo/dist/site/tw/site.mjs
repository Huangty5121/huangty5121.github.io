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
menuButton.addEventListener('click',()=>{menu.showModal();menuButton.setAttribute('aria-expanded','true');});
document.querySelector('[data-menu-close]').addEventListener('click',()=>menu.close());
menu.addEventListener('click',e=>{if(e.target===menu&&e.clientX<menu.getBoundingClientRect().left)menu.close();});
menu.addEventListener('close',()=>{menuButton.setAttribute('aria-expanded','false');menuButton.focus();});
function preference(key){try{return localStorage.getItem(key);}catch{return null;}}
function savePreference(key,value){try{localStorage.setItem(key,value);}catch{}}
const systemTheme=matchMedia('(prefers-color-scheme:dark)');
function applyTheme(value,{persist=false}={}){document.body.dataset.theme=value;document.querySelector('meta[name="theme-color"]').content=value==='dark'?'#191c1e':'#f7f7f5';const button=document.querySelector('[data-theme-toggle]');button.setAttribute('aria-pressed',String(value==='dark'));button.querySelector('[data-icon]').dataset.icon=value==='dark'?'moon':'sun';paintIcons(button);if(persist)savePreference('tyh-theme',value);}
document.documentElement.dataset.largeText=preference('tyh-large-text')||'false';
const themeButton=document.querySelector('[data-theme-toggle]'),sizeButton=document.querySelector('[data-text-size]');
applyTheme(preference('tyh-theme')||(systemTheme.matches?'dark':'light'));
themeButton.addEventListener('click',()=>applyTheme(document.body.dataset.theme==='dark'?'light':'dark',{persist:true}));
systemTheme.addEventListener('change',()=>{if(!preference('tyh-theme'))applyTheme(systemTheme.matches?'dark':'light');});
function syncSizeButton(){const large=document.documentElement.dataset.largeText==='true';sizeButton.setAttribute('aria-pressed',String(large));sizeButton.setAttribute('aria-label',large?t('使用較小字號','Use smaller text'):t('使用較大字號','Use larger text'));sizeButton.textContent=large?'A−':'A+';}
syncSizeButton();
sizeButton.addEventListener('click',()=>{document.documentElement.dataset.largeText=String(document.documentElement.dataset.largeText!=='true');syncSizeButton();savePreference('tyh-large-text',document.documentElement.dataset.largeText);});
const music=document.querySelector('#music'),musicButton=document.querySelector('[data-music-toggle]'),audioStatus=document.querySelector('[data-audio-status]');
const musicDock=document.querySelector('.music-dock'),musicPanel=document.querySelector('#music-panel'),musicSeek=document.querySelector('[data-music-seek]'),musicVolume=document.querySelector('[data-music-volume]');
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
document.addEventListener('click',e=>{if(e.target.closest('[popovertarget="contact-panel"]')&&menu.open)menu.close();});
document.querySelector('[data-copy-email]').addEventListener('click',async()=>{const status=document.querySelector('[data-copy-status]');try{await navigator.clipboard.writeText('tin-yeh.huang@connect.polyu.hk');status.textContent=t('郵箱已複製','Email copied');}catch{status.textContent=t('請選中上方郵箱複製','Select the email above to copy it');}});
let viewAbort;
function revealHash({scroll=true}={}){
 const id=decodeURIComponent(location.hash.slice(1));if(!id)return;
 if(id==='contact'){contactPanel.showPopover();return;}
 // Preserve incoming bookmarks after moving the self-note and CV records.
 if(document.body.dataset.page==='about'){
  const personal=['personal','personal-title','feelings'].includes(id);
  const record=/^(org-|record-|study-)/.test(id)||['records','experience','education','honours','credentials','peer-review'].includes(id);
  if(personal||record){location.replace((personal?'index.html':'experience.html')+'#'+encodeURIComponent(id));return;}
 }
 let target=document.getElementById(id);if(!target)return;
 if(target.dataset.recordTarget)target=document.getElementById(target.dataset.recordTarget)||target;
 for(let parent=target.parentElement;parent;parent=parent.parentElement)if(parent instanceof HTMLDetailsElement)parent.open=true;
 if(target instanceof HTMLDetailsElement)target.open=true;
 if(scroll)target.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}
function initialiseView({scrollToHash=true}={}){
 viewAbort?.abort();viewAbort=new AbortController();const options={signal:viewAbort.signal};const main=document.querySelector('main');paintIcons(main);
 const shelf=main.querySelector('.shelf-stage');
 if(shelf){
  const scroller=shelf.querySelector('.shelf-scroll'),caption=shelf.querySelector('.shelf-caption');
  const sleeves=[...shelf.querySelectorAll('.album-sleeve')];let selected=sleeves[0],frame;
  const positionCaption=()=>{
   const base=shelf.getBoundingClientRect(),cover=selected.getBoundingClientRect();
   const center=cover.left+cover.width/2-base.left;
   const left=Math.max(0,Math.min(center-caption.offsetWidth/2,base.width-caption.offsetWidth));
   caption.style.left=left+'px';
   caption.style.setProperty('--caption-pointer',Math.max(10,Math.min(center-left,caption.offsetWidth-10))+'px');
   caption.hidden=cover.right<=base.left||cover.left>=base.right;
  };
  const followMotion=()=>{cancelAnimationFrame(frame);const until=performance.now()+300;const step=()=>{positionCaption();if(performance.now()<until)frame=requestAnimationFrame(step);};frame=requestAnimationFrame(step);};
  const selectSleeve=sleeve=>{
   selected=sleeve;for(const item of sleeves){item.classList.toggle('is-selected',item===sleeve);item.setAttribute('aria-pressed',String(item===sleeve));}
   caption.querySelector('[data-album-title]').textContent=sleeve.dataset.albumTitle;
   caption.querySelector('[data-album-artist]').textContent=sleeve.dataset.albumArtist;
   const track=caption.querySelector('[data-album-track]');track.textContent=sleeve.dataset.albumTrack;track.hidden=!track.textContent;
   const source=caption.querySelector('[data-album-source]');source.href=sleeve.dataset.albumUrl;source.setAttribute('aria-label',sleeve.dataset.albumTitle+' · Apple Music');
   followMotion();
  };
  // Expanding sleeves move beneath a stationary pointer. Select on actual
  // pointer movement, so the animation cannot silently choose a neighbour.
  let pointerX,pointerY;
  scroller.addEventListener('pointermove',e=>{
   if(e.pointerType!=='mouse'||e.clientX===pointerX&&e.clientY===pointerY)return;
   pointerX=e.clientX;pointerY=e.clientY;
   const sleeve=e.target.closest('.album-sleeve');if(sleeve&&sleeve!==selected)selectSleeve(sleeve);
  },options);
  for(const sleeve of sleeves){
   sleeve.addEventListener('click',()=>selectSleeve(sleeve),options);
   sleeve.addEventListener('focus',()=>{selectSleeve(sleeve);requestAnimationFrame(()=>{sleeve.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});followMotion();});},options);
   sleeve.addEventListener('keydown',e=>{let i=sleeves.indexOf(sleeve);if(e.key==='ArrowRight')i=(i+1)%sleeves.length;else if(e.key==='ArrowLeft')i=(i+sleeves.length-1)%sleeves.length;else if(e.key==='Home')i=0;else if(e.key==='End')i=sleeves.length-1;else return;e.preventDefault();sleeves[i].focus();},options);
  }
  scroller.addEventListener('scroll',positionCaption,{...options,passive:true});
  scroller.addEventListener('pointerenter',followMotion,options);
  scroller.addEventListener('pointerleave',()=>{pointerX=pointerY=undefined;followMotion();},options);
  scroller.addEventListener('focusout',followMotion,options);
  const resize=new ResizeObserver(positionCaption);resize.observe(shelf);resize.observe(caption);
  viewAbort.signal.addEventListener('abort',()=>{resize.disconnect();cancelAnimationFrame(frame);},{once:true});
  positionCaption();
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
    if(match&&id)card.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest',inline:'center'});
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
 const drawer=main.querySelector('.drinks-drawer');
 if(drawer){
  let opener;
  for(const button of main.querySelectorAll('[data-cabinet-open]'))button.addEventListener('click',()=>{
   opener=button;const kind=button.dataset.cabinetOpen;
   for(const panel of drawer.querySelectorAll('[data-cabinet-panel]'))panel.hidden=panel.dataset.cabinetPanel!==kind;
   drawer.setAttribute('aria-labelledby','drinks-'+kind+'-title');drawer.showModal();
   document.body.classList.add('drawer-open');
   if(!matchMedia('(prefers-reduced-motion: reduce)').matches)drawer.animate([{transform:matchMedia('(max-width:700px)').matches?'translateY(100%)':'translateX(100%)',opacity:.4},{transform:'translate(0)',opacity:1}],{duration:350,easing:'cubic-bezier(.2,.8,.2,1)'});
  },options);
  drawer.querySelector('[data-cabinet-close]').addEventListener('click',()=>drawer.close(),options);
  drawer.addEventListener('click',e=>{if(e.target===drawer){const rect=drawer.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)drawer.close();}},options);
  drawer.addEventListener('close',()=>{document.body.classList.remove('drawer-open');opener?.focus({preventScroll:true});},options);
  options.signal.addEventListener('abort',()=>{if(drawer.open)drawer.close();document.body.classList.remove('drawer-open');},{once:true});
 }
 const journal=main.querySelector('.city-journal');
 if(journal){
  const viewport=journal.querySelector('[data-journal-map]'),note=journal.querySelector('.city-note'),stage=journal.querySelector('.journal-stage');
  const places=JSON.parse(viewport.dataset.places);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let map,selectedCity=null,animation;
  const markers=new Map();
  const develop=element=>{animation?.cancel();if(!reduced)animation=element.animate([{opacity:.3,filter:'blur(5px)',transform:'translateY(5px) rotate(.4deg)'},{opacity:1,filter:'blur(0)',transform:'translateY(0) rotate(0)'}],{duration:320,easing:'ease-out'});};
  const closeNote=({focus=false}={})=>{note.hidden=true;stage.classList.remove('has-note');selectedCity=null;for(const marker of markers.values())marker.getElement()?.classList.remove('is-selected');if(focus)viewport.focus({preventScroll:true});};
  const choosePlace=(id,{focus=false,fromPin=false}={})=>{
   const city=places.find(place=>place.id===id);if(!city)return;
   selectedCity=city;
   for(const panel of journal.querySelectorAll('[data-journal-city-panel]'))panel.hidden=panel.dataset.journalCityPanel!==id;
   journal.querySelector('[data-journal-city]').textContent=city.name+' / '+city.level;
   note.hidden=false;stage.classList.add('has-note');develop(note);
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
   tiles.on('tileerror',()=>{if(!loadedTiles)status.textContent=t('底圖暫時未能加載，仍可點圖釘翻頁。','The basemap is unavailable; pins still open their pages.');});
   for(const city of places){
    const label=document.createElement('span');label.textContent=city.name;
    const marker=L.marker(city.coordinates,{title:city.name,keyboard:true,riseOnHover:true,icon:L.divIcon({className:'journal-map-pin',html:`<span class="map-pin-head" style="--pin-color:${city.color}"></span>`,iconSize:[36,42],iconAnchor:[18,37]})});
    marker.bindTooltip(label,{permanent:false,direction:'top',offset:[0,city.id==='hk'?5:-22],className:'journal-map-label'});
    marker.on('click',()=>choosePlace(city.id,{fromPin:true}));marker.addTo(map);markers.set(city.id,marker);
   }
   reset();
   const resize=new ResizeObserver(()=>map.invalidateSize({pan:false}));resize.observe(viewport);
   options.signal.addEventListener('abort',()=>{resize.disconnect();animation?.cancel();map.remove();},{once:true});
  }else journal.querySelector('[data-map-status]').textContent=t('地圖暫時未能加載，暫無法翻閲城市。','The map is unavailable, so city pages cannot open.');
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
