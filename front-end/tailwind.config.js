/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "basic-button": "#0f172a",
      },
      height: {
        916: "916px",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        poppins: ["Poppins", "sans-serif"],

      },
    },
  },
  plugins: [],
};
