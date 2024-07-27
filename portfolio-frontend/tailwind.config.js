/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customDarkBlue: '#03001C',
      },
      keyframes: {
        textReveal: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        textReveal: 'textReveal 2s steps(30, end) forwards',
      },
    },
  },
  plugins: [],
}
