import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Brain, 
  Flame, 
  RefreshCcw, 
  ShieldCheck, 
  Sliders,
  ChevronRight
} from 'lucide-react';
import { PROBLEM_CATEGORIES } from '../data/problemsData';

const QUESTIONS = [
  {
    id: 1,
    category: "Primary Somatic State",
    question: "When you wake up in the morning, what is the dominant sensation in your mind and body?",
    options: [
      { text: "Heavy lethargy, cold limbs, and dread of the seasonal grind", mapsTo: "seasonal-burnout", weight: 3 },
      { text: "Racing heart, cognitive static, and immediate panic over messages", mapsTo: "anxiety-overwhelm", weight: 3 },
      { text: "Numbness, feeling detached, wondering why you are doing any of this", mapsTo: "purpose-aimlessness", weight: 3 },
      { text: "Digital hangover from 1am screen scrolling, physical grogginess", mapsTo: "circadian-physical-depletion", weight: 3 },
    ]
  },
  {
    id: 2,
    category: "Social & Tribal Baseline",
    question: "If an unexpected personal crisis struck you tonight, what is your reality?",
    options: [
      { text: "I have 500+ followers, but no one within 10 miles I could call to sit with me", mapsTo: "digital-isolation", weight: 4 },
      { text: "I have people, but generational misunderstandings make it impossible to be vulnerable", mapsTo: "generational-fracture", weight: 4 },
      { text: "I am paralyzed by economic dread and feeling unprotected by institutions", mapsTo: "external-chaos-worry", weight: 3 },
      { text: "I am clinging to past betrayals and replay old arguments in my head", mapsTo: "grief-letting-go", weight: 4 },
    ]
  },
  {
    id: 3,
    category: "Cognitive Load & Executive Function",
    question: "How does your intellect behave when given 30 minutes of unstructured silence?",
    options: [
      { text: "It spins into catastrophic scenario trees and over-analyzes every flaw", mapsTo: "anxiety-overwhelm", weight: 3 },
      { text: "It immediately pulls out a phone to avoid facing the internal void", mapsTo: "digital-isolation", weight: 3 },
      { text: "It mourns past chapters and refuses to step into the future", mapsTo: "grief-letting-go", weight: 3 },
      { text: "It feels flat, exhausted, craving sleep that never feels restorative", mapsTo: "circadian-physical-depletion", weight: 3 },
    ]
  },
  {
    id: 4,
    category: "Desired Transformational Vector",
    question: "What would represent the most profound shift for you in the next 7 days?",
    options: [
      { text: "A clean solar reset: waking with natural vitality and seasonal purpose", mapsTo: "seasonal-burnout", weight: 4 },
      { text: "Real somatic belonging: synchronized rhythm with trusted humans", mapsTo: "digital-isolation", weight: 4 },
      { text: "Unwavering single-point stillness: halting the internal anxiety engine", mapsTo: "anxiety-overwhelm", weight: 4 },
      { text: "Courage to drop external validation and align with my true calling", mapsTo: "purpose-aimlessness", weight: 4 },
    ]
  }
];

