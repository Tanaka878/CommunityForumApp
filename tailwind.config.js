/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',  // For the new app directory (if you're using the new Next.js app structure)
    './pages/**/*.{js,ts,jsx,tsx}',  // For pages folder
    './src/app/components/**/*.{js,ts,jsx,tsx}',  // Pointing to the correct components folder path
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
