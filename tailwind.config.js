/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,md,liquid}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        'brick-red': '#DB433B',
        'lucky-orange': '#F39745',
        'bull-blue': '#3D9CFB',
        'mosaic-blue': '#5FBFFA',
        'ice-cream-purple': '#B989C9',
        'central-park-green': '#64A03D',
        'carolina-yellow': '#E7BB43',
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography')
  ],
}
