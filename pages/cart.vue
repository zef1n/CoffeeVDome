<template>
  <div class="min-h-screen bg-base-200 p-4 sm:p-5 flex flex-col items-center">
    <h1 class="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
      Корзина
    </h1>

    <!-- Пустая корзина -->
    <div v-if="!cartStore.cart || cartStore.isEmpty" class="text-center text-lg sm:text-xl">
      Ваша корзина пуста
    </div>

    <!-- Содержимое корзины -->
    <div v-else class="w-full max-w-4xl">
      <div
          v-for="item in cartStore.items"
          :key="item.id"
          class="flex flex-col sm:flex-row sm:items-center justify-between bg-base-100 shadow-xl rounded-xl p-3 sm:p-4 mb-4 cart-item"
      >
        <!-- Товар -->
        <div class="flex gap-3 items-start sm:items-center cart-item-img">
          <img
              :src="item.product.image"
              alt="Изображение товара"
              class="h-20 w-20 sm:h-24 sm:w-24 object-cover rounded-lg"
          />
          <div>
            <h3 class="text-base sm:text-lg font-semibold">
              {{ item.product.title }}
            </h3>
            <p class="text-xs sm:text-sm text-gray-500 mt-1">
              Цена: {{ item.product.price }} ₽
            </p>
          </div>
        </div>

        <!-- Управление количеством и удалением -->
        <div class="flex flex-row flex-wrap items-center gap-2 sm:gap-4 mt-3 sm:mt-0 cart-actions">
          <!-- Количество -->
          <div class="flex items-center gap-2 sm:gap-3">
            <button
                class="btn btn-secondary btn-sm"
                @click="decreaseQuantity(item)"
                :disabled="item.quantity <= 1"
            >
              −
            </button>
            <p class="text-sm sm:text-lg font-semibold">
              {{ item.quantity }}
            </p>
            <button
                class="btn btn-secondary btn-sm"
                @click="increaseQuantity(item)"
            >
              +
            </button>
          </div>

          <!-- Удаление -->
          <button
              class="btn btn-error btn-sm"
              @click="removeItem(item)"
          >
            Удалить
          </button>
        </div>
      </div>

      <!-- Итого -->
      <div class="mt-6 sm:mt-8 text-right">
        <h2 class="text-xl sm:text-2xl font-bold">
          Итого: {{ cartStore.totalPrice }} ₽
        </h2>
        <button class="btn btn-primary mt-3" @click="checkout">
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import {useCartStore} from '~/stores/cartStore'

const cartStore = useCartStore()

onMounted(() => {
  cartStore.fetchCart()
})

// Логика уменьшения/увеличения/удаления
const decreaseQuantity = (item: any) => {
  if (item.quantity > 1) {
    cartStore.updateItemQuantity(item.product.id, item.quantity - 1)
  }
}

const increaseQuantity = (item: any) => {
  cartStore.updateItemQuantity(item.product.id, item.quantity + 1)
}

const removeItem = (item: any) => {
  cartStore.removeFromCart(item.product.id)
}

const checkout = () => {
  cartStore.checkout()
}
</script>

<style scoped>
/* Дополнительная адаптация, если нужно
   (можно использовать медиаклассы Tailwind, но иногда
    хочется тонкой донастройки) */

@media (max-width: 640px) {
  /* cart-item: переведём в колонку, если ещё не сделали
     через Tailwind. Если уже используем flex-col, можно опустить. */
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .cart-item-img {
    margin-bottom: 8px;
  }

  .cart-actions {
    margin-top: 8px;
  }
}
</style>
