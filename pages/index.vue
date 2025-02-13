<template>
  <div class="min-h-screen bg-base-200 p-4 sm:p-6 flex flex-col items-center">
    <h1 class="text-2xl sm:text-3xl font-bold mb-8 text-center">
      Каталог товаров
    </h1>

    <!-- Сообщение об ошибке -->
    <div v-if="catalogStore.error" class="mb-4 text-center text-lg sm:text-xl text-red-500">
      {{ catalogStore.error }}
    </div>

    <!-- Состояние загрузки с анимированным спиннером -->
    <div v-else-if="catalogStore.loading" class="mb-8">
      <div class="flex items-center justify-center space-x-2">
        <svg class="animate-spin h-8 w-8 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        <span class="text-lg sm:text-xl text-gray-700">Загрузка...</span>
      </div>
    </div>

    <!-- Сетка карточек товаров -->
    <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl"
    >
      <div
          v-for="product in catalogStore.products"
          :key="product.id"
          class="card bg-base-100 shadow-lg transition-transform transform hover:-translate-y-1 p-4 rounded-lg w-52"
      >
        <!-- Изображение товара с обработкой ошибок -->
        <figure class="relative h-32 w-full flex items-center justify-center overflow-hidden rounded-lg">
          <img
              :src="product.image_url"
              :alt="product.title"
              class="object-cover w-full h-full transition-transform duration-200 ease-in-out hover:scale-105"
              @error="handleImageError"
          />
        </figure>

        <!-- Информация о товаре -->
        <div class="card-body p-0 mt-3 flex flex-col justify-between">
          <h2 class="text-sm font-semibold mb-1 text-center line-clamp-1">
            {{ product.title }}
          </h2>
          <p class="text-sm font-semibold text-center text-gray-800">
            {{ product.price.toFixed(2) }} ₽
          </p>

          <!-- Кнопки действий -->
          <div class="card-actions justify-center mt-3">
            <template v-if="userStore.isLoggedIn">
              <!-- Если товар уже в корзине -->
              <div v-if="cartStore.hasProduct(product.id)" class="flex items-center gap-2">
                <button
                    class="btn btn-xs btn-secondary"
                    @click="updateQuantity(product.id, cartStore.getProductQuantity(product.id) - 1)"
                    :disabled="cartStore.getProductQuantity(product.id) <= 1"
                >
                  −
                </button>
                <span class="font-semibold">
                  {{ cartStore.getProductQuantity(product.id) }}
                </span>
                <button
                    class="btn btn-xs btn-secondary"
                    @click="updateQuantity(product.id, cartStore.getProductQuantity(product.id) + 1)"
                >
                  +
                </button>
              </div>
              <!-- Если товара нет в корзине -->
              <button v-else class="btn btn-primary btn-xs" @click="addToCart(product.id)">
                В корзину
              </button>
            </template>
            <!-- Сообщение для неавторизованных пользователей -->
            <p v-else class="text-xs text-gray-500 font-semibold text-center">
              Войдите, чтобы добавить в корзину
            </p>
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

onMounted(() => {
  // Загружаем список товаров и содержимое корзины при монтировании компонента
  catalogStore.fetchProducts()
  cartStore.fetchCart()
})

// Добавление товара в корзину
const addToCart = (productId: number) => {
  cartStore.addToCart(productId)
}

// Изменение количества товара в корзине
const updateQuantity = (productId: number, newQty: number) => {
  if (newQty < 1) return
  cartStore.updateItemQuantity(productId, newQty)
}

// Обработка ошибки загрузки изображения: подставляем запасное изображение
const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = '/fallback-image.png'
}
</script>

<style scoped>
/* Ограничение вывода названия товара одной строкой */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
