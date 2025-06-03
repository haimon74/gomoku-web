import { Board, Player } from './gomokuLogic';
import { inBounds, getEmptyCells } from './boardUtils';

export function checkWin(board: Board, row: number, col: number, player: Player): boolean {
  const directions = [
    { dr: 0, dc: 1 },   // Horizontal
    { dr: 1, dc: 0 },   // Vertical
    { dr: 1, dc: 1 },   // Diagonal "\\"
    { dr: 1, dc: -1 },  // Anti-diagonal "/"
  ];
  for (const { dr, dc } of directions) {
    let count = 1;
    let r = row - dr, c = col - dc;
    while (inBounds(r, c) && board[r][c] === player) {
      count++;
      r -= dr; c -= dc;
    }
    r = row + dr; c = col + dc;
    while (inBounds(r, c) && board[r][c] === player) {
      count++;
      r += dr; c += dc;
    }
    if (count >= 5) return true;
  }
  return false;
}

export function isDraw(board: Board): boolean {
  return getEmptyCells(board).length === 0;
} 