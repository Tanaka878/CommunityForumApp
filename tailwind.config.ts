import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",  // Pages directory
    "./src/app/components/**/*.{js,ts,jsx,tsx,mdx}",  // Components directory
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",  // App directory
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",  // Custom background color
        foreground: "var(--foreground)",  // Custom foreground color
      },
    },
  },
  plugins: [],
} satisfies Config;
