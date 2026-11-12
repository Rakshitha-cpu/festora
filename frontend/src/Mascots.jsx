import React from "react";

/**
 * Festora Cultural Guardians — flat, geometric SVG mascots per state.
 * Consistent style: rounded shapes, warm palette matching the app theme,
 * simple enough to render crisply at any size (level tiles, speech bubbles, gallery).
 */

const palette = {
  skin: "#e8b98a",
  skinShadow: "#d9a374",
};

export function KarnatakaMascot({ size = 80 }) {
  // Yakshagana dancer -- tall ornate crown, red/green/gold costume
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="55" r="30" fill="#7a1f2b" />
      {/* crown */}
      <path d="M35 30 L50 5 L65 30 Z" fill="#d4a437" stroke="#b8860b" strokeWidth="1.5" />
      <circle cx="50" cy="12" r="4" fill="#c1622d" />
      <circle cx="38" cy="28" r="3" fill="#c1622d" />
      <circle cx="62" cy="28" r="3" fill="#c1622d" />
      {/* face */}
      <circle cx="50" cy="45" r="14" fill={palette.skin} />
      <circle cx="45" cy="43" r="2" fill="#2b1a12" />
      <circle cx="55" cy="43" r="2" fill="#2b1a12" />
      <path d="M45 50 Q50 54 55 50" stroke="#2b1a12" strokeWidth="1.5" fill="none" />
      {/* face paint */}
      <path d="M38 40 Q35 45 38 50" stroke="#c1622d" strokeWidth="2" fill="none" />
      <path d="M62 40 Q65 45 62 50" stroke="#c1622d" strokeWidth="2" fill="none" />
      {/* body/costume */}
      <path d="M25 65 Q50 55 75 65 L80 95 L20 95 Z" fill="#3f6b4a" />
      <circle cx="50" cy="75" r="6" fill="#d4a437" />
    </svg>
  );
}

export function KeralaMascot({ size = 80 }) {
  // Theyyam -- fiery headdress, painted face
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      {/* fiery headdress fan */}
      <path d="M50 10 L30 35 L70 35 Z" fill="#c1622d" />
      <path d="M50 5 L20 35 L80 35 Z" fill="#d4a437" opacity="0.7" />
      {/* face */}
      <circle cx="50" cy="48" r="15" fill="#a33" />
      <circle cx="44" cy="45" r="2.2" fill="#fff" />
      <circle cx="56" cy="45" r="2.2" fill="#fff" />
      <circle cx="44" cy="45" r="1" fill="#000" />
      <circle cx="56" cy="45" r="1" fill="#000" />
      <path d="M44 55 Q50 58 56 55" stroke="#fff" strokeWidth="1.5" fill="none" />
      {/* body */}
      <path d="M28 65 Q50 58 72 65 L78 95 L22 95 Z" fill="#7a1f2b" />
      <rect x="42" y="68" width="16" height="20" fill="#d4a437" opacity="0.8" />
    </svg>
  );
}

export function PunjabMascot({ size = 80 }) {
  // Bhangra dancer -- turban, mid-leap, dhol
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path d="M32 30 Q50 8 68 30 Q68 40 50 40 Q32 40 32 30 Z" fill="#3f6b4a" />
      <circle cx="50" cy="20" r="3" fill="#d4a437" />
      <circle cx="50" cy="46" r="13" fill={palette.skin} />
      <circle cx="45" cy="44" r="1.8" fill="#2b1a12" />
      <circle cx="55" cy="44" r="1.8" fill="#2b1a12" />
      <path d="M44 51 Q50 55 56 51" stroke="#2b1a12" strokeWidth="1.5" fill="none" />
      {/* arms mid-leap */}
      <path d="M37 63 L20 50" stroke="#c1622d" strokeWidth="7" strokeLinecap="round" />
      <path d="M63 63 L80 50" stroke="#c1622d" strokeWidth="7" strokeLinecap="round" />
      <path d="M30 70 Q50 60 70 70 L75 95 L25 95 Z" fill="#c1622d" />
      {/* dhol drum */}
      <rect x="40" y="76" width="20" height="14" rx="4" fill="#d4a437" stroke="#7a1f2b" strokeWidth="1.5" />
    </svg>
  );
}

