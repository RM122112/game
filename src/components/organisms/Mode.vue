
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import ToggleSwitch from 'primevue/toggleswitch'
import Sun from '@primeicons/vue/sun'
import Moon from '@primeicons/vue/moon'

const STORAGE_KEY = 'vue-game-hub-theme'
const darkMode = ref(false)

function applyTheme(isDark: boolean): void {
  const root = document.documentElement
  root.classList.toggle('my-app-dark', isDark)
  root.classList.toggle('my-app-light', !isDark)
}

function systemPrefersDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

onMounted(() => {
  const storedTheme = localStorage.getItem(STORAGE_KEY)
  darkMode.value = storedTheme === 'dark'
    ? true
    : storedTheme === 'light'
      ? false
      : systemPrefersDark()
  applyTheme(darkMode.value)
})

watch(darkMode, (isDark) => {
  applyTheme(isDark)
  localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light')
})
</script>

<template>
  <ToggleSwitch
    v-model="darkMode"
    :aria-label="darkMode ? 'Dunkelmodus deaktivieren' : 'Dunkelmodus aktivieren'"
  >
    <template #handle="{ checked }">
      <Moon v-if="checked" />
      <Sun v-else />
    </template>
  </ToggleSwitch>
</template>
