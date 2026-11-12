import React, { useState } from 'react';
import { 
  Brain, 
  Activity, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  ShieldCheck, 
  Sliders, 
  ExternalLink,
  CheckCircle2,
  HelpCircle,
  Clock,
  Layers
} from 'lucide-react';

export default function ScienceMechanismEngine({ problem, onNavigateToProtocol, onBackToImmersion }) {
  const [activeTab, setActiveTab] = useState('mechanisms');
  const [expandedCitation, setExpandedCitation] = useState(null);

  const solution = problem.culturalSolution;

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header Banner */}
      <section className="glass-panel-glow rounded-3xl p-6 sm:p-10 border border-[#d4a359]/30 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4a359]/15 border border-[#d4a359]/30 text-[#d4a359] text-xs font-mono">
          <Brain className="w-3.5 h-3.5" />
          <span>Neurobiology • Cognitive Behavioral Science • Polyvagal Dynamics</span>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
            The Psychological Science Behind:
          </span>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-slate-100">
            {solution.name}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light max-w-3xl leading-relaxed">
            Ancient cultures did not formulate these practices as dogma or blind superstition. They engineered precise behavioral architectures to solve high-stakes human crises. Here is the neurobiological proof.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 pt-2 border-t border-white/10">
          {[
            { id: 'mechanisms', label: 'Biological Mechanisms', icon: Activity },
            { id: 'then_now', label: 'Then vs. Now Parallels', icon: Layers },
            { id: 'genz', label: 'Why This Works for Gen-Z', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                  isActive
                    ? 'bg-[#d4a359] text-slate-950 font-bold shadow-md'
                    : 'glass-panel text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Tab 1: Mechanisms */}
      {activeTab === 'mechanisms' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solution.mechanisms.map((mech, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-3xl p-6 border border-white/10 hover:border-[#d4a359]/40 space-y-4 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-[#d4a359]/15 text-[#d4a359] border border-[#d4a359]/30">
                    {mech.category}
                  </span>
                  <Activity className="w-4 h-4 text-slate-500" />
                </div>

                <div>
                  <h3 className="font-cinzel text-lg font-bold text-slate-100">
                    {mech.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-light mt-2 leading-relaxed">
                    {mech.detail}
                  </p>
                </div>

                {/* Clinical Citation */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <BookOpen className="w-3.5 h-3.5 text-[#d4a359]" />
                    <span className="truncate max-w-[240px]">{mech.citation}</span>
                  </div>
                  <span className="text-emerald-400 font-semibold">Peer Reviewed</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick CTA to Practice */}
          <div className="glass-panel-glow rounded-2xl p-6 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-cinzel text-base font-bold text-slate-100">Ready to test this protocol in your daily life?</h4>
              <p className="text-xs text-slate-300 font-light">Commit to the 10-minute Solo or Partner implementation protocol today.</p>
            </div>
            <button
              onClick={onNavigateToProtocol}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4a359] to-[#c39148] text-slate-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:opacity-90 transition-all shadow-lg whitespace-nowrap"
            >
              <Sliders className="w-4 h-4" />
              <span>Launch Protocol Studio</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Then vs. Now */}
      {activeTab === 'then_now' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 space-y-8">
          <div className="space-y-2">
            <h3 className="font-cinzel text-2xl font-bold text-slate-100">The Structural Parallel</h3>
            <p className="text-xs font-mono text-slate-400">Ancient Problem Matrix ↔ Modern Urban Reality</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Ancient Context */}
            <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4a359] font-bold">
                Ancient Manifestation
              </span>
              <h4 className="font-cinzel text-lg font-bold text-slate-200">
                {problem.historicalContext.era}
              </h4>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Faced acute seasonal isolation, loss of food predictability, post-harvest depression, and inter-clan fractures that threatened physical survival.
              </p>
              <div className="p-3 rounded-xl bg-white/5 text-[11px] font-mono text-slate-400">
                Ancient Solution: "{solution.corePrinciple}"
              </div>
            </div>

            {/* Modern Context */}
            <div className="p-6 rounded-2xl bg-[#0c121e] border border-[#d4a359]/30 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                Modern Gen-Z Manifestation
              </span>
              <h4 className="font-cinzel text-lg font-bold text-slate-200">
                Digital Hyper-Connection & Circadian Misalignment
              </h4>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Experiences artificial blue light at 2am, dopamine burnout from social media comparison, loneliness despite hundreds of digital followers, and lack of seasonal grounding.
              </p>
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-[11px] font-mono text-emerald-300">
                Modern Applied Tool: Solo & Partner Micro-Ritual Protocol
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tab 3: Gen-Z Relevance */}
      {activeTab === 'genz' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 space-y-6">
          <h3 className="font-cinzel text-2xl font-bold text-slate-100">Why Modern Self-Help Fails Where Cultural Tech Succeeds</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {[
              {
                title: "1. Somatic Over Conceptual",
                desc: "Meditation apps often ask an overactive brain to 'think about not thinking.' Cultural rituals use physical posture, tactile anchors (flame, water, sesame), and breath to bypass cognitive static."
              },
              {
                title: "2. Synchronized Social Buffering",
                desc: "Individual therapy addresses the isolated self. Cultural rituals engineer synchronized tribal motion and shared meals, instantly signaling safety to the autonomic nervous system."
              },
              {
                title: "3. Hard Temporal Landmarks",
                desc: "Generic productivity systems lack sacred boundaries. Seasonal rituals provide unambiguous psychological transition points, triggering the Fresh Start effect without willpower fatigue."
              }
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-cinzel text-base font-bold text-[#d4a359]">{item.title}</h4>
                <p className="text-xs text-slate-300 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
