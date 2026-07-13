/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#2dd4bf', light: '#5eead4', dark: '#0d9488' },
        brand2: { DEFAULT: '#a3e635', light: '#bef264' },
        accent: { DEFAULT: '#38bdf8', light: '#7dd3fc' },
        ink: { DEFAULT: '#f8fafc', sub: '#cbd5e1', mute: '#64748b' },
        canvas: '#05070a',
        card: '#111827',
        'card-soft': 'rgba(17,24,39,0.78)',
        line: '#1f2937',
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.35)',
        float: '0 12px 40px rgba(0,0,0,0.55)',
        glow: '0 0 20px rgba(45,212,191,0.25)',
      },
      borderRadius: {
        xl: '14px',
        '2xl': '18px',
      },
    },
  },
  plugins: [],
}
