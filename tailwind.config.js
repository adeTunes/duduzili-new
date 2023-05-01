/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layout/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        duduzili: {
          "black-olive": "#3A3A3A",
          "chinese-white": "#E1E1E1",
          "gray(X11)": "#BEBEBE",
          "ocean-blue": "#A7B834",
          "charleston-green": "#2A2A2A",
          "black-olive": "#3A3A3A",
          violet: "#4534B8",
          blue: "#367EE8",
          orange: "#E59055",
        },
      },
    },
  },
  plugins: [],
};
