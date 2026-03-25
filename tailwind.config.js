/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'syne': ['Syne', 'sans-serif'],
        'dm': ['DM Sans', 'sans-serif'],
      },
      colors: {
        'dark': '#050510',
        'primary': '#7c3aed',
        'secondary': '#3b82f6',
        'accent': '#a78bfa',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '100%': { transform: 'translateY(-24px) rotate(14deg)' },
        },
      },
    },
  },
  plugins: [],
}