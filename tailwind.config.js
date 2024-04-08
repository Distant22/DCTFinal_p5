/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: { 
        "serif": ['Noto Serif TC'] 
      } 
    },
  },
  plugins: [require("daisyui")],
}
