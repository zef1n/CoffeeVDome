// cartStore.ts (Pinia)
import {defineStore} from 'pinia'
import {useNuxtApp} from '#app'

export interface Product {
    id: number
    title: string
    price: number
}

interface CartItem {
    id: number
    product: Product
    quantity: number
}

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
            return state.cart.items.reduce(
                (sum, item) => sum + (item.product.price * item.quantity),
                0
            )
        },
        isEmpty(state) {
            return (state.cart?.items?.length || 0) === 0
        }
    },
    actions: {
        // 1. Получить корзину (GET /cart/)
        async fetchCart() {
            try {
                const {$axios} = useNuxtApp()
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
                await $axios.post('/cart/add/', {
                    product_id: productId,
                    quantity
                })
                await this.fetchCart()
            } catch (error) {
                console.error('Ошибка при добавлении в корзину:', error)
            }
        },

        // 3. Удалить товар (DELETE /cart/remove/<product_id>/)
        async removeFromCart(productId: number) {
            try {
                const {$axios} = useNuxtApp()
                await $axios.delete(`/cart/remove/${productId}/`)
                await this.fetchCart()
            } catch (error) {
                console.error('Ошибка при удалении из корзины:', error)
            }
        },

        // 4. Оформить заказ (POST /cart/checkout/)
        async checkout() {
            try {
                const {$axios} = useNuxtApp()
                await $axios.post('/cart/checkout/')
                // после оформления status='completed'
                await this.fetchCart()
                alert('Заказ оформлен!')
            } catch (error) {
                console.error('Ошибка при оформлении заказа:', error)
            }
        }
    }
})
