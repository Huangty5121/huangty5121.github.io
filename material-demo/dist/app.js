(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const root = document.documentElement;
  const storageKey = 'ty-material-demo-v1';
  const presets = {
    clean: {lettering:'print', grain:0, ink:0, relief:0, frost:0},
    soft: {lettering:'hand', grain:18, ink:20, relief:35, frost:3},
    tactile: {lettering:'hand', grain:32, ink:58, relief:65, frost:6}
  };
  const defaults = {...presets.soft, material:'paper', lang:'zh', theme:'light', size:100, sample:{zh:'',en:''}};
  const ranges = {grain:[0,40], ink:[0,80], relief:[0,100], frost:[0,12]};
  function sanitize(input) {
    const result = {...defaults, sample:{zh:'',en:''}};
    if (!input || typeof input !== 'object') return result;
    for (const [key, options] of Object.entries({lettering:['hand','print'],material:['paper','vellum','metal'],lang:['zh','en'],theme:['light','dark'],size:[100,115,130]})) {
      if (options.includes(input[key])) result[key] = input[key];
    }
    for (const [key,[low,high]] of Object.entries(ranges)) {
      if (typeof input[key] === 'number' && Number.isFinite(input[key])) result[key] = Math.round(Math.min(high,Math.max(low,input[key])));
    }
    for (const lang of ['zh','en']) if (typeof input.sample?.[lang] === 'string') result.sample[lang] = input.sample[lang].slice(0,90);
    return result;
  }
  let state = sanitize(defaults);
  try { state = sanitize(JSON.parse(localStorage.getItem(storageKey))); } catch { /* Storage is optional. */ }
  let comparing = false, activeEntry = null, readerOrigin = null, drawFrame = 0;
  const copy = {
    zh:{skip:'跳到内容',intro:'一些作品、笔记与照片。',about:'关于此演示',demo:'交互样稿 · 示例内容',demoShort:'示例内容',adjust:'调整材质',fold:'折面的练习',foldMeta:'物件 / 材料观察',note:'关于折面的笔记',relatedFold:'关联：折面的练习',related:'相关笔记',photo:'表面的颜色',photoMeta:'照片 / 独立记录',photoInscription:'光与表面',writing:'关于制作',writingSummary:'从动手的过程中，记下一点想法。',all:'全部内容',dark:'暗色',light:'明色',clean:'纯净',soft:'轻微',tactile:'明显一点',compare:'关闭效果对照',restore:'恢复效果',imageNote:'图片本身的材质保留',comparison:'效果对照',settings:'材质与文字',close:'关闭',panelIntro:'轻轻加一层。随时可以恢复原样。',lettering:'标题与注释',print:'印刷字',hand:'轻手写',substrate:'笔记底材',paper:'纸张',vellum:'半透明描图纸',metal:'磨砂金属 · 实验',grain:'表面颗粒',ink:'笔画粗糙',relief:'物件阴影',frost:'描图纸雾度',frostHint:'雾度只作用于描图纸后方，不模糊文字。',tryText:'试写一句',reset:'恢复轻微效果',saved:'参数仅保存在本机。正文与按钮不受墨迹滤镜影响。',sample:'留意光落下的位置。',foldAlt:'折弯的薄铝片，银色表面在侧光下形成柔和明暗',sketchAlt:'同一个折面形态的铅笔观察草图',photoAlt:'红色与深灰色氧化金属的表面细节',fontOK:'中文：霞鹜文楷 · 英文：Caveat。字体已本地加载。',fontWait:'正在加载本地手写字体…',fontFallback:'手写字体未能加载，当前使用系统回退字体。',sizeLabel:'切换字号，当前 ',percent:'%',sampleDisclaimer:'本页是排版与材质演示。图片及内容为示例，不代表真实个人项目或实验结果。',foldBody:'一张薄片折起后，光在不同的表面停留。这里把照片和观察草图放在一起，试着保留制作时留下的记录。',noteBody:'同一个形态，用照片与草图做两种记录。这里的关联只表示草图对应这件物件，不表示尺寸、受力或测量结果。',photoBody:'这张照片独立存在。它不需要和折面练习发生关系，也可以自然出现在同一张个人主页上。',writingBody:'有些内容只需要文字。这个入口保留阅读空间，不强行给每篇短文配一张装饰图片。',aboutBody:'这是一个可随时推翻的材质试验。调整标题字形、笔画、颗粒与底材，观察它们放在同一页面时是否合适。没有修改之前的设计图纸，也没有接入个人信息或发布网站。',bodyNote:'正文保持普通文字，可以选取、复制与放大。',readRelated:'打开相关笔记',readFold:'返回折面练习',back:'返回内容'},
    en:{skip:'Skip to content',intro:'Projects, notes and photographs.',about:'About this demo',demo:'Interactive study · sample content',demoShort:'Sample content',adjust:'Materials',fold:'Fold studies',foldMeta:'Objects / material observations',note:'Notes on the folds',relatedFold:'Related to Fold studies',related:'Related note',photo:'Surface colours',photoMeta:'Photographs / independent record',photoInscription:'Light & surface',writing:'On making',writingSummary:'A few thoughts from the process of making.',all:'All content',dark:'Dark',light:'Light',clean:'Clean',soft:'Subtle',tactile:'More texture',compare:'Effects off',restore:'Restore effects',imageNote:'Texture within images stays',comparison:'Compare effects',settings:'Material & lettering',close:'Close',panelIntro:'A light touch. Always reversible.',lettering:'Titles & annotations',print:'Printed',hand:'Handwritten',substrate:'Note surface',paper:'Paper',vellum:'Tracing paper',metal:'Brushed metal · study',grain:'Surface grain',ink:'Ink irregularity',relief:'Object shadows',frost:'Tracing-paper haze',frostHint:'Haze softens only what is behind the tracing paper, not the text.',tryText:'Try a line',reset:'Reset to subtle',saved:'Settings stay on this device. Reading text and controls stay unfiltered.',sample:'Notice where the light falls.',foldAlt:'Folded thin brushed aluminium with soft light across its silver surface',sketchAlt:'An observational pencil sketch of the same folded form',photoAlt:'Red and dark oxidised metal surface details',fontOK:'Chinese: WenKai · English: Caveat. Fonts loaded locally.',fontWait:'Loading local handwriting fonts…',fontFallback:'Handwriting font unavailable; using a system fallback.',sizeLabel:'Change text size, currently ',percent:'%',sampleDisclaimer:'A layout and material demo. Images and text are examples, not actual personal projects or experimental results.',foldBody:'A sheet changes character as it bends. Light rests differently on each surface. Photographs and sketches are placed together to keep a record of the making process.',noteBody:'Two records of the same form: a photograph and a sketch. Their connection describes correspondence, not dimensions, forces or measurements.',photoBody:'An independent photograph. It can sit on the same personal homepage without an invented connection to the folded object.',writingBody:'Some entries need only words. This one leaves space for reading, without adding a decorative image to every short text.',aboutBody:'A reversible material study. Adjust lettering, ink, grain and surfaces to see how they sit together. The previous design drawings are unchanged; this demo has no personal-data integration and is not published.',bodyNote:'Body text stays selectable, copyable and resizable.',readRelated:'Read the related note',readFold:'Back to Fold studies',back:'Back to content'}
  };
  const t = key => copy[state.lang][key] ?? key;
  function save() { try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch { /* Private mode still works. */ } }
  let fontsReady = null;
  function render() {
    root.lang = state.lang === 'zh' ? 'zh-CN' : 'en';
    root.dataset.theme = state.theme;
    root.dataset.lettering = state.lettering;
    root.dataset.material = state.material;
    root.dataset.compare = String(comparing);
    root.style.fontSize = `${state.size}%`;
    root.style.setProperty('--grain', state.grain / 100);
    root.style.setProperty('--object-grain', state.grain / 145);
    root.style.setProperty('--shadow-opacity', state.relief / 220);
    root.style.setProperty('--shadow-y', `${state.relief / 7}px`);
    root.style.setProperty('--shadow-blur', `${state.relief / 4}px`);
    root.style.setProperty('--frost', `${state.frost}px`);
    root.classList.toggle('no-ink', state.ink === 0);
    $('ink-displacement').setAttribute('scale', (state.ink / 30).toFixed(2));
    $('ink-opacity').setAttribute('slope', (state.ink / 100).toFixed(2));
    $('ink-opacity').setAttribute('intercept', (1 - state.ink / 100).toFixed(2));
    for (const el of document.querySelectorAll('[data-i18n]')) el.textContent = t(el.dataset.i18n);
    for (const el of document.querySelectorAll('[data-alt]')) el.alt = t(el.dataset.alt);
    for (const el of document.querySelectorAll('[data-aria]')) el.setAttribute('aria-label', t(el.dataset.aria));
    $('theme-toggle').textContent = t(state.theme === 'dark' ? 'light' : 'dark');
    $('theme-toggle').setAttribute('aria-pressed', String(state.theme === 'dark'));
    $('language-toggle').textContent = state.lang === 'zh' ? 'English' : '中文';
    $('language-toggle').lang = state.lang === 'zh' ? 'en' : 'zh-CN';
    $('size-toggle').textContent = state.size === 100 ? 'A / A+' : `${state.size}%`;
    $('size-toggle').setAttribute('aria-label', t('sizeLabel') + state.size + '%');
    $('compare').textContent = t(comparing ? 'restore' : 'compare');
    $('compare').setAttribute('aria-pressed', String(comparing));
    $('lettering').value = state.lettering;
    $('material').value = state.material;
    for (const key of Object.keys(ranges)) { $(key).value = state[key]; $(`${key}-value`).value = state[key]; }
    $('frost').disabled = state.material !== 'vellum';
    $('custom-inscription').textContent = state.sample[state.lang] || t('sample');
    if (document.activeElement !== $('sample-text')) $('sample-text').value = state.sample[state.lang];
    $('sample-text').placeholder = t('sample');
    $('font-status').textContent = t(fontsReady === null ? 'fontWait' : fontsReady ? 'fontOK' : 'fontFallback');
    for (const el of document.querySelectorAll('[data-preset]')) el.setAttribute('aria-pressed', String(!comparing && Object.entries(presets[el.dataset.preset]).every(([key,value]) => state[key] === value)));
    document.querySelector('meta[name="theme-color"]').content = state.theme === 'dark' ? '#272b29' : '#eeeee7';
    if (activeEntry) renderReader(activeEntry);
    scheduleRelation();
  }
  function update(patch) { state = sanitize({...state,...patch}); comparing = false; render(); save(); }
  function scheduleRelation() {
    cancelAnimationFrame(drawFrame);
    drawFrame = requestAnimationFrame(() => {
      const table = $('worktable').getBoundingClientRect();
      const main = $('main-image').getBoundingClientRect();
      const note = $('note-image').getBoundingClientRect();
      if (innerWidth <= 1000) return;
      const x1 = main.right - table.left + 8, x2 = note.left - table.left - 8;
      const y1 = main.top - table.top + main.height * .54, y2 = note.top - table.top + 28;
      const mid = (x1+x2)/2, r = Math.min(8,(x2-x1)/5);
      $('relation-path').setAttribute('d', `M ${x1} ${y1} L ${mid-r} ${y1} Q ${mid} ${y1} ${mid} ${y1-r} L ${mid} ${y2+r} Q ${mid} ${y2} ${mid+r} ${y2} L ${x2} ${y2}`);
      $('relation-label').style.left = `${mid}px`;
      $('relation-label').style.top = `${(y1+y2)/2}px`;
    });
  }
  function toggleSettings(open) {
    $('settings').hidden = !open;
    $('settings-toggle').setAttribute('aria-expanded',String(open));
    if (open) $('settings-close').focus(); else $('settings-toggle').focus();
  }
  function element(tag, text, className) {
    const el = document.createElement(tag);
    if (text) el.textContent = text;
    if (className) el.className = className;
    return el;
  }
  function renderReader(key) {
    const content = $('reader-content');
    content.replaceChildren();
    const title = element('h2', t(key === 'index' ? 'all' : key));
    title.id = 'reader-title'; title.tabIndex = -1; content.append(title);
    if (key === 'index') {
      const list = element('ul',null,'index-list');
      for (const entry of ['fold','note','photo','writing']) {
        const li=element('li'), button=element('button',t(entry));
        button.dataset.open=entry; li.append(button); list.append(li);
      }
      content.append(list);
    } else {
      const assets = {fold:['fold.jpg','foldAlt'],note:['sketch.jpg','sketchAlt'],photo:['metal.jpg','photoAlt']};
      if (assets[key]) {const img=element('img');img.src=`assets/${assets[key][0]}`;img.alt=t(assets[key][1]);content.append(img);}
      content.append(element('p',t(`${key}Body`)));
      if (key === 'fold' || key === 'note') {
        const link = element('button',t(key === 'fold' ? 'readRelated' : 'readFold'),'quiet');
        link.dataset.open = key === 'fold' ? 'note' : 'fold';content.append(link);
      }
      content.append(element('p',t('bodyNote'),'reader-note'));
    }
    content.append(element('p',t('sampleDisclaimer'),'reader-note'));
  }
  document.addEventListener('click',event => {
    const opener = event.target.closest('[data-open]');
    if (!opener) return;
    const key=opener.dataset.open;
    if (!['fold','note','photo','writing','about','index'].includes(key)) return;
    if (!$('reader').open) readerOrigin=opener;
    activeEntry=key;renderReader(key);
    if (!$('reader').open) $('reader').showModal();
    $('reader-title').focus();
  });
  $('reader-close').addEventListener('click',()=>$('reader').close());
  $('reader').addEventListener('close',()=>{activeEntry=null;readerOrigin?.focus();});
  $('settings-toggle').addEventListener('click',()=>toggleSettings($('settings').hidden));
  $('settings-close').addEventListener('click',()=>toggleSettings(false));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!$('settings').hidden&&!$('reader').open){toggleSettings(false);event.preventDefault();}});
  $('theme-toggle').addEventListener('click',()=>update({theme:state.theme==='light'?'dark':'light'}));
  $('language-toggle').addEventListener('click',()=>update({lang:state.lang==='zh'?'en':'zh'}));
  $('size-toggle').addEventListener('click',()=>update({size:state.size===100?115:state.size===115?130:100}));
  for (const id of ['lettering','material']) $(id).addEventListener('change',event=>update({[id]:event.target.value}));
  for (const id of Object.keys(ranges)) $(id).addEventListener('input',event=>update({[id]:Number(event.target.value)}));
  $('sample-text').addEventListener('input',event=>update({sample:{...state.sample,[state.lang]:event.target.value}}));
  for (const button of document.querySelectorAll('[data-preset]')) button.addEventListener('click',()=>update(presets[button.dataset.preset]));
  $('compare').addEventListener('click',()=>{comparing=!comparing;render();});
  $('reset').addEventListener('click',()=>update({...presets.soft,material:'paper',sample:{zh:'',en:''}}));
  if ('ResizeObserver' in window) new ResizeObserver(scheduleRelation).observe($('worktable'));
  window.addEventListener('resize',scheduleRelation);
  for (const img of document.images) img.addEventListener('load',scheduleRelation);
  render();
  Promise.all([document.fonts.load('400 20px WenKaiPreview','折面笔记'),document.fonts.load('500 24px Caveat','Fold studies')]).then(result=>{fontsReady=result.every(fonts=>fonts.length>0);render();}).catch(()=>{fontsReady=false;render();});
  // Optional proposed browser API; normal controls work without it.
  if (document.modelContext?.registerTool) {
    const context = document.modelContext;
    const lifecycle = new AbortController();
    window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
    try { Promise.resolve(context.registerTool({name:'set_material_preset',description:'Select the same local visual-effect preset as the visible comparison controls.',inputSchema:{type:'object',properties:{preset:{type:'string',enum:['clean','soft','tactile']}},required:['preset'],additionalProperties:false},annotations:{readOnlyHint:false},execute(input){if(!input||!Object.hasOwn(presets,input.preset)||Object.keys(input).some(k=>k!=='preset'))throw new Error('Unknown preset');update(presets[input.preset]);return {preset:input.preset,settings:{...state},comparing};}},{signal:lifecycle.signal})).catch(()=>{}); } catch { /* Experimental API unavailable; UI remains fully usable. */ }
  }
})();
