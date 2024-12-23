<template>
  <div class="min-h-screen bg-base-200 p-5 flex flex-col items-center">
    <h1 class="text-3xl font-bold mb-8">Корзина</h1>

    <div v-if="cartStore.isEmpty" class="text-center text-xl">
      Ваша корзина пуста
    </div>
    <div v-else class="w-full max-w-4xl">
      <div
          v-for="item in cartStore.items"
          :key="item.id"
          class="flex flex-col md:flex-row items-center justify-between bg-base-100 shadow-xl rounded-xl p-4 mb-4"
      >
        <div>
          <h3 class="text-lg font-semibold">
            {{ item.product.title }}
          </h3>
          <p class="text-sm text-gray-500">
            Цена: {{ item.product.price }} ₽
          </p>
          <p class="text-sm text-gray-500">
            Кол-во: {{ item.quantity }}
          </p>
        </div>
        <button
            class="btn btn-error btn-sm mt-2 md:mt-0"
            @click="removeItem(item.product.id)"
        >
          Удалить
        </button>
      </div>

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
