// Public display configuration. These are not private backend secrets.
// Content stays in the existing canonical data modules; this demo owns its layout.
import {music as existingMusic} from '../desk-config.mjs';
export const music = {...existingMusic};
// A local audio path is resolved relative to this folder, e.g. ./audio/track.mp3.
export const home = {
  name: 'Tin-Yeh Huang',
  study: {zh: '现在在 PolyU 读 Product Engineering。', en: 'Studying Product Engineering at PolyU.'},
  intro: {zh: '这里放一些接触过、参与过的东西，也留一点随手写的。', en: 'Some things I have worked on, and a few notes along the way.'},
  paper: 'heatwave',
  note: 'website',
  photo: 'fold',
  update: {date: '2026.09', zh: '在改这个网站。', en: 'Working on this website.'},
};
