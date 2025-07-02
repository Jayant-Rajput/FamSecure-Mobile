/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",        // for all your screen files in app/
    "./components/**/*.{js,jsx,ts,tsx}", // if you have or add reusable components later
    "./utils/**/*.{js,jsx,ts,tsx}",      // if you use tailwind in utility files (optional)
    "./index.{js,jsx,ts,tsx}",           // root index file if you ever use it
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
