/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        coral: "#fa5f6d",
        blue: "#4ba2f6",
        violet: "#8e5eff",
        ink: "#1d1d1f",
      },
    },
  },
  plugins: [],
};
