/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#F0F7F4',
          100: '#DDEFE7',
          200: '#BEDECF',
          300: '#92C4AF',
          400: '#5EA388',
          500: '#3A8569',
          600: '#2A6B53',
          700: '#205643',
          800: '#174D38', // Brand primary forest green
          900: '#113A2B',
          950: '#092118',
        },
        cream: {
          50: '#FFFFFF',
          100: '#FAF9F6',
          200: '#F8F7F1', // Warm cream background
          300: '#EFECE1',
          400: '#E2DECf',
          500: '#CFCAB9',
        },
        lime: {
          DEFAULT: '#C5F36B', // Lime accent
          hover: '#B3E454',
          dark: '#3E5C10',
          light: '#E6FAC2',
        },
        surface: {
          card: '#FFFFFF',
          border: '#E8E5DA',
          muted: '#F3F1E7',
          dark: '#14201A',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Outfit', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(23, 77, 56, 0.04)',
        'card': '0 4px 20px -2px rgba(23, 77, 56, 0.07), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'float': '0 12px 36px -4px rgba(23, 77, 56, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
