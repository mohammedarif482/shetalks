/** @type {import(tailwindcss).Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        text: "rgb(var(--color-text) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
      },
      borderRadius: {
        pill: "40px",
      },
      boxShadow: {
        soft: "0 0 0 1px rgb(var(--color-muted) / 1), 0 8px 24px -8px rgb(0 0 0 / 0.15)",
      },
    },
  },
  plugins: [],
};
