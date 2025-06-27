import type { Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        reenie: ['Reenie Beanie', 'cursive'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  content: ['./src/**/*.{ts,tsx}'],
  plugins: [],
}
export default config
