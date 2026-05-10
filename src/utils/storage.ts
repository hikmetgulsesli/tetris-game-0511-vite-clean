const STORAGE_KEYS = {
  highScore: 'tetris_high_score',
  settings: 'tetris_settings',
} as const;

export interface StoredSettings {
  difficulty: 'normal' | 'hard' | 'grandmaster';
  music: boolean;
  masterVolume: number;
  sfxVolume: number;
  ghostPiece: boolean;
  holdQueue: boolean;
}

export const DEFAULT_SETTINGS: StoredSettings = {
  difficulty: 'normal',
  music: true,
  masterVolume: 80,
  sfxVolume: 100,
  ghostPiece: true,
  holdQueue: true,
};

export function loadHighScore(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.highScore);
    if (raw) {
      const val = parseInt(raw, 10);
      return isNaN(val) ? 0 : val;
    }
  } catch {
    // ignore
  }
  return 0;
}

export function saveHighScore(score: number): void {
  try {
    localStorage.setItem(STORAGE_KEYS.highScore, String(score));
  } catch {
    // ignore
  }
}

export function loadSettings(): StoredSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.settings);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<StoredSettings>;
      return {
        difficulty: ['normal', 'hard', 'grandmaster'].includes(parsed.difficulty ?? '') ? (parsed.difficulty as 'normal' | 'hard' | 'grandmaster') : DEFAULT_SETTINGS.difficulty,
        music: typeof parsed.music === 'boolean' ? parsed.music : DEFAULT_SETTINGS.music,
        masterVolume: typeof parsed.masterVolume === 'number' ? parsed.masterVolume : DEFAULT_SETTINGS.masterVolume,
        sfxVolume: typeof parsed.sfxVolume === 'number' ? parsed.sfxVolume : DEFAULT_SETTINGS.sfxVolume,
        ghostPiece: typeof parsed.ghostPiece === 'boolean' ? parsed.ghostPiece : DEFAULT_SETTINGS.ghostPiece,
        holdQueue: typeof parsed.holdQueue === 'boolean' ? parsed.holdQueue : DEFAULT_SETTINGS.holdQueue,
      };
    }
  } catch {
    // ignore
  }
  return { ...DEFAULT_SETTINGS };
}

export function saveSettings(settings: StoredSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
  } catch {
    // ignore
  }
}
