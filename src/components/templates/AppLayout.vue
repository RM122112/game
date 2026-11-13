<template>
  <div class="layout">
    <section class="stage">
      <slot name="stage" />
    </section>
    <slot name="sidebar" />
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 1fr minmax(280px, 360px);
  min-height: 100vh;
}

.stage {
  min-width: 0;
}

@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .layout :deep(.sidebar) {
    position: static;
    height: auto;
  }
}
</style>
