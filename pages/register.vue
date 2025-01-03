<template>
  <div class="min-h-screen bg-base-200 p-3 sm:p-5 flex flex-col items-center">
    <!-- Заголовок -->
    <h1 class="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-center">
      Регистрация
    </h1>

    <form @submit.prevent="onSubmit" class="w-full max-w-sm space-y-3 sm:space-y-4">
      <input
          v-model="username"
          type="text"
          placeholder="Username"
          class="input input-bordered w-full text-sm sm:text-base"
      />
      <input
          v-model="password"
          type="password"
          placeholder="Пароль"
          class="input input-bordered w-full text-sm sm:text-base"
      />
      <input
          v-model="email"
          type="email"
          placeholder="Email (необязательно)"
          class="input input-bordered w-full text-sm sm:text-base"
      />
      <button class="btn btn-primary w-full text-sm sm:text-base" type="submit">
        Зарегистрироваться
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '~/stores/userStore'
import { useRouter } from '#app'

const userStore = useUserStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const email = ref('')

const onSubmit = async () => {
  try {
    await userStore.register(username.value, password.value, email.value)
    alert('Регистрация прошла успешно!')
    // Перенаправляем, например, на страницу логина
    router.push('/login')
  } catch (error) {
    alert('Ошибка при регистрации')
  }
}
</script>
