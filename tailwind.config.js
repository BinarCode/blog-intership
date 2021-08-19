module.exports = {
  purge: [
    './public/**/*.html',
    './src/**/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
  },
  variants: {
    extend: { opacity: ['disabled'],
    backgroundColor: ['active'],},
  },
  plugins: [require('@tailwindcss/forms'),],
}