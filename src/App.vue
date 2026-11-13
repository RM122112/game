<script setup lang="ts">
import { computed, ref } from 'vue'
import AppLayout from '@/components/templates/AppLayout.vue'
import GameSidebar from '@/components/organisms/GameSidebar.vue'
import { games } from '@/data/games'
import Mode from '@/components/organisms/Mode.vue'

const activeId = ref(games[0].id)
const activeGame = computed(
    () => games.find((g) => g.id === activeId.value) ?? games[0],
)
</script>

<template>
  <AppLayout>
    <template #stage>
      <div class="stage-content">
        <div class="mode-bar">
          <Mode />
        </div>
        <component :is="activeGame.component" :key="activeGame.id" />
      </div>
    </template>
    <template #sidebar>
      <GameSidebar :games="games" :active-id="activeId" @select="activeId = $event" />
    </template>
  </AppLayout>
</template>

<style scoped lang="scss">
.stage-content {
  position: relative;
  min-height: 100%;
}

.mode-bar {
  display: flex;
  justify-content: flex-end;
  padding: 1rem 1.5rem 0;
}
</style>