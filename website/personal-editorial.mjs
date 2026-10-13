// Public, owner-supplied material only. New personal text and documentary photos
// need an explicit association; never infer friends, feelings or a hometown.
const L=(zh,en)=>({zh,en});
export const identityWords=[
 ['乐迷','Music lover','blue'],['研究者','Researcher','ink'],['香港人','Hongkonger','ink'],
 ['怪人','A weirdo','ink',true],['工程师','Engineer','blue'],['学生','Student','ink'],
 ['志愿者','Volunteer','ink'],['喝酒的人','Drinker','blue'],['理大人','PolyUer','ink'],
 ['闷','Quiet','ink',true],['委员','Committee member','ink'],['交换生','Exchange student','blue'],
 ['导师','Tutor','ink'],['实习生','Intern','ink'],
 ['理想主义','Idealist','ink'],['不听话','Defiant','ink'],['嘉豪','嘉豪','ink']
].map(([zh,en,tone,hollow=false],index)=>({label:L(zh,en),tone,hollow,
  emphasis:['strong','quiet','soft','strong','soft','strong','quiet','strong','soft','quiet','soft','quiet','soft','quiet','strong','strong','soft'][index]}));
export const aboutOpening={
 title:L('这里是我的家，','This is home,'),place:L('香港。','Hong Kong.'),
 body:L(['我在香港成长、读书，也在这里生活。'],['I grew up in Hong Kong, and this is where I study and live.']),
 side:L(['照片里的维港，是我自己拍下来的香港。'],['These are my own photographs of Victoria Harbour.']),
 source:'places.mjs / hk / growing-up'
};
// Narrative entries are independent of map pins. Optional photo accepts local
// src, paired alt/caption and intrinsic width/height. No empty photo placeholders.
export const lifeMoments=[
 {id:'beijing',place:L('北京 · 2025–26','Beijing · 2025–26'),title:L('住在北京的几个月','Living in Beijing'),body:L(['在北京交换的几个月，住在校园里，共用设施，晚上运动场上也满是学生。这样的大学生活，是我以前没有经历过的。'],['During my exchange in Beijing, I lived on campus, shared its facilities, and saw the sports fields fill with students every evening. It was a kind of university life I had not experienced before.']),source:'Exchange Learning Report, section III; Figure 8',attribution:null,photo:{src:'life/xinya-courtyard.png',width:427,height:321,alt:L('北京交换期间的校园庭院与树木','A campus courtyard and trees during the Beijing exchange'),caption:L('北京交换期间的校园一角。','A corner of campus during the Beijing exchange.')}},
 {id:'friends',place:L('人和相处','People & company'),title:L('在校外的小酒吧','At a little bar near campus'),body:L(['在学校附近的小酒吧，我认识了一些来自不同地方、不同年纪的朋友。'],['At a small bar near campus, I made friends from different places and age groups.']),source:'Exchange Learning Report, section III; Figure 10',attribution:null,photo:{src:'life/beijing-friends.jpg',width:1707,height:1280,alt:L('北京交换期间，在酒吧与朋友的合照','A group photograph with friends at a bar during the Beijing exchange'),caption:L('在北京认识的新朋友。','New friends in Beijing.')}}
];

// Additional images extracted unchanged from the report; no student-ID image.
lifeMoments[0].photos=[lifeMoments[0].photo,{src:'life/tsinghua-snow.png',width:670,height:503,alt:L('清华校园雪夜','A snowy night on the Tsinghua campus'),caption:L('交换报告里的校园雪夜。','A snowy campus night, from the exchange report.')}];
lifeMoments[1].photos=[lifeMoments[1].photo,{src:'life/beijing-company.png',width:435,height:326,alt:L('北京酒吧内与朋友们的合照','A group photograph with friends at a Beijing bar'),caption:L('在北京认识的新朋友。','New friends in Beijing.')}];

// Owner photographs recovered from photos-src; see design-qa.md, 23 September provenance.
export const hongKongPhotos=[
 {src:'life/hong-kong-harbour.jpg',width:2560,height:1920,alt:L('我拍的维港游船夜景','My photograph of a boat on Victoria Harbour at night'),caption:L('维港的游船','A boat on Victoria Harbour')},
 {src:'life/hong-kong-night.jpg',width:1440,height:1080,alt:L('我拍的维多利亚港夜景','My photograph of Victoria Harbour at night'),caption:L('维多利亚港','Victoria Harbour')}
];
