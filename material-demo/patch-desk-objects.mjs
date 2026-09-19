// Emit a scoped patch; apply_patch performs the actual source-file edits.
import {readFileSync} from 'node:fs';
const paths=['material-demo/dist/desk.mjs','material-demo/dist/desk.html'];
let patch='*** Begin Patch\n';
for(const path of paths){
 const old=readFileSync(path,'utf8');let next=old;
 if(path.endsWith('desk.mjs')){
  next=next.replace("import {cleanPreferences} from './home-data.mjs';","import {cleanPreferences} from './home-data.mjs';\nimport {deskHome,experiencePin,updateDeskMusic,toggleDeskMusic,bindDeskAudio} from './desk-objects.mjs';");
  next=next.replace('let track=null, audioURL=null;','');
  next=next.replace(/function home\(\)\{[\s\S]*?\nfunction workRows\(/,"function home(){return deskHome(prefs.lang);}\nfunction workRows(");
  next=next.replace("`<time>${h(e.date)}</time><div class=\"experience-text\">", "`${experiencePin(e.id)}<time>${h(e.date)}</time><div class=\"experience-text\">");
  next=next.replace(/function updateMusic\(\)\{[\s\S]*?\ndocument\.addEventListener\('click'/,"function updateMusic(){updateDeskMusic(prefs.lang);}\ndocument.addEventListener('click'");
  next=next.replace("if(b.id==='music-open')$('music-dialog').showModal();","if(b.id==='music-play')void toggleDeskMusic(prefs.lang);");
  next=next.replace(" if(b.id==='remove-audio')clearAudio();\n",'');
  next=next.replace("if(e.target.id==='audio-file')setupAudio(e.target.files?.[0]);",'');
  next=next.replace(/for\(const event of \['play','pause','ended'\]\)[\s\S]*?\nwindow\.addEventListener\('popstate'/,"bindDeskAudio(()=>prefs.lang);\nwindow.addEventListener('popstate'");
  next=next.replace("window.addEventListener('pagehide',()=>{if(audioURL)URL.revokeObjectURL(audioURL);});\n",'');
 }else{
  next=next.replace(/  <dialog id="music-dialog"[\s\S]*?<\/dialog>/,'  <audio id="audio" preload="none" hidden></audio>');
 }
 // A whole-file hunk remains exact and fails if the user's file changed.
 if(old!==next){patch+='*** Update File: '+path+'\n@@\n'+old.trimEnd().split('\n').map(l=>'-'+l).join('\n')+'\n'+next.trimEnd().split('\n').map(l=>'+'+l).join('\n')+'\n';}
}
process.stdout.write(patch+'*** End Patch');
