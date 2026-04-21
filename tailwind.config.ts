import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        bg: {
          0: "var(--bg-0)",
          1: "var(--bg-1)",
          2: "var(--bg-2)",
          3: "var(--bg-3)",
          4: "var(--bg-4)",
        },
        // Foregrounds / Text
        fg: {
          0: "var(--fg-0)",
          1: "var(--fg-1)",
          2: "var(--fg-2)",
          3: "var(--fg-3)",
          4: "var(--fg-4)",
        },
        // Lines and Borders
        line: {
          1: "var(--line-1)",
          2: "var(--line-2)",
          3: "var(--line-3)",
        },
        // Primary Brand (Violet)
        v: {
          200: "var(--v-200)",
          400: "var(--v-400)",
          500: "var(--v-500)",
          600: "var(--v-600)",
          700: "var(--v-700)",
          900: "var(--v-900)",
        },
        // Semantic Colors
        ok: {
          DEFAULT: "var(--ok)",
          s: "var(--ok-s)",
        },
        warn: {
          DEFAULT: "var(--warn)",
          s: "var(--warn-s)",
        },
        bad: {
          DEFAULT: "var(--bad)",
          s: "var(--bad-s)",
        },
        info: "var(--info)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        "grad-violet": "var(--grad-violet)",
        "grad-hero": "var(--grad-hero)",
        "grad-edge": "var(--grad-edge)",
      },
      boxShadow: {
        "ring-v": "var(--ring-v)",
        md: "var(--shadow-md)",
      },
    },
  },
  plugins: [],
};

export default config;
