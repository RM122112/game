<script setup lang="ts">
import {ref} from 'vue'
import {guessNumber, resetGuessGame} from './guessTheNumber'

const guess = ref<number | null>(null)
const feedback = ref<string | null>(null)

function makeGuess() {
  if (guess.value === null) {
    feedback.value = 'Enter a number.'
    return
  }

  feedback.value = guessNumber(guess.value)
}

function resetGame() {
  resetGuessGame()
  guess.value = null
  feedback.value = null
}
</script>

<template>
  <main class="guess-game">
    <h1>Guess the Number</h1>
    <p>Choose a number between 1 and 200.</p>

    <form class="guess-form" @submit.prevent="makeGuess">
      <label for="guess">Your guess</label>
      <input
          id="guess"
          v-model.number="guess"
          type="number"
          min="1"
          max="200"
          required
      />
      <button type="submit">Guess</button>
    </form>

    <p v-if="feedback" aria-live="polite">{{ feedback }}</p>
    <button type="button" @click="resetGame">Reset Game</button>
  </main>
</template>

<style scoped>
.guess-game {
  display: grid;
  justify-items: center;
  gap: 1rem;
  margin: 120px 130px;
  padding: 12px 12px;
  text-align: center;
  border: red 1px solid;
  border-radius: 2.5rem;
  background: linear-gradient(90deg, rgba(255, 0, 0, 0.1) 0%, rgba(255, 0, 0, 0.2) 100%);
  width: 120px;
  height: 120px;
}

.guess-game h1,
.guess-game p {
  margin: 0;
}

.guess-form {
  display: grid;
  gap: 0.5rem;
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
