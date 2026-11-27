/* ===== FESTORA INTERACTIVE ANIMATED CARTOON FAMILY THEATRE (v3: Clean Illustrated SVG Stage + Solid High-Contrast UI) ===== */
(function () {
  'use strict';

  const LANG_PACKS = {
    'kn-IN': {
      label: 'ಕನ್ನಡ',
      father: (f) => `${f} ಹಬ್ಬದ ಶುಭಾಶಯಗಳು! ಬನ್ನಿ, ದೀಪ ಹಚ್ಚಿ ಪೂಜೆ ಪ್ರಾರಂಭಿಸೋಣ.`,
      sister: (f) => `${f} ಹಬ್ಬಕ್ಕಾಗಿ ಹೂವಿನ ಹಾರ ಮತ್ತು ರಂಗೋಲಿ ಸಿದ್ಧವಾಗಿದೆ!`,
      brother: (f) => `ನಾನು ಗಂಟೆ ಬಾರಿಸುತ್ತಿದ್ದೇನೆ! ಎಲ್ಲರಿಗೂ ${f} ಹಬ್ಬದ ಹಾರ್ದಿಕ ಶುಭಾಶಯಗಳು!`,
      motherDefault: 'ಭಾಗ್ಯದ ಲಕ್ಷ್ಮಿ ಬಾರಮ್ಮ, ನಮ್ಮಮ್ಮ ನೀ ಸೌಭಾಗ್ಯದ ಲಕ್ಷ್ಮಿ ಬಾರಮ್ಮ!',
      motherMeaning: 'Welcome, O Goddess of Fortune, bless our home with joy and harmony!',
      byId: {
        varamahalakshmi: ['ಭಾಗ್ಯದ ಲಕ್ಷ್ಮಿ ಬಾರಮ್ಮ, ನಮ್ಮಮ್ಮ ನೀ ಸೌಭಾಗ್ಯದ ಲಕ್ಷ್ಮಿ ಬಾರಮ್ಮ!', 'Come Goddess Varamahalakshmi, bring grace and prosperity to our home!'],
        gowrihabba: ['ಬನ್ನಿ ತಾಯಿ ಗೌರಮ್ಮ, ಬಾಗಿನ ಸ್ವೀಕರಿಸಿ ಹರಸಮ್ಮ!', 'Welcome Mother Swarna Gowri, accept our Bagina and bless our family!'],
        yugadi: ['ಯುಗ ಯುಗಾದಿ ಕಳೆದರೂ, ಯುಗಾದಿ ಮರಳಿ ಬರುತಿದೆ — ಹೊಸ ವರುಷದ ಶುಭಾಶಯ!', 'As ages pass, Yugadi returns anew — wishing everyone a joyful New Year!'],
        makarsankranti_ka: ['ಎಳ್ಳು ಬೆಲ್ಲ ತಿಂದು ಒಳ್ಳೆ ಮಾತಾಡಿ, ಸುಗ್ಗಿ ಹಬ್ಬದ ಹಾರ್ದಿಕ ಶುಭಾಶಯ!', 'Eat sesame and jaggery, speak sweet words — happy Suggi Sankranti!'],
        hampi: ['ವಿಜಯನಗರದ ವೈಭವ ಹಂಪಿ ಉತ್ಸವ, ನಾಡಿನ ಕಲೆ ಸಂಸ್ಕೃತಿಯ ಸಂಭ್ರಮ!', 'Celebrate the glorious art and heritage of Vijayanagara at Hampi Utsav!'],
        dasara: ['ನಾಡಹಬ್ಬ ಮೈಸೂರು ದಸರಾ, ಚಾಮುಂಡೇಶ್ವರಿ ತಾಯಿಯ ದಿವ್ಯ ಕರುಣೆ!', 'Joyous Mysore Dasara — may Goddess Chamundeshwari bless us all!']
      }
    },
    'hi-IN': {
      label: 'हिन्दी',
      father: (f) => `सभी को ${f} की हार्दिक शुभकामनाएँ! आइए दीप जलाकर पूजा आरंभ करें।`,
      sister: (f) => `देखिए, ${f} के लिए फूलों की माला और सुंदर रंगोली तैयार है!`,
      brother: (f) => `मैं मंदिर की घंटी बजा रहा हूँ! ${f} की बहुत-बहुत बधाई!`,
      motherDefault: 'आया शुभ त्योहार सखी री, दीप जलाओ मंगल गाओ!',
      motherMeaning: 'The auspicious festival is here — light the lamps and sing songs of joy!'
    },
    'ta-IN': {
      label: 'தமிழ்',
      father: (f) => `அனைவருக்கும் ${f} நல்வாழ்த்துக்கள்! விளக்கேற்றி வழிபாட்டைத் தொடங்குவோம்.`,
      sister: (f) => `${f} பண்டிகைக்காக பூமாலை மற்றும் கோலம் தயாராக உள்ளது!`,
      brother: (f) => `நான் கோவில் மணி அடிக்கிறேன்! இனிய ${f} நல்வாழ்த்துக்கள்!`,
      motherDefault: 'பொங்கலோ பொங்கல்! தை பிறந்தால் வழி பிறக்கும்!',
      motherMeaning: 'With the auspicious dawn, new paths of joy and prosperity open!'
    },
    'te-IN': {
      label: 'తెలుగు',
      father: (f) => `అందరికీ ${f} శుభాకాంక్షలు! దీపం వెలిగించి పూజ ప్రారంభిద్దాం.`,
      sister: (f) => `${f} వేడుకల కోసం పూల దండలు మరియు ముగ్గు సిద్ధంగా ఉన్నాయి!`,
      brother: (f) => `నేను గుడి గంట మోగిస్తున్నాను! అందరికీ ${f} శుభాకాంక్షలు!`,
      motherDefault: 'బతుకమ్మ బతుకమ్మ ఉయ్యాలో, బంగారు గౌరమ్మ ఉయ్యాలో!',
      motherMeaning: 'Sing and celebrate together in harmony and joy!'
    },
    'ml-IN': {
      label: 'മലയാളം',
      father: (f) => `എല്ലാവർക്കും ${f} ആശംസകൾ! വിളക്ക് തെളിയിച്ച് പ്രാർത്ഥിക്കാം.`,
      sister: (f) => `${f} ആഘോഷത്തിനായി പൂക്കളവും മാലകളും ഒരുങ്ങിയിരിക്കുന്നു!`,
      brother: (f) => `ഞാൻ മണി മുഴക്കുകയാണ്! സന്തോഷകരമായ ${f} ആശംസകൾ!`,
      motherDefault: 'മാവേലി നാടു വാണീടും കാലം, മാനുഷരെല്ലാരുമൊന്നുപോലെ!',
      motherMeaning: 'In the golden era of unity, all people lived as equals in harmony!'
    },
    'en-IN': {
      label: 'English',
      father: (f, r) => `Happy ${f}! Let us light the sacred brass lamp and begin ${r} together.`,
      sister: (f) => `Look at the fresh ${f} flower garlands and rangoli! Come help me decorate!`,
      brother: (f) => `I am ringing the temple bell and cheering! Happy ${f} to everyone!`,
      motherDefault: 'Sing together in joy and gratitude as our home shines with festive light!',
      motherMeaning: 'A joyful song celebrating family togetherness and cultural heritage!'
    }
  };

  function resolveAutoLang(g) {
    const st = (g && g.state) || '';
    if (st === 'Karnataka') return 'kn-IN';
    if (st === 'Tamil Nadu') return 'ta-IN';
    if (st === 'Kerala') return 'ml-IN';
    if (st === 'Telangana' || st === 'Andhra Pradesh') return 'te-IN';
    return 'hi-IN';
  }

  // Pre-warm speechSynthesis voices (Chrome/Edge load voices asynchronously)
  try {
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      if (typeof window.speechSynthesis.addEventListener === 'function') {
        window.speechSynthesis.addEventListener('voiceschanged', function () {
          try { window.speechSynthesis.getVoices(); } catch (e) {}
        });
      }
    }
  } catch (e) {}

  function getVoicesForLang(lang) {
    try {
      const voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
      if (!voices || !voices.length) return { all: [], matched: [] };
      const langBase = (lang || 'en-IN').split('-')[0].toLowerCase();
      const matched = voices.filter(v => v.lang && v.lang.toLowerCase().split(/[-_]/)[0] === langBase);
      return { all: voices, matched };
    } catch (e) {
      return { all: [], matched: [] };
    }
  }

  function pickVoice(lang, gender) {
    try {
      const { matched } = getVoicesForLang(lang);
      if (!matched.length) return null;
      const femHints = /female|woman|veena|lekha|neerja|swara|heera|priya|kalpana|kanya|zira|samantha|victoria|karen|susan|aria|jenny|vani|shruti|sapna|meera|aditi|raveena/i;
      const maleHints = /male|man|rishi|prabhat|madhur|hemant|ravi|david|daniel|alex|mark|guy|george|arjun|vikram|kiran|rohan|amit/i;

      if (gender === 'female') {
        return matched.find(v => femHints.test(v.name)) || matched.find(v => !maleHints.test(v.name)) || matched[0];
      }
      return matched.find(v => maleHints.test(v.name) && !femHints.test(v.name)) || matched.find(v => !femHints.test(v.name)) || matched[0];
    } catch (e) {
      return null;
    }
  }

  let famAudioCtx = null;
  let activeOscs = [];

  function stopFilmMelody() {
    activeOscs.forEach(o => { try { o.stop(); o.disconnect(); } catch (e) {} });
    activeOscs = [];
  }

  function playFilmSongMelody() {
    stopFilmMelody();
    try {
      famAudioCtx = famAudioCtx || new (window.AudioContext || window.webkitAudioContext)();
      if (famAudioCtx.state === 'suspended') famAudioCtx.resume();
      const now = famAudioCtx.currentTime;

      [130.81, 196.00].forEach(df => {
        const dOsc = famAudioCtx.createOscillator();
        const dGain = famAudioCtx.createGain();
        dOsc.type = 'sine';
        dOsc.frequency.value = df;
        dGain.gain.setValueAtTime(0.001, now);
        dGain.gain.linearRampToValueAtTime(0.032, now + 0.3);
        dGain.gain.linearRampToValueAtTime(0.001, now + 4.4);
        dOsc.connect(dGain); dGain.connect(famAudioCtx.destination);
        dOsc.start(now); dOsc.stop(now + 4.45);
        activeOscs.push(dOsc);
      });

      const melody = [
        [261.63, 0.00, 0.35], [293.66, 0.35, 0.30], [329.63, 0.65, 0.45],
        [392.00, 1.10, 0.35], [440.00, 1.45, 0.40], [523.25, 1.85, 0.55],
        [440.00, 2.40, 0.32], [392.00, 2.72, 0.38], [329.63, 3.10, 0.35],
        [293.66, 3.45, 0.30], [261.63, 3.75, 0.65]
      ];
      melody.forEach(([freq, offset, dur]) => {
        const osc = famAudioCtx.createOscillator();
        const gain = famAudioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + offset);
        osc.frequency.linearRampToValueAtTime(freq * 1.012, now + offset + dur * 0.5);
        osc.frequency.linearRampToValueAtTime(freq, now + offset + dur);
        gain.gain.setValueAtTime(0.001, now + offset);
        gain.gain.linearRampToValueAtTime(0.085, now + offset + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + dur);
        osc.connect(gain); gain.connect(famAudioCtx.destination);
        osc.start(now + offset); osc.stop(now + offset + dur + 0.02);
        activeOscs.push(osc);
      });
    } catch (e) {}
  }

  function injectStageStyles() {
    if (document.getElementById('fam-stage-css')) return;
    const st = document.createElement('style');
    st.id = 'fam-stage-css';
    st.textContent = `
      @keyframes famIdle { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
      @keyframes famSpeak { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-7px) scale(1.03)} }
      @keyframes famSing { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-8px) rotate(2deg)} }
      @keyframes famMouth { 0%,100%{ry:1.6} 50%{ry:4.6} }
      @keyframes famWave { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-12deg)} }
      @keyframes famNote { 0%{opacity:0;transform:translateY(6px) scale(0.8)} 25%{opacity:1} 100%{opacity:0;transform:translateY(-30px) scale(1.1)} }
      @keyframes famBlink { 0%,92%,100%{transform:scaleY(1)} 96%{transform:scaleY(0.12)} }
      @keyframes famWalkInLeft { 0%{opacity:0;transform:translateX(-90px) translateY(0) scale(0.88)} 25%{opacity:1;transform:translateX(-58px) translateY(-8px) scale(0.93)} 55%{opacity:1;transform:translateX(-26px) translateY(0) scale(0.97)} 80%{opacity:1;transform:translateX(-8px) translateY(-5px) scale(0.99)} 100%{opacity:1;transform:translateX(0) translateY(0) scale(1)} }
      @keyframes famWalkInRight { 0%{opacity:0;transform:translateX(90px) translateY(0) scale(0.88)} 25%{opacity:1;transform:translateX(58px) translateY(-8px) scale(0.93)} 55%{opacity:1;transform:translateX(26px) translateY(0) scale(0.97)} 80%{opacity:1;transform:translateX(8px) translateY(-5px) scale(0.99)} 100%{opacity:1;transform:translateX(0) translateY(0) scale(1)} }
      .fam-char-slot.is-hidden { display:none; }
      .fam-char-slot.is-entering-left { animation:famWalkInLeft .85s ease-out both; }
      .fam-char-slot.is-entering-right { animation:famWalkInRight .85s ease-out both; }
      .fam-char-slot { position:relative; display:flex; flex-direction:column; align-items:center; background:transparent; border:none; padding:6px 4px; cursor:pointer; flex:1 1 130px; max-width:165px; transition:transform .2s ease; }
      .fam-char-slot:hover { transform:translateY(-2px); }
      .fam-avatar-wrap { position:relative; width:104px; height:128px; display:flex; align-items:center; justify-content:center; animation:famIdle 3.2s ease-in-out infinite; }
      .fam-char-slot.is-speaking .fam-avatar-wrap { animation:famSpeak .55s ease-in-out infinite; }
      .fam-char-slot.is-singing .fam-avatar-wrap { animation:famSing .75s ease-in-out infinite; }
      .fam-eye-grp { transform-box:fill-box; transform-origin:center; animation:famBlink 4.2s infinite; }
      .fam-mouth { transition:ry .12s; }
      .fam-char-slot.is-speaking .fam-mouth,
      .fam-char-slot.is-singing .fam-mouth { animation:famMouth .28s ease-in-out infinite; }
      .fam-arm-prop { transform-box:fill-box; transform-origin:10% 30%; }
      .fam-char-slot.is-speaking .fam-arm-prop,
      .fam-char-slot.is-singing .fam-arm-prop { animation:famWave .45s ease-in-out infinite; }
      .fam-notes { position:absolute; top:-6px; right:4px; font-size:18px; pointer-events:none; display:none; }
      .fam-char-slot.is-singing .fam-notes { display:block; animation:famNote 1.3s ease-out infinite; }
      .fam-shadow { width:64px; height:10px; border-radius:50%; background:rgba(120,53,15,0.22); margin-top:-6px; transition:all .2s; }
      .fam-char-slot.is-active .fam-shadow { background:rgba(217,119,6,0.45); width:74px; }
    `;
    document.head.appendChild(st);
  }

  function buildCharSVG(ch) {
    const propEmoji = ch.prop === 'diya' ? '🪔' : (ch.prop === 'platter' ? '🍛' : (ch.prop === 'flowers' ? '🌺' : '🔔'));
    const isFem = ch.gender === 'female';
    const hairBack = isFem
      ? `<circle cx="50" cy="40" r="23" fill="${ch.hair}"/><circle cx="68" cy="44" r="6" fill="#fef9c3" stroke="#eab308" stroke-width="1"/>`
      : `<path d="M29,38 C29,17 71,17 71,38 Z" fill="${ch.hair}"/>`;

    const outfitSvg = isFem
      ? `<path d="M32,62 L68,62 L78,118 L22,118 Z" fill="${ch.outfit}" stroke="${ch.trim}" stroke-width="2.5"/>
         <path d="M34,62 L66,116 L54,118 L28,68 Z" fill="${ch.trim}" opacity="0.9"/>
         <line x1="25" y1="112" x2="75" y2="112" stroke="${ch.trim}" stroke-width="3"/>`
      : `<rect x="30" y="62" width="40" height="54" rx="10" fill="${ch.outfit}" stroke="${ch.trim}" stroke-width="2"/>
         <path d="M35,62 L44,62 L44,104 L35,104 Z" fill="${ch.trim}" opacity="0.88"/>
         <line x1="50" y1="62" x2="50" y2="82" stroke="${ch.trim}" stroke-width="2"/>`;

    const faceExtra = ch.id === 'father'
      ? `<path d="M41,47 Q50,43 59,47" stroke="#1f2937" stroke-width="2.8" fill="none" stroke-linecap="round"/>`
      : (ch.id === 'mother'
        ? `<circle cx="50" cy="34" r="2.6" fill="#dc2626"/>`
        : (ch.id === 'sister' ? `<circle cx="50" cy="34" r="2" fill="#dc2626"/>` : ''));

    return `
      <svg viewBox="0 0 104 128" width="104" height="128" aria-hidden="true">
        ${hairBack}
        ${outfitSvg}
        <line x1="31" y1="70" x2="17" y2="88" stroke="${ch.skin}" stroke-width="7" stroke-linecap="round"/>
        <g class="fam-arm-prop">
          <line x1="69" y1="70" x2="86" y2="84" stroke="${ch.skin}" stroke-width="7" stroke-linecap="round"/>
          <text x="86" y="84" font-size="20" text-anchor="middle" dominant-baseline="central">${propEmoji}</text>
        </g>
        <circle cx="50" cy="40" r="20" fill="${ch.skin}" stroke="#b45309" stroke-width="0.8"/>
        ${isFem ? `<path d="M30,36 C32,20 68,20 70,36 C62,28 38,28 30,36 Z" fill="${ch.hair}"/>` : `<path d="M30,35 C30,19 70,19 70,35 C61,27 39,27 30,35 Z" fill="${ch.hair}"/>`}
        <g class="fam-eye-grp">
          <circle cx="43" cy="39" r="2.6" fill="#111827"/>
          <circle cx="57" cy="39" r="2.6" fill="#111827"/>
        </g>
        ${faceExtra}
        <ellipse class="fam-mouth" cx="50" cy="50" rx="5" ry="1.8" fill="#7f1d1d"/>
      </svg>
    `;
  }

  let activeCleanup = null;
  function stopAllAudio(state) {
    stopFilmMelody();
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {}
    if (state) {
      state.isPlaying = false;
      state.singing = false;
      if (state.skitTimer) { clearTimeout(state.skitTimer); state.skitTimer = null; }
      if (state.endTimer) { clearTimeout(state.endTimer); state.endTimer = null; }
    }
  }

  function stopStage() {
    if (activeCleanup) { try { activeCleanup(); } catch (e) {} activeCleanup = null; }
    stopAllAudio(null);
  }

  window.renderFestivalFamily = function () {
    stopStage();
    injectStageStyles();

    const fid = window.cur || 'ganesh';
    const g = (window.G$ && window.G$[fid]) || (window.FEST && window.FEST.find(x => x.id === fid)) || { name: 'Festival', state: 'India', e: '🪔' };
    const ritual = (g.rituals && g.rituals[0]) ? (g.rituals[0].title || g.rituals[0][1] || 'Sacred Aarti') : 'Sacred Aarti';

    window.S = window.S || {};
    window.S.fam = window.S.fam || { father: false, mother: false, sister: false, brother: false };
    window._famLang = window._famLang || 'auto';

    function getPackAndLines() {
      const langCode = (window._famLang && window._famLang !== 'auto') ? window._famLang : resolveAutoLang(g);
      const pack = LANG_PACKS[langCode] || LANG_PACKS['hi-IN'];
      const enPack = LANG_PACKS['en-IN'];
      const songTuple = (pack.byId && pack.byId[fid]) ? pack.byId[fid] : [pack.motherDefault, pack.motherMeaning];
      return {
        langCode,
        label: pack.label,
        lines: {
          father: { text: pack.father(g.name, ritual), en: enPack.father(g.name, ritual), gender: 'male', pitch: 0.78 },
          mother: { text: songTuple[0], en: songTuple[1], gender: 'female', pitch: 1.28, isSinger: true },
          sister: { text: pack.sister(g.name), en: enPack.sister(g.name), gender: 'female', pitch: 1.32 },
          brother: { text: pack.brother(g.name), en: enPack.brother(g.name), gender: 'male', pitch: 0.96 }
        }
      };
    }

    const state = {
      activeId: 'father',
      isPlaying: false,
      singing: false,
      skitTimer: null,
      endTimer: null,
      entered: { father: true, mother: false, sister: false, brother: false },
      justEntered: 'father',
      chars: [
        { id: 'father', name: 'Father', role: 'Lamp & Prayers', skin: '#d99b66', outfit: '#f59e0b', trim: '#991b1b', hair: '#1f2937', prop: 'diya', gender: 'male' },
        { id: 'mother', name: 'Mother', role: 'Sings & Serves', skin: '#e0a978', outfit: '#be185d', trim: '#fbbf24', hair: '#111827', prop: 'platter', gender: 'female', isSinger: true },
        { id: 'sister', name: 'Sister', role: 'Flowers & Decor', skin: '#e5b283', outfit: '#059669', trim: '#f59e0b', hair: '#1f2937', prop: 'flowers', gender: 'female' },
        { id: 'brother', name: 'Brother', role: 'Bell & Joy', skin: '#d99b66', outfit: '#2563eb', trim: '#fbbf24', hair: '#1f2937', prop: 'bell', gender: 'male' }
      ]
    };

    function syncStageUI() {
      const done = state.chars.filter(c => window.S.fam[c.id]).length;
      const pill = document.getElementById('fam-unity-pill');
      if (pill) pill.textContent = `Unity: ${done}/4`;

      const skitBtn = document.getElementById('fam-skit-btn');
      if (skitBtn) {
        const skitRunning = !!(state.isPlaying && state.skitTimer);
        skitBtn.textContent = skitRunning ? '⏹ Stop Skit' : '▶ Play Family Skit';
        skitBtn.style.background = skitRunning ? '#dc2626' : '#b45309';
      }

      const playBtn = document.getElementById('fam-playstop-btn');
      if (playBtn) {
        playBtn.textContent = state.isPlaying ? '⏹ Stop' : '▶ Play';
        playBtn.style.background = state.isPlaying ? '#dc2626' : '#d97706';
      }

      state.chars.forEach((c, idx) => {
        const slot = document.getElementById('fam-slot-' + c.id);
        const tag = document.getElementById('fam-tag-' + c.id);
        const cue = document.getElementById('fam-cue-' + c.id);
        const isAct = state.activeId === c.id;
        const isSpk = isAct && state.isPlaying;
        const isDone = !!window.S.fam[c.id];
        const isVisible = !!state.entered[c.id];
        if (slot) {
          slot.classList.toggle('is-hidden', !isVisible);
          slot.classList.toggle('is-active', isAct);
          slot.classList.toggle('is-speaking', isSpk && !c.isSinger);
          slot.classList.toggle('is-singing', isSpk && !!c.isSinger);
          if (state.justEntered === c.id) {
            slot.classList.remove('is-entering-left', 'is-entering-right');
            void slot.offsetWidth;
            slot.classList.add(idx < 2 ? 'is-entering-left' : 'is-entering-right');
          }
        }
        if (cue) {
          cue.style.background = isAct ? '#b45309' : (isVisible ? '#fef3c7' : '#ffffff');
          cue.style.color = isAct ? '#ffffff' : '#78350f';
          cue.style.borderColor = isAct ? '#92400e' : '#d97706';
        }
        if (tag) {
          tag.style.background = isAct ? '#b45309' : '#ffffff';
          tag.style.color = isAct ? '#ffffff' : '#3b2314';
          tag.style.borderColor = isAct ? '#92400e' : (isDone ? '#16a34a' : '#d97706');
          tag.innerHTML = `${c.isSinger ? '🎵 ' : ''}${c.name}${isDone ? ' <span style="color:' + (isAct ? '#fde68a' : '#15803d') + ';">✓</span>' : ''}`;
        }
      });
    }

    function speakWithGender(text, enFallback, label, langCode, gender, pitch, durationMs) {
      try {
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
          const { all, matched } = getVoicesForLang(langCode);
          const useFallback = (langCode !== 'en-IN' && all.length > 0 && matched.length === 0);
          const speakLang = useFallback ? 'en-IN' : langCode;
          const speakText = useFallback ? (enFallback || text) : text;

          const noteEl = document.getElementById('fam-voice-note');
          if (noteEl) {
            noteEl.textContent = useFallback ? `ℹ️ Your browser has no ${label} TTS voice installed — playing English audio.` : '';
            noteEl.style.display = useFallback ? 'block' : 'none';
          }

          const u = new SpeechSynthesisUtterance(speakText);
          u.lang = speakLang;
          const v = pickVoice(speakLang, gender);
          if (v) u.voice = v;
          u.rate = gender === 'female' && state.singing ? 0.84 : 0.94;
          u.pitch = pitch;
          const finish = () => {
            if (!state.skitTimer) {
              state.isPlaying = false;
              state.singing = false;
              syncStageUI();
            }
          };
          u.onend = finish;
          u.onerror = () => {
            if (!useFallback && enFallback && langCode !== 'en-IN') {
              speakWithGender(enFallback, enFallback, label, 'en-IN', gender, pitch, durationMs);
            } else {
              finish();
            }
          };
          window.speechSynthesis.speak(u);
        }
      } catch (e) {}
      state.endTimer = setTimeout(() => {
        if (!state.skitTimer) {
          state.isPlaying = false;
          state.singing = false;
          syncStageUI();
        }
      }, durationMs);
    }

    function updateDialogueBox(ch, lineObj, packInfo) {
      const box = document.getElementById('fam-dialogue-box');
      if (!box) return;
      const voiceTag = ch.gender === 'female' ? '👩 Lady Voice' : '👨 Gent Voice';
      const idx = state.chars.findIndex(c => c.id === ch.id);
      const nextCh = state.chars[(idx + 1) % state.chars.length];
      box.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <span style="font-weight:800;font-size:1rem;color:#92400e;">${ch.isSinger ? '🎵 ' : '💬 '}${ch.name}</span>
            <span style="font-size:0.8rem;font-weight:600;color:#78350f;background:#fef3c7;padding:2px 9px;border-radius:999px;border:1px solid #f59e0b;">${ch.role} · ${packInfo.label} · ${voiceTag}</span>
          </div>
          <div style="display:flex;align-items:center;gap:6px;">
            <button type="button" id="fam-playstop-btn" onclick="window._famStage.togglePlayStop()" style="padding:5px 14px;border-radius:999px;border:none;background:${state.isPlaying ? '#dc2626' : '#d97706'};color:#ffffff;font-size:0.82rem;font-weight:800;cursor:pointer;">${state.isPlaying ? '⏹ Stop' : '▶ Play'}</button>
            <button type="button" onclick="window._famStage.select('${nextCh.id}')" style="padding:5px 12px;border-radius:999px;border:1.5px solid #d97706;background:#fffbeb;color:#92400e;font-size:0.8rem;font-weight:800;cursor:pointer;">Next: ${nextCh.name} →</button>
          </div>
        </div>
        <div style="margin-top:10px;font-size:1.08rem;line-height:1.55;font-weight:600;color:#1c1917;">“${lineObj.text}”</div>
        ${packInfo.langCode !== 'en-IN' ? `<div style="margin-top:6px;font-size:0.86rem;color:#92400e;font-style:italic;">English: ${lineObj.en}</div>` : ''}
        <div id="fam-voice-note" style="display:none;margin-top:4px;font-size:0.76rem;color:#b45309;font-weight:600;"></div>
      `;
    }

    function triggerCharacter(cid, playAudio, allowToggleStop) {
      const ch = state.chars.find(c => c.id === cid) || state.chars[0];
      if (allowToggleStop && state.isPlaying && state.activeId === ch.id) {
        stopAllAudio(state);
        syncStageUI();
        return;
      }

      stopAllAudio(state);
      state.activeId = ch.id;
      state.justEntered = !state.entered[ch.id] ? ch.id : null;
      state.entered[ch.id] = true;
      const packInfo = getPackAndLines();
      const lineObj = packInfo.lines[ch.id];

      if (!window.S.fam[ch.id]) {
        window.S.fam[ch.id] = true;
        if (typeof window.addCoins === 'function') window.addCoins(25, ch.name + ' Family Role');
        if (typeof window.saveProgress === 'function') window.saveProgress();
      }

      if (playAudio) {
        state.isPlaying = true;
        state.singing = !!ch.isSinger;
        if (ch.isSinger) playFilmSongMelody();
        speakWithGender(lineObj.text, lineObj.en, packInfo.label, packInfo.langCode, lineObj.gender, lineObj.pitch, ch.isSinger ? 4600 : 4000);
      }

      updateDialogueBox(ch, lineObj, packInfo);
      syncStageUI();
      state.justEntered = null;
    }

    window._famStage = {
      select: (cid) => triggerCharacter(cid, true, true),
      sing: () => triggerCharacter('mother', true, true),
      togglePlayStop: () => {
        if (state.isPlaying) {
          stopAllAudio(state);
          syncStageUI();
        } else {
          triggerCharacter(state.activeId || 'mother', true, false);
        }
      },
      setLang: (val) => {
        window._famLang = val || 'auto';
        triggerCharacter(state.activeId || 'mother', false, false);
      },
      playSkit: () => {
        if (state.isPlaying && state.skitTimer) {
          stopAllAudio(state);
          syncStageUI();
          return;
        }
        stopAllAudio(state);
        state.entered = { father: false, mother: false, sister: false, brother: false };
        syncStageUI();
        const order = ['father', 'mother', 'sister', 'brother'];
        let step = 0;
        function next() {
          if (!document.getElementById('fam-stage-wrap')) return;
          const isLast = step === order.length - 1;
          if (!isLast) {
            state.skitTimer = setTimeout(() => {
              step++;
              next();
            }, 4300);
          } else {
            state.skitTimer = null;
          }
          triggerCharacter(order[step], true, false);
        }
        next();
      }
    };

    activeCleanup = () => { stopAllAudio(state); };
    setTimeout(() => { state.entered.father = false; triggerCharacter('father', false, false); }, 20);

    const doneCount = ['father', 'mother', 'sister', 'brother'].filter(k => window.S.fam[k]).length;
    const toranDots = Array.from({ length: 17 }, (_, i) =>
      `<span style="width:12px;height:12px;border-radius:50%;background:${i % 2 === 0 ? '#16a34a' : '#f59e0b'};display:inline-block;box-shadow:0 2px 4px rgba(0,0,0,0.15);"></span>`
    ).join('');

    return `
      <div style="max-width:880px;margin:0 auto;padding-bottom:28px;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
          <div>
            <h2 style="margin:0;color:var(--ink);">👨‍👩‍👧‍👦 ${g.name} Family Theatre</h2>
            <small style="color:var(--mut);">Tap any family member to listen — tap again to stop.</small>
          </div>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
            <select id="fam-lang-sel" aria-label="Family Dialogue Language" onchange="window._famStage.setLang(this.value)" style="background:#ffffff;color:#1c1917;border:1.5px solid #d97706;border-radius:10px;padding:6px 10px;font-size:0.8rem;font-weight:700;cursor:pointer;">
              <option value="auto" ${window._famLang === 'auto' ? 'selected' : ''}>🌐 Native (Auto)</option>
              <option value="en-IN" ${window._famLang === 'en-IN' ? 'selected' : ''}>English</option>
              <option value="kn-IN" ${window._famLang === 'kn-IN' ? 'selected' : ''}>ಕನ್ನಡ (Kannada)</option>
              <option value="hi-IN" ${window._famLang === 'hi-IN' ? 'selected' : ''}>हिन्दी (Hindi)</option>
              <option value="ta-IN" ${window._famLang === 'ta-IN' ? 'selected' : ''}>தமிழ் (Tamil)</option>
              <option value="te-IN" ${window._famLang === 'te-IN' ? 'selected' : ''}>తెలుగు (Telugu)</option>
              <option value="ml-IN" ${window._famLang === 'ml-IN' ? 'selected' : ''}>മലയാളം (Malayalam)</option>
            </select>
            <span id="fam-unity-pill" style="background:#fef3c7;color:#92400e;border:1.5px solid #f59e0b;font-weight:800;padding:5px 12px;border-radius:999px;font-size:0.8rem;">Unity: ${doneCount}/4</span>
            <button type="button" id="fam-skit-btn" onclick="window._famStage.playSkit()" style="padding:7px 14px;border-radius:999px;border:none;background:#b45309;color:#ffffff;font-weight:800;font-size:0.84rem;cursor:pointer;">▶ Play Family Skit</button>
          </div>
        </div>

        <div id="fam-stage-wrap" style="position:relative;border-radius:20px;border:2px solid #d97706;background:linear-gradient(180deg,#fffbeb 0%,#fef3c7 58%,#f5d09b 100%);overflow:hidden;box-shadow:0 10px 28px rgba(146,64,14,0.14);padding:12px 12px 18px;">
          <div style="display:flex;justify-content:space-around;align-items:center;margin-bottom:8px;opacity:0.9;">${toranDots}</div>
          <div style="text-align:center;margin-bottom:6px;">
            <span style="display:inline-flex;align-items:center;gap:6px;background:#ffffff;color:#92400e;border:1.5px solid #f59e0b;border-radius:999px;padding:3px 14px;font-weight:800;font-size:0.84rem;box-shadow:0 2px 6px rgba(146,64,14,0.1);">${g.e || '🪔'} ${g.name} Home Courtyard</span>
          </div>
          <div style="display:flex;justify-content:space-around;align-items:flex-end;flex-wrap:wrap;gap:8px;position:relative;z-index:2;padding-top:6px;">
            ${state.chars.map(c => `
              <button type="button" id="fam-slot-${c.id}" class="fam-char-slot ${c.id === 'father' ? '' : 'is-hidden'}" onclick="window._famStage.select('${c.id}')">
                <div class="fam-avatar-wrap">
                  <div class="fam-notes">🎵 🎶</div>
                  ${buildCharSVG(c)}
                </div>
                <div class="fam-shadow"></div>
                <span id="fam-tag-${c.id}" style="margin-top:8px;padding:3px 12px;border-radius:999px;border:1.5px solid #d97706;background:#ffffff;color:#3b2314;font-weight:800;font-size:0.84rem;box-shadow:0 2px 6px rgba(0,0,0,0.08);">${c.isSinger ? '🎵 ' : ''}${c.name}</span>
                <span style="margin-top:3px;font-size:0.74rem;font-weight:700;color:#78350f;">${c.role}</span>
              </button>
            `).join('')}
          </div>
          <div style="position:absolute;left:0;right:0;bottom:0;height:66px;background:linear-gradient(180deg,#e6b87d,#cfa062);border-top:2px solid #d97706;z-index:1;"></div>
        </div>

        <div style="display:flex;align-items:center;justify-content:center;gap:6px;flex-wrap:wrap;margin-top:10px;">
          <span style="font-size:0.78rem;font-weight:700;color:#78350f;">Summon:</span>
          ${state.chars.map(c => `<button type="button" id="fam-cue-${c.id}" onclick="window._famStage.select('${c.id}')" style="padding:4px 11px;border-radius:999px;border:1.5px solid #d97706;background:#ffffff;color:#78350f;font-size:0.78rem;font-weight:800;cursor:pointer;">${c.isSinger ? '🎵 ' : (c.gender === 'female' ? '👩 ' : '👨 ')}${c.name}</button>`).join('')}
        </div>

        <div id="fam-dialogue-box" style="margin-top:14px;background:#ffffff;color:#1c1917;border:2px solid #d97706;border-radius:16px;padding:16px 18px;box-shadow:0 6px 20px rgba(146,64,14,0.12);"></div>
      </div>
    `;
  };
})();
