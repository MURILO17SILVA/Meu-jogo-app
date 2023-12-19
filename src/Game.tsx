import React, { useEffect, useState } from 'react';
import Board from './Board';
import io from 'socket.io-client';

import './styles.css';

const socketServer = process.env.REACT_APP_SOCKET_SERVER || 'http://localhost:3001';
const socket = io(socketServer);

const Game: React.FC = () => {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [isGameActive, setGameActive] = useState(false);
  const [isPlayerX, setPlayerX] = useState(false);
  const [moves, setMoves] = useState<{ player: string; position: number; color: string }[]>([]);

  useEffect(() => {
    socket.on('updateBoard', (newBoard: (string | null)[]) => {
      setSquares(newBoard);
    });

    socket.on('startGame', (isPlayerX: boolean) => {
      setGameActive(true);
      setPlayerX(isPlayerX);
    });

    socket.on('gameOver', (winner: string | null) => {
      if (winner === socket.id) {
        alert('Você venceu!');
      } else {
        alert('Você perdeu...');
      }

      setTimeout(() => {
        setSquares(Array(9).fill(null));
        setGameActive(false);
        setMoves([]);
      }, 10000);
    });

    socket.on('disconnect', () => {
      setGameActive(false);
      setSquares(Array(9).fill(null));
      setMoves([]);
    });
  }, []);

  const handleClick = (index: number) => {
    if (!isGameActive || squares[index] || calculateWinner(squares)) {
      return;
    }

    const newSquares = [...squares];
    newSquares[index] = isPlayerX ? 'X' : 'O';

  
    const color = isPlayerX ? '#3399ff' : '#ff5733';

    setMoves([...moves, { player: isPlayerX ? 'X' : 'O', position: index, color }]);
    socket.emit('playerMove', { player: isPlayerX ? 'X' : 'O', position: index });

    socket.emit('updateBoard', newSquares);

    const winner = calculateWinner(newSquares);

    if (winner) {
      socket.emit('gameOver', winner);
    } else {
      socket.emit('switchPlayer');
    }
  };

  const calculateWinner = (squares: (string | null)[]): string | null => {
    const lines: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a] as string;
      }
    }

    return null;
  };

  return (
    <div className="game">
      <h1>Jogo da Velha</h1>
      <div className="game-board">
        <Board squares={squares} onClick={(i) => handleClick(i)} />
      </div>
      <div>
   
        <ul>
          {moves.map((move, moveIndex) => (
            <li key={moveIndex} style={{ color: move.color }}>
              {`Jogador ${move.player} na posição ${move.position}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Game;
