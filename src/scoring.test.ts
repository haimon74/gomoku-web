import { scoreLine, scoreCell } from './scoring';
import { createEmptyBoard } from './boardUtils';
import { Player } from './gomokuLogic';

describe('scoring', () => {
  test('scoreLine detects five in a row', () => {
    expect(scoreLine('..BBBBB..', 'B')).toBeGreaterThanOrEqual(100000);
  });

  test('scoreLine detects open four', () => {
    expect(scoreLine('.BBBB.', 'B')).toBeGreaterThanOrEqual(10000);
  });

  test('scoreLine detects closed four', () => {
    expect(scoreLine('XBBBB.', 'B')).toBeGreaterThanOrEqual(1000);
    expect(scoreLine('.BBBBX', 'B')).toBeGreaterThanOrEqual(1000);
  });

  test('scoreLine detects open three', () => {
    expect(scoreLine('.BBB..', 'B')).toBeGreaterThanOrEqual(100);
    expect(scoreLine('..BBB.', 'B')).toBeGreaterThanOrEqual(100);
  });

  test('scoreLine detects closed three', () => {
    expect(scoreLine('XBBB.', 'B')).toBeGreaterThanOrEqual(10);
    expect(scoreLine('.BBBX', 'B')).toBeGreaterThanOrEqual(10);
  });

  test('scoreLine detects open two', () => {
    expect(scoreLine('.BB..', 'B')).toBeGreaterThanOrEqual(2);
    expect(scoreLine('..BB.', 'B')).toBeGreaterThanOrEqual(2);
  });

  test('scoreCell scores a cell with a strong pattern higher', () => {
    const board = createEmptyBoard();
    board[7][7] = 'B';
    board[7][8] = 'B';
    board[7][9] = 'B';
    board[7][10] = 'B';
    // Placing at (7,6) should create an open four
    const score = scoreCell(board, 7, 6, 'B');
    expect(score).toBeGreaterThanOrEqual(10000);
  });
}); 