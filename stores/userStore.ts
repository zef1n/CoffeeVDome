import {defineStore} from 'pinia'
import {useNuxtApp} from '#app'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        accessToken: '',
        refreshToken: '',
        user: null as UserProfile | null // или просто any, если нет чёткого интерфейса
    }),
    getters: {
        isLoggedIn: (state) => !!state.accessToken
    },
    actions: {
        async register(username: string, password: string, email?: string) {
            try {
                const {$axios} = useNuxtApp()
                const payload: Record<string, string> = {username, password}
                if (email) payload.email = email

                await $axios.post('users/auth/register/', payload)
                // После успешной регистрации, возможно, сразу логиним пользователя
                // await this.login(username, password)
            } catch (error) {
                console.error('Ошибка при регистрации:', error)
                throw error
            }
        },

        /**
         * Логин:
         * отправляем username, password на /auth/token/
         * в ответ получаем { access, refresh }, сохраняем их.
         */
        async login(username: string, password: string) {
            try {
                const {$axios} = useNuxtApp()
                const {data} = await $axios.post('users/auth/token/', {
                    username,
                    password
                })
                // Предположим, бэкенд вернул { access, refresh }
                this.setTokens(data.access, data.refresh)
            } catch (error) {
                console.error('Ошибка при логине:', error)
                throw error
            }
        },

        /**
         * Инициализирует токены из localStorage (если есть).
         * Вызывается при старте приложения (например, в onMounted).
         */
        initFromLocalStorage() {
            if (typeof window !== 'undefined') {
                const storedAccess = window.localStorage.getItem('accessToken')
                const storedRefresh = window.localStorage.getItem('refreshToken')
                if (storedAccess) {
                    this.accessToken = storedAccess
                }
                if (storedRefresh) {
                    this.refreshToken = storedRefresh
                }
            }
        },

        /**
         * Устанавливает токены в store и записывает в localStorage
         */
        setTokens(access: string, refresh: string) {
            this.accessToken = access
            this.refreshToken = refresh

            if (typeof window !== 'undefined') {
                window.localStorage.setItem('accessToken', access)
                window.localStorage.setItem('refreshToken', refresh)
            }
        },
        async fetchUserProfile() {
            try {
                const {$axios} = useNuxtApp()
                // допустим, ваш бэкенд отдаёт профиль на /profile/ или /auth/me
                const {data} = await $axios.get('users/profile/')
                // сохраняем в store
                this.user = data
            } catch (error) {
                console.error('Ошибка при запросе профиля:', error)
            }
        },
        /**
         * Очищает токены в store и в localStorage
         */
        logout() {
            this.accessToken = ''
            this.refreshToken = ''

            if (typeof window !== 'undefined') {
                window.localStorage.removeItem('accessToken')
                window.localStorage.removeItem('refreshToken')
            }
        }
    }
})