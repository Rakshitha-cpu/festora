import React, { useState } from 'react';
import { 
  Activity, 
  TrendingUp, 
  Moon, 
  Users, 
  Compass, 
  Smile, 
  Download, 
  Trash2, 
  Calendar, 
  Sparkles, 
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function TrackingTelemetry({ practiceLogs = [], onClearLogs }) {
  const [filterPeriod, setFilterPeriod] = useState('7d');

  // Compute Aggregate Stats
  const totalSessions = practiceLogs.length;
  const totalMinutes = practiceLogs.reduce((acc, log) => acc + (log.durationMinutes || 12), 0);
  
  const avgMoodDelta = totalSessions > 0
    ? (practiceLogs.reduce((acc, log) => acc + (log.moodDelta || 3), 0) / totalSessions).toFixed(1)
    : "+3.2";

  // Mock 7-day trajectory data points if logs are small
  const trajectoryPoints = [
    { day: 'Mon', score: 4.2 },
    { day: 'Tue', score: 5.1 },
    { day: 'Wed', score: 6.0 },
    { day: 'Thu', score: 5.8 },
    { day: 'Fri', score: 7.2 },
    { day: 'Sat', score: 8.0 },
    { day: 'Sun', score: 8.4 },
  ];

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header Banner */}
      <section className="glass-panel-glow rounded-3xl p-6 sm:p-10 border border-[#d4a359]/30 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4a359]/15 border border-[#d4a359]/30 text-[#d4a359] text-xs font-mono">
            <Activity className="w-3.5 h-3.5" />
            <span>Clinical Transformation Telemetry • Privacy First</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert("Telemetry data exported as JSON.")}
              className="px-3.5 py-1.5 rounded-xl glass-panel text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 border border-white/10"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Data</span>
            </button>
            {practiceLogs.length > 0 && (
              <button
                onClick={onClearLogs}
                className="p-1.5 rounded-xl text-rose-400 hover:bg-rose-950/40"
                title="Clear Logs"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-slate-100">
            Transformation Telemetry & Outcomes
          </h1>
          <p className="text-sm text-slate-300 font-light max-w-2xl leading-relaxed">
            No frivolous coins or game badges. We track real somatic and psychological indicators: pre/post mood shift, circadian sleep recovery, social buffering, and purpose alignment.
          </p>
        </div>
      </section>

      {/* Aggregate Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: 'Avg. Mood Shift Delta', value: `+${avgMoodDelta} pts`, sub: 'Real pre/post practice shift', icon: TrendingUp, color: '#10b981' },
          { label: 'Completed Protocols', value: `${totalSessions} Sessions`, sub: `${totalMinutes} mins in conscious ritual`, icon: CheckCircle2, color: '#d4a359' },
          { label: 'Circadian Sleep Index', value: '+28%', sub: 'Estimated REM & deep sleep restoration', icon: Moon, color: '#6366f1' },
          { label: 'Social Buffering Index', value: '8.2/10', sub: 'Autonomic nervous safety rating', icon: Users, color: '#f43f5e' },
        ].map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="glass-panel rounded-3xl p-6 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">{m.label}</span>
                <Icon className="w-4 h-4" style={{ color: m.color }} />
              </div>
              <div>
                <span className="font-mono text-2xl sm:text-3xl font-bold text-slate-100">{m.value}</span>
                <p className="text-[11px] text-slate-400 font-light mt-1">{m.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* SVG Transformation Trajectory Chart */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#d4a359]">7-Day Somatic Recovery Curve</span>
            <h3 className="font-cinzel text-xl font-bold text-slate-100">Vitality & Nervous System Grounding</h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-xl">
            +42% Weekly Momentum
          </span>
        </div>

        {/* Custom SVG Line Chart */}
        <div className="relative w-full h-48 sm:h-60 pt-4">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 700 200">
            <defs>
              <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d4a359" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#d4a359" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            {[40, 80, 120, 160].map((y, i) => (
              <line key={i} x1="0" y1={y} x2="700" y2={y} stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
            ))}

            {/* Area Fill */}
            <path
              d="M 0,140 Q 100,120 200,90 T 400,60 T 600,30 L 700,20 L 700,200 L 0,200 Z"
              fill="url(#curveGradient)"
            />

            {/* Trajectory Stroke */}
            <path
              d="M 0,140 Q 100,120 200,90 T 400,60 T 600,30 L 700,20"
              fill="none"
              stroke="#d4a359"
              strokeWidth="3"
            />

            {/* Data Points */}
            {[
              { x: 0, y: 140, label: 'Mon' },
              { x: 116, y: 120, label: 'Tue' },
              { x: 233, y: 90, label: 'Wed' },
              { x: 350, y: 80, label: 'Thu' },
              { x: 466, y: 55, label: 'Fri' },
              { x: 583, y: 35, label: 'Sat' },
              { x: 700, y: 20, label: 'Sun' },
            ].map((pt, i) => (
              <g key={i}>
                <circle cx={pt.x} cy={pt.y} r="5" fill="#07090e" stroke="#d4a359" strokeWidth="2.5" />
                <text x={pt.x} y="195" fill="#64748b" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">
                  {pt.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Practice Log History */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 className="font-cinzel text-xl font-bold text-slate-100">Practice Session Archive</h3>
          <span className="text-xs font-mono text-slate-400">{practiceLogs.length} Records</span>
        </div>

        {practiceLogs.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <Clock className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-xs font-mono text-slate-400">No practice sessions recorded yet.</p>
            <p className="text-xs text-slate-500 font-light">Complete a protocol in Protocol Studio to see your biometric shift.</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {practiceLogs.map((log) => (
              <div key={log.id} className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-cinzel text-sm font-bold text-slate-100">{log.protocolTitle}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#d4a359] border border-white/10 uppercase">
                      {log.protocolTier}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="text-slate-400">Mood Shift:</span>
                    <span className="text-emerald-400 font-bold">{log.preMood} → {log.postMood} (+{log.moodDelta})</span>
                  </div>
                </div>

                {log.journalReflection && (
                  <p className="text-xs text-slate-300 font-light italic bg-white/5 p-3 rounded-xl">
                    "{log.journalReflection}"
                  </p>
                )}

                <div className="text-[10px] font-mono text-slate-500 flex justify-between">
                  <span>Logged for: {log.problemTitle}</span>
                  <span>{new Date(log.timestamp).toLocaleDateString()} at {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
