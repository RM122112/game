/** Ein Sudoku-Gitter als flaches Array mit 81 Feldern. 0 = leer. */
export type Grid = number[]

export type Difficulty = 'leicht' | 'mittel' | 'schwer' | 'experte'

export interface DifficultyConfig {
  label: string
  /** Anzahl der vorgegebenen Zahlen (Zielwert) */
  clues: number
}

export const DIFFICULTIES: Record<Difficulty, DifficultyConfig> = {
  leicht: { label: 'Leicht', clues: 42 },
  mittel: { label: 'Mittel', clues: 34 },
  schwer: { label: 'Schwer', clues: 28 },
  experte: { label: 'Experte', clues: 24 },
}

export interface Puzzle {
  puzzle: Grid
  solution: Grid
}

const row = (i: number) => Math.floor(i / 9)
const col = (i: number) => i % 9
const box = (i: number) => Math.floor(row(i) / 3) * 3 + Math.floor(col(i) / 3)

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Backtracking-Löser mit Bitmasken.
 * Zählt Lösungen bis `limit` und schreibt die erste gefundene Lösung in `grid`,
 * wenn `fill` true ist. Mit `randomize` entstehen zufällige vollständige Gitter.
 */
function solve(grid: Grid, limit: number, randomize = false, fill = false): number {
  const rows = new Array(9).fill(0)
  const cols = new Array(9).fill(0)
  const boxes = new Array(9).fill(0)
  const empty: number[] = []

  for (let i = 0; i < 81; i++) {
    const v = grid[i]
    if (v === 0) {
      empty.push(i)
    } else {
      const bit = 1 << v
      rows[row(i)] |= bit
      cols[col(i)] |= bit
      boxes[box(i)] |= bit
    }
  }

  const work = [...grid]
  let count = 0

  const search = (): boolean => {
    // Feld mit den wenigsten Kandidaten wählen (MRV-Heuristik)
    let bestIdx = -1
    let bestMask = 0
    let bestCount = 10
    for (const i of empty) {
      if (work[i] !== 0) continue
      const used = rows[row(i)] | cols[col(i)] | boxes[box(i)]
      const mask = ~used & 0x3fe
      let c = 0
      for (let m = mask; m; m &= m - 1) c++
      if (c < bestCount) {
        bestCount = c
        bestIdx = i
        bestMask = mask
        if (c === 0) return false
        if (c === 1) break
      }
    }

    if (bestIdx === -1) {
      count++
      if (fill && count === 1) {
        for (let i = 0; i < 81; i++) grid[i] = work[i]
      }
      return count >= limit
    }

    let digits: number[] = []
    for (let d = 1; d <= 9; d++) if (bestMask & (1 << d)) digits.push(d)
    if (randomize) digits = shuffle(digits)

    const r = row(bestIdx)
    const c = col(bestIdx)
    const b = box(bestIdx)
    for (const d of digits) {
      const bit = 1 << d
      work[bestIdx] = d
      rows[r] |= bit
      cols[c] |= bit
      boxes[b] |= bit
      if (search()) return true
      rows[r] &= ~bit
      cols[c] &= ~bit
      boxes[b] &= ~bit
      work[bestIdx] = 0
    }
    return false
  }

  search()
  return count
}

/** Erzeugt ein Rätsel mit eindeutiger Lösung für den gewünschten Schwierigkeitsgrad. */
export function generatePuzzle(difficulty: Difficulty): Puzzle {
  const target = DIFFICULTIES[difficulty].clues

  const solution: Grid = new Array(81).fill(0)
  solve(solution, 1, true, true)

  // Bei sehr wenigen Vorgaben mehrere Versuche, das beste Ergebnis behalten
  const attempts = difficulty === 'experte' ? 6 : difficulty === 'schwer' ? 3 : 1
  let best: Grid = [...solution]
  let bestClues = 81

  for (let a = 0; a < attempts && bestClues > target; a++) {
    const puzzle = [...solution]
    let clues = 81
    for (const i of shuffle([...Array(81).keys()])) {
      if (clues <= target) break
      const backup = puzzle[i]
      puzzle[i] = 0
      // Nur entfernen, wenn die Lösung eindeutig bleibt
      if (solve(puzzle, 2) !== 1) {
        puzzle[i] = backup
      } else {
        clues--
      }
    }
    if (clues < bestClues) {
      best = puzzle
      bestClues = clues
    }
  }

  return { puzzle: best, solution }
}
