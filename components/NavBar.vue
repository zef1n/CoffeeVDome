<template>
  <!-- Верхняя панель (десктоп) - зафиксирована сверху, поверх всего -->
  <nav
      class="fixed top-0 left-0 w-full bg-base-100 shadow-md p-2 sm:p-3 hidden lg:flex
           items-center z-50"
  >
    <!-- Левая часть (логотип) -->
    <div class="navbar-start flex-1">
      <NuxtLink to="/" class="btn btn-ghost normal-case text-xl">
        Кофе в доме
      </NuxtLink>
    </div>

    <!-- Центральная часть (иконки / пункты) -->
    <div class="navbar-center flex-none">
      <ul class="menu menu-horizontal px-1 gap-2">
        <li>
          <NuxtLink to="/" class="p-2" title="Главная">
            <HomeIcon class="w-5 h-5" />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/cart" class="p-2" title="Корзина">
            <ShoppingCartIcon class="w-5 h-5" />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/profile" class="p-2" title="Профиль">
            <UserIcon class="w-5 h-5" />
          </NuxtLink>
        </li>
      </ul>
    </div>

    <!-- Правая часть (авторизация) -->
    <div class="navbar-end flex-none">
      <div v-if="!userStore.isLoggedIn" class="flex items-center gap-2">
        <NuxtLink
            to="/login"
            class="btn btn-ghost btn-sm flex items-center gap-1"
            title="Войти"
        >
          <LockClosedIcon class="w-4 h-4" />
          <span class="hidden sm:inline">Войти</span>
        </NuxtLink>
        <NuxtLink
            to="/register"
            class="btn btn-primary btn-sm flex items-center gap-1"
            title="Регистрация"
        >
          <PencilIcon class="w-4 h-4" />
          <span class="hidden sm:inline">Регистрация</span>
        </NuxtLink>
      </div>
      <div v-else>
        <button
            class="btn btn-error btn-sm flex items-center gap-1"
            @click="onLogout"
            title="Выйти"
        >
          <ArrowLeftIcon class="w-4 h-4" />
          <span class="hidden sm:inline">Выйти</span>
        </button>
      </div>
    </div>
  </nav>

  <!-- Мобильная панель (иконки внизу) - зафиксирована снизу, поверх всего -->
  <div
      class="fixed bottom-0 left-0 w-full bg-base-100 p-2 shadow-inner flex justify-around items-center
           lg:hidden z-50"
  >
    <!-- Иконка "Главная" -->
    <NuxtLink to="/" class="p-2" title="Главная">
      <HomeIcon class="w-6 h-6 text-gray-600 hover:text-gray-800" />
    </NuxtLink>

    <!-- Иконка "Корзина" -->
    <NuxtLink to="/cart" class="p-2" title="Корзина">
      <ShoppingCartIcon class="w-6 h-6 text-gray-600 hover:text-gray-800" />
    </NuxtLink>

    <!-- Иконка "Профиль / Вход" -->
    <NuxtLink
        v-if="!userStore.isLoggedIn"
        to="/login"
        class="p-2"
        title="Войти"
    >
      <UserIcon class="w-6 h-6 text-gray-600 hover:text-gray-800" />
    </NuxtLink>
    <button
        v-else
        class="p-2"
        @click="onLogout"
        title="Выйти"
    >
      <ArrowLeftIcon class="w-6 h-6 text-gray-600 hover:text-gray-800" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/userStore'
import { useRouter } from '#app'

// Иконки Heroicons (outline версия)
import {
  HomeIcon,
  ShoppingCartIcon,
  UserIcon,
  LockClosedIcon,
  PencilIcon,
  ArrowLeftIcon
} from '@heroicons/vue/outline'

const userStore = useUserStore()
const router = useRouter()

const onLogout = () => {
  userStore.logout()
  router.push('/')
}
</script>

<style scoped>
/* Можно добавить отступы для контента,
   чтобы не перекрывать верхней и нижней панелью.

   Пример:
   body, main {
     padding-top: 64px;   // высота nav
     padding-bottom: 56px; // высота bottom nav
   }
*/

/* При желании подправить стили иконок */
.menu li > a > svg,
.menu li > button > svg {
  width: 1.25rem;
  height: 1.25rem;
}
</style>
