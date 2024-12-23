// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    css: ['~/assets/css/tailwind.css'],

    // Если используете любой PostCSS-плагин, укажите также:
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {}
            // Если нужно, daisyUI здесь не указывается, она подключается в tailwind.config.js
        }
    },
})
