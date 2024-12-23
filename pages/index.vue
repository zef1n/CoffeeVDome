<template>
  <!-- Контейнер страницы -->
  <div class="min-h-screen bg-base-200 p-5 flex flex-col items-center">
    <!-- Заголовок каталога -->
    <h1 class="text-3xl font-bold mb-8">Каталог товаров</h1>

    <!-- Состояние "Загрузка" -->
    <div v-if="catalogStore.products.length === 0" class="text-center text-xl">
      Загрузка...
    </div>

    <!-- Сетка карточек товаров -->
    <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl"
        v-else
    >
      <!-- Карточка товара -->
      <div
          v-for="product in catalogStore.products"
          :key="product.id"
          class="card bg-base-100 shadow-xl transition-transform transform hover:-translate-y-1"
      >
        <figure>
          <img
              :src="product.image"
              :alt="product.title"
              class="object-cover h-48 w-full"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ product.title }}</h2>
          <p class="text-sm text-gray-500">{{ product.description }}</p>
          <p class="text-xl font-semibold mt-2">{{ product.price }} ₽</p>

          <!-- Кнопка "Добавить в корзину" -->
          <div class="card-actions justify-end">
            <button
                class="btn btn-primary"
                :disabled="!userStore.isLoggedIn"
                @click="addToCart(product.id)"
            >
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCatalogStore } from '~/stores/catalogStore'
import { useCartStore } from '~/stores/cartStore'
import { useUserStore } from '~/stores/userStore'

const catalogStore = useCatalogStore()
const cartStore = useCartStore()
const userStore = useUserStore()

// Метод добавления в корзину
const addToCart = (productId: number) => {
  // Если не авторизован, можно вместо disabled сделать редирект:
  // if (!userStore.isLoggedIn) return alert('Сначала войдите в аккаунт!')

  cartStore.addToCart(productId)
}

// При монтировании страницы загружаем товары
onMounted(() => {
  catalogStore.fetchProducts()
})
</script>
