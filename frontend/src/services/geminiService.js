// Dual-Mode AI Oracle Engine: Real-time Gemini API + Deep Archetypal Fallback Engine

const FALLBACK_KNOWLEDGE = {
  devraj: {
    name: "Devraj (North Indian Agro-Community, 1840)",
    role: "Custodian of Solar Transitions & Winter Despair",
    responses: {
      default: "When the golden fields lie empty in November, a cold silence grips the chest. The mind whispers that nothing will ever grow again. But we learned: winter is not dead time, it is the subterranean gestation of the seed. You cannot sprint through winter; you must orient toward the returning sun, share the warm sesame sweets to rekindle the blood, and gather the clan.",
      sun: "The morning sun on Uttarayan carries an ancient warmth. Look directly toward the horizon at dawn. It triggers something deep in the forehead—your modern doctors now call it retinal dopamine. For us, it was the renewal of Surya's covenant with the earth.",
      burnout: "You work without seasons in your glass towers. You expect the harvest in every single month! That is why your spirit withers. Acknowledge the fallow period. Rest is not the absence of labor; it is the ground upon which the next harvest is conceived.",
      family: "When we share Til-Gud, the phrase is 'Til-gud ghya, god god bola'—take this sweet and speak sweetness. It forces us to dissolve old bitterness before the freeze settles."
    }
  },
  anand: {
    name: "Merchant Anand (Silk Route Ujjain, 640 CE)",
    role: "Master of Cyclical Loss & Strategic Letting Go",
    responses: {
      default: "I have seen fortunes turn to dust overnight when bandit hordes raided the caravan routes. Clinging to the ledger of what was lost is a second, heavier tax you pay to grief. The fire of Holika taught us to throw the broken balance sheets into the pyre and begin anew.",
      loss: "Loss is a contraction before an expansion. The trader who cannot let go of a sunk ship will drown trying to salvage wet timber. Cast it into the sacred fire. Free your hands to grasp the next venture.",
      money: "Wealth is called 'Chanchala'—the fluctuating one. Lakshmi does not dwell in closed vaults of terror; she flows where there is clarity, courage, and reciprocal circulation."
    }
  },
  meera: {
    name: "Meera (Mewar Crossroads, 1530)",
    role: "Voice of Radical Authenticity & Unyielding Purpose",
    responses: {
      default: "They built marble walls to contain my destiny and handed me a poison cup of expectations. But when your heart anchors in what is eternal, external judgment loses all its weight. Your purpose is not what others applaud; it is what you cannot help but love.",
      purpose: "Do not ask what the marketplace demands of your soul. Ask what keeps you awake with wonder. When you sing from your own truth, the poison turns into nectar.",
      courage: "Fear comes from believing you belong to the palace guards or social judges. You belong to the infinite. Step out into the courtyard."
    }
  },
  alok: {
    name: "Scholar Alok (Kashi Intellectual Academy, 950 CE)",
    role: "Philosopher of Mental Overwhelm & Single-Point Focus",
    responses: {
      default: "The mind left to itself becomes a venomous serpent eating its own tail. We call this 'Chitta Vritti'—the turbulent whirlpool. On Maha Shivaratri, we sit with an erect spine through the night not to punish the body, but to awaken the steady flame of pure witness consciousness.",
      anxiety: "Anxiety is the intellect attempting to control future probabilities it was never designed to compute. Return to the tactile breath. Light a single oil lamp. Fix your gaze upon the flame (Trataka). Watch how the flickering thoughts subside.",
      focus: "Silence is not empty. It is pregnant with clarity. Cut the constant noise, sit in stillness before the dawn, and let the sediment settle."
    }
  },
  oracle: {
    name: "Wisdom OS Core Oracle",
    role: "Meta-Synthesis Engine (Ancient Technology x Modern Neuroscience)",
    responses: {
      default: "Every cultural ritual you see as 'tradition' was once a high-stakes psychological intervention designed by ancient behavioral architects. They solved social isolation, seasonal depression, cognitive burnout, and grief with synchronized movement, phototherapy, tactile anchors, and communal covenants. What challenge are you ready to solve today?",
      science: "Our mechanisms map directly to modern clinical neurology: Oxytocin cascades from Garba synchrony, Suprachiasmatic nucleus calibration from Chhath solar gazing, and Default Mode Network down-regulation from Maha Shivaratri breathwork.",
      habits: "Start small. A 10-minute daily solo anchor is far more potent than an occasional academic reading. Wisdom is somatic, not conceptual."
    }
  }
};

export async function askElderOracle({ characterId = 'oracle', query = '', apiKey = '' }) {
  const char = FALLBACK_KNOWLEDGE[characterId] || FALLBACK_KNOWLEDGE.oracle;

  if (apiKey && apiKey.trim().length > 10) {
    try {
      const prompt = `You are ${char.name}, a persona in the Festora Wisdom OS. Your role is: ${char.role}.
The user is a modern Gen-Z person struggling with modern life challenges (burnout, isolation, stress, purpose, grief).
Ground your answer in timeless cultural wisdom, somatic practices, and psychological depth. Do NOT give generic shallow advice. Be cinematic, empathetic, grounded, and practical.
User question: "${query}"
Respond in character, 2-4 concise paragraphs with practical depth.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return { text, source: 'gemini-ai' };
      }
    } catch (e) {
      console.warn('Gemini API call failed, using high-fidelity local Oracle engine', e);
    }
  }

  // High-fidelity fallback contextual matching
  const q = query.toLowerCase();
  let matchedKey = 'default';
  if (q.includes('sun') || q.includes('morning') || q.includes('dawn') || q.includes('retin')) matchedKey = 'sun';
  else if (q.includes('burnout') || q.includes('tired') || q.includes('exhaust') || q.includes('rest')) matchedKey = 'burnout';
  else if (q.includes('family') || q.includes('friend') || q.includes('lonel') || q.includes('connect')) matchedKey = 'family';
  else if (q.includes('loss') || q.includes('grief') || q.includes('fail') || q.includes('let go')) matchedKey = 'loss';
  else if (q.includes('money') || q.includes('career') || q.includes('wealth') || q.includes('financ')) matchedKey = 'money';
  else if (q.includes('purpose') || q.includes('mean') || q.includes('direct') || q.includes('future')) matchedKey = 'purpose';
  else if (q.includes('anxiet') || q.includes('panic') || q.includes('overwhelm') || q.includes('fear') || q.includes('stress')) matchedKey = 'anxiety';
  else if (q.includes('focus') || q.includes('mind') || q.includes('meditat') || q.includes('breath')) matchedKey = 'focus';
  else if (q.includes('science') || q.includes('brain') || q.includes('neuro') || q.includes('why')) matchedKey = 'science';

  const text = char.responses[matchedKey] || char.responses.default;
  return {
    text: `${text}`,
    source: 'oracle-engine'
  };
}
