import React, { useState, useEffect, useRef } from 'react';
import { 
  Flame, 
  Brain, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  ArrowRight, 
  ChevronRight, 
  Sparkles, 
  Compass,
  Sliders,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { soundscape } from '../services/soundService';

export default function ImmersionChamber({ problem, onNavigateToScience, onNavigateToProtocol, onSelectOtherProblem }) {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [historyTrail, setHistoryTrail] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const canvasRef = useRef(null);

  const character = problem.character;
  const currentScenario = character.scenarios[currentStageIdx] || character.scenarios[0];

  // Particle Canvas for Cinematic Ambiance
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const particleCount = 45;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.8,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.6 - 0.2,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = problem.accentColor ? `${problem.accentColor}${Math.floor(p.opacity * 255).toString(16).padStart(2, '0')}` : `rgba(212, 163, 89, ${p.opacity})`;
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < 0) p.y = canvas.height;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [problem]);

  // Web Speech API for Character Dialogue Narration
  const speakDialogue = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.92;
    utterance.pitch = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleChoice = (choice) => {
    setSelectedChoice(choice);
    setHistoryTrail(prev => [...prev, { stage: currentStageIdx + 1, choice }]);
  };

  const nextStage = () => {
    if (currentStageIdx + 1 < character.scenarios.length) {
      setCurrentStageIdx(currentStageIdx + 1);
      setSelectedChoice(null);
    } else {
      onNavigateToScience();
    }
  };

  const resetScenario = () => {
    setCurrentStageIdx(0);
    setSelectedChoice(null);
    setHistoryTrail([]);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Breadcrumb & Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-panel rounded-2xl px-6 py-3 border border-white/10 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Problem Focus:</span>
          <span className="text-[#d4a359] font-bold">{problem.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-400">Era: <span className="text-slate-200">{problem.historicalContext.era}</span></span>
          <button
            onClick={resetScenario}
            className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart</span>
          </button>
        </div>
      </div>

      {/* Main Cinematic Simulation Box */}
      <div className="relative overflow-hidden rounded-3xl glass-panel-glow border border-[#d4a359]/30 min-h-[480px] flex flex-col justify-between p-6 sm:p-10 shadow-2xl">
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

        {/* Ambient Overlay */}
        <div className="relative z-10 space-y-6">
          
          {/* Character Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#07090e] border border-[#d4a359]/40 flex items-center justify-center text-3xl shadow-md">
                {character.avatarImage}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-100">{character.name}</h2>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#d4a359]">
                    Stage {currentStageIdx + 1} of {character.scenarios.length}
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-400 mt-0.5">{character.role} • {problem.historicalContext.location}</p>
              </div>
            </div>

            {/* Voice Narration Button */}
            <button
              onClick={() => speakDialogue(currentScenario.dialogue)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                isSpeaking 
                  ? 'bg-[#d4a359]/20 text-[#d4a359] border-[#d4a359]/50 animate-pulse' 
                  : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/30'
              }`}
            >
              {isSpeaking ? <Volume2 className="w-4 h-4 text-[#d4a359]" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
              <span>{isSpeaking ? 'Listening...' : 'Voice Narrate'}</span>
            </button>
          </div>

          {/* Scene Setting Prompt */}
          <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-300 font-mono italic">
            {currentScenario.prompt}
          </div>

          {/* Spoken Dialogue Quote */}
          <div className="p-6 rounded-2xl bg-black/50 border-l-4 border-[#d4a359] border-t border-r border-b border-white/10 space-y-2">
            <p className="font-cinzel text-lg sm:text-xl text-[#fef3c7] leading-relaxed font-medium">
              "{currentScenario.dialogue}"
            </p>
          </div>

          {/* Branching Decision Choices */}
          {!selectedChoice ? (
            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#d4a359] block">
                How do you engage with this moment?
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentScenario.choices.map((choice) => (
                  <button
                    key={choice.id}
                    onClick={() => handleChoice(choice)}
                    className="p-4 rounded-2xl glass-panel hover:glass-panel-glow text-left text-xs sm:text-sm text-slate-200 hover:text-slate-100 border border-white/10 hover:border-[#d4a359]/60 transition-all flex items-start justify-between gap-3 group"
                  >
                    <span>{choice.text}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-[#d4a359] shrink-0 mt-0.5" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Consequence Reveal */
            <div className="p-6 rounded-2xl glass-panel-glow border border-emerald-500/30 space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <Sparkles className="w-4 h-4" />
                <span>Impact: {selectedChoice.moodShift}</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-light">
                {selectedChoice.consequence}
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={nextStage}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4a359] to-[#c39148] text-slate-950 font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 hover:opacity-95 transition-all shadow-md"
                >
                  <span>{currentStageIdx + 1 < character.scenarios.length ? 'Continue Scenario' : 'Discover the Biological Mechanism'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Context Footnote */}
        <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-[11px] font-mono text-slate-400">
          <span>Historical Scale: {problem.historicalContext.scale}</span>
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToScience}
              className="text-[#d4a359] hover:underline flex items-center gap-1"
            >
              <Brain className="w-3.5 h-3.5" />
              <span>Skip to Science</span>
            </button>
            <button
              onClick={onNavigateToProtocol}
              className="text-emerald-400 hover:underline flex items-center gap-1"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Direct to Protocol</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
