import { describe, it, expect } from 'vitest';
import {
  createEmptyBoard,
  getPieceBlocks,
  isValidPosition,
  lockPiece,
  clearLines,
  calculateScore,
  getDropSpeed,
  getGhostY,
  randomTetromino,
  generateBag,
  BOARD_WIDTH,
  BOARD_HEIGHT,
  TETROMINO_SHAPES,
} from '../types/domain';

describe('Tetris Domain Logic', () => {
  describe('createEmptyBoard', () => {
    it('creates a 10x20 board of null cells', () => {
      const board = createEmptyBoard();
      expect(board).toHaveLength(BOARD_HEIGHT);
      expect(board[0]).toHaveLength(BOARD_WIDTH);
      expect(board.every(row => row.every(cell => cell === null))).toBe(true);
    });
  });

  describe('getPieceBlocks', () => {
    it('returns correct blocks for O piece at origin', () => {
      const piece = { type: 'O' as const, x: 0, y: 0, rotation: 0 };
      const blocks = getPieceBlocks(piece);
      expect(blocks).toEqual([
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ]);
    });

    it('returns correct blocks for T piece at offset position', () => {
      const piece = { type: 'T' as const, x: 3, y: 5, rotation: 0 };
      const blocks = getPieceBlocks(piece);
      expect(blocks).toContainEqual({ x: 4, y: 5 });
      expect(blocks).toContainEqual({ x: 3, y: 6 });
      expect(blocks).toContainEqual({ x: 4, y: 6 });
      expect(blocks).toContainEqual({ x: 5, y: 6 });
    });
  });

  describe('isValidPosition', () => {
    it('allows valid position in empty board', () => {
      const board = createEmptyBoard();
      const piece = { type: 'O' as const, x: 0, y: 0, rotation: 0 };
      expect(isValidPosition(board, piece)).toBe(true);
    });

    it('rejects position outside left boundary', () => {
      const board = createEmptyBoard();
      const piece = { type: 'O' as const, x: -1, y: 0, rotation: 0 };
      expect(isValidPosition(board, piece)).toBe(false);
    });

    it('rejects position outside right boundary', () => {
      const board = createEmptyBoard();
      const piece = { type: 'I' as const, x: 8, y: 0, rotation: 0 };
      expect(isValidPosition(board, piece)).toBe(false);
    });

    it('rejects collision with locked blocks', () => {
      const board = createEmptyBoard();
      board[5][5] = 'Z';
      const piece = { type: 'O' as const, x: 4, y: 4, rotation: 0 };
      expect(isValidPosition(board, piece)).toBe(false);
    });
  });

  describe('lockPiece', () => {
    it('locks piece blocks into the board', () => {
      const board = createEmptyBoard();
      const piece = { type: 'O' as const, x: 0, y: 0, rotation: 0 };
      const newBoard = lockPiece(board, piece);
      expect(newBoard[0][0]).toBe('O');
      expect(newBoard[0][1]).toBe('O');
      expect(newBoard[1][0]).toBe('O');
      expect(newBoard[1][1]).toBe('O');
    });

    it('does not mutate original board', () => {
      const board = createEmptyBoard();
      const piece = { type: 'O' as const, x: 0, y: 0, rotation: 0 };
      lockPiece(board, piece);
      expect(board[0][0]).toBeNull();
    });
  });

  describe('clearLines', () => {
    it('clears a full line and adds empty line at top', () => {
      const board = createEmptyBoard();
      board[19] = Array.from({ length: BOARD_WIDTH }, () => 'I' as const);
      const { board: newBoard, linesCleared } = clearLines(board);
      expect(linesCleared).toBe(1);
      expect(newBoard[0].every(cell => cell === null)).toBe(true);
      expect(newBoard[19].every(cell => cell === null)).toBe(true);
    });

    it('clears multiple full lines', () => {
      const board = createEmptyBoard();
      board[18] = Array.from({ length: BOARD_WIDTH }, () => 'O' as const);
      board[19] = Array.from({ length: BOARD_WIDTH }, () => 'T' as const);
      const { linesCleared } = clearLines(board);
      expect(linesCleared).toBe(2);
    });

    it('preserves non-full lines', () => {
      const board = createEmptyBoard();
      board[19] = ['I', 'I', 'I', 'I', null, 'I', 'I', 'I', 'I', 'I'];
      const { board: newBoard, linesCleared } = clearLines(board);
      expect(linesCleared).toBe(0);
      expect(newBoard[19]).toEqual(board[19]);
    });
  });

  describe('calculateScore', () => {
    it('returns 0 for 0 lines', () => {
      expect(calculateScore(0, 1)).toBe(0);
    });

    it('returns 100 * level for 1 line', () => {
      expect(calculateScore(1, 1)).toBe(100);
      expect(calculateScore(1, 5)).toBe(500);
    });

    it('returns 300 * level for 2 lines', () => {
      expect(calculateScore(2, 1)).toBe(300);
      expect(calculateScore(2, 2)).toBe(600);
    });

    it('returns 500 * level for 3 lines', () => {
      expect(calculateScore(3, 1)).toBe(500);
    });

    it('returns 800 * level for 4 lines (Tetris)', () => {
      expect(calculateScore(4, 1)).toBe(800);
      expect(calculateScore(4, 3)).toBe(2400);
    });
  });

  describe('getDropSpeed', () => {
    it('returns initial speed at level 1', () => {
      expect(getDropSpeed(1)).toBe(1000);
    });

    it('decreases speed as level increases', () => {
      expect(getDropSpeed(2)).toBe(920);
      expect(getDropSpeed(5)).toBe(680);
    });

    it('caps at minimum speed', () => {
      expect(getDropSpeed(20)).toBe(100);
    });
  });

  describe('getGhostY', () => {
    it('returns same y when piece is on floor', () => {
      const board = createEmptyBoard();
      const piece = { type: 'O' as const, x: 0, y: 18, rotation: 0 };
      expect(getGhostY(board, piece)).toBe(18);
    });

    it('returns lower y when piece can fall', () => {
      const board = createEmptyBoard();
      const piece = { type: 'O' as const, x: 0, y: 0, rotation: 0 };
      expect(getGhostY(board, piece)).toBe(18);
    });
  });

  describe('randomTetromino', () => {
    it('returns a valid tetromino type', () => {
      const piece = randomTetromino();
      expect(['I', 'O', 'T', 'S', 'Z', 'J', 'L']).toContain(piece);
    });
  });

  describe('generateBag', () => {
    it('returns all 7 tetrominoes in random order', () => {
      const bag = generateBag();
      expect(bag).toHaveLength(7);
      expect(new Set(bag).size).toBe(7);
      expect(bag.every(p => ['I', 'O', 'T', 'S', 'Z', 'J', 'L'].includes(p))).toBe(true);
    });
  });
});
