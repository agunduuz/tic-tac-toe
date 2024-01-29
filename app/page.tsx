"use client";

import Image from "next/image";
import { useState } from "react";
type SquareType = {
  value: string;
  onSquareClick: any;
  className: string;
};

function Square({ value, onSquareClick, className }: SquareType) {
  const textColor =
    value === "X"
      ? "text-orange-300"
      : value === "O"
      ? "text-lime-300"
      : "text-white";
  console.log(textColor);
  return (
    <div
      className={`square shadow-violet-border border-violet-400	 border-2 bg-transparent h-14 w-14  text-center flex items-center justify-center text-2xl ${textColor} ${
        className || ""
      }`}
      onClick={onSquareClick}
    >
      {value}
    </div>
  );
}

type HomeSquareType = {
  xIsNext: boolean;
  squares: any;
  onPlay: any;
};

function Board({ xIsNext, squares, onPlay }: HomeSquareType) {
  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (isBoardFull(squares)) {
    status = "Draw";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <main className="flex flex-col items-center justify-between ">
      <div className="status text-violet-400 font-bold	uppercase mb-10  w-full rounded-sm text-center bg-violet-950">
        {status}
      </div>
      <div className="board-row flex align-middle justify-center rounded-t-lg">
        <Square
          className="rounded-tl-lg"
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
        />
        <Square
          className=""
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
        />
        <Square
          className="rounded-tr-lg"
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
        />
      </div>
      <div className="board-row flex align-middle justify-center">
        <Square
          className=""
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
        />
        <Square
          className=""
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
        />
        <Square
          className=""
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
        />
      </div>
      <div className="board-row rounded-b-lg flex align-middle justify-center">
        <Square
          className="rounded-bl-lg"
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
        />
        <Square
          className=""
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
        />
        <Square
          className="rounded-br-lg"
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
        />
      </div>
    </main>
  );
}

export default function Home() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li
        key={move}
        className="py-1 flex items-center justify-center first:py-0 last:py-0"
      >
        <button
          className="text-violet-400 hover:text-violet-200 "
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="game flex items-center h-dvh justify-center">
      <div className="game-board mr-5">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol className="max-h-80	min-h-80 bg-violet-950 p-3 w-44		rounded-md	">
          {moves}
        </ol>
      </div>
    </div>
  );
}

type T = {
  T: number;
};

function calculateWinner(squares: Array<T>) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] &&
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

function isBoardFull(squares: Array<T>) {
  return squares.every((square) => square !== null);
}
