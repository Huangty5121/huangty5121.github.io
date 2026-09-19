import {mkdirSync} from 'node:fs';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
const run=promisify(execFile), dir='material-demo/pin-sources';mkdirSync(dir,{recursive:true});
const sources=[
 ['x-institute.png','https://www.x-institute.edu.cn/logo-blue.png'],
 ['smart.png','https://smart.org.cn/assets/cn/images/logo.png'],
 ['polysmart.jpg','https://polysmartgroup.github.io/assets/img/polysmart_group_2.jpg'],
 ['frcbs.svg','https://www.frcbs.tsinghua.edu.cn/static/home/images/LOGO-1.svg'],
 ['royal-plaza.svg','https://www.royalplaza.com.hk/wp-content/uploads/royal-plaza-logo-horizontal-bw.svg'],
 ['iluvatar.png','https://www.iluvatar.com/_nuxt/icons/icon_512x512.1247e4.png'],
 ['tsinghua.png','https://www.tsinghua.edu.cn/image/logo180.png'],
 ['cas.png','https://www.cas.cn/images/z19_logo.png']
];
await Promise.all(sources.map(async([name,url])=>{try{await run('curl',['-L','--fail','--max-time','35','-sS',url,'-o',`${dir}/${name}`]);console.log(JSON.stringify({name,url,status:'downloaded'}));}catch(e){console.log(JSON.stringify({name,url,error:e.message.slice(0,140)}));}}));
