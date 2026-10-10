import {experiences, honours, works} from '../content.mjs';
import {education, cvSkills} from '../cv-content.mjs';
import {organisations, credentials} from '../../material-demo/dist/desk-affiliations.mjs';

export const variants = ['a', 'b', 'c'];
export const h = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const L = (zh, en) => ({zh, en});
const topics = {
  qiyuan: L('GPU 工具开发与教学演示', 'GPU tooling & teaching demos'),
  shi: L('生物分子结构水印 · StrucTrace', 'Biomolecular structure watermarking · StrucTrace'),
  smart: L('冷冻电镜与电子断层图像对齐', 'Image alignment for cryo-EM & electron tomography'),
  cas: L('级联热浪风险研究', 'Cascading heatwave risks'),
  polysmart: L('数据科学与人工智能', 'Data science & artificial intelligence'),
  kteo: L('知识转移与创业支持', 'Knowledge transfer & entrepreneurship support'),
  hotel: L('会计报表自动化与 IT 支持', 'Accounting automation & IT support'),
  'x-social': L('社会创新', 'Social innovation'),
  'x-microbial': L('微生物系统与非线性动力学', 'Microbial systems & nonlinear dynamics'),
};
// These labels make existing CV facts easier to scan; they do not add achievements.
const roles = {
  cas: L('研究学生', 'Research student'),
  'x-social': L('零一学子', 'X-Scholar'),
  'x-microbial': L('暑期项目学生', 'Summer programme student'),
};
export const currentIds = ['qiyuan','x-social','gov-committee','gov-tutor','polyu-representative','union-head'];
export const researchIds = Object.keys(topics);
export const dateKey = value => {
  const match = String(value).match(/^(\d{4})(?:\.(\d{1,2}))?/);
  return match ? Number(match[1]) * 100 + Number(match[2] || 0) : 0;
};
const chronological = records => [...records].sort((a,b) => dateKey(b.date) - dateKey(a.date));

const diagrams = [
  `<svg viewBox="0 0 220 76" fill="none" aria-hidden="true"><rect x="1" y="1" width="218" height="74" rx="3"/><path d="M1 17h218M34 17v58M47 30h64M47 42h40M47 54h79M151 29h50v29h-50zM158 36h12v15h-12M181 36h12v15h-12"/><circle cx="10" cy="9" r="1"/><circle cx="17" cy="9" r="1"/><circle cx="24" cy="9" r="1"/></svg>`,
  `<svg viewBox="0 0 220 76" fill="none" aria-hidden="true"><path d="M8 11h201v55H8zM8 33h45V11M53 33v33M88 11v18h39V11M127 29v37M155 11v29h54M53 49h24m10 0h28m24 0h21m10 0h28"/><path d="M17 20h25v6H17zM69 19h10v10H69zM166 20h32v10h-32zM18 44h23v13H18z"/><path d="m109 46 5 3-5 3m83-6 5 3-5 3"/></svg>`,
  `<svg viewBox="0 0 220 76" fill="none" aria-hidden="true"><circle cx="28" cy="38" r="20"/><rect x="85" y="18" width="50" height="40" rx="2"/><path d="m193 12 25 26-25 26-25-26zM48 38h37M135 38h33M64 34l5 4-5 4m83-8 5 4-5 4M20 34h16M20 42h11M96 29h28M96 38h19M96 47h24"/></svg>`,
];

