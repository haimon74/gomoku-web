import { checkWin, isDraw } from './winCheck';
import { createEmptyBoard, BOARD_SIZE } from './boardUtils';
import { Player } from './gomokuLogic';

describe('winCheck', () => {
  test('checkWin detects horizontal win', () => {
    const board = createEmptyBoard();
    for (let i = 0; i < 5; i++) board[7][i] = 'B';
    expect(checkWin(board, 7, 2, 'B')).toBe(true);
  });

  test('checkWin detects vertical win', () => {
    const board = createEmptyBoard();
    for (let i = 0; i < 5; i++) board[i][7] = 'W';
    expect(checkWin(board, 2, 7, 'W')).toBe(true);
  });

  test('checkWin detects diagonal win', () => {
    const board = createEmptyBoard();
    for (let i = 0; i < 5; i++) board[i][i] = 'B';
    expect(checkWin(board, 2, 2, 'B')).toBe(true);
  });

  test('checkWin detects anti-diagonal win', () => {
    const board = createEmptyBoard();
    for (let i = 0; i < 5; i++) board[i][4 - i] = 'W';
    expect(checkWin(board, 2, 2, 'W')).toBe(true);
  });

  test('checkWin returns false if no win', () => {
    const board = createEmptyBoard();
    board[0][0] = 'B';
    board[0][1] = 'B';
    board[0][2] = 'B';
    board[0][3] = 'B';
    expect(checkWin(board, 0, 3, 'B')).toBe(false);
  });

  test('isDraw returns false for new board', () => {
    const board = createEmptyBoard();
    expect(isDraw(board)).toBe(false);
  });

  test('isDraw returns true for full board with no winner', () => {
    const board = createEmptyBoard();
    let toggle: Player = 'B';
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        board[r][c] = toggle;
        toggle = toggle === 'B' ? 'W' : 'B';
      }
    }
    // Remove a win possibility
    board[0][0] = 'B';
    board[0][1] = 'W';
    expect(isDraw(board)).toBe(true);
  });
}); 