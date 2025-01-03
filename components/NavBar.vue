<!-- components/NavBar.vue -->
<template>
  <!-- Фиксированный верх (не скроллится) -->
  <nav class="navbar bg-base-100 shadow-md sticky top-0 z-50 p-2 sm:p-3">
    <!-- Левая часть (гамбургер + логотип) -->
    <div class="navbar-start">
      <!-- Гамбургер-меню (только на маленьких экранах) -->
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <!-- Иконка гамбургера -->
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
        <!-- Выпадающее меню при клике -->
        <ul
            tabindex="0"
            class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-40"
        >
          <li><NuxtLink to="/" class="text-sm">Каталог</NuxtLink></li>
          <li><NuxtLink to="/cart" class="text-sm">Корзина</NuxtLink></li>
          <li><NuxtLink to="/profile" class="text-sm">Профиль</NuxtLink></li>
        </ul>
      </div>
      <!-- Логотип / Название -->
      <NuxtLink to="/" class="btn btn-ghost normal-case text-base sm:text-xl ml-2">
        Моя Кофейня
      </NuxtLink>
    </div>

    <!-- Центральная часть (горизонтальное меню - только на больших экранах) -->
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><NuxtLink to="/" class="text-sm sm:text-base">Каталог</NuxtLink></li>
        <li><NuxtLink to="/cart" class="text-sm sm:text-base">Корзина</NuxtLink></li>
        <li><NuxtLink to="/profile" class="text-sm sm:text-base">Профиль</NuxtLink></li>
      </ul>
    </div>

    <!-- Правая часть (авторизация) -->
    <div class="navbar-end">
      <div v-if="!userStore.isLoggedIn" class="flex items-center gap-2">
        <!-- Если не авторизован: кнопки "Войти" / "Регистрация" -->
        <NuxtLink class="btn btn-ghost btn-sm sm:btn-md" to="/login">
          Войти
        </NuxtLink>
        <NuxtLink class="btn btn-primary btn-sm sm:btn-md" to="/register">
          Регистрация
        </NuxtLink>
      </div>
      <div v-else>
        <!-- Иначе показываем кнопку "Выйти" -->
        <button class="btn btn-error btn-sm sm:btn-md" @click="onLogout">
          Выйти
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/userStore'
import { useRouter } from '#app'

const userStore = useUserStore()
const router = useRouter()

const onLogout = () => {
  userStore.logout()
  // Редирект на главную
  router.push('/')
}
</script>
