/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0f1117',
          800: '#1a1d27',
          700: '#22263a',
          600: '#2a2f45',
        },
        accent: '#3b82f6',
      },
    },
  },
  plugins: [],
}
