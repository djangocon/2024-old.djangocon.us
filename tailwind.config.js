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

        'social-facebook': '#0866ff',
        'social-linkedin': '#2d64bc',
        'social-twitter': '#4a99e9',
        'social-github': '#7041c0',
        'social-mastodon': '#6364FF',
      },
      fontSize: {
        '5xl': ['3rem', 1.1]
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography')
  ],
}
