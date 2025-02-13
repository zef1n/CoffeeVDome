<template>
  <header class="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/70">
    <nav class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Логотип -->
      <div class="flex items-center space-x-2">
        <!-- Замените /logo.svg на путь к вашему логотипу -->
        <img src="" alt="Coffee Haven Logo" class="h-8 w-auto" />
        <span class="text-xl font-semibold text-gray-800">Coffee Haven</span>
      </div>
      <!-- Основное меню (десктоп) -->
      <div class="hidden md:flex space-x-8">
        <NuxtLink to="/" class="text-gray-700 hover:text-amber-700 transition">
          Home
        </NuxtLink>
        <NuxtLink to="/menu" class="text-gray-700 hover:text-amber-700 transition">
          Menu
        </NuxtLink>
        <NuxtLink to="/about" class="text-gray-700 hover:text-amber-700 transition">
          About
        </NuxtLink>
        <NuxtLink to="/contact" class="text-gray-700 hover:text-amber-700 transition">
          Contact
        </NuxtLink>
      </div>
      <!-- Кнопка "Order Now" (десктоп) -->
      <div class="hidden md:block">
        <NuxtLink
            to="/order"
            class="px-4 py-2 border border-amber-700 text-amber-700 rounded-full hover:bg-amber-700 hover:text-white transition"
        >
          Order Now
        </NuxtLink>
      </div>
      <!-- Кнопка для мобильного меню -->
      <div class="md:hidden">
        <button @click="toggleMobileMenu" class="text-gray-700 focus:outline-none">
          <MenuIcon v-if="!showMobileMenu" class="h-6 w-6" />
          <XIcon v-else class="h-6 w-6" />
        </button>
      </div>
    </nav>
    <!-- Мобильное меню -->
    <transition name="fade">
      <div
          v-if="showMobileMenu"
          class="md:hidden bg-white shadow-md border-t border-gray-200"
      >
        <div class="px-6 py-4 flex flex-col space-y-4">
          <NuxtLink
              to="/"
              class="text-gray-700 hover:text-amber-700 transition"
              @click="toggleMobileMenu"
          >
            Home
          </NuxtLink>
          <NuxtLink
              to="/menu"
              class="text-gray-700 hover:text-amber-700 transition"
              @click="toggleMobileMenu"
          >
            Menu
          </NuxtLink>
          <NuxtLink
              to="/about"
              class="text-gray-700 hover:text-amber-700 transition"
              @click="toggleMobileMenu"
          >
            About
          </NuxtLink>
          <NuxtLink
              to="/contact"
              class="text-gray-700 hover:text-amber-700 transition"
              @click="toggleMobileMenu"
          >
            Contact
          </NuxtLink>
          <NuxtLink
              to="/order"
              class="px-4 py-2 border border-amber-700 text-amber-700 rounded-full text-center hover:bg-amber-700 hover:text-white transition"
              @click="toggleMobileMenu"
          >
            Order Now
          </NuxtLink>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MenuIcon, XIcon } from '@heroicons/vue/outline'

const showMobileMenu = ref(false)
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}
</script>

<style scoped>
/* Плавное появление/исчезновение мобильного меню */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
