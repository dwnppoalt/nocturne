import type { Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        reenie: ['Reenie Beanie', 'cursive'],
        patrick: ['Patrick Hand', 'cursive'],
        shadows: ['Shadows Into Light', 'cursive'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  content: ['./src/**/*.{ts,tsx}'],
  plugins: [],
}
export default config
