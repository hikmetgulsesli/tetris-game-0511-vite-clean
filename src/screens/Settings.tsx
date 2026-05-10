// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Settings
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Add onClick/onChange handlers to interactive elements
// 4. Replace placeholder data with props/state

import { useState } from "react";

interface SettingsProps {}

export function Settings(props: SettingsProps) {
  return (
    <>
      {/* SideNavBar */}
      <nav className="hidden lg:flex flex-col h-screen fixed left-0 top-0 py-lg z-40 bg-surface-container dark:bg-surface-container border-r border-outline-variant/20 w-64">
      <div className="px-lg mb-xl">
      <h1 className="text-headline-sm font-headline-sm font-bold text-primary">TETRIS COMMAND</h1>
      <div className="mt-lg flex items-center gap-md">
      <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center overflow-hidden border border-outline-variant/30">
      <span className="material-symbols-outlined text-outline" style={{fontVariationSettings: "'FILL' 1"}}>account_circle</span>
      </div>
      <div>
      <p className="text-headline-sm font-headline-sm">PILOT_01</p>
      <p className="text-body-sm font-body-sm text-on-surface-variant">Rank: Grandmaster</p>
      </div>
      </div>
      </div>
      <div className="flex-1 px-sm space-y-sm">
      <a className="flex items-center gap-md text-on-surface-variant px-4 py-3 hover:bg-surface-container-high hover:text-on-surface transition-all duration-200 rounded-lg text-body-sm font-body-sm" href="#">
      <span className="material-symbols-outlined">dashboard</span>
                      Dashboard
                  </a>
      <a className="flex items-center gap-md text-on-surface-variant px-4 py-3 hover:bg-surface-container-high hover:text-on-surface transition-all duration-200 rounded-lg text-body-sm font-body-sm" href="#">
      <span className="material-symbols-outlined">leaderboard</span>
                      Leaderboards
                  </a>
      <a className="flex items-center gap-md text-on-surface-variant px-4 py-3 hover:bg-surface-container-high hover:text-on-surface transition-all duration-200 rounded-lg text-body-sm font-body-sm" href="#">
      <span className="material-symbols-outlined">emoji_events</span>
                      Achievements
                  </a>
      <a className="flex items-center gap-md bg-secondary-container text-on-secondary-container rounded-lg px-4 py-3 translate-x-1 duration-200 text-body-sm font-body-sm" href="#">
      <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>settings</span>
                      Settings
                  </a>
      </div>
      <div className="px-lg mt-auto">
      <button className="w-full bg-primary-container text-on-primary-container py-3 rounded-lg font-headline-sm text-headline-sm hover:bg-primary-container/90 transition-colors glow-active">NEW GAME</button>
      </div>
      </nav>
      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 p-md lg:p-xl flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-lg">
      <header className="mb-xl">
      <h2 className="text-display-lg font-display-lg text-on-surface">Configuration</h2>
      <p className="text-body-md font-body-md text-on-surface-variant mt-sm">System parameters and pilot preferences.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
      {/* Audio Settings Card */}
      <div className="glass-panel rounded-xl p-panel-padding space-y-lg">
      <div className="flex items-center gap-md border-b border-outline-variant/30 pb-sm">
      <span className="material-symbols-outlined text-primary">volume_up</span>
      <h3 className="text-headline-md font-headline-md">Audio</h3>
      </div>
      <div className="space-y-md">
      <div className="flex justify-between items-center">
      <label className="text-body-md font-body-md">Master Volume</label>
      <input className="w-1/2 accent-primary h-2 bg-surface-variant rounded-lg appearance-none cursor-pointer" max="100" min="0" type="range" value="80" />
      </div>
      <div className="flex justify-between items-center">
      <label className="text-body-md font-body-md">SFX Volume</label>
      <input className="w-1/2 accent-primary h-2 bg-surface-variant rounded-lg appearance-none cursor-pointer" max="100" min="0" type="range" value="100" />
      </div>
      <div className="flex justify-between items-center pt-sm border-t border-outline-variant/20">
      <div>
      <p className="text-body-md font-body-md">Music</p>
      <p className="text-body-sm font-body-sm text-on-surface-variant">Background telemetry tracks</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
      <input checked={true} className="sr-only peer" type="checkbox" value="" />
      <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
      </label>
      </div>
      </div>
      </div>
      {/* Difficulty Settings Card */}
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
      <input checked={true} className="w-4 h-4 text-primary bg-surface-variant border-outline-variant focus:ring-primary focus:ring-2" name="difficulty" type="radio" />
      <span className="ml-md text-body-md font-body-md text-primary font-bold">Pro</span>
      </label>
      <label className="flex items-center p-sm border border-outline-variant/30 rounded-lg cursor-pointer hover:bg-surface-container transition-colors">
      <input className="w-4 h-4 text-primary bg-surface-variant border-outline-variant focus:ring-primary focus:ring-2" name="difficulty" type="radio" />
      <span className="ml-md text-body-md font-body-md">Grandmaster</span>
      </label>
      </div>
      </div>
      </div>
      {/* Controls Settings Card */}
      <div className="glass-panel rounded-xl p-panel-padding space-y-lg md:col-span-2">
      <div className="flex items-center gap-md border-b border-outline-variant/30 pb-sm">
      <span className="material-symbols-outlined text-primary">keyboard</span>
      <h3 className="text-headline-md font-headline-md">Control Preferences</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
      <div className="space-y-md">
      <h4 className="text-label-caps font-label-caps text-on-surface-variant tracking-wider uppercase">Key Bindings</h4>
      <div className="space-y-sm">
      <div className="flex justify-between items-center bg-surface-container-low p-sm rounded border border-outline-variant/20">
      <span className="text-body-md font-body-md">Move Left</span>
      <button className="px-md py-xs bg-surface-variant rounded text-mono-stats font-mono-stats border border-outline-variant/50 hover:bg-surface-container-high transition-colors">Left Arrow</button>
      </div>
      <div className="flex justify-between items-center bg-surface-container-low p-sm rounded border border-outline-variant/20">
      <span className="text-body-md font-body-md">Move Right</span>
      <button className="px-md py-xs bg-surface-variant rounded text-mono-stats font-mono-stats border border-outline-variant/50 hover:bg-surface-container-high transition-colors">Right Arrow</button>
      </div>
      <div className="flex justify-between items-center bg-surface-container-low p-sm rounded border border-outline-variant/20">
      <span className="text-body-md font-body-md">Rotate CW</span>
      <button className="px-md py-xs bg-surface-variant rounded text-mono-stats font-mono-stats border border-outline-variant/50 hover:bg-surface-container-high transition-colors">Up Arrow</button>
      </div>
      <div className="flex justify-between items-center bg-surface-container-low p-sm rounded border border-outline-variant/20">
      <span className="text-body-md font-body-md">Hard Drop</span>
      <button className="px-md py-xs bg-surface-variant rounded text-mono-stats font-mono-stats border border-outline-variant/50 hover:bg-surface-container-high transition-colors">Space</button>
      </div>
      </div>
      </div>
      <div className="space-y-md">
      <h4 className="text-label-caps font-label-caps text-on-surface-variant tracking-wider uppercase">Gameplay Assists</h4>
      <div className="flex justify-between items-center pt-xs">
      <div>
      <p className="text-body-md font-body-md">Ghost Piece</p>
      <p className="text-body-sm font-body-sm text-on-surface-variant">Show landing position preview</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
      <input checked={true} className="sr-only peer" type="checkbox" value="" />
      <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
      </label>
      </div>
      <div className="flex justify-between items-center pt-md border-t border-outline-variant/20">
      <div>
      <p className="text-body-md font-body-md">Hold Queue</p>
      <p className="text-body-sm font-body-sm text-on-surface-variant">Enable piece holding</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
      <input checked={true} className="sr-only peer" type="checkbox" value="" />
      <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
      </label>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div className="flex justify-end gap-md pt-lg">
      <button className="px-lg py-md border border-outline-variant/50 text-on-surface rounded-lg font-headline-sm text-headline-sm hover:bg-surface-container-high transition-colors">Reset Defaults</button>
      <button className="px-lg py-md bg-primary-container text-on-primary-container rounded-lg font-headline-sm text-headline-sm hover:bg-primary-container/90 transition-colors glow-active">Save Changes</button>
      </div>
      </div>
      </main>
      {/* BottomNavBar (Mobile Only) */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 px-md pb-safe border-t border-outline-variant/30 bg-surface/90 backdrop-blur-xl shadow-xl rounded-t-xl">
      <a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary-fixed-dim" href="#">
      <span className="material-symbols-outlined">sports_esports</span>
      <span className="text-label-caps font-label-caps mt-xs">Play</span>
      </a>
      <a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary-fixed-dim" href="#">
      <span className="material-symbols-outlined">military_tech</span>
      <span className="text-label-caps font-label-caps mt-xs">Leader</span>
      </a>
      <a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary-fixed-dim" href="#">
      <span className="material-symbols-outlined">help_outline</span>
      <span className="text-label-caps font-label-caps mt-xs">Help</span>
      </a>
      <a className="flex flex-col items-center justify-center text-primary scale-90 transition-transform" href="#">
      <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>menu</span>
      <span className="text-label-caps font-label-caps mt-xs font-black">Menu</span>
      </a>
      </nav>
    </>
  );
}
