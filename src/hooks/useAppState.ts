import { useState, useCallback, useRef, useEffect } from 'react';
import {
  type Board,
  type Piece,
  type TetrominoType,
  type GameState,
  BOARD_WIDTH,
  BOARD_HEIGHT,
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
  TETROMINO_SHAPES,
} from '../types/domain';
import { loadHighScore, saveHighScore } from '../utils/storage';

export function useAppState() {
  const [board, setBoard] = useState<Board>(createEmptyBoard);
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [nextPieces, setNextPieces] = useState<TetrominoType[]>([]);
  const [holdPiece, setHoldPiece] = useState<TetrominoType | null>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [highScore, setHighScore] = useState(loadHighScore);
  const [isPaused, setIsPaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [screen, setScreen] = useState<'menu' | 'playing' | 'paused' | 'gameover' | 'settings' | 'help'>('menu');
  const [canHold, setCanHold] = useState(true);

  const bagRef = useRef<TetrominoType[]>([]);
  const lastDropRef = useRef(0);
  const animFrameRef = useRef(0);
  const keysRef = useRef<Set<string>>(new Set());
  const lastMoveRef = useRef<Record<string, number>>({});
  const isPlayingRef = useRef(false);

  const getNextTetromino = useCallback((): TetrominoType => {
    if (bagRef.current.length === 0) {
      bagRef.current = generateBag();
    }
    return bagRef.current.pop()!;
  }, []);

  const spawnPiece = useCallback((type?: TetrominoType): Piece | null => {
    const pieceType = type ?? getNextTetromino();
    const piece: Piece = {
      type: pieceType,
      x: Math.floor(BOARD_WIDTH / 2) - 1,
      y: 0,
      rotation: 0,
    };
    // Adjust for O and I pieces
    if (pieceType === 'O') piece.x -= 1;
    if (!isValidPosition(board, piece)) {
      return null;
    }
    return piece;
  }, [board, getNextTetromino]);

  const tryWallKicks = useCallback((piece: Piece, newRotation: number): Piece | null => {
    const kicks = [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: -2, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 },
    ];
    for (const kick of kicks) {
      const candidate = { ...piece, rotation: newRotation, x: piece.x + kick.x, y: piece.y + kick.y };
      if (isValidPosition(board, candidate)) {
        return candidate;
      }
    }
    return null;
  }, [board]);

  const rotatePiece = useCallback((clockwise: boolean) => {
    if (!currentPiece || isPaused || isGameOver) return;
    const newRotation = (currentPiece.rotation + (clockwise ? 1 : 3)) % 4;
    const kicked = tryWallKicks(currentPiece, newRotation);
    if (kicked) {
      setCurrentPiece(kicked);
    }
  }, [currentPiece, isPaused, isGameOver, tryWallKicks]);

  const movePiece = useCallback((dx: number, dy: number) => {
    if (!currentPiece || isPaused || isGameOver) return false;
    const candidate = { ...currentPiece, x: currentPiece.x + dx, y: currentPiece.y + dy };
    if (isValidPosition(board, candidate)) {
      setCurrentPiece(candidate);
      return true;
    }
    return false;
  }, [currentPiece, board, isPaused, isGameOver]);

  const hardDrop = useCallback(() => {
    if (!currentPiece || isPaused || isGameOver) return;
    let dropY = currentPiece.y;
    while (isValidPosition(board, { ...currentPiece, y: dropY + 1 })) {
      dropY++;
    }
    const dropped = { ...currentPiece, y: dropY };
    setCurrentPiece(dropped);
    // Lock immediately
    const newBoard = lockPiece(board, dropped);
    const { board: clearedBoard, linesCleared } = clearLines(newBoard);
    const newLines = lines + linesCleared;
    const newLevel = Math.floor(newLines / 10) + 1;
    const newScore = score + calculateScore(linesCleared, level) + (dropped.y - currentPiece.y) * 2;
    setBoard(clearedBoard);
    setLines(newLines);
    setLevel(newLevel);
    setScore(newScore);
    setCanHold(true);

    const next = spawnPiece();
    if (!next) {
      setIsGameOver(true);
      setScreen('gameover');
      isPlayingRef.current = false;
      if (newScore > highScore) {
        setHighScore(newScore);
        saveHighScore(newScore);
      }
    } else {
      setCurrentPiece(next);
    }
  }, [currentPiece, board, lines, level, score, highScore, isPaused, isGameOver, spawnPiece]);

  const softDrop = useCallback(() => {
    if (!currentPiece || isPaused || isGameOver) return;
    if (!movePiece(0, 1)) {
      // Lock piece
      const newBoard = lockPiece(board, currentPiece);
      const { board: clearedBoard, linesCleared } = clearLines(newBoard);
      const newLines = lines + linesCleared;
      const newLevel = Math.floor(newLines / 10) + 1;
      const newScore = score + calculateScore(linesCleared, level);
      setBoard(clearedBoard);
      setLines(newLines);
      setLevel(newLevel);
      setScore(newScore);
      setCanHold(true);

      const next = spawnPiece();
      if (!next) {
        setIsGameOver(true);
        setScreen('gameover');
        isPlayingRef.current = false;
        if (newScore > highScore) {
          setHighScore(newScore);
          saveHighScore(newScore);
        }
      } else {
        setCurrentPiece(next);
      }
    }
  }, [currentPiece, board, lines, level, score, highScore, isPaused, isGameOver, movePiece, spawnPiece]);

  const holdCurrentPiece = useCallback(() => {
    if (!currentPiece || !canHold || isPaused || isGameOver) return;
    const currentType = currentPiece.type;
    if (holdPiece) {
      const next = spawnPiece(holdPiece);
      if (next) {
        setCurrentPiece(next);
      }
    } else {
      const next = spawnPiece();
      if (next) {
        setCurrentPiece(next);
      }
    }
    setHoldPiece(currentType);
    setCanHold(false);
  }, [currentPiece, holdPiece, canHold, isPaused, isGameOver, spawnPiece]);

  const startGame = useCallback(() => {
    const newBoard = createEmptyBoard();
    bagRef.current = generateBag();
    const initialNext: TetrominoType[] = [getNextTetromino(), getNextTetromino(), getNextTetromino()];
    setNextPieces(initialNext);
    const first = spawnPiece();
    if (first) {
      setBoard(newBoard);
      setCurrentPiece(first);
      setHoldPiece(null);
      setScore(0);
      setLevel(1);
      setLines(0);
      setIsPaused(false);
      setIsGameOver(false);
      setCanHold(true);
      setScreen('playing');
      isPlayingRef.current = true;
      lastDropRef.current = performance.now();
    }
  }, [getNextTetromino, spawnPiece]);

  const pauseGame = useCallback(() => {
    if (screen === 'playing') {
      setIsPaused(true);
      setScreen('paused');
      isPlayingRef.current = false;
    }
  }, [screen]);

  const resumeGame = useCallback(() => {
    if (screen === 'paused') {
      setIsPaused(false);
      setScreen('playing');
      isPlayingRef.current = true;
      lastDropRef.current = performance.now();
    }
  }, [screen]);

  const togglePause = useCallback(() => {
    if (isGameOver) return;
    if (screen === 'playing') {
      pauseGame();
    } else if (screen === 'paused') {
      resumeGame();
    }
  }, [isGameOver, screen, pauseGame, resumeGame]);

  const restartGame = useCallback(() => {
    startGame();
  }, [startGame]);

  const goToMenu = useCallback(() => {
    isPlayingRef.current = false;
    setScreen('menu');
  }, []);

  const goToSettings = useCallback(() => {
    isPlayingRef.current = false;
    setScreen('settings');
  }, []);

  const goToHelp = useCallback(() => {
    isPlayingRef.current = false;
    setScreen('help');
  }, []);

  // Game loop
  useEffect(() => {
    const loop = (timestamp: number) => {
      if (isPlayingRef.current && currentPiece && !isPaused && !isGameOver) {
        const speed = getDropSpeed(level);
        if (timestamp - lastDropRef.current >= speed) {
          softDrop();
          lastDropRef.current = timestamp;
        }
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };
    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [currentPiece, level, isPaused, isGameOver, softDrop]);

  // Keyboard controls
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const code = e.code;
      keysRef.current.add(code);

      if (code === 'KeyP') {
        e.preventDefault();
        togglePause();
        return;
      }

      if (screen === 'playing' && !isPaused && !isGameOver) {
        if (['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', 'Space', 'KeyZ', 'KeyX', 'KeyC', 'ShiftLeft', 'ShiftRight'].includes(code)) {
          e.preventDefault();
        }
        if (code === 'ArrowLeft') movePiece(-1, 0);
        if (code === 'ArrowRight') movePiece(1, 0);
        if (code === 'ArrowDown') softDrop();
        if (code === 'ArrowUp' || code === 'KeyX') rotatePiece(true);
        if (code === 'KeyZ') rotatePiece(false);
        if (code === 'Space') hardDrop();
        if (code === 'ShiftLeft' || code === 'ShiftRight' || code === 'KeyC') holdCurrentPiece();
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.code);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [screen, isPaused, isGameOver, movePiece, softDrop, rotatePiece, hardDrop, holdCurrentPiece, togglePause]);

  // Continuous movement for held keys (DAS/ARR simplified)
  useEffect(() => {
    if (screen !== 'playing' || isPaused || isGameOver) return;
    let interval: ReturnType<typeof setInterval>;
    interval = setInterval(() => {
      const now = Date.now();
      const das = 170;
      const arr = 50;
      if (keysRef.current.has('ArrowLeft')) {
        const last = lastMoveRef.current['ArrowLeft'] ?? 0;
        if (now - last >= (last === 0 ? das : arr)) {
          movePiece(-1, 0);
          lastMoveRef.current['ArrowLeft'] = now;
        }
      }
      if (keysRef.current.has('ArrowRight')) {
        const last = lastMoveRef.current['ArrowRight'] ?? 0;
        if (now - last >= (last === 0 ? das : arr)) {
          movePiece(1, 0);
          lastMoveRef.current['ArrowRight'] = now;
        }
      }
      if (keysRef.current.has('ArrowDown')) {
        const last = lastMoveRef.current['ArrowDown'] ?? 0;
        if (now - last >= 50) {
          softDrop();
          lastMoveRef.current['ArrowDown'] = now;
        }
      }
    }, 16);
    return () => clearInterval(interval);
  }, [screen, isPaused, isGameOver, movePiece, softDrop]);

  const resetKeyTimers = useCallback(() => {
    lastMoveRef.current = {};
  }, []);

  const gameState: GameState = {
    board,
    currentPiece,
    nextPieces,
    holdPiece,
    score,
    level,
    lines,
    highScore,
    isPaused,
    isGameOver,
    canHold,
  };

  return {
    gameState,
    screen,
    startGame,
    pauseGame,
    resumeGame,
    togglePause,
    restartGame,
    goToMenu,
    goToSettings,
    goToHelp,
    movePiece,
    rotatePiece,
    softDrop,
    hardDrop,
    holdCurrentPiece,
    resetKeyTimers,
  };
}
