/* ===== FESTORA INTERACTIVE ANIMATED CARTOON FAMILY THEATRE ===== */
(function () {
  'use strict';

  const STATE_SONGS = {
    Karnataka: {
      lang: 'kn-IN',
      label: 'ಕನ್ನಡ (Kannada)',
      defaultSong: 'ಭಾಗ್ಯದ ಲಕ್ಷ್ಮಿ ಬಾರಮ್ಮ, ನಮ್ಮಮ್ಮ ನೀ ಸೌಭಾಗ್ಯದ ಲಕ್ಷ್ಮಿ ಬಾರಮ್ಮ!',
      defaultMeaning: 'Welcome, O Goddess of Fortune, bless our home with joy and harmony!',
      byId: {
        varamahalakshmi: ['ಭಾಗ್ಯದ ಲಕ್ಷ್ಮಿ ಬಾರಮ್ಮ, ನಮ್ಮಮ್ಮ ನೀ ಸೌಭಾಗ್ಯದ ಲಕ್ಷ್ಮಿ ಬಾರಮ್ಮ!', 'Come, O Goddess Varamahalakshmi, bring grace and prosperity to our home!'],
        gowrihabba: ['ಬನ್ನಿ ತಾಯಿ ಗೌರಮ್ಮ, ಬಾಗಿನ ಸ್ವೀಕರಿಸಿ ಹರಸಮ್ಮ!', 'Welcome Mother Swarna Gowri, accept our Bagina and bless our family!'],
        yugadi: ['ಯುಗ ಯುಗಾದಿ ಕಳೆದರೂ, ಯುಗಾದಿ ಮರಳಿ ಬರುತಿದೆ — ಹೊಸ ವರುಷದ ಶುಭಾಶಯ!', 'As ages pass, Yugadi returns anew — wishing everyone a joyful New Year!'],
        makarsankranti_ka: ['ಎಳ್ಳು ಬೆಲ್ಲ ತಿಂದು ಒಳ್ಳೆ ಮಾತಾಡಿ, ಸುಗ್ಗಿ ಹಬ್ಬದ ಹಾರ್ದಿಕ ಶುಭಾಶಯ!', 'Eat sesame and jaggery, speak sweet words — happy Suggi Sankranti!'],
        hampi: ['ವಿಜಯನಗರದ ವೈಭವ ಹಂಪಿ ಉತ್ಸವ, ನಾಡಿನ ಕಲೆ ಸಂಸ್ಕೃತಿಯ ಸಂಭ್ರಮ!', 'Celebrate the glorious art and heritage of Vijayanagara at Hampi Utsav!'],
        dasara: ['ನಾಡಹಬ್ಬ ಮೈಸೂರು ದಸರಾ, ಚಾಮುಂಡೇಶ್ವರಿ ತಾಯಿಯ ದಿವ್ಯ ಕರುಣೆ!', 'Joyous Mysore Dasara — may Goddess Chamundeshwari bless us all!']
      }
    },
    'Tamil Nadu': {
      lang: 'ta-IN',
      label: 'தமிழ் (Tamil)',
      defaultSong: 'பொங்கலோ பொங்கல்! தை பிறந்தால் வழி பிறக்கும்!',
      defaultMeaning: 'Pongalo Pongal! With the dawn of Thai, new paths of prosperity open!'
    },
    Kerala: {
      lang: 'ml-IN',
      label: 'മലയാളം (Malayalam)',
      defaultSong: 'മാവേലി നാടു വാണീടും കാലം, മാനുഷരെല്ലാരുമൊന്നുപോലെ!',
      defaultMeaning: 'In King Mahabali’s golden reign, all people lived as equals in harmony!'
    },
    Maharashtra: {
      lang: 'mr-IN',
      label: 'मराठी (Marathi)',
      defaultSong: 'सुखकर्ता दुखहर्ता वार्ता विघ्नाची, नुरवी पुरवी प्रेम कृपा जयाची!',
      defaultMeaning: 'Remover of sorrows and bestower of joy, fill our home with divine love!'
    },
    'Telangana': {
      lang: 'te-IN',
      label: 'తెలుగు (Telugu)',
      defaultSong: 'బతుకమ్మ బతుకమ్మ ఉయ్యాలో, బంగారు గౌరమ్మ ఉయ్యాలో!',
      defaultMeaning: 'Sing and dance around the golden floral Bathukamma with joy!'
    },
    'Andhra Pradesh': {
      lang: 'te-IN',
      label: 'తెలుగు (Telugu)',
      defaultSong: 'శుభకరమైన పండుగ వేళ, అందరికీ ఆనందం కలగాలి!',
      defaultMeaning: 'On this auspicious festival, may happiness fill every heart!'
    },
    'West Bengal': {
      lang: 'bn-IN',
      label: 'বাংলা (Bengali)',
      defaultSong: 'আয়রে আয় মা দুর্গা, আলোর ভুবন ভরে দে মা!',
      defaultMeaning: 'Come Mother Durga, fill our world with radiant joy and courage!'
    },
    Punjab: {
      lang: 'pa-IN',
      label: 'ਪੰਜਾਬੀ (Punjabi)',
      defaultSong: 'ਆਈ ਵਿਸਾਖੀ ਖੁਸ਼ੀਆਂ ਲਿਆਈ, ਨੱਚੋ ਗਾਓ ਭੰਗੜਾ ਪਾਓ!',
      defaultMeaning: 'Harvest joy has arrived — sing, dance, and celebrate together!'
    },
    DEFAULT: {
      lang: 'hi-IN',
      label: 'हिन्दी (Hindi)',
      defaultSong: 'आया शुभ त्योहार सखी री, दीप जलाओ मंगल गाओ!',
      defaultMeaning: 'The auspicious festival is here — light the lamps and sing songs of joy!'
    }
  };

  function getMotherSong(g, fid) {
    const st = (g && g.state) || 'DEFAULT';
    const pack = STATE_SONGS[st] || STATE_SONGS.DEFAULT;
    if (pack.byId && pack.byId[fid]) {
      return { lang: pack.lang, label: pack.label, lyric: pack.byId[fid][0], meaning: pack.byId[fid][1] };
    }
    return { lang: pack.lang, label: pack.label, lyric: pack.defaultSong, meaning: pack.defaultMeaning };
  }

  // Gentle Indian pentatonic melody synth (Sa Re Ga Pa Dha Sa)
  let famAudioCtx = null;
  function playFolkMelody(muted) {
    if (muted) return;
    try {
      famAudioCtx = famAudioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 440.00, 392.00];
      notes.forEach((freq, i) => {
        const osc = famAudioCtx.createOscillator();
        const gain = famAudioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        const t = famAudioCtx.currentTime + i * 0.28;
        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.08, t + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
        osc.connect(gain);
        gain.connect(famAudioCtx.destination);
        osc.start(t);
        osc.stop(t + 0.26);
      });
    } catch (e) {}
  }

  function speakLine(text, lang, muted, pitch) {
    if (muted) return;
    try {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = lang || 'en-IN';
        u.rate = 0.92;
        u.pitch = pitch || 1.05;
        window.speechSynthesis.speak(u);
      }
    } catch (e) {}
  }

  let activeCleanup = null;
  function stopStage() {
    if (activeCleanup) { try { activeCleanup(); } catch (e) {} activeCleanup = null; }
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {}
  }

  window.renderFestivalFamily = function () {
    stopStage();
    const fid = window.cur || 'ganesh';
    const g = (window.G$ && window.G$[fid]) || (window.FEST && window.FEST.find(x => x.id === fid)) || { name: 'Festival', state: 'India', e: '🪔' };
    const dish = (g.food && g.food[0]) ? (g.food[0].name || g.food[0][1] || 'Traditional Sweets') : 'Festive Prasad';
    const ritual = (g.rituals && g.rituals[0]) ? (g.rituals[0].title || g.rituals[0][1] || 'Sacred Aarti') : 'Sacred Aarti';
    const song = getMotherSong(g, fid);

    window.S = window.S || {};
    window.S.fam = window.S.fam || { father: false, mother: false, sister: false, brother: false };
    if (window.S.fam.kids && !window.S.fam.sister) { window.S.fam.sister = true; window.S.fam.brother = true; }

    const state = {
      activeId: 'mother',
      speakingUntil: 0,
      singing: false,
      muted: false,
      skitTimer: null,
      petals: Array.from({ length: 18 }, () => ({ x: Math.random() * 760, y: Math.random() * 340, s: 4 + Math.random() * 4, v: 0.5 + Math.random() * 0.8 })),
      notes: [],
      chars: [
        {
          id: 'father', name: 'Father', role: 'Lamp & Prayers', x: 135, y: 245, baseY: 245,
          skin: '#d99b66', outfit: '#f59e0b', trim: '#7c2d12', hair: '#1f2937', prop: 'diya',
          line: `Let us light the sacred lamp for ${g.name} and begin ${ritual} together!`,
          lang: 'en-IN', pitch: 0.85
        },
        {
          id: 'mother', name: 'Mother', role: 'Sings & Serves Feast', x: 295, y: 248, baseY: 248,
          skin: '#e0a978', outfit: '#be185d', trim: '#fbbf24', hair: '#111827', prop: 'platter',
          line: `${song.lyric}`, meaning: song.meaning, lang: song.lang, pitch: 1.25, isSinger: true
        },
        {
          id: 'sister', name: 'Sister', role: 'Flowers & Decor', x: 470, y: 256, baseY: 256,
          skin: '#e5b283', outfit: '#10b981', trim: '#fde047', hair: '#1f2937', prop: 'flowers',
          line: `Look at the fresh ${g.name} garlands and rangoli! Come help me decorate!`,
          lang: 'en-IN', pitch: 1.3
        },
        {
          id: 'brother', name: 'Brother', role: 'Bell & Joy', x: 625, y: 258, baseY: 258,
          skin: '#d99b66', outfit: '#3b82f6', trim: '#fbbf24', hair: '#1f2937', prop: 'bell',
          line: `I'm ringing the temple bell and cheering! Happy ${g.name} to everyone!`,
          lang: 'en-IN', pitch: 1.15
        }
      ]
    };

    function triggerCharacter(cid, playAudio) {
      const ch = state.chars.find(c => c.id === cid) || state.chars[0];
      state.activeId = ch.id;
      state.speakingUntil = performance.now() + 3600;
      state.singing = !!ch.isSinger;

      if (!window.S.fam[ch.id]) {
        window.S.fam[ch.id] = true;
        if (typeof window.addCoins === 'function') window.addCoins(25, ch.name + ' Family Role');
        if (typeof window.saveProgress === 'function') window.saveProgress();
      }

      if (ch.isSinger) {
        for (let i = 0; i < 8; i++) {
          state.notes.push({ x: ch.x + (Math.random() - 0.5) * 30, y: ch.y - 70, vy: -0.9 - Math.random() * 0.6, life: 1, sym: i % 2 ? '🎵' : '🎶' });
        }
        if (playAudio) {
          playFolkMelody(state.muted);
          speakLine(ch.line, ch.lang, state.muted, ch.pitch);
        }
      } else if (playAudio) {
        speakLine(ch.line, ch.lang, state.muted, ch.pitch);
      }

      updateDialogueBox(ch);
      updateStatusChips();
    }

    function updateDialogueBox(ch) {
      const box = document.getElementById('fam-dialogue-box');
      if (!box) return;
      box.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
          <b style="color:#fbbf24;font-size:1rem;">${ch.isSinger ? '🎵 ' : '💬 '}${ch.name} <span style="font-weight:400;font-size:0.84rem;color:#d6c7b2;">(${ch.role}${ch.isSinger ? ' · ' + song.label : ''})</span></b>
          <span style="font-size:0.78rem;color:#10b981;font-weight:700;">${window.S.fam[ch.id] ? '✅ +25 Coins Earned' : 'Tap to interact'}</span>
        </div>
        <div style="margin-top:6px;font-size:1.05rem;line-height:1.5;color:#fff;">“${ch.line}”</div>
        ${ch.meaning ? `<div style="margin-top:4px;font-size:0.86rem;color:#fde68a;font-style:italic;">Meaning: ${ch.meaning}</div>` : ''}
      `;
    }

    function updateStatusChips() {
      const done = state.chars.filter(c => window.S.fam[c.id]).length;
      const el = document.getElementById('fam-unity-pill');
      if (el) el.textContent = `Family Unity: ${done}/4`;
      state.chars.forEach(c => {
        const b = document.getElementById('fam-btn-' + c.id);
        if (b) {
          b.style.borderColor = state.activeId === c.id ? '#fbbf24' : (window.S.fam[c.id] ? '#10b981' : 'rgba(255,255,255,0.2)');
          b.style.background = state.activeId === c.id ? 'rgba(251,191,36,0.18)' : 'rgba(255,255,255,0.06)';
        }
      });
    }

    function drawCharacter(ctx, ch, t, isActive, isSpeaking) {
      const bounce = isActive ? Math.abs(Math.sin(t * 0.008)) * 8 : Math.sin(t * 0.003 + ch.x) * 2;
      const sway = (isSpeaking && ch.isSinger) ? Math.sin(t * 0.007) * 0.08 : 0;
      const x = ch.x, y = ch.y - bounce;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(sway);

      // Ground shadow
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.beginPath();
      ctx.ellipse(0, 56 + bounce, 26, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      // Body / Traditional Outfit
      ctx.fillStyle = ch.outfit;
      ctx.beginPath();
      if (ch.id === 'mother' || ch.id === 'sister') {
        ctx.moveTo(-18, -12); ctx.lineTo(18, -12); ctx.lineTo(26, 52); ctx.lineTo(-26, 52);
      } else {
        ctx.roundRect ? ctx.roundRect(-18, -12, 36, 58, 10) : ctx.rect(-18, -12, 36, 58);
      }
      ctx.closePath();
      ctx.fill();

      // Zari / Gold trim
      ctx.strokeStyle = ch.trim;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-16, 48); ctx.lineTo(16, 48);
      ctx.stroke();

      // Animated Arms
      const armWave = isSpeaking ? Math.sin(t * 0.015) * 14 : Math.sin(t * 0.003) * 3;
      ctx.strokeStyle = ch.skin;
      ctx.lineWidth = 7;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-17, -4); ctx.lineTo(-32, 14 - armWave * 0.5);
      ctx.moveTo(17, -4); ctx.lineTo(32, 10 - armWave);
      ctx.stroke();

      // Festival Prop in Hand
      ctx.font = '20px sans-serif';
      ctx.textAlign = 'center';
      const propEmoji = ch.prop === 'diya' ? '🪔' : (ch.prop === 'platter' ? '🍛' : (ch.prop === 'flowers' ? '🌺' : '🔔'));
      ctx.fillText(propEmoji, 34, 12 - armWave);

      // Head
      ctx.fillStyle = ch.skin;
      ctx.beginPath();
      ctx.arc(0, -34, 21, 0, Math.PI * 2);
      ctx.fill();

      // Hair & Gajra / Crown
      ctx.fillStyle = ch.hair;
      ctx.beginPath();
      ctx.arc(0, -38, 21, Math.PI, Math.PI * 2);
      ctx.fill();
      if (ch.id === 'mother' || ch.id === 'sister') {
        ctx.fillStyle = '#fef9c3';
        ctx.beginPath();
        ctx.arc(16, -34, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Blinking Eyes
      const blink = (Math.floor(t / 2800) % 7 === 0 && (t % 2800) < 130);
      ctx.fillStyle = '#111827';
      if (blink) {
        ctx.fillRect(-10, -36, 6, 2);
        ctx.fillRect(4, -36, 6, 2);
      } else {
        ctx.beginPath();
        ctx.arc(-7, -36, 2.6, 0, Math.PI * 2);
        ctx.arc(7, -36, 2.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Father Mustache / Mother Bindi
      if (ch.id === 'father') {
        ctx.fillStyle = '#1f2937';
        ctx.fillRect(-7, -27, 14, 3);
      } else if (ch.id === 'mother') {
        ctx.fillStyle = '#dc2626';
        ctx.beginPath(); ctx.arc(0, -41, 2.5, 0, Math.PI * 2); ctx.fill();
      }

      // Lip-Sync Mouth
      ctx.fillStyle = '#7f1d1d';
      ctx.beginPath();
      if (isSpeaking) {
        const open = 2 + Math.abs(Math.sin(t * 0.02)) * 4;
        ctx.ellipse(0, -23, 5, open, 0, 0, Math.PI * 2);
      } else {
        ctx.arc(0, -25, 5, 0.1 * Math.PI, 0.9 * Math.PI);
      }
      ctx.fill();

      // Name Badge under character
      ctx.fillStyle = isActive ? '#fbbf24' : 'rgba(20,10,30,0.85)';
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(-34, 60, 68, 20, 10) : ctx.rect(-34, 60, 68, 20);
      ctx.fill();
      ctx.fillStyle = isActive ? '#18181b' : '#fef3c7';
      ctx.font = 'bold 11px Georgia, serif';
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
        const cx = e.touches ? e.touches[0].clientX : e.clientX;
        const cy = e.touches ? e.touches[0].clientY : e.clientY;
        return { x: (cx - r.left) * (cv.width / r.width), y: (cy - r.top) * (cv.height / r.height) };
      }

      const onDown = (e) => {
        const p = getPt(e);
        for (let i = state.chars.length - 1; i >= 0; i--) {
          const ch = state.chars[i];
          if (Math.hypot(p.x - ch.x, p.y - ch.y) < 48) {
            dragChar = ch;
            triggerCharacter(ch.id, true);
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

        // Warm Festival Home Backdrop
        const grad = ctx.createLinearGradient(0, 0, 0, cv.height);
        grad.addColorStop(0, '#2b133d');
        grad.addColorStop(0.65, '#4a1d2e');
        grad.addColorStop(1, '#241208');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, cv.width, cv.height);

        // Floor
        ctx.fillStyle = '#3d1f0d';
        ctx.fillRect(0, 265, cv.width, 95);

        // Mango-leaf & Marigold Torana Arch
        for (let i = 0; i <= 14; i++) {
          const tx = 40 + i * 48;
          const ty = 22 + Math.sin(i * 0.45) * 10;
          ctx.fillStyle = i % 2 === 0 ? '#16a34a' : '#f59e0b';
          ctx.beginPath(); ctx.arc(tx, ty, 10, 0, Math.PI * 2); ctx.fill();
        }

        // Center Altar & Glowing Diya
        ctx.fillStyle = '#78350f';
        ctx.fillRect(320, 175, 120, 85);
        ctx.font = '38px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(g.e || '🪔', 380, 165);
        ctx.font = 'bold 13px Georgia, serif';
        ctx.fillStyle = '#fde68a';
        ctx.fillText(`${g.name} Home Altar`, 380, 200);

        // Falling Petals
        state.petals.forEach(pt => {
          pt.y += pt.v;
          pt.x += Math.sin(t * 0.002 + pt.y * 0.02) * 0.5;
          if (pt.y > cv.height) { pt.y = -10; pt.x = Math.random() * cv.width; }
          ctx.fillStyle = 'rgba(244, 114, 182, 0.75)';
          ctx.beginPath(); ctx.ellipse(pt.x, pt.y, pt.s, pt.s * 0.5, pt.y * 0.03, 0, Math.PI * 2); ctx.fill();
        });

        // Draw All 4 Characters
        const now = performance.now();
        state.chars.forEach(ch => {
          const isAct = state.activeId === ch.id;
          const isSpk = isAct && now < state.speakingUntil;
          drawCharacter(ctx, ch, t, isAct, isSpk);
        });

        // Floating Musical Notes when Mother Sings
        state.notes = state.notes.filter(n => n.life > 0);
        state.notes.forEach(n => {
          n.y += n.vy; n.life -= 0.008;
          ctx.globalAlpha = Math.max(0, n.life);
          ctx.font = '18px sans-serif';
          ctx.fillText(n.sym, n.x + Math.sin(t * 0.01) * 6, n.y);
          ctx.globalAlpha = 1;
        });

        raf = requestAnimationFrame(frame);
      }

      raf = requestAnimationFrame(frame);
      triggerCharacter('mother', false);

      activeCleanup = () => {
        dead = true;
        cancelAnimationFrame(raf);
        if (state.skitTimer) clearTimeout(state.skitTimer);
        cv.removeEventListener('pointerdown', onDown);
        cv.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
      };
    }

    window._famStage = {
      select: (cid) => triggerCharacter(cid, true),
      sing: () => triggerCharacter('mother', true),
      toggleMute: () => {
        state.muted = !state.muted;
        if (state.muted && window.speechSynthesis) try { window.speechSynthesis.cancel(); } catch (e) {}
        const b = document.getElementById('fam-mute-btn');
        if (b) b.textContent = state.muted ? '🔇 Muted' : '🔊 Voice & Song On';
      },
      playSkit: () => {
        if (state.skitTimer) clearTimeout(state.skitTimer);
        const order = ['father', 'mother', 'sister', 'brother'];
        let step = 0;
        function next() {
          if (!document.getElementById('fam-stage-canvas')) return;
          triggerCharacter(order[step], true);
          step++;
          if (step < order.length) state.skitTimer = setTimeout(next, 3800);
        }
        next();
      }
    };

    setTimeout(mountStage, 20);
    const doneCount = ['father', 'mother', 'sister', 'brother'].filter(k => window.S.fam[k]).length;

    return `
      <div style="max-width:880px;margin:0 auto;padding-bottom:28px;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
          <div>
            <h2 style="margin:0;color:var(--ink);">👨‍👩‍👧‍👦 ${g.name} Animated Family Theatre</h2>
            <small style="color:var(--mut);">Tap or drag Father, Mother, Sister &amp; Brother to watch them act, speak, and sing in ${song.label}!</small>
          </div>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
            <span id="fam-unity-pill" style="background:var(--gold);color:#18181b;font-weight:800;padding:5px 12px;border-radius:16px;font-size:0.84rem;">Family Unity: ${doneCount}/4</span>
            <button type="button" onclick="window._famStage.playSkit()">▶ Play Family Skit</button>
            <button type="button" class="alt" onclick="window._famStage.sing()">🎵 Mother's Song</button>
            <button type="button" id="fam-mute-btn" class="alt" onclick="window._famStage.toggleMute()">🔊 Voice &amp; Song On</button>
          </div>
        </div>

        <canvas id="fam-stage-canvas" width="760" height="340" style="width:100%;height:auto;border-radius:18px;border:2px solid var(--gold);display:block;touch-action:none;cursor:grab;box-shadow:0 12px 32px rgba(0,0,0,0.45);"></canvas>

        <div id="fam-dialogue-box" class="card" style="margin-top:12px;border:1.5px solid var(--gold);padding:14px 16px;"></div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;margin-top:12px;">
          ${state.chars.map(c => `
            <button type="button" id="fam-btn-${c.id}" onclick="window._famStage.select('${c.id}')" style="padding:10px 12px;border-radius:12px;border:1.5px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.06);color:#fff;text-align:left;cursor:pointer;">
              <div style="font-weight:800;font-size:0.95rem;">${c.isSinger ? '🎵 ' : ''}${c.name}</div>
              <div style="font-size:0.78rem;color:#fde68a;">${c.role}</div>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  };
})();
