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
        'maroon': { '800': '#800000' },
        'light-color': '#FFF8E1',
        'dark-color': '#4A2A2A',
        'accent-color': '#FFD700',
      }
    },
  },
  plugins: [],
}