import { defineAsyncComponent, type Component } from 'vue'

export interface GameInfo {
    id: string;
    title: string;
    color: string;
    emoji: string;
    thumbnail: string;
    badge?: 'neu' | 'new' | 'hot' | 'beta';
    component: Component
}

const comingSoon = defineAsyncComponent(
    () => import('../components/ComingSoon.vue'),
);

const image = (name: string) => new URL(`../image/${name}.svg`, import.meta.url).href;

export const games: GameInfo[] = [
    {
        id: 'Sudoku',
        title: 'Sudoku',
        color: '#FF5733',
        emoji: '🧩',
        thumbnail: image('sudoku'),
        badge: 'new',
        component: defineAsyncComponent(() => import('../components/SudokuGame.vue')),
    },
    {
        id:'guess the number',
        title:'Guess the Number',
        color:'#FF4500',
        emoji:'🔢',
        thumbnail: image('guess-the-number'),
        component: defineAsyncComponent(() => import('../components/guessTheNumber.vue')),
    },
    {
        id: 'chess',
        title: 'Chess',
        color: '#000000',
        emoji: '♟️',
        thumbnail: image('chess'),
        component: comingSoon,
    },
    {
        id: 'tetris',
        title: 'Tetris',
        color: '#00FFFF',
        emoji: '🟦',
        thumbnail: image('tetris'),
        badge: 'hot',
        component: comingSoon
    },
    {
        id: 'snake',
        title: 'Snake',
        color: '#00FF00',
        emoji: '🐍',
        thumbnail: image('snake'),
        component: comingSoon
    },
    {
        id: 'minesweeper',
        title: 'Minesweeper',
        color: '#808080',
        emoji: '💣',
        thumbnail: image('minesweeper'),
        component: comingSoon
    },
    {
        id: 'coming-soon',
        title: 'Coming Soon',
        color: '#FFA500',
        emoji: '⏳',
        thumbnail: image('coming-soon'),
        badge: 'neu',
        component: comingSoon,
    },
    {
        id:'guess-the-number',
        title:'Zahlenraten (höher/tiefer)',
        color:'#FF69B4',
        emoji:'🔢',
        thumbnail: image('guess-the-number'),
        component: defineAsyncComponent(() => import('../components/guessTheNumber.vue')),
    },
    {
        id:'tic-tac-toe',
        title:'Tic-Tac-Toe',
        color:'#4A90E2',
        emoji:'❌',
        thumbnail: image('tic-tac-toe'),
        component: comingSoon
    },
    {
        id:'memory',
        title:'Memory',
        color:'#9B59B6',
        emoji:'🧠',
        thumbnail: image('memory'),
        component: comingSoon
    },
    {
        id:'quiz',
        title:'Quiz',
        color:'#F39C12',
        emoji:'❓',
        thumbnail: image('quiz'),
        component: comingSoon
    },
    {
        id:'wordle',
        title:'Wordle / Galgenmännchen',
        color:'#27AE60',
        emoji:'🔤',
        thumbnail: image('wordle'),
        component: comingSoon
    },
    {
        id:'2048',
        title:'2048',
        color:'#E67E22',
        emoji:'🔢',
        thumbnail: image('2048'),
        component: comingSoon
    },
    {
        id:'breakout',
        title:'Breakout',
        color:'#E74C3C',
        emoji:'🧱',
        thumbnail: image('breakout'),
        component: comingSoon
    },
    {
        id:'loop sort',
        title:'Loop Sort',
        color:'#8A2BE2',
        emoji:'🔄',
        thumbnail: image('loop-sort'),
        component: comingSoon
    }
];