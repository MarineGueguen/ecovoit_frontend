module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", './public/index.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        'fredoka': ['"Fredoka One"', 'sans-serif'],
      },
      colors: {
        'custom-green': {
          1: '#9FCEB4',
          2: '#77B190'
        },
        'custom-orange': '#F5AC5B',
        'custom-yellow': '#FFEEAD',
        'custom-red': '#D9534F',
      }
    },
  },
  plugins: [],
}