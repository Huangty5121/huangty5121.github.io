// Favourites supplied by the owner on 2026-09-29. Reference recipes are
// explicitly attributed and separate from still-unrecorded personal variations.
const L=(zh,en)=>({zh,en});
const ingredient=(zh,en,amount)=>({name:L(zh,en),amount:L(amount,amount)});
export const drinks=[
 {id:'negroni',kind:'cocktail',glass:'rocks',color:'#af5b42',name:L('Negroni','Negroni'),label:L('金酒 · 苦味 · 甜味美思','Gin · Campari · Sweet vermouth'),reference:L('IBA 参考配方','IBA reference recipe'),source:'https://iba-world.com/iba-cocktail/negroni/',sourceLabel:'IBA · Negroni',
  ingredients:[ingredient('金酒','Gin','30 ml'),ingredient('Campari','Campari','30 ml'),ingredient('甜红味美思','Sweet red vermouth','30 ml')],
  steps:[L('古典杯预冷后加入冰块，倒入三种材料，轻轻搅匀。','Build the three ingredients over ice in a chilled rocks glass, stirring gently.'),L('以半片橙片装饰。','Finish with half a slice of orange.')],garnish:L('半片橙片','Half an orange slice')},
 {id:'hanky-panky',kind:'cocktail',glass:'coupe',color:'#99694b',name:L('Hanky Panky','Hanky Panky'),label:L('金酒 · 甜味美思 · Fernet','Gin · Sweet vermouth · Fernet'),reference:L('IBA 参考配方','IBA reference recipe'),source:'https://iba-world.com/iba-cocktail/hanky-panky/',sourceLabel:'IBA · Hanky Panky',
  ingredients:[ingredient('London Dry Gin','London dry gin','45 ml'),ingredient('甜红味美思','Sweet red vermouth','45 ml'),ingredient('Fernet','Fernet','7.5 ml')],
  steps:[L('材料与冰块一起搅拌降温，滤入预冷的鸡尾酒杯。','Chill and dilute the ingredients by stirring over ice, then strain into a cold cocktail glass.'),L('用橙皮收尾。','Add an orange-zest garnish.')],garnish:L('橙皮','Orange zest')},
 {id:'dry-martini',kind:'cocktail',glass:'martini',color:'#8a9376',name:L('Dry Martini','Dry Martini'),label:L('金酒 · 干味美思','Gin · Dry vermouth'),reference:L('IBA 参考配方','IBA reference recipe'),source:'https://iba-world.com/iba-cocktail/dry-martini/',sourceLabel:'IBA · Dry Martini',
  ingredients:[ingredient('金酒','Gin','60 ml'),ingredient('干味美思','Dry vermouth','10 ml')],
  steps:[L('材料加冰搅拌后，滤入预冷的马天尼杯。','Stir the spirits over ice and strain the chilled mixture into a cold Martini glass.'),L('在酒面挤出柠檬皮油，或用绿橄榄装饰。','Express lemon-peel oils over the surface, or add a green olive.')],garnish:L('柠檬皮或绿橄榄','Lemon peel or a green olive')},
 {id:'bamboo',kind:'cocktail',glass:'coupe',color:'#ae9564',name:L('Bamboo','Bamboo'),label:L('雪莉 · 干味美思','Sherry · Dry vermouth'),reference:L('Boothby 1908 版本参考','Boothby 1908 reference version'),source:'https://www.diffordsguide.com/cocktails/recipe/4151/bamboo-cocktail-boothbys-1908-recipe',sourceLabel:"Difford’s Guide · Boothby 1908",
  ingredients:[ingredient('Fino 雪莉','Fino sherry','≈ 45 ml'),ingredient('干味美思','Dry vermouth','≈ 45 ml'),ingredient('橙味苦精','Orange bitters','2 dash'),ingredient('Angostura 芳香苦精','Angostura aromatic bitters','2 drops')],
  steps:[L('材料加冰搅拌，细滤入预冷的小型鸡尾酒杯。','Stir the mixture over ice, then fine-strain into a chilled small stemmed glass.'),L('挤入柠檬皮油后丢弃果皮，以绿橄榄装饰。','Express a lemon twist, discard it, and finish with a green olive.')],garnish:L('柠檬皮油、绿橄榄','Lemon oil and a green olive')},
 {id:'peated-manhattan',kind:'cocktail',glass:'coupe',color:'#896650',name:L('Manhattan','Manhattan'),label:L('泥煤风味','With a peaty character'),note:L('喜欢泥煤风味的版本。具体酒款和配比，之后补上。','I like a peaty version. The bottles and proportions are still to be added.'),ingredients:[],steps:[]},
 {id:'absinthe-martini',kind:'cocktail',glass:'martini',color:'#7e967f',name:L('苦艾马天尼','Absinthe Martini'),label:L('配方待记','Recipe to come'),note:L('先把名字放在这里，具体配方之后补上。','Keeping the name here for now; the recipe will follow.'),ingredients:[],steps:[]},
];
