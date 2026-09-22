import { Component, signal, computed } from "@angular/core";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {
  xIsNext = signal<boolean>(true);
  squares = signal<(string | null)[]>(Array(9).fill(null));

  winner = computed(() => {
    const s = this.squares();
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (const [a, b, c] of lines) {
      if (s[a] && s[a] === s[b] && s[a] === s[c]) {
        return s[a];
      }
    }
    return null;
  });

  status = computed(() => {
    const win = this.winner();
    if (win) {
      return `Ganador: ${win}`;
    }
    if (this.squares().every(sq => sq !== null)) {
      return "Empate";
    }
    return `Siguiente jugador: ${this.xIsNext() ? "X" : "O"}`;
  });

  handleClick(index: number) {
    if (this.winner() || this.squares()[index]) {
      return;
    }
    const nextSquares = [...this.squares()];
    nextSquares[index] = this.xIsNext() ? "X" : "O";
    this.squares.set(nextSquares);
    this.xIsNext.set(!this.xIsNext());
  }

  resetGame() {
    this.squares.set(Array(9).fill(null));
    this.xIsNext.set(true);
  }
}
