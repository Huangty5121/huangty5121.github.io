import {pathToFileURL} from 'node:url';
import {aboutAlbums} from '../../../about-content.mjs';
import {summarize} from '../../../listening-summary.mjs';
export {summarize};
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)console.log(JSON.stringify(summarize(aboutAlbums),null,2));
