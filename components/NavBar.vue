<!-- components/NavBar.vue -->
<template>
  <!-- Фиксированный верх, чтобы не скроллился (optional) -->
  <nav class="navbar bg-base-100 shadow-md sticky top-0 z-50">
    <!-- Левая часть (гамбургер + логотип) -->
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
               fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
        <ul tabindex="0"
            class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li><NuxtLink to="/">Каталог</NuxtLink></li>
          <li><NuxtLink to="/cart">Корзина</NuxtLink></li>
          <li><NuxtLink to="/profile">Профиль</NuxtLink></li>
        </ul>
      </div>
      <NuxtLink to="/" class="btn btn-ghost normal-case text-xl">
        Моя Кофейня
      </NuxtLink>
    </div>

    <!-- Центральная часть (меню на больших экранах) -->
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><NuxtLink to="/">Каталог</NuxtLink></li>
        <li><NuxtLink to="/cart">Корзина</NuxtLink></li>
        <li><NuxtLink to="/profile">Профиль</NuxtLink></li>
      </ul>
    </div>

    <!-- Правая часть -->
    <div class="navbar-end">
      <div v-if="!userStore.isLoggedIn">
        <!-- Если не авторизован => показываем Вход / Регистрация -->
        <NuxtLink class="btn btn-ghost mr-2" to="/login">
          Войти
        </NuxtLink>
        <NuxtLink class="btn btn-primary" to="/register">
          Регистрация
        </NuxtLink>
      </div>
      <div v-else>
        <!-- Иначе показываем кнопку Выйти -->
        <button class="btn btn-error" @click="onLogout">
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
  // Можно редиректнуть на главную
  router.push('/')
}
</script>
