import React, { useState, useEffect } from 'react';
import Square from './Square';

interface BoardProps {
  squares: (string | null)[];
  onClick: (index: number) => void;
}

const Board: React.FC<BoardProps> = ({ squares, onClick }) => {
  const [boardSquares, setBoardSquares] = useState<(string | null)[]>(squares);
  const [winnerLine, setWinnerLine] = useState<number[] | null>(null);
  const [nextPlayer, setNextPlayer] = useState<'X' | 'O'>('X');
  const [gameResult, setGameResult] = useState<string | null>(null);

  useEffect(() => {
    const winner = calculateWinner(boardSquares);
    if (winner) {
      setGameResult(`O jogador ${winner} venceu!`);
      restartGameAfterDelay();
    } else if (boardSquares.every((square) => square !== null)) {
      setGameResult('Empate!');
      restartGameAfterDelay();
    } else {
      setGameResult(null);
    }
  }, [boardSquares]);

  const calculateWinner = (squares: (string | null)[]): string | null => {
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

    for (const line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinnerLine(line);
        return squares[a];
      }
    }

    setWinnerLine(null);
    return null;
  };

  const handleSquareClick = (index: number) => {
    if (boardSquares[index] || winnerLine || gameResult) {
      return;
    }

    const newSquares = [...boardSquares];
    newSquares[index] = nextPlayer;
    setBoardSquares(newSquares);

    setNextPlayer(nextPlayer === 'X' ? 'O' : 'X');
  };

  const restartGameAfterDelay = () => {
    setTimeout(() => {
      setBoardSquares(Array(9).fill(null));
      setWinnerLine(null);
      setNextPlayer('X');
      setGameResult(null);
    }, 3000); 
  };

  return (
    <div className="board">
      {Array.from({ length: 3 }, (_, row) => (
        <div key={row} className="board-row">
          {Array.from({ length: 3 }, (_, col) => {
            const squareIndex = row * 3 + col;
            return (
              <Square
                key={col}
                value={boardSquares[squareIndex]}
                onClick={() => handleSquareClick(squareIndex)}
                winnerLine={winnerLine}
              />
            );
          })}
        </div>
      ))}
      <div className="game-result">{gameResult}</div>
    </div>
  );
};

export default Board;
