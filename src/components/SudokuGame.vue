<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from 'vue'
import SudokuBoard from './SudokuBoard.vue'
import {
  DIFFICULTIES,
  generatePuzzle,
  type Difficulty,
  type Grid,
} from '../logic/sudoku'

const difficulty = ref<Difficulty>('leicht')
const grid = ref<Grid>(new Array(81).fill(0))
const solution = ref<Grid>([])
const givens = ref<boolean[]>(new Array(81).fill(false))
const selected = ref<number | null>(null)
const showErrors = ref(true)
const mistakes = ref(0)
const seconds = ref(0)
const loading = ref(false)
const isTimerPaused = ref(false)

let timer: number | undefined

const difficultyKeys = Object.keys(DIFFICULTIES) as Difficulty[]

/**
 * Fehler = eingetragene Zahl passt nicht zur (eindeutigen) Lösung.
 * Doppelte Zahlen sind dadurch automatisch abgedeckt, ohne dass die
 * richtige Zahl des Paares fälschlich mitmarkiert wird.
 */
const errors = computed<Set<number>>(() => {
  const set = new Set<number>()
  if (!showErrors.value || solution.value.length === 0) return set
  grid.value.forEach((v: number, i: number) => {
    if (v !== 0 && !givens.value[i] && v !== solution.value[i]) set.add(i)
  })
  return set
})

const solved = computed(
    () =>
        solution.value.length === 81 &&
        grid.value.every((v, i) => v === solution.value[i]),
)

/** Wie oft jede Ziffer schon korrekt gesetzt ist (für den Ziffernblock). */
const digitDone = computed(() => {
  const counts = new Array(10).fill(0)
  grid.value.forEach((v, i) => {
    if (v !== 0 && v === solution.value[i]) counts[v]++
  })
  return counts.map((c) => c >= 9)
})

const timeLabel = computed(() => {
  const m = Math.floor(seconds.value / 60)
  const s = seconds.value % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
})

function startTimer() {
  stopTimer()
  seconds.value = 0
  runTimer()
}

function runTimer() {
  timer = window.setInterval(() => {
    if (!solved.value) seconds.value++
  }, 1000)
}

function resetTimer() {
  seconds.value = 0
}

function pauseTimer() {
  if (timer !== undefined) {
    window.clearInterval(timer)
    timer = undefined
    isTimerPaused.value = true
  } else {
    runTimer()
    isTimerPaused.value = false
  }
}

function stopTimer() {
  if (timer !== undefined) window.clearInterval(timer)
  timer = undefined
  isTimerPaused.value = false
}

function newGame(level: Difficulty = difficulty.value) {
  difficulty.value = level
  loading.value = true
  selected.value = null
  // Kurz warten, damit "Erzeuge Rätsel…" gerendert wird, bevor gerechnet wird
  setTimeout(() => {
    const {puzzle, solution: sol} = generatePuzzle(level)
    grid.value = [...puzzle]
    solution.value = sol
    givens.value = puzzle.map((v) => v !== 0)
    mistakes.value = 0
    loading.value = false
    startTimer()
  }, 20)
}

function setValue(value: number) {
  const i = selected.value
  if (i === null || givens.value[i] || solved.value) return
  if (value !== 0 && value !== grid.value[i] && value !== solution.value[i]) {
    mistakes.value++
  }
  const next = [...grid.value]
  next[i] = grid.value[i] === value ? 0 : value
  grid.value = next
}

function moveSelection(dr: number, dc: number) {
  const i = selected.value ?? 40
  const r = (Math.floor(i / 9) + dr + 9) % 9
  const c = ((i % 9) + dc + 9) % 9
  selected.value = r * 9 + c
}

function onKey(e: KeyboardEvent) {
  if (loading.value) return
  if (/^[1-9]$/.test(e.key)) setValue(Number(e.key))
  else if (['Backspace', 'Delete', '0'].includes(e.key)) setValue(0)
  else if (e.key === 'ArrowUp') moveSelection(-1, 0)
  else if (e.key === 'ArrowDown') moveSelection(1, 0)
  else if (e.key === 'ArrowLeft') moveSelection(0, -1)
  else if (e.key === 'ArrowRight') moveSelection(0, 1)
  else return
  e.preventDefault()
}

onMounted(() => {
  window.addEventListener('keydown', onKey)
  newGame('leicht')
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  stopTimer()
})
</script>

<template>
  <main>
    <h1>Sudoku</h1>

    <nav class="levels" aria-label="Schwierigkeitsgrad">
      <button
          v-for="key in difficultyKeys"
          :key="key"
          type="button"
          :class="{ active: key === difficulty }"
          :disabled="loading"
          @click="newGame(key)"
      >
        {{ DIFFICULTIES[key].label }}
      </button>
    </nav>

    <div class="status">
      <span>⏱ {{ timeLabel }}</span>

      <button
          type="button"
          @click="pauseTimer"
          :disabled="loading"
      >
        {{ isTimerPaused ? '▶' : '⏸' }}
      </button>
      <span>Fehler: {{ mistakes }}</span>
      <label class="toggle">
        <input v-model="showErrors" type="checkbox"/>
        Fehler markieren
      </label>
      <button
          type="button"
          @click="resetTimer"
          :disabled="loading">
        ⏱ Reset
      </button>
    </div>

    <div class="board-wrap">
      <SudokuBoard
          :grid="grid"
          :givens="givens"
          :errors="errors"
          :selected="selected"
          @select="selected = $event"
      />
      <div v-if="loading" class="overlay">Erzeuge Rätsel …</div>
      <div v-else-if="solved" class="overlay win">
        <strong>Gelöst! 🎉</strong>
        <span>{{ DIFFICULTIES[difficulty].label }} in {{ timeLabel }} · {{ mistakes }} Fehler</span>
        <button type="button" @click="newGame()">new game</button>
      </div>
    </div>

    <div class="pad">
      <button
          v-for="n in 9"
          :key="n"
          type="button"
          :class="{ done: digitDone[n] }"
          @click="setValue(n)"
      >
        {{ n }}
      </button>
      <button type="button" class="erase" @click="setValue(0)">Löschen</button>
    </div>

    <button type="button" class="new" :disabled="loading" @click="newGame()">
      new game
    </button>

    <p class="hint">Tastatur: Ziffern 1–9, Pfeiltasten, Entf/Backspace zum Löschen</p>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 0.5rem 3rem;
}

h1 {
  margin: 0;
  letter-spacing: 0.15em;
  font-weight: 800;
}

.levels {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
  justify-content: center;
}

.levels button.active {
  background: var(--ink);
  color: var(--paper);
}

.status {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  font-variant-numeric: tabular-nums;
}

.toggle {
  display: flex;
  gap: 0.35rem;
  align-items: center;
  cursor: pointer;
}

.board-wrap {
  position: relative;
}

.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--paper) 85%, transparent);
  font-size: 1.2rem;
}

.overlay.win strong {
  font-size: 2rem;
}

.pad {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.4rem;
  width: min(92vw, 30rem);
}

.pad button {
  font-size: 1.3rem;
  padding: 0.6rem 0;
}

.pad button.done {
  opacity: 0.3;
}

.pad .erase {
  font-size: 0.95rem;
}

.hint {
  color: var(--muted);
  font-size: 0.85rem;
  margin: 0;
  text-align: center;
}
</style>
