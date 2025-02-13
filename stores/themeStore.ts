import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
    state: () => ({
        isDark: false,
    }),
    actions: {
        toggleTheme() {
            this.isDark = !this.isDark
            // Добавляем/удаляем класс 'dark' на корневом элементе
            if (this.isDark) {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
        },
        setDark(value: boolean) {
            this.isDark = value
            if (this.isDark) {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
        }
    },
})
