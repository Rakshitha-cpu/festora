import React, { useState } from 'react';
import { 
  MessageSquareCode, 
  Sparkles, 
  Send, 
  Volume2, 
  VolumeX, 
  Key, 
  Brain, 
  UserCheck, 
  Flame, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { askElderOracle } from '../services/geminiService';

export default function AIElderOracle({ problem }) {
  const [selectedPersona, setSelectedPersona] = useState(problem ? problem.character.id : 'oracle');
  const [query, setQuery] = useState('');
  const [apiKey, setApiKey] = useState(localStorage.getItem('festora_gemini_key') || '');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "I am the Wisdom OS Oracle. I synthesize 5,000 years of cultural behavioral technologies with modern clinical neuroscience. Ask me about your real-life challenges, why specific rituals work, or how to adapt a practice to your urban routine.",
      persona: 'oracle'
    }
  ]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const personas = [
    { id: 'oracle', name: 'Wisdom OS Core', role: 'Meta-Synthesis Engine (Neuroscience x Tradition)', avatar: '🌐' },
    { id: 'devraj', name: 'Devraj', role: 'Agrarian Elder (Winter Reset & Phototherapy)', avatar: '🌾' },
    { id: 'alok', name: 'Scholar Alok', role: 'Philosopher of Stillness (Anxiety & Trataka)', avatar: '🕯️' },
    { id: 'meera', name: 'Meera', role: 'Voice of Authentic Purpose & Courage', avatar: '🪕' },
    { id: 'anand', name: 'Merchant Anand', role: 'Master of Letting Go & Scarcity Reversal', avatar: '🏺' },
  ];

  const handleSaveKey = (e) => {
    e.preventDefault();
    localStorage.setItem('festora_gemini_key', apiKey);
    setShowKeyInput(false);
  };

  const handleSend = async (customQuery) => {
    const q = customQuery || query;
    if (!q.trim()) return;

    const userMsg = { role: 'user', text: q };
    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setLoading(true);

    try {
      const response = await askElderOracle({
        characterId: selectedPersona,
        query: q,
        apiKey: apiKey
      });

      setMessages(prev => [...prev, {
        role: 'assistant',
        text: response.text,
        persona: selectedPersona,
        source: response.source
      }]);
    } catch (e) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: "The connection fluctuated, but the principle remains: ground in the breath, observe without judgment, and step into the sunlight.",
        persona: selectedPersona
      }]);
    } finally {
      setLoading(false);
    }
  };

  const speakText = (text) => {
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

  const quickPrompts = [
    "Why does dawn sun viewing cure winter burnout?",
    "How can I do this practice as a busy student with 5 mins?",
    "How do I explain this to my skeptical, secular friends?",
    "I'm experiencing intense anxiety right now—give me a 3-minute reset."
  ];

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <section className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-[#d4a359]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4a359]/15 border border-[#d4a359]/30 text-[#d4a359] text-xs font-mono">
            <MessageSquareCode className="w-3.5 h-3.5" />
            <span>Dual Engine • In-Character Archetypal AI + Gemini Live</span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-slate-100">
            Interactive Wisdom Oracle
          </h1>
          <p className="text-xs font-mono text-slate-400">
            Have honest dialogue with historical practitioners and cultural psychologists.
          </p>
        </div>

        {/* API Key Config Toggle */}
        <button
          onClick={() => setShowKeyInput(!showKeyInput)}
          className="px-3.5 py-2 rounded-xl glass-panel text-xs font-mono text-slate-300 border border-white/10 hover:border-[#d4a359]/40 flex items-center gap-2 transition-all shrink-0"
        >
          <Key className="w-3.5 h-3.5 text-[#d4a359]" />
          <span>{apiKey ? 'API Key Active' : 'Configure Gemini Key'}</span>
        </button>
      </section>

      {/* Optional Gemini API Key Drawer */}
      {showKeyInput && (
        <form onSubmit={handleSaveKey} className="glass-panel rounded-2xl p-4 border border-[#d4a359]/30 flex flex-col sm:flex-row items-center gap-3">
          <input
            type="password"
            placeholder="Paste Google Gemini API Key (optional - smart fallback active)"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="flex-1 w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#d4a359]"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#d4a359] text-slate-950 font-mono text-xs font-bold uppercase"
          >
            Save Key
          </button>
        </form>
      )}

      {/* Persona Selector Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {personas.map((p) => {
          const isActive = selectedPersona === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPersona(p.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-mono whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-[#d4a359]/20 text-[#fef3c7] border-[#d4a359]/60 shadow-md font-bold'
                  : 'glass-panel text-slate-400 border-white/5 hover:border-white/20'
              }`}
            >
              <span>{p.avatar}</span>
              <span>{p.name}</span>
            </button>
          );
        })}
      </div>

      {/* Dialogue Stream Container */}
      <div className="glass-panel rounded-3xl p-6 border border-white/10 min-h-[420px] flex flex-col justify-between space-y-6">
        
        {/* Messages Feed */}
        <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2">
          {messages.map((msg, idx) => {
            const isUser = msg.role === 'user';
            const matchedPersona = personas.find(p => p.id === msg.persona) || personas[0];
            return (
              <div
                key={idx}
                className={`flex gap-3.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-[#07090e] border border-[#d4a359]/30 flex items-center justify-center text-base shrink-0">
                    {matchedPersona.avatar}
                  </div>
                )}

                <div className={`max-w-[82%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-2 ${
                  isUser
                    ? 'bg-[#d4a359] text-slate-950 font-medium'
                    : 'glass-panel text-slate-200 border border-white/10'
                }`}>
                  {!isUser && (
                    <div className="flex items-center justify-between gap-4 pb-1 border-b border-white/5 text-[10px] font-mono text-slate-400">
                      <span>{matchedPersona.name}</span>
                      <button
                        onClick={() => speakText(msg.text)}
                        className="hover:text-[#d4a359] flex items-center gap-1"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Speak</span>
                      </button>
                    </div>
                  )}

                  <p className="font-light whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 items-center text-xs font-mono text-[#d4a359] animate-pulse">
              <span>Oracle contemplating timeless patterns...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="space-y-2 pt-2 border-t border-white/5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Quick Inquiries:</span>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((qp, i) => (
              <button
                key={i}
                onClick={() => handleSend(qp)}
                className="text-[11px] font-mono px-3 py-1 rounded-xl bg-white/5 hover:bg-[#d4a359]/20 text-slate-300 hover:text-[#fef3c7] border border-white/5 transition-all text-left"
              >
                "{qp}"
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2 pt-2">
          <input
            type="text"
            placeholder={`Ask ${personas.find(p => p.id === selectedPersona)?.name || 'Oracle'} anything...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 px-4 py-3 rounded-2xl glass-panel text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#d4a359]/60 font-mono"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !query.trim()}
            className="p-3.5 rounded-2xl bg-[#d4a359] hover:bg-[#c39148] disabled:opacity-50 text-slate-950 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
