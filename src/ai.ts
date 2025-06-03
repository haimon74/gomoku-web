import { Board, Player } from './gomokuLogic';
import { getEmptyCells, BOARD_SIZE } from './boardUtils';
import { scoreCell } from './scoring';

export function aiMove(board: Board, aiPlayer: Player = 'W', humanPlayer: Player = 'B'): [number, number] | null {
  const emptyCells = getEmptyCells(board);
  let bestScore = -Infinity;
  let bestMoves: [number, number][] = [];
  for (const [row, col] of emptyCells) {
    // Score for AI
    const aiScore = scoreCell(board, row, col, aiPlayer);
    // Score for blocking human
    const humanScore = scoreCell(board, row, col, humanPlayer) * 0.9;
    const score = aiScore + humanScore;
    if (score > bestScore) {
      bestScore = score;
      bestMoves = [[row, col]];
    } else if (score === bestScore) {
      bestMoves.push([row, col]);
    }
  }
  if (bestMoves.length === 0) return null;
  // Prefer center if available among best moves
  const center = Math.floor(BOARD_SIZE / 2);
  for (const [row, col] of bestMoves) {
    if (row === center && col === center) return [row, col];
  }
  // Otherwise, pick randomly among best
  return bestMoves[Math.floor(Math.random() * bestMoves.length)];
} 