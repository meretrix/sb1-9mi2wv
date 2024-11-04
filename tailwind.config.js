/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#111318',
          mid: '#161A24',
          primary: '#1F2532',
          secondary: '#7C808A'
        }
      },
      backgroundColor: {
        'input-dark': '#1F2532'
      }
    },
  },
  plugins: [],
};