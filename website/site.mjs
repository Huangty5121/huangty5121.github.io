import mapLand from './assets/map-land.mjs';
const zh=document.body.dataset.lang==='zh';
const t=(a,b)=>zh?a:b;
const modules=new Map(Object.entries({
 'plus':[['path',{d:'M12 5v14M5 12h14'}]],'minus':[['path',{d:'M5 12h14'}]],
 'arrow-right':[['path',{d:'M5 12h14m-6-6 6 6-6 6'}]],'chevron-down':[['path',{d:'m6 9 6 6 6-6'}]],
 'copy':[['rect',{x:'9',y:'9',width:'11',height:'11',rx:'2'}],['path',{d:'M15 9V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h4'}]]
}));
async function paintIcons(root=document){for(const el of root.querySelectorAll('[data-icon]')){const name=el.dataset.icon;try{if(!modules.has(name))modules.set(name,(await import(`./assets/icons/${name}.js`)).default);if(!el.isConnected)continue;const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');for(const[k,v]of Object.entries({viewBox:'0 0 24 24',fill:'none',stroke:'currentColor','stroke-width':'1.5','stroke-linecap':'round','stroke-linejoin':'round','aria-hidden':'true'}))svg.setAttribute(k,v);for(const[tag,attrs]of modules.get(name)){const path=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const[k,v]of Object.entries(attrs))path.setAttribute(k,v);svg.append(path);}el.replaceChildren(svg);}catch{el.hidden=true;}}}
const menu=document.querySelector('#site-menu'),menuButton=document.querySelector('[data-menu-toggle]');
menuButton.addEventListener('click',()=>{menu.showModal();menuButton.setAttribute('aria-expanded','true');});
document.querySelector('[data-menu-close]').addEventListener('click',()=>menu.close());
menu.addEventListener('click',e=>{if(e.target===menu&&e.clientX<menu.getBoundingClientRect().left)menu.close();});
menu.addEventListener('close',()=>{menuButton.setAttribute('aria-expanded','false');menuButton.focus();});
function preference(key){try{return localStorage.getItem(key);}catch{return null;}}
function savePreference(key,value){try{localStorage.setItem(key,value);}catch{}}
const systemTheme=matchMedia('(prefers-color-scheme:dark)');
function applyTheme(value,{persist=false}={}){document.body.dataset.theme=value;document.querySelector('meta[name="theme-color"]').content=value==='dark'?'#10151c':'#f5f5f7';const button=document.querySelector('[data-theme-toggle]');button.setAttribute('aria-pressed',String(value==='dark'));button.querySelector('[data-icon]').dataset.icon=value==='dark'?'moon':'sun';paintIcons(button);if(persist)savePreference('tyh-theme',value);}
document.body.dataset.largeText=preference('tyh-large-text')||'false';
const themeButton=document.querySelector('[data-theme-toggle]'),sizeButton=document.querySelector('[data-text-size]');
applyTheme(preference('tyh-theme')||(systemTheme.matches?'dark':'light'));
themeButton.addEventListener('click',()=>applyTheme(document.body.dataset.theme==='dark'?'light':'dark',{persist:true}));
systemTheme.addEventListener('change',()=>{if(!preference('tyh-theme'))applyTheme(systemTheme.matches?'dark':'light');});
sizeButton.setAttribute('aria-pressed',document.body.dataset.largeText);
sizeButton.addEventListener('click',()=>{document.body.dataset.largeText=String(document.body.dataset.largeText!=='true');sizeButton.setAttribute('aria-pressed',document.body.dataset.largeText);savePreference('tyh-large-text',document.body.dataset.largeText);window.ScrollTrigger?.refresh();});
const music=document.querySelector('#music'),musicButton=document.querySelector('[data-music-toggle]'),audioStatus=document.querySelector('[data-audio-status]');
const musicDock=document.querySelector('.music-dock'),musicPanel=document.querySelector('#music-panel'),musicSeek=document.querySelector('[data-music-seek]'),musicVolume=document.querySelector('[data-music-volume]');
music.volume=.55;
const audioTime=seconds=>`${Math.floor(seconds/60)}:${String(Math.floor(seconds%60)).padStart(2,'0')}`;
function audioState(){musicButton.setAttribute('aria-pressed',String(!music.paused));musicButton.setAttribute('aria-label',music.paused?t('播放音乐试听','Play music preview'):t('暂停音乐试听','Pause music preview'));musicButton.querySelector('[data-icon]').dataset.icon=music.paused?'play':'pause';musicDock.dataset.playing=String(!music.paused);document.querySelector('[data-music-label]').textContent=music.paused?t('听点音乐','A little music'):t('正在播放 · 尘大师','Playing · 尘大师');paintIcons(musicButton);}
function audioProgress(){const duration=Number.isFinite(music.duration)?music.duration:0;musicSeek.disabled=!duration;musicSeek.max=duration||30;musicSeek.value=music.currentTime;document.querySelector('[data-music-elapsed]').textContent=audioTime(music.currentTime);if(duration)document.querySelector('[data-music-duration]').textContent=audioTime(duration);}
musicSeek.addEventListener('input',()=>{if(Number.isFinite(music.duration))music.currentTime=Number(musicSeek.value);audioProgress();});
musicVolume.addEventListener('input',()=>{music.volume=Number(musicVolume.value);});
for(const name of ['loadedmetadata','durationchange','timeupdate'])music.addEventListener(name,audioProgress);
musicPanel.addEventListener('toggle',()=>{document.querySelector('.music-launcher').setAttribute('aria-expanded',String(musicPanel.matches(':popover-open')));});
musicButton.addEventListener('click',async()=>{if(!music.paused)music.pause();else try{audioStatus.textContent=t('加载试听…','Loading preview…');await music.play();audioStatus.textContent=t('约 30 秒官方试听','~30-second official preview');}catch{audioStatus.textContent=t('暂时无法播放试听','Preview unavailable');}});
for(const name of ['play','pause','ended'])music.addEventListener(name,audioState);
music.addEventListener('error',()=>{audioStatus.textContent=t('试听连接暂不可用','Preview connection unavailable');});
const contactPanel=document.querySelector('#contact-panel');
document.addEventListener('click',e=>{if(e.target.closest('[popovertarget="contact-panel"]')&&menu.open)menu.close();});
document.querySelector('[data-copy-email]').addEventListener('click',async()=>{const status=document.querySelector('[data-copy-status]');try{await navigator.clipboard.writeText('tin-yeh.huang@connect.polyu.hk');status.textContent=t('邮箱已复制','Email copied');}catch{status.textContent=t('请选中上方邮箱复制','Select the email above to copy it');}});
let viewAbort,animationContext,selectCurrentOrg;
function revealHash({scroll=true}={}){const id=decodeURIComponent(location.hash.slice(1));if(!id)return;if(id==='contact'){contactPanel.showPopover();return;}if(id.startsWith('org-')){selectCurrentOrg?.(id.slice(4),false);if(scroll)(matchMedia('(max-width:600px)').matches?document.querySelector('#organisation-context'):document.querySelector('.background-board'))?.scrollIntoView({block:'start',behavior:'instant'});return;}const target=document.getElementById(id);if(!target)return;if(target.matches('[data-background-item]'))selectCurrentOrg?.(target.dataset.organisations.split(' ')[0],false);if(target.matches('.entry')){const section=target.closest('[data-work-section]');if(section?.hidden)document.querySelector(`[data-filter="${section.dataset.workSection}"]`)?.click();if(target.hidden){const search=document.querySelector('[data-search-input]');if(search){search.value='';search.dispatchEvent(new Event('input'));}}}for(let parent=target.parentElement;parent;parent=parent.parentElement)if(parent instanceof HTMLDetailsElement)parent.open=true;if(target instanceof HTMLDetailsElement)target.open=true;if(scroll)target.scrollIntoView({block:'start',behavior:'instant'});}
function initialiseView({scrollToHash=true}={}){
 viewAbort?.abort();animationContext?.revert();viewAbort=new AbortController();const options={signal:viewAbort.signal};const main=document.querySelector('main');paintIcons(main);
 const collection=main.querySelector('.collection');
 if(collection){
  const search=collection.querySelector('[data-search-input]'),buttons=[...collection.querySelectorAll('[data-filter]')],sections=[...collection.querySelectorAll('[data-work-section]')],sort=collection.querySelector('[data-sort]');
  const params=new URLSearchParams(location.search),hashTarget=location.hash?collection.querySelector('#'+CSS.escape(decodeURIComponent(location.hash.slice(1)))):null;
  let filter=hashTarget?.closest('[data-work-section]')?.dataset.workSection||(['papers','projects'].includes(params.get('filter'))?params.get('filter'):'papers');
  search.value=params.get('q')||'';sort.value=params.get('sort')==='newest'?'newest':'curated';
  function update(){
   const q=search.value.trim().toLowerCase();let n=0;
   for(const section of sections){const active=section.dataset.workSection===filter;section.hidden=!active;for(const row of section.querySelectorAll('[data-search]')){row.hidden=!row.dataset.search.includes(q);if(active&&!row.hidden)n++;}const list=section.querySelector('[data-results]');list.append(...[...list.children].sort((a,b)=>sort.value==='newest'?Number(b.dataset.date)-Number(a.dataset.date)||Number(a.dataset.order)-Number(b.dataset.order):Number(a.dataset.order)-Number(b.dataset.order)));}
   const count=collection.querySelector('[data-result-count]');count.textContent=`${n} ${t('项内容',n===1?'entry':'entries')}`;count.hidden=!q;
   collection.querySelector('.empty-state').hidden=n>0;
   for(const button of buttons)button.setAttribute('aria-pressed',String(button.dataset.filter===filter));
   const url=new URL(location.href);if(q)url.searchParams.set('q',search.value);else url.searchParams.delete('q');if(filter==='projects')url.searchParams.set('filter','projects');else url.searchParams.delete('filter');if(sort.value==='newest')url.searchParams.set('sort','newest');else url.searchParams.delete('sort');history.replaceState(history.state,'',url);
  }
  sort.addEventListener('change',update,options);search.addEventListener('input',update,options);
  for(const button of buttons)button.addEventListener('click',()=>{filter=button.dataset.filter;search.value='';update();},options);
  update();
 }
 selectCurrentOrg=null;
 const board=main.querySelector('.background-board');
 if(board){
  const directory=board.querySelector('.directory-heading'),layout=board.querySelector('.background-layout');
  const cityNames={bj:t('北京','Beijing'),sz:t('深圳','Shenzhen'),hk:t('香港','Hong Kong')};
  const chooseCity=id=>{
   board.dataset.city=id||'';
   directory.hidden=!id;
   for(const item of board.querySelectorAll('[data-city]'))item.setAttribute('aria-pressed',String(!!id&&item.dataset.city===id));
   for(const org of board.querySelectorAll('[data-city-group]'))org.hidden=!id||org.dataset.cityGroup!==id;
   board.querySelector('[data-city-name]').textContent=id?cityNames[id]:'';
   board.querySelector('[data-city-count]').textContent=String(board.querySelectorAll('.organisation-choices [data-org]:not([hidden])').length);
  };
  selectCurrentOrg=(id,write=true)=>{
   const selected=id?board.querySelector(`[data-org="${CSS.escape(id)}"]`):null;
   if(selected?.dataset.cityGroup)chooseCity(selected.dataset.cityGroup);
   let n=0;
   for(const row of board.querySelectorAll('[data-background-item]')){row.hidden=!id||!row.dataset.organisations.split(' ').includes(id);if(!row.hidden)n++;}
   for(const button of board.querySelectorAll('[data-org]')){button.setAttribute('aria-pressed',String(button===selected));button.setAttribute('aria-expanded',String(button===selected));}
   board.querySelector('.selected-institution').hidden=!id;
   board.querySelector('[data-close-org]').hidden=!id;
   board.querySelector('.board-empty').hidden=!!id||!board.dataset.city;
   board.dataset.orgOpen=String(!!id);
   board.querySelector('[data-selected-org]').textContent=selected?.dataset.orgName||'';
   board.querySelector('[data-background-count]').textContent=`${n} ${t('项记录',n===1?'record':'records')}`;
   layout.hidden=!(board.dataset.city||id);
   if(write){const url=new URL(location.href);url.hash=id?'org-'+id:'';history.replaceState({...history.state,scroll:scrollY},'',url);}
   window.ScrollTrigger?.refresh();
  };
  for(const button of board.querySelectorAll('[data-org]'))button.addEventListener('click',()=>{
   const id=button.getAttribute('aria-pressed')==='true'?'':button.dataset.org;
   selectCurrentOrg(id);
   if(id&&matchMedia('(max-width:600px)').matches)board.querySelector('#organisation-context').scrollIntoView({block:'start',behavior:'smooth'});
  },options);
  board.querySelector('[data-close-org]').addEventListener('click',()=>{
   const button=board.querySelector('[data-org][aria-pressed="true"]');selectCurrentOrg('');
   if(matchMedia('(max-width:600px)').matches)board.querySelector('.institution-selector').scrollIntoView({block:'start',behavior:'smooth'});
   button?.focus({preventScroll:true});
  },options);
  chooseCity(null);selectCurrentOrg('',false);
  for(const city of board.querySelectorAll('[data-city]'))city.addEventListener('click',()=>{chooseCity(city.dataset.city);selectCurrentOrg('',false);},options);
  window.addEventListener('resize',()=>{const selected=board.querySelector('[data-org][aria-pressed="true"]');if(selected)selectCurrentOrg(selected.dataset.org,false);},options);
 }
 for(const viewport of [main.querySelector('[data-citymap]')]){
  if(!viewport)break;
  const L=window.L;if(!L)break;
  const zhLang=document.body.dataset.lang==='zh';
  const cities=[['bj',zhLang?'北京':'Beijing'],['sz',zhLang?'深圳':'Shenzhen'],['hk',zhLang?'香港':'Hong Kong']].map(([id,name])=>({id,name,ll:viewport.dataset['city'+id[0].toUpperCase()+id[1]]?.split(',').map(Number),dot:{bj:'#846bb9',sz:'#e07e64',hk:'#3c9c86'}[id]})).filter(c=>c.ll&&c.ll.length===2&&c.ll.every(Number.isFinite));
  if(!cities.length)break;
  // One fixed light cartography for both themes: the offline silhouette
  // paints instantly underneath, desaturated Esri Topo tiles load over it.
  const tileSets=[['https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}','Tiles © Esri']];
  const landStyle={color:'#a9c9bd',weight:.8,fillColor:'#dcead9',fillOpacity:1};
  const flyZoom={bj:8,sz:9,hk:9};
  const map=L.map(viewport,{zoomControl:false,scrollWheelZoom:false});
  map.attributionControl.setPrefix('');
  map.addControl(L.control.zoom({position:'bottomright'}));
  map.createPane('land');map.getPane('land').style.zIndex=100;
  const land=L.geoJSON(mapLand,{interactive:false,pane:'land',style:landStyle,attribution:'Land © Natural Earth'}).addTo(map);
  let tileLayers=[];
  const applyTiles=()=>{for(const l of tileLayers)map.removeLayer(l);tileLayers=tileSets.map(([url,attr])=>L.tileLayer(url,{maxZoom:16,keepBuffer:4,updateWhenZooming:false,detectRetina:true,attribution:attr}).addTo(map));};
  applyTiles();
  const overview=()=>{map.fitBounds(L.latLngBounds(cities.map(c=>c.ll)).pad(viewport.clientWidth>520?.18:.3),{animate:false});};
  overview();
  // A hidden offscreen map prefetches each city's tiles so jumps feel instant.
  const warmHost=document.createElement('div');
  warmHost.style.cssText='position:absolute;left:-99990px;top:0;width:480px;height:340px;visibility:hidden;pointer-events:none';
  document.body.append(warmHost);
  const warmMap=L.map(warmHost,{zoomControl:false,attributionControl:false,scrollWheelZoom:false,dragging:false,boxZoom:false,doubleClickZoom:false,keyboard:false,touchZoom:false});
  let warmLayers=[];
  const applyWarm=()=>{for(const l of warmLayers)warmMap.removeLayer(l);warmLayers=tileSets.map(([url])=>L.tileLayer(url,{maxZoom:16,keepBuffer:4,detectRetina:true}).addTo(warmMap));};
  applyWarm();
  let warmed=false;
  const warmCities=async()=>{if(warmed)return;warmed=true;for(const c of cities){if(!warmMap)return;warmMap.setView(c.ll,flyZoom[c.id]||9,{animate:false});await new Promise(r=>setTimeout(r,900));}};
  const warmTimer=setTimeout(warmCities,2600);
  let selectedId=null;const markers={};
  // Strategy-map arcs join the cities at overview and fade once zoomed in.
  const arc=(a,b,bulge)=>{
   const pts=[];
   const mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2;
   const dx=b[1]-a[1],dy=b[0]-a[0],len=Math.hypot(dx,dy)||1;
   const cx=mx+(-dy/len)*len*bulge,cy=my+(dx/len)*len*bulge;
   for(let i=0;i<=36;i++){const t=i/36,u=1-t;pts.push([u*u*a[0]+2*u*t*cx+t*t*b[0],u*u*a[1]+2*u*t*cy+t*t*b[1]]);}
   return pts;
  };
  const link=L.polyline([arc(cities[0].ll,cities[1].ll,.16),arc(cities[1].ll,cities[2].ll,.3)],{weight:1.6,dashArray:'1 8',opacity:.65,interactive:false,lineCap:'round',className:'city-link'}).addTo(map);
  const cssRead=()=>getComputedStyle(document.body).getPropertyValue('--accent').trim();
  const paintLink=()=>{link.setStyle({color:cssRead(),opacity:map.getZoom()<=(flyZoom.bj-1)?.65:0});};
  map.on('zoomend',paintLink);
  for(const c of cities){
   const m=L.marker(c.ll,{icon:L.divIcon({className:'city-pin-holder',html:`<span class="city-dot" style="--dot:${c.dot}"></span>`,iconSize:[15,15],iconAnchor:[7,7]}),keyboard:false,title:c.name,alt:c.name,riseOnHover:true});
   m.on('click',()=>main.querySelector(`.city-index button[data-city="${c.id}"]`)?.click());
   m.addTo(map);markers[c.id]=m;
  }
  viewport.parentElement.querySelector('.map-fallback')?.setAttribute('hidden','');
  const paint=()=>{link.setStyle({color:cssRead()});for(const c of cities)markers[c.id].getElement()?.firstElementChild?.classList.toggle('is-selected',c.id===selectedId);paintLink();};
  const fly=id=>{const c=cities.find(x=>x.id===id);selectedId=c?.id||null;if(c)map.setView(c.ll,flyZoom[id]||9,{animate:false});else overview();paint();};
  for(const b of main.querySelectorAll('.city-index button[data-city]'))b.addEventListener('click',()=>fly(b.dataset.city),options);
  setTimeout(()=>{const c=main.querySelector('.background-board')?.dataset.city;if(c&&c!==selectedId)fly(c);},0);
  const mo=new MutationObserver(()=>paint());
  mo.observe(document.body,{attributes:true,attributeFilter:['data-theme']});
  options.signal.addEventListener('abort',()=>{mo.disconnect();clearTimeout(warmTimer);warmed=true;warmMap.remove();warmHost.remove();map.remove();},{once:true});
 }
 if(new URLSearchParams(location.search).get('contact')==='open')contactPanel.showPopover();
 for(const button of main.querySelectorAll('[data-work-area]'))button.addEventListener('click',()=>{for(const b of main.querySelectorAll('[data-work-area]'))b.setAttribute('aria-pressed',String(b===button));for(const panel of main.querySelectorAll('[data-work-panel]'))panel.hidden=panel.dataset.workPanel!==button.dataset.workArea;},options);
 updateClock();
 if(window.gsap&&window.ScrollTrigger){gsap.registerPlugin(ScrollTrigger);animationContext=gsap.context(()=>{const mm=gsap.matchMedia();mm.add('(min-width:601px) and (prefers-reduced-motion:no-preference)',()=>{const image=main.querySelector('.material-scene img');if(image)gsap.to(image,{y:28,scale:1.035,ease:'none',scrollTrigger:{trigger:main.querySelector('.landing'),start:'top top',end:'bottom top',scrub:.7}});});},main);ScrollTrigger.refresh();}
 revealHash({scroll:scrollToHash});
}
function updateClock(){const clock=document.querySelector('[data-local-time]');if(clock){const now=new Date();clock.textContent=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Hong_Kong',hour:'2-digit',minute:'2-digit',hour12:false}).format(now);clock.dateTime=now.toISOString();}}
setInterval(updateClock,30000);
paintIcons();initialiseView();window.addEventListener('hashchange',revealHash);
// Keep normal HTML URLs and browser history, while retaining the player on same-language navigation.
let navigationController,navigationId=0,renderedPath=location.pathname;
let loadingTimer;
history.scrollRestoration='manual';
history.replaceState({...history.state,scroll:scrollY},'');
async function navigate(url,{pop=false,scroll=0}={}){const id=++navigationId;navigationController?.abort();navigationController=new AbortController();clearTimeout(loadingTimer);loadingTimer=setTimeout(()=>document.body.classList.add('is-loading'),140);try{const response=await fetch(url,{signal:navigationController.signal,cache:'no-cache'});if(!response.ok)throw new Error('Navigation failed');const doc=new DOMParser().parseFromString(await response.text(),'text/html');if(!doc.querySelector('main')){location.href=url;return;}const nextScript=doc.querySelector('script[type=module]')?.getAttribute('src'),currentScript=document.querySelector('script[type=module]')?.getAttribute('src');if(nextScript&&currentScript&&nextScript!==currentScript){location.href=url;return;}if(id!==navigationId)return;if(!pop){history.replaceState({...history.state,scroll:scrollY},'');history.pushState({scroll:0},'',url);}menu.close();if(contactPanel.matches(':popover-open'))contactPanel.hidePopover();viewAbort?.abort();animationContext?.revert();document.querySelector('main').replaceChildren(...doc.querySelector('main').childNodes);document.title=doc.title;document.body.dataset.page=doc.body.dataset.page;renderedPath=new URL(url,location.href).pathname;document.querySelector('.desktop-nav').replaceChildren(...doc.querySelector('.desktop-nav').childNodes);document.querySelector('.language-link').href=doc.querySelector('.language-link').href;document.querySelector('#site-menu nav').replaceChildren(...doc.querySelector('#site-menu nav').childNodes);paintIcons(menu);paintIcons(document.querySelector('.site-header'));initialiseView({scrollToHash:!pop});if(pop||!new URL(url,location.href).hash)window.scrollTo({top:scroll,behavior:'instant'});document.querySelector('main').focus({preventScroll:true});const currentMain=document.querySelector('main');currentMain.classList.remove('page-arriving');void currentMain.offsetWidth;currentMain.classList.add('page-arriving');}catch(error){if(error.name!=='AbortError')location.href=url;}finally{if(id===navigationId){clearTimeout(loadingTimer);document.body.classList.remove('is-loading');}}}
document.addEventListener('click',e=>{const anchor=e.target.closest('a[href]');if(!anchor||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||anchor.target||anchor.hasAttribute('download')||anchor.classList.contains('language-link'))return;const url=new URL(anchor.href),current=new URL(location.href);if(url.origin!==current.origin||url.pathname.split('/').slice(0,-1).join('/')!==current.pathname.split('/').slice(0,-1).join('/')||!url.pathname.endsWith('.html'))return;if(url.pathname===current.pathname&&url.search===current.search)return;e.preventDefault();navigate(url.href);});
window.addEventListener('popstate',e=>{if(location.pathname===renderedPath){initialiseView({scrollToHash:!!location.hash});if(!location.hash)window.scrollTo({top:e.state?.scroll||0,behavior:'instant'});return;}navigate(location.href,{pop:true,scroll:e.state?.scroll||0});});
