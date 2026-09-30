// Owner-supplied places, 2026-09-29. Pins locate cities/regions, never a
// precise visit, accommodation, venue address, route, or chronological itinerary.
const L=(zh,en)=>({zh,en});
const unwritten=()=>[{id:'unwritten',title:L('先记下这个地方','A place to remember'),body:L(['这一页，慢慢补。'],['More for this page, in time.']),pending:true}];
export const places=[
 {id:'hk',name:L('香港','Hong Kong'),level:L('城市','City'),coordinates:[22.3193,114.1694],color:'#367968',entries:[
  {id:'growing-up',title:L('我成长的地方','Where I grew up'),body:L(['成长、读书，也在这里生活。'],['Growing up, studying, and living here.'])},
  {id:'university',title:L('在理大读书','Studying at PolyU'),body:L(['产品工程学（荣誉）工学学士学位副主修创新及创业。'],['B.Eng. (Hons) in Product Engineering with a Secondary Major in Innovation and Entrepreneurship.']),url:'experience.html#study-polyu'}]},
 {id:'bj',name:L('北京','Beijing'),level:L('城市','City'),coordinates:[39.9042,116.4074],color:'#936456',entries:[
  {id:'exchange',title:L('交换的日子','An exchange chapter'),body:L(['清华大学新雅书院，创意设计与智能工程。'],['Creative Design and Intelligent Engineering at Xinya College, Tsinghua University.']),date:'2025–26',url:'experience.html#study-tsinghua'},
  {id:'three-glasses',title:L('三杯酒','三杯酒'),body:L(['在北京熟悉、常去的一间酒吧。'],['A familiar bar in Beijing, and a regular stop.'])},
  {id:'boundary',title:L('Boundary','Boundary'),body:L(['在北京熟悉、常去的另一间酒吧。'],['Another familiar bar in Beijing, and a regular stop.'])}]},
 {id:'sz',name:L('深圳','Shenzhen'),level:L('城市','City'),coordinates:[22.5431,114.0579],color:'#77678e',entries:[
  {id:'x-institute',title:L('零一学院','X-Institute'),body:L(['访谈、原型、测试、路演。'],['Interviews, prototypes, testing, and pitches.']),url:'experience.html#record-x-social'}]},
 {id:'shenyang',name:L('沈阳','Shenyang'),level:L('城市','City'),coordinates:[41.8,123.43],color:'#936456',entries:unwritten()},
 {id:'singapore',name:L('新加坡','Singapore'),level:L('城市 / 国家','City / country'),coordinates:[1.29,103.85],color:'#367968',entries:unwritten()},
 {id:'uk',name:L('英国','United Kingdom'),level:L('国家','Country'),coordinates:[54,-2],color:'#77678e',entries:unwritten()},
 {id:'ruijin',name:L('瑞金','Ruijin'),level:L('城市','City'),coordinates:[25.89,116.03],color:'#936456',entries:unwritten()},
 {id:'zunyi',name:L('遵义','Zunyi'),level:L('城市','City'),coordinates:[27.7,106.92],color:'#367968',entries:unwritten()},
 {id:'guiyang',name:L('贵阳','Guiyang'),level:L('城市','City'),coordinates:[26.58,106.72],color:'#77678e',entries:unwritten()},
 {id:'shanghai',name:L('上海','Shanghai'),level:L('城市','City'),coordinates:[31.24,121.48],color:'#936456',entries:unwritten()},
 {id:'fujian',name:L('福建','Fujian'),level:L('省','Province'),coordinates:[26,118],color:'#367968',entries:unwritten()},
 {id:'hangzhou',name:L('杭州','Hangzhou'),level:L('城市','City'),coordinates:[30.28,120.16],color:'#77678e',entries:unwritten()},
];
