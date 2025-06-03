import { createEmptyBoard, inBounds, getEmptyCells, BOARD_SIZE } from './boardUtils';

describe('boardUtils', () => {
  test('createEmptyBoard returns a BOARD_SIZE x BOARD_SIZE array of nulls', () => {
    const board = createEmptyBoard();
    expect(board.length).toBe(BOARD_SIZE);
    for (const row of board) {
      expect(row.length).toBe(BOARD_SIZE);
      for (const cell of row) {
        expect(cell).toBeNull();
      }
    }
  });

  test('inBounds returns true for valid indices', () => {
    expect(inBounds(0, 0)).toBe(true);
    expect(inBounds(BOARD_SIZE - 1, BOARD_SIZE - 1)).toBe(true);
  });

  test('inBounds returns false for out-of-bounds indices', () => {
    expect(inBounds(-1, 0)).toBe(false);
    expect(inBounds(0, -1)).toBe(false);
    expect(inBounds(BOARD_SIZE, 0)).toBe(false);
    expect(inBounds(0, BOARD_SIZE)).toBe(false);
  });

  test('getEmptyCells returns all cells for a new board', () => {
    const board = createEmptyBoard();
    const emptyCells = getEmptyCells(board);
    expect(emptyCells.length).toBe(BOARD_SIZE * BOARD_SIZE);
  });

  test('getEmptyCells returns only empty cells', () => {
    const board = createEmptyBoard();
    board[0][0] = 'B';
    board[1][1] = 'W';
    const emptyCells = getEmptyCells(board);
    expect(emptyCells).not.toContainEqual([0, 0]);
    expect(emptyCells).not.toContainEqual([1, 1]);
    expect(emptyCells.length).toBe(BOARD_SIZE * BOARD_SIZE - 2);
  });
}); 