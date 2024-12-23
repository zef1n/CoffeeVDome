import { defineStore } from 'pinia'
import { useNuxtApp } from '#app'

export interface Product {
    id: number
    title: string
    description: string
    price: number
    image?: string
    created_at?: string
}

export const useCatalogStore = defineStore('catalogStore', {
    state: () => ({
        products: [] as Product[],
    }),
    actions: {
        async fetchProducts() {
            try {
                const { $axios } = useNuxtApp()
                const { data } = await $axios.get<Product[]>('/products/')
                this.products = data
            } catch (error) {
                console.error('Ошибка при загрузке товаров:', error)
            }
        },

        async createProduct(newProduct: Partial<Product>) {
            try {
                const { $axios } = useNuxtApp()
                const { data } = await $axios.post<Product>('/products/', newProduct)
                // Можно добавить этот товар в локальный стейт:
                this.products.push(data)
            } catch (error) {
                console.error('Ошибка при создании товара:', error)
            }
        },
    },
})
