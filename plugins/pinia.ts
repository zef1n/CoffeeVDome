// plugins/pinia.client.ts
import { defineNuxtPlugin } from '#app'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin({
  ssr: false,
  setup(nuxtApp) {
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)
    nuxtApp.vueApp.use(pinia)
  }
})