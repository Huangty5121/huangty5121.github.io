const zh=document.body.dataset.lang!=='en';
const t=(a,b)=>zh?a:b;
const modules=new Map(Object.entries({
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
function audioState(){musicButton.setAttribute('aria-pressed',String(!music.paused));musicButton.setAttribute('aria-label',music.paused?t('播放音樂試聽','Play music preview'):t('暫停音樂試聽','Pause music preview'));musicButton.querySelector('[data-icon]').dataset.icon=music.paused?'play':'pause';musicDock.dataset.playing=String(!music.paused);document.querySelector('[data-music-label]').textContent=music.paused?t('聽點音樂','A little music'):t('正在播放 · 淺粉紅','Playing · pale pink');paintIcons(musicButton);}
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
let viewAbort,selectCurrentOrg,focusOrg,closeCity,updateMapPanel;
function revealHash({scroll=true}={}){const id=decodeURIComponent(location.hash.slice(1));if(!id)return;if(id==='contact'){contactPanel.showPopover();return;}if(id.startsWith('org-')){selectCurrentOrg?.(id.slice(4),false);focusOrg?.(id.slice(4));if(scroll)(matchMedia('(max-width:600px)').matches?document.querySelector('#organisation-context'):document.querySelector('.background-board'))?.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});return;}const target=document.getElementById(id);if(!target)return;if(target.matches('[data-background-item]'))selectCurrentOrg?.(target.dataset.organisations.split(' ')[0],false);for(let parent=target.parentElement;parent;parent=parent.parentElement)if(parent instanceof HTMLDetailsElement)parent.open=true;if(target instanceof HTMLDetailsElement)target.open=true;if(scroll)target.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
function initialiseView({scrollToHash=true}={}){
 viewAbort?.abort();viewAbort=new AbortController();const options={signal:viewAbort.signal};const main=document.querySelector('main');paintIcons(main);
 const albumDetail=main.querySelector('[data-album-detail]');
 if(albumDetail)for(const sleeve of main.querySelectorAll('[data-album-caption]'))for(const event of ['pointerenter','focus'])sleeve.addEventListener(event,()=>{albumDetail.textContent=sleeve.dataset.albumCaption;if(event==='focus')requestAnimationFrame(()=>sleeve.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'}));},options);
 const toolTabs=[...main.querySelectorAll('[data-tool-tab]')];
 const chooseTool=tab=>{for(const item of toolTabs){const selected=item===tab;item.setAttribute('aria-selected',String(selected));item.tabIndex=selected?0:-1;main.querySelector('#'+item.getAttribute('aria-controls')).hidden=!selected;}};
 toolTabs.forEach((tab,i)=>{tab.addEventListener('click',()=>chooseTool(tab),options);tab.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight')n=(i+1)%toolTabs.length;else if(e.key==='ArrowLeft')n=(i+toolTabs.length-1)%toolTabs.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=toolTabs.length-1;else return;e.preventDefault();chooseTool(toolTabs[n]);toolTabs[n].focus();},options);});
 const workTabs=[...main.querySelectorAll('[data-work-tab]')];
 if(workTabs.length){
  const selectWork=kind=>{for(const tab of workTabs)tab.setAttribute('aria-pressed',String(tab.dataset.workTab===kind));for(const panel of main.querySelectorAll('[data-work-panel]'))panel.hidden=panel.dataset.workPanel!==kind;};
  const workKind=()=>location.hash==='#practice'||['ninetoothed','social'].includes(location.hash.slice(1))||new URLSearchParams(location.search).get('filter')==='engineering'?'engineering':'research';
  selectWork(workKind());
  for(const tab of workTabs)tab.addEventListener('click',()=>selectWork(tab.dataset.workTab),options);
  window.addEventListener('hashchange',()=>selectWork(workKind()),options);
 }
 const clock=main.querySelector('[data-local-time]');
 if(clock){const now=new Date();clock.textContent=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Hong_Kong',hour:'2-digit',minute:'2-digit',hour12:false}).format(now);clock.dateTime=now.toISOString();}
 selectCurrentOrg=null;updateMapPanel=null;
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
  };
  selectCurrentOrg=(id,write=true)=>{
   const selected=id?board.querySelector(`[data-org="${CSS.escape(id)}"]`):null;
   if(selected?.dataset.cityGroup)chooseCity(selected.dataset.cityGroup);
   for(const row of board.querySelectorAll('[data-background-item]'))row.hidden=!id||!row.dataset.organisations.split(' ').includes(id);
   for(const button of board.querySelectorAll('[data-org]')){button.setAttribute('aria-pressed',String(button===selected));button.setAttribute('aria-expanded',String(button===selected));}
   board.querySelector('.selected-institution').hidden=!id;
   board.querySelector('[data-close-org]').hidden=!id;
   board.querySelector('.board-empty').hidden=!!id||!board.dataset.city;
   board.dataset.orgOpen=String(!!id);
   board.querySelector('[data-selected-org]').textContent=selected?.dataset.orgName||'';
   layout.hidden=!(board.dataset.city||id);
   updateMapPanel?.();
   if(write){const url=new URL(location.href);url.hash=id?'org-'+id:'';history.replaceState({...history.state,scroll:scrollY},'',url);}
  };
  for(const button of board.querySelectorAll('[data-org]'))button.addEventListener('click',()=>{
   const id=button.getAttribute('aria-pressed')==='true'?'':button.dataset.org;
   selectCurrentOrg(id);
   if(id)focusOrg?.(id);
   if(id&&matchMedia('(max-width:600px)').matches)board.querySelector('#organisation-context').scrollIntoView({block:'start',behavior:'smooth'});
  },options);
  board.querySelector('[data-close-org]').addEventListener('click',()=>{
   const button=board.querySelector('[data-org][aria-pressed="true"]');selectCurrentOrg('');
   if(matchMedia('(max-width:600px)').matches)board.querySelector('.institution-selector').scrollIntoView({block:'start',behavior:'smooth'});
   button?.focus({preventScroll:true});
  },options);
  chooseCity('');selectCurrentOrg('',false);
  for(const city of board.querySelectorAll('[data-city]'))city.addEventListener('click',()=>{chooseCity(city.dataset.city);selectCurrentOrg('',false);},options);
  window.addEventListener('resize',()=>{const selected=board.querySelector('[data-org][aria-pressed="true"]');if(selected)selectCurrentOrg(selected.dataset.org,false);},options);
 closeCity=chooseCity;
 }
 for(const viewport of [main.querySelector('[data-citymap]')]){
  if(!viewport)break;
  const L=window.L;if(!L)break;
  const cities=[['bj',zh?'北京':'Beijing'],['sz',zh?'深圳':'Shenzhen'],['hk',zh?'香港':'Hong Kong']].map(([id,name])=>({id,name,ll:viewport.dataset['city'+id[0].toUpperCase()+id[1]]?.split(',').map(Number),dot:{bj:'#846bb9',sz:'#e07e64',hk:'#3c9c86'}[id]})).filter(c=>c.ll&&c.ll.length===2&&c.ll.every(Number.isFinite));
  if(!cities.length)break;
  // The authored coordinates and OpenStreetMap tiles both use WGS-84.
  // One pin per organisation position; a key like "x-institute~nan" marks a
  // second site of the same organisation (both pins select that organisation).
  const orgs=Object.entries(JSON.parse(viewport.dataset.orgs||'{}')).map(([key,ll])=>({key,id:key.split('~')[0],ll})).filter(o=>o.ll.length===2&&o.ll.every(Number.isFinite));
  const orgCity=id=>['polyu','royal-plaza','hksar','cpce'].includes(id)?'hk':['smart','x-institute'].includes(id)?'sz':'bj';
  const dotColor={bj:'#846bb9',sz:'#e07e64',hk:'#3c9c86'};
  const ATTR='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>';
  const TILE_URL='https://tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tileOpts={maxZoom:18,keepBuffer:0,updateWhenZooming:false,detectRetina:true};
  const map=L.map(viewport,{zoomControl:false,scrollWheelZoom:false});
  map.attributionControl.setPrefix('');
  map.addControl(L.control.zoom({position:'bottomright'}));
  const overviewTiles=L.tileLayer(TILE_URL,{...tileOpts,detectRetina:false,attribution:ATTR}).addTo(map);
  const detailTiles=L.tileLayer(TILE_URL,{...tileOpts,detectRetina:true,attribution:ATTR});
  let activeTiles=overviewTiles;
  const panel=main.querySelector('.map-panel');
  const panelTitle=panel?.querySelector('[data-map-title]');
  const panelBody=panel?.querySelector('[data-map-organisations]');
  const panelEyebrow=panel?.querySelector('[data-map-eyebrow]');
  const writePanel=(title,body,eyebrow)=>{if(panelTitle)panelTitle.textContent=title;if(panelBody)panelBody.textContent=body;if(panelEyebrow)panelEyebrow.textContent=eyebrow;};
  const overview=()=>{map.setView([25,75],2,{animate:false});writePanel(zh?'北京 · 深圳 · 香港':'Beijing · Shenzhen · Hong Kong',zh?'點擊地區標記，進入詳細地圖。':'Select a region pin to open its detailed map.',zh?'地點總覽':'Place overview');};
  overview();
  let currentCity=null;
  // One pin per organisation at its real position; click reads its records.
  const orgPins={};
  const SUFFIX_LABEL={nan:zh?'南山':'Nanshan'};
  for(const o of orgs){
   const base=main.querySelector(`[data-org="${CSS.escape(o.id)}"]`)?.dataset.orgName||o.id;
   const sfx=o.key.split('~')[1];
   const name=base+(sfx&&SUFFIX_LABEL[sfx]?' · '+SUFFIX_LABEL[sfx]:'');
   const m=L.marker(o.ll,{icon:L.divIcon({className:'org-pin',html:`<span class="city-dot" style="--dot:${dotColor[orgCity(o.id)]}"></span>`,iconSize:[20,20],iconAnchor:[10,10]}),keyboard:true,title:name,riseOnHover:true});
   m.bindTooltip(name,{direction:'top',offset:[0,-7],className:'city-tip'});
   m.on('click',()=>{
    fly(orgCity(o.id));
    highlightPins(o.id);
    map.setView(o.ll,13,{animate:false});
    selectCurrentOrg?.(o.id);
    if(matchMedia('(max-width:600px)').matches)main.querySelector('#organisation-context')?.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
   });
   m.on('mouseover',()=>{writePanel(name,zh?'點擊圓點，查看相關經歷。':'Click the pin to read the related experience.',zh?'機構':'Institution');main.querySelector(`[data-org="${CSS.escape(o.id)}"]`)?.classList.add('is-map-hovered');});
   m.on('mouseout',()=>{main.querySelector(`[data-org="${CSS.escape(o.id)}"]`)?.classList.remove('is-map-hovered');updatePanel();});
   orgPins[o.key]=m;
  }
  const highlightPins=id=>{
   for(const p of Object.values(orgPins))p.getElement()?.firstElementChild?.classList.remove('is-selected');
   if(id)for(const[key,p]of Object.entries(orgPins))if(key.split('~')[0]===id)p.getElement()?.firstElementChild?.classList.add('is-selected');
  };
  focusOrg=id=>{
   const pts=orgs.filter(o=>o.id===id).map(o=>o.ll);
   if(orgs.find(o=>o.id===id)&&currentCity!==orgCity(id))fly(orgCity(id));
   highlightPins(id);
   if(pts.length===1)map.setView(pts[0],13,{animate:false});
   else if(pts.length>1)map.fitBounds(L.latLngBounds(pts).pad(.25),{animate:false,maxZoom:13});
  };
  const regionPins=[
   {id:'bj',name:zh?'北京':'Beijing',ll:[39.9,116.33],color:dotColor.bj},
   {id:'bay',name:zh?'粵港澳大灣區':'Greater Bay Area',ll:[22.75,113.6],color:dotColor.hk}
  ].map(r=>{
   const marker=L.marker(r.ll,{icon:L.divIcon({className:'region-pin',html:`<span style="--region:${r.color}">${r.name}</span>`,iconSize:[120,38],iconAnchor:[60,19]}),title:r.name,keyboard:true});
   marker.on('click',()=>{if(r.id==='bay')fly('bay');else main.querySelector('[data-city="bj"]')?.click();});
   marker.on('mouseover',()=>writePanel(r.name,r.id==='bay'?(zh?'香港與深圳的機構':'Institutions in Hong Kong and Shenzhen'):(zh?'北京的機構':'Institutions in Beijing'),zh?'地區':'Region'));
   marker.on('mouseout',()=>updatePanel());
   return marker;
  });
  const updatePanel=()=>{
   const selectedOrg=main.querySelector('[data-org][aria-pressed="true"]');
   if(selectedOrg){
    const roles=[...main.querySelectorAll('.background-record-list [data-background-item]:not([hidden]) h3')].map(el=>el.textContent.trim()).slice(0,2);
    writePanel(selectedOrg.dataset.orgName,roles.join(' · '),zh?'機構與經歷':'Institution & experience');
    return;
   }
   if(!currentCity){writePanel(zh?'北京 · 深圳 · 香港':'Beijing · Shenzhen · Hong Kong',zh?'點擊地區標記，進入詳細地圖。':'Select a region pin to open its detailed map.',zh?'地點總覽':'Place overview');return;}
   const selected=currentCity==='bay'?orgs.filter(o=>['sz','hk'].includes(orgCity(o.id))):orgs.filter(o=>orgCity(o.id)===currentCity);
   const names=[...new Set(selected.map(o=>main.querySelector(`[data-org="${CSS.escape(o.id)}"]`)?.dataset.orgName).filter(Boolean))];
   const title=currentCity==='bay'?(zh?'香港 · 深圳':'Hong Kong · Shenzhen'):(cities.find(c=>c.id===currentCity)?.name||'');
   writePanel(title,names.join(' · '),zh?'相關機構':'Institutions');
  };
  updateMapPanel=updatePanel;
  const syncPins=()=>{
   for(const p of regionPins){if(!currentCity)p.addTo(map);else p.remove();}
   for(const o of orgs){const p=orgPins[o.key];if(currentCity&&(currentCity==='bay'?['sz','hk'].includes(orgCity(o.id)):orgCity(o.id)===currentCity))p.addTo(map);else p.remove();}
  };
  const fly=id=>{
   currentCity=id||null;
   const nextTiles=id?detailTiles:overviewTiles;
   if(nextTiles!==activeTiles){map.removeLayer(activeTiles);nextTiles.addTo(map);activeTiles=nextTiles;}
   const pts=orgs.filter(o=>id==='bay'?['sz','hk'].includes(orgCity(o.id)):orgCity(o.id)===id).map(o=>o.ll);
   highlightPins('');
   if(id&&pts.length)map.fitBounds(L.latLngBounds(pts).pad(.22),{animate:false,maxZoom:id==='bay'?10:13});
   else overview();
   syncPins();updatePanel();
  };
  for(const b of main.querySelectorAll('.city-index button[data-city]'))b.addEventListener('click',()=>fly(b.dataset.city),options);
  syncPins();
  setTimeout(()=>{const c=main.querySelector('.background-board')?.dataset.city;if(c&&c!==currentCity)fly(c);},0);
  options.signal.addEventListener('abort',()=>map.remove(),{once:true});
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
