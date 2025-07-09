/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#0c0a2c',
        'form-container': '#1e1c4b',
        'input-bg': '#3a386f',
      },
      fontFamily: {
        'sans': ['Hind Siliguri', 'sans-serif'],
        // We are adding a new font family specifically for numbers
        'numeric': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
