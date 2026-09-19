import {entries as studies, linksFor} from './collection-data.mjs';

const L = (zh, en) => ({zh, en});

// Replace this draft with approved personal information. Empty contact = no link.
export const profile = {
  name: 'TY H.', draft: true,
  introduction: L('我关心材料、物件，以及想法在动手之后发生的变化。这里留一些制作、观察和日常记录。', 'I am interested in materials, objects, and how ideas change through making. This is a place for studies, observations, and everyday notes.'),
  about: L([
    '材料是一个起点。我想知道一张薄片如何弯折，光怎样经过表面，以及一个想法在真正做出来之后，会变成什么样。',
    '这里也留给研究之外的东西：一张照片、一段没写完的文字，或者一个值得再看一次的细节。它们不一定属于同一个项目。'
  ], [
    'Materials are a starting point. How does a sheet bend? How does light move across a surface? And what happens to an idea when it is made into something real?',
    'There is also room here for things outside a project: a photograph, an unfinished text, or a detail worth looking at again. They do not all need to belong together.'
  ]),
  contact: null
};

// The old material-demo records stay untouched. These are explicitly sample texts.
const texts = {
  fold: L(['一张薄片折起后，侧光把原本连续的表面分成了几种明暗。转动物件，折线没有改变，看到的轮廓却在变化。', '草图只留下形态与转折。关于边缘的观察另写在一条补记里，可以与这次练习一起阅读。'], ['Side light divides a folded sheet into light and dark planes. As the object turns, its folds stay the same, but its apparent outline changes.', 'The sketch keeps only the form and its turns. A separate note looks at the edge; it can be read alongside this study.']),
  'fold-notes': L(['画的时候，先放下表面的反光，只看几条轮廓。照片里明显的明暗交界，未必是物件真正的边界。', '这是一张形态观察草图，不是尺寸图。'], ['While drawing, set the reflections aside and look at the outlines. A clear boundary between light and dark is not always a physical edge.', 'This is an observational sketch, not a dimensioned drawing.']),
  'edge-note': L(['边缘也是表面的一部分。它在光下呈现出一条很窄的亮面，让薄片的厚度突然变得可见。', '下一次观察，可以把注意力从大面积的明暗移向这条边。'], ['The edge is a surface too. In the light, its narrow bright strip makes the thickness of the sheet visible.', 'On the next look, attention can move from the broad planes of light and shadow to this edge.']),
  'surface-colour': L(['红色没有覆盖整个画面。暗灰色的边界、孔洞和转角，让颜色有了不同的深浅。', '比起记录一个完整的物件，这张图更接近留下一个局部。'], ['Red does not cover the whole frame. Charcoal edges, holes, and corners give the colour different depths.', 'Rather than recording a whole object, this image holds onto a fragment.']),
  making: L(['有时候，动手不是为了验证一个已经完整的想法。材料的阻力、工具留下的痕迹，都会让原来的设想偏离一点。', '那一点偏离也值得留下。先做一个小的版本，放一会儿，再看它提出了什么问题。'], ['Making is not always a way to confirm a finished idea. The resistance of a material and the marks of a tool can shift the original intention.', 'That small shift is worth keeping. Make a small version, leave it for a while, then see what questions it raises.']),
  'woven-light': L(['织物的空隙和线本身一样重要。光从缝隙里穿过，重叠的地方则形成了更深的层次。'], ['The gaps in a textile matter as much as the threads. Light passes through them; where the weave overlaps, the image grows darker.']),
  'slow-note': L(['有些想法，需要隔一天再看。刚做完时只留意到的问题，过一阵也许会变成一个新的入口。', '先不急着修正，把它放在看得见的地方。'], ['Some thoughts need another day. What first looks like a problem may later become a place to begin again.', 'Do not rush to correct it. Leave it somewhere visible.']),
  'woven-edge': L(['靠近看同一张照片。边缘处的线一根根分开，原本连续的面变回了细小的结构。'], ['Look closer at the same photograph. At the edge, individual threads separate; a continuous surface becomes a fine structure again.']),
  'surface-album': L(['把几个局部放在一起：金属的颜色、透光的织物、暗处的细网。它们并不是同一种材料，但都在改变光经过的方式。'], ['A few fragments together: coloured metal, translucent fabric, and fine mesh in the dark. They are different materials, each changing how light passes.']),
  'dark-mesh': L(['暗处没有抹掉轮廓，只让它变得更轻。背景退下去之后，交织的线慢慢显出来。'], ['Darkness does not erase the outline; it makes it quieter. As the background recedes, the woven lines emerge.']),
  'kept-note': L(['有些痕迹不需要抹平。它们让一件东西保留了经历过的过程。'], ['Some marks do not need to be smoothed away. They let an object keep a trace of what it has been through.']),
  unfinished: L(['暂时没有结论。把已经注意到的东西记下来，再留一点空白。'], ['No conclusion yet. Write down what has been noticed, and leave a little space.'])
};
export const entries = studies.map(entry => ({...entry, paragraphs:texts[entry.id], sample:true}));
export const entryById = new Map(entries.map(entry => [entry.id, entry]));
export const featured = ['fold', 'fold-notes', 'edge-note', 'surface-colour', 'making'];
// The about-page exits add another perspective instead of repeating home.
export const aboutSelection = ['woven-light', 'slow-note', 'kept-note'];
export function aboutEntries() {
  return aboutSelection.filter(id => entryById.has(id) && !featured.includes(id)).map(id => entryById.get(id));
}
export {linksFor};
export const defaults = Object.freeze({lettering:'hand', material:'vellum', grain:40, ink:68, bleed:0, relief:74, frost:3, lang:'zh', theme:'light', size:100});
export const preferenceKey = 'ty-home-v1';
export const legacyKey = 'ty-material-demo-v1';
export const ranges = {grain:[0,40], ink:[0,160], bleed:[0,100], relief:[0,100], frost:[0,12]};
export function cleanPreferences(input) {
  const result = {...defaults};
  if (!input || typeof input !== 'object') return result;
  for (const [key, choices] of Object.entries({lettering:['hand','print'], material:['paper','vellum','metal'], lang:['zh','en'], theme:['light','dark'], size:[100,115,130]})) {
    if (choices.includes(input[key])) result[key] = input[key];
  }
  for (const [key, [low, high]] of Object.entries(ranges)) {
    if (typeof input[key] === 'number' && Number.isFinite(input[key])) result[key] = Math.round(Math.max(low, Math.min(high, input[key])));
  }
  return result;
}
export function inkTreatment(input) {
  const {ink, bleed} = cleanPreferences(input);
  // Keep the old 0–80 response unchanged; extended roughness must not erase ink.
  const opacity = Math.min(ink / 100, .88);
  return {
    displacement: ink <= 80 ? ink / 30 : 80 / 30 + (ink - 80) / 60,
    slope: opacity, intercept: 1 - opacity,
    spread: bleed / 100 * .42,
    blur: bleed / 100 * .36,
    enabled: ink > 0 || bleed > 0
  };
}
export function parseRoute(hash) {
  const path = hash.replace(/^#\/?/, '');
  if (!path || path === 'home') return {page:'home'};
  if (path === 'about' || path === 'archive') return {page:path};
  if (path.startsWith('entry/') && entryById.has(path.slice(6))) return {page:'entry', id:path.slice(6)};
  return {page:'missing'};
}
export function filterEntries(query, type, lang) {
  const term = query.trim().toLocaleLowerCase();
  return entries.filter(entry => (type === 'all' || entry.type === type) && (!term || [entry.title[lang], entry.meta[lang], ...entry.paragraphs[lang]].join(' ').toLocaleLowerCase().includes(term)));
}
export const labels = {
  zh: {
    home:'首页', archive:'全部内容', about:'关于我', settings:'阅读与材质', skip:'跳到内容',
    introDraft:'自我介绍 · 草稿', aboutLink:'多了解一点 ↗', selection:'放在这里的几件事', selectionNote:'一组练习，两份独立记录。',
    sketchRelation:'同一物件的草图', edgeRelation:'折面练习的补记', browseAll:'还有一些记录', allCount:'查看全部',
    sample:'内容与图片为示例', sampleLong:'本页文字为示例，图片为生成素材；不代表真实个人项目或研究结果。',
    archiveIntro:'作品、笔记、照片和文字，一起收在这里。', search:'搜索标题或文字', filter:'内容类型',
    all:'全部', project:'项目', note:'笔记', photo:'照片', writing:'文字', album:'图集', count:'条内容', empty:'没有找到对应内容。', clear:'清除筛选',
    back:'返回', backArchive:'全部内容', reading:'阅读', related:'接着看', relatedHint:'与这份记录直接相关的内容。',
    previous:'上一张', next:'下一张', imageCount:'照片', aboutDraft:'以下是介绍草稿，尚未填写真实身份、经历和联系方式。',
    interests:'另外一些记录', contact:'联系', draft:'草稿', missing:'这份内容还不在这里。', returnHome:'回到首页',
    close:'完成', language:'语言', appearance:'明暗', light:'明色', dark:'暗色', size:'字号', normal:'标准', larger:'较大', largest:'更大',
    materialDetails:'材质细节', lettering:'标题与注释', hand:'轻手写', print:'印刷字', material:'笔记底材', paper:'纸张', vellum:'半透明描图纸', metal:'磨砂金属',
    grain:'表面颗粒', ink:'笔画粗糙', bleed:'墨迹洇染', relief:'物件阴影', frost:'描图纸雾度',
    inkPreview:'字迹预览', inkSample:'留意光落下的位置。', inkHint:'粗糙改变笔画边缘，洇染让墨迹轻微扩散。只影响标题与手写注释，正文保持清晰。',
    settingsHint:'正文保持清晰。调整只保存在这台设备，不改变原来的演示页。', inherit:'采用原演示的设置', reset:'恢复这版默认值', inherited:'已采用原演示的已保存设置。', noLegacy:'没有找到已保存的旧设置，已采用你截图中的参数。', saved:'已保存',
    prototype:'个人主页样稿', totalSuffix:'条', titleSuffix:'TY H. · 个人主页', aboutSubtitle:'材料，制作，以及它们之间的事情。'
  },
  en: {
    home:'Home', archive:'Index', about:'About', settings:'Reading & materials', skip:'Skip to content',
    introDraft:'Introduction · draft', aboutLink:'A little more about me ↗', selection:'A few things here', selectionNote:'One study, two independent records.',
    sketchRelation:'Sketch of the same object', edgeRelation:'A note on the fold study', browseAll:'A few more things', allCount:'Browse all',
    sample:'Sample text & images', sampleLong:'The text is illustrative and the images are generated. These are not actual personal projects or research results.',
    archiveIntro:'Projects, notes, photographs, and writing, kept together.', search:'Search titles or text', filter:'Content type',
    all:'All', project:'Projects', note:'Notes', photo:'Photographs', writing:'Writing', album:'Collections', count:'entries', empty:'No matching entries.', clear:'Clear filters',
    back:'Back', backArchive:'Index', reading:'Reading', related:'Continue with', relatedHint:'Directly related to this record.',
    previous:'Previous', next:'Next', imageCount:'Photograph', aboutDraft:'An introduction draft. Identity, experience, and contact details have not been filled in.',
    interests:'Other records', contact:'Contact', draft:'Draft', missing:'This entry is not here yet.', returnHome:'Back to home',
    close:'Done', language:'Language', appearance:'Appearance', light:'Light', dark:'Dark', size:'Text size', normal:'Standard', larger:'Larger', largest:'Largest',
    materialDetails:'Material details', lettering:'Titles & annotations', hand:'Handwritten', print:'Printed', material:'Note surface', paper:'Paper', vellum:'Tracing paper', metal:'Brushed metal',
    grain:'Surface grain', ink:'Ink irregularity', bleed:'Ink bleed', relief:'Object shadows', frost:'Tracing-paper haze',
    inkPreview:'Lettering preview', inkSample:'Notice where the light falls.', inkHint:'Roughness changes the stroke edges; bleed softly spreads the ink. Only titles and handwritten notes are affected. Body text stays clear.',
    settingsHint:'Body text stays clear. Preferences stay on this device and do not change the original demo.', inherit:'Use original demo settings', reset:'Reset this version', inherited:'Original saved settings applied.', noLegacy:'No saved demo settings found. Using the values from your screenshot.', saved:'Saved',
    prototype:'Personal homepage draft', totalSuffix:'entries', titleSuffix:'TY H. · Personal homepage', aboutSubtitle:'Materials, making, and what happens between them.'
  }
};
