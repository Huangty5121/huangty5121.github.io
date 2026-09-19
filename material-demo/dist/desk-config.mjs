// Edit the website here, not in the visitor-facing interface.
// Public configuration: never put keys, private notes or account details here.
export const music = {
  title: '尘大师',
  artist: '陈奕迅',
  // Official Apple preview, not the complete song. Replace with an authorised
  // local path such as 'audio/my-track.mp3' when you have the file/permission.
  src: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/cf/66/67/cf666757-8fc8-e1c9-ed65-aa087e854952/mzaf_18188607515704561791.plus.aac.p.m4a',
  sourceUrl: 'https://music.apple.com/hk/album/塵大師/1675204502?i=1675204703',
  preview: true,
  volume: 0.55,
};

// Only these selected records appear on the desk. Adding a note/experience to
// desk-data.mjs grows its collection without automatically cluttering home.
export const desk = {
  experienceFolder: 'desk-assets/study-folder-v1.png',
  intro: {
    name:'Tin-Yeh Huang',
    study:{zh:'现在在 PolyU 读 Product Engineering。',en:'Studying Product Engineering at PolyU.'},
    text:{zh:'这里放一些我接触过、参与过的东西，也留一点随手写的。',en:'Some things I have worked on or spent time with, and a few notes along the way.'},
  },
  featuredNote: 'website',
  lowerNote: 'simple',
  showUpdates: true,
  updates: [
    {date:'2026.09.12',zh:'在改这个网站。',en:'Working on this website.',href:'#note/website'},
  ],
  // Two rendered pins; other entries currently use the original symbol crops.
  // Tsinghua and CAS are parent-institution marks, not invented lab logos.
  pins: {
    qiyuan: {src:'desk-assets/pins/iluvatar.png',finish:'source'},
    shi: {src:'desk-assets/pins/tsinghua.png',finish:'source'},
    smart: {src:'desk-assets/pins/smart-pin.png',finish:'render'},
    cas: {src:'desk-assets/pins/cas.png',finish:'source'},
    kteo: {src:'desk-assets/pins/polyu.png',finish:'source'},
    polysmart: {src:'desk-assets/pins/polysmart.png',finish:'source'},
    hotel: {src:'desk-assets/pins/royal-plaza.png',finish:'source'},
    'polyu-representative': {src:'desk-assets/pins/polyu.png',finish:'source'},
    'polyu-representative-previous': {src:'desk-assets/pins/polyu.png',finish:'source'},
    'x-social': {src:'desk-assets/pins/x-pin.png',finish:'render'},
    'x-microbial': {src:'desk-assets/pins/x-pin.png',finish:'render'},
  },
  featuredPins: ['smart','x-social'],
};
