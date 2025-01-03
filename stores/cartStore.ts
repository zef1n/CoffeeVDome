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
            if (!state.cart?.items) return 0
            return state.cart.items.reduce((sum, item) => sum + item.line_total, 0)
        },
        isEmpty(state) {
            return (state.cart?.items?.length || 0) === 0
        },
        hasProduct: (state) => (productId: number) => {
            return !!state.cart?.items.find((i) => i.product.id === productId)
        },
        getProductQuantity: (state) => (productId: number) => {
            const item = state.cart?.items.find((i) => i.product.id === productId)
            return item ? item.quantity : 0
        },
    },

    actions: {
        // 1. Получить корзину (GET /cart/)
        async fetchCart() {
            try {
                const {$axios} = useNuxtApp()
                // Обратите внимание на URL. Если у вас prefix /api, укажите /api/cart/
                const {data} = await $axios.get('/cart/')
                console.log('Данные корзины:', data) // Вывод данных для отладки
                this.cart = data
            } catch (error) {
                console.error('Ошибка при загрузке корзины:', error)
            }
        },

        // 2. Добавить товар (POST /cart/add/)
        async addToCart(productId: number, quantity = 1) {
            try {
                const {$axios} = useNuxtApp()
                await $axios.post('/cart/add/', {product_id: productId, quantity})
                await this.fetchCart()
            } catch (error) {
                console.error('Ошибка при добавлении в корзину:', error)
            }
        },

        async updateItemQuantity(productId: number, newQuantity: number) {
            try {
                const {$axios} = useNuxtApp()
                // PATCH-запрос: /api/cart/item/, передаём { product_id, quantity }
                await $axios.patch('/cart/item/', {
                    product_id: productId,
                    quantity: newQuantity
                })
                await this.fetchCart()
            } catch (error) {
                console.error('Ошибка при изменении количества товара:', error)
            }
        },

        async removeFromCart(productId: number) {
            try {
                const {$axios} = useNuxtApp()
                await $axios.delete(`/cart/remove/${productId}/`)
                await this.fetchCart()
            } catch (error) {
                console.error('Ошибка при удалении из корзины:', error)
            }
        },

        async checkout() {
            try {
                const {$axios} = useNuxtApp()
                await $axios.post('/cart/checkout/')
                await this.fetchCart()
                alert('Заказ оформлен!')
            } catch (error) {
                console.error('Ошибка при оформлении заказа:', error)
            }
        }
    }
})
