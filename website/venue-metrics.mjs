// Venue-level context only. These figures are not ratings of an individual paper.
// `if` = impact factor, `rank` = JCR quartile or CCF venue class. Workshop chips
// name the CCF rank of the HOST conference, not of the workshop itself.
export const venueMetrics={
 heatwave:{if:'IF 4.1',rank:'JCR Q1',detail:{zh:'2024 JCR 影响因子 4.1；SJR 地球科学 Q1 · 2026.09 查询',en:'JCR 2024 IF 4.1; SJR Q1 in Geosciences · checked Sep 2026'},source:'https://www.sciencedirect.com/journal/physics-and-chemistry-of-the-earth-parts-a-b-c'},
 glm7:{if:'IF 14.1',rank:'JCR Q1',detail:{zh:'Wiley Advanced Science · 综合类 Q1 · 2026.09 查询',en:'Wiley Advanced Science (Q1, multidisciplinary) · checked Sep 2026'},source:'https://advanced.onlinelibrary.wiley.com/journal/21983844'},
 disease:{if:'IF 1.9',rank:null,detail:{zh:'2025 JCR · 2026 年公布',en:'2025 JCR · published 2026'},source:'https://www.jocn-journal.com/'},
 crypto:{if:null,rank:'CCF A · ICLR 2025',detail:{zh:'AI4NA @ ICLR 2025；ICLR 为 CCF A 类会议，workshop 论文另存 arXiv',en:'AI4NA at ICLR 2025; ICLR is a CCF-A conference; the workshop paper also lives on arXiv'},source:'https://www.ccf.org.cn/Academic_Evaluation/Cross_Compre_Emerging/'},
 oio:{if:null,rank:'CCF B · BIBM',detail:{zh:'IEEE BIBM 为 CCF B 类会议；不是单篇论文评级',en:'IEEE BIBM is a CCF-B venue; not a paper rating'},source:'https://www.ccf.org.cn/Academic_Evaluation/Cross_Compre_Emerging/'},
 structrace:{if:'IF 待公布',rank:'Nature npj 系列',detail:{zh:'npj 系列新刊暂无影响因子；系列期刊索引后通常位于 Q1',en:'npj-series launch with no IF yet; npj titles typically reach Q1 once indexed'},source:'https://www.nature.com/npjstructbiol/'}
};
