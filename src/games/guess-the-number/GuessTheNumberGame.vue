<script setup lang="ts">
import { ref } from 'vue'
import { createGuessGame } from './guessTheNumber'

const guess = ref<number | null>(null)
const feedback = ref<string | null>(null)
const game = createGuessGame()

function makeGuess() {
  if (guess.value === null) {
    feedback.value = 'Bitte gib eine Zahl ein.'
    return
  }

  feedback.value = game.guessNumber(guess.value)
}

function resetGame() {
  game.reset()
  guess.value = null
  feedback.value = null
}
</script>

<template>
  <main class="guess-game">
    <h1>Zahlenraten</h1>
    <p>Wähle eine Zahl zwischen 1 und 200.</p>

    <form class="guess-form" @submit.prevent="makeGuess">
      <label for="guess">Deine Zahl</label>
      <input
          id="guess"
          v-model.number="guess"
          type="number"
          min="1"
          max="200"
          required
      />
      <button type="submit">Raten</button>
    </form>

    <p v-if="feedback" aria-live="polite">{{ feedback }}</p>
    <button type="button" @click="resetGame">Zurücksetzen</button>
  </main>
</template>

<style scoped lang="scss">
@use '@/styles/abstracts' as *;

.guess-game {
  display: grid;
  justify-items: center;
  gap: $space-4;
  width: min(100% - #{$space-4 * 2}, 28rem);
  margin: $space-6 auto;
  padding: $space-5;
  text-align: center;
  border: 1px solid var(--error);
  border-radius: $radius-lg;
  background: linear-gradient(90deg, var(--error-bg) 0%, var(--error-bg-strong) 100%);
}

.guess-game h1,
.guess-game p {
  margin: 0;
}

.guess-form {
  display: grid;
  gap: $space-2;
  width: min(100%, 20rem);
  text-align: left;
}

.guess-form input,
.guess-form button {
  padding: 0.6rem 0.75rem;
  font: inherit;
}

.guess-form button {
  cursor: pointer;
}
</style>
