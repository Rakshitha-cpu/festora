import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProblemMatrix from './components/ProblemMatrix';
import ImmersionChamber from './components/ImmersionChamber';
import ScienceMechanismEngine from './components/ScienceMechanismEngine';
import ProtocolStudio from './components/ProtocolStudio';
import AIElderOracle from './components/AIElderOracle';
import TrackingTelemetry from './components/TrackingTelemetry';
import CommunityPulse from './components/CommunityPulse';
import RitualBuilder from './components/RitualBuilder';
import DiagnosticQuiz from './components/DiagnosticQuiz';
import { PROBLEM_CATEGORIES, getProblemById } from './data/problemsData';
import { Sparkles, Compass, ShieldCheck, HeartHandshake, ArrowRight, Activity, Brain } from 'lucide-react';

const INITIAL_SAMPLE_LOGS = [
  {
    id: 101,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    problemId: "seasonal-burnout",
    problemTitle: "Seasonal Depression & Year-End Burnout",
    protocolTier: "solo",
    protocolTitle: "12-Minute Dawn Solar Attunement",
    preMood: 3,
    postMood: 7,
    moodDelta: 4,
    journalReflection: "Felt immediate ocular awakening gazing toward the dawn horizon without screens. Hands felt warmer after consuming roasted sesame and jaggery.",
    durationMinutes: 12
  },
  {
    id: 102,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    problemId: "anxiety-overwhelm",
    problemTitle: "Acute Cognitive Overload & Existential Panic",
    protocolTier: "solo",
    protocolTitle: "10-Minute Trataka Flame De-escalation",
    preMood: 4,
    postMood: 8,
    moodDelta: 4,
    journalReflection: "Tears cleansed the eyes around minute 3. The racing work thoughts genuinely halted once the candle after-image settled behind the forehead.",
    durationMinutes: 10
  }
];

export default function App() {
  const [activeView, setActiveView] = useState('matrix'); // 'matrix' | 'immersion' | 'science' | 'protocol' | 'oracle' | 'telemetry' | 'community' | 'builder' | 'diagnostic'
  const [activeProblemId, setActiveProblemId] = useState('seasonal-burnout');
  const [practiceLogs, setPracticeLogs] = useState(() => {
    const saved = localStorage.getItem('festora_practice_logs');
    return saved ? JSON.parse(saved) : INITIAL_SAMPLE_LOGS;
  });
  const [globalPractitioners, setGlobalPractitioners] = useState(3482);

  // Periodic subtle live counter fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalPractitioners(prev => prev + (Math.random() > 0.45 ? 1 : -1));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleSelectProblem = (probId, targetView = 'immersion') => {
    setActiveProblemId(probId);
    setActiveView(targetView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogPractice = (sessionData) => {
    const updated = [sessionData, ...practiceLogs];
    setPracticeLogs(updated);
    localStorage.setItem('festora_practice_logs', JSON.stringify(updated));
  };

  const handleClearLogs = () => {
    if (window.confirm("Are you sure you want to clear your local transformation logs?")) {
      setPracticeLogs([]);
      localStorage.removeItem('festora_practice_logs');
    }
  };

  const activeProblem = getProblemById(activeProblemId);

  return (
    <div className="min-h-screen bg-[#06080d] text-slate-100 flex flex-col justify-between selection:bg-[#d4a359]/30 selection:text-[#fef3c7]">
      
      {/* Top Navigation */}
      <Navbar
        activeView={activeView}
        setActiveView={(v) => { setActiveView(v); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        activeProblem={activeProblem}
        globalPractitioners={globalPractitioners}
      />

      {/* Active Focus Pill (if viewing detail views) */}
      {activeView !== 'matrix' && activeView !== 'diagnostic' && activeView !== 'community' && (
        <div className="bg-[#0c1018]/80 border-b border-white/5 py-2 px-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Current Focus:</span>
              <span className="text-[#d4a359] font-bold">{activeProblem.title}</span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="text-slate-400 hidden sm:inline">{activeProblem.culturalSolution.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveView('matrix')}
                className="text-slate-400 hover:text-slate-200 underline text-[11px]"
              >
                Change Challenge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main App Container */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 pt-8 flex-1 w-full">
        
        {activeView === 'matrix' && (
          <ProblemMatrix
            onSelectProblem={handleSelectProblem}
            onStartDiagnostic={() => setActiveView('diagnostic')}
          />
        )}

        {activeView === 'diagnostic' && (
          <DiagnosticQuiz
            onCompleteDiagnostic={(probId, targetView) => handleSelectProblem(probId, targetView)}
            onCancel={() => setActiveView('matrix')}
          />
        )}

        {activeView === 'immersion' && (
          <ImmersionChamber
            problem={activeProblem}
            onNavigateToScience={() => { setActiveView('science'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            onNavigateToProtocol={() => { setActiveView('protocol'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            onSelectOtherProblem={handleSelectProblem}
          />
        )}

        {activeView === 'science' && (
          <ScienceMechanismEngine
            problem={activeProblem}
            onNavigateToProtocol={() => { setActiveView('protocol'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            onBackToImmersion={() => { setActiveView('immersion'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          />
        )}

        {activeView === 'protocol' && (
          <ProtocolStudio
            problem={activeProblem}
            onLogPractice={handleLogPractice}
            onNavigateToTelemetry={() => { setActiveView('telemetry'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          />
        )}

        {activeView === 'oracle' && (
          <AIElderOracle problem={activeProblem} />
        )}

        {activeView === 'telemetry' && (
          <TrackingTelemetry
            practiceLogs={practiceLogs}
            onClearLogs={handleClearLogs}
          />
        )}

        {activeView === 'community' && (
          <CommunityPulse globalPractitioners={globalPractitioners} />
        )}

        {activeView === 'builder' && (
          <RitualBuilder
            onSaveCustomRitual={(r) => console.log('Saved custom ritual', r)}
            onNavigateToProtocol={() => setActiveView('protocol')}
          />
        )}

      </main>

      {/* High-End Obsidian Footer */}
      <footer className="mt-16 border-t border-white/10 glass-panel py-10 px-4 lg:px-8 text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-lg font-bold text-slate-100">FESTORA : WISDOM OS</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#d4a359]/20 text-[#d4a359] border border-[#d4a359]/30">v2.4 Production</span>
              </div>
              <p className="text-slate-400 text-xs font-light">
                Bridging Timeless Cultural Technologies with Modern Psychological & Neurobiological Challenges.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-slate-300 text-xs">
              <button onClick={() => setActiveView('matrix')} className="hover:text-[#d4a359]">Problem Matrix</button>
              <button onClick={() => setActiveView('science')} className="hover:text-[#d4a359]">Science Lab</button>
              <button onClick={() => setActiveView('oracle')} className="hover:text-[#d4a359]">AI Oracle</button>
              <button onClick={() => setActiveView('community')} className="hover:text-[#d4a359]">Community Pulse</button>
              <button onClick={() => setActiveView('telemetry')} className="hover:text-[#d4a359]">Telemetry</button>
            </div>
          </div>

          {/* Ethics & Clinical Disclaimer */}
          <div className="text-[11px] text-slate-500 leading-relaxed font-light flex flex-col sm:flex-row items-start justify-between gap-4">
            <p className="max-w-3xl">
              <strong>Clinical & Ethical Notice:</strong> Festora Wisdom OS is an evidence-grounded behavioral design and cultural wellness platform. It is designed to complement healthy lifestyle interventions and does not replace medical diagnostics or clinical psychotherapy.
            </p>
            <span className="text-slate-600 whitespace-nowrap">Privacy-Preserving Local Storage</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
