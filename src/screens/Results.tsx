// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Results
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Add onClick/onChange handlers to interactive elements
// 4. Replace placeholder data with props/state

import { useState } from "react";

interface ResultsProps {}

export function Results(props: ResultsProps) {
  return (
    <>
      {/* Blurred Background Context (Simulated Game Board) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 blur-sm">
      <div className="w-full max-w-2xl h-3/4 border border-outline-variant/30 relative" style={{backgroundImage: "radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.1) 0%, transparent 70%)"}}>
      {/* Simulated Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
      </div>
      </div>
      {/* Full Screen Backdrop Blur for Game Over */}
      <div className="fixed inset-0 backdrop-blur-[20px] bg-background/60 z-10"></div>
      {/* Main Game Over Modal/Card */}
      <main className="relative z-20 w-full max-w-lg mx-auto px-md">
      <div className="bg-surface-container rounded-xl border border-outline-variant/50 p-xl shadow-2xl relative overflow-hidden flex flex-col items-center">
      {/* Inner Glow Effect */}
      <div className="absolute inset-0 pointer-events-none rounded-xl" style={{boxShadow: "inset 0 0 40px rgba(0, 0, 0, 0.5)"}}></div>
      {/* Header */}
      <h1 className="text-display-lg font-display-lg text-error mb-sm text-center drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">GAME OVER</h1>
      {/* Personal Best Indicator */}
      <div className="bg-primary/20 text-primary border border-primary/50 px-md py-sm rounded-full flex items-center gap-sm mb-lg animate-pulse">
      <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
      <span className="text-label-caps font-label-caps">NEW PERSONAL BEST!</span>
      </div>
      {/* Stats Bento Grid */}
      <div className="w-full grid grid-cols-2 gap-md mb-xl">
      {/* Final Score (Prominent) */}
      <div className="col-span-2 bg-surface p-md rounded-lg border border-outline-variant/30 flex flex-col items-center justify-center relative group">
      <span className="text-label-caps font-label-caps text-on-surface-variant mb-xs">FINAL SCORE</span>
      <span className="text-display-lg font-mono-stats text-primary font-bold tracking-wider">045,920</span>
      </div>
      {/* Level Reached */}
      <div className="bg-surface p-md rounded-lg border border-outline-variant/30 flex flex-col items-center justify-center">
      <span className="text-label-caps font-label-caps text-on-surface-variant mb-xs">LEVEL</span>
      <span className="text-headline-md font-mono-stats text-on-surface font-semibold">14</span>
      </div>
      {/* Total Lines */}
      <div className="bg-surface p-md rounded-lg border border-outline-variant/30 flex flex-col items-center justify-center">
      <span className="text-label-caps font-label-caps text-on-surface-variant mb-xs">LINES</span>
      <span className="text-headline-md font-mono-stats text-on-surface font-semibold">142</span>
      </div>
      </div>
      {/* Action Buttons */}
      <div className="w-full flex flex-col gap-sm">
      {/* Primary Action */}
      <button className="w-full bg-primary-container text-on-primary-container py-md rounded-lg text-headline-sm font-headline-sm flex items-center justify-center gap-sm hover:shadow-[0_0_15px_rgba(37,99,235,0.6)] transition-all duration-200">
      <span className="material-symbols-outlined">replay</span>
                          Replay
                      </button>
      {/* Secondary Actions Row */}
      <div className="grid grid-cols-2 gap-sm mt-sm">
      <button className="w-full bg-transparent border border-outline-variant text-on-surface py-md rounded-lg text-body-sm font-body-sm flex items-center justify-center gap-xs hover:bg-surface-container-highest transition-colors duration-200">
      <span className="material-symbols-outlined text-[20px]">share</span>
                              Share Result
                          </button>
      <button className="w-full bg-transparent border border-outline-variant text-on-surface py-md rounded-lg text-body-sm font-body-sm flex items-center justify-center gap-xs hover:bg-surface-container-highest transition-colors duration-200">
      <span className="material-symbols-outlined text-[20px]">menu</span>
                              Main Menu
                          </button>
      </div>
      </div>
      </div>
      </main>
    </>
  );
}
