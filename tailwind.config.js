/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './components/**/*.{vue,js,ts}',
        './layouts/**/*.{vue,js,ts}',
        './pages/**/*.{vue,js,ts}',
        './composables/**/*.{js,ts}',
        './plugins/**/*.{js,ts}',
        './App.{js,ts,vue}',
        './app.{js,ts,vue}',
        './Error.{js,ts,vue}',
    ],
    theme: {
        extend: {}
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: ['light', 'cupcake', 'coffee', 'dark'] // выберите свои темы
    }
}
