<!-- app.vue -->
<template>
  <NavBar/>
  <!-- Отображение текущей страницы -->
  <NuxtPage/>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import {useUserStore} from '~/stores/userStore'
import NavBar from '~/components/NavBar.vue'

// Инициализируем userStore при загрузке (например, если вручную работаем с localStorage)
const userStore = useUserStore()
onMounted(() => {
  userStore.initFromLocalStorage() // Если вы делаете ручное хранение
})
</script>