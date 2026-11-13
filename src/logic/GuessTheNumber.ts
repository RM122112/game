function createRandomNumber(): number {
    return Math.floor(Math.random() * 200) + 1
}

let randomNumber = createRandomNumber()
let attempts = 0

export function guessNumber(userGuess: number): string {
    attempts++

    if (userGuess < randomNumber) return 'Too low! Try again.'
    if (userGuess > randomNumber) return 'Too high! Try again.'

    return `Congratulations! You've guessed the number ${randomNumber} in ${attempts} attempts.`
}

export function resetGuessGame(): void {
    randomNumber = createRandomNumber()
    attempts = 0
}