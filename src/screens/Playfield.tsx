// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Playfield
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Add onClick/onChange handlers to interactive elements
// 4. Replace placeholder data with props/state

import { useState } from "react";

interface PlayfieldProps {}

export function Playfield(props: PlayfieldProps) {
  return (
    <>
      {/* TopAppBar */}
      <header className="bg-surface/80 backdrop-blur-md dark:bg-surface/80 border-b border-outline-variant/30 docked full-width top-0 z-50">
      <div className="flex justify-between items-center w-full px-xl h-16 max-w-full mx-auto">
      <div className="text-headline-md font-headline-md font-extrabold tracking-tighter text-primary dark:text-primary">
                      TETRIS COMMAND
                  </div>
      <nav className="hidden md:flex items-center gap-lg">
      <a className="text-primary font-bold border-b-2 border-primary pb-1 text-label-caps font-label-caps uppercase" href="#">Play</a>
      <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200 text-label-caps font-label-caps uppercase" href="#">Stats</a>
      <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200 text-label-caps font-label-caps uppercase" href="#">Help</a>
      </nav>
      <div className="flex items-center gap-md text-primary dark:text-primary">
      <button aria-label="Settings" className="hover:text-primary transition-colors duration-200">
      <span className="material-symbols-outlined">settings</span>
      </button>
      <button aria-label="Account" className="hover:text-primary transition-colors duration-200">
      <span className="material-symbols-outlined">account_circle</span>
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
      <div className="text-display-lg font-mono-stats text-primary pulse-score">045,200</div>
      </div>
      <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant/50">
      <h2 className="text-label-caps font-label-caps text-on-surface-variant mb-xs">LEVEL</h2>
      <div className="text-headline-md font-mono-stats text-on-surface mb-sm">08</div>
      <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
      <div className="h-full bg-primary w-[60%]"></div>
      </div>
      </div>
      <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant/50">
      <h2 className="text-label-caps font-label-caps text-on-surface-variant mb-xs">LINES</h2>
      <div className="text-headline-md font-mono-stats text-on-surface">084</div>
      </div>
      </div>
      <button className="w-full py-3 border border-outline-variant text-on-surface hover:bg-surface-variant transition-colors rounded-lg flex items-center justify-center gap-sm font-label-caps text-label-caps">
      <span className="material-symbols-outlined text-sm">pause</span>
                      PAUSE
                  </button>
      </aside>
      {/* Center: Game Board */}
      <div className="relative flex-shrink-0 flex flex-col items-center h-[614px] lg:h-[819px] max-h-[800px]">
      {/* Mobile Top Stats Bar */}
      <div className="lg:hidden flex justify-between w-full mb-sm glass-panel p-sm rounded-lg">
      <div>
      <div className="text-[10px] font-label-caps text-on-surface-variant leading-none">SCORE</div>
      <div className="font-mono-stats text-body-md text-primary leading-none mt-1">45,200</div>
      </div>
      <div className="text-center">
      <div className="text-[10px] font-label-caps text-on-surface-variant leading-none">LEVEL</div>
      <div className="font-mono-stats text-body-md text-on-surface leading-none mt-1">08</div>
      </div>
      <button className="text-on-surface flex items-center justify-center">
      <span className="material-symbols-outlined">pause</span>
      </button>
      </div>
      {/* The Well */}
      <div className="relative bg-surface-container-lowest border-2 border-outline-variant/50 rounded-sm w-[307px] lg:w-[409px] max-w-[300px] lg:max-w-[400px] h-full game-well-grid shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
      {/* Placed Blocks (Static) */}
      {/* Bottom Row */}
      <div className="absolute bottom-0 left-[0%] w-[10%] h-[5%] bg-tetris-cyan border border-surface-container-lowest"></div>
      <div className="absolute bottom-0 left-[10%] w-[10%] h-[5%] bg-tetris-cyan border border-surface-container-lowest"></div>
      <div className="absolute bottom-0 left-[20%] w-[10%] h-[5%] bg-tetris-cyan border border-surface-container-lowest"></div>
      <div className="absolute bottom-0 left-[30%] w-[10%] h-[5%] bg-tetris-cyan border border-surface-container-lowest"></div>
      <div className="absolute bottom-0 left-[50%] w-[10%] h-[5%] bg-tetris-blue border border-surface-container-lowest"></div>
      <div className="absolute bottom-0 left-[60%] w-[10%] h-[5%] bg-tetris-blue border border-surface-container-lowest"></div>
      <div className="absolute bottom-[5%] left-[50%] w-[10%] h-[5%] bg-tetris-blue border border-surface-container-lowest"></div>
      {/* Row 2 */}
      <div className="absolute bottom-[5%] left-[20%] w-[10%] h-[5%] bg-tetris-yellow border border-surface-container-lowest"></div>
      <div className="absolute bottom-[5%] left-[30%] w-[10%] h-[5%] bg-tetris-yellow border border-surface-container-lowest"></div>
      <div className="absolute bottom-[10%] left-[20%] w-[10%] h-[5%] bg-tetris-yellow border border-surface-container-lowest"></div>
      <div className="absolute bottom-[10%] left-[30%] w-[10%] h-[5%] bg-tetris-yellow border border-surface-container-lowest"></div>
      {/* Active Block (T-Piece falling) */}
      <div className="absolute top-[30%] left-[40%] w-[30%] h-[10%] z-10 block-glow-purple">
      <div className="absolute top-[50%] left-[0%] w-[33.33%] h-[50%] bg-tetris-purple border border-surface-container-lowest shadow-[inset_0_0_10px_rgba(255,255,255,0.4)]"></div>
      <div className="absolute top-[50%] left-[33.33%] w-[33.33%] h-[50%] bg-tetris-purple border border-surface-container-lowest shadow-[inset_0_0_10px_rgba(255,255,255,0.4)]"></div>
      <div className="absolute top-[50%] left-[66.66%] w-[33.33%] h-[50%] bg-tetris-purple border border-surface-container-lowest shadow-[inset_0_0_10px_rgba(255,255,255,0.4)]"></div>
      <div className="absolute top-[0%] left-[33.33%] w-[33.33%] h-[50%] bg-tetris-purple border border-surface-container-lowest shadow-[inset_0_0_10px_rgba(255,255,255,0.4)]"></div>
      </div>
      {/* Ghost Piece */}
      <div className="absolute bottom-[0%] left-[40%] w-[30%] h-[10%] z-0 opacity-40">
      <div className="absolute top-[50%] left-[0%] w-[33.33%] h-[50%] border border-dashed border-tetris-purple bg-transparent"></div>
      <div className="absolute top-[50%] left-[33.33%] w-[33.33%] h-[50%] border border-dashed border-tetris-purple bg-transparent"></div>
      <div className="absolute top-[50%] left-[66.66%] w-[33.33%] h-[50%] border border-dashed border-tetris-purple bg-transparent"></div>
      <div className="absolute top-[0%] left-[33.33%] w-[33.33%] h-[50%] border border-dashed border-tetris-purple bg-transparent"></div>
      </div>
      </div>
      </div>
      {/* Right Panel: Next/Hold (Desktop) */}
      <aside className="hidden lg:flex flex-col w-64 gap-md h-[819px] max-h-[800px]">
      {/* Hold */}
      <div className="glass-panel p-md rounded-xl flex-grow max-h-[200px]">
      <h2 className="text-label-caps font-label-caps text-on-surface-variant mb-md">HOLD</h2>
      <div className="w-full h-full flex items-center justify-center relative pb-lg">
      {/* S Piece in Hold */}
      <div className="relative w-[80px] h-[40px]">
      <div className="absolute bottom-0 left-0 w-[40px] h-[20px] bg-tetris-green border border-surface-container-lowest shadow-[inset_0_0_8px_rgba(255,255,255,0.3)]"></div>
      <div className="absolute bottom-0 left-[20px] w-[40px] h-[20px] bg-tetris-green border border-surface-container-lowest shadow-[inset_0_0_8px_rgba(255,255,255,0.3)]"></div>
      <div className="absolute top-0 left-[20px] w-[40px] h-[20px] bg-tetris-green border border-surface-container-lowest shadow-[inset_0_0_8px_rgba(255,255,255,0.3)]"></div>
      <div className="absolute top-0 left-[40px] w-[40px] h-[20px] bg-tetris-green border border-surface-container-lowest shadow-[inset_0_0_8px_rgba(255,255,255,0.3)]"></div>
      </div>
      </div>
      </div>
      {/* Next */}
      <div className="glass-panel p-md rounded-xl flex-grow">
      <h2 className="text-label-caps font-label-caps text-on-surface-variant mb-md">NEXT</h2>
      <div className="flex flex-col gap-lg items-center pt-sm">
      {/* Next 1: I Piece */}
      <div className="relative w-[120px] h-[30px] block-glow-cyan">
      <div className="absolute top-0 left-0 w-[30px] h-[30px] bg-tetris-cyan border border-surface-container-lowest"></div>
      <div className="absolute top-0 left-[30px] w-[30px] h-[30px] bg-tetris-cyan border border-surface-container-lowest"></div>
      <div className="absolute top-0 left-[60px] w-[30px] h-[30px] bg-tetris-cyan border border-surface-container-lowest"></div>
      <div className="absolute top-0 left-[90px] w-[30px] h-[30px] bg-tetris-cyan border border-surface-container-lowest"></div>
      </div>
      {/* Next 2: O Piece (Smaller) */}
      <div className="relative w-[40px] h-[40px] mt-md opacity-60">
      <div className="absolute top-0 left-0 w-[20px] h-[20px] bg-tetris-yellow border border-surface-container-lowest"></div>
      <div className="absolute top-0 left-[20px] w-[20px] h-[20px] bg-tetris-yellow border border-surface-container-lowest"></div>
      <div className="absolute top-[20px] left-0 w-[20px] h-[20px] bg-tetris-yellow border border-surface-container-lowest"></div>
      <div className="absolute top-[20px] left-[20px] w-[20px] h-[20px] bg-tetris-yellow border border-surface-container-lowest"></div>
      </div>
      {/* Next 3: L Piece (Smaller) */}
      <div className="relative w-[60px] h-[40px] mt-sm opacity-40">
      <div className="absolute bottom-0 left-0 w-[20px] h-[20px] bg-tetris-orange border border-surface-container-lowest"></div>
      <div className="absolute bottom-0 left-[20px] w-[20px] h-[20px] bg-tetris-orange border border-surface-container-lowest"></div>
      <div className="absolute bottom-0 left-[40px] w-[20px] h-[20px] bg-tetris-orange border border-surface-container-lowest"></div>
      <div className="absolute top-0 left-[40px] w-[20px] h-[20px] bg-tetris-orange border border-surface-container-lowest"></div>
      </div>
      </div>
      </div>
      </aside>
      {/* Mobile Controls Area (Bottom 30%) */}
      <div className="lg:hidden w-full flex-grow flex flex-col justify-end pb-safe mt-md">
      {/* Mobile Hold/Next Row */}
      <div className="flex justify-between w-full mb-md px-md gap-sm">
      <div className="glass-panel rounded-lg p-2 w-[48%] flex items-center justify-between">
      <span className="text-[10px] font-label-caps text-on-surface-variant">HOLD</span>
      <div className="w-[40px] h-[20px] bg-surface-container relative">
      <div className="absolute bottom-0 left-[10px] w-[20px] h-[10px] bg-tetris-green border border-surface-lowest"></div>
      {/* Simplified tiny hold piece */}
      </div>
      </div>
      <div className="glass-panel rounded-lg p-2 w-[48%] flex items-center justify-between">
      <span className="text-[10px] font-label-caps text-on-surface-variant">NEXT</span>
      <div className="w-[40px] h-[10px] bg-tetris-cyan border border-surface-lowest"></div>
      </div>
      </div>
      {/* Virtual D-Pad & Action Buttons */}
      <div className="w-full flex justify-between px-md pb-md h-32 items-center">
      {/* Directional Controls */}
      <div className="relative w-32 h-32">
      <button className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-surface-container-high rounded-full border border-outline-variant/30 flex items-center justify-center active:bg-primary-container active:scale-95 transition-all">
      <span className="material-symbols-outlined text-on-surface">arrow_left</span>
      </button>
      <button className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-surface-container-high rounded-full border border-outline-variant/30 flex items-center justify-center active:bg-primary-container active:scale-95 transition-all">
      <span className="material-symbols-outlined text-on-surface">arrow_right</span>
      </button>
      <button className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-surface-container-high rounded-full border border-outline-variant/30 flex items-center justify-center active:bg-primary-container active:scale-95 transition-all">
      <span className="material-symbols-outlined text-on-surface">arrow_drop_down</span>
      </button>
      </div>
      {/* Action Controls */}
      <div className="flex gap-4 items-end h-full pb-2">
      <button className="w-14 h-14 bg-surface-container-high rounded-full border border-outline-variant/30 flex items-center justify-center active:bg-primary-container active:scale-95 transition-all shadow-lg">
      <span className="material-symbols-outlined text-on-surface text-2xl">rotate_right</span>
      </button>
      <button className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center active:scale-95 transition-all shadow-[0_0_15px_rgba(37,99,235,0.5)]">
      <span className="material-symbols-outlined text-white text-3xl">keyboard_double_arrow_down</span>
      </button>
      </div>
      </div>
      </div>
      </main>
      {/* BottomNavBar (Mobile Only, hidden during active play usually, but included per JSON if top-level) */}
      {/* Assuming this is the top-level Play screen as requested, but for an immersive game, we'd normally hide it. I will follow the BottomNavBar JSON definition. */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 px-md pb-safe bg-surface dark:bg-surface rounded-t-xl border-t border-outline-variant/30 bg-surface/90 backdrop-blur-xl shadow-xl">
      <a className="flex flex-col items-center justify-center text-primary active:scale-90 transition-transform" href="#">
      <span className="material-symbols-outlined icon-fill">sports_esports</span>
      <span className="text-label-caps font-label-caps mt-1">Play</span>
      </a>
      <a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary-fixed-dim" href="#">
      <span className="material-symbols-outlined">military_tech</span>
      <span className="text-label-caps font-label-caps mt-1">Leader</span>
      </a>
      <a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary-fixed-dim" href="#">
      <span className="material-symbols-outlined">help_outline</span>
      <span className="text-label-caps font-label-caps mt-1">Help</span>
      </a>
      <a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary-fixed-dim" href="#">
      <span className="material-symbols-outlined">menu</span>
      <span className="text-label-caps font-label-caps mt-1">Menu</span>
      </a>
      </nav>
    </>
  );
}
