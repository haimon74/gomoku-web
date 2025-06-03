export const BOARD_SIZE = 15;
export type Player = 'B' | 'W';
export type Cell = Player | null;
export type Board = Cell[][];

export function createEmptyBoard(): Board {
  return Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(null));
}

export function inBounds(r: number, c: number): boolean {
  return r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE;
}

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

export function getEmptyCells(board: Board): [number, number][] {
  const empty: [number, number][] = [];
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (board[r][c] === null) empty.push([r, c]);
    }
  }
  return empty;
}

// Pattern-based scoring for AI
function scoreCell(board: Board, row: number, col: number, player: Player): number {
  // Patterns: 5, open 4, closed 4, open 3, closed 3, open 2
  // We use a simple scoring system for each pattern
  const patterns = [
    { name: 'FIVE', score: 100000 },
    { name: 'OPEN_FOUR', score: 10000 },
    { name: 'CLOSED_FOUR', score: 1000 },
    { name: 'OPEN_THREE', score: 100 },
    { name: 'CLOSED_THREE', score: 10 },
    { name: 'OPEN_TWO', score: 2 },
  ];
  let totalScore = 0;
  const directions = [
    { dr: 0, dc: 1 },   // Horizontal
    { dr: 1, dc: 0 },   // Vertical
    { dr: 1, dc: 1 },   // Diagonal
    { dr: 1, dc: -1 },  // Anti-diagonal
  ];
  for (const { dr, dc } of directions) {
    let line = '';
    // Build a string of 9 cells centered at (row, col)
    for (let d = -4; d <= 4; d++) {
      const r = row + dr * d;
      const c = col + dc * d;
      if (d === 0) {
        line += player;
      } else if (inBounds(r, c)) {
        line += board[r][c] ? board[r][c] : '.';
      } else {
        line += 'X'; // Out of bounds
      }
    }
    // Check for patterns in the line
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
  }
  return totalScore;
}

export function aiMove(board: Board, aiPlayer: Player = 'W', humanPlayer: Player = 'B'): [number, number] | null {
  const emptyCells = getEmptyCells(board);
  let bestScore = -Infinity;
  let bestMoves: [number, number][] = [];
  for (const [row, col] of emptyCells) {
    // Score for AI
    const aiScore = scoreCell(board, row, col, aiPlayer);
    // Score for blocking human
    const humanScore = scoreCell(board, row, col, humanPlayer) * 0.9; // Slightly less important than AI's own
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

export function isDraw(board: Board): boolean {
  return getEmptyCells(board).length === 0;
} 