import React from 'react';
import { BOARD_SIZE, Cell } from './gomokuLogic';
import styles from './App.module.css';

type GomokuBoardProps = {
  board: Cell[][];
  onCellClick: (row: number, col: number) => void;
  gameOver: boolean;
};

const GomokuBoard: React.FC<GomokuBoardProps> = ({ board, onCellClick, gameOver }) => {
  return (
    <div className={styles.board}>
      {board.map((row, rIdx) => (
        <div className={styles.boardRow} key={rIdx}>
          {row.map((cell, cIdx) => (
            <div
              className={styles.cell}
              key={cIdx}
              onClick={() => !gameOver && !cell && onCellClick(rIdx, cIdx)}
            >
              {cell ? <div className={cell === 'B' ? styles.stone + ' ' + styles.stoneBlack : styles.stone + ' ' + styles.stoneWhite}></div> : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GomokuBoard; 