// plugins/pinia.ts
import { defineNuxtPlugin } from '#app'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin((nuxtApp) => {
    const pinia = createPinia()

    // Настраиваем pinia-plugin-persistedstate
    pinia.use(
        piniaPluginPersistedstate({
            // Переопределяем методы storage для SSR
            storage: {
                getItem: (key: string): string | null => {
                    if (process.client) {
                        return window.localStorage.getItem(key)
                    }
                    return null
                },
                setItem: (key: string, value: string) => {
                    if (process.client) {
                        window.localStorage.setItem(key, value)
                    }
                },
                removeItem: (key: string) => {
                    if (process.client) {
                        window.localStorage.removeItem(key)
                    }
                }
            }
        })
    )

    nuxtApp.vueApp.use(pinia)
})
