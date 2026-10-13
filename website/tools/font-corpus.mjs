// Run before pyftsubset after editing public text. The full upstream fonts are
// build inputs, not distributed assets; their OFL accompanies the subsets.
import {readdir,readFile,writeFile} from 'node:fs/promises';
import * as OpenCC from 'opencc-js';
let corpus='';
for(const file of (await readdir(new URL('../',import.meta.url))).filter(f=>f.endsWith('.mjs')))corpus+=await readFile(new URL('../'+file,import.meta.url),'utf8');
for(const file of ['desk-data.mjs','desk-affiliations.mjs'])corpus+=await readFile(new URL('../../material-demo/dist/'+file,import.meta.url),'utf8');
for(const file of (await readdir(new URL('../notes/',import.meta.url))).filter(f=>f.endsWith('.md')))corpus+=await readFile(new URL('../notes/'+file,import.meta.url),'utf8');
corpus+=OpenCC.Converter({from:'cn',to:'hk'})(corpus);
await writeFile(process.argv[2]||'/tmp/site-font-chars.txt',corpus);
