import {entries,compositions,linksFor,visibleCompositions} from './collection-data.mjs';
const $=id=>document.getElementById(id), root=document.documentElement;
const byId=new Map(entries.map(entry=>[entry.id,entry]));
const KEY='ty-collection-demo-v2';
const defaultState={count:8,width:1440,auto:true,crease:25,gloss:30,hand:true,theme:'light',lang:'zh',size:100,effects:true};
export function cleanState(value){
  const s={...defaultState};if(!value||typeof value!=='object')return s;
  for(const [key,allowed] of Object.entries({count:[4,8,12],theme:['light','dark'],lang:['zh','en'],size:[100,115,130]}))if(allowed.includes(value[key]))s[key]=value[key];
  for(const [key,min,max] of [['width',320,1440],['crease',0,100],['gloss',0,100]])if(typeof value[key]==='number'&&Number.isFinite(value[key]))s[key]=Math.max(min,Math.min(max,Math.round(value[key])));
  for(const key of ['auto','hand','effects'])if(typeof value[key]==='boolean')s[key]=value[key];
  return s;
}
let state={...defaultState};try{state=cleanState(JSON.parse(localStorage.getItem(KEY)));}catch{}
const strings={
  zh:{skip:'跳到内容',lab:'演示控制',old:'上一版材质试验',count:'内容量',width:'页面宽度',auto:'随窗口',material:'折痕与光泽',crease:'折痕',gloss:'照片光泽',hand:'轻手写',effectsOff:'关闭表面效果',effectsOn:'恢复表面效果',staticGrain:'图像原有纹理保留',intro:'一些作品、笔记与照片。',index:'全部内容',dark:'暗色',light:'明色',sample:'多内容样稿 · 全部为示例',sampleShort:'示例内容',footer:'物件可以不同，阅读路径仍然清楚。',top:'回到开头',previous:'上一条',close:'关闭',relation:'条关联',independent:'独立内容',here:'在页面中定位',wide:'自由展开',medium:'两列重排',narrow:'纵向阅读',group:'构图',photoCount:'张照片',prevPhoto:'上一张',nextPhoto:'下一张',linked:'相关内容',disclaimer:'内容与图片仅作演示，不代表真实个人经历或实验数据。',search:'搜索标题或内容',allTypes:'所有类型',project:'项目',note:'笔记',writing:'文字',photo:'照片',album:'图集',results:'条结果',none:'没有符合的内容。',resetSearch:'清除搜索',missing:'这条内容不存在',missingBody:'可以关闭回到主页，或进入全部内容。',sizeLabel:'切换字号，当前',folded:'一页短记',plate:'材料笔记',tracing:'局部记录',indexcard:'随手记',backToIndex:'返回索引',shown:'首页当前展示',total:'总共',newCount:'条'},
  en:{skip:'Skip to content',lab:'Demo controls',old:'Previous material study',count:'Entries',width:'Page width',auto:'Auto width',material:'Creases & finish',crease:'Crease',gloss:'Photo sheen',hand:'Handwritten',effectsOff:'Surface effects off',effectsOn:'Restore surface effects',staticGrain:'Texture within images stays',intro:'Projects, notes and photographs.',index:'All content',dark:'Dark',light:'Light',sample:'Content study · all entries are examples',sampleShort:'Sample content',footer:'Different objects, a clear reading path.',top:'Back to top',previous:'Previous entry',close:'Close',relation:'connections',independent:'Independent entry',here:'Locate on the page',wide:'Open composition',medium:'Two-column reflow',narrow:'Vertical reading',group:'Composition',photoCount:'photographs',prevPhoto:'Previous photo',nextPhoto:'Next photo',linked:'Related entries',disclaimer:'Images and text are examples, not actual personal history or experimental data.',search:'Search titles or text',allTypes:'All types',project:'Projects',note:'Notes',writing:'Writing',photo:'Photographs',album:'Collections',results:'results',none:'No matching entries.',resetSearch:'Clear search',missing:'Entry not found',missingBody:'Close to return to the page, or browse all content.',sizeLabel:'Change text size, currently',folded:'A folded note',plate:'Material note',tracing:'Detail record',indexcard:'A short note',backToIndex:'Back to index',shown:'Homepage showing',total:'Total',newCount:'entries'}
};
const t=key=>strings[state.lang][key]??key;
const local=value=>value?.[state.lang]??'';
const el=(tag,text,cls)=>{const node=document.createElement(tag);if(text!==undefined&&text!==null)node.textContent=text;if(cls)node.className=cls;return node;};
let selected=null,origin=null,previousRoute='',pendingJump=null,drawFrame=0;
let activeGallery=0,indexQuery='',indexType='all';
const spreadNodes=new Map();
function persist(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch{}}
function change(patch,{rebuild=false}={}){state=cleanState({...state,...patch});applyState();if(rebuild)renderAll();persist();}
function image(name,alt,eager=false){const img=el('img');img.src=`assets/${name}`;img.alt=alt;img.decoding='async';img.loading=eager?'eager':'lazy';img.width=1200;img.height=960;return img;}
function entryLink(id,text,cls){const a=el('a',text,cls);a.href=`#entry/${encodeURIComponent(id)}`;a.dataset.entry=id;return a;}
function buildObject(entry,slot){
  const card=el('article',null,`object shape-${entry.shape}`);card.id=`object-${entry.id}`;card.dataset.id=entry.id;card.dataset.slot=slot;
  const open=entryLink(entry.id,null,'open-object');open.setAttribute('aria-labelledby',`title-${entry.id}`);
  if(entry.shape!=='text'){
    const surface=el('span',null,'surface');
    if(entry.media?.length){
      const picture=el('span',null,'picture');picture.append(image(entry.media[0],local(entry.alt),entry.id==='fold'||entry.id==='fold-notes'));surface.append(picture);
    }else{
      const kicker=entry.shape==='letter'?'folded':entry.shape==='plate'?'plate':'indexcard';surface.append(el('span',t(kicker),'object-kicker'));
    }
    const inscription=entry.inscription||entry.excerpt;
    if(inscription)surface.append(el('span',local(inscription),'inscription written'));
    if(entry.shape==='stack')surface.append(el('span',`${entry.media.length} ${t('photoCount')}`,'inscription written'));
    open.append(surface);card.append(open);
  }
  const title=el('h2',null,'written');title.id=`title-${entry.id}`;title.append(entryLink(entry.id,local(entry.title)));card.append(title);
  if(entry.shape==='text')card.append(el('p',local(entry.excerpt),'text-preview'));
  card.append(el('p',local(entry.meta),'metadata'));
  const relations=linksFor(entry.id);
  if(relations.length){
    const trigger=el('button',`${relations.length} ${t('relation')}`,'relation-trigger');trigger.dataset.relations=entry.id;trigger.setAttribute('aria-expanded','false');trigger.setAttribute('aria-controls',`links-${entry.id}`);card.append(trigger);
    const list=el('ul',null,'relation-list');list.id=`links-${entry.id}`;list.hidden=true;
    for(const link of relations){const item=el('li');item.append(el('small',local(link.label)));const destination=byId.get(link.id);const a=entryLink(link.id,local(destination.title));item.append(a);const locate=el('button',t('here'));locate.dataset.jump=link.id;item.append(locate);list.append(item);}
    card.append(list);
  }
  return card;
}
function buildSpread(spec){
  const section=el('section',null,'spread');section.dataset.layout=spec.layout;section.dataset.composition=spec.id;section.setAttribute('aria-label',`${t('group')} ${compositions.indexOf(spec)+1}`);
  for(const [i,id]of spec.entries.entries())section.append(buildObject(byId.get(id),i+1));
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.classList.add('line-layer');svg.setAttribute('aria-hidden','true');section.append(svg);return section;
}
function renderAll(){
  spreadNodes.clear();$('collection').replaceChildren();
  for(const spec of compositions){const node=buildSpread(spec);spreadNodes.set(spec.id,node);$('collection').append(node);}
  updateCount();updateRelationships();
}
function updateCount(){const visible=new Set(visibleCompositions(state.count).map(s=>s.id));for(const[id,node]of spreadNodes)node.hidden=!visible.has(id);if(selected&&!isVisible(selected))selected=null;updateRelationships();}
function isVisible(id){return visibleCompositions(state.count).some(spec=>spec.entries.includes(id));}
function updateRelationships(){
  const neighbors=new Set(selected?linksFor(selected).map(link=>link.id):[]);
  for(const card of document.querySelectorAll('.object')){
    const active=card.dataset.id===selected;card.classList.toggle('is-selected',active);card.classList.toggle('is-related',neighbors.has(card.dataset.id));
    const trigger=card.querySelector('[data-relations]');if(trigger)trigger.setAttribute('aria-expanded',String(active));const list=card.querySelector('.relation-list');if(list)list.hidden=!active;
  }
  scheduleLines();
}
function scheduleLines(){cancelAnimationFrame(drawFrame);drawFrame=requestAnimationFrame(drawLines);}
function intersects(a,b,pad=8){return a.left<b.right+pad&&a.right>b.left-pad&&a.top<b.bottom+pad&&a.bottom>b.top-pad;}
function drawLines(){
  for(const spread of spreadNodes.values()){
    const svg=spread.querySelector('.line-layer');svg.replaceChildren();if(spread.hidden||!selected||getComputedStyle(spread).getPropertyValue('--wide').trim()!=='1')continue;
    const source=spread.querySelector(`[data-id="${selected}"]`);if(!source)continue;
    const bounds=spread.getBoundingClientRect();const src=(source.querySelector('.surface')||source.querySelector('h2')).getBoundingClientRect();
    for(const link of linksFor(selected)){
      const target=spread.querySelector(`[data-id="${link.id}"]`);if(!target)continue;
      const dest=(target.querySelector('.surface')||target.querySelector('h2')).getBoundingClientRect();
      // Same-row, same-composition connections only. Long/blocked relations remain text links.
      const toRight=dest.left>=src.right+20,toLeft=dest.right<=src.left-20;if(!toRight&&!toLeft)continue;
      const sx=toRight?src.right:src.left,tx=toRight?dest.left:dest.right;
      const sy=src.top+Math.min(src.height*.22,60),ty=dest.top+Math.min(dest.height*.22,60);
      const corridor={left:Math.min(sx,tx),right:Math.max(sx,tx),top:Math.min(sy,ty),bottom:Math.max(sy,ty)};
      const obstructed=[...spread.querySelectorAll('.object')].filter(n=>n!==source&&n!==target).some(n=>intersects(corridor,n.getBoundingClientRect()));
      if(obstructed)continue;
      const mid=(sx+tx)/2;const p=document.createElementNS('http://www.w3.org/2000/svg','path');p.setAttribute('d',`M ${sx-bounds.left} ${sy-bounds.top} C ${mid-bounds.left} ${sy-bounds.top}, ${mid-bounds.left} ${ty-bounds.top}, ${tx-bounds.left} ${ty-bounds.top}`);svg.append(p);
    }
  }
}
function measure(){const w=Math.round($('preview').getBoundingClientRect().width);$('width-value').value=`${w}px`;const rem=parseFloat(getComputedStyle(root).fontSize);$('layout-status').textContent=`${w}px · ${t(w>64*rem?'wide':w>38*rem?'medium':'narrow')}`;scheduleLines();}
function applyState(){
  root.lang=state.lang==='zh'?'zh-CN':'en';root.dataset.theme=state.theme;root.dataset.lettering=state.hand?'hand':'print';root.dataset.effects=state.effects?'on':'off';root.style.fontSize=`${state.size}%`;root.style.setProperty('--crease',state.crease/100);root.style.setProperty('--gloss',state.gloss/100);
  $('preview').style.setProperty('--preview-width',state.auto?'100%':`${state.width}px`);
  for(const node of document.querySelectorAll('[data-text]'))node.textContent=t(node.dataset.text);
  for(const node of document.querySelectorAll('[data-aria]'))node.setAttribute('aria-label',t(node.dataset.aria));
  for(const button of document.querySelectorAll('[data-count]'))button.setAttribute('aria-pressed',String(Number(button.dataset.count)===state.count));
  $('width').value=state.width;$('auto-width').setAttribute('aria-pressed',String(state.auto));
  for(const k of ['crease','gloss']){$(k).value=state[k];$(`${k}-value`).value=state[k];}
  $('hand').checked=state.hand;$('effects-toggle').textContent=t(state.effects?'effectsOff':'effectsOn');$('effects-toggle').setAttribute('aria-pressed',String(!state.effects));
  $('theme').textContent=t(state.theme==='light'?'dark':'light');$('lang').textContent=state.lang==='zh'?'English':'中文';$('lang').lang=state.lang==='zh'?'en':'zh-CN';$('size').textContent=state.size===100?'A / A+':`${state.size}%`;$('size').setAttribute('aria-label',`${t('sizeLabel')} ${state.size}%`);
  updateCount();measure();
}
function parseRoute(){const hash=location.hash.slice(1);if(!hash)return null;if(hash==='index')return {kind:'index'};if(hash.startsWith('entry/')){try{return {kind:'entry',id:decodeURIComponent(hash.slice(6))};}catch{return {kind:'missing'};}}return {kind:'missing'};}
function navigate(route,trigger){
  if(!parseRoute())origin=trigger||document.activeElement;
  const depth=Number(history.state?.collectionDepth)||0;
  history.pushState({collectionDepth:depth+1},'',`#${route}`);syncRoute();
}
function closeReader(){const depth=Number(history.state?.collectionDepth)||0;if(depth>0)history.go(-depth);else{history.replaceState({},'',location.pathname+location.search);syncRoute();}}
function syncRoute(){
  const route=parseRoute();
  if(!route){if($('reader').open)$('reader').close();previousRoute='';origin?.isConnected&&origin.focus({preventScroll:true});if(pendingJump){const id=pendingJump;pendingJump=null;locate(id);}return;}
  const key=route.kind==='entry'?route.id:route.kind;if(previousRoute!==key){activeGallery=0;previousRoute=key;}
  if(route.kind==='index')renderIndex();else if(route.kind==='entry'&&byId.has(route.id))renderEntry(byId.get(route.id));else renderMissing();
  $('reader-back').hidden=(Number(history.state?.collectionDepth)||0)<2;
  if(!$('reader').open)$('reader').showModal();$('reader-title').focus({preventScroll:true});$('reader').scrollTop=0;
}
function readerTitle(text){const title=el('h2',text);title.id='reader-title';title.tabIndex=-1;return title;}
function renderEntry(entry){
  const body=$('reader-body');body.replaceChildren(readerTitle(local(entry.title)),el('p',local(entry.meta),'small muted'));
  if(entry.media?.length){
    const figure=el('figure');figure.append(image(entry.media[activeGallery],local(entry.alt),true));figure.append(el('figcaption',`${activeGallery+1} / ${entry.media.length}`));body.append(figure);
    if(entry.media.length>1){const nav=el('nav',null,'gallery-nav');for(const dir of [-1,1]){const button=el('button',t(dir<0?'prevPhoto':'nextPhoto'));button.disabled=activeGallery+dir<0||activeGallery+dir>=entry.media.length;button.dataset.photoStep=dir;nav.append(button);}body.append(nav);}
  }
  body.append(el('p',local(entry.body)));
  const links=linksFor(entry.id);body.append(el('h3',t(links.length?'linked':'independent')));
  const list=el('ul',null,'reader-links');for(const link of links){const item=el('li');item.append(el('small',local(link.label)));item.append(entryLink(link.id,local(byId.get(link.id).title)));const jump=el('button',t('here'));jump.dataset.jump=link.id;item.append(jump);list.append(item);}body.append(list,el('p',t('disclaimer'),'small muted'));
}
function renderIndex(){
  const body=$('reader-body');body.replaceChildren(readerTitle(t('index')),el('p',`${t('total')} ${entries.length} ${t('newCount')} · ${t('shown')} ${state.count} ${t('newCount')}`,'small muted'));
  const controls=el('div',null,'index-tools'),search=el('input');search.type='search';search.placeholder=t('search');search.setAttribute('aria-label',t('search'));search.value=indexQuery;
  const select=el('select');select.setAttribute('aria-label',t('allTypes'));for(const type of ['all','project','note','writing','photo','album']){const option=el('option',t(type==='all'?'allTypes':type));option.value=type;select.append(option);}select.value=indexType;
  controls.append(search,select);const result=el('p',null,'index-result'),list=el('ul',null,'reader-links');body.append(controls,result,list);
  const filter=()=>{const q=indexQuery.trim().toLocaleLowerCase();const filtered=entries.filter(e=>(indexType==='all'||e.type===indexType)&&[e.title.zh,e.title.en,e.body.zh,e.body.en].some(text=>text.toLocaleLowerCase().includes(q)));result.textContent=`${filtered.length} ${t('results')}`;list.replaceChildren();for(const e of filtered){const li=el('li'),a=entryLink(e.id,local(e.title));li.append(a,el('small',local(e.meta)));list.append(li);}if(!filtered.length){const li=el('li',t('none')),clear=el('button',t('resetSearch'));clear.addEventListener('click',()=>{indexQuery='';indexType='all';search.value='';select.value='all';filter();search.focus();});li.append(clear);list.append(li);}};
  search.addEventListener('input',()=>{indexQuery=search.value;filter();});select.addEventListener('change',()=>{indexType=select.value;filter();});filter();
}
function renderMissing(){$('reader-body').replaceChildren(readerTitle(t('missing')),el('p',t('missingBody')));}
function locate(id){
  const pos=compositions.findIndex(s=>s.entries.includes(id));if(pos<0)return;
  if(state.count<(pos+1)*4)change({count:(pos+1)*4});
  selected=id;updateRelationships();requestAnimationFrame(()=>{const target=$(`object-${id}`);target.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});target.querySelector('a').focus({preventScroll:true});});
}
document.addEventListener('click',event=>{
  const link=event.target.closest('[data-entry]');if(link&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey&&event.button===0){event.preventDefault();navigate(`entry/${encodeURIComponent(link.dataset.entry)}`,link);return;}
  const related=event.target.closest('[data-relations]');if(related){selected=selected===related.dataset.relations?null:related.dataset.relations;updateRelationships();return;}
  const jump=event.target.closest('[data-jump]');if(jump){if($('reader').open){pendingJump=jump.dataset.jump;closeReader();}else locate(jump.dataset.jump);return;}
  const count=event.target.closest('[data-count]');if(count){change({count:Number(count.dataset.count)});return;}
  const step=event.target.closest('[data-photo-step]');if(step){const route=parseRoute(),entry=byId.get(route?.id);if(!entry)return;activeGallery=Math.max(0,Math.min(entry.media.length-1,activeGallery+Number(step.dataset.photoStep)));renderEntry(entry);const buttons=[...$('reader-body').querySelectorAll('[data-photo-step]')];(buttons.find(b=>b.dataset.photoStep===step.dataset.photoStep&&!b.disabled)||buttons.find(b=>!b.disabled))?.focus({preventScroll:true});}
});
$('lab-toggle').addEventListener('click',()=>{const open=$('material-options').hidden;$('material-options').hidden=!open;$('lab-toggle').setAttribute('aria-expanded',String(open));});
$('width').addEventListener('input',e=>change({width:Number(e.target.value),auto:false}));$('auto-width').addEventListener('click',()=>change({auto:true}));
for(const key of ['crease','gloss'])$(key).addEventListener('input',e=>change({[key]:Number(e.target.value),effects:true}));
$('hand').addEventListener('change',e=>change({hand:e.target.checked}));$('effects-toggle').addEventListener('click',()=>change({effects:!state.effects}));
$('theme').addEventListener('click',()=>change({theme:state.theme==='light'?'dark':'light'}));$('lang').addEventListener('click',()=>change({lang:state.lang==='zh'?'en':'zh'},{rebuild:true}));$('size').addEventListener('click',()=>change({size:state.size===100?115:state.size===115?130:100}));
for(const key of ['index-open','bottom-index'])$(key).addEventListener('click',e=>navigate('index',e.currentTarget));
$('top').addEventListener('click',()=>{window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});
$('reader-close').addEventListener('click',closeReader);$('reader-back').addEventListener('click',()=>history.back());$('reader').addEventListener('cancel',event=>{event.preventDefault();closeReader();});
window.addEventListener('popstate',syncRoute);window.addEventListener('hashchange',syncRoute);window.addEventListener('resize',measure);
applyState();renderAll();syncRoute();
if('ResizeObserver'in window){const observer=new ResizeObserver(measure);observer.observe($('preview'));observer.observe($('collection'));}
document.fonts.ready.then(measure);
document.addEventListener('load',event=>{if(event.target.tagName==='IMG')scheduleLines();},true);
