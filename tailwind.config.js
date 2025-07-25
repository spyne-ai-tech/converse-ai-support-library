/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          5: "rgba(35, 104, 225, 0.05)",
          10: "#114EBA",
          15: "rgba(35, 104, 225, 0.1)",
          20: "rgba(35, 104, 225, 1)",
          
        },
        black:{
          80: "rgba(0, 0, 0, 0.8)",
          90: "rgba(0, 0, 0, 1)"
        },
        gray:{
          10: "rgba(0, 0, 0, 0.1)",
          20: "rgba(243, 243, 243, 1)"
        },
        purple:{
          DEFAULT: "rgba(70, 0, 242, 1)",
          10: "rgba(64, 35, 135, 1)"
        }
      }
    },
  },
  plugins: [],
};
