import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // theme: {
  //   extend: {},
  // },
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    daisyui, // Use imported DaisyUI directly
  ],
  daisyui: {
    themes: ["light"], // Use the light theme
  },
};
