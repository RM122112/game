<script setup lang="ts">
import type { GameInfo } from '@/data/games'

defineProps<{ game: GameInfo; active: boolean }>()
defineEmits<{ select: [] }>()
</script>

<template>

  <button
      type="button"
      class="card"
      :class="{active}"
      :aria-pressed="active"
      @click="$emit('select')"
  >
    <img v-if="game.thumbnail" :src="game.thumbnail" :alt="''" class="thumb"/>
    <span v-else class="emoji" aria-hidden="true">{{ game.emoji }}</span>
    <span class="title">{{ game.title }}</span>
    <span v-if="game.badge" class="badge">{{ game.badge }}</span>
  </button>
</template>

<style scoped lang="scss">
@use '@/styles/abstracts' as *;

.card {
  all: unset;
  position: relative;
  aspect-ratio: 16 / 10;
  border-radius: $radius-md;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: $shadow-card;
  transition: transform 0.15s, box-shadow 0.15s;
}

.card:hover {
  transform: translateY(-2px) scale(1.02);
}

.card:focus-visible {
  @include focus-ring;
}

.card.active {
  box-shadow: $shadow-active;
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
  color: var(--on-sidebar);
  background: linear-gradient(transparent, var(--card-overlay));
}

.badge {
  position: absolute;
  top: 6px;
  left: 6px;
  padding: 2px 8px;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  font-weight: 700;
  background: var(--badge-bg);
  color: var(--badge-text);
}
</style>