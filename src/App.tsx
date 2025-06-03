import React, { useState } from 'react';
import GomokuBoard from './GomokuBoard';
import { BOARD_SIZE, createEmptyBoard, checkWin, aiMove, isDraw, Player, Board } from './gomokuLogic';
import styles from './App.module.css';

const HUMAN: Player = 'B';
const AI: Player = 'W';

const App: React.FC = () => {
  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>(HUMAN);
  const [status, setStatus] = useState<string>("Black's turn");
  const [gameOver, setGameOver] = useState<boolean>(false);

  const handleCellClick = (row: number, col: number) => {
    if (board[row][col] !== null || gameOver || currentPlayer !== HUMAN) return;
    const newBoard = board.map(rowArr => [...rowArr]);
    newBoard[row][col] = HUMAN;
    if (checkWin(newBoard, row, col, HUMAN)) {
      setBoard(newBoard);
      setStatus('Black wins!');
      setGameOver(true);
      return;
    }
    if (isDraw(newBoard)) {
      setBoard(newBoard);
      setStatus('Draw!');
      setGameOver(true);
      return;
    }
    setBoard(newBoard);
    setCurrentPlayer(AI);
    setTimeout(() => {
      aiTurn(newBoard);
    }, 400);
  };

  const aiTurn = (currentBoard: Board) => {
    const move = aiMove(currentBoard, AI, HUMAN);
    if (!move) {
      setStatus('Draw!');
      setGameOver(true);
      return;
    }
    const [row, col] = move;
    const newBoard = currentBoard.map(rowArr => [...rowArr]);
    newBoard[row][col] = AI;
    if (checkWin(newBoard, row, col, AI)) {
      setBoard(newBoard);
      setStatus('White (AI) wins!');
      setGameOver(true);
      return;
    }
    if (isDraw(newBoard)) {
      setBoard(newBoard);
      setStatus('Draw!');
      setGameOver(true);
      return;
    }
    setBoard(newBoard);
    setCurrentPlayer(HUMAN);
    setStatus("Black's turn");
  };

  const handleRestart = () => {
    setBoard(createEmptyBoard());
    setCurrentPlayer(HUMAN);
    setStatus("Black's turn");
    setGameOver(false);
  };

  return (
    <div className={styles.appContainer}>
      <h1>Gomoku: Five in a Row</h1>
      <div className={styles.status}>{status}</div>
      <GomokuBoard board={board} onCellClick={handleCellClick} gameOver={gameOver} />
      <div className={styles.controls}>
        <button className={styles.button} onClick={handleRestart}>Restart</button>
      </div>
    </div>
  );
};

export default App;
