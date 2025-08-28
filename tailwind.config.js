// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['var(--font-display)', 'serif'],
        'body': ['var(--font-body)', 'sans-serif'],
      },
      colors: {
        'maroon': { 
          '50': '#fdf2f2',
          '100': '#fde8e8',
          '200': '#fbd5d5',
          '300': '#f8b4b4',
          '400': '#f98080',
          '500': '#f05252',
          '600': '#e02424',
          '700': '#c81e1e',
          '800': '#9b1c1c',
          '900': '#771d1d',
        },
        'gold': {
          '50': '#fffbeb',
          '100': '#fef3c7',
          '200': '#fde68a',
          '300': '#fcd34d',
          '400': '#fbbf24',
          '500': '#f59e0b',
          '600': '#d97706',
          '700': '#b45309',
          '800': '#92400e',
          '900': '#78350f',
        },
        'saffron': {
          '50': '#fff7ed',
          '100': '#ffedd5',
          '200': '#fed7aa',
          '300': '#fdba74',
          '400': '#fb923c',
          '500': '#f97316',
          '600': '#ea580c',
          '700': '#c2410c',
          '800': '#9a3412',
          '900': '#7c2d12',
        },
        'light': '#FFF8E1',
        'dark': '#4A2A2A',
        'accent': '#FFD700',
        'border': '#A1887F', // Added to fix the border-border error
        'input': '#D7CCC8',
        'card': '#FFFFFF',
        'primary': {
          DEFAULT: '#880E4F',
          foreground: '#FFFFFF'
        },
        'secondary': {
          DEFAULT: '#FB8B24',
          foreground: '#3E2723'
        }
      },
      backgroundImage: {
        'traditional-pattern': "url('/images/traditional-pattern.png')",
        'mandala-pattern': "url('/images/mandala-pattern.png')",
        'gold-texture': "url('/images/gold-texture.jpg')",
      },
      boxShadow: {
        'traditional': '0 4px 14px 0 rgba(0, 0, 0, 0.15), 0 2px 8px 0 rgba(128, 0, 0, 0.2)',
        'gold-glow': '0 0 10px rgba(255, 215, 0, 0.5)',
      }
    },
  },
  plugins: [],
}