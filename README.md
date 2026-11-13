# Vue Sudoku

Sudoku mit Vue 3 + TypeScript (Vite). Vier Schwierigkeitsgrade, jedes Rätsel hat eine eindeutige Lösung. Es gibt keine Tipps und keinen Lösen-Button – das Spiel markiert nur Fehler.

## Voraussetzungen

- Node.js 20.19+ oder 22.12+ (Anforderung von Vite 8)

## Starten

```bash
npm install
npm run dev
```

Dann die angezeigte Adresse öffnen (standardmäßig http://localhost:5173).

Produktions-Build: `npm run build`, Vorschau mit `npm run preview`.

## Schwierigkeitsgrade

| Stufe   | Vorgaben |
|---------|----------|
| Leicht  | 42       |
| Mittel  | 34       |
| Schwer  | 28       |
| Experte | ~24      |

Die Werte stehen in `src/logic/sudoku.ts` (`DIFFICULTIES`) und lassen sich dort anpassen.

## Fehleranzeige

Rot markiert werden nur eingetragene Zahlen, die nicht zur (eindeutigen) Lösung passen – auch wenn sie noch keinen sichtbaren Konflikt erzeugen. Richtige Zahlen und Vorgaben bleiben immer unmarkiert. Die Markierung lässt sich über „Fehler markieren“ abschalten; der Fehlerzähler läuft trotzdem weiter.

## Bedienung

- Feld anklicken, dann Ziffer über den Ziffernblock oder die Tastatur (1–9) eingeben
- Pfeiltasten bewegen die Auswahl, Entf/Backspace löscht
- Dieselbe Ziffer nochmal eingeben entfernt sie wieder





<template>
  <div class="guess-the-number">
    <h1>Rate die Zahl</h1>
    <input type="number" v-model.number="guess" placeholder="Gib eine Zahl ein" />
    <button @click="makeGuess">Rate</button>
    <p v-if="feedback">{{ feedback }}</p>
  </div>
</template>