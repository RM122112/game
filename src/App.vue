<script setup lang="ts">
import { computed, ref } from 'vue'
import AppLayout from '@/components/templates/AppLayout.vue'
import GameSidebar from '@/components/organisms/GameSidebar.vue'
import { games } from '@/data/games'

const activeId = ref(games[0].id)
const activeGame = computed(
    () => games.find((g) => g.id === activeId.value) ?? games[0],
)
</script>

<template>
  <AppLayout>
    <template #stage>
      <component :is="activeGame.component" :key="activeGame.id" />
    </template>
    <template #sidebar>
      <GameSidebar :games="games" :active-id="activeId" @select="activeId = $event" />
    </template>
  </AppLayout>
</template>