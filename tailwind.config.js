export default {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./composables/**/*.{js,ts}",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f3f7fa",
        foreground: "#f6f6f8",
        primary: "#16a34a ",
        secondary: "#009488",
      },
    },
  },
  plugins: [],
};
