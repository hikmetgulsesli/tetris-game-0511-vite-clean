export type TetrominoType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';

export type Cell = TetrominoType | null;

export type Board = Cell[][];

export interface Piece {
  type: TetrominoType;
  x: number;
  y: number;
  rotation: number;
}

export interface GameState {
  board: Board;
  currentPiece: Piece | null;
  nextPieces: TetrominoType[];
  holdPiece: TetrominoType | null;
  score: number;
  level: number;
  lines: number;
  highScore: number;
  isPaused: boolean;
  isGameOver: boolean;
  canHold: boolean;
}

export type GameScreen = 'menu' | 'playing' | 'paused' | 'gameover' | 'settings' | 'help';

export interface AppSettings {
  difficulty: 'normal' | 'hard' | 'grandmaster';
  music: boolean;
  masterVolume: number;
  sfxVolume: number;
  ghostPiece: boolean;
  holdQueue: boolean;
}

export const TETROMINO_SHAPES: Record<TetrominoType, number[][][]> = {
  I: [
    [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
    [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]],
    [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]],
    [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
  ],
  O: [
    [[1, 1], [1, 1]],
    [[1, 1], [1, 1]],
    [[1, 1], [1, 1]],
    [[1, 1], [1, 1]],
  ],
  T: [
    [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
    [[0, 1, 0], [0, 1, 1], [0, 1, 0]],
    [[0, 0, 0], [1, 1, 1], [0, 1, 0]],
    [[0, 1, 0], [1, 1, 0], [0, 1, 0]],
  ],
  S: [
    [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
    [[0, 1, 0], [0, 1, 1], [0, 0, 1]],
    [[0, 0, 0], [0, 1, 1], [1, 1, 0]],
    [[1, 0, 0], [1, 1, 0], [0, 1, 0]],
  ],
  Z: [
    [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
    [[0, 0, 1], [0, 1, 1], [0, 1, 0]],
    [[0, 0, 0], [1, 1, 0], [0, 1, 1]],
    [[0, 1, 0], [1, 1, 0], [1, 0, 0]],
  ],
  J: [
    [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
    [[0, 1, 1], [0, 1, 0], [0, 1, 0]],
    [[0, 0, 0], [1, 1, 1], [0, 0, 1]],
    [[0, 1, 0], [0, 1, 0], [1, 1, 0]],
  ],
  L: [
    [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
    [[0, 1, 0], [0, 1, 0], [0, 1, 1]],
    [[0, 0, 0], [1, 1, 1], [1, 0, 0]],
    [[1, 1, 0], [0, 1, 0], [0, 1, 0]],
  ],
};

export const TETROMINO_COLORS: Record<TetrominoType, string> = {
  I: 'bg-tetris-cyan',
  O: 'bg-tetris-yellow',
  T: 'bg-tetris-purple',
  S: 'bg-tetris-green',
  Z: 'bg-tetris-red',
  J: 'bg-tetris-blue',
  L: 'bg-tetris-orange',
};

export const TETROMINO_CSS_COLORS: Record<TetrominoType, string> = {
  I: '#00ffff',
  O: '#ffff00',
  T: '#800080',
  S: '#00ff00',
  Z: '#ff0000',
  J: '#0000ff',
  L: '#ffa500',
};

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const INITIAL_SPEED = 1000;
export const MIN_SPEED = 100;

export function createEmptyBoard(): Board {
  return Array.from({ length: BOARD_HEIGHT }, () => Array.from({ length: BOARD_WIDTH }, () => null));
}

export function getPieceBlocks(piece: Piece): { x: number; y: number }[] {
  const shape = TETROMINO_SHAPES[piece.type][piece.rotation];
  const blocks: { x: number; y: number }[] = [];
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        blocks.push({ x: piece.x + x, y: piece.y + y });
      }
    }
  }
  return blocks;
}

export function isValidPosition(board: Board, piece: Piece): boolean {
  const blocks = getPieceBlocks(piece);
  for (const block of blocks) {
    if (block.x < 0 || block.x >= BOARD_WIDTH || block.y >= BOARD_HEIGHT) return false;
    if (block.y >= 0 && board[block.y][block.x] !== null) return false;
  }
  return true;
}

export function lockPiece(board: Board, piece: Piece): Board {
  const newBoard = board.map(row => [...row]);
  const blocks = getPieceBlocks(piece);
  for (const block of blocks) {
    if (block.y >= 0 && block.y < BOARD_HEIGHT && block.x >= 0 && block.x < BOARD_WIDTH) {
      newBoard[block.y][block.x] = piece.type;
    }
  }
  return newBoard;
}

export function clearLines(board: Board): { board: Board; linesCleared: number } {
  const newBoard: Board = [];
  let linesCleared = 0;
  for (let y = 0; y < BOARD_HEIGHT; y++) {
    if (board[y].every(cell => cell !== null)) {
      linesCleared++;
    } else {
      newBoard.push(board[y]);
    }
  }
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array.from({ length: BOARD_WIDTH }, () => null));
  }
  return { board: newBoard, linesCleared };
}

export function calculateScore(linesCleared: number, level: number): number {
  const lineScores = [0, 100, 300, 500, 800];
  return (lineScores[linesCleared] || 0) * level;
}

export function getDropSpeed(level: number): number {
  const speed = INITIAL_SPEED - (level - 1) * 80;
  return Math.max(MIN_SPEED, speed);
}

export function getGhostY(board: Board, piece: Piece): number {
  let ghostY = piece.y;
  while (isValidPosition(board, { ...piece, y: ghostY + 1 })) {
    ghostY++;
  }
  return ghostY;
}

export function randomTetromino(): TetrominoType {
  const types: TetrominoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
  return types[Math.floor(Math.random() * types.length)];
}

export function generateBag(): TetrominoType[] {
  const types: TetrominoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
  return types.sort(() => Math.random() - 0.5);
}
