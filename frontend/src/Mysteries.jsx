import React, { useState } from "react";
import { StateMascot } from "./Mascots.jsx";

const API = "http://127.0.0.1:8000";

function getSessionId() {
  let id = localStorage.getItem("festora_session_id");
  if (!id) {
    id = "guest-" + Math.random().toString(36).slice(2, 10);
    localStorage.setItem("festora_session_id", id);
  }
  return id;
}

const MODES = [
  { key: "riddle", label: "🕵️ Chronicler's Riddle", desc: "A cryptic riddle built from verified facts." },
  { key: "fragment", label: "🧩 Fragment Reveal", desc: "Guess the entity from a partial description." },
  { key: "thread", label: "🔗 Cultural Thread", desc: "Name what connects two entities in the graph." },
];

export default function Mysteries() {
  const [sessionId] = useState(getSessionId);
  const [mode, setMode] = useState(null);
  const [puzzle, setPuzzle] = useState(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const startMode = async (m) => {
    setLoading(true);
    setResult(null);
    setGuess("");
    setHintsUsed(0);
    try {
      const res = await fetch(`${API}/mysteries/${m}`);
      const data = await res.json();
      setPuzzle(data);
      setMode(m);
    } finally {
      setLoading(false);
    }
  };

  const useHint = () => {
    if (hintsUsed < (puzzle.hints?.length || 0)) {
      setHintsUsed(hintsUsed + 1);
    }
  };

  const submitGuess = async () => {
    if (!guess) return;
    setLoading(true);
    try {
      const correctAnswer = puzzle.answer || puzzle.answer_hint || guess;
      const res = await fetch(`${API}/mysteries/solve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          guess,
          correct_answer: correctAnswer,
          hints_used: hintsUsed,
        }),
      });
      setResult(await res.json());
    } finally {
      setLoading(false);
    }
  };

  const backToModes = () => {
    setMode(null);
    setPuzzle(null);
    setResult(null);
    setGuess("");
    setHintsUsed(0);
  };

  return (
    <div>
      {!mode && (
        <section style={sectionStyle}>
          <h3>🏺 Festora Heritage Mysteries</h3>
          <p style={{ color: "var(--ink-soft)" }}>
            Step into the role of Cultural Archivist. Decode artifacts, solve riddles, and trace
            hidden connections — all built from Festora's verified knowledge base.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
            {MODES.map((m) => (
              <button key={m.key} onClick={() => startMode(m.key)} style={modeCard}>
                <div style={{ fontSize: "1.4rem", marginBottom: "0.4rem" }}>{m.label}</div>
                <div style={{ fontSize: "0.85rem", color: "var(--ink-soft)" }}>{m.desc}</div>
              </button>
            ))}
          </div>
        </section>
      )}

      {mode && puzzle && !result && (
        <section style={sectionStyle}>
          <h3>{MODES.find((m) => m.key === mode).label}</h3>

          {mode === "thread" ? (
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
              <div style={entityBadge}>{puzzle.entity_a}</div>
              <div style={{ alignSelf: "center", fontSize: "1.5rem" }}>⟷</div>
              <div style={entityBadge}>{puzzle.entity_b}</div>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1rem" }}>
              <div style={{ flexShrink: 0 }}>
                <StateMascot state={puzzle.state} size={70} />
              </div>
              <blockquote style={{ ...quoteStyle, margin: 0, flex: 1 }}>{puzzle.prompt}</blockquote>
            </div>
          )}

          {hintsUsed > 0 && (
            <div style={{ marginBottom: "1rem" }}>
              {puzzle.hints.slice(0, hintsUsed).map((h, i) => (
                <p key={i} style={{ color: "var(--terracotta)", margin: "0.3rem 0" }}>💡 {h}</p>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.8rem" }}>
            <input
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Your answer…"
              style={inputStyle}
            />
            <Button onClick={submitGuess} disabled={loading || !guess}>Submit</Button>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={useHint}
              disabled={hintsUsed >= (puzzle.hints?.length || 0)}
              style={hintBtn}
            >
              🔎 Use Hint (−8 pts) {hintsUsed >= (puzzle.hints?.length || 0) ? "· none left" : ""}
            </button>
            <button onClick={backToModes} style={ghostBtn}>← Back</button>
          </div>
        </section>
      )}

      {result && (
        <section style={sectionStyle}>
          <h3>{result.correct ? "🎉 Solved!" : "Not quite"}</h3>
          {result.correct ? (
            <p style={{ color: "var(--green)", fontWeight: 700 }}>+{result.points_earned} points earned</p>
          ) : (
            <p style={{ color: "var(--ink-soft)" }}>That wasn't it — every mystery is a chance to learn something new.</p>
          )}
          <p>Total points: <b>{result.total_points}</b></p>
          <div style={{ display: "flex", gap: "0.6rem", marginTop: "1rem" }}>
            <Button onClick={backToModes}>Try Another Mystery</Button>
          </div>
        </section>
      )}
    </div>
  );
}

function Button({ children, ...props }) {
  return (
    <button {...props} style={{
      padding: "0.6rem 1.3rem",
      borderRadius: 10,
      border: "none",
      background: props.disabled ? "#d8c9b0" : "linear-gradient(135deg, var(--maroon), var(--terracotta))",
      color: "#fff",
      fontWeight: 700,
      cursor: props.disabled ? "not-allowed" : "pointer",
    }}>
      {children}
    </button>
  );
}

const sectionStyle = {
  background: "#fffdf8",
  border: "1px solid #f0e2c4",
  borderRadius: 18,
  padding: "1.6rem",
  marginBottom: "1.25rem",
  boxShadow: "0 10px 30px rgba(90, 40, 20, 0.12)",
};

const modeCard = {
  flex: "1 1 220px",
  textAlign: "left",
  padding: "1rem 1.2rem",
  borderRadius: 14,
  border: "1px solid #e6d7bd",
  background: "#fffaf1",
  cursor: "pointer",
};

const quoteStyle = {
  borderLeft: "4px solid var(--gold)",
  margin: "0 0 1rem",
  padding: "0.6rem 0 0.6rem 1rem",
  fontStyle: "italic",
  fontSize: "1.1rem",
};

const entityBadge = {
  padding: "0.7rem 1.1rem",
  borderRadius: 12,
  background: "var(--gold-light)",
  fontWeight: 700,
};

const inputStyle = {
  flex: 1,
  padding: "0.6rem 0.9rem",
  borderRadius: 10,
  border: "1px solid #e6d7bd",
  fontSize: "0.95rem",
};

const hintBtn = {
  padding: "0.5rem 1rem",
  borderRadius: 10,
  border: "1px solid var(--terracotta)",
  background: "#fff",
  color: "var(--terracotta)",
  fontWeight: 600,
  cursor: "pointer",
};

const ghostBtn = {
  padding: "0.5rem 1rem",
  borderRadius: 10,
  border: "1px solid #e6d7bd",
  background: "#fff",
  color: "var(--ink)",
  fontWeight: 600,
  cursor: "pointer",
};
