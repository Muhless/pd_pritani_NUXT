export default {
  content: [
    "./app.vue",
    "./pages/**/*.{vue,js,ts}",
    "./layouts/**/*.{vue,js,ts}",
    "./components/**/*.{vue,js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        primary: "#227d52",
        secondary:"#009488"
      },
    },
  },
  plugins: [],
};
