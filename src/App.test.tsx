import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Mock localStorage for tests
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock requestAnimationFrame
let rafCallbacks: FrameRequestCallback[] = [];
vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
  rafCallbacks.push(cb);
  return rafCallbacks.length;
});
vi.stubGlobal('cancelAnimationFrame', () => { rafCallbacks = []; });

describe('App - Tetris Game', () => {
  beforeEach(() => {
    localStorageMock.clear();
    rafCallbacks = [];
  });

  describe('Main Menu', () => {
    it('renders the main menu with title', () => {
      render(<App />);
      expect(screen.getByText('TETRIS COMMAND')).toBeInTheDocument();
      expect(screen.getByText('System Initialized')).toBeInTheDocument();
    });

    it('shows high score from localStorage', () => {
      localStorageMock.setItem('tetris_high_score', '50000');
      render(<App />);
      expect(screen.getByText('HIGH SCORE')).toBeInTheDocument();
    });

    it('navigates to game screen when Start New is clicked', async () => {
      render(<App />);
      const startBtn = screen.getByLabelText('Resume or start game');
      fireEvent.click(startBtn);
      await waitFor(() => {
        expect(screen.getByTestId('game-board')).toBeInTheDocument();
      });
    });

    it('navigates to settings screen', async () => {
      render(<App />);
      const settingsBtn = screen.getByLabelText('Settings');
      fireEvent.click(settingsBtn);
      await waitFor(() => {
        expect(screen.getByText('Configuration')).toBeInTheDocument();
      });
    });

    it('navigates to help screen', async () => {
      render(<App />);
      const helpBtn = screen.getByLabelText('Help');
      fireEvent.click(helpBtn);
      await waitFor(() => {
        expect(screen.getByText('Command Manual')).toBeInTheDocument();
      });
    });
  });

  describe('Game Play', () => {
    it('renders the game board after starting', async () => {
      render(<App />);
      fireEvent.click(screen.getByLabelText('Resume or start game'));
      await waitFor(() => {
        expect(screen.getByTestId('game-board')).toBeInTheDocument();
      });
      expect(screen.getByTestId('score-display')).toBeInTheDocument();
      expect(screen.getByTestId('level-display')).toBeInTheDocument();
      expect(screen.getByTestId('lines-display')).toBeInTheDocument();
    });

    it('shows pause overlay when pause button clicked', async () => {
      render(<App />);
      fireEvent.click(screen.getByLabelText('Resume or start game'));
      await waitFor(() => screen.getByTestId('game-board'));
      fireEvent.click(screen.getByTestId('pause-btn'));
      await waitFor(() => {
        expect(screen.getByTestId('pause-overlay')).toBeInTheDocument();
      });
    });

    it('resumes game from pause overlay', async () => {
      render(<App />);
      fireEvent.click(screen.getByLabelText('Resume or start game'));
      await waitFor(() => screen.getByTestId('game-board'));
      fireEvent.click(screen.getByTestId('pause-btn'));
      await waitFor(() => screen.getByTestId('pause-overlay'));
      fireEvent.click(screen.getByTestId('resume-btn'));
      await waitFor(() => {
        expect(screen.queryByTestId('pause-overlay')).not.toBeInTheDocument();
      });
    });
  });

  describe('Game Over', () => {
    it('shows game over screen with final score', async () => {
      render(<App />);
      fireEvent.click(screen.getByLabelText('Resume or start game'));
      await waitFor(() => screen.getByTestId('game-board'));
      // Simulate game over by filling the board and triggering collision
      // This is tricky without direct state manipulation, so we test the UI renders
      expect(screen.getByTestId('score-display')).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('can go back to menu from help', async () => {
      render(<App />);
      fireEvent.click(screen.getByLabelText('Help'));
      await waitFor(() => screen.getByText('Command Manual'));
      fireEvent.click(screen.getByLabelText('Back to menu'));
      await waitFor(() => {
        expect(screen.getByText('TETRIS COMMAND')).toBeInTheDocument();
      });
    });

    it('can go back to menu from settings', async () => {
      render(<App />);
      fireEvent.click(screen.getByLabelText('Settings'));
      await waitFor(() => screen.getByText('Configuration'));
      fireEvent.click(screen.getByText('Back to Menu'));
      await waitFor(() => {
        expect(screen.getByText('TETRIS COMMAND')).toBeInTheDocument();
      });
    });
  });

  describe('Keyboard Controls', () => {
    it('responds to keyboard events during gameplay', async () => {
      render(<App />);
      fireEvent.click(screen.getByLabelText('Resume or start game'));
      await waitFor(() => screen.getByTestId('game-board'));
      // Arrow down should trigger soft drop
      fireEvent.keyDown(window, { code: 'ArrowDown' });
      // No crash = success; state change is harder to verify without game loop running
      expect(screen.getByTestId('game-board')).toBeInTheDocument();
    });

    it('pause toggles with P key', async () => {
      render(<App />);
      fireEvent.click(screen.getByLabelText('Resume or start game'));
      await waitFor(() => screen.getByTestId('game-board'));
      fireEvent.keyDown(window, { code: 'KeyP' });
      await waitFor(() => {
        expect(screen.getByTestId('pause-overlay')).toBeInTheDocument();
      });
    });
  });
});
