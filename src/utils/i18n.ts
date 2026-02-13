export const languages = {
  zh: '中文',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'zh';

export const ui = {
  zh: {
    'nav.terminal': '终端',
    'nav.lab': '研究室',
    'nav.signal': '信号塔',
    'nav.playground': '游乐场',
    'terminal.subtitle': '开发者 · 研究者 · 创造者',
    'terminal.tagline': '> 在代码与设计的交汇处构建_',
    'terminal.currently_in': '当前位于',
    'lab.engineering': '工程',
    'lab.engineering.sub': '项目与实验',
    'lab.research': '研究',
    'lab.research.sub': '学术发表',
    'lab.live_demo': '在线演示',
    'lab.source_code': '源代码',
    'signal.title': '信号塔',
    'signal.subtitle': '频率 · 噪声',
    'playground.title': '游乐场',
    'playground.subtitle': '照片 · 装备 · 想法',
    'footer.copyright': '© {year} Frosty Neon. All rights reserved.',
    'theme.light': '亮色模式',
    'theme.dark': '暗色模式',
    'status.coding': '编码中',
    'status.online': '在线',
    'status.offline': '离线',
    'status.last_seen': '最后在线 {time}',
    'music.silence': '此刻无声。',
    'paper.copy_bibtex': '复制 BibTeX',
    'paper.copied': '已复制 ✓',
  },
  en: {
    'nav.terminal': 'Terminal',
    'nav.lab': 'Lab',
    'nav.signal': 'Signal',
    'nav.playground': 'Playground',
    'terminal.subtitle': 'Developer · Researcher · Creative',
    'terminal.tagline': '> Building at the intersection of code and design_',
    'terminal.currently_in': 'Currently in',
    'lab.engineering': 'Engineering',
    'lab.engineering.sub': 'Projects & experiments',
    'lab.research': 'Research',
    'lab.research.sub': 'Academic publications',
    'lab.live_demo': 'Live Demo',
    'lab.source_code': 'Source Code',
    'signal.title': 'The Signal',
    'signal.subtitle': 'Frequency · Noise',
    'playground.title': 'Playground',
    'playground.subtitle': 'Photos · Gadgets · Thoughts',
    'footer.copyright': '© {year} Frosty Neon. All rights reserved.',
    'theme.light': 'Light Mode',
    'theme.dark': 'Dark Mode',
    'status.coding': 'Coding',
    'status.online': 'Online',
    'status.offline': 'Offline',
    'status.last_seen': 'Last seen {time}',
    'music.silence': 'Silence is golden.',
    'paper.copy_bibtex': 'Copy BibTeX',
    'paper.copied': 'Copied ✓',
  },
} as const;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ui[lang][key] || ui[defaultLang][key] || key;
  };
}
