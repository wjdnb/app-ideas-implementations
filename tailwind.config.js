/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".rotate-y-90": {
          transform: "rotateY(90deg)",
        },
        ".perspective-medium": {
          perspective: "1000px",
        },
        ".preserve-3d": {
          "transform-style": "preserve-3d",
        },
        ".backface-hidden": {
          "backface-visibility": "hidden",
        },
        ".rotate-y-0": {
          transform: "rotateY(0deg)",
        },
        ".rotate-y-180": {
          transform: "rotateY(180deg)",
        },
        ".accelerate-3d": {
          transform: "translate3d(0, 0, 0)",
        },
      });
    }),
  ],
};
