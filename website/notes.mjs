// Public metadata only. Private provenance stays outside website/ and the build.
const L=(zh,en)=>({zh,en});
export const notes=[
 {id:'moon',title:L('月亮','The moon'),summary:L('从中秋的来历和一首词，想那些看月亮的人，以及没有说完的部分。','Starting with Mid-Autumn traditions and a poem, thinking about the people looking at the moon and what remains unsaid.')},
 {id:'knowing',title:L('听《知道》','Listening to “Knowing”'),summary:L('听一首歌，想起曾经相信过的答案，再问下去，连追问本身也变得可疑。','A song brings back answers that once felt convincing, until even the impulse to keep asking comes into question.')},
 {id:'understanding',title:L('说到理解','Speaking of understanding'),summary:L('把自己放进别人的处境时，带进去的还有什么？从一个假设的选择说起。','What do we bring with us when we imagine another person’s situation? A hypothetical choice makes the question concrete.')},
].map(note=>({...note,date:'2026-10-12',status:'draft',review:'awaiting-author',route:`writing-${note.id}.html`,sources:{zh:`notes/${note.id}.zh.md`,en:null}}));
