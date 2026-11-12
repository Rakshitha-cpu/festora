import React, { useEffect, useState } from "react";

const API = "http://127.0.0.1:8000";

export default function AdminPanel() {
  const [status, setStatus] = useState("pending");
  const [submissions, setSubmissions] = useState([]);
  const [gaps, setGaps] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadSubmissions = async (s) => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/submissions?status=${s}`);
      setSubmissions(await res.json());
    } finally {
      setLoading(false);
    }
  };

  const loadGaps = async () => {
    const res = await fetch(`${API}/knowledge-gaps`);
    const data = await res.json();
    setGaps(data.gaps || []);
  };

  useEffect(() => {
    loadSubmissions(status);
  }, [status]);

  useEffect(() => {
    loadGaps();
  }, []);

  const review = async (id, decision) => {
    await fetch(`${API}/submissions/${id}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ decision }),
    });
    loadSubmissions(status);
  };

  return (
    <div>
      <section style={sectionStyle}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "baseline", marginBottom: "0.75rem" }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", color: "var(--gold)", fontWeight: 700 }}>A1</span>
          <div>
            <h3 style={{ fontSize: "1.3rem" }}>Verification Queue</h3>
            <p style={{ margin: "0.2rem 0 0", color: "var(--ink-soft)", fontSize: "0.9rem" }}>
              Community submissions awaiting human review — human-in-the-loop AI.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          {["pending", "approved", "rejected", "needs_review"].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              style={{
                padding: "0.4rem 0.9rem",
                borderRadius: 999,
                border: "1px solid #e6d7bd",
                background: status === s ? "var(--maroon)" : "#fff",
                color: status === s ? "#fff" : "var(--ink)",
                fontWeight: 600,
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
            >
              {s.replace("_", " ")}
            </button>
          ))}
        </div>

        {loading && <p style={{ color: "var(--ink-soft)" }}>Loading…</p>}

        {!loading && submissions.length === 0 && (
          <p style={{ color: "var(--ink-soft)" }}>No submissions with status "{status}".</p>
        )}

        {submissions.map((s) => (
          <div key={s.id} style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h4 style={{ margin: 0 }}>{s.entity_name_guess}</h4>
                <p style={{ margin: "0.4rem 0", color: "var(--ink-soft)" }}>{s.content}</p>
                <small style={{ color: "var(--ink-soft)" }}>
                  AI confidence: {(s.ai_confidence ?? 0).toFixed(2)} · Submitted {new Date(s.created_at).toLocaleString()}
                </small>
              </div>
              <span className={`admin-badge-${s.status}`} style={badgeStyle}>{s.status}</span>
            </div>
            {s.status === "pending" && (
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
                <button onClick={() => review(s.id, "approved")} style={approveBtn}>✅ Approve</button>
                <button onClick={() => review(s.id, "needs_review")} style={reviewBtn}>🔍 Needs Review</button>
                <button onClick={() => review(s.id, "rejected")} style={rejectBtn}>❌ Reject</button>
              </div>
            )}
          </div>
        ))}
      </section>

      <section style={sectionStyle}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "baseline", marginBottom: "0.75rem" }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", color: "var(--gold)", fontWeight: 700 }}>A2</span>
          <div>
            <h3 style={{ fontSize: "1.3rem" }}>Knowledge Gaps</h3>
            <p style={{ margin: "0.2rem 0 0", color: "var(--ink-soft)", fontSize: "0.9rem" }}>
              Entities with thin sourcing or sparse graph connections — research candidates.
            </p>
          </div>
        </div>
        {gaps.length === 0 ? (
          <p style={{ color: "var(--ink-soft)" }}>No gaps detected against current thresholds.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {gaps.map((g) => (
              <div key={g.id} style={{ ...cardStyle, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <b>{g.name}</b> <span style={{ color: "var(--ink-soft)" }}>({g.category}, {g.state})</span>
                </div>
                <span style={{ fontSize: "0.8rem", color: "var(--terracotta)", fontWeight: 700 }}>
                  {g.flag.replace("_", " ")} · {g.sources} src, {g.relationships} rel
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
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

const cardStyle = {
  border: "1px solid #e6d7bd",
  borderRadius: 12,
  padding: "0.9rem 1.1rem",
  marginBottom: "0.6rem",
  background: "#fffaf1",
};

const badgeStyle = {
  padding: "0.3rem 0.7rem",
  borderRadius: 999,
  fontSize: "0.75rem",
  fontWeight: 700,
  textTransform: "uppercase",
  flexShrink: 0,
};

const approveBtn = { padding: "0.4rem 0.9rem", borderRadius: 8, border: "none", background: "var(--green)", color: "#fff", fontWeight: 700, cursor: "pointer" };
const reviewBtn = { padding: "0.4rem 0.9rem", borderRadius: 8, border: "none", background: "var(--terracotta)", color: "#fff", fontWeight: 700, cursor: "pointer" };
const rejectBtn = { padding: "0.4rem 0.9rem", borderRadius: 8, border: "none", background: "#a33", color: "#fff", fontWeight: 700, cursor: "pointer" };