export default function DiagnosticQuiz({ onCompleteDiagnostic, onCancel }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState({});
  const [prescription, setPrescription] = useState(null);

  const handleSelectOption = (option) => {
    const newScores = { ...scores, [option.mapsTo]: (scores[option.mapsTo] || 0) + option.weight };
    setScores(newScores);

    if (currentStep + 1 < QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate winner
      let highestId = 'seasonal-burnout';
      let maxScore = -1;
      Object.entries(newScores).forEach(([id, val]) => {
        if (val > maxScore) {
          maxScore = val;
          highestId = id;
        }
      });

      const matchedProblem = PROBLEM_CATEGORIES.find(p => p.id === highestId) || PROBLEM_CATEGORIES[0];
      setPrescription(matchedProblem);
    }
  };

  const restartQuiz = () => {
    setCurrentStep(0);
    setScores({});
    setPrescription(null);
  };

  if (prescription) {
    return (
      <div className="max-w-3xl mx-auto space-y-8 glass-panel-glow rounded-3xl p-6 sm:p-10 border border-[#d4a359]/40 my-8">
        
        {/* Prescription Header */}
        <div className="text-center space-y-3 pb-6 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono">
            <CheckCircle2 className="w-4 h-4" />
            <span>Diagnostic Complete • Neuro-Cultural Match Found</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-slate-100">
            Your Wisdom OS Prescription
          </h2>
          <p className="text-xs font-mono text-slate-400">
            Primary Diagnosed Deficit: <span className="text-[#d4a359] font-semibold uppercase">{prescription.badge}</span>
          </p>
        </div>

        {/* Diagnosis Box */}
        <div className="glass-panel rounded-2xl p-6 space-y-4 border border-white/10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase font-mono tracking-wider text-slate-400">Target Challenge:</span>
              <h3 className="font-cinzel text-2xl font-bold text-slate-100">{prescription.title}</h3>
            </div>
            <span className="px-3 py-1 rounded-xl bg-[#d4a359]/20 text-[#d4a359] border border-[#d4a359]/40 font-mono text-xs font-bold">
              {prescription.intensityLevel}/10 Severity
            </span>
          </div>

          <p className="text-sm text-slate-300 font-light leading-relaxed">
            {prescription.shortDesc}
          </p>

          <div className="p-4 rounded-xl bg-[#d4a359]/10 border border-[#d4a359]/20 space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-[#d4a359] font-bold">
              Prescribed Cultural Technology:
            </div>
            <div className="text-sm font-semibold text-slate-100">
              {prescription.culturalSolution.name}
            </div>
            <p className="text-xs text-slate-300 italic font-mono">
              "{prescription.culturalSolution.corePrinciple}"
            </p>
          </div>
        </div>

        {/* Action Gateways */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <button
            onClick={() => onCompleteDiagnostic(prescription.id, 'immersion')}
            className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#d4a359] to-[#c39148] text-slate-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg"
          >
            <Flame className="w-4 h-4" />
            <span>Step Into Historical Scenario</span>
          </button>

          <button
            onClick={() => onCompleteDiagnostic(prescription.id, 'protocol')}
            className="py-3.5 px-4 rounded-2xl glass-panel text-slate-100 hover:bg-white/10 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-white/15 transition-all"
          >
            <Sliders className="w-4 h-4 text-[#d4a359]" />
            <span>Start Today Protocol</span>
          </button>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={restartQuiz}
            className="text-xs font-mono text-slate-500 hover:text-slate-300 underline"
          >
            Retake Diagnostic Assessment
          </button>
        </div>

      </div>
    );
  }

  const q = QUESTIONS[currentStep];

  return (
    <div className="max-w-2xl mx-auto space-y-8 glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 my-8">
      
      {/* Quiz Progress */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs font-mono text-[#d4a359]">
          <Brain className="w-4 h-4" />
          <span>Symptom-To-Wisdom Diagnostic</span>
        </div>
        <span className="text-xs font-mono text-slate-400">
          Step {currentStep + 1} of {QUESTIONS.length}
        </span>
      </div>

      {/* Question Card */}
      <div className="space-y-4">
        <span className="text-[11px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-white/5 text-slate-400 border border-white/5">
          {q.category}
        </span>

        <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-100 leading-snug">
          {q.question}
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-3 pt-2">
        {q.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectOption(opt)}
            className="w-full text-left p-4 rounded-2xl glass-panel hover:glass-panel-glow hover:border-[#d4a359]/50 transition-all flex items-center justify-between gap-4 group cursor-pointer"
          >
            <span className="text-xs sm:text-sm text-slate-200 group-hover:text-slate-100 font-light">
              {opt.text}
            </span>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-[#d4a359] group-hover:translate-x-1 transition-all shrink-0" />
          </button>
        ))}
      </div>

      {/* Footer Back */}
      <div className="flex justify-between items-center pt-4 border-t border-white/5 text-xs font-mono">
        <button
          onClick={onCancel}
          className="text-slate-500 hover:text-slate-300"
        >
          Cancel & Browse All
        </button>
        <span className="text-slate-600">Privacy First: No personal data transmitted</span>
      </div>

    </div>
  );
}
