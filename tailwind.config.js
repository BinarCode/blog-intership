module.exports = {
  purge: [
    './public/**/*.html',
    './src/**/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'print': {'raw': 'print'},
        // => @media print { ... }
      }},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}