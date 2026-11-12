import React, { useEffect, useState } from "react";
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

export default function Games() {
  const [sessionId] = useState(getSessionId);
  const [levels, setLevels] = useState([]);
  const [progress, setProgress] = useState(null);
  const [activeLevel, setActiveLevel] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadLevels = async () => {
    const res = await fetch(`${API}/games/levels?session_id=${sessionId}`);
    const data = await res.json();
    setLevels(data.levels || []);
  };

  const loadProgress = async () => {
    const res = await fetch(`${API}/games/progress?session_id=${sessionId}`);
    setProgress(await res.json());
  };

  useEffect(() => {
    loadLevels();
    loadProgress();
  }, []);

  const openLevel = async (level) => {
    if (level.status === "locked") return;
    setLoading(true);
    setResult(null);
    setAnswers({});
    try {
      const res = await fetch(`${API}/games/level/${level.id}`);
      setQuiz(await res.json());
      setActiveLevel(level);
    } finally {
      setLoading(false);
    }
  };

  const choose = (qid, option) => {
    setAnswers((prev) => ({ ...prev, [qid]: option }));
  };

  const submitQuiz = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/games/level/${activeLevel.id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, answers }),
      });
      const data = await res.json();
      setResult(data);
      loadLevels();
      loadProgress();
    } finally {
      setLoading(false);
    }
  };

  const backToMap = () => {
    setActiveLevel(null);
    setQuiz(null);
    setResult(null);
    setAnswers({});
  };

  const groupedByState = levels.reduce((acc, lvl) => {
    (acc[lvl.state] = acc[lvl.state] || []).push(lvl);
    return acc;
  }, {});

  return (
    <div>
      {progress && (
        <div style={progressBar}>
          <div>
            <b style={{ fontSize: "1.3rem", color: "var(--maroon)" }}>{progress.total_points}</b>
            <span style={{ color: "var(--ink-soft)", marginLeft: "0.4rem" }}>points</span>
          </div>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {progress.badges.map((b) => (
              <span key={b} style={badgePill}>🏅 {b.replace("_", " ")}</span>
            ))}
          </div>
        </div>
      )}

      {!activeLevel && (
        <section style={sectionStyle}>
          <h3 style={{ marginBottom: "0.3rem" }}>🎮 Cultural Quest</h3>
          <p style={{ color: "var(--ink-soft)", marginTop: 0 }}>
            Answer questions built from Festora's verified knowledge base. Pass a level (3/5 correct) to unlock the next.
          </p>
          {Object.entries(groupedByState).map(([state, stateLevels]) => (
            <div key={state} style={{ marginBottom: "1.25rem" }}>
              <h4 style={{ marginBottom: "0.5rem" }}>{state}</h4>
              <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                {stateLevels.map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => openLevel(lvl)}
                    disabled={lvl.status === "locked"}
                    style={levelTile(lvl.status)}
                  >
                    {lvl.status === "locked" ? (
                      <span style={{ opacity: 0.4 }}><StateMascot state={state} size={36} /></span>
                    ) : (
                      <StateMascot state={state} size={36} />
                    )}
                    {lvl.status === "completed" && <span style={{ position: "absolute", top: 2, right: 6 }}>⭐</span>}
                    <div>Level {lvl.level_number}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {activeLevel && quiz && !result && (
        <section style={sectionStyle}>
          <h3>{activeLevel.state} — Level {activeLevel.level_number}</h3>
          {quiz.questions.map((q, i) => (
            <div key={q.id} style={{ marginBottom: "1.1rem" }}>
              <p style={{ fontWeight: 600 }}>{i + 1}. {q.prompt}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {q.options.map((opt) => (
                  <label key={opt} style={optionRow(answers[q.id] === opt)}>
                    <input
                      type="radio"
                      name={q.id}
                      checked={answers[q.id] === opt}
                      onChange={() => choose(q.id, opt)}
                      style={{ marginRight: "0.6rem" }}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div style={{ display: "flex", gap: "0.6rem" }}>
            <Button onClick={submitQuiz} disabled={loading || Object.keys(answers).length < quiz.questions.length}>
              {loading ? "Submitting…" : "Submit Answers"}
            </Button>
            <button onClick={backToMap} style={ghostBtn}>← Back to map</button>
          </div>
        </section>
      )}

      {result && (
        <section style={sectionStyle}>
          <h3>{result.passed ? "🎉 Level Passed!" : "Try Again"}</h3>
          <p>{result.correct}/{result.total} correct ({(result.score_pct * 100).toFixed(0)}%)</p>
          {result.passed && <p style={{ color: "var(--green)", fontWeight: 700 }}>+{result.points_earned} points earned</p>}
          {result.new_badges.length > 0 && (
            <div>
              <p style={{ fontWeight: 700 }}>New badges:</p>
              {result.new_badges.map((b) => (
                <div key={b.name} style={{ ...cardStyle, marginBottom: "0.4rem" }}>
                  🏅 <b>{b.name}</b> — {b.desc}
                </div>
              ))}
            </div>
          )}
          <div style={{ display: "flex", gap: "0.6rem", marginTop: "1rem" }}>
            <Button onClick={backToMap}>← Back to Level Map</Button>
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

function levelTile(status) {
  return {
    position: "relative",
    width: 90,
    height: 90,
    borderRadius: 14,
    border: "1px solid #e6d7bd",
    background: status === "completed" ? "var(--gold-light)" : status === "unlocked" ? "#fffaf1" : "#eee2cb",
    color: "var(--ink)",
    fontWeight: 700,
    fontSize: "1.4rem",
    cursor: status === "locked" ? "not-allowed" : "pointer",
    opacity: status === "locked" ? 0.5 : 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.3rem",
  };
}

function optionRow(selected) {
  return {
    padding: "0.6rem 0.9rem",
    borderRadius: 10,
    border: selected ? "2px solid var(--maroon)" : "1px solid #e6d7bd",
    background: selected ? "var(--gold-light)" : "#fffaf1",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  };
}

const sectionStyle = {
  background: "#fffdf8",
  border: "1px solid #f0e2c4",
  borderRadius: 18,
  padding: "1.6rem",
  marginBottom: "1.25rem",
  boxShadow: "0 10px 30px rgba(90, 40, 20, 0.12)",
};

const cardStyle = {
  border: "1px solid #e6d7bd",
  borderRadius: 12,
  padding: "0.7rem 1rem",
  background: "#fffaf1",
};

const progressBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0.9rem 1.3rem",
  background: "#fffaf1",
  border: "1px solid #f0e2c4",
  borderRadius: 14,
  marginBottom: "1.25rem",
};

const badgePill = {
  padding: "0.3rem 0.7rem",
  borderRadius: 999,
  background: "var(--gold-light)",
  fontSize: "0.8rem",
  fontWeight: 600,
};

const ghostBtn = {
  padding: "0.6rem 1.3rem",
  borderRadius: 10,
  border: "1px solid #e6d7bd",
  background: "#fff",
  color: "var(--ink)",
  fontWeight: 600,
  cursor: "pointer",
};
