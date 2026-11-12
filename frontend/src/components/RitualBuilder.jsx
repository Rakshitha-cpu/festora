import React, { useState } from 'react';
import { 
  Sliders, 
  Sparkles, 
  Save, 
  Flame, 
  Brain, 
  Clock, 
  Activity, 
  CheckCircle2 
} from 'lucide-react';
import { soundscape } from '../services/soundService';

export default function RitualBuilder({ onSaveCustomRitual, onNavigateToProtocol }) {
  const [ritualName, setRitualName] = useState('My Dawn Sanctuary Protocol');
  const [targetChallenge, setTargetChallenge] = useState('burnout');
  const [selectedAnchor, setSelectedAnchor] = useState('sesame_sun');
  const [selectedBreath, setSelectedBreath] = useState('box_4_4');
  const [selectedSound, setSelectedSound] = useState('theta');
  const [durationMins, setDurationMins] = useState(10);
  const [saved, setSaved] = useState(false);

  const anchors = [
    { id: 'sesame_sun', name: 'Dawn Retinal Gaze + Sesame Seed', desc: 'Activates optic melanopsin and mitochondrial heat' },
    { id: 'trataka_flame', name: 'Single-Point Candle Gaze (Trataka)', desc: 'Down-regulates Default Mode Network rumination' },
    { id: 'cold_water', name: 'Cold Water Facial Splash (Arghya)', desc: 'Triggers mammalian dive reflex & vagal stimulation' },
    { id: 'fire_purge', name: 'Written Regret Burning', desc: 'Somatic tangible proof of narrative closure' },
  ];

  const breaths = [
    { id: 'box_4_4', name: 'Sama Vritti Box Breathing (4s In, 4s Hold, 4s Out, 4s Hold)', desc: 'Balances sympathetic and parasympathetic branches' },
    { id: '4_7_8', name: '4-7-8 Deep Parasympathetic Dive', desc: 'Promotes rapid melatonin priming and heart rate deceleration' },
    { id: 'solar_rapid', name: 'Kapalabhati Solar Breath', desc: 'Rapid diaphragmatic pulse for morning vitality' },
  ];

  const sounds = [
    { id: 'theta', name: '6Hz Binaural Theta Tone' },
    { id: 'tanpura', name: 'Tanpura Resonant Drone (Sa-Pa)' },
    { id: 'rain', name: 'Monsoon Rain Pink Noise' },
    { id: 'fire', name: 'Sacred Bonfire Embers' },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    const customRitual = {
      id: Date.now(),
      name: ritualName,
      targetChallenge,
      selectedAnchor,
      selectedBreath,
      selectedSound,
      durationMins,
      createdAt: new Date().toISOString()
    };
    if (onSaveCustomRitual) onSaveCustomRitual(customRitual);
    setSaved(true);
    soundscape.playTempleBell(528);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 pb-16 max-w-3xl mx-auto">
      
      {/* Header Banner */}
      <section className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-[#d4a359]/30 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4a359]/15 border border-[#d4a359]/30 text-[#d4a359] text-xs font-mono">
          <Sliders className="w-3.5 h-3.5" />
          <span>Custom Behavioral Design • Habit Architect</span>
        </div>
        <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-slate-100">
          Design Your Modular Protocol
        </h1>
        <p className="text-xs font-mono text-slate-400">
          Combine time-tested sensory anchors, neuro-respiratory rhythms, and soundscapes into a custom daily practice.
        </p>
      </section>

      {/* Architect Form */}
      <form onSubmit={handleSave} className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
        
        {/* Ritual Title */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
            Protocol Name:
          </label>
          <input
            type="text"
            value={ritualName}
            onChange={(e) => setRitualName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-slate-100 font-cinzel font-bold focus:outline-none focus:border-[#d4a359]"
          />
        </div>

        {/* Step 1: Sensory Anchor */}
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase tracking-wider text-[#d4a359] flex items-center gap-1.5 font-bold">
            <Flame className="w-3.5 h-3.5" />
            <span>1. Choose Tactile & Sensory Anchor:</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {anchors.map((a) => (
              <div
                key={a.id}
                onClick={() => setSelectedAnchor(a.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1 ${
                  selectedAnchor === a.id
                    ? 'bg-[#d4a359]/20 border-[#d4a359]/60 text-slate-100 shadow-md'
                    : 'glass-panel border-white/5 text-slate-300 hover:border-white/20'
                }`}
              >
                <div className="text-xs font-bold">{a.name}</div>
                <div className="text-[11px] text-slate-400 font-light">{a.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Breath Rhythm */}
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase tracking-wider text-indigo-400 flex items-center gap-1.5 font-bold">
            <Activity className="w-3.5 h-3.5" />
            <span>2. Choose Respiratory Pacer:</span>
          </label>
          <div className="space-y-2">
            {breaths.map((b) => (
              <div
                key={b.id}
                onClick={() => setSelectedBreath(b.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${
                  selectedBreath === b.id
                    ? 'bg-indigo-950/40 border-indigo-500/50 text-slate-100'
                    : 'glass-panel border-white/5 text-slate-300 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">{b.name}</div>
                  <div className="text-[11px] text-slate-400 font-light">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 3: Soundscape */}
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 font-bold">
            <Brain className="w-3.5 h-3.5" />
            <span>3. Ambient Soundscape Engine:</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {sounds.map((s) => (
              <button
                type="button"
                key={s.id}
                onClick={() => setSelectedSound(s.id)}
                className={`p-3 rounded-xl text-xs font-mono border text-left transition-all ${
                  selectedSound === s.id
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 font-bold'
                    : 'glass-panel border-white/5 text-slate-400'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Step 4: Duration */}
        <div className="space-y-2 pt-2 border-t border-white/5">
          <div className="flex justify-between text-xs font-mono text-slate-400">
            <span>Target Duration:</span>
            <span className="text-[#d4a359] font-bold">{durationMins} Minutes</span>
          </div>
          <input
            type="range"
            min="3"
            max="30"
            step="1"
            value={durationMins}
            onChange={(e) => setDurationMins(parseInt(e.target.value))}
            className="w-full accent-[#d4a359]"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#d4a359] to-[#c39148] text-slate-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg"
        >
          <Save className="w-4 h-4" />
          <span>{saved ? 'Protocol Saved to Personal OS!' : 'Save Custom Protocol'}</span>
        </button>

      </form>

    </div>
  );
}
