/** @type {import('tailwindcss').Config} */

import typography from "@tailwindcss/typography";
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  plugins: [typography()],
};
