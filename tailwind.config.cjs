/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        tomatoLighter: "#ffedef",
        tomato: "#FF3939",
        tealLighter: "#e5fbfa",
        tealLight: "#37b9b2",
        teal: "#26a8a1",
        navyLight: "#4a4c7e",
        navy: "#252641",
        pop: "#5b72ee",
        goldenLighter: "#fff2e1",
        golden: "#e0b00d",
      },
      keyframes: {
        floating: {
          "0%": { transform: "translate(0, 0px)" },
          "50%": { transform: "translate(0, 8px)" },
          "100%": { transform: "translate(0, -0px)" },
        },
        "floating-4": {
          "0%": { transform: "translate(0, 0px)" },
          "50%": { transform: "translate(0, 8px)" },
          "100%": { transform: "translate(0, -0px)" },
        },
        zoomPan: {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "25%": { transform: "scale(1.1) translate(10px, -10px)" },
          "50%": { transform: "scale(1.2) translate(-10px, 10px)" },
          "75%": { transform: "scale(1.1) translate(10px, 10px)" },
          "100%": { transform: "scale(1) translate(0, 0)" },
        },
      },
      animation: {
        floating: "floating 3s ease-in-out infinite",
        "floating-4": "floating 4s ease-in-out infinite",
        zoomPan: "zoomPan 10s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};
