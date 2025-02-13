import {defineStore} from 'pinia'
import {useNuxtApp} from '#app'

export interface Product {
    id: number
    title: string
    price: number
    image?: string
}

/** Элемент корзины */
interface CartItem {
    id: number
    product: Product
    quantity: number
    line_total: number
}

/** Структура Order со статусом "cart" */
interface Cart {
    id: number
    status: string
    items: CartItem[]
}

export const useCartStore = defineStore('cartStore', {
    state: () => ({
        cart: null as Cart | null
    }),

    getters: {
        items(state) {
            return state.cart?.items || []
        },
        totalPrice(state) {
            return (state.cart?.items || []).reduce((sum, item) => sum + Number(item.line_total || 0), 0)
        },
        isEmpty(state) {
            return (state.cart?.items?.length || 0) === 0
        },
        hasProduct: (state) => (productId: number) => {
            return !!(state.cart?.items?.find((i) => i.product.id === productId))
        },
        getProductQuantity: (state) => (productId: number) => {
            const item = state.cart?.items?.find((i) => i.product.id === productId)
            return item ? item.quantity : 0
        },
    },

    actions: {
        /** Получить корзину (GET /cart/) */
        async fetchCart() {
            try {
                const {$axios} = useNuxtApp()
                const {data} = await $axios.get('orders/cart/')
                this.cart = data
            } catch (error) {
                console.error('Ошибка при загрузке корзины:', error)
            }
        },

        /** Добавить товар (POST /cart/add/) */
        async addToCart(productId: number, quantity = 1) {
            try {
                const {$axios} = useNuxtApp()
                await $axios.post('orders/cart/add/', {product_id: productId, quantity})
                await this.fetchCart() // Обновляем корзину после добавления
            } catch (error) {
                console.error('Ошибка при добавлении в корзину:', error)
            }
        },

        /** Изменить количество товара в корзине */
        async updateItemQuantity(productId: number, newQuantity: number) {
            try {
                const {$axios} = useNuxtApp()
                await $axios.patch('orders/cart/item/', {product_id: productId, quantity: newQuantity})
                await this.fetchCart() // Обновляем корзину после изменения количества
            } catch (error) {
                console.error('Ошибка при изменении количества товара:', error)
            }
        },

        /** Удалить товар из корзины */
        async removeFromCart(productId: number) {
            try {
                const {$axios} = useNuxtApp()
                await $axios.delete(`orders/cart/remove/${productId}/`)
                await this.fetchCart() // Обновляем корзину после удаления
            } catch (error) {
                console.error('Ошибка при удалении из корзины:', error)
            }
        },

        /** Оформить заказ */
        async checkout() {
            try {
                const {$axios} = useNuxtApp()
                await $axios.post('orders/cart/checkout/')
                this.cart = null // Очищаем корзину после успешного оформления
                alert('Заказ оформлен!')
            } catch (error) {
                console.error('Ошибка при оформлении заказа:', error)
            }
        }
    }
})
