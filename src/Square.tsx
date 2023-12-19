import React from 'react';

interface SquareProps {
  value: string | null;
  onClick: () => void;
  winnerLine: number[] | null;
}

const Square: React.FC<SquareProps> = ({ value, onClick, winnerLine }) => {
  const isWinnerSquare = winnerLine && winnerLine.includes;

  const getStyle = () => {
    if (isWinnerSquare) {
      return { backgroundColor: '#ffcc00', color: '#000' };
    } else if (value === 'X') {
      return { backgroundColor: '#ff5733', color: '#fff' };
    } else if (value === 'O') {
      return { backgroundColor: '#3399ff', color: '#fff' };
    }
    return {};
  };

  return (
    <button
      className={`square ${value ? 'occupied' : ''} ${isWinnerSquare ? 'winner' : ''}`}
      onClick={onClick}
      style={getStyle()}
    >
      {value}
    </button>
  );
};

export default Square;
