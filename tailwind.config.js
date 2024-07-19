const { nextui } = require("@nextui-org/theme");
/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/[object Object].js",
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
      },
    },
    fontFamily: {
      Jost: ["Jost"],
      Mulish: ["Mulish"],
    },
  },
  plugins: [nextui()],
};
