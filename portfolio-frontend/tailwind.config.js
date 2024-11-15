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
        blink: {
          '0%, 100%': { borderColor: 'black' },
          '50%': { borderColor: 'transparent' },
        },
      },
      animation: {
        textReveal: 'textReveal 2s steps(30, end) forwards',
        blink: 'blink 1s step-end infinite',
      },
      backgroundImage: theme => ({
        'custom-gradient': 'linear-gradient(to right, #bfdbfe, #3b82f6)',
      }),
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
