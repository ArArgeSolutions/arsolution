/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        main: '#0E1C36', // açık mod yazı rengi
        "main-invert": '#ffffff', // dark mod yazı rengi
      },
    
      animation: {
        scrollGallery: 'scrollLoop linear infinite',
      },
      keyframes: {
        scrollLoop: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-1080px)'}, 
        },
      },
    
    },
  },
  plugins: [],
};
