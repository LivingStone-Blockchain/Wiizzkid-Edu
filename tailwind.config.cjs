/** @type {import('tailwindcss').Config} */
//const windmill = require("@windmill/react-ui/config");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        reddy: "#FF5959",
        "bg-yellow-500": "#FFAD5A",
        "text-yellow-500": "#FFAD5A",
        "bg-cream": "#fffaf6",
        teally: "#4F9DA6",
        "text-darken": "#1A0841",
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
      },
      animation: {
        floating: "floating 3s ease-in-out infinite",
        "floating-4": "floating 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
