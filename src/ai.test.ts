import { aiMove } from './ai';
import { createEmptyBoard, BOARD_SIZE } from './boardUtils';
import { Player } from './gomokuLogic';

describe('aiMove', () => {
  test('AI takes immediate win', () => {
    const board = createEmptyBoard();
    for (let i = 0; i < 4; i++) board[7][i] = 'W';
    const move = aiMove(board, 'W', 'B');
    expect(move).toEqual([7, 4]);
  });

  test('AI blocks human win', () => {
    const board = createEmptyBoard();
    for (let i = 0; i < 4; i++) board[7][i] = 'B';
    const move = aiMove(board, 'W', 'B');
    expect(move).toEqual([7, 4]);
  });

  test('AI prefers center on empty board', () => {
    const board = createEmptyBoard();
    const center = Math.floor(BOARD_SIZE / 2);
    const move = aiMove(board, 'W', 'B');
    expect(move).toEqual([center, center]);
  });
}); 