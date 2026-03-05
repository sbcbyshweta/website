/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0b1a3f",
          cream: "#fbf3ea",
          lightCream: "#fdf6ee",
          gold: "#c99a2e",
          goldDark: "#a07a24",
          softGold: "#e6c77d",
        },
      },
      fontFamily: {
      display: ["Playfair Display", "serif"],
      body: ["Inter", "sans-serif"],
    },
      boxShadow: {
        card: "0 8px 24px rgba(11, 26, 63, 0.08)",
        luxury: "0 10px 40px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        xl2: "1.5rem",
      },
    },
  },
  plugins: [],
};
