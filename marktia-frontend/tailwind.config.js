/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: {
          DEFAULT: '#ffffff',
          dark: '#d4d4d4'
        },
        blue: {
          dark: {
            DEFAULT: '#152e57',
            hover: '#091e40',
            moreDark: "#060e1a"
          },
          light: {
            DEFAULT: '#51a8b1',
            hover: '#295459'
          }
        },
        red: {
          DEFAULT: '#df1115',
          hover: '#b20e11'
        },
        gray: '#848587',
        black: '#000000'
      }
    }
  },
  plugins: [],
}
