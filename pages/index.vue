<!-- pages/index.vue -->
<template>
  <div class="min-h-screen bg-base-200 p-4 sm:p-5 flex flex-col items-center">
    <!-- Заголовок -->
    <h1 class="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
      Каталог товаров
    </h1>

    <!-- Если пока нет товаров, выводим "Загрузка..." -->
    <div
        v-if="catalogStore.products.length === 0"
        class="text-center text-lg sm:text-xl"
    >
      Загрузка...
    </div>

    <!-- Иначе сетка карточек -->
    <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-6xl"
    >
      <div
          v-for="product in catalogStore.products"
          :key="product.id"
          class="card bg-base-100 shadow-xl transition-transform transform hover:-translate-y-1 p-2"
      >
        <!-- Изображение товара -->
        <figure>
          <img
              :src="product.image"
              :alt="product.title"
              class="object-cover w-full h-40 sm:h-48 rounded-t-lg"
          />
        </figure>

        <!-- Карточка с описанием -->
        <div class="card-body p-3 sm:p-4">
          <!-- Заголовок + иконка избранного -->
          <div class="flex items-center justify-between mb-1">
            <h2 class="text-sm sm:text-base md:text-lg font-semibold line-clamp-1">
              {{ product.title }}
            </h2>

            <!-- Иконка звезды (избранное) -->
            <button
                class="text-yellow-500 hover:text-yellow-600"
                @click="toggleFavorite(product)"
                title="Добавить в избранное"
            >
              ★
            </button>
          </div>

          <!-- Описание -->
          <p class="text-xs sm:text-sm text-gray-500 line-clamp-2">
            {{ product.description }}
          </p>

          <!-- Цена -->
          <p class="text-base sm:text-xl font-semibold mt-2">
            {{ product.price }} ₽
          </p>

          <!-- Действия (кнопки) -->
          <div class="card-actions justify-end mt-2 sm:mt-4">
            <!-- Если не авторизован -->
            <p
                v-if="!userStore.isLoggedIn"
                class="text-xs sm:text-sm text-gray-500 font-semibold"
            >
              Зайдите в аккаунт, чтобы добавить в корзину
            </p>

            <!-- Если авторизован -->
            <template v-else>
              <!-- Если товар уже в корзине -->
              <div v-if="cartStore.hasProduct(product.id)" class="flex items-center gap-2">
                <button
                    class="btn btn-xs sm:btn-sm btn-secondary"
                    @click="updateQuantity(product.id, cartStore.getProductQuantity(product.id) - 1)"
                    :disabled="cartStore.getProductQuantity(product.id) <= 1"
                >
                  −
                </button>
                <span class="font-semibold">
                  {{ cartStore.getProductQuantity(product.id) }}
                </span>
                <button
                    class="btn btn-xs sm:btn-sm btn-secondary"
                    @click="updateQuantity(product.id, cartStore.getProductQuantity(product.id) + 1)"
                >
                  +
                </button>
              </div>

              <!-- Если товара нет в корзине -->
              <button
                  v-else
                  class="btn btn-primary btn-sm"
                  @click="addToCart(product.id)"
              >
                Добавить в корзину
              </button>
            </template>
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
  // Загружаем список товаров и корзину при загрузке страницы
  catalogStore.fetchProducts()
  cartStore.fetchCart()
})

// Добавление в корзину
const addToCart = (productId: number) => {
  cartStore.addToCart(productId)
}

// Изменение количества
const updateQuantity = (productId: number, newQty: number) => {
  if (newQty < 1) return
  cartStore.updateItemQuantity(productId, newQty)
}

// "Избранное" (упрощённый пример)
const toggleFavorite = (product: any) => {
  alert(`Здесь логика добавления/удаления товара "${product.title}" в избранное.`)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
