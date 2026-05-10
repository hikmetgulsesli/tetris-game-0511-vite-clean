import { useRef, useEffect, useCallback } from 'react';
import { AppProvider, useAppContext } from './contexts/AppContext';
import { MainMenu } from './screens/MainMenu';
import { Playfield } from './screens/Playfield';
import { Help } from './screens/Help';
import { Settings } from './screens/Settings';
import { Results } from './screens/Results';
import { getPieceBlocks, getGhostY, TETROMINO_CSS_COLORS, BOARD_WIDTH, BOARD_HEIGHT } from './types/domain';
import './App.css';

function GameBoard() {
  const { gameState, movePiece, rotatePiece, softDrop, hardDrop, holdCurrentPiece } = useAppContext();
  const { board, currentPiece } = gameState;
  const showGhost = true;

  const getGhostBlocks = () => {
    if (!currentPiece || !showGhost) return [];
    const ghostY = getGhostY(board, currentPiece);
    return getPieceBlocks({ ...currentPiece, y: ghostY });
  };

  const ghostBlocks = getGhostBlocks();
  const currentBlocks = currentPiece ? getPieceBlocks(currentPiece) : [];

  const isCurrentBlock = (x: number, y: number) =>
    currentBlocks.some(b => b.x === x && b.y === y);

  const isGhostBlock = (x: number, y: number) =>
    ghostBlocks.some(b => b.x === x && b.y === y) && !isCurrentBlock(x, y);

  const getCellColor = (x: number, y: number) => {
    if (isCurrentBlock(x, y) && currentPiece) {
      return TETROMINO_CSS_COLORS[currentPiece.type];
    }
    const cell = board[y][x];
    if (cell) return TETROMINO_CSS_COLORS[cell];
    return null;
  };

  return (
    <div
      className="relative bg-surface-container-lowest border-2 border-outline-variant/50 rounded-sm w-[307px] lg:w-[409px] max-w-[300px] lg:max-w-[400px] h-full game-well-grid shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
      data-testid="game-board"
      role="grid"
      aria-label="Tetris game board"
    >
      {Array.from({ length: BOARD_HEIGHT }).map((_, y) => (
        <div key={y} className="flex" style={{ height: `${100 / BOARD_HEIGHT}%` }}>
          {Array.from({ length: BOARD_WIDTH }).map((_, x) => {
            const color = getCellColor(x, y);
            const isGhost = isGhostBlock(x, y);
            return (
              <div
                key={`${x}-${y}`}
                className="flex-1 border border-surface-container-lowest/30"
                style={{
                  backgroundColor: color ?? 'transparent',
                  boxShadow: color ? `inset 0 0 10px rgba(255,255,255,0.4)` : 'none',
                  opacity: isGhost ? 0.4 : 1,
                  borderStyle: isGhost ? 'dashed' : 'solid',
                  borderColor: isGhost ? (currentPiece ? TETROMINO_CSS_COLORS[currentPiece.type] : '#666') : undefined,
                }}
                data-testid={`cell-${x}-${y}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

function NextPieces() {
  const { gameState } = useAppContext();
  const { nextPieces } = gameState;

  const renderMiniPiece = (type: string, size: number, opacity = 1) => {
    const shapes: Record<string, number[][]> = {
      I: [[1, 1, 1, 1]],
      O: [[1, 1], [1, 1]],
      T: [[0, 1, 0], [1, 1, 1]],
      S: [[0, 1, 1], [1, 1, 0]],
      Z: [[1, 1, 0], [0, 1, 1]],
      J: [[1, 0, 0], [1, 1, 1]],
      L: [[0, 0, 1], [1, 1, 1]],
    };
    const shape = shapes[type] || shapes.I;
    const cellSize = size;
    return (
      <div className="relative" style={{ width: shape[0].length * cellSize, height: shape.length * cellSize, opacity }}>
        {shape.map((row, y) =>
          row.map((cell, x) =>
            cell ? (
              <div
                key={`${x}-${y}`}
                className="absolute border border-surface-container-lowest"
                style={{
                  left: x * cellSize,
                  top: y * cellSize,
                  width: cellSize,
                  height: cellSize,
                  backgroundColor: TETROMINO_CSS_COLORS[type as keyof typeof TETROMINO_CSS_COLORS],
                  boxShadow: 'inset 0 0 8px rgba(255,255,255,0.3)',
                }}
              />
            ) : null
          )
        )}
      </div>
    );
  };

  return (
    <div className="glass-panel p-md rounded-xl flex-grow">
      <h2 className="text-label-caps font-label-caps text-on-surface-variant mb-md">NEXT</h2>
      <div className="flex flex-col gap-lg items-center pt-sm">
        {nextPieces.map((type, i) => (
          <div key={`${type}-${i}`} className="flex items-center justify-center" style={{ opacity: 1 - i * 0.3 }}>
            {renderMiniPiece(type, i === 0 ? 30 : 20, 1 - i * 0.3)}
          </div>
        ))}
      </div>
    </div>
  );
}

function HoldPiece() {
  const { gameState } = useAppContext();
  const { holdPiece } = gameState;

  const renderMiniPiece = (type: string, size: number) => {
    const shapes: Record<string, number[][]> = {
      I: [[1, 1, 1, 1]],
      O: [[1, 1], [1, 1]],
      T: [[0, 1, 0], [1, 1, 1]],
      S: [[0, 1, 1], [1, 1, 0]],
      Z: [[1, 1, 0], [0, 1, 1]],
      J: [[1, 0, 0], [1, 1, 1]],
      L: [[0, 0, 1], [1, 1, 1]],
    };
    const shape = shapes[type] || shapes.I;
    const cellSize = size;
    return (
      <div className="relative" style={{ width: shape[0].length * cellSize, height: shape.length * cellSize }}>
        {shape.map((row, y) =>
          row.map((cell, x) =>
            cell ? (
              <div
                key={`${x}-${y}`}
                className="absolute border border-surface-container-lowest"
                style={{
                  left: x * cellSize,
                  top: y * cellSize,
                  width: cellSize,
                  height: cellSize,
                  backgroundColor: TETROMINO_CSS_COLORS[type as keyof typeof TETROMINO_CSS_COLORS],
                  boxShadow: 'inset 0 0 8px rgba(255,255,255,0.3)',
                }}
              />
            ) : null
          )
        )}
      </div>
    );
  };

  return (
    <div className="glass-panel p-md rounded-xl flex-grow max-h-[200px]">
      <h2 className="text-label-caps font-label-caps text-on-surface-variant mb-md">HOLD</h2>
      <div className="w-full h-full flex items-center justify-center relative pb-lg">
        {holdPiece ? renderMiniPiece(holdPiece, 40) : (
          <span className="text-on-surface-variant text-body-sm">Empty</span>
        )}
      </div>
    </div>
  );
}

function MenuScreen() {
  const { startGame, goToSettings, goToHelp, gameState } = useAppContext();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const btn = (e.target as HTMLElement).closest('button');
    if (!btn) return;
    const text = btn.textContent || '';
    if (text.includes('Start New') || text.includes('Resume Game')) {
      startGame();
    } else if (text.includes('Settings')) {
      goToSettings();
    } else if (text.includes('Help')) {
      goToHelp();
    }
  }, [startGame, goToSettings, goToHelp]);

  return (
    <div ref={menuRef} onClick={handleClick} className="min-h-screen bg-background text-on-surface flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none z-0" />
      <main className="relative z-10 w-full max-w-md px-md md:px-0 flex flex-col items-center">
        <div className="mb-xl text-center">
          <h1 className="text-display-lg font-display-lg text-primary mb-sm tracking-tighter" style={{ textShadow: '0 0 20px rgba(37, 99, 235, 0.4)' }}>
            TETRIS COMMAND
          </h1>
          <p className="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest">
            System Initialized
          </p>
        </div>
        <div className="bg-surface-container border border-outline-variant rounded-lg p-md mb-xl w-full flex justify-between items-center bg-opacity-80 backdrop-blur-md">
          <div className="flex items-center gap-sm">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
            <span className="text-label-caps font-label-caps text-on-surface-variant">HIGH SCORE</span>
          </div>
          <div className="text-mono-stats font-mono-stats text-primary">
            {gameState.highScore.toLocaleString('en-US', { minimumIntegerDigits: 6 })}
          </div>
        </div>
        <nav className="w-full flex flex-col gap-sm">
          <button
            className="w-full bg-surface-container border border-primary text-primary hover:bg-primary-container hover:text-white transition-all duration-200 rounded-lg py-md px-lg flex items-center justify-between group"
            onClick={startGame}
            aria-label="Resume or start game"
          >
            <span className="text-headline-sm font-headline-sm">{gameState.isGameOver || gameState.score > 0 ? 'Resume Game' : 'Start New'}</span>
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">play_arrow</span>
          </button>
          <button
            className="w-full bg-primary-container text-white glow-primary hover:bg-inverse-primary transition-all duration-200 rounded-lg py-md px-lg flex items-center justify-between mt-sm"
            onClick={startGame}
            aria-label="Start new game"
          >
            <span className="text-headline-sm font-headline-sm">Start New</span>
            <span className="material-symbols-outlined">add</span>
          </button>
          <div className="grid grid-cols-2 gap-sm mt-sm">
            <button
              className="w-full bg-surface-container border border-outline-variant text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors duration-200 rounded-lg py-sm px-md flex items-center justify-center gap-xs"
              onClick={goToSettings}
              aria-label="Settings"
            >
              <span className="material-symbols-outlined text-[20px]">settings</span>
              <span className="text-label-caps font-label-caps">Settings</span>
            </button>
            <button
              className="w-full bg-surface-container border border-outline-variant text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors duration-200 rounded-lg py-sm px-md flex items-center justify-center gap-xs"
              onClick={goToHelp}
              aria-label="Help"
            >
              <span className="material-symbols-outlined text-[20px]">help_outline</span>
              <span className="text-label-caps font-label-caps">Help</span>
            </button>
          </div>
        </nav>
        <div className="mt-xl text-center">
          <span className="text-body-sm font-body-sm text-on-surface-variant opacity-50">v2.4.1.09</span>
        </div>
      </main>
    </div>
  );
}

function PlayScreen() {
  const { gameState, togglePause, pauseGame, goToMenu, movePiece, rotatePiece, softDrop, hardDrop, holdCurrentPiece } = useAppContext();
  const { score, level, lines, isPaused } = gameState;

  const levelProgress = Math.min(100, ((lines % 10) / 10) * 100);

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col relative overflow-hidden">
      {/* TopAppBar */}
      <header className="bg-surface/80 backdrop-blur-md dark:bg-surface/80 border-b border-outline-variant/30 docked full-width top-0 z-50">
        <div className="flex justify-between items-center w-full px-xl h-16 max-w-full mx-auto">
          <div className="text-headline-md font-headline-md font-extrabold tracking-tighter text-primary dark:text-primary">
            TETRIS COMMAND
          </div>
          <nav className="hidden md:flex items-center gap-lg">
            <span className="text-primary font-bold border-b-2 border-primary pb-1 text-label-caps font-label-caps uppercase">Play</span>
            <button onClick={goToMenu} className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200 text-label-caps font-label-caps uppercase">Menu</button>
            <button onClick={goToMenu} className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200 text-label-caps font-label-caps uppercase">Help</button>
          </nav>
          <div className="flex items-center gap-md text-primary dark:text-primary">
            <button aria-label="Pause" onClick={togglePause} className="hover:text-primary transition-colors duration-200">
              <span className="material-symbols-outlined">{isPaused ? 'play_arrow' : 'pause'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex-grow flex flex-col lg:flex-row items-center justify-center p-md lg:p-xl gap-lg relative w-full max-w-7xl mx-auto h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)] overflow-hidden">
        {/* Left Panel: Stats (Desktop) */}
        <aside className="hidden lg:flex flex-col w-64 gap-md glass-panel p-md rounded-xl h-[819px] max-h-[800px]">
          <div className="flex-grow flex flex-col gap-lg">
            <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant/50">
              <h2 className="text-label-caps font-label-caps text-on-surface-variant mb-xs">SCORE</h2>
              <div className="text-display-lg font-mono-stats text-primary pulse-score" data-testid="score-display">
                {score.toLocaleString('en-US', { minimumIntegerDigits: 6 })}
              </div>
            </div>
            <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant/50">
              <h2 className="text-label-caps font-label-caps text-on-surface-variant mb-xs">LEVEL</h2>
              <div className="text-headline-md font-mono-stats text-on-surface mb-sm" data-testid="level-display">{level.toString().padStart(2, '0')}</div>
              <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-300" style={{ width: `${levelProgress}%` }} />
              </div>
            </div>
            <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant/50">
              <h2 className="text-label-caps font-label-caps text-on-surface-variant mb-xs">LINES</h2>
              <div className="text-headline-md font-mono-stats text-on-surface" data-testid="lines-display">{lines.toString().padStart(3, '0')}</div>
            </div>
          </div>
          <button
            onClick={togglePause}
            className="w-full py-3 border border-outline-variant text-on-surface hover:bg-surface-variant transition-colors rounded-lg flex items-center justify-center gap-sm font-label-caps text-label-caps"
            aria-label={isPaused ? 'Resume' : 'Pause'}
            data-testid="pause-btn"
          >
            <span className="material-symbols-outlined text-sm">{isPaused ? 'play_arrow' : 'pause'}</span>
            {isPaused ? 'RESUME' : 'PAUSE'}
          </button>
        </aside>

        {/* Center: Game Board */}
        <div className="relative flex-shrink-0 flex flex-col items-center h-[614px] lg:h-[819px] max-h-[800px]">
          {/* Mobile Top Stats Bar */}
          <div className="lg:hidden flex justify-between w-full mb-sm glass-panel p-sm rounded-lg">
            <div>
              <div className="text-[10px] font-label-caps text-on-surface-variant leading-none">SCORE</div>
              <div className="font-mono-stats text-body-md text-primary leading-none mt-1" data-testid="mobile-score">{score.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] font-label-caps text-on-surface-variant leading-none">LEVEL</div>
              <div className="font-mono-stats text-body-md text-on-surface leading-none mt-1">{level}</div>
            </div>
            <button
              onClick={togglePause}
              className="text-on-surface flex items-center justify-center"
              aria-label={isPaused ? 'Resume' : 'Pause'}
            >
              <span className="material-symbols-outlined">{isPaused ? 'play_arrow' : 'pause'}</span>
            </button>
          </div>
          <GameBoard />
        </div>

        {/* Right Panel: Next/Hold (Desktop) */}
        <aside className="hidden lg:flex flex-col w-64 gap-md h-[819px] max-h-[800px]">
          <HoldPiece />
          <NextPieces />
        </aside>

        {/* Mobile Controls Area (Bottom 30%) */}
        <div className="lg:hidden w-full flex-grow flex flex-col justify-end pb-safe mt-md">
          <div className="flex justify-between w-full mb-md px-md gap-sm">
            <div className="glass-panel rounded-lg p-2 w-[48%] flex items-center justify-between">
              <span className="text-[10px] font-label-caps text-on-surface-variant">HOLD</span>
              <div className="w-[40px] h-[20px] bg-surface-container relative flex items-center justify-center">
                {gameState.holdPiece ? (
                  <div className="w-[20px] h-[10px]" style={{ backgroundColor: TETROMINO_CSS_COLORS[gameState.holdPiece] }} />
                ) : (
                  <span className="text-[8px] text-on-surface-variant">—</span>
                )}
              </div>
            </div>
            <div className="glass-panel rounded-lg p-2 w-[48%] flex items-center justify-between">
              <span className="text-[10px] font-label-caps text-on-surface-variant">NEXT</span>
              <div className="w-[40px] h-[10px]" style={{ backgroundColor: gameState.nextPieces[0] ? TETROMINO_CSS_COLORS[gameState.nextPieces[0]] : 'transparent' }} />
            </div>
          </div>
          <div className="w-full flex justify-between px-md pb-md h-32 items-center">
            <div className="relative w-32 h-32">
              <button
                onClick={() => movePiece(-1, 0)}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-surface-container-high rounded-full border border-outline-variant/30 flex items-center justify-center active:bg-primary-container active:scale-95 transition-all"
                aria-label="Move left"
              >
                <span className="material-symbols-outlined text-on-surface">arrow_left</span>
              </button>
              <button
                onClick={() => movePiece(1, 0)}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-surface-container-high rounded-full border border-outline-variant/30 flex items-center justify-center active:bg-primary-container active:scale-95 transition-all"
                aria-label="Move right"
              >
                <span className="material-symbols-outlined text-on-surface">arrow_right</span>
              </button>
              <button
                onClick={softDrop}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-surface-container-high rounded-full border border-outline-variant/30 flex items-center justify-center active:bg-primary-container active:scale-95 transition-all"
                aria-label="Soft drop"
              >
                <span className="material-symbols-outlined text-on-surface">arrow_drop_down</span>
              </button>
            </div>
            <div className="flex gap-4 items-end h-full pb-2">
              <button
                onClick={() => rotatePiece(true)}
                className="w-14 h-14 bg-surface-container-high rounded-full border border-outline-variant/30 flex items-center justify-center active:bg-primary-container active:scale-95 transition-all shadow-lg"
                aria-label="Rotate"
              >
                <span className="material-symbols-outlined text-on-surface text-2xl">rotate_right</span>
              </button>
              <button
                onClick={hardDrop}
                className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center active:scale-95 transition-all shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                aria-label="Hard drop"
              >
                <span className="material-symbols-outlined text-white text-3xl">keyboard_double_arrow_down</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Pause Overlay */}
      {isPaused && (
        <div className="fixed inset-0 z-[60] bg-background/70 backdrop-blur-md flex items-center justify-center" data-testid="pause-overlay">
          <div className="bg-surface-container rounded-xl border border-outline-variant/50 p-xl shadow-2xl flex flex-col items-center gap-md max-w-sm w-full mx-md">
            <h2 className="text-display-lg font-display-lg text-primary">PAUSED</h2>
            <button
              onClick={togglePause}
              className="w-full bg-primary-container text-on-primary-container py-md rounded-lg text-headline-sm font-headline-sm flex items-center justify-center gap-sm hover:shadow-[0_0_15px_rgba(37,99,235,0.6)] transition-all duration-200"
              data-testid="resume-btn"
            >
              <span className="material-symbols-outlined">play_arrow</span>
              Resume
            </button>
            <button
              onClick={goToMenu}
              className="w-full bg-transparent border border-outline-variant text-on-surface py-md rounded-lg text-body-sm font-body-sm flex items-center justify-center gap-xs hover:bg-surface-container-highest transition-colors duration-200"
            >
              <span className="material-symbols-outlined text-[20px]">menu</span>
              Main Menu
            </button>
          </div>
        </div>
      )}

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 px-md pb-safe bg-surface dark:bg-surface rounded-t-xl border-t border-outline-variant/30 bg-surface/90 backdrop-blur-xl shadow-xl">
        <button onClick={goToMenu} className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary-fixed-dim active:scale-90 transition-transform">
          <span className="material-symbols-outlined">menu</span>
          <span className="text-label-caps font-label-caps mt-1">Menu</span>
        </button>
      </nav>
    </div>
  );
}

function GameOverScreen() {
  const { gameState, restartGame, goToMenu } = useAppContext();
  const { score, level, lines, highScore } = gameState;
  const isNewBest = score >= highScore && score > 0;

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 blur-sm">
        <div className="w-full max-w-2xl h-3/4 border border-outline-variant/30 relative" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.1) 0%, transparent 70%)' }}>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
        </div>
      </div>
      <div className="fixed inset-0 backdrop-blur-[20px] bg-background/60 z-10" />
      <main className="relative z-20 w-full max-w-lg mx-auto px-md">
        <div className="bg-surface-container rounded-xl border border-outline-variant/50 p-xl shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute inset-0 pointer-events-none rounded-xl" style={{ boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.5)' }} />
          <h1 className="text-display-lg font-display-lg text-error mb-sm text-center drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">GAME OVER</h1>
          {isNewBest && (
            <div className="bg-primary/20 text-primary border border-primary/50 px-md py-sm rounded-full flex items-center gap-sm mb-lg animate-pulse">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="text-label-caps font-label-caps">NEW PERSONAL BEST!</span>
            </div>
          )}
          <div className="w-full grid grid-cols-2 gap-md mb-xl">
            <div className="col-span-2 bg-surface p-md rounded-lg border border-outline-variant/30 flex flex-col items-center justify-center relative group">
              <span className="text-label-caps font-label-caps text-on-surface-variant mb-xs">FINAL SCORE</span>
              <span className="text-display-lg font-mono-stats text-primary font-bold tracking-wider" data-testid="final-score">{score.toLocaleString('en-US', { minimumIntegerDigits: 6 })}</span>
            </div>
            <div className="bg-surface p-md rounded-lg border border-outline-variant/30 flex flex-col items-center justify-center">
              <span className="text-label-caps font-label-caps text-on-surface-variant mb-xs">LEVEL</span>
              <span className="text-headline-md font-mono-stats text-on-surface font-semibold">{level}</span>
            </div>
            <div className="bg-surface p-md rounded-lg border border-outline-variant/30 flex flex-col items-center justify-center">
              <span className="text-label-caps font-label-caps text-on-surface-variant mb-xs">LINES</span>
              <span className="text-headline-md font-mono-stats text-on-surface font-semibold">{lines}</span>
            </div>
          </div>
          <div className="w-full flex flex-col gap-sm">
            <button
              onClick={restartGame}
              className="w-full bg-primary-container text-on-primary-container py-md rounded-lg text-headline-sm font-headline-sm flex items-center justify-center gap-sm hover:shadow-[0_0_15px_rgba(37,99,235,0.6)] transition-all duration-200"
              data-testid="replay-btn"
            >
              <span className="material-symbols-outlined">replay</span>
              Replay
            </button>
            <div className="grid grid-cols-2 gap-sm mt-sm">
              <button
                onClick={goToMenu}
                className="w-full bg-transparent border border-outline-variant text-on-surface py-md rounded-lg text-body-sm font-body-sm flex items-center justify-center gap-xs hover:bg-surface-container-highest transition-colors duration-200"
              >
                <span className="material-symbols-outlined text-[20px]">menu</span>
                Main Menu
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function HelpScreen() {
  const { goToMenu } = useAppContext();
  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col relative">
      <header className="bg-surface/80 backdrop-blur-md text-primary w-full docked full-width top-0 z-50">
        <div className="flex justify-between items-center w-full px-xl h-16 max-w-full mx-auto">
          <div className="text-headline-md font-headline-md font-extrabold tracking-tighter text-primary">TETRIS COMMAND</div>
          <nav className="hidden md:flex gap-lg">
            <button onClick={goToMenu} className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200">Play</button>
            <button onClick={goToMenu} className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200">Menu</button>
            <span className="text-primary font-bold border-b-2 border-primary pb-1 scale-95 duration-100">Help</span>
          </nav>
          <div className="flex gap-md">
            <button onClick={goToMenu} className="hover:text-primary transition-colors duration-200" aria-label="Menu">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden pt-16">
        <main className="flex-1 p-xl overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-xl">
            <div className="flex items-center gap-md mb-xl">
              <button onClick={goToMenu} className="glass-panel p-2 rounded-lg hover:bg-surface-container-high transition-colors" aria-label="Back to menu">
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <h1 className="text-display-lg font-display-lg text-primary">Command Manual</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
              <section className="glass-panel rounded-xl p-lg space-y-md col-span-1 md:col-span-2">
                <h2 className="text-headline-md font-headline-md text-secondary-fixed">How to Play</h2>
                <p className="text-body-md font-body-md text-on-surface-variant">Maneuver the falling Tetriminos to form complete horizontal lines. Completed lines disappear and grant points. The game accelerates as you clear lines. The objective is to survive as long as possible and achieve a high score.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-md mt-lg">
                  <div className="bg-surface-container-low p-md rounded-lg flex flex-col items-center text-center gap-sm">
                    <span className="material-symbols-outlined text-tertiary-fixed text-4xl">rotate_right</span>
                    <h3 className="text-headline-sm font-headline-sm">Rotate</h3>
                    <p className="text-body-sm font-body-sm text-on-surface-variant">Spin pieces to fit the optimal gaps.</p>
                  </div>
                  <div className="bg-surface-container-low p-md rounded-lg flex flex-col items-center text-center gap-sm">
                    <span className="material-symbols-outlined text-primary text-4xl">grid_on</span>
                    <h3 className="text-headline-sm font-headline-sm">Clear Lines</h3>
                    <p className="text-body-sm font-body-sm text-on-surface-variant">Fill a row completely to clear it.</p>
                  </div>
                  <div className="bg-surface-container-low p-md rounded-lg flex flex-col items-center text-center gap-sm">
                    <span className="material-symbols-outlined text-error text-4xl">warning</span>
                    <h3 className="text-headline-sm font-headline-sm">Survive</h3>
                    <p className="text-body-sm font-body-sm text-on-surface-variant">Don't let the pieces reach the top.</p>
                  </div>
                </div>
              </section>
              <section className="glass-panel rounded-xl p-lg space-y-md">
                <h2 className="text-headline-md font-headline-md text-secondary-fixed">Keyboard Controls</h2>
                <ul className="space-y-sm">
                  <li className="flex justify-between items-center py-2 border-b border-outline-variant/30">
                    <span className="text-body-md font-body-md">Move Left/Right</span>
                    <span className="font-mono-stats text-mono-stats bg-surface-container px-2 py-1 rounded text-primary">← / →</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-outline-variant/30">
                    <span className="text-body-md font-body-md">Soft Drop</span>
                    <span className="font-mono-stats text-mono-stats bg-surface-container px-2 py-1 rounded text-primary">↓</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-outline-variant/30">
                    <span className="text-body-md font-body-md">Hard Drop</span>
                    <span className="font-mono-stats text-mono-stats bg-surface-container px-2 py-1 rounded text-primary">Space</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-outline-variant/30">
                    <span className="text-body-md font-body-md">Rotate Clockwise</span>
                    <span className="font-mono-stats text-mono-stats bg-surface-container px-2 py-1 rounded text-primary">↑ / X</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-outline-variant/30">
                    <span className="text-body-md font-body-md">Rotate Counter-CW</span>
                    <span className="font-mono-stats text-mono-stats bg-surface-container px-2 py-1 rounded text-primary">Z / Ctrl</span>
                  </li>
                  <li className="flex justify-between items-center py-2">
                    <span className="text-body-md font-body-md">Hold Piece</span>
                    <span className="font-mono-stats text-mono-stats bg-surface-container px-2 py-1 rounded text-primary">Shift / C</span>
                  </li>
                </ul>
              </section>
              <section className="glass-panel rounded-xl p-lg space-y-md">
                <h2 className="text-headline-md font-headline-md text-secondary-fixed">Touch Controls</h2>
                <ul className="space-y-sm">
                  <li className="flex items-start gap-md py-2">
                    <span className="material-symbols-outlined text-primary mt-1">swipe_left</span>
                    <div>
                      <h4 className="text-headline-sm font-headline-sm">Swipe Left/Right</h4>
                      <p className="text-body-sm font-body-sm text-on-surface-variant">Move piece horizontally</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-md py-2">
                    <span className="material-symbols-outlined text-primary mt-1">swipe_down</span>
                    <div>
                      <h4 className="text-headline-sm font-headline-sm">Swipe Down</h4>
                      <p className="text-body-sm font-body-sm text-on-surface-variant">Soft drop (accelerate fall)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-md py-2">
                    <span className="material-symbols-outlined text-primary mt-1">touch_app</span>
                    <div>
                      <h4 className="text-headline-sm font-headline-sm">Tap</h4>
                      <p className="text-body-sm font-body-sm text-on-surface-variant">Rotate clockwise</p>
                    </div>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </main>
      </div>
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 px-md pb-safe bg-surface/90 backdrop-blur-xl rounded-t-xl shadow-xl border-t border-outline-variant/30">
        <button onClick={goToMenu} className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary-fixed-dim">
          <span className="material-symbols-outlined">sports_esports</span>
          <span className="text-label-caps font-label-caps mt-1">Play</span>
        </button>
        <button onClick={goToMenu} className="flex flex-col items-center justify-center text-primary scale-90 transition-transform">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>help_outline</span>
          <span className="text-label-caps font-label-caps mt-1">Help</span>
        </button>
      </nav>
    </div>
  );
}

function SettingsScreen() {
  const { goToMenu } = useAppContext();
  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col relative">
      <nav className="hidden lg:flex flex-col h-screen fixed left-0 top-0 py-lg z-40 bg-surface-container dark:bg-surface-container border-r border-outline-variant/20 w-64">
        <div className="px-lg mb-xl">
          <h1 className="text-headline-sm font-headline-sm font-bold text-primary">TETRIS COMMAND</h1>
          <div className="mt-lg flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center overflow-hidden border border-outline-variant/30">
              <span className="material-symbols-outlined text-outline" style={{ fontVariationSettings: "'FILL' 1" }}>account_circle</span>
            </div>
            <div>
              <p className="text-headline-sm font-headline-sm">PILOT_01</p>
              <p className="text-body-sm font-body-sm text-on-surface-variant">Rank: Grandmaster</p>
            </div>
          </div>
        </div>
        <div className="flex-1 px-sm space-y-sm">
          <button onClick={goToMenu} className="flex items-center gap-md text-on-surface-variant px-4 py-3 hover:bg-surface-container-high hover:text-on-surface transition-all duration-200 rounded-lg text-body-sm font-body-sm w-full text-left">
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </button>
          <button onClick={goToMenu} className="flex items-center gap-md text-on-surface-variant px-4 py-3 hover:bg-surface-container-high hover:text-on-surface transition-all duration-200 rounded-lg text-body-sm font-body-sm w-full text-left">
            <span className="material-symbols-outlined">leaderboard</span>
            Leaderboards
          </button>
          <button onClick={goToMenu} className="flex items-center gap-md text-on-surface-variant px-4 py-3 hover:bg-surface-container-high hover:text-on-surface transition-all duration-200 rounded-lg text-body-sm font-body-sm w-full text-left">
            <span className="material-symbols-outlined">emoji_events</span>
            Achievements
          </button>
          <button className="flex items-center gap-md bg-secondary-container text-on-secondary-container rounded-lg px-4 py-3 translate-x-1 duration-200 text-body-sm font-body-sm w-full text-left">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>settings</span>
            Settings
          </button>
        </div>
        <div className="px-lg mt-auto">
          <button onClick={goToMenu} className="w-full bg-primary-container text-on-primary-container py-3 rounded-lg font-headline-sm text-headline-sm hover:bg-primary-container/90 transition-colors glow-active">NEW GAME</button>
        </div>
      </nav>
      <main className="flex-1 lg:ml-64 p-md lg:p-xl flex flex-col items-center">
        <div className="w-full max-w-4xl space-y-lg">
          <header className="mb-xl">
            <h2 className="text-display-lg font-display-lg text-on-surface">Configuration</h2>
            <p className="text-body-md font-body-md text-on-surface-variant mt-sm">System parameters and pilot preferences.</p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            <div className="glass-panel rounded-xl p-panel-padding space-y-lg">
              <div className="flex items-center gap-md border-b border-outline-variant/30 pb-sm">
                <span className="material-symbols-outlined text-primary">volume_up</span>
                <h3 className="text-headline-md font-headline-md">Audio</h3>
              </div>
              <div className="space-y-md">
                <div className="flex justify-between items-center">
                  <label className="text-body-md font-body-md">Master Volume</label>
                  <input className="w-1/2 accent-primary h-2 bg-surface-variant rounded-lg appearance-none cursor-pointer" max="100" min="0" type="range" defaultValue="80" />
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-body-md font-body-md">SFX Volume</label>
                  <input className="w-1/2 accent-primary h-2 bg-surface-variant rounded-lg appearance-none cursor-pointer" max="100" min="0" type="range" defaultValue="100" />
                </div>
                <div className="flex justify-between items-center pt-sm border-t border-outline-variant/20">
                  <div>
                    <p className="text-body-md font-body-md">Music</p>
                    <p className="text-body-sm font-body-sm text-on-surface-variant">Background telemetry tracks</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input className="sr-only peer" type="checkbox" defaultChecked />
                    <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container" />
                  </label>
                </div>
              </div>
            </div>
            <div className="glass-panel rounded-xl p-panel-padding space-y-lg">
              <div className="flex items-center gap-md border-b border-outline-variant/30 pb-sm">
                <span className="material-symbols-outlined text-primary">speed</span>
                <h3 className="text-headline-md font-headline-md">Difficulty</h3>
              </div>
              <div className="space-y-md">
                <p className="text-body-sm font-body-sm text-on-surface-variant">Select gravity multiplier and drop speed.</p>
                <div className="grid grid-cols-1 gap-sm">
                  <label className="flex items-center p-sm border border-outline-variant/30 rounded-lg cursor-pointer hover:bg-surface-container transition-colors">
                    <input className="w-4 h-4 text-primary bg-surface-variant border-outline-variant focus:ring-primary focus:ring-2" name="difficulty" type="radio" />
                    <span className="ml-md text-body-md font-body-md">Beginner</span>
                  </label>
                  <label className="flex items-center p-sm border border-primary/50 bg-primary/10 rounded-lg cursor-pointer glow-active">
                    <input className="w-4 h-4 text-primary bg-surface-variant border-outline-variant focus:ring-primary focus:ring-2" name="difficulty" type="radio" defaultChecked />
                    <span className="ml-md text-body-md font-body-md text-primary font-bold">Pro</span>
                  </label>
                  <label className="flex items-center p-sm border border-outline-variant/30 rounded-lg cursor-pointer hover:bg-surface-container transition-colors">
                    <input className="w-4 h-4 text-primary bg-surface-variant border-outline-variant focus:ring-primary focus:ring-2" name="difficulty" type="radio" />
                    <span className="ml-md text-body-md font-body-md">Grandmaster</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-md pt-lg">
            <button onClick={goToMenu} className="px-lg py-md border border-outline-variant/50 text-on-surface rounded-lg font-headline-sm text-headline-sm hover:bg-surface-container-high transition-colors">Back to Menu</button>
          </div>
        </div>
      </main>
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 px-md pb-safe border-t border-outline-variant/30 bg-surface/90 backdrop-blur-xl shadow-xl rounded-t-xl">
        <button onClick={goToMenu} className="flex flex-col items-center justify-center text-primary scale-90 transition-transform">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>menu</span>
          <span className="text-label-caps font-label-caps mt-xs font-black">Menu</span>
        </button>
      </nav>
    </div>
  );
}

function AppShell() {
  const { screen } = useAppContext();

  switch (screen) {
    case 'menu':
      return <MenuScreen />;
    case 'playing':
    case 'paused':
      return <PlayScreen />;
    case 'gameover':
      return <GameOverScreen />;
    case 'settings':
      return <SettingsScreen />;
    case 'help':
      return <HelpScreen />;
    default:
      return <MenuScreen />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
