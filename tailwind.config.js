module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        arrowFlipV: "arrowFlipV 0.5s ease-in-out",
        arrowFlipH: "arrowFlipH 0.5s ease-in-out",
      },
      keyframes: {
        arrowFlipV: {
          "0%, 100%": { transform: " rotate(90deg) ScaleX(1)" },
          "50%": { transform: " rotate(90deg) ScaleX(-1)" },
        },
        arrowFlipH: {
          "0%, 100%": { transform: " ScaleX(1)" },
          "50%": { transform: " ScaleX(-1)" },
        },
      },
      colors: {
        primary: {
          default: "#1597BB",
          hover: "#007EA2",
          selected: "#1597BB",
        },
        background: {
          DEFAULT: "#222831",
          inset: "#393E46",
        },
      },
    },
  },
  plugins: [],
};
