<script setup lang="ts">
import { computed } from 'vue'
import type { Grid } from '@/games/sudoku/sudoku'

const props = defineProps<{
  grid: Grid
  givens: boolean[]
  errors: Set<number>
  selected: number | null
}>()

const emit = defineEmits<{ select: [index: number] }>()

const selectedValue = computed(() =>
  props.selected !== null ? props.grid[props.selected] : 0,
)

function isPeer(i: number): boolean {
  const s = props.selected
  if (s === null || s === i) return false
  const sameRow = Math.floor(i / 9) === Math.floor(s / 9)
  const sameCol = i % 9 === s % 9
  const sameBox =
    Math.floor(i / 27) === Math.floor(s / 27) &&
    Math.floor((i % 9) / 3) === Math.floor((s % 9) / 3)
  return sameRow || sameCol || sameBox
}

function cellClass(i: number) {
  const c = i % 9
  const r = Math.floor(i / 9)
  return {
    given: props.givens[i],
    error: props.errors.has(i),
    selected: props.selected === i,
    peer: isPeer(i),
    same: selectedValue.value !== 0 && props.grid[i] === selectedValue.value,
    'border-right': c === 2 || c === 5,
    'border-bottom': r === 2 || r === 5,
  }
}
</script>

<template>
  <div class="board" role="grid" aria-label="Sudoku-Spielfeld">
    <button
      v-for="(value, i) in props.grid"
      :key="i"
      type="button"
      class="cell"
      :class="cellClass(i)"
      :aria-label="`Zeile ${Math.floor(i / 9) + 1}, Spalte ${(i % 9) + 1}${value ? ', ' + value : ', leer'}`"
      @click="emit('select', i)"
    >
      {{ value || '' }}
    </button>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/abstracts' as *;

.board {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  width: min(92vw, 30rem);
  aspect-ratio: 1;
  border: 3px solid var(--ink);
  background: var(--ink);
  gap: 1px;
}

.cell {
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--paper);
  font-size: clamp($font-size-lg, 4.5vw, 1.7rem);
  color: var(--user);
  cursor: pointer;
  user-select: none;
  transition: background 0.1s;
}

.cell { box-sizing: border-box; }
.cell.border-right { border-right: 2px solid var(--ink); }
.cell.border-bottom { border-bottom: 2px solid var(--ink); }

.cell.given { color: var(--ink); font-weight: 700; }
.cell.peer { background: var(--peer); }
.cell.same { background: var(--same); }
.cell.selected { background: var(--select); }
.cell.error { color: var(--error); background: var(--error-bg); }
.cell.selected.error { background: var(--error-bg-strong); }
.cell:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }
</style>
