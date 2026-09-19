import {profile, entries, entryById, featured, aboutEntries, linksFor, defaults, ranges, cleanPreferences, inkTreatment, preferenceKey, legacyKey, labels, parseRoute, filterEntries} from './home-data.mjs';

const $ = id => document.getElementById(id);
const root = document.documentElement;
function readPreferences(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value && typeof value === 'object' && !Array.isArray(value) ? value : null;
  } catch { return null; }
}
let preferences = cleanPreferences(readPreferences(preferenceKey) ?? readPreferences(legacyKey));
let route = parseRoute(location.hash);
let archiveQuery = '', archiveType = 'all', imageIndex = 0, resizeObserver, lineFrame, scrollTimer;
const t = key => labels[preferences.lang][key];
const local = value => value[preferences.lang];
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const h = escape;
const link = (id, text, attrs = '') => `<a href="#entry/${h(id)}" ${attrs}>${text}</a>`;
const notice = () => `<p class="sample-notice">${h(t('sampleLong'))}</p>`;
function title(entry) { return h(local(entry.title)); }
function media(entry, index = 0, eager = false) {
  const file = entry.media[index];
  const other = entries.find(e => e.media?.length === 1 && e.media[0] === file);
  const alt = local(other?.alt ?? entry.alt);
  return `<img src="assets/${h(file)}" alt="${h(alt)}" loading="${eager ? 'eager' : 'lazy'}" decoding="async" ${eager ? 'fetchpriority="high"' : ''}>`;
}
function object(id) {
  const entry = entryById.get(id);
  const heading = `<h3 class="object-title written ink">${title(entry)}</h3>`;
  let classes, surface, subtitle = local(entry.meta), related = '';
  if (id === 'fold') {
    classes = 'object-main';
    surface = `<span class="surface photograph" id="fold-surface">${media(entry, 0, true)}</span>`;
  } else if (id === 'fold-notes') {
    classes = 'object-note';
    surface = `<span class="surface note" id="sketch-surface">${media(entry)}<span class="inscription written ink">${h(local(entry.inscription))}</span></span>`;
    subtitle = '';
    related = link('fold', `↖ ${h(t('sketchRelation'))}`, 'class="relation-caption"');
  } else if (id === 'edge-note') {
    classes = 'object-metal';
    surface = `<span class="surface plate"><span class="plate-kicker">${h(t('note'))}</span><span class="inscription">${h(local(entry.excerpt))}</span></span>`;
    subtitle = '';
    related = link('fold', `↖ ${h(t('edgeRelation'))}`, 'class="relation-caption"');
  } else if (id === 'surface-colour') {
    classes = 'object-colour';
    surface = `<span class="surface instant">${media(entry)}<span class="inscription written ink">${h(local(entry.inscription))}</span></span>`;
  } else {
    return `<article class="object object-writing">${link(id, `${heading}<p>${h(local(entry.excerpt))}</p><span class="read-mark">${h(t('reading'))} ↗</span>`, `class="object-link" id="object-${h(id)}"`)}</article>`;
  }
  return `<article class="object ${classes}">${link(id, surface + heading, `class="object-link" id="object-${h(id)}"`)}${subtitle ? `<p class="object-meta">${h(subtitle)}</p>` : ''}${related}</article>`;
}
function home() {
  return `<section class="introduction" aria-labelledby="page-title">
    <div>${profile.draft ? `<span class="draft-label">${h(t('introDraft'))}</span>` : ''}<h1 id="page-title" tabindex="-1">${h(profile.name)}</h1></div>
    <div class="intro-copy"><p>${h(local(profile.introduction))}</p><a href="#about">${h(t('aboutLink'))}</a></div>
  </section>
  <section aria-labelledby="selection-title"><div class="section-caption"><h2 id="selection-title">${h(t('selection'))}</h2><span>${h(t('selectionNote'))}</span></div>
    <div class="worktable"><div class="study-cluster" id="study-cluster">
      ${featured.slice(0,3).map(object).join('')}
      <svg class="connection" id="connection" aria-hidden="true"><path id="connection-path"/><circle id="connection-start" r="1.5"/><circle id="connection-end" r="1.5"/></svg>
    </div><div class="independent">${featured.slice(3).map(object).join('')}</div></div>
  </section>
  <div class="more-records"><p>${h(t('browseAll'))}</p><a href="#archive">${h(t('allCount'))} ↗ <small>${entries.length} ${h(t('totalSuffix'))}</small></a></div>${notice()}`;
}
function archive() {
  return `<section><header class="page-heading"><h1 id="page-title" tabindex="-1">${h(t('archive'))}</h1><p>${h(t('archiveIntro'))}</p></header>
    <div class="archive-tools"><label class="search-field"><span class="visually-hidden">${h(t('search'))}</span><input id="archive-search" type="search" placeholder="${h(t('search'))}" value="${h(archiveQuery)}"></label>
    <label class="type-field"><span>${h(t('filter'))}</span><select id="archive-type">${['all','project','note','photo','writing','album'].map(type => `<option value="${type}" ${type === archiveType ? 'selected' : ''}>${h(t(type))}</option>`).join('')}</select></label></div>
    <p id="archive-count" class="archive-count" role="status"></p><ul id="archive-list"></ul><div id="archive-empty" class="empty-state" hidden><p>${h(t('empty'))}</p><button id="clear-filters" type="button">${h(t('clear'))}</button></div>${notice()}</section>`;
}
function renderArchiveResults() {
  const results = filterEntries(archiveQuery, archiveType, preferences.lang);
  $('archive-count').textContent = `${results.length} / ${entries.length} ${t('count')}`;
  $('archive-list').innerHTML = results.map(entry => `<li class="archive-row">${link(entry.id, `
    ${entry.media ? media(entry).replace('<img ', '<img class="archive-thumb" ') : `<span class="archive-placeholder" aria-hidden="true">${entry.type === 'note' ? '—' : '¶'}</span>`}
    <div><h2>${title(entry)}</h2><p>${h(local(entry.meta))}</p></div><span class="entry-type">${h(t(entry.type))}</span><span aria-hidden="true">↗</span>`, `id="index-${h(entry.id)}"`)}</li>`).join('');
  $('archive-empty').hidden = results.length > 0;
}
function backLink() {
  const previous = history.state?.tyHome?.from ?? '#archive';
  const target = parseRoute(previous);
  const name = target.page === 'entry' ? local(entryById.get(target.id).title) : t(target.page === 'home' ? 'home' : 'archive');
  return `<a href="${h(previous)}" data-back>← ${h(t('back'))} · ${h(name)}</a>`;
}
function reader() {
  const entry = entryById.get(route.id);
  const related = linksFor(entry.id);
  const figure = entry.media ? `<figure class="reader-figure"><div id="reader-media">${media(entry, imageIndex, true)}</div><figcaption>${h(local(entry.alt))}</figcaption></figure>${entry.media.length > 1 ? `<div class="gallery-controls"><button id="image-previous" type="button">← ${h(t('previous'))}</button><span id="image-count" role="status"></span><button id="image-next" type="button">${h(t('next'))} →</button></div>` : ''}` : '';
  return `<article class="reader"><div class="breadcrumb">${backLink()}<a href="#archive">${h(t('archive'))} ↗</a></div>
    <header class="page-heading"><span class="draft-label">${h(t(entry.type))} · ${h(t('sample'))}</span><h1 id="page-title" tabindex="-1">${title(entry)}</h1><p>${h(local(entry.meta))}</p></header>
    <div class="reading-layout"><div class="article-body">${figure}${local(entry.paragraphs).map(p => `<p>${h(p)}</p>`).join('')}</div>
    ${related.length ? `<aside class="related-list" aria-labelledby="related-title"><h2 id="related-title">${h(t('related'))}</h2><ul>${related.map(item => `<li>${link(item.id, `<small>${h(local(item.label))}</small>${title(entryById.get(item.id))} ↗`)}</li>`).join('')}</ul></aside>` : ''}</div>
    <div class="reader-end">${backLink()}${notice()}</div></article>`;
}
function about() {
  const contact = profile.contact && /^mailto:|^https:\/\//.test(profile.contact.href) ? `<h2>${h(t('contact'))}</h2><a href="${h(profile.contact.href)}">${h(profile.contact.label)}</a>` : '';
  return `<article class="about-page"><header class="page-heading"><span class="draft-label">${h(t('about'))}</span><h1 id="page-title" tabindex="-1">${h(profile.name)}</h1><p>${h(t('aboutSubtitle'))}</p></header>
    <div class="about-layout"><div class="about-copy">${local(profile.about).map(p => `<p>${h(p)}</p>`).join('')}${profile.draft ? `<p class="draft-note">${h(t('aboutDraft'))}</p>` : ''}</div>
    <aside class="about-aside"><h2>${h(t('interests'))}</h2>${aboutEntries().map(entry => link(entry.id, `<small>${h(t(entry.type))}</small>${title(entry)} ↗`)).join('')}${contact}</aside></div></article>`;
}
function renderPage({focus = false, y} = {}) {
  resizeObserver?.disconnect();
  cancelAnimationFrame(lineFrame);
  const views = {home, archive, entry:reader, about};
  $('main').innerHTML = views[route.page] ? views[route.page]() : `<section class="missing-page"><h1 id="page-title" tabindex="-1">${h(t('missing'))}</h1><a href="#home">${h(t('returnHome'))}</a></section>`;
  for (const anchor of $('main-nav').querySelectorAll('a')) {
    if (anchor.hash === `#${route.page}`) anchor.setAttribute('aria-current','page'); else anchor.removeAttribute('aria-current');
  }
  const pageName = route.page === 'entry' ? local(entryById.get(route.id).title) : route.page === 'missing' ? t('missing') : t(route.page);
  document.title = `${pageName} · ${profile.name}`;
  if (route.page === 'archive') renderArchiveResults();
  if (route.page === 'entry') updateGallery();
  if (route.page === 'home') {
    resizeObserver = new ResizeObserver(scheduleLine);
    resizeObserver.observe($('study-cluster'));
    for (const img of $('study-cluster').querySelectorAll('img')) img.addEventListener('load', scheduleLine, {once:true});
    scheduleLine();
  }
  requestAnimationFrame(() => {
    if (focus) $('page-title')?.focus({preventScroll:true});
    if (typeof y === 'number') window.scrollTo({top:y, behavior:'instant'});
  });
}
function scheduleLine() {
  cancelAnimationFrame(lineFrame);
  lineFrame = requestAnimationFrame(() => {
    if (route.page !== 'home') return;
    const cluster = $('study-cluster'), svg = $('connection');
    if (getComputedStyle(svg).display === 'none') return;
    const box = cluster.getBoundingClientRect(), a = $('fold-surface').getBoundingClientRect(), b = $('sketch-surface').getBoundingClientRect();
    const x1 = a.right - box.left + 5, x2 = b.left - box.left - 7;
    const y1 = a.top - box.top + a.height * .32, y2 = b.top - box.top + b.height * .42;
    svg.setAttribute('viewBox',`0 0 ${box.width} ${box.height}`);
    const mid = (x1 + x2) / 2;
    $('connection-path').setAttribute('d',`M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`);
    $('connection-start').setAttribute('cx', x1); $('connection-start').setAttribute('cy', y1);
    $('connection-end').setAttribute('cx', x2); $('connection-end').setAttribute('cy', y2);
  });
}
function updateGallery() {
  if (route.page !== 'entry') return;
  const entry = entryById.get(route.id);
  if (!entry.media || entry.media.length < 2) return;
  $('reader-media').innerHTML = media(entry, imageIndex, true);
  $('image-count').textContent = `${t('imageCount')} ${imageIndex + 1} / ${entry.media.length}`;
  $('image-previous').disabled = imageIndex === 0;
  $('image-next').disabled = imageIndex === entry.media.length - 1;
}
function applyPreferences() {
  root.lang = preferences.lang === 'zh' ? 'zh-CN' : 'en';
  for (const key of ['theme','lettering','material']) root.dataset[key] = preferences[key];
  root.style.fontSize = `${preferences.size}%`;
  root.style.setProperty('--grain', preferences.grain / 100);
  root.style.setProperty('--object-grain', preferences.grain / 145);
  root.style.setProperty('--shadow-opacity', preferences.relief / 220);
  root.style.setProperty('--shadow-y', `${preferences.relief / 7}px`);
  root.style.setProperty('--shadow-blur', `${preferences.relief / 4}px`);
  root.style.setProperty('--frost', `${preferences.frost}px`);
  const treatment = inkTreatment(preferences);
  root.classList.toggle('no-ink', !treatment.enabled);
  $('ink-displacement').setAttribute('scale', treatment.displacement.toFixed(2));
  $('ink-opacity').setAttribute('slope', treatment.slope.toFixed(2));
  $('ink-opacity').setAttribute('intercept', treatment.intercept.toFixed(2));
  $('ink-spread').setAttribute('radius', treatment.spread.toFixed(3));
  $('ink-softness').setAttribute('stdDeviation', treatment.blur.toFixed(3));
  document.querySelector('meta[name="theme-color"]').content = preferences.theme === 'dark' ? '#272c29' : '#eeeee7';
  for (const node of document.querySelectorAll('[data-text]')) node.textContent = t(node.dataset.text);
  $('main-nav').setAttribute('aria-label', preferences.lang === 'zh' ? '主导航' : 'Main navigation');
  document.querySelector('.wordmark').setAttribute('aria-label', `${profile.name} · ${t('home')}`);
  $('theme-toggle').textContent = t(preferences.theme === 'light' ? 'dark' : 'light');
  $('theme-toggle').setAttribute('aria-pressed', String(preferences.theme === 'dark'));
  $('language-toggle').textContent = preferences.lang === 'zh' ? 'English' : '中文';
  $('language-toggle').lang = preferences.lang === 'zh' ? 'en' : 'zh-CN';
  for (const key of Object.keys(defaults)) if ($(`pref-${key}`)) $(`pref-${key}`).value = preferences[key];
  for (const key of Object.keys(ranges)) $(`value-${key}`).value = preferences[key];
  $('pref-frost').disabled = preferences.material !== 'vellum';
  scheduleLine();
}
function changePreferences(patch) {
  const previousLang = preferences.lang;
  const y = scrollY;
  preferences = cleanPreferences({...preferences, ...patch});
  try { localStorage.setItem(preferenceKey, JSON.stringify(preferences)); } catch { /* Browsing works without storage. */ }
  applyPreferences();
  if (previousLang !== preferences.lang) renderPage({y});
}
function snapshot() {
  history.replaceState({...history.state, tyHome:{...history.state?.tyHome, y:scrollY, focus:document.activeElement?.id}}, '', location.href);
}
function navigate(hash) {
  if (hash === location.hash) return;
  clearTimeout(scrollTimer);
  snapshot();
  const from = location.hash || '#home';
  history.pushState({tyHome:{from, y:0}}, '', hash);
  route = parseRoute(hash); imageIndex = 0;
  renderPage({focus:true, y:0});
}
document.addEventListener('click', event => {
  const anchor = event.target.closest('a[href^="#"]');
  if (!anchor || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (anchor.hash === '#main') {
    event.preventDefault(); $('main').focus(); return;
  }
  event.preventDefault();
  if (anchor.hasAttribute('data-back') && history.state?.tyHome?.from === anchor.hash) history.back(); else navigate(anchor.hash);
});
window.addEventListener('popstate', () => {
  clearTimeout(scrollTimer);
  route = parseRoute(location.hash); imageIndex = 0;
  renderPage({focus:true, y:history.state?.tyHome?.y ?? 0});
  requestAnimationFrame(() => {
    const id = history.state?.tyHome?.focus;
    if (id) $(id)?.focus({preventScroll:true});
  });
});
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(snapshot, 120);
}, {passive:true});
// Manual hash edits and native links opened in a new tab also resolve safely.
window.addEventListener('hashchange', () => {
  const next = parseRoute(location.hash);
  if (next.page === route.page && next.id === route.id) return;
  route = next; imageIndex = 0; renderPage({focus:true,y:0});
});
document.addEventListener('input', event => {
  if (event.target.id === 'archive-search') { archiveQuery = event.target.value; renderArchiveResults(); }
});
document.addEventListener('change', event => {
  if (event.target.id === 'archive-type') { archiveType = event.target.value; renderArchiveResults(); }
});
document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.id === 'clear-filters') {
    archiveQuery = ''; archiveType = 'all'; $('archive-search').value = ''; $('archive-type').value = 'all'; renderArchiveResults(); $('archive-search').focus();
  }
  if (button.id === 'image-previous' || button.id === 'image-next') {
    imageIndex = Math.max(0, Math.min(entryById.get(route.id).media.length - 1, imageIndex + (button.id === 'image-next' ? 1 : -1))); updateGallery();
  }
});
for (const [key, [min, max]] of Object.entries(ranges)) {
  const label = document.createElement('label'); label.className = 'control range-control'; label.htmlFor = `pref-${key}`;
  label.innerHTML = `<span data-text="${key}">${h(t(key))}</span><output id="value-${key}" for="pref-${key}"></output><input id="pref-${key}" type="range" min="${min}" max="${max}">`;
  $('material-ranges').append(label);
}
for (const key of Object.keys(defaults)) {
  $(`pref-${key}`).addEventListener(key in ranges ? 'input' : 'change', event => changePreferences({[key]:key in ranges || key === 'size' ? Number(event.target.value) : event.target.value}));
}
$('theme-toggle').addEventListener('click', () => changePreferences({theme:preferences.theme === 'light' ? 'dark' : 'light'}));
$('language-toggle').addEventListener('click', () => changePreferences({lang:preferences.lang === 'zh' ? 'en' : 'zh'}));
$('settings-open').addEventListener('click', () => { $('settings-status').textContent = ''; $('settings').showModal(); });
$('settings-close').addEventListener('click', () => $('settings').close());
$('settings').addEventListener('close', () => $('settings-open').focus());
$('inherit-settings').addEventListener('click', () => {
  const old = readPreferences(legacyKey);
  const original = cleanPreferences(old);
  const patch = Object.fromEntries(['lettering','material',...Object.keys(ranges)].map(key => [key, original[key]]));
  changePreferences(patch); $('settings-status').textContent = t(old ? 'inherited' : 'noLegacy');
});
$('reset-settings').addEventListener('click', () => { changePreferences({...defaults, lang:preferences.lang}); $('settings-status').textContent = t('saved'); });
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
history.replaceState({...history.state, tyHome:history.state?.tyHome ?? {y:0}}, '', location.href);
applyPreferences();
renderPage({y:history.state?.tyHome?.y ?? 0});
document.fonts.ready.then(scheduleLine);
