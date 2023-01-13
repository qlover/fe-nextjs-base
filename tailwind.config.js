const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

const { ovrriedWithRoot10PX } = require('./server/config')

/** @type {import('tailwindcss').Config} */
module.exports = {
  /**
   * 兼容 next-theme 主题方案
   */
  darkMode: 'class',

  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      ...ovrriedWithRoot10PX,

      fontFamily: {
        fontCustom: ['fontCustom', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: 'var(--primary)',
        primary2: 'var(--primary2)',
        secondary: 'var(--secondary)',
        secondary2: 'var(--secondary2)',
        hover: 'var(--hover)',
        hover2: 'var(--hover2)',
        hover3: 'var(--hover3)'
      }
    }
  },

  plugins: [
    plugin(({ addBase }) => {
      addBase({
        html: { fontSize: '10px' }
      })
    })
  ]
}
