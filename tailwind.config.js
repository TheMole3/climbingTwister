/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  safelist: [
    'bg-red-500',
    'bg-blue-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-teal-300',
    'after:bg-red-500',
    'after:bg-blue-500',
    'after:bg-green-500',
    'after:bg-yellow-500',
    'after:bg-teal-300'
    

  ],
  theme: {
    extend: {
      fontFamily: {
        teko: ['Teko']
      }
    }
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["pastel"],
  },
};