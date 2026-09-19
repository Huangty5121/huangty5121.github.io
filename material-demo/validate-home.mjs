import assert from 'node:assert/strict';
import {readFile, stat} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';
import {profile, entries, entryById, featured, aboutEntries, linksFor, defaults, ranges, cleanPreferences, inkTreatment, parseRoute, filterEntries, labels, preferenceKey, legacyKey} from './dist/home-data.mjs';

const dir = dirname(fileURLToPath(import.meta.url)), dist = join(dir, 'dist');
const html = await readFile(join(dist,'home.html'),'utf8');
const css = await readFile(join(dist,'home.css'),'utf8');
const js = await readFile(join(dist,'home.mjs'),'utf8');
const checks = [];
function test(name, fn) { fn(); checks.push(name); }
for (const file of ['home.mjs','home-data.mjs']) test(`${file}: syntax`, () => assert.equal(spawnSync(process.execPath,['--check',join(dist,file)]).status,0));
test('All 12 sample records have complete bilingual prose', () => {
  assert.equal(entries.length,12); assert.equal(entryById.size,12);
  for (const entry of entries) for (const lang of ['zh','en']) {
    assert(entry.sample); assert(entry.title[lang]); assert(entry.paragraphs[lang].length);
    assert(entry.paragraphs[lang].every(p => typeof p === 'string' && p.length > 10));
  }
});
test('Five curated records preserve the object-sketch-note grouping', () => {
  assert.deepEqual(featured, ['fold','fold-notes','edge-note','surface-colour','making']);
  assert(featured.every(id => entryById.has(id)));
  assert(linksFor('fold').some(r => r.id === 'fold-notes'));
  assert(linksFor('fold').some(r => r.id === 'edge-note'));
  assert(!linksFor('fold').some(r => r.id === 'surface-colour'));
});
test('Every reading relation resolves and can be followed back', () => {
  for (const entry of entries) for (const relation of linksFor(entry.id)) {
    assert(entryById.has(relation.id)); assert(linksFor(relation.id).some(r => r.id === entry.id));
    assert(relation.label.zh && relation.label.en);
  }
});
test('About exits introduce different entries; the full index still includes home', () => {
  const selection = aboutEntries();
  assert.equal(selection.length,3);
  assert.equal(new Set(selection.map(e => e.id)).size,3);
  assert(selection.every(e => !featured.includes(e.id)));
  assert(featured.every(id => filterEntries('', 'all','zh').some(e => e.id === id)));
});
test('Draft profile is explicit and no contact is fabricated', () => {
  assert(profile.draft); assert.equal(profile.contact,null);
  for (const lang of ['zh','en']) { assert(profile.introduction[lang]); assert(profile.about[lang].length); }
});
test('Home, index, about, every entry and missing deep links resolve', () => {
  assert.deepEqual(parseRoute(''),{page:'home'});
  assert.deepEqual(parseRoute('#home'),{page:'home'});
  assert.deepEqual(parseRoute('#archive'),{page:'archive'});
  assert.deepEqual(parseRoute('#about'),{page:'about'});
  for (const entry of entries) assert.deepEqual(parseRoute(`#entry/${entry.id}`),{page:'entry',id:entry.id});
  assert.deepEqual(parseRoute('#/entry/fold'),{page:'entry',id:'fold'});
  for (const hash of ['#entry/nope','#entry/fold/extra','#unknown','#entry/%3Cscript%3E']) assert.deepEqual(parseRoute(hash),{page:'missing'});
});
test('Search and type filters work in both languages', () => {
  assert.equal(filterEntries('', 'all','zh').length,12);
  assert.equal(filterEntries('   ', 'all','en').length,12);
  assert(filterEntries('折面', 'all','zh').some(e => e.id === 'fold'));
  assert(filterEntries('FOLD', 'all','en').some(e => e.id === 'fold'));
  assert.equal(filterEntries('', 'photo','en').length,3);
  assert.equal(filterEntries('nothing-matches-this-query', 'all','en').length,0);
  assert.equal(filterEntries('折面', 'album','zh').length,0);
});
test('Screenshot defaults, ranges and invalid preferences are safe', () => {
  assert.deepEqual(cleanPreferences(null),defaults);
  assert.deepEqual(cleanPreferences('broken'),defaults);
  assert.deepEqual([defaults.grain,defaults.ink,defaults.relief,defaults.frost],[40,68,74,3]);
  const p = cleanPreferences({theme:'bad',size:999,grain:-10,ink:999,relief:Infinity,frost:NaN,material:'bad',lang:'de'});
  assert.equal(p.grain,0); assert.equal(p.ink,160); assert.equal(p.relief,74); assert.equal(p.frost,3); assert.equal(p.size,100);
  assert.equal(p.theme,'light'); assert.equal(p.material,'vellum'); assert.equal(p.lang,'zh');
  for (const size of [100,115,130]) assert.equal(cleanPreferences({size}).size,size);
});
test('Extended ink stays bounded, preserves old settings and supports bleed alone', () => {
  const old = inkTreatment({ink:68});
  assert.equal(old.displacement,68/30); assert.equal(old.slope,.68); assert.equal(old.spread,0); assert.equal(old.blur,0);
  const strong = inkTreatment({ink:160,bleed:100});
  assert(strong.displacement > inkTreatment({ink:80}).displacement);
  assert(strong.intercept > 0); assert(strong.slope <= 1);
  assert.equal(strong.spread,.42); assert.equal(strong.blur,.36);
  assert.equal(inkTreatment({ink:0,bleed:0}).enabled,false);
  assert.equal(inkTreatment({ink:0,bleed:50}).enabled,true);
  assert.equal(cleanPreferences({bleed:Infinity}).bleed,0);
  assert.equal(cleanPreferences({bleed:999}).bleed,100);
  assert.equal(cleanPreferences({ink:68}).ink,68);
  assert(!js.includes('class="article-body ink"'));
});
test('New preferences never write to the old demo key', () => {
  assert.notEqual(preferenceKey,legacyKey);
  assert.equal((js.match(/localStorage\.setItem\(/g)||[]).length,1);
  assert(js.includes('localStorage.setItem(preferenceKey,'));
});
test('All interface keys are translated and all static labels resolve', () => {
  assert.deepEqual(Object.keys(labels.zh).sort(),Object.keys(labels.en).sort());
  for (const m of (html + js).matchAll(/(?:data-text="([\w]+)"|\bt\('([^']+)'\))/g)) {
    const key = m[1] || m[2]; assert(labels.zh[key] && labels.en[key],key);
  }
});
test('Static DOM IDs are unique and literal lookups resolve', () => {
  const staticIDs = [...html.matchAll(/\bid="([^"$]+)"/g)].map(m => m[1]);
  assert.equal(staticIDs.length,new Set(staticIDs).size);
  const ids = new Set([...staticIDs, ...[...js.matchAll(/\bid="([^"$]+)"/g)].map(m => m[1]), ...Object.keys(ranges).flatMap(key => [`pref-${key}`,`value-${key}`])]);
  for (const match of js.matchAll(/\$\('([^']+)'\)/g)) assert(ids.has(match[1]),match[1]);
  for (const key of Object.keys(defaults)) assert(ids.has(`pref-${key}`),key);
});
test('Scoped responsive styles preserve clarity and avoid artificial tracing lines', () => {
  assert(css.includes('@media(max-width:640px)')); assert(css.includes('@media(max-width:1050px)'));
  assert(css.includes('.connection{display:none}')); assert(css.includes('.site-header{flex-wrap:wrap}'));
  assert(!css.includes('repeating-linear-gradient')); assert(!css.includes('transform:scale'));
  assert(!html.includes('expanded.css')); assert(!html.includes('app.js'));
});
const assets = new Set(['home-data.mjs','collection-data.mjs']);
for (const match of html.matchAll(/(?:src|href)="([^"#][^"]*)"/g)) assets.add(match[1]);
for (const match of css.matchAll(/url\(['"]?([^'"\)]+)['"]?\)/g)) if (!match[1].startsWith('#')) assets.add(match[1]);
for (const entry of entries) for (const file of entry.media || []) assets.add(`assets/${file}`);
for (const asset of assets) assert((await stat(join(dist,asset))).size > 0,asset);
checks.push(`All ${assets.size} local page, module, font and image references exist`);
console.log(JSON.stringify({checks:checks.map(name => ({name,passed:true})), count:checks.length, browserRuntime:'not tested', visualQA:'not performed', published:false},null,2));