export function RajasthanMascot({ size = 80 }) {
  // Turbaned figure with desert colors
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path d="M30 35 Q50 12 70 35 Q72 45 50 45 Q28 45 30 35 Z" fill="#c1622d" />
      <path d="M50 12 L52 5" stroke="#d4a437" strokeWidth="3" strokeLinecap="round" />
      <circle cx="50" cy="50" r="13" fill={palette.skin} />
      <circle cx="45" cy="48" r="1.8" fill="#2b1a12" />
      <circle cx="55" cy="48" r="1.8" fill="#2b1a12" />
      <path d="M42 55 Q50 46 58 55" stroke="#2b1a12" strokeWidth="1.5" fill="none" />
      <path d="M44 58 Q50 61 56 58" stroke="#2b1a12" strokeWidth="1.5" fill="none" />
      <path d="M28 72 Q50 62 72 72 L78 95 L22 95 Z" fill="#d4a437" />
      <path d="M35 75 L65 75" stroke="#7a1f2b" strokeWidth="2" />
      <path d="M35 82 L65 82" stroke="#7a1f2b" strokeWidth="2" />
    </svg>
  );
}

export function TamilNaduMascot({ size = 80 }) {
  // Bharatanatyam classical pose
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path d="M38 20 Q50 8 62 20 L58 30 Q50 26 42 30 Z" fill="#7a1f2b" />
      <circle cx="50" cy="42" r="13" fill={palette.skin} />
      <circle cx="45" cy="40" r="1.8" fill="#2b1a12" />
      <circle cx="55" cy="40" r="1.8" fill="#2b1a12" />
      <path d="M44 47 Q50 50 56 47" stroke="#2b1a12" strokeWidth="1.5" fill="none" />
      <circle cx="50" cy="32" r="2" fill="#c1622d" />
      {/* mudra hands */}
      <path d="M38 58 Q25 55 20 65" stroke={palette.skin} strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M62 58 Q75 55 80 65" stroke={palette.skin} strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M32 62 Q50 55 68 62 L74 95 L26 95 Z" fill="#3f6b4a" />
      <rect x="40" y="66" width="20" height="6" fill="#d4a437" />
    </svg>
  );
}

export function WestBengalMascot({ size = 80 }) {
  // Durga Puja artisan / Durga-inspired crown
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path d="M35 28 L50 6 L65 28 Z" fill="#d4a437" />
      <circle cx="50" cy="10" r="3" fill="#c1622d" />
      <circle cx="50" cy="44" r="13" fill={palette.skin} />
      <circle cx="45" cy="42" r="1.8" fill="#2b1a12" />
      <circle cx="55" cy="42" r="1.8" fill="#2b1a12" />
      <path d="M43 34 Q50 30 57 34" stroke="#a33" strokeWidth="2" fill="none" />
      <path d="M44 50 Q50 53 56 50" stroke="#2b1a12" strokeWidth="1.5" fill="none" />
      <path d="M30 64 Q50 56 70 64 L76 95 L24 95 Z" fill="#a33" />
      <rect x="38" y="68" width="24" height="4" fill="#d4a437" />
      <rect x="38" y="76" width="24" height="4" fill="#d4a437" />
    </svg>
  );
}

export function DefaultMascot({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="35" fill="#d4a437" opacity="0.3" />
      <text x="50" y="60" fontSize="34" textAnchor="middle">🪔</text>
    </svg>
  );
}

export const MASCOTS_BY_STATE = {
  "Karnataka": KarnatakaMascot,
  "Kerala": KeralaMascot,
  "Punjab": PunjabMascot,
  "Rajasthan": RajasthanMascot,
  "Tamil Nadu": TamilNaduMascot,
  "West Bengal": WestBengalMascot,
};

export function StateMascot({ state, size = 80 }) {
  const Component = MASCOTS_BY_STATE[state] || DefaultMascot;
  return <Component size={size} />;
}
