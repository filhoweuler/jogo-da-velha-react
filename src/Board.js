import "./styles.css";
import { useState } from "react";

function Square({ symbol, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {symbol}
    </button>
  );
}

// returns winner (X or O) or null if no winner is found
function checkWinner(board) {
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] != "" &&
      board[i][0] == board[i][1] &&
      board[i][0] == board[i][2]
    ) {
      return board[i][0];
    }
    if (
      board[0][i] != "" &&
      board[0][i] === board[1][i] &&
      board[0][i] === board[2][i]
    ) {
      return board[0][i];
    }
  }
  if (
    board[0][0] != "" &&
    board[0][0] === board[1][1] &&
    board[0][0] === board[2][2]
  ) {
    return board[0][0];
  }
  if (
    board[2][0] != "" &&
    board[2][0] === board[1][1] &&
    board[2][0] === board[0][2]
  ) {
    return board[2][0];
  }

  if (board.findIndex((line) => !!line.includes("")) === -1) {
    return "DRAW";
  }
  return null;
}

export default function Board() {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const winner = checkWinner(board);

  const handleClick = (i, j) => {
    if (board[i][j] != "" || winner != null) {
      return;
    }
    const newBoard = board;
    newBoard[i][j] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const resetGame = () => {
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
  };

  return (
    <>
      <h1>Jogador atual: {currentPlayer}</h1>
      {board.map((row, i) => (
        <div className="board-row">
          {row.map((item, j) => (
            <Square symbol={item} onClick={() => handleClick(i, j)} />
          ))}
        </div>
      ))}
      {winner ? (
        <>
          {winner === 'DRAW' ? <h1>O jogo acabou em empate!</h1> : <h1>O jogo acabou! O vencedor eh {winner}</h1>}
          <button onClick={resetGame}>Reset</button>
        </>
      ) : null}
    </>
  );
}
