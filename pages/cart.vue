<template>
  <div class="min-h-screen bg-base-200 p-5 flex flex-col items-center">
    <h1 class="text-3xl font-bold mb-8">Корзина</h1>

    <!-- Блок: Пустая корзина -->
    <div v-if="!cartStore.cart || cartStore.isEmpty" class="text-center text-xl">
      Ваша корзина пуста
    </div>

    <!-- Блок: Содержимое корзины -->
    <div v-else class="w-full max-w-4xl">
      <!-- Список товаров -->
      <div
        v-for="item in cartStore.items"
        :key="item.id"
        class="flex flex-col md:flex-row items-center justify-between bg-base-100 shadow-xl rounded-xl p-4 mb-4"
      >
        <!-- Описание товара -->
        <div class="flex items-center gap-4">
          <img
            :src="item.product.image"
            alt="Изображение товара"
            class="h-24 w-24 object-cover rounded-lg"
          />
          <div>
            <h3 class="text-lg font-semibold">
              {{ item.product.title }}
            </h3>
            <p class="text-sm text-gray-500">
              Цена: {{ item.product.price }} ₽
            </p>
          </div>
        </div>

        <!-- Управление количеством -->
        <div class="flex items-center gap-4">
          <button
            class="btn btn-secondary btn-sm"
            :disabled="item.quantity <= 1"
            @click="decreaseQuantity(item)"
          >
            −
          </button>
          <p class="text-lg font-semibold">
            {{ item.quantity }}
          </p>
          <button
            class="btn btn-secondary btn-sm"
            @click="increaseQuantity(item)"
          >
            +
          </button>
        </div>

        <!-- Удаление товара -->
        <button
          class="btn btn-error btn-sm"
          @click="confirmRemoveItem(item)"
        >
          Удалить
        </button>
      </div>

      <!-- Итоговая информация -->
      <div class="mt-8 text-right">
        <h2 class="text-2xl font-bold">
          Итого: {{ cartStore.totalPrice }} ₽
        </h2>
        <button class="btn btn-primary mt-4" @click="checkout">
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCartStore } from '~/stores/cartStore'

const cartStore = useCartStore()

onMounted(() => {
  cartStore.fetchCart()
})

const removeItem = (productId: number) => {
  cartStore.removeFromCart(productId)
}

const checkout = () => {
  cartStore.checkout()
}
</script>