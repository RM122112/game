<script setup lang="ts">
import { computed, ref } from 'vue'
import GameSidebar from './components/GameSidebar.vue'
import { games } from './logic/games'

const activeId = ref(games[0].id)
const activeGame = computed(
    () => games.find((g) => g.id === activeId.value) ?? games[0],
)
</script>

<template>
  <div class="layout">
    <section class="stage">
      <component :is="activeGame.component" :key="activeGame.id" />
    </section>
    <GameSidebar :games="games" :active-id="activeId" @select="activeId = $event" />
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 1fr minmax(280px, 360px);
  min-height: 100vh;
}
.stage { min-width: 0; }

@media (max-width: 900px) {
  .layout { grid-template-columns: 1fr; }
  .layout :deep(.sidebar) { position: static; height: auto; }
}
</style>