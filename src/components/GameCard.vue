<script setup lang="ts">
import type { GameInfo } from '../logic/games'

defineProps<{ game: GameInfo; active: boolean }>()
defineEmits<{ select: [] }>()
</script>

<template>

  <button
      type="button"
      class="card"
      :class="{active}"
      :style="{ background: game.thumbnail ? undefined : game.color }"
      :aria-pressed="active"
      @click="$emit('select')"
  >
    <img v-if="game.thumbnail" :src="game.thumbnail" :alt="''" class="thumb"/>
    <span v-else class="emoji" aria-hidden="true">{{ game.emoji }}</span>
    <span class="title">{{ game.title }}</span>
    <span v-if="game.badge" class="badge">{{ game.badge }}</span>
  </button>
</template>

<style scoped>
.card {
  all: unset;
  position: relative;
  aspect-ratio: 16 / 10;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.25);
  transition: transform 0.15s, box-shadow 0.15s;
}

.card:hover {
  transform: translateY(-2px) scale(1.02);
}

.card:focus-visible {
  outline: 3px solid #fff;
  outline-offset: 2px;
}

.card.active {
  box-shadow: 0 0 0 3px #fff, 0 4px 14px rgb(0 0 0 / 0.4);
}

.thumb {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.emoji {
  font-size: 2.6rem;
}

.title {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.4rem 0.6rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(transparent, rgb(0 0 0 / 0.6));
}

.badge {
  position: absolute;
  top: 6px;
  left: 6px;
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  background: #fff;
  color: #5b3df5;
}
</style>