/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "350px",
      sm: "450px",
      md: "550px",
      lg: "768px",
      xl: "1000px",
      xxl: "1200px",
    },
    extend: {
      fontFamily: {
        poppins: "poppins",
      },
    },
  },
  plugins: [],
};
