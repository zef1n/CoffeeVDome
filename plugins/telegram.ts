
import { defineNuxtPlugin } from '#app'

declare global {
    interface Window {
        Telegram: any // При необходимости можно описать типы подробнее
    }
}

export default defineNuxtPlugin(() => {
    // Плагин для удобного доступа к Telegram WebApp API
    const tg = process.client ? window.Telegram?.WebApp : null

    // Если нужно инициализировать WebApp при старте
    if (tg) {
        tg.ready() // сообщает Telegram, что WebApp инициализировано
    }

    return {
        provide: {
            telegram: {
                webApp: tg
            }
        }
    }
})
