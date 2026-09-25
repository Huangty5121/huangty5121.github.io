// Owner-facing About copy and record shelf metadata. The Traditional Chinese
// edition is generated from zh by build.mjs; edit zh and en together here.
const L=(zh,en)=>({zh,en});

export const aboutContent={
 metaDescription:L('关于黄天野：学科如何连接成理解世界的方法，以及经历之外的情绪与唱片。','About Tin-Yeh Huang: connected ways of thinking across fields, with the emotions and records beyond a CV.'),
 introEyebrow:L('桌边一角','A corner of my desk'),
 introTitle:L('关于我','About me'),
 introBody:L('一直不太知道该怎样介绍自己。我接触过不同的学科，也接受过不同的教育和文化影响。它们慢慢连在一起，成为我理解事情的方法，也留下了不少矛盾。有时能从几个角度理解同一件事，轮到自己，却未必整理得清。经历可以一项项写下来，但要说这些经历里的我是怎样的人，就没有那么容易了。','I have never quite known how to introduce myself. Different fields, educations and cultures have gradually become connected in the way I understand things, while leaving plenty of contradictions. Sometimes I can see several sides of the same situation, yet cannot untangle my own thoughts. I can list my experiences, but describing the person within them is harder.'),
 feelingsBody:L('我容易对一些事情认真、执着。我不算一个特别闷的人，但很多时候确实很闷。也有懒散、什么都不想做的时候，有开心、难过、羡慕别人，又为自己的反应内疚的时候。这些念头和情绪并不总能理清，甚至有时连自己开不开心都说不准。','I can become serious and persistent about things. I am not always quiet and serious, though I often am. There are also times when I am lazy and want to do nothing, times of happiness, sadness or envy, and times when I feel guilty about my own reactions. I cannot always make sense of these thoughts and feelings; sometimes I cannot even tell whether I am happy.'),
 feelingsClose:L('我知道自己在意什么，也有认同的价值观和处理事情的方式，可是实际做出来的，并不总是心里想的那样。对人认真，也会脾气不好；想把事情做好，也会没管理好自己，做错事。有些时候，我很讨厌那个违背自己价值观的自己。这些事不会因为一句「人本来就有很多面」就变得没关系，但它们也确实都是我。','I know what matters to me, and have values and ways of handling things that I believe in. What I actually do does not always match them. I take people seriously, yet can lose my temper; I want to do things well, yet sometimes fail to manage myself and make mistakes. At times I really dislike the version of me that has acted against my own values. Saying that people have many sides does not make those things all right, but they are still parts of me.'),
 personalEnd:L('我知道我是我，但偶尔也会觉得自己是不是不太「正常」。如果让我自己说，我甚至可能会说，我是个怪人吧。我得接受这些都是自己，却还是不知道怎么把它们放在一起，说清楚「我是我」，也不想为了让自己容易被理解，就表现成某一种样子。这里放着我的一些经历、想法，还有喜欢的东西；这段话也只是此刻我对自己的说法。别人眼里的我可能不一样，也可能看见我没看见的地方，我愿意听。','I know I am myself, yet sometimes wonder whether I am quite “normal.” If asked, I might even call myself a bit odd. I have to accept that all of this belongs to me, though I still do not know how to bring it together and say what makes me me. Nor do I want to perform a particular version of myself just to be easier to understand. Here are some of my experiences, thoughts and things I like; these words, too, are only my account of myself at this moment. Other people may see me differently, including things I have missed. I am open to hearing that.'),
 shelfEyebrow:L('最近放在这里的唱片','Records on the shelf lately'),
 shelfTitle:L('桌边的唱片','Records by my desk'),
 shelfPlay:L('站内播放','Play here'),
 coverAlt:L('专辑封面','album cover')
};

export const aboutAlbums=[
 {title:'U 87',artist:'Eason Chan',year:'2005',url:'https://music.apple.com/us/album/u-87/1443374875',cover:'u87.jpg'},
 {title:'CHIN UP!',artist:'Eason Chan',year:'2023',url:'https://music.apple.com/us/album/chin-up/1712647195',cover:'chin-up.jpg'},
 {title:'THE PROTÉGÉ',artist:'Gareth.T',year:'2026',url:'https://music.apple.com/us/album/the-prot%C3%A9g%C3%A9/1883630666',cover:'protege.jpg'},
 {title:'浅粉红 · pale pink',artist:'Gareth.T',year:'2026',url:'https://music.apple.com/hk/album/6814412776',cover:'pale-pink.jpg',kind:'single'},
 {title:'梦想家 · The Dreamer',artist:'Khalil Fong',year:'2024',url:'https://music.apple.com/us/album/the-dreamer/1772124855',cover:'dreamer.jpg',track:'回留 · Revisited'},
 {title:'黑马 · The Dark Horse',artist:'Li Ronghao',year:'2024',url:'https://music.apple.com/us/album/the-dark-horse/1773340386',cover:'dark-horse.jpg'}
];

export const aboutWorkbench=[
  {id:'engineering',name:L('工具与代码','Tools & code'),title:L('NineToothed / CUDA / Triton','NineToothed / CUDA / Triton'),body:L('参与工具与 DSL 移植，整理 CUDA、推理和 Triton 教学材料，也参与 WebGPU 教学游戏的演示。','Contributing to tooling and DSL porting, preparing teaching material on CUDA, inference and Triton, and working on a WebGPU educational-game demo.'),url:'project-ninetoothed.html'},
  {id:'research',name:L('研究与阅读','Research & reading'),title:L('提出问题，整理证据','Questions and evidence'),body:L('读文献、参与研究，把问题、方法和已有结果整理成可以讨论的文字。这里收录了我的论文与研究记录。','Reading, contributing to research, and putting questions, methods and existing findings into writing. My papers and research records are collected here.'),url:'collection.html'},
  {id:'people',name:L('访谈与原型','Interviews & prototypes'),title:L('从人的需要开始','Starting with people'),body:L('在社会创新项目中参与访谈、测试、原型与路演，让想法经过具体使用情境的检验。','Taking part in interviews, testing, prototypes and pitches in social innovation projects, bringing ideas into concrete situations of use.'),url:'project-social-innovation.html'}
 ];
