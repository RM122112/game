<script setup lang="ts">
import GameCard from '@/components/molecules/GameCard.vue'
import type { GameInfo } from '@/data/games'

defineProps<{ games: GameInfo[]; activeId: string  }>()
defineEmits<{ select: [id: string] }>()
</script>

<template>
  <aside class="sidebar" aria-label="Weitere Spiele">
    <h2>Weitere Spiele</h2>
    <div class="grid">
      <GameCard
          v-for="game in games"
          :key="game.id"
          :game="game"
          :active="game.id === activeId"
          @select="$emit('select', game.id)"
      />
    </div>
  </aside>
</template>

<style scoped lang="scss">
@use '@/styles/abstracts' as *;

.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  padding: $space-4;
  background: var(--sidebar-bg);
  box-sizing: border-box;
  border: 4px solid var(--sidebar-border);
  border-radius: $radius-md;
}
h2 { color: var(--on-sidebar); margin: 0 0 $space-3; font-size: $font-size-lg; }
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $space-3;
}
</style>