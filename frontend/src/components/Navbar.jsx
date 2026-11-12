import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Activity, 
  Brain, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Users, 
  Sliders, 
  Flame, 
  MessageSquareCode, 
  ShieldCheck,
  ChevronDown,
  Play,
  Pause,
  Bell
} from 'lucide-react';
import { soundscape } from '../services/soundService';

export default function Navbar({ activeView, setActiveView, activeProblem, globalPractitioners = 3482 }) {
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('none');
  const [soundMenuOpen, setSoundMenuOpen] = useState(false);
  const [volume, setVolume] = useState(0.35);

  const toggleTrack = (track) => {
    if (currentTrack === track && isPlayingSound) {
      soundscape.stopAll();
      setIsPlayingSound(false);
      setCurrentTrack('none');
    } else {
      if (track === 'theta') soundscape.playBinauralTheta();
      else if (track === 'tanpura') soundscape.playTanpuraDrone();
      else if (track === 'rain') soundscape.playMonsoonRain();
      else if (track === 'fire') soundscape.playSacredFire();
      setIsPlayingSound(true);
      setCurrentTrack(track);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundscape.setVolume(val);
  };

  const ringBell = () => {
    soundscape.playTempleBell(432);
  };

  const navItems = [
    { id: 'matrix', label: 'Problem Matrix', icon: Compass },
    { id: 'immersion', label: 'Immersion Chamber', icon: Flame },
    { id: 'science', label: 'Science & Mechanisms', icon: Brain },
    { id: 'protocol', label: 'Protocol Studio', icon: Sliders },
    { id: 'oracle', label: 'AI Oracle', icon: MessageSquareCode },
    { id: 'telemetry', label: 'Transformation Logs', icon: Activity },
    { id: 'community', label: 'Community Pulse', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand */}
        <div 
          onClick={() => setActiveView('matrix')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4a359]/20 to-[#d4a359]/5 border border-[#d4a359]/40 flex items-center justify-center glow-gold group-hover:scale-105 transition-transform">
            <span className="font-cinzel text-xl font-bold text-[#d4a359]">F</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-lg font-bold tracking-wider text-slate-100">FESTORA</span>
              <span className="text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded bg-[#d4a359]/20 text-[#d4a359] border border-[#d4a359]/30">
                Wisdom OS
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono tracking-tight hidden sm:block">
              Cultural Technology for Modern Minds
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden xl:flex items-center gap-1.5 bg-[#0c1018]/90 p-1.5 rounded-2xl border border-white/5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#d4a359]/15 text-[#fef3c7] border border-[#d4a359]/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#d4a359]' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick Utilities & Soundscape */}
        <div className="flex items-center gap-2.5">
          
          {/* Temple Bell */}
          <button
            onClick={ringBell}
            title="Sound Temple Bell (432Hz Resonant Grounding)"
            className="p-2 rounded-xl bg-white/5 hover:bg-[#d4a359]/20 text-slate-300 hover:text-[#d4a359] border border-white/5 hover:border-[#d4a359]/30 transition-all"
          >
            <Bell className="w-4 h-4" />
          </button>

          {/* Soundscape Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSoundMenuOpen(!soundMenuOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
                isPlayingSound 
                  ? 'bg-[#d4a359]/20 text-[#d4a359] border-[#d4a359]/50 shadow-sm' 
                  : 'bg-white/5 text-slate-300 border-white/5 hover:border-white/20'
              }`}
            >
              {isPlayingSound ? (
                <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#d4a359]" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span className="hidden sm:inline capitalize">
                {isPlayingSound ? currentTrack : 'Soundscape'}
              </span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {soundMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 glass-panel-glow rounded-2xl p-4 shadow-2xl z-50 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Procedural Audio</span>
                  <button 
                    onClick={() => { soundscape.stopAll(); setIsPlayingSound(false); setCurrentTrack('none'); }}
                    className="text-[11px] text-rose-400 hover:underline"
                  >
                    Stop
                  </button>
                </div>

                <div className="space-y-1.5">
                  {[
                    { id: 'theta', label: '6Hz Binaural Theta (Calm Focus)' },
                    { id: 'tanpura', label: 'Tanpura Resonant Drone (Sa-Pa)' },
                    { id: 'rain', label: 'Monsoon Rain (Pink Noise)' },
                    { id: 'fire', label: 'Sacred Bonfire (Catharsis)' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => toggleTrack(t.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs text-left transition-all ${
                        currentTrack === t.id && isPlayingSound
                          ? 'bg-[#d4a359]/20 text-[#d4a359] font-medium'
                          : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <span>{t.label}</span>
                      {currentTrack === t.id && isPlayingSound ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 opacity-60" />}
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/10 space-y-1.5">
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>Volume</span>
                    <span>{Math.round(volume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full accent-[#d4a359] bg-slate-800 h-1 rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Global Practitioners Live Counter */}
          <div 
            onClick={() => setActiveView('community')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono cursor-pointer hover:bg-emerald-900/40 transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="hidden md:inline font-semibold">{globalPractitioners.toLocaleString()}</span>
            <span className="hidden lg:inline text-[11px] opacity-80">Practicing Now</span>
          </div>

          {/* Diagnostic Button */}
          <button
            onClick={() => setActiveView('diagnostic')}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#d4a359] to-[#b8863b] text-slate-950 text-xs font-bold font-mono tracking-tight hover:opacity-90 transition-all shadow-md"
          >
            Diagnostic
          </button>
        </div>

      </div>

      {/* Mobile Sub-Nav */}
      <div className="xl:hidden flex items-center justify-between gap-1 overflow-x-auto pt-3 border-t border-white/5 mt-2.5 pb-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#d4a359]/20 text-[#fef3c7] font-semibold border border-[#d4a359]/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
