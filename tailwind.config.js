// const { nextui } = require("@nextui-org/theme");
/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  important: true,
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
        ...colors,

        lightgray: "#F5F5F5",
        fontColor: "#525252",
        titleColor: "#F6F6F6",
        transparent: "transparent",
        gray33: "#333333",
        themeColor: "#00591B",
        green00: "#006B20",
        blue19: "#1976D2",
        redEB: "#EB4335",
        black33: "#333333",
        grayAC: "#ACACAC",
        purpleF3: "#F3E8FF",
        pitchFF: "#FFE2E5",
        yellowFF: "#FFF4DE",
        greenDC: "#DCFCE7",
        subTextColor: "#9d9d9d",
      },
    },
    fontFamily: {
      Jost: ["Jost"],
      Mulish: ["Mulish"],
      Nunito: ["Nunito"],
    },
  },
  plugins: [],
};
