import { BOARD_SIZE as BASE_BOARD_SIZE, Cell, Board } from './gomokuLogic';

export const BOARD_SIZE = BASE_BOARD_SIZE;

export function createEmptyBoard(): Board {
  return Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(null));
}

export function inBounds(r: number, c: number): boolean {
  return r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE;
}

export function getEmptyCells(board: Board): [number, number][] {
  const empty: [number, number][] = [];
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (board[r][c] === null) empty.push([r, c]);
    }
  }
  return empty;
} 