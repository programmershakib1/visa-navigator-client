/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(0,0,0)",
        p: "rgb(127,127,127)",
        c: "rgb(33,36,42)",
      },
      fontFamily: {
        mono: '"IBM Plex Mono", monospace',
        sora: '"Rowdies", sans-serif',
      },
    },
  },
  darkMode: "class",
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
