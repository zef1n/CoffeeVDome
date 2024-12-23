// stores/userStore.ts
import {defineStore} from 'pinia'

interface UserState {
    accessToken: string
    refreshToken: string
}

export const useUserStore = defineStore('userStore', {
    state: (): UserState => ({
        accessToken: '',
        refreshToken: ''
    }),

    getters: {
        isLoggedIn: (state) => !!state.accessToken
    },

    actions: {
        setTokens(access: string, refresh: string) {
            this.accessToken = access
            this.refreshToken = refresh
        },
        logout() {
            this.accessToken = ''
            this.refreshToken = ''
        }
    },

    // Настраиваем persisted state
    persist: {
        key: 'my-app-user',
        paths: ['accessToken']// можно любое название
        // или просто true, тогда по умолчанию key = 'userStore'
        // persist: true,

        // Можно указать partial настройки storage,
        // но мы уже переопределили в плагине piniaPluginPersistedstate(...)
    }
})
