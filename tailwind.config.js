/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        CircularMedium: 'Circular Medium',
        Montserrat: 'Montserrat'
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide'),
  require('@tailwindcss/forms')],
}