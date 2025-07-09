export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#0c0a2c', // The main page background
        'form-container': '#1e1c4b', // The form's outer container background
        'input-bg': '#3a386f',     // The background for the input fields
      },
      fontFamily: {
        'sans': ['Hind Siliguri', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
