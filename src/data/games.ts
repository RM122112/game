import { defineAsyncComponent, type Component } from 'vue'

export interface GameInfo {
  id: string
  title: string
  emoji: string
  thumbnail: string
  badge?: 'neu' | 'hot' | 'beta'
  component: Component
}

const comingSoon = defineAsyncComponent(
  () => import('@/games/coming-soon/ComingSoon.vue'),
)

const thumbnails = import.meta.glob('../assets/thumbnails/*.svg', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>

const image = (name: string) => thumbnails[`../assets/thumbnails/${name}.svg`] ?? ''

export const games: GameInfo[] = [
  {
    id: 'sudoku',
    title: 'Sudoku',
    emoji: '🧩',
    thumbnail: image('sudoku'),
    badge: 'neu',
    component: defineAsyncComponent(() => import('@/games/sudoku/SudokuGame.vue')),
  },
  {
    id: 'guess-the-number',
    title: 'Zahlenraten',
    emoji: '🔢',
    thumbnail: image('guess-the-number'),
    component: defineAsyncComponent(() => import('@/games/guess-the-number/GuessTheNumberGame.vue')),
  },
  {
    id: 'tic-tac-toe',
    title: 'Tic-Tac-Toe',
    emoji: '❌',
    thumbnail: image('tic-tac-toe'),
    component: comingSoon,
  },
  {
    id: 'memory',
    title: 'Memory',
    emoji: '🧠',
    thumbnail: image('memory'),
    component: comingSoon,
  },
  {
    id: 'quiz',
    title: 'Quiz',
    emoji: '❓',
    thumbnail: image('quiz'),
    component: comingSoon,
  },
  {
    id: 'wordle',
    title: 'Wortraten',
    emoji: '🔤',
    thumbnail: image('wordle'),
    component: comingSoon,
  },
  {
    id: '2048',
    title: '2048',
    emoji: '🔢',
    thumbnail: image('2048'),
    component: comingSoon,
  },
  {
    id: 'minesweeper',
    title: 'Minesweeper',
    emoji: '💣',
    thumbnail: image('minesweeper'),
    component: comingSoon,
  },
  {
    id: 'snake',
    title: 'Snake',
    emoji: '🐍',
    thumbnail: image('snake'),
    component: comingSoon,
  },
  {
    id: 'breakout',
    title: 'Breakout',
    emoji: '🧱',
    thumbnail: image('breakout'),
    component: comingSoon,
  },
  {
    id: 'tetris',
    title: 'Tetris',
    emoji: '🟦',
    thumbnail: image('tetris'),
    badge: 'hot',
    component: comingSoon,
  },
  {
    id: 'chess',
    title: 'Schach',
    emoji: '♟️',
    thumbnail: image('chess'),
    component: comingSoon,
  },
  {
    id: 'loop-sort',
    title: 'Loop Sort',
    emoji: '🔄',
    thumbnail: image('loop-sort'),
    component: comingSoon,
  },
]
