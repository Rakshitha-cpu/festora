import React, { useState } from 'react';
import { 
  Compass, 
  Flame, 
  Brain, 
  Sparkles, 
  ArrowRight, 
  Filter, 
  Search, 
  CheckCircle2, 
  Activity, 
  ShieldAlert,
  Sun,
  Users,
  Moon,
  TrendingDown,
  HeartHandshake
} from 'lucide-react';
import { PROBLEM_CATEGORIES } from '../data/problemsData';

const iconMap = {
  Sun: Sun,
  Users: Users,
  Flame: Flame,
  Compass: Compass,
  ShieldAlert: ShieldAlert,
  TrendingDown: TrendingDown,
  Moon: Moon,
  HeartHandshake: HeartHandshake,
};

export default function ProblemMatrix({ onSelectProblem, onStartDiagnostic }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [intensityFilter, setIntensityFilter] = useState(1);

  const filterChips = [
    { id: 'all', label: 'All Challenges' },
    { id: 'burnout', label: '#Burnout & Depletion' },
    { id: 'isolation', label: '#Loneliness & Community' },
    { id: 'anxiety', label: '#Anxiety & Panic' },
    { id: 'purpose', label: '#Purpose & Identity' },
    { id: 'grief', label: '#Grief & Letting Go' },
  ];

  const filteredProblems = PROBLEM_CATEGORIES.filter((prob) => {
    const matchesSearch = prob.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prob.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prob.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesIntensity = prob.intensityLevel >= intensityFilter;

    if (selectedCategory === 'all') return matchesSearch && matchesIntensity;
    if (selectedCategory === 'burnout') return matchesSearch && matchesIntensity && (prob.id.includes('burnout') || prob.id.includes('depletion'));
    if (selectedCategory === 'isolation') return matchesSearch && matchesIntensity && (prob.id.includes('isolation') || prob.id.includes('fracture'));
    if (selectedCategory === 'anxiety') return matchesSearch && matchesIntensity && (prob.id.includes('anxiety') || prob.id.includes('chaos'));
    if (selectedCategory === 'purpose') return matchesSearch && matchesIntensity && prob.id.includes('purpose');
    if (selectedCategory === 'grief') return matchesSearch && matchesIntensity && prob.id.includes('grief');

    return matchesSearch && matchesIntensity;
  });

  return (
    <div className="space-y-10 pb-16">
      
      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-3xl glass-panel-glow p-6 sm:p-10 border border-[#d4a359]/30">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#d4a359]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4a359]/15 border border-[#d4a359]/30 text-[#d4a359] text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Problem-First Architecture • Ancient Behavioral Science</span>
          </div>

          <h1 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-tight text-slate-100 leading-tight">
            What is challenging your mind <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4a359] via-[#f59e0b] to-[#fde68a]">right now?</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            We don't ask you to memorize festival trivia. Every timeless ritual was an elegant, battle-tested solution to human burnout, isolation, panic, and grief. Select your real challenge below to unlock its psychological antidote.
          </p>

          {/* Quick Actions */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onStartDiagnostic}
              className="px-5 py-2.5 rounded-xl bg-[#d4a359] hover:bg-[#c39148] text-slate-950 font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg"
            >
              <span>Take Symptom Diagnostic</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <div className="text-xs font-mono text-slate-400">
              Avg. Time to Prescribe: <span className="text-emerald-400 font-semibold">90 seconds</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search symptoms (e.g., #BrainFog, #Loneliness, #CareerPanic, #WinterBlues)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-panel text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#d4a359]/60 transition-all font-mono"
            />
          </div>

          {/* Intensity Slider */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl glass-panel text-xs font-mono">
            <span className="text-slate-400 whitespace-nowrap">Min Intensity:</span>
            <input
              type="range"
              min="1"
              max="9"
              value={intensityFilter}
              onChange={(e) => setIntensityFilter(parseInt(e.target.value))}
              className="accent-[#d4a359] w-24"
            />
            <span className="text-[#d4a359] font-bold">{intensityFilter}/10</span>
          </div>
        </div>

        {/* Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {filterChips.map((chip) => (
            <button
              key={chip.id}
              onClick={() => setSelectedCategory(chip.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
                selectedCategory === chip.id
                  ? 'bg-[#d4a359]/20 text-[#fef3c7] border border-[#d4a359]/50 shadow-sm'
                  : 'glass-panel text-slate-400 hover:text-slate-200'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Problem Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProblems.map((prob) => {
          const Icon = iconMap[prob.iconName] || Compass;
          return (
            <div
              key={prob.id}
              className="group relative flex flex-col justify-between glass-panel rounded-3xl p-6 border border-white/10 hover:border-[#d4a359]/40 hover:bg-[#0e1420] transition-all duration-300 shadow-lg"
            >
              {/* Top Meta */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-transform group-hover:scale-110"
                    style={{ 
                      backgroundColor: `${prob.accentColor}18`, 
                      borderColor: `${prob.accentColor}40`,
                      color: prob.accentColor 
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                      {prob.badge}
                    </span>
                    <span className="text-[11px] font-mono text-[#d4a359] font-bold mt-1">
                      Intensity: {prob.intensityLevel}/10
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-cinzel text-xl font-bold text-slate-100 group-hover:text-[#fde68a] transition-colors">
                    {prob.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 font-light leading-relaxed">
                    {prob.shortDesc}
                  </p>
                </div>

                {/* Symptom Tags */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">Core Symptoms:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {prob.symptoms.map((sym, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5"
                      >
                        {sym}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cultural Solution Preview */}
                <div className="pt-3 border-t border-white/5 space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#d4a359]">
                    Cultural Technology Antidote:
                  </div>
                  <div className="text-xs text-slate-200 font-semibold flex items-center gap-1.5">
                    <span>{prob.culturalSolution.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono italic">
                    "{prob.culturalSolution.corePrinciple}"
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-4 border-t border-white/5 flex items-center gap-2">
                <button
                  onClick={() => onSelectProblem(prob.id, 'immersion')}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#d4a359]/20 to-[#d4a359]/10 hover:from-[#d4a359] hover:to-[#c39148] text-[#fef3c7] hover:text-slate-950 border border-[#d4a359]/40 text-xs font-bold font-mono tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Enter Scenario</span>
                </button>
                <button
                  onClick={() => onSelectProblem(prob.id, 'protocol')}
                  title="Direct to Action Protocol"
                  className="p-2.5 rounded-xl glass-panel hover:bg-white/10 text-slate-300 border border-white/10 transition-all"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