export function renderExperience({lang='zh', variant='a', prefix=''}) {
  const pick = value => value?.[lang] ?? value ?? '';
  const t = (zh,en) => lang === 'en' ? en : zh;
  const name = text => {const pair = text.split(' / ');return pair.length === 2 ? (lang === 'en' ? pair[1] : pair[0]) : text;};
  const link = (url,text) => `<a href="${h(url)}"${/^https?:/.test(url) ? ' target="_blank" rel="noopener noreferrer"' : ''}>${h(text)}${/^https?:/.test(url) ? ' ↗' : ' →'}</a>`;
  const marks = (id,study=false) => `<span class="exp-marks" aria-hidden="true">${organisations.filter(o => (study ? o.study ?? [] : o.records).includes(id)).map(o => `<img src="${prefix}assets/logos/${id === 'hkcc' ? 'hkcc.svg' : h(o.mark)}" alt="" width="32" height="32">`).join('')}</span>`;
  const section = (id,zh,en,body) => `<section class="exp-section" id="${id}"><header><h2>${t(zh,en)}</h2></header><div class="exp-section-content">${body}</div></section>`;
  const mentor = e => {
    if (e.id === 'polysmart') return '<p class="exp-mentor"><span>Supervisor</span> Qing Li · Xiaoyong Wei</p>';
    if (!e.mentor) return '';
    const affiliations = e.id === 'x-microbial' ? ['MIT', t('深圳湾实验室','Shenzhen Bay Laboratory')] : [];
    return `<p class="exp-mentor"><span>Supervisor</span> ${e.mentor.people.map(([n,url],i) => `<a href="${h(url)}" target="_blank" rel="noopener noreferrer">${h(name(n))}</a>${affiliations[i] ? ` <span class="exp-affiliation">(${h(affiliations[i])})</span>` : ''}`).join(' · ')}${e.mentor.context && !affiliations.length ? `<small>${h(pick(e.mentor.context))}</small>` : ''}</p>`;
  };
  const outcome = e => {
    if (e.id === 'x-social') return link('project-social-innovation.html',t('项目记录','Project record'));
    const id = e.related?.[0];
    if (!id) return '';
    const w = works.find(w=>w.id===id);
    return link(w?.pdf ? `read-${id}.html` : id === 'ninetoothed' ? 'project-ninetoothed.html' : `work-${id}.html`,pick(w?.title));
  };
  const record = e => {
    // PolySmart's only paragraph repeats the visible topic and supervisors.
    const paragraphs = e.id === 'polysmart' ? [] : (pick(e.body) || []);
    const sources = (e.links || []).map(([label,url]) => link(url,name(label))).join('');
    const more = paragraphs.length || sources ? `<details class="exp-details"><summary><span class="when-closed">${t('展开内容','Details')}</span><span class="when-open">${t('收起内容','Close details')}</span><span aria-hidden="true" class="disclosure-symbol"></span></summary><div class="exp-detail-body">${paragraphs.map(p=>`<p>${h(p)}</p>`).join('')}${sources ? `<div class="exp-links">${sources}</div>` : ''}</div></details>` : '';
    return `<article class="exp-record" id="record-${e.id}" data-record="${e.id}" data-start="${dateKey(e.date)}">${marks(e.id)}<div class="exp-record-body"><div class="exp-record-heading"><h3>${h(pick(e.name))}</h3><span class="exp-role">${h(pick(roles[e.id] || e.role))}</span><time>${h(e.date)}</time>${outcome(e) ? `<span class="exp-outcome">${outcome(e)}</span>` : ''}</div><div class="exp-record-context">${topics[e.id] ? `<span class="exp-topic">${h(pick(topics[e.id]))}</span>` : ''}${mentor(e)}</div>${more}</div></article>`;
  };
  const skills = [
    {id:'computing', title:L('计算与编程','Computing'), summary:L('编程、GPU 计算与 Web 开发','Programming, GPU computing & web development'), items:[cvSkills[0]]},
    {id:'engineering', title:L('产品及工业工程','Product & industrial engineering'), summary:L('设计、制造与工程分析','Design, manufacturing & engineering analysis'), items:[cvSkills[1],cvSkills[2]]},
    {id:'strategy', title:L('产品与策略','Product strategy'), summary:L('用户研究、商业化与合作','User research, commercialisation & partnerships'), items:[cvSkills[3]]},
  ];
  const skillCopy = s => s.items.map(item => `<p>${h(pick(item.detail))}</p>`).join('');
  const skillsBody = variant === 'c'
    ? `<div class="exp-workbench"><div class="exp-workbench-bar"><span>${t('能力工作台','Capabilities workspace')}</span><span>01 — 03</span></div><div class="exp-skill-choices" role="tablist" aria-label="${t('能力方向','Capability areas')}">${skills.map((s,i)=>`<button id="skill-tab-${s.id}" role="tab" type="button" data-skill-tab="${s.id}" aria-controls="skill-panel-${s.id}" aria-selected="${i===0}" tabindex="${i===0?0:-1}"><strong>${h(pick(s.title))}</strong><span>${h(pick(s.summary))}</span></button>`).join('')}</div>${skills.map((s,i)=>`<div class="exp-skill-panel" id="skill-panel-${s.id}" role="tabpanel" aria-labelledby="skill-tab-${s.id}" tabindex="0" ${i?'hidden':''}><span class="exp-skill-file">${s.id}.md</span><div>${skillCopy(s)}</div></div>`).join('')}</div>`
    : `<div class="exp-skills-grid">${skills.map((s,i)=>`<section>${variant==='b'?`<figure class="exp-diagram">${diagrams[i]}</figure>`:''}<h3>${h(pick(s.title))}</h3>${skillCopy(s)}</section>`).join('')}</div>`;
  const appointment = id => {const e=experiences.find(e=>e.id===id);return `<li data-current="${id}"><span class="exp-current-role">${h(pick(roles[id] || e.role))}</span><span class="exp-current-org">${h(pick(e.name))}</span></li>`;};
  const profile = `<section class="exp-profile" aria-labelledby="profile-name"><figure class="exp-photo" aria-label="${t('个人照片位置，待选定','Portrait placeholder, photo to be selected')}"><span class="exp-photo-frame" aria-hidden="true"></span><figcaption>${t('个人照片 · 待选定','Portrait · to be selected')}</figcaption></figure><div class="exp-identity"><p class="exp-kicker">${t('经历 / 个人资料','Experience / Profile')}</p><div class="exp-name"><h1 id="profile-name">${t('黄天野','Tin-Yeh Huang')}</h1><p class="exp-name-secondary">${t('Tin-Yeh Huang','黄天野')}</p></div><div class="exp-education"><p class="exp-student">${t('香港理工大学 · 本科生','Undergraduate · The Hong Kong Polytechnic University')}</p><p>B.Eng. (Hons) Product Engineering <span class="exp-degree-school">· PolyU</span></p><p>${t('第二主修创新及创业','Secondary Major in Innovation and Entrepreneurship')}</p><small>${t('2024 — 在读','2024 — In progress')}</small></div></div><div class="exp-current"><h2>${t('现有身份','Current appointments')}</h2><div class="exp-current-groups"><section><h3>${t('研究与学习','Research & study')}</h3><ul>${['qiyuan','x-social'].map(appointment).join('')}</ul></section><section><h3>${t('公共及校园服务','Public & university service')}</h3><ul>${['gov-committee','gov-tutor','polyu-representative','union-head'].map(appointment).join('')}</ul></section></div></div></section>`;
  const study = e => `<article class="exp-record exp-study" id="study-${e.id}" data-start="${dateKey(e.date)}">${marks(e.id,true)}<div class="exp-record-body"><div class="exp-record-heading"><h3>${h(pick(e.name))}</h3><time>${h(e.date)}</time></div><p>${h(pick(e.course))}</p><small>${h(e.id === 'hkcc' ? t('修读一年后转入香港理工大学。','Completed Year 1 before transferring to PolyU.') : pick(e.detail))}</small></div></article>`;
  const honour = ([date,zh,en,dz,de],i) => `<article class="exp-ledger" ${i===0?'id="record-challenge-cup-xj"':''} data-start="${dateKey(date)}"><time>${date}</time><div><h3>${h(t(zh,en))}</h3><p>${h(t(dz,de))}</p></div>${i===0?link(experiences.find(e=>e.id==='challenge-cup-xj').links[0][1],t('获奖报道','Award report')):''}</article>`;
  const review = [['2026','FM4Science',t('ICLR 2026 研讨会','ICLR 2026 workshop')],['2025','AI4Math',t('ICML 2025 研讨会','ICML 2025 workshop')],['2025','F1000Research',t('期刊审稿','Journal peer review')]];
  return `<div class="exp-page wrap" data-variant="${variant}">${profile}<section class="exp-capabilities" id="skills"><span id="tools"></span><header><h2>${t('能力与工具','Capabilities & tools')}</h2></header>${skillsBody}<p class="exp-languages"><strong>${t('语言','Languages')}</strong>${h(pick(cvSkills[4].detail))}</p></section><div id="records">${organisations.map(o=>`<span class="record-anchor" id="org-${o.id}" data-record-target="${o.study?.length?'study-'+o.study[0]:'record-'+o.records[0]}"></span>`).join('')}${section('education','教育','Education',chronological(education).map(study).join(''))}${section('experience','研究、实习与项目','Research, internships & projects',`<span id="programmes"></span>${chronological(experiences.filter(e=>researchIds.includes(e.id))).map(record).join('')}`)}${section('service','公共及校园服务','Public & university service',chronological(experiences.filter(e=>e.group==='service'&&e.id!=='academic-reviewing')).map(record).join(''))}${section('peer-review','学术审稿','Academic peer review',`<div id="record-academic-reviewing">${review.map(([date,title,context],i)=>`<article class="exp-ledger" data-start="${dateKey(date)}"><time>${date}</time><div><h3>${title}</h3><p>${context}</p></div>${i===2?link('https://doi.org/10.5256/f1000research.177956.r369223',t('查看报告','Read report')):''}</article>`).join('')}</div>`)}${section('honours','荣誉与奖学金','Honours & scholarships',honours.map(honour).join(''))}${section('credentials','会员与认证','Memberships & certification',chronological(credentials.filter(c=>c.id!=='union')).map(c=>`<article class="exp-ledger" data-start="${dateKey(c.date)}"><time>${h(c.date)}</time><div><h3>${h(pick(c.title))}</h3><p>${h(c.issuer)}</p></div>${c.id==='azure-ai'?link('https://www.credly.com/badges/e4525e09-e577-45be-acd0-deada6d808ca/public_url',t('认证记录','Credential')):''}</article>`).join(''))}</div></div>`;
}
