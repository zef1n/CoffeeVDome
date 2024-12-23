import {defineNuxtPlugin} from '#app'
import axios from 'axios'
import {useUserStore} from '~/stores/userStore'

export default defineNuxtPlugin((nuxtApp) => {
    // Создаём инстанс axios
    const instance = axios.create({
        baseURL: 'http://127.0.0.1:8000/api', // ваш базовый URL
        // можно и через .env, напр. process.env.NUXT_API_URL
    })

    // Интерцептор на запросы, чтобы добавлять Bearer-токен
    instance.interceptors.request.use((config) => {
        const userStore = useUserStore()
        if (userStore.accessToken) {
            config.headers = config.headers || {}
            config.headers.Authorization = `Bearer ${userStore.accessToken}`
        }
        return config
    })

    // По желанию — интерцептор на ответы (обработка ошибок и т.д.)
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            // Можно проверить 401, вызвать refresh и т.д.
            return Promise.reject(error)
        },
    )

    // Возвращаем в nuxtApp
    return {
        provide: {
            axios: instance,
        },
    }
})
