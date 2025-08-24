/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
        secondary: '#10B981',
      },
    },
  },
  darkMode: 'class', // for dark mode toggle
  plugins: [],
};
