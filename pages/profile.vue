<template>
  <div class="min-h-screen bg-base-200 p-4 sm:p-5 flex flex-col items-center">
    <!-- Заголовок -->
    <h1 class="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
      Личный кабинет
    </h1>

    <!-- Блок: неавторизованный пользователь -->
    <div v-if="!userStore.user" class="text-center text-lg sm:text-xl">
      Не авторизован / Нет данных о пользователе
    </div>

    <!-- Блок: данные о пользователе -->
    <div
        v-else
        class="card w-full max-w-md bg-base-100 shadow-xl p-3 sm:p-5 flex flex-col items-center"
    >
      <!-- Аватар (если есть) -->
      <div v-if="userStore.user.photo_url" class="avatar mb-4">
        <!-- Для небольшой аватарки на телефонах, побольше на больших экранах -->
        <div class="w-20 sm:w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
          <img :src="userStore.user.photo_url" alt="Avatar" />
        </div>
      </div>

      <!-- Имя -->
      <p class="text-base sm:text-lg text-center">
        <strong>Имя:</strong>
        {{ userStore.user.first_name }} {{ userStore.user.last_name }}
      </p>

      <!-- Username -->
      <p class="text-sm sm:text-base text-gray-500 mt-2 text-center">
        <strong>Username:</strong> @{{ userStore.user.username }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '~/stores/userStore'

const userStore = useUserStore()

onMounted(() => {
  // При заходе на страницу — грузим профиль
  userStore.fetchUserProfile()
})
</script>
