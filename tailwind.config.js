/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: { 
        "serif": ['Noto Serif TC'] 
      },
      height: {
        '256': '1024px',
      },
      width: {
        '256': '1024px',
      } 
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
}
