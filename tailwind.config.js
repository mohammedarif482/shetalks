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
EOF

cat > postcss.config.js <<\"EOF\"
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
EOF

cat > src/index.css <<\"EOF\"
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Figma tokens mapped to CSS variables (no hard-coding in classes) */
    --color-background: 255 236 228; /* #FFECE4 */
    --color-surface: 253 221 207;     /* rectangle fill */
    --color-primary: 235 116 112;     /* rose heading & CTA */
    --color-text: 69 69 69;           /* #454545 */
    --color-muted: 222 191 181;       /* stroke beige */
  }

  html, body, #root { height: 100%; }
  body { @apply bg-background text-text antialiased; }
}

@layer components {
  .pill {
    @apply rounded-pill px-6 py-3 bg-surface border border-muted/100 shadow-soft backdrop-blur-sm;
  }
  .pill-outline { @apply rounded-pill px-6 py-4 border-2 border-primary/100 bg-transparent; }
  .heading-primary { @apply text-primary; }
}
EOF

# Update index.html to apply background and font smoothing via Tailwind classes
perl -0777 -pe "s/<body>/<body class=\\"bg-background text-text\\">/" -i index.html

# Install tailwind if config missing npx earlier failed
npm pkg set type=module >/dev/null 2>&1 || true
