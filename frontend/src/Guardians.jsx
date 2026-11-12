import React from "react";
import { MASCOTS_BY_STATE } from "./Mascots.jsx";

const BLURBS = {
  "Karnataka": "Costumed in the spirit of Yakshagana — dance-drama drawn from Hindu epics.",
  "Kerala": "Channeling Theyyam — ritual dance where performers embody the divine.",
  "Punjab": "Leaping to the beat of Bhangra, Punjab's harvest-festival dance.",
  "Rajasthan": "Desert-born and turbaned, keeper of Rajasthan's folk traditions.",
  "Tamil Nadu": "Poised in Bharatanatyam mudra — one of India's oldest classical dance forms.",
  "West Bengal": "Crowned for Durga Puja, Bengal's grandest festival of the goddess.",
};

export default function Guardians() {
  return (
    <section style={sectionStyle}>
      <h3 style={{ marginBottom: "0.3rem" }}>🛡️ Meet the Cultural Guardians</h3>
      <p style={{ color: "var(--ink-soft)", marginTop: 0 }}>
        Each state's Guardian embodies its living traditions — drawn from Festora's verified knowledge base.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem", marginTop: "1.25rem" }}>
        {Object.keys(MASCOTS_BY_STATE).map((state) => {
          const Mascot = MASCOTS_BY_STATE[state];
          return (
            <div key={state} style={cardStyle}>
              <Mascot size={90} />
              <h4 style={{ margin: "0.6rem 0 0.3rem" }}>{state}</h4>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-soft)", margin: 0 }}>{BLURBS[state]}</p>
            </div>
          );
        })}
      </div>
    </section>
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
  borderRadius: 14,
  padding: "1.2rem",
  background: "#fffaf1",
  textAlign: "center",
};
