// // plugins/userInit.client.ts
// import { defineNuxtPlugin } from '#app'
// import { createPinia } from 'pinia'
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
//
// export default defineNuxtPlugin((nuxtApp) => {
//   const pinia = createPinia()
//
//   // Подключаем pinia-plugin-persistedstate
//   pinia.use(
//     piniaPluginPersistedstate({
//       // При SSR локальное хранилище не доступно,
//       // поэтому обернём в process.client
//       storage: {
//         getItem: (key: string): string | null => {
//           return process.client ? window.localStorage.getItem(key) : null
//         },
//         setItem: (key: string, value: string): void => {
//           if (process.client) window.localStorage.setItem(key, value)
//         },
//         removeItem: (key: string): void => {
//           if (process.client) window.localStorage.removeItem(key)
//         }
//       }
//     })
//   )
//
//   // Регистрируем pinia во Vue-приложении
//   nuxtApp.vueApp.use(pinia)
// })