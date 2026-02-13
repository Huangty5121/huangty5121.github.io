/** @type {import('tailwindcss').Config}*/
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        obsidian: '#050505',
        charcoal: '#111111',
        frost: '#E8E8E8',
        paper: '#F5F3EF',
        neon: {
          cyan: '#00FFE0',
          violet: '#BF5AF2',
          amber: '#FFD60A',
          rose: '#FF375F',
        },
        glass: {
          dark: 'rgba(17,17,17,0.6)',
          light: 'rgba(255,255,255,0.6)',
        },
      },
      fontFamily: {
        display: ['"Clash Display"', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
        body: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
        hand: ['"LXGW WenKai"', 'cursive'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glitch': 'glitch 0.3s ease-in-out',
        'fade-in-up': 'fade-in-up 0.4s ease-out both',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0,255,224,0.3)',
        'neon-violet': '0 0 20px rgba(191,90,242,0.3)',
        'neon-amber': '0 0 20px rgba(255,214,10,0.3)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
