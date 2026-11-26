/* ===== FESTORA INTERACTIVE ANIMATED CARTOON FAMILY THEATRE (v2: Native Languages + Gender Voices + Film Raga Tune) ===== */
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

  // Pick gender-matched voice from speechSynthesis
  function pickVoice(lang, gender) {
    try {
      const voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
      if (!voices || !voices.length) return null;
      const femHints = /female|woman|veena|lekha|neerja|swara|heera|priya|kalpana|kanya|zira|samantha|victoria|karen|susan|aria|jenny|vani|shruti|sapna|meera|aditi|raveena/i;
      const maleHints = /male|man|rishi|prabhat|madhur|hemant|ravi|david|daniel|alex|mark|guy|george|arjun|vikram|kiran|rohan|amit/i;
      const langBase = (lang || 'en-IN').split('-')[0].toLowerCase();

      const matchingLang = voices.filter(v => v.lang && v.lang.toLowerCase().startsWith(langBase));
      const pool = matchingLang.length ? matchingLang : voices.filter(v => v.lang && v.lang.toLowerCase().includes('in'));
      const searchPool = pool.length ? pool : voices;

      if (gender === 'female') {
        return searchPool.find(v => femHints.test(v.name)) || searchPool.find(v => !maleHints.test(v.name)) || searchPool[0];
      } else {
        return searchPool.find(v => maleHints.test(v.name) && !femHints.test(v.name)) || searchPool.find(v => !femHints.test(v.name)) || searchPool[0];
      }
    } catch (e) {
      return null;
    }
  }

  // Expressive Indian Film-Style Raga Melody (Tanpura drone + Mohanam/Bhupali vocal phrasing + soft rhythm)
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

      // Soft warm Tanpura drone (Sa + Pa)
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

      // Film-style Mohanam / Bhupali Raga phrase (Sa Re Ga Pa Dha Sa' Dha Pa Ga Re Sa) with smooth phrasing
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
        // Subtle gamaka / vibrato
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

  let activeCleanup = null;
  function stopAllAudio(state) {
    stopFilmMelody();
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {}
    if (state) {
      state.speakingUntil = 0;
      state.singing = false;
      state.isPlaying = false;
      if (state.skitTimer) { clearTimeout(state.skitTimer); state.skitTimer = null; }
    }
  }

  function stopStage() {
    if (activeCleanup) { try { activeCleanup(); } catch (e) {} activeCleanup = null; }
    stopAllAudio(null);
  }

  window.renderFestivalFamily = function () {
    stopStage();
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
      activeId: 'mother',
      speakingUntil: 0,
      singing: false,
      isPlaying: false,
      skitTimer: null,
      petals: Array.from({ length: 18 }, () => ({ x: Math.random() * 760, y: Math.random() * 340, s: 4 + Math.random() * 4, v: 0.5 + Math.random() * 0.8 })),
      notes: [],
      chars: [
        { id: 'father', name: 'Father', role: 'Lamp & Prayers', x: 135, y: 245, skin: '#d99b66', outfit: '#f59e0b', trim: '#7c2d12', hair: '#1f2937', prop: 'diya', gender: 'male' },
        { id: 'mother', name: 'Mother', role: 'Sings & Serves Feast', x: 295, y: 248, skin: '#e0a978', outfit: '#be185d', trim: '#fbbf24', hair: '#111827', prop: 'platter', gender: 'female', isSinger: true },
        { id: 'sister', name: 'Sister', role: 'Flowers & Decor', x: 470, y: 256, skin: '#e5b283', outfit: '#10b981', trim: '#fde047', hair: '#1f2937', prop: 'flowers', gender: 'female' },
        { id: 'brother', name: 'Brother', role: 'Bell & Joy', x: 625, y: 258, skin: '#d99b66', outfit: '#3b82f6', trim: '#fbbf24', hair: '#1f2937', prop: 'bell', gender: 'male' }
      ]
    };

    function speakWithGender(text, langCode, gender, pitch) {
      try {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = langCode;
        const v = pickVoice(langCode, gender);
        if (v) u.voice = v;
        u.rate = gender === 'female' && state.singing ? 0.84 : 0.94;
        u.pitch = pitch;
        u.onend = () => {
          state.speakingUntil = 0;
          state.singing = false;
          state.isPlaying = false;
          updatePlayStopBtn();
        };
        window.speechSynthesis.speak(u);
      } catch (e) {}
    }

    function updatePlayStopBtn() {
      const btn = document.getElementById('fam-playstop-btn');
      if (btn) {
        btn.textContent = state.isPlaying ? '⏹ Stop Voice/Song' : '▶ Play Dialogue';
        btn.style.background = state.isPlaying ? '#dc2626' : '#d97706';
        btn.style.color = '#ffffff';
      }
    }

    function triggerCharacter(cid, playAudio, allowToggleStop) {
      const ch = state.chars.find(c => c.id === cid) || state.chars[0];
      // Click-again to stop if currently playing this character
      if (allowToggleStop && state.isPlaying && state.activeId === ch.id) {
        stopAllAudio(state);
        updatePlayStopBtn();
        return;
      }

      stopAllAudio(state);
      state.activeId = ch.id;
      const packInfo = getPackAndLines();
      const lineObj = packInfo.lines[ch.id];

      if (!window.S.fam[ch.id]) {
        window.S.fam[ch.id] = true;
        if (typeof window.addCoins === 'function') window.addCoins(25, ch.name + ' Family Role');
        if (typeof window.saveProgress === 'function') window.saveProgress();
      }

      if (playAudio) {
        state.isPlaying = true;
        state.speakingUntil = performance.now() + (ch.isSinger ? 4500 : 3800);
        state.singing = !!ch.isSinger;
        if (ch.isSinger) {
          for (let i = 0; i < 10; i++) {
            state.notes.push({ x: ch.x + (Math.random() - 0.5) * 35, y: ch.y - 70, vy: -0.9 - Math.random() * 0.6, life: 1, sym: i % 2 ? '🎵' : '🎶' });
          }
          playFilmSongMelody();
        }
        speakWithGender(lineObj.text, packInfo.langCode, lineObj.gender, lineObj.pitch);
      }

      updateDialogueBox(ch, lineObj, packInfo);
      updateStatusChips();
      updatePlayStopBtn();
    }

    function updateDialogueBox(ch, lineObj, packInfo) {
      const box = document.getElementById('fam-dialogue-box');
      if (!box) return;
      const voiceTag = ch.gender === 'female' ? '👩 Lady Voice' : '👨 Gent Voice';
      box.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
          <b style="color:#fbbf24;font-size:0.98rem;">${ch.isSinger ? '🎵 ' : '💬 '}${ch.name} <span style="font-weight:500;font-size:0.82rem;color:#e5e7eb;">(${ch.role} · ${packInfo.label} · ${voiceTag})</span></b>
          <button type="button" id="fam-playstop-btn" onclick="window._famStage.togglePlayStop()" style="padding:5px 14px;border-radius:12px;border:1.5px solid #fbbf24;background:${state.isPlaying ? '#dc2626' : '#d97706'};color:#ffffff;font-size:0.8rem;font-weight:800;cursor:pointer;">${state.isPlaying ? '⏹ Stop Voice/Song' : '▶ Play Dialogue'}</button>
        </div>
        <div style="margin-top:6px;font-size:1.05rem;line-height:1.5;color:#fff;">“${lineObj.text}”</div>
        ${packInfo.langCode !== 'en-IN' ? `<div style="margin-top:4px;font-size:0.84rem;color:#fde68a;font-style:italic;">English: ${lineObj.en}</div>` : ''}
      `;
    }

    function updateStatusChips() {
      const done = state.chars.filter(c => window.S.fam[c.id]).length;
      const el = document.getElementById('fam-unity-pill');
      if (el) el.textContent = `Family Unity: ${done}/4`;
      state.chars.forEach(c => {
        const b = document.getElementById('fam-btn-' + c.id);
        if (b) {
          b.style.borderColor = state.activeId === c.id ? '#fbbf24' : (window.S.fam[c.id] ? '#10b981' : '#6b4c7a');
          b.style.background = state.activeId === c.id ? '#4a1d2e' : (window.S.fam[c.id] ? '#1a2e25' : '#261830');
        }
      });
    }

    function drawCharacter(ctx, ch, t, isActive, isSpeaking) {
      const bounce = isSpeaking ? Math.abs(Math.sin(t * 0.01)) * 9 : (isActive ? Math.sin(t * 0.004) * 3 : Math.sin(t * 0.003 + ch.x) * 2);
      const sway = (isSpeaking && ch.isSinger) ? Math.sin(t * 0.008) * 0.09 : 0;
      const x = ch.x, y = ch.y - bounce;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(sway);

      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.beginPath(); ctx.ellipse(0, 56 + bounce, 26, 7, 0, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = ch.outfit;
      ctx.beginPath();
      if (ch.gender === 'female') {
        ctx.moveTo(-18, -12); ctx.lineTo(18, -12); ctx.lineTo(26, 52); ctx.lineTo(-26, 52);
      } else {
        ctx.roundRect ? ctx.roundRect(-18, -12, 36, 58, 10) : ctx.rect(-18, -12, 36, 58);
      }
      ctx.closePath(); ctx.fill();

      ctx.strokeStyle = ch.trim; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(-16, 48); ctx.lineTo(16, 48); ctx.stroke();

      const armWave = isSpeaking ? Math.sin(t * 0.016) * 16 : Math.sin(t * 0.003) * 3;
      ctx.strokeStyle = ch.skin; ctx.lineWidth = 7; ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-17, -4); ctx.lineTo(-32, 14 - armWave * 0.5);
      ctx.moveTo(17, -4); ctx.lineTo(32, 10 - armWave);
      ctx.stroke();

      ctx.save();
      ctx.translate(34, 12 - armWave);
      if (isSpeaking) ctx.rotate(Math.sin(t * 0.02) * 0.25);
      ctx.font = '21px sans-serif'; ctx.textAlign = 'center';
      const propEmoji = ch.prop === 'diya' ? '🪔' : (ch.prop === 'platter' ? '🍛' : (ch.prop === 'flowers' ? '🌺' : '🔔'));
      ctx.fillText(propEmoji, 0, 0);
      ctx.restore();

      ctx.fillStyle = ch.skin;
      ctx.beginPath(); ctx.arc(0, -34, 21, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = ch.hair;
      ctx.beginPath(); ctx.arc(0, -38, 21, Math.PI, Math.PI * 2); ctx.fill();
      if (ch.gender === 'female') {
        ctx.fillStyle = '#fef9c3';
        ctx.beginPath(); ctx.arc(16, -34, 5, 0, Math.PI * 2); ctx.fill();
      }

      const blink = (Math.floor(t / 2800) % 7 === 0 && (t % 2800) < 130);
      ctx.fillStyle = '#111827';
      if (blink) {
        ctx.fillRect(-10, -36, 6, 2); ctx.fillRect(4, -36, 6, 2);
      } else {
        ctx.beginPath(); ctx.arc(-7, -36, 2.6, 0, Math.PI * 2); ctx.arc(7, -36, 2.6, 0, Math.PI * 2); ctx.fill();
      }

      if (ch.id === 'father') {
        ctx.fillStyle = '#1f2937'; ctx.fillRect(-7, -27, 14, 3);
      } else if (ch.id === 'mother') {
        ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(0, -41, 2.5, 0, Math.PI * 2); ctx.fill();
      }

      ctx.fillStyle = '#7f1d1d';
      ctx.beginPath();
      if (isSpeaking) {
        const open = 2.5 + Math.abs(Math.sin(t * 0.022)) * 4.5;
        ctx.ellipse(0, -23, 5.2, open, 0, 0, Math.PI * 2);
      } else {
        ctx.arc(0, -25, 5, 0.1 * Math.PI, 0.9 * Math.PI);
      }
      ctx.fill();

      ctx.fillStyle = isActive ? '#fbbf24' : 'rgba(20,10,30,0.85)';
      ctx.beginPath(); ctx.roundRect ? ctx.roundRect(-34, 60, 68, 20, 10) : ctx.rect(-34, 60, 68, 20); ctx.fill();
      ctx.fillStyle = isActive ? '#18181b' : '#fef3c7';
      ctx.font = 'bold 11px Georgia, serif'; ctx.textAlign = 'center';
      ctx.fillText(ch.name, 0, 74);

      ctx.restore();
    }

    function mountStage() {
      const cv = document.getElementById('fam-stage-canvas');
      if (!cv) return;
      const ctx = cv.getContext('2d');
      let raf = 0, dead = false, dragChar = null;

      function getPt(e) {
        const r = cv.getBoundingClientRect();
        return { x: (e.clientX - r.left) * (cv.width / r.width), y: (e.clientY - r.top) * (cv.height / r.height) };
      }

      const onDown = (e) => {
        const p = getPt(e);
        for (let i = state.chars.length - 1; i >= 0; i--) {
          const ch = state.chars[i];
          if (Math.hypot(p.x - ch.x, p.y - ch.y) < 48) {
            dragChar = ch;
            triggerCharacter(ch.id, true, true);
            break;
          }
        }
      };
      const onMove = (e) => {
        if (!dragChar) return;
        const p = getPt(e);
        dragChar.x = Math.max(50, Math.min(710, p.x));
        dragChar.y = Math.max(180, Math.min(280, p.y));
      };
      const onUp = () => { dragChar = null; };

      cv.addEventListener('pointerdown', onDown);
      cv.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);

      function frame(t) {
        if (dead || !cv.isConnected) { stopStage(); return; }
        ctx.clearRect(0, 0, cv.width, cv.height);

        const grad = ctx.createLinearGradient(0, 0, 0, cv.height);
        grad.addColorStop(0, '#2b133d'); grad.addColorStop(0.65, '#4a1d2e'); grad.addColorStop(1, '#241208');
        ctx.fillStyle = grad; ctx.fillRect(0, 0, cv.width, cv.height);

        ctx.fillStyle = '#3d1f0d'; ctx.fillRect(0, 265, cv.width, 95);

        for (let i = 0; i <= 14; i++) {
          const tx = 40 + i * 48, ty = 22 + Math.sin(i * 0.45) * 10;
          ctx.fillStyle = i % 2 === 0 ? '#16a34a' : '#f59e0b';
          ctx.beginPath(); ctx.arc(tx, ty, 10, 0, Math.PI * 2); ctx.fill();
        }

        ctx.fillStyle = '#78350f'; ctx.fillRect(320, 175, 120, 85);
        ctx.font = '38px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(g.e || '🪔', 380, 165);
        ctx.font = 'bold 13px Georgia, serif'; ctx.fillStyle = '#fde68a';
        ctx.fillText(`${g.name} Home Altar`, 380, 200);

        state.petals.forEach(pt => {
          pt.y += pt.v; pt.x += Math.sin(t * 0.002 + pt.y * 0.02) * 0.5;
          if (pt.y > cv.height) { pt.y = -10; pt.x = Math.random() * cv.width; }
          ctx.fillStyle = 'rgba(244, 114, 182, 0.75)';
          ctx.beginPath(); ctx.ellipse(pt.x, pt.y, pt.s, pt.s * 0.5, pt.y * 0.03, 0, Math.PI * 2); ctx.fill();
        });

        const now = performance.now();
        state.chars.forEach(ch => {
          const isAct = state.activeId === ch.id;
          const isSpk = isAct && now < state.speakingUntil && state.isPlaying;
          drawCharacter(ctx, ch, t, isAct, isSpk);
        });

        state.notes = state.notes.filter(n => n.life > 0);
        state.notes.forEach(n => {
          n.y += n.vy; n.life -= 0.007;
          ctx.globalAlpha = Math.max(0, n.life);
          ctx.font = '18px sans-serif';
          ctx.fillText(n.sym, n.x + Math.sin(t * 0.01) * 6, n.y);
          ctx.globalAlpha = 1;
        });

        raf = requestAnimationFrame(frame);
      }

      raf = requestAnimationFrame(frame);
      triggerCharacter('mother', false, false);

      activeCleanup = () => {
        dead = true;
        cancelAnimationFrame(raf);
        stopAllAudio(state);
        cv.removeEventListener('pointerdown', onDown);
        cv.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
      };
    }

    window._famStage = {
      select: (cid) => triggerCharacter(cid, true, true),
      sing: () => triggerCharacter('mother', true, true),
      togglePlayStop: () => {
        if (state.isPlaying) {
          stopAllAudio(state);
          updatePlayStopBtn();
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
          updatePlayStopBtn();
          return;
        }
        stopAllAudio(state);
        const order = ['father', 'mother', 'sister', 'brother'];
        let step = 0;
        function next() {
          if (!document.getElementById('fam-stage-canvas')) return;
          triggerCharacter(order[step], true, false);
          step++;
          if (step < order.length) state.skitTimer = setTimeout(next, 4200);
        }
        next();
      }
    };

    setTimeout(mountStage, 20);
    const doneCount = ['father', 'mother', 'sister', 'brother'].filter(k => window.S.fam[k]).length;

    return `
      <div style="max-width:880px;margin:0 auto;padding-bottom:28px;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px;">
          <div>
            <h2 style="margin:0;color:var(--ink);">👨‍👩‍👧‍👦 ${g.name} Family Theatre</h2>
            <small style="color:var(--mut);">Tap any character to play/stop their dialogue &amp; song, or drag them on stage.</small>
          </div>
          <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
            <select id="fam-lang-sel" aria-label="Family Dialogue Language" onchange="window._famStage.setLang(this.value)" style="background:#261830;color:#ffffff;border:1.5px solid #d97706;border-radius:10px;padding:4px 8px;font-size:0.76rem;font-weight:700;cursor:pointer;">
              <option value="auto" ${window._famLang==='auto'?'selected':''}>🌐 Native (Auto)</option>
              <option value="en-IN" ${window._famLang==='en-IN'?'selected':''}>English</option>
              <option value="kn-IN" ${window._famLang==='kn-IN'?'selected':''}>ಕನ್ನಡ (Kannada)</option>
              <option value="hi-IN" ${window._famLang==='hi-IN'?'selected':''}>हिन्दी (Hindi)</option>
              <option value="ta-IN" ${window._famLang==='ta-IN'?'selected':''}>தமிழ் (Tamil)</option>
              <option value="te-IN" ${window._famLang==='te-IN'?'selected':''}>తెలుగు (Telugu)</option>
              <option value="ml-IN" ${window._famLang==='ml-IN'?'selected':''}>മലയാളം (Malayalam)</option>
            </select>
            <span id="fam-unity-pill" style="background:var(--gold);color:#18181b;font-weight:800;padding:4px 10px;border-radius:14px;font-size:0.78rem;">Unity: ${doneCount}/4</span>
            <button type="button" onclick="window._famStage.playSkit()" style="padding:6px 12px;font-size:0.84rem;">▶ Skit</button>
            <button type="button" class="alt" onclick="window._famStage.sing()" style="padding:6px 12px;font-size:0.84rem;">🎵 Mother's Song</button>
          </div>
        </div>

        <canvas id="fam-stage-canvas" width="760" height="340" style="width:100%;height:auto;border-radius:18px;border:2px solid var(--gold);display:block;touch-action:none;cursor:grab;box-shadow:0 12px 32px rgba(0,0,0,0.45);"></canvas>

        <div id="fam-dialogue-box" class="card" style="margin-top:12px;background:#23132b;color:#ffffff;border:2px solid #d97706;border-radius:16px;padding:14px 16px;"></div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;margin-top:12px;">
          ${state.chars.map(c => `
            <button type="button" id="fam-btn-${c.id}" onclick="window._famStage.select('${c.id}')" style="padding:10px 12px;border-radius:12px;border:1.5px solid #6b4c7a;background:#261830;color:#ffffff;text-align:left;cursor:pointer;">
              <div style="font-weight:800;font-size:0.95rem;">${c.isSinger ? '🎵 ' : (c.gender === 'female' ? '👩 ' : '👨 ')}${c.name}</div>
              <div style="font-size:0.78rem;color:#fde68a;">${c.role}</div>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  };
})();
