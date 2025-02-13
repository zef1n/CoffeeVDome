import { defineStore } from 'pinia'
import { useNuxtApp } from '#app'

export interface Product {
    id: number
    title: string
    description: string
    price: number
    image_url?: string
    created_at?: string
}

export const useCatalogStore = defineStore('catalogStore', {
    state: () => ({
        products: [] as Product[],
        loading: false,
        error: null as string | null,
    }),
    actions: {
        async fetchProducts() {
            this.loading = true
            this.error = null
            try {
                const { $axios } = useNuxtApp()
                const { data } = await $axios.get<Product[]>('menu/products/')
                this.products = data.map(product => ({
                    ...product,
                    price: Number(product.price), // Преобразуем price в число
                    image_url: product.image_url || '/placeholder.jpg',
                }))
            } catch (error) {
                console.error('Ошибка при загрузке товаров:', error)
                this.error = 'Ошибка при загрузке товаров. Попробуйте позже.'
            } finally {
                this.loading = false
            }
        },
    },
})
