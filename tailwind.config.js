/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent)',
        gold: '#F6C915',
        green: '#1FA84A',
        live: '#ff3232',
        bg: '#070a11',
        panel: '#101622',
        panel2: '#161e2c',
        txt: '#e9eef6',
        mut: '#8593a8',
      },
      fontFamily: {
        sans: ['Saira', 'system-ui', 'sans-serif'],
        cond: ['Saira Condensed', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
