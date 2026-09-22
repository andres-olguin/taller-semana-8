import { useState } from "react";
import Board from "./Board";

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handlePlay(nextSquares) {
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <section className="game">
      <h1>Tic Tac Toe</h1>
      <Board xIsNext={xIsNext} squares={squares} onPlay={handlePlay} />
      <button className="reset" onClick={resetGame}>
        Nueva partida
      </button>
    </section>
  );
}
