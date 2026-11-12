import React, { useState } from 'react';
import { 
  Users, 
  Sparkles, 
  Send, 
  Globe, 
  Clock, 
  Heart, 
  Flame, 
  Activity,
  CheckCircle2,
  Share2
} from 'lucide-react';

export default function CommunityPulse({ globalPractitioners = 3482 }) {
  const [intentions, setIntentions] = useState([
    { id: 1, text: "Letting go of perfectionism before my final semester exams in London.", location: "London, UK", timeAgo: "4m ago", hearts: 24 },
    { id: 2, text: "Practicing the 12-minute sunrise solar reset with my sister after 6 months of silence.", location: "Bengaluru, India", timeAgo: "11m ago", hearts: 49 },
    { id: 3, text: "Trataka candle meditation saved my nervous system from severe tech burnout tonight.", location: "Toronto, Canada", timeAgo: "18m ago", hearts: 62 },
    { id: 4, text: "Burning the old rejection letters in a heatproof bowl. Starting the new cycle clear.", location: "Berlin, Germany", timeAgo: "25m ago", hearts: 38 },
  ]);
  const [newIntention, setNewIntention] = useState('');
  const [userLocation, setUserLocation] = useState('Urban Global');

  const handlePostIntention = (e) => {
    e.preventDefault();
    if (!newIntention.trim()) return;

    setIntentions(prev => [
      {
        id: Date.now(),
        text: newIntention,
        location: userLocation || 'Global Practitioner',
        timeAgo: 'Just now',
        hearts: 1
      },
      ...prev
    ]);
    setNewIntention('');
  };

  const likeIntention = (id) => {
    setIntentions(prev => prev.map(item => item.id === id ? { ...item, hearts: item.hearts + 1 } : item));
  };

  return (
    <div className="space-y-10 pb-16 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <section className="glass-panel-glow rounded-3xl p-6 sm:p-10 border border-emerald-500/30 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Global Synchronized Pulse • Real-Time Social Buffering</span>
        </div>

        <div className="space-y-2">
          <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-slate-100">
            Collective Community Pulse
          </h1>
          <p className="text-sm text-slate-300 font-light leading-relaxed">
            You are not practicing in isolation. Ancient rituals drew their deepest psychological power from synchronized co-presence. See what thousands of minds are transforming across the world right now.
          </p>
        </div>

        {/* Live Aggregate Counter */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Live Active Practitioners:</span>
            <div className="text-2xl font-mono font-bold text-emerald-400 mt-1">{globalPractitioners.toLocaleString()}</div>
          </div>
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Global Anxiety Reduction:</span>
            <div className="text-2xl font-mono font-bold text-[#d4a359] mt-1">-38% Baseline</div>
          </div>
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Next Synchronized Circle:</span>
            <div className="text-2xl font-mono font-bold text-indigo-400 mt-1">18m 40s</div>
          </div>
        </div>
      </section>

      {/* Post Intention Form */}
      <form onSubmit={handlePostIntention} className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#d4a359]">
          <Flame className="w-4 h-4" />
          <span>Add Your Voice to the Global Intention Crucible</span>
        </div>

        <textarea
          value={newIntention}
          onChange={(e) => setNewIntention(e.target.value)}
          placeholder="What challenge are you transforming or letting go of today? (Anonymous to the world)"
          rows={3}
          className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#d4a359]/60 font-mono resize-none"
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <input
            type="text"
            placeholder="Your City / Region (e.g. New York, Mumbai)"
            value={userLocation}
            onChange={(e) => setUserLocation(e.target.value)}
            className="w-full sm:w-64 px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#d4a359] hover:bg-[#c39148] text-slate-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Cast Intention</span>
          </button>
        </div>
      </form>

      {/* Intention Stream Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2 text-xs font-mono text-slate-400">
          <span>Live Synchronized Intentions Feed</span>
          <span>{intentions.length} Global Posts</span>
        </div>

        <div className="space-y-3">
          {intentions.map((item) => (
            <div
              key={item.id}
              className="glass-panel rounded-2xl p-5 border border-white/10 hover:border-[#d4a359]/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed">
                  "{item.text}"
                </p>
                <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                  <span className="text-[#d4a359]">{item.location}</span>
                  <span>•</span>
                  <span>{item.timeAgo}</span>
                </div>
              </div>

              <button
                onClick={() => likeIntention(item.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-rose-950/40 text-slate-300 hover:text-rose-400 border border-white/5 hover:border-rose-500/30 text-xs font-mono transition-all shrink-0"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>{item.hearts}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
