import { describe, it, expect, beforeEach } from 'vitest';
import { loadHighScore, saveHighScore, loadSettings, saveSettings, DEFAULT_SETTINGS } from './storage';

describe('Storage utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('High Score', () => {
    it('returns 0 when no high score is saved', () => {
      expect(loadHighScore()).toBe(0);
    });

    it('saves and loads high score', () => {
      saveHighScore(50000);
      expect(loadHighScore()).toBe(50000);
    });

    it('returns 0 for invalid stored value', () => {
      localStorage.setItem('tetris_high_score', 'not-a-number');
      expect(loadHighScore()).toBe(0);
    });
  });

  describe('Settings', () => {
    it('returns default settings when none saved', () => {
      const settings = loadSettings();
      expect(settings).toEqual(DEFAULT_SETTINGS);
    });

    it('saves and loads custom settings', () => {
      const custom = { ...DEFAULT_SETTINGS, difficulty: 'hard' as const, masterVolume: 50 };
      saveSettings(custom);
      const loaded = loadSettings();
      expect(loaded.difficulty).toBe('hard');
      expect(loaded.masterVolume).toBe(50);
      expect(loaded.music).toBe(DEFAULT_SETTINGS.music);
    });

    it('ignores invalid difficulty and falls back to default', () => {
      localStorage.setItem('tetris_settings', JSON.stringify({ difficulty: 'invalid' }));
      const loaded = loadSettings();
      expect(loaded.difficulty).toBe('normal');
    });

    it('gracefully handles corrupt localStorage data', () => {
      localStorage.setItem('tetris_settings', 'not-json');
      const loaded = loadSettings();
      expect(loaded).toEqual(DEFAULT_SETTINGS);
    });
  });
});
