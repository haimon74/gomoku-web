import { Board, Player, Cell } from './gomokuLogic';
import { inBounds } from './boardUtils';
import { patterns } from './patterns';

function lineToString(board: Board, row: number, col: number, dr: number, dc: number, player: Player): string {
  let line = '';
  for (let d = -4; d <= 4; d++) {
    const r = row + dr * d;
    const c = col + dc * d;
    if (d === 0) {
      line += player;
    } else if (inBounds(r, c)) {
      line += board[r][c] ? board[r][c] : '.';
    } else {
      line += 'X';
    }
  }
  return line;
}

export function scoreLine(line: string, player: Player): number {
  let totalScore = 0;
  // Five in a row
  if (line.includes(player.repeat(5))) totalScore += patterns[0].score;
  // Open four: .BBBB.
  if (line.includes('.' + player.repeat(4) + '.')) totalScore += patterns[1].score;
  // Closed four: XBBBB. or .BBBBX or BBBB. or .BBBB
  if (
    line.includes(player.repeat(4) + '.') ||
    line.includes('.' + player.repeat(4))
  ) totalScore += patterns[2].score;
  // Open three: .BBB..
  if (line.includes('.' + player.repeat(3) + '..') || line.includes('..' + player.repeat(3) + '.')) totalScore += patterns[3].score;
  // Closed three: XBBB. or .BBBX
  if (
    line.includes(player.repeat(3) + '.') ||
    line.includes('.' + player.repeat(3))
  ) totalScore += patterns[4].score;
  // Open two: .BB..
  if (line.includes('.' + player.repeat(2) + '..') || line.includes('..' + player.repeat(2) + '.')) totalScore += patterns[5].score;
  return totalScore;
}

export function scoreCell(board: Board, row: number, col: number, player: Player): number {
  const directions = [
    { dr: 0, dc: 1 },
    { dr: 1, dc: 0 },
    { dr: 1, dc: 1 },
    { dr: 1, dc: -1 },
  ];
  let total = 0;
  for (const { dr, dc } of directions) {
    const line = lineToString(board, row, col, dr, dc, player);
    total += scoreLine(line, player);
  }
  return total;
} 