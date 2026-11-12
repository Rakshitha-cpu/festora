import React, { useState, useEffect } from 'react';
import { 
  Sliders, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Sparkles, 
  Users, 
  User, 
  Globe, 
  Heart, 
  Smile, 
  Save, 
  Bell,
  Layers,
  ShieldCheck,
  Brain,
  MessageSquare
} from 'lucide-react';
import { soundscape } from '../services/soundService';

export default function ProtocolStudio({ problem, onLogPractice, onNavigateToTelemetry }) {
  const [selectedTier, setSelectedTier] = useState('solo');
  const [selectedFraming, setSelectedFraming] = useState('neuroscience'); // 'neuroscience' | 'pragmatic' | 'archetypal'
  
  // Interactive Session State
  const [sessionActive, setSessionActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(720); // 12 mins default
  const [isPaused, setIsPaused] = useState(false);
  const [breathPhase, setBreathPhase] = useState('Inhale'); // Inhale (4s), Hold (4s), Exhale (4s), Hold (4s)
  const [breathTimer, setBreathTimer] = useState(4);
  const [completedSteps, setCompletedSteps] = useState({});
  const [preMood, setPreMood] = useState(4);
  const [postMood, setPostMood] = useState(8);
  const [journalReflection, setJournalReflection] = useState('');
  const [sessionCompleted, setSessionCompleted] = useState(false);

  const activeProtocol = problem.protocols[selectedTier] || problem.protocols.solo;

  // Countdown & Breath Pacer
  useEffect(() => {
    let interval = null;
    if (sessionActive && !isPaused && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
        setBreathTimer(prev => {
          if (prev <= 1) {
            setBreathPhase(curr => {
              if (curr === 'Inhale') return 'Hold (Full)';
              if (curr === 'Hold (Full)') return 'Exhale';
              if (curr === 'Exhale') return 'Hold (Empty)';
              return 'Inhale';
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (secondsLeft === 0 && sessionActive) {
      setSessionActive(false);
      setSessionCompleted(true);
      soundscape.playTempleBell(528);
    }
    return () => clearInterval(interval);
  }, [sessionActive, isPaused, secondsLeft]);

  const startSession = () => {
    soundscape.playTempleBell(432);
    setSecondsLeft(12 * 60);
    setSessionActive(true);
    setIsPaused(false);
    setSessionCompleted(false);
    setBreathPhase('Inhale');
    setBreathTimer(4);
  };

  const toggleStep = (idx) => {
    setCompletedSteps(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleSaveSession = () => {
    const sessionData = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      problemId: problem.id,
      problemTitle: problem.title,
      protocolTier: selectedTier,
      protocolTitle: activeProtocol.title,
      preMood,
      postMood,
      moodDelta: postMood - preMood,
      journalReflection,
      durationMinutes: 12,
    };

    onLogPractice(sessionData);
    setSessionCompleted(false);
    setJournalReflection('');
    onNavigateToTelemetry();
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header Banner */}
      <section className="glass-panel-glow rounded-3xl p-6 sm:p-10 border border-[#d4a359]/30 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Immediate Implementation • Multi-Tier Protocol</span>
          </div>

          {/* Framing Switcher */}
          <div className="flex items-center gap-1 bg-[#0c1018] p-1 rounded-xl border border-white/10 text-xs font-mono">
            <span className="text-slate-500 px-2">Framing:</span>
            {[
              { id: 'neuroscience', label: 'Neuroscience' },
              { id: 'pragmatic', label: 'Pragmatic 5m' },
              { id: 'archetypal', label: 'Archetypal' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFraming(f.id)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  selectedFraming === f.id
                    ? 'bg-[#d4a359]/20 text-[#fef3c7] font-bold border border-[#d4a359]/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#d4a359]">
            Active Applied Antidote:
          </span>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-slate-100">
            {activeProtocol.title}
          </h1>
          <p className="text-sm text-slate-300 font-light max-w-2xl leading-relaxed">
            {selectedFraming === 'neuroscience' && "Structured nervous system de-escalation combining ocular phototherapy, vagal anchoring, and prefrontal cognitive restructuring."}
            {selectedFraming === 'pragmatic' && "Hyper-actionable, zero-fluff daily habit checklist calibrated for immediate burnout relief."}
            {selectedFraming === 'archetypal' && "Poetic resonance aligning the individual spirit with timeless cosmic and seasonal cycles."}
          </p>
        </div>

        {/* Tier Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/10">
          {[
            { id: 'solo', label: 'Solo (Introvert/Quick)', icon: User },
            { id: 'partner', label: 'Partner (1-on-1)', icon: Heart },
            { id: 'smallCircle', label: 'Small Group (3-8)', icon: Users },
            { id: 'community', label: 'Global Pulse', icon: Globe },
          ].map((tier) => {
            const Icon = tier.icon;
            const isActive = selectedTier === tier.id;
            return (
              <button
                key={tier.id}
                onClick={() => { setSelectedTier(tier.id); setSessionActive(false); }}
                className={`flex items-center gap-2 p-3 rounded-2xl text-xs font-mono transition-all border ${
                  isActive
                    ? 'bg-[#d4a359]/20 text-[#fef3c7] border-[#d4a359]/60 shadow-md font-bold'
                    : 'glass-panel text-slate-400 border-white/5 hover:border-white/20'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#d4a359]' : 'text-slate-400'}`} />
                <span className="truncate">{tier.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Interactive Practice Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Protocol Steps Checklist */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
            
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#d4a359]">Step-by-Step Guidance</span>
                <h3 className="font-cinzel text-xl font-bold text-slate-100">{activeProtocol.title}</h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-white/5 px-3 py-1.5 rounded-xl">
                <Clock className="w-3.5 h-3.5 text-[#d4a359]" />
                <span>{activeProtocol.timeNeeded || '12 mins'}</span>
              </div>
            </div>

            {/* Sensory Anchor Banner */}
            {activeProtocol.sensoryAnchor && (
              <div className="p-4 rounded-2xl bg-[#d4a359]/10 border border-[#d4a359]/30 text-xs font-mono space-y-1">
                <div className="text-[#d4a359] uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Sensory Anchor / Materials:</span>
                </div>
                <p className="text-slate-200 font-light">{activeProtocol.sensoryAnchor}</p>
              </div>
            )}

            {/* Steps Checklist */}
            <div className="space-y-3">
              {activeProtocol.steps?.map((step, idx) => {
                const isChecked = !!completedSteps[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      isChecked
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-300'
                        : 'glass-panel border-white/10 hover:border-[#d4a359]/40 text-slate-200'
                    }`}
                  >
                    <div className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center border transition-all ${
                      isChecked ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-500'
                    }`}>
                      {isChecked && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono text-slate-400 block">Step 0{idx + 1}</span>
                      <p className={`text-xs sm:text-sm font-light leading-relaxed ${isChecked ? 'line-through opacity-70' : ''}`}>
                        {step}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Right Column: Live Session Interactive Timer & Breath Guide */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-[#d4a359]/30 flex flex-col items-center justify-between text-center space-y-6 shadow-2xl">
            
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">Live Practice Pacer</span>
              <h4 className="font-cinzel text-lg font-bold text-slate-100">Synchronized Somatic Guide</h4>
            </div>

            {/* Visual Breath Circle */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center my-2">
              <div className={`absolute inset-0 rounded-full border border-[#d4a359]/30 transition-all duration-1000 ${
                sessionActive && !isPaused ? 'animate-breath bg-[#d4a359]/10' : 'bg-white/5'
              }`}></div>
              
              <div className="relative z-10 flex flex-col items-center justify-center space-y-1">
                <span className="font-mono text-4xl sm:text-5xl font-bold tracking-tight text-slate-100">
                  {formatTime(secondsLeft)}
                </span>
                {sessionActive && (
                  <div className="space-y-0.5 animate-fadeIn">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#d4a359] font-bold block">
                      {breathPhase}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {breathTimer}s
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Session Controls */}
            <div className="flex items-center gap-3 w-full">
              {!sessionActive ? (
                <button
                  onClick={startSession}
                  className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-[#d4a359] to-[#c39148] text-slate-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Begin Guided Session</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="flex-1 py-3.5 rounded-2xl glass-panel hover:bg-white/10 text-slate-100 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-white/10 transition-all"
                  >
                    {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                    <span>{isPaused ? 'Resume' : 'Pause'}</span>
                  </button>
                  <button
                    onClick={() => { setSessionActive(false); setSecondsLeft(720); }}
                    className="p-3.5 rounded-2xl glass-panel hover:bg-white/10 text-slate-400 border border-white/10 transition-all"
                    title="Reset Session"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

          </div>

          {/* Post-Session Mood & Journal Form */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#d4a359]">
              <Brain className="w-4 h-4" />
              <span>Session Reflection & Telemetry</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-slate-400">Pre-Mood (1-10):</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={preMood}
                  onChange={(e) => setPreMood(parseInt(e.target.value))}
                  className="w-full accent-slate-400"
                />
                <span className="text-xs font-mono text-slate-300 font-bold">{preMood}/10</span>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-slate-400">Post-Mood (1-10):</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={postMood}
                  onChange={(e) => setPostMood(parseInt(e.target.value))}
                  className="w-full accent-emerald-400"
                />
                <span className="text-xs font-mono text-emerald-400 font-bold">{postMood}/10 (+{Math.max(0, postMood - preMood)})</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono text-slate-400">Personal Reflection Log:</span>
              <textarea
                value={journalReflection}
                onChange={(e) => setJournalReflection(e.target.value)}
                placeholder="What shifted in your nervous system during this practice? Any somatic release or cognitive insight?"
                rows={3}
                className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#d4a359]/60 font-mono resize-none"
              />
            </div>

            <button
              onClick={handleSaveSession}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Log Practice to Telemetry</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
