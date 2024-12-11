import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",  // Pages directory
    "./src/app/components/**/*.{js,ts,jsx,tsx,mdx}",  // Components directory
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",  // App directory
    "./src/app/HomePage.tsx",  // Specific path for HomePage.tsx
    './src/**/*.{js,ts,jsx,tsx}'  // All files in the src directory
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
