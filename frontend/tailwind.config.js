/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        montserrat:[ "Montserrat", "serif"],
        vollkorn:["Vollkorn SC", "serif"],
        garamond:["EB Garamond", "serif"],
        luxurious:["Luxurious Roman","serif"]

      },
      fontSize: {
        'xxs': '0.400rem' 
      }
    },
  },
  plugins: [],
}

