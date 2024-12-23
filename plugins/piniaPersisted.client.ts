// plugins/piniaPersisted.client.ts
import { defineNuxtPlugin } from '#app'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { Pinia } from 'pinia'

export default defineNuxtPlugin({
    ssr: false,
    setup(nuxtApp) {
        // Получаем ранее созданную Pinia, если хотим:
        const pinia: Pinia = nuxtApp.vueApp.$pinia
        // или храните pinia глобально при инициализации
        // либо импортируйте из другого файла

        pinia.use(piniaPluginPersistedstate)
    },
})
