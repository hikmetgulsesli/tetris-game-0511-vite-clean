// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Main Menu
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Add onClick/onChange handlers to interactive elements
// 4. Replace placeholder data with props/state

import { useState } from "react";

interface MainMenuProps {}

export function MainMenu(props: MainMenuProps) {
  return (
    <>
      {/* Subdued Background Grid */}
      <div className="absolute inset-0 grid-bg pointer-events-none z-0"></div>
      {/* Main Content Container */}
      <main className="relative z-10 w-full max-w-md px-md md:px-0 flex flex-col items-center">
      {/* Logo / Title Area */}
      <div className="mb-xl text-center">
      <h1 className="text-display-lg font-display-lg text-primary mb-sm tracking-tighter" style={{textShadow: "0 0 20px rgba(37, 99, 235, 0.4)"}}>
                      TETRIS COMMAND
                  </h1>
      <p className="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest">
                      System Initialized
                  </p>
      </div>
      {/* High Score Card */}
      <div className="bg-surface-container border border-outline-variant rounded-lg p-md mb-xl w-full flex justify-between items-center bg-opacity-80 backdrop-blur-md">
      <div className="flex items-center gap-sm">
      <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>emoji_events</span>
      <span className="text-label-caps font-label-caps text-on-surface-variant">HIGH SCORE</span>
      </div>
      <div className="text-mono-stats font-mono-stats text-primary">
                      9,942,000
                  </div>
      </div>
      {/* Navigation / Action Buttons Stack */}
      <nav className="w-full flex flex-col gap-sm">
      {/* Resume Button (Prominent) */}
      <button className="w-full bg-surface-container border border-primary text-primary hover:bg-primary-container hover:text-white transition-all duration-200 rounded-lg py-md px-lg flex items-center justify-between group">
      <span className="text-headline-sm font-headline-sm">Resume Game</span>
      <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">play_arrow</span>
      </button>
      {/* Start New Game Button */}
      <button className="w-full bg-primary-container text-white glow-primary hover:bg-inverse-primary transition-all duration-200 rounded-lg py-md px-lg flex items-center justify-between mt-sm">
      <span className="text-headline-sm font-headline-sm">Start New</span>
      <span className="material-symbols-outlined">add</span>
      </button>
      {/* Difficulty Selector */}
      <div className="w-full relative mt-sm">
      <select className="w-full appearance-none bg-surface-container border border-outline-variant text-on-surface hover:border-outline transition-colors duration-200 rounded-lg py-md px-lg text-headline-sm font-headline-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer">
      <option selected={true} value="normal">Difficulty: Normal</option>
      <option value="hard">Difficulty: Hard</option>
      <option value="grandmaster">Difficulty: Grandmaster</option>
      </select>
      <span className="material-symbols-outlined absolute right-lg top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                          arrow_drop_down
                      </span>
      </div>
      <div className="grid grid-cols-2 gap-sm mt-sm">
      {/* Settings Button */}
      <button className="w-full bg-surface-container border border-outline-variant text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors duration-200 rounded-lg py-sm px-md flex items-center justify-center gap-xs">
      <span className="material-symbols-outlined text-[20px]">settings</span>
      <span className="text-label-caps font-label-caps">Settings</span>
      </button>
      {/* Help Button */}
      <button className="w-full bg-surface-container border border-outline-variant text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors duration-200 rounded-lg py-sm px-md flex items-center justify-center gap-xs">
      <span className="material-symbols-outlined text-[20px]">help_outline</span>
      <span className="text-label-caps font-label-caps">Help</span>
      </button>
      </div>
      </nav>
      {/* Footer / Version */}
      <div className="mt-xl text-center">
      <span className="text-body-sm font-body-sm text-on-surface-variant opacity-50">v2.4.1.09</span>
      </div>
      </main>
    </>
  );
}
