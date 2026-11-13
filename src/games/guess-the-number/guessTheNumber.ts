function createRandomNumber(): number {
  return Math.floor(Math.random() * 200) + 1
}

export interface GuessGame {
  guessNumber(userGuess: number): string
  reset(): void
}

export function createGuessGame(): GuessGame {
  let randomNumber = createRandomNumber()
  let attempts = 0

  return {
    guessNumber(userGuess: number): string {
      attempts++

      if (userGuess < randomNumber) return 'Zu niedrig! Versuch es noch einmal.'
      if (userGuess > randomNumber) return 'Zu hoch! Versuch es noch einmal.'

      return `Glückwunsch! Du hast die Zahl ${randomNumber} in ${attempts} Versuchen erraten.`
    },
    reset(): void {
      randomNumber = createRandomNumber()
      attempts = 0
    },
  }
}
