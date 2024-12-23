<template>
  <div class="min-h-screen bg-base-200 p-5 flex flex-col items-center">
    <!-- Заголовок -->
    <h1 class="text-3xl font-bold mb-8">Личный кабинет</h1>

    <!-- Блок: неавторизованный пользователь -->
    <div v-if="!userStore.user" class="text-center text-xl">
      Не авторизован / Нет данных о пользователе
    </div>

    <!-- Блок: данные о пользователе -->
    <div
        v-else
        class="card w-full max-w-md bg-base-100 shadow-xl p-5 flex flex-col items-center"
    >
      <!-- Аватар, если есть -->
      <div v-if="userStore.user.photo_url" class="avatar mb-4">
        <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
          <img :src="userStore.user.photo_url" alt="Avatar" />
        </div>
      </div>

      <!-- Имя -->
      <p class="text-lg">
        <strong>Имя:</strong>
        {{ userStore.user.first_name }} {{ userStore.user.last_name }}
      </p>

      <!-- Username -->
      <p class="text-sm text-gray-500 mt-1">
        <strong>Username:</strong> @{{ userStore.user.username }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/userStore'
const userStore = useUserStore()
</script>
