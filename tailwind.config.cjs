/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  safelist: [""],
  theme: {
    extend: {
      colors: {
        primary: "#824DF4",
      },
      dropShadow: {
        glow: "0 0 50px 15px #fff",
      },
      animation: {
        dashing: "dashing 0.5s linear infinite",
        linedraw: "linedraw 1s linear forwards",
        grow: "grow 2s ease-in-out infinite",
        wiggle: "wiggle 0.2s ease-in-out 1",
      },
      keyframes: {
        dashing: {
          "0%": { strokeDashoffset: 0 },
          "100%": { strokeDashoffset: -8 },
        },
        linedraw: {
          to: { strokeDashoffset: 0 },
        },
        grow: {
          "0%": { r: 30, transformOrigin: "center", opacity: 1 },
          "100%": { r: 100, transformOrigin: "center", opacity: 0 },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      backgroundImage: {
        someImage: "url(/bg.jpg)",
      },
    },
  },
  plugins: [],
};
