<script setup lang="ts">
import GameCard from '@/components/molecules/GameCard.vue'
import type { GameInfo } from '@/data/games'

defineProps<{ games: GameInfo[]; activeId: string  }>()
defineEmits<{ select: [id: string] }>()
</script>

<template>
  <aside class="sidebar" aria-label="more games">
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

<style scoped>
.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  padding: 1rem;
  background: #14161f;
  box-sizing: border-box;
  border: 4px solid #c62828;
  border-radius: 10px;
}
h2 { color: #fff; margin: 0 0 0.75rem; font-size: 1.1rem; }
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}
</style>