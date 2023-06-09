/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  safelist: ["bg-purple-600", "hover:bg-purple-600", "block"],
  theme: {
    extend: {
      colors: {
        primary: "#824DF4",
      },
      dropShadow: {
        glow: "0 0 50px 15px #fff",
      },
      fontFamily: {
        lily: ["'Lily Script One'", "system"],
      },
      animation: {
        dashing: "dashing 0.5s linear infinite",
        linedraw: "linedraw 1s linear forwards",
        grow: "grow 0.2s ease-in-out forwards",
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
          "0%": { transform: "scale(100%)", transformOrigin: "center", opacity: 1 },
          "100%": { transform: "scale(105%)", transformOrigin: "center", opacity: 1 },
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
