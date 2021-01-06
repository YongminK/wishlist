module.exports = {
  purge: ['./pages/*.js', './components/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'magic-wand': "url('/magic-wand.svg')",
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}