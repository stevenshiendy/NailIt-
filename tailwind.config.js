/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#111111", // Black Main Text
        accent: "#E0218A", // Barbie Pink Accent
        background: "#FFFFFF", // Pure White Background
        dark: "#000000", // Pure Black Block
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        drama: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"SF Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
