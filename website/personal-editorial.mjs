// Public, owner-supplied material only. New personal text and documentary photos
// need an explicit association; never infer friends, feelings or a hometown.
const L=(zh,en)=>({zh,en});
export const identityWords=[
 ['乐迷','Music lover','blue'],['研究者','Researcher','ink'],['香港人','Hongkonger','ink'],
 ['怪人','A weirdo','ink',true],['工程师','Engineer','blue'],['学生','Student','ink'],
 ['志愿者','Volunteer','ink'],['喝酒的人','Drinker','blue'],['理大人','PolyUer','ink'],
 ['闷','Quiet','ink',true],['委员','Committee member','ink'],['交换生','Exchange student','blue'],
 ['导师','Tutor','ink'],['实习生','Intern','ink']
].map(([zh,en,tone,hollow=false])=>({label:L(zh,en),tone,hollow}));
export const aboutOpening={
 title:L('这里是我的家，','This is home,'),place:L('香港。','Hong Kong.'),
 body:L(['成长、读书，也在这里生活。'],['Growing up, studying, and living here.']),
 source:'places.mjs / hk / growing-up'
};
// Narrative entries are independent of map pins. Optional photo accepts local
// src, paired alt/caption and intrinsic width/height. No empty photo placeholders.
export const lifeMoments=[
 {id:'beijing',place:L('北京 · 2025–26','Beijing · 2025–26'),title:L('住在北京的几个月','Living in Beijing'),body:L(['校园的规模、共用的设施，还有每晚满是学生的运动场，让我具体地感受到一种此前没有经历过的集体大学生活。'],['The campus scale, shared facilities, and nightly sports fields full of students gave me a concrete sense of collective university life that I had not experienced before.']),source:'Exchange Learning Report, section III; Figure 8',attribution:L('交换报告节选','From my exchange report'),photo:{src:'life/xinya-courtyard.png',width:427,height:321,alt:L('北京交换期间的校园庭院与树木','A campus courtyard and trees during the Beijing exchange'),caption:L('北京交换期间的校园一角。','A corner of campus during the Beijing exchange.')}},
 {id:'friends',place:L('人和相处','People & company'),title:L('在校外的小酒吧','At a little bar near campus'),body:L(['课外，我在学校附近的一间小酒吧认识了不同地区、不同年龄的人，建立了一些意料之外的联系。','这没有让我觉得哪一种文化更好。它让我看见文化是怎样被人们生活出来的，也更留意自己进入陌生环境时带着哪些假设。'],['Outside class, I formed unexpected connections in a small bar near campus, meeting people from different regions and age groups.','This did not lead me to judge one as better. Instead, it helped me see culture as lived logic and made me more aware of my own assumptions when entering unfamiliar environments.']),source:'Exchange Learning Report, section III; Figure 10',attribution:L('交换报告节选','From my exchange report'),photo:{src:'life/beijing-friends.jpg',width:1707,height:1280,alt:L('北京交换期间，在酒吧与朋友的合照','A group photograph with friends at a bar during the Beijing exchange'),caption:L('在北京认识的新朋友。','New friends in Beijing.')}}
];

// Additional images extracted unchanged from the report; no student-ID image.
lifeMoments[0].photos=[lifeMoments[0].photo,{src:'life/tsinghua-snow.png',width:670,height:503,alt:L('清华校园雪夜','A snowy night on the Tsinghua campus'),caption:L('交换报告里的校园雪夜。','A snowy campus night, from the exchange report.')}];
lifeMoments[1].photos=[lifeMoments[1].photo,{src:'life/beijing-company.png',width:435,height:326,alt:L('北京酒吧内与朋友们的合照','A group photograph with friends at a Beijing bar'),caption:L('在北京认识的新朋友。','New friends in Beijing.')}];
