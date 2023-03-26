/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: "#658864",
        khaki: "#b7b78a",
        grayish: "#ccc",
        light: "#FEFCF3",
        dark: "#161616",
        darkish: "#2b2b2b",
        darkGreen: "#2C3333",
      },
    },
  },
  plugins: [],
};
