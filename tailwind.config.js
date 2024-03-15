/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "accent" : "#25a18e" ,
      "sec-black" : "#202020",
      "pri-black" : "#333533",
      "white" : "#FAF9F6",
      "gray" : "#a7a7a7"
    },
    extend:
    {
      fontFamily: {
        'phudu': ['Phudu', 'cursive'],
        'roboto': ['Roboto', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      boxShadow :{
        '3xl' : ' 0px 5px 15px rgba(0, 0, 0, 0.35)'
      },
      mixBlendMode: {
        'multiply': 'multiply', // Object of blend modes
        'screen': 'screen',
      },

      
    },


    
  },
  plugins: [],
}