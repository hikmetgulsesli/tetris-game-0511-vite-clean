import React, { createContext, useContext } from 'react';
import { useAppState } from '../hooks/useAppState';
import type { GameState } from '../types/domain';

interface AppContextValue {
  gameState: GameState;
  screen: 'menu' | 'playing' | 'paused' | 'gameover' | 'settings' | 'help';
  profileOpen: boolean;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  togglePause: () => void;
  restartGame: () => void;
  goToMenu: () => void;
  goToSettings: () => void;
  goToHelp: () => void;
  openProfile: () => void;
  closeProfile: () => void;
  movePiece: (dx: number, dy: number) => boolean;
  rotatePiece: (clockwise: boolean) => void;
  softDrop: () => void;
  hardDrop: () => void;
  holdCurrentPiece: () => void;
  resetKeyTimers: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const state = useAppState();
  return (
    <AppContext.Provider value={state}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
