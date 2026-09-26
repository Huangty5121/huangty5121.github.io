// Unit: unique release on the curated shelf, never a play or assumed track.
export function summarize(releases){
 const unique=new Map();
 for(const item of releases){
  if(!item.title||!item.artist||!item.year||!item.url)throw new Error('Release metadata is incomplete');
  const url=new URL(item.url);
  const appleId=url.hostname==='music.apple.com'?url.pathname.match(/\/(\d+)\/?$/)?.[1]:null;
  const key=appleId?'apple:'+appleId:url.origin+url.pathname;
  if(!unique.has(key))unique.set(key,item);
 }
 const entries=[...unique.values()];
 const countBy=fn=>Object.fromEntries(entries.reduce((counts,item)=>{const key=fn(item);counts.set(key,(counts.get(key)||0)+1);return counts;},new Map()));
 return {basis:'curated shelf; one count per unique release',releases:entries.length,artists:new Set(entries.map(a=>a.artist)).size,releaseTypes:countBy(a=>a.kind||'album'),byArtist:countBy(a=>a.artist),byReleaseYear:countBy(a=>String(a.year)),selectedAlbumTracks:entries.filter(a=>a.track).map(a=>({artist:a.artist,release:a.title,track:a.track})),duplicateReleaseEntries:releases.length-entries.length,playCount:null,listeningMinutes:null};
}
