/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(39, 38, 35)",
        secondary: "#666793",
      },
      fontFamily: {
        heading: ["__GOOD_DOG_3cfdbc"],
        body: ["__LIGURINO_71f35e"],
      },
    },
  },
  plugins: [],
};
