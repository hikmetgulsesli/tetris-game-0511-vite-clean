// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Help
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Add onClick/onChange handlers to interactive elements
// 4. Replace placeholder data with props/state

import { useState } from "react";

interface HelpProps {}

export function Help(props: HelpProps) {
  return (
    <>
      {/* TopAppBar */}
      <header className="bg-surface/80 backdrop-blur-md text-primary w-full docked full-width top-0 z-50">
      <div className="flex justify-between items-center w-full px-xl h-16 max-w-full mx-auto">
      <div className="text-headline-md font-headline-md font-extrabold tracking-tighter text-primary">TETRIS COMMAND</div>
      <nav className="hidden md:flex gap-lg">
      <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200" href="#">Play</a>
      <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200" href="#">Stats</a>
      <a className="text-primary font-bold border-b-2 border-primary pb-1 scale-95 duration-100" href="#">Help</a>
      </nav>
      <div className="flex gap-md">
      <button className="hover:text-primary transition-colors duration-200">
      <span className="material-symbols-outlined">settings</span>
      </button>
      <button className="hover:text-primary transition-colors duration-200">
      <span className="material-symbols-outlined">account_circle</span>
      </button>
      </div>
      </div>
      </header>
      <div className="flex flex-1 overflow-hidden pt-16">
      {/* SideNavBar */}
      <aside className="hidden lg:flex flex-col h-screen fixed left-0 top-0 py-lg z-40 bg-surface-container text-primary w-64 border-r border-outline-variant/20 pt-24">
      <div className="px-md mb-lg">
      <h2 className="text-headline-sm font-headline-sm font-bold text-primary">PILOT_01</h2>
      <p className="text-body-sm font-body-sm text-on-surface-variant">Rank: Grandmaster</p>
      </div>
      <nav className="flex-1 flex flex-col gap-sm px-sm">
      <a className="flex items-center gap-md text-on-surface-variant px-4 py-3 hover:bg-surface-container-high hover:text-on-surface transition-all duration-200 rounded-lg" href="#">
      <span className="material-symbols-outlined">dashboard</span>
      <span className="text-body-sm font-body-sm">Dashboard</span>
      </a>
      <a className="flex items-center gap-md text-on-surface-variant px-4 py-3 hover:bg-surface-container-high hover:text-on-surface transition-all duration-200 rounded-lg" href="#">
      <span className="material-symbols-outlined">leaderboard</span>
      <span className="text-body-sm font-body-sm">Leaderboards</span>
      </a>
      <a className="flex items-center gap-md text-on-surface-variant px-4 py-3 hover:bg-surface-container-high hover:text-on-surface transition-all duration-200 rounded-lg" href="#">
      <span className="material-symbols-outlined">emoji_events</span>
      <span className="text-body-sm font-body-sm">Achievements</span>
      </a>
      <a className="flex items-center gap-md text-on-surface-variant px-4 py-3 hover:bg-surface-container-high hover:text-on-surface transition-all duration-200 rounded-lg" href="#">
      <span className="material-symbols-outlined">settings</span>
      <span className="text-body-sm font-body-sm">Settings</span>
      </a>
      </nav>
      <div className="p-md mt-auto">
      <button className="w-full bg-primary-container text-on-primary-container font-label-caps text-label-caps py-3 rounded-lg hover:shadow-[0_0_15px_#2563eb] transition-shadow">NEW GAME</button>
      </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-xl overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-xl">
      {/* Header */}
      <div className="flex items-center gap-md mb-xl">
      <button className="glass-panel p-2 rounded-lg hover:bg-surface-container-high transition-colors">
      <span className="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 className="text-display-lg font-display-lg text-primary">Command Manual</h1>
      </div>
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
      {/* How to Play Section */}
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
      {/* Keyboard Controls */}
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
      {/* Touch Controls */}
      <section className="glass-panel rounded-xl p-lg space-y-md">
      <h2 className="text-headline-md font-headline-md text-secondary-fixed">Touch Gestures</h2>
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
      <li className="flex items-start gap-md py-2">
      <span className="material-symbols-outlined text-primary mt-1">pan_tool_alt</span>
      <div>
      <h4 className="text-headline-sm font-headline-sm">Swipe Up</h4>
      <p className="text-body-sm font-body-sm text-on-surface-variant">Hold current piece</p>
      </div>
      </li>
      </ul>
      </section>
      </div>
      </div>
      </main>
      </div>
      {/* BottomNavBar */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 px-md pb-safe bg-surface/90 backdrop-blur-xl rounded-t-xl shadow-xl border-t border-outline-variant/30">
      <a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary-fixed-dim" href="#">
      <span className="material-symbols-outlined">sports_esports</span>
      <span className="text-label-caps font-label-caps mt-1">Play</span>
      </a>
      <a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary-fixed-dim" href="#">
      <span className="material-symbols-outlined">military_tech</span>
      <span className="text-label-caps font-label-caps mt-1">Leader</span>
      </a>
      <a className="flex flex-col items-center justify-center text-primary scale-90 transition-transform" href="#">
      <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>help_outline</span>
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
