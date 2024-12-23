// plugins/pinia.ts
import { defineNuxtPlugin } from '#app'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin((nuxtApp) => {
    const pinia = createPinia()

    // ВАЖНО! Вызываем pinia.use(...) и передаём ПЛАГИН
    pinia.use(piniaPluginPersistedstate)

    nuxtApp.vueApp.use(pinia)
})