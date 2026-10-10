import {experiences, honours, works} from './content.mjs';
import {education, cvSkills} from './cv-content.mjs';
import {organisations, credentials} from '../material-demo/dist/desk-affiliations.mjs';

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

export function renderExperience({lang='zh', prefix=''}) {
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
    const paragraphs = pick(e.body) || [];
    const sources = (e.links || []).map(([label,url]) => link(url,name(label))).join('');
    const more = paragraphs.length > 1 || sources ? `<details class="exp-details"><summary><span class="when-closed">${t('展开内容','Details')}</span><span class="when-open">${t('收起内容','Close details')}</span><span aria-hidden="true" class="disclosure-symbol"></span></summary><div class="exp-detail-body">${paragraphs.slice(1).map(p=>`<p>${h(p)}</p>`).join('')}${sources ? `<div class="exp-links">${sources}</div>` : ''}</div></details>` : '';
    return `<article class="exp-record${['qiyuan','shi','smart','polysmart','cas',...currentIds].includes(e.id)?'':' exp-secondary'}" id="record-${e.id}" data-record="${e.id}" data-start="${dateKey(e.date)}">${marks(e.id)}<div class="exp-record-body"><div class="exp-record-heading"><h3>${h(pick(e.name))}</h3><span class="exp-role">${h(pick(roles[e.id] || e.role))}</span><time>${h(e.date)}</time>${outcome(e) ? `<span class="exp-outcome">${outcome(e)}</span>` : ''}</div><div class="exp-record-context">${topics[e.id] ? `<span class="exp-topic">${h(pick(topics[e.id]))}</span>` : ''}${mentor(e)}</div>${paragraphs[0]?`<p class="exp-summary">${h(paragraphs[0])}</p>`:''}${more}</div></article>`;
  };
  const skills = [
    {id:'computing', title:L('计算与编程','Computing'), summary:L('编程、GPU 计算与 Web 开发','Programming, GPU computing & web development'), items:[cvSkills[0]]},
    {id:'engineering', title:L('产品及工业工程','Product & industrial engineering'), summary:L('设计、制造与工程分析','Design, manufacturing & engineering analysis'), items:[cvSkills[1],cvSkills[2]]},
    {id:'strategy', title:L('产品与策略','Product strategy'), summary:L('用户研究、商业化与合作','User research, commercialisation & partnerships'), items:[cvSkills[3]]},
  ];
  const skillCopy = s => s.items.map(item => `<p>${h(pick(item.detail))}</p>`).join('');
  const skillsBody = `<div class="exp-skills-grid">${skills.map(s=>`<section><h3>${h(pick(s.title))}</h3>${skillCopy(s)}</section>`).join('')}<section><h3>${t('语言','Languages')}</h3><p>${h(pick(cvSkills[4].detail))}</p></section></div>`;
  const appointment = id => {const e=experiences.find(e=>e.id===id);return `<li data-current="${id}"><span class="exp-current-role">${h(pick(roles[id] || e.role))}</span><span class="exp-current-org">${h(pick(e.name))}</span></li>`;};
  const profile = `<section class="exp-profile" aria-labelledby="profile-name"><div class="exp-identity"><div class="exp-name"><h1 id="profile-name">${t('黄天野','Tin-Yeh Huang')}</h1><p class="exp-name-secondary">${t('Tin-Yeh Huang','黄天野')}</p></div><p class="exp-student">${t('香港理工大学 · 本科生','Undergraduate · The Hong Kong Polytechnic University')}</p><small>${t('2024 — 在读','2024 — In progress')}</small><a class="exp-print" href="experience.html" data-print>${t('打印这份经历','Print this record')}</a></div><div class="exp-current"><h2>${t('现有身份','Current appointments')}</h2><ul>${currentIds.map(appointment).join('')}</ul></div></section>`;
  const study = e => `<article class="exp-record exp-study" id="study-${e.id}" data-start="${dateKey(e.date)}">${marks(e.id,true)}<div class="exp-record-body"><div class="exp-record-heading"><h3>${h(pick(e.name))}</h3><time>${h(e.date)}</time></div><p>${h(pick(e.course))}</p><small>${h(e.id === 'hkcc' ? t('修读一年后转入香港理工大学，未获颁此副学士学位。','Completed Year 1 before transferring to PolyU; the associate degree was not conferred.') : pick(e.detail))}</small></div></article>`;
  const honour = ([date,zh,en,dz,de],i) => `<article class="exp-ledger" ${i===0?'id="record-challenge-cup-xj"':''} data-start="${dateKey(date)}"><time>${date}</time><div><h3>${h(t(zh,en))}</h3><p>${h(t(dz,de))}</p></div>${i===0?link(experiences.find(e=>e.id==='challenge-cup-xj').links[0][1],t('获奖报道','Award report')):''}</article>`;
  const review = [['2026','FM4Science',t('ICLR 2026 研讨会','ICLR 2026 workshop')],['2025','AI4Math',t('ICML 2025 研讨会','ICML 2025 workshop')],['2025','F1000Research',t('期刊审稿','Journal peer review')]];
  const selectedResearch=['qiyuan','shi','smart','polysmart','cas'];
  const selectedService=['gov-committee','gov-tutor','polyu-representative','union-head'];
  const moreRecords=(zh,en,body)=>`<details class="exp-more"><summary>${t(zh,en)}</summary><div>${body}</div></details>`;
  const records=ids=>chronological(experiences.filter(e=>ids.includes(e.id))).map(record).join('');
  const research=records(researchIds);
  const services=chronological(experiences.filter(e=>e.group==='service'&&e.id!=='academic-reviewing')).map(record).join('');
  const awards=honours.map(honour).join('');
  const chapters=[['education','教育','Education'],['experience','研究与实习','Research & internships'],['service','公共及校园服务','Service'],['honours','荣誉','Honours'],['peer-review','审稿','Peer review'],['skills','能力与语言','Capabilities'],['credentials','资格','Credentials']];
  const index=`<nav class="exp-index" aria-label="${t('经历章节','Experience sections')}">${chapters.map(([id,zh,en])=>`<a href="#${id}">${t(zh,en)}</a>`).join('')}<button data-exp-density aria-pressed="false">${t('简览','Compact view')}</button></nav>`;
  const reviews=`<div id="record-academic-reviewing">${review.map(([date,title,context],i)=>`<article class="exp-ledger" data-start="${dateKey(date)}"><time>${date}</time><div><h3>${title}</h3><p>${context}</p></div>${i===2?link('https://doi.org/10.5256/f1000research.177956.r369223',t('查看报告','Read report')):''}</article>`).join('')}</div>`;
  const qualifications=chronological(credentials.filter(c=>c.id!=='union')).map(c=>`<article class="exp-ledger" data-start="${dateKey(c.date)}"><time>${h(c.date)}</time><div><h3>${h(pick(c.title))}</h3><p>${h(c.issuer)}</p></div>${c.id==='azure-ai'?link('https://www.credly.com/badges/e4525e09-e577-45be-acd0-deada6d808ca/public_url',t('认证记录','Credential')):''}</article>`).join('');
  return `<div class="exp-page wrap">${profile}${index}<div id="records">${organisations.map(o=>`<span class="record-anchor" id="org-${o.id}" data-record-target="${o.study?.length?'study-'+o.study[0]:'record-'+o.records[0]}"></span>`).join('')}${section('education','教育','Education',chronological(education).map(study).join(''))}${section('experience','研究、实习与项目','Research, internships & projects',`<span id="programmes"></span>${research}`)}${section('service','公共及校园服务','Public & university service',services)}${section('honours','荣誉与奖学金','Honours & scholarships',awards)}${section('peer-review','学术审稿','Academic peer review',reviews)}${section('skills','能力与语言','Capabilities & languages',`<span id="tools"></span>${skillsBody}`)}${section('credentials','会员与认证','Memberships & certification',qualifications)}</div></div>`;
}
