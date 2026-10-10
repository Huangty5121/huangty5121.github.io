import {readFile,writeFile,mkdir,readdir,cp,symlink,lstat} from 'node:fs/promises';
import {dirname,join,relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import * as OpenCC from 'opencc-js';
import {renderExperience,variants} from './experience.mjs';

const here=dirname(fileURLToPath(import.meta.url));
const website=dirname(here);
const baseline=join(website,'../material-demo/dist/site');
export const output=join(website,'review/layout-prototypes/site');
const traditional=OpenCC.Converter({from:'cn',to:'hk'});
const hash=s=>createHash('sha256').update(s).digest('hex');
await mkdir(output,{recursive:true});

// A private preview site reuses assets read-only; nothing writes to the published tree.
const assetLink=join(output,'assets');
try {const stat=await lstat(assetLink);if(!stat.isSymbolicLink())throw new Error('Preview assets must be a symlink');}
catch(error){if(error.code!=='ENOENT')throw error;await symlink(relative(output,join(baseline,'assets')),assetLink,'dir');}

const baselineHashes={};
for(const lang of ['', 'en', 'tw']) {
  await mkdir(join(output,lang),{recursive:true});
  for(const entry of await readdir(join(baseline,lang),{withFileTypes:true})) {
    if(!entry.isFile())continue;
    const file=join(lang,entry.name);
    const data=await readFile(join(baseline,file));baselineHashes[file]=hash(data);
    if(/\.(html|mjs|svg)$/.test(entry.name))await cp(join(baseline,file),join(output,file));
  }
}

function declarations(body, changes) {
  for(const [property,value] of Object.entries(changes)) {
    const regex=new RegExp(`(^|;)\\s*${property.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}\\s*:[^;]*`,'g');
    if(regex.test(body))body=body.replace(regex,(_,start)=>`${start}${property}:${value}`);
    else body+=`${body.endsWith(';')?'':';'}${property}:${value}`;
  }
  return body;
}
// Transform the owning rules in a preview copy, instead of stacking production overrides.
let css=await readFile(join(website,'site.css'),'utf8');
css=css.replace('--page-width:1120px','--page-width:1440px').replace('--page-gutter:56px','--page-gutter:48px').replace('--text-meta:.84615rem','--text-meta:.92308rem');
css=css.replace('--section-before:var(--sp-40)','--section-before:var(--sp-32)').replace('--section-after:var(--sp-24)','--section-after:var(--sp-16)').replaceAll('--section-heading-gap:var(--sp-24)','--section-heading-gap:var(--sp-16)');
css=css.replace('@media(max-width:700px){:root{--section-before:var(--sp-32);--section-after:var(--sp-20);','@media(max-width:700px){:root{--page-gutter:20px;--section-before:var(--sp-24);--section-after:var(--sp-16);').replaceAll('--section-heading-gap:var(--sp-20)','--section-heading-gap:var(--sp-16)');
css=css.replace('@media(max-width:900px){:root{--page-gutter:32px}', '@media(min-width:701px) and (max-width:900px){:root{--page-gutter:32px}}\n@media(max-width:900px){');
css=css.replace('@media(max-width:600px){.desktop-nav{display:none}', '@media(max-width:900px){.desktop-nav{display:none}}\n@media(max-width:600px){');
const rules={
  '.site-header':{'padding-inline':'max(var(--page-gutter),calc((100% - var(--page-width))/2))'},
  '.site-footer':{'padding-inline':'max(var(--page-gutter),calc((100% - var(--page-width))/2))'},
  '.portrait-reading':{'max-width':'600px','padding':'20px 20px 24px'},
  '.personal-prose':{'max-width':'600px'},
  '.music-room-heading h2':{'font-size':'var(--text-section)'},
  '.section-heading h2':{'font-size':'var(--text-section)','margin-top':'8px'},
  '.home-introduction':{'padding-block':'24px'},
  '.identity-wall':{'height':'240px'},
  '.impressions':{'padding-top':'0'},
  '.section-caption h2':{'margin':'8px 0 0'},
  '.impressions>.section-caption':{'margin-bottom':'16px'},
  '.work-group .entry-link,.work-group:first-child .entry:first-child .entry-link':{'min-height':'0','grid-template-rows':'auto auto','padding':'12px 0','align-content':'start'},
  '.work-group .entry-facts':{'align-self':'start'},
  '.work-group .index-list':{'align-items':'start','row-gap':'12px'},
  '.news-grid':{'align-items':'start'},
  '.news-feature figure img':{'max-height':'160px','object-fit':'contain','object-position':'left center'},
};
css=css.replace(/([^{}]+)\{([^{}]*)\}/g,(full,selector,body)=>{
  const clean=selector.replace(/\/\*[\s\S]*?\*\//g,'').trim();
  if(clean===':root'&&body.includes('--page-gutter:32px'))return full;
  if(clean==='.identity-wall'&&body.includes('height:330px'))return `${selector}{${declarations(body,{height:'280px'})}}`;
  if(clean==='.impression-body'&&body.includes('208px'))body=declarations(body,{'grid-template-columns':'180px minmax(0,1fr)'});
  if(Object.hasOwn(rules,clean))body=declarations(body,rules[clean]);
  // Instant interaction throughout this preview; geometry and artwork stay intact.
  body=body.replace(/(^|;)\s*(?:transition|animation)(?:-[\w-]+)?\s*:[^;}]*/g,'$1');
  body=body.replace(/scroll-behavior:smooth/g,'scroll-behavior:auto');
  return `${selector}{${body}}`;
});
await writeFile(join(output,'site.css'),css);
await cp(join(here,'experience.css'),join(output,'experience.css'));
await cp(join(here,'preview.mjs'),join(output,'preview.mjs'));

// Preserve the navigation runtime, with instant scrolling in this isolated site.
for(const lang of ['', 'tw']) {
  const file=join(lang,'site.mjs');
  let script=await readFile(join(output,file),'utf8');
  script=script.replaceAll("'smooth'","'instant'");
  await writeFile(join(output,file),script);
}

function previewShell(html,{lang='',variant='',filename=''}) {
  const en=lang==='en';const prefix=lang?'../':'';
  const t=(zh,eng)=>en?eng:zh;
  const toolbar=`<aside class="preview-toolbar" aria-label="${t('样板比较工具','Prototype comparison tools')}"><span>${t('独立排版预览 · 尚未替换正式网站','Layout preview · live site unchanged')}</span><nav aria-label="${t('选择样板','Choose prototype')}"><a href="preview.html"${filename==='preview.html'?' aria-current="page"':''}>${t('比较入口','Overview')}</a>${variants.map(v=>`<a href="experience-${v}.html"${variant===v?' aria-current="page"':''}>${v.toUpperCase()} · ${t(({a:'简洁',b:'线图',c:'工作台'})[v],({a:'Text',b:'Diagrams',c:'Workspace'})[v])}</a>`).join('')}</nav></aside>`;
  html=html.replace(/<meta name="robots"[^>]*>/g,'<meta name="robots" content="noindex,nofollow">').replace(/<link rel="(?:canonical|alternate)"[^>]*>/g,'');
  html=html.replace('</head>',`<link rel="stylesheet" href="${prefix}experience.css"><script type="module" src="${prefix}preview.mjs"></script></head>`);
  // Keep preview controls in main so the existing soft navigation replaces them too.
  html=html.replace(/(<main\b[^>]*>)/,`$1${toolbar}`);
  return lang==='tw'?traditional(html).replaceAll('傅里葉','傅裏葉'):html;
}

for(const lang of ['', 'en', 'tw']) {
  const sourceLanguage=lang==='en'?'en':'zh';const prefix=lang?'../':'';
  const shell=await readFile(join(baseline,lang,'experience.html'),'utf8');
  for(const entry of await readdir(join(output,lang),{withFileTypes:true})) {
    if(!entry.isFile()||!entry.name.endsWith('.html'))continue;
    const original=await readFile(join(baseline,lang,entry.name),'utf8').catch(()=>null);
    if(!original)continue;
    await writeFile(join(output,lang,entry.name),previewShell(original,{lang,filename:entry.name}));
  }
  for(const variant of variants) {
    const body=renderExperience({lang:sourceLanguage,variant,prefix});
    let html=shell.replace(/(<main\b[^>]*>)[\s\S]*?<\/main>/,`$1${body}</main>`);
    html=html.replace(/href="((?:\.\.\/)?(?:en\/|tw\/)?)(experience\.html)" class="language-link"/g,`href="$1experience-${variant}.html" class="language-link"`);
    html=previewShell(html,{lang,variant});
    await writeFile(join(output,lang,`experience-${variant}.html`),html);
    if(variant==='a')await writeFile(join(output,lang,'experience.html'),html);
  }
  const t=(zh,en)=>sourceLanguage==='en'?en:zh;
  const introduction=`<section class="preview-index wrap"><p class="eyebrow">DESIGN REVIEW / 01</p><h1>${t('同一份经历，三种呈现','One profile, three approaches')}</h1><p>${t('三版使用相同的身份、经历与时间顺序。主要区别在于上半部的能力展示；每版都可以展开经历、切换语言、主题和字号。','All three use the same appointments, records and chronology. Compare their capability presentations, then explore disclosures, languages, themes and text sizes.')}</p><div class="preview-options">${variants.map(v=>`<a class="preview-option" href="experience-${v}.html"><span>${v.toUpperCase()}</span><h2>${t(({a:'简洁资料版',b:'轻图形版',c:'紧凑工作台版'})[v],({a:'Clear profile',b:'Quiet diagrams',c:'Compact workspace'})[v])}</h2><p>${t(({a:'以排版组织信息。三组能力直接可读，没有额外操作。',b:'在文字旁加入计算、工程、策略的静态线图。',c:'三个方向始终可见，具体工具在同一个工作台内切换。'})[v],({a:'Three capability groups, immediately readable with no extra controls.',b:'Static line drawings give computing, engineering and strategy a quiet visual identity.',c:'Keep all three directions visible; switch the detailed tools within one workspace.'})[v])}</p><strong>${t('打开完整样板','Open full prototype')} →</strong></a>`).join('')}</div><h2>${t('其他页面 · 共同排版预览','Other pages · shared layout preview')}</h2><div class="preview-pages">${[['index',t('首页','Home')],['collection',t('工作','Work')],['notes',t('文字','Notes')],['news',t('动态','News')],['about',t('关于我','About')],['writing-modernization',t('文章详情','Essay')],['project-ninetoothed',t('项目详情','Project')],['read-crypto',t('PDF 阅读','PDF reader')]].map(([file,label])=>`<a href="${file}.html">${label} →</a>`).join('')}</div></section>`;
  const index=shell.replace(/(<main\b[^>]*>)[\s\S]*?<\/main>/,`$1${introduction}</main>`).replace(/href="((?:\.\.\/)?(?:en\/|tw\/)?)(experience\.html)" class="language-link"/g,'href="$1preview.html" class="language-link"').replace(/(<title>)[^<]+/,'$1Layout prototypes · Tin-Yeh Huang');
  await writeFile(join(output,lang,'preview.html'),previewShell(index,{lang,filename:'preview.html'}));
}
await writeFile(join(output,'robots.txt'),'User-agent: *\nDisallow: /\n');
await writeFile(join(output,'../baseline-hashes.json'),JSON.stringify(baselineHashes,null,2));
for(const [file,digest] of Object.entries(baselineHashes))if(hash(await readFile(join(baseline,file)))!==digest)throw new Error(`Production file changed: ${file}`);
console.log(`Built three trilingual Experience prototypes and whole-site previews at ${output}. Production files unchanged.`);
