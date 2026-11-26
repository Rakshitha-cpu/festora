/* ===== FESTORA – ASHTA LAKSHMI: THE DIVINE MEMORY QUEST (EXCLUSIVELY FOR MAHALAKSHMI VRATA) ===== */
(function () {
  'use strict';
  var FG = window.FG;
  if (!FG || !FG.E) return;

  FG.ENG_LABEL = FG.ENG_LABEL || {};
  FG.HOW = FG.HOW || {};
  FG.ENG_LABEL.ashtaLakshmi = 'Sacred Memory Quest';
  FG.HOW.ashtaLakshmi = 'Choose Easy (4 pairs), Medium (6 pairs), or Hard (8 pairs). Flip two lotus cards at a time to match the sacred forms of Ashta Lakshmi before the timer ends!';

  var FORMS = [
    {
      id: 'adi',
      name: 'Adi Lakshmi',
      symbol: 'Sacred Lotus (Padma)',
      significance: 'The Primal Mother & Source of Eternal Peace',
      desc: 'Adi Lakshmi is the original, timeless form of Goddess Lakshmi. Her blooming lotus symbolizes purity, spiritual awakening, and inner serenity.',
      svg: '<svg viewBox="0 0 80 80" width="56" height="56" aria-hidden="true"><defs><linearGradient id="al_lot" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f9a8d4"/><stop offset="100%" stop-color="#be185d"/></linearGradient></defs><path d="M40 12 C48 26 48 42 40 54 C32 42 32 26 40 12Z" fill="url(#al_lot)" stroke="#fde047" stroke-width="1.5"/><path d="M40 54 C25 46 18 32 22 20 C31 28 36 40 40 54Z" fill="#ec4899" stroke="#fde047" stroke-width="1.4"/><path d="M40 54 C55 46 62 32 58 20 C49 28 44 40 40 54Z" fill="#ec4899" stroke="#fde047" stroke-width="1.4"/><path d="M40 56 C19 52 10 42 12 31 C24 36 32 46 40 56Z" fill="#db2777" stroke="#fde047" stroke-width="1.2"/><path d="M40 56 C61 52 70 42 68 31 C56 36 48 46 40 56Z" fill="#db2777" stroke="#fde047" stroke-width="1.2"/><ellipse cx="40" cy="60" rx="22" ry="6" fill="#15803d" stroke="#fde047" stroke-width="1.2"/></svg>'
    },
    {
      id: 'dhana',
      name: 'Dhana Lakshmi',
      symbol: 'Sacred Gold Coins',
      significance: 'Goddess of Prosperity & Generosity',
      desc: 'Dhana Lakshmi blesses households with honest wealth, abundance, and the wisdom to share generously with others.',
      svg: '<svg viewBox="0 0 80 80" width="56" height="56" aria-hidden="true"><circle cx="30" cy="52" r="14" fill="#f59e0b" stroke="#fef08a" stroke-width="2"/><circle cx="30" cy="52" r="9" fill="none" stroke="#92400e" stroke-width="1.5"/><circle cx="50" cy="50" r="14" fill="#fbbf24" stroke="#fef08a" stroke-width="2"/><circle cx="50" cy="50" r="9" fill="none" stroke="#92400e" stroke-width="1.5"/><circle cx="40" cy="31" r="15" fill="#fde047" stroke="#b45309" stroke-width="2"/><circle cx="40" cy="31" r="10" fill="none" stroke="#92400e" stroke-width="1.5"/><text x="40" y="35" font-size="11" font-weight="bold" text-anchor="middle" fill="#78350f">ॐ</text></svg>'
    },
    {
      id: 'dhanya',
      name: 'Dhanya Lakshmi',
      symbol: 'Golden Paddy & Grains',
      significance: 'Goddess of Harvest & Nourishment',
      desc: 'Dhanya Lakshmi represents fertile harvests and wholesome food, reminding families to respect nature and never waste grain.',
      svg: '<svg viewBox="0 0 80 80" width="56" height="56" aria-hidden="true"><path d="M22 52 Q40 68 58 52 Z" fill="#92400e" stroke="#fde047" stroke-width="2"/><path d="M24 52 Q40 44 56 52" fill="#fef3c7"/><g stroke="#f59e0b" stroke-width="2.2" fill="#fde047"><path d="M40 50 Q36 30 28 16"/><path d="M40 50 Q40 28 40 12"/><path d="M40 50 Q44 30 52 16"/><ellipse cx="29" cy="22" rx="3" ry="5" transform="rotate(-25 29 22)"/><ellipse cx="40" cy="18" rx="3" ry="5"/><ellipse cx="51" cy="22" rx="3" ry="5" transform="rotate(25 51 22)"/><ellipse cx="33" cy="33" rx="3" ry="5" transform="rotate(-18 33 33)"/><ellipse cx="47" cy="33" rx="3" ry="5" transform="rotate(18 47 33)"/></g></svg>'
    },
    {
      id: 'gaja',
      name: 'Gaja Lakshmi',
      symbol: 'Royal Temple Elephants',
      significance: 'Goddess of Royalty, Grace & Rain',
      desc: 'Flanked by two sacred elephants showering water from golden pots, Gaja Lakshmi symbolizes dignity, strength, and auspiciousness.',
      svg: '<svg viewBox="0 0 80 80" width="56" height="56" aria-hidden="true"><g fill="#e2e8f0" stroke="#f59e0b" stroke-width="1.5"><path d="M12 58 L12 42 Q12 30 24 30 Q32 30 34 40 L34 58 L27 58 L27 48 L19 48 L19 58 Z"/><path d="M32 38 Q38 30 35 22" fill="none" stroke="#e2e8f0" stroke-width="4" stroke-linecap="round"/><path d="M68 58 L68 42 Q68 30 56 30 Q48 30 46 40 L46 58 L53 58 L53 48 L61 48 L61 58 Z"/><path d="M48 38 Q42 30 45 22" fill="none" stroke="#e2e8f0" stroke-width="4" stroke-linecap="round"/></g><path d="M34 18 L46 18 L44 26 L36 26 Z" fill="#fbbf24" stroke="#92400e" stroke-width="1.2"/><circle cx="40" cy="54" r="7" fill="#ec4899" stroke="#fde047" stroke-width="1.5"/></svg>'
    },
    {
      id: 'santana',
      name: 'Santana Lakshmi',
      symbol: 'Nurturing Cradle & Child Emblem',
      significance: 'Goddess of Family Harmony & Future Generations',
      desc: 'Santana Lakshmi protects children and nurtures loving family bonds, blessing homes with health, warmth, and continuity.',
      svg: '<svg viewBox="0 0 80 80" width="56" height="56" aria-hidden="true"><path d="M18 44 Q40 66 62 44" fill="#b45309" stroke="#fde047" stroke-width="2.5"/><path d="M22 44 Q40 54 58 44" fill="#fef3c7"/><circle cx="40" cy="36" r="8" fill="#fdba74" stroke="#92400e" stroke-width="1.5"/><circle cx="37" cy="35" r="1.2" fill="#1c1917"/><circle cx="43" cy="35" r="1.2" fill="#1c1917"/><path d="M37 39 Q40 42 43 39" fill="none" stroke="#92400e" stroke-width="1.3"/><path d="M40 14 C44 18 48 22 40 28 C32 22 36 18 40 14Z" fill="#f43f5e" stroke="#fde047" stroke-width="1.2"/></svg>'
    },
    {
      id: 'veera',
      name: 'Veera Lakshmi',
      symbol: 'Traditional Golden Shield',
      significance: 'Goddess of Courage & Inner Strength',
      desc: 'Veera Lakshmi grants fearlessness, patience, and resilience to overcome life’s challenges with confidence and righteousness.',
      svg: '<svg viewBox="0 0 80 80" width="56" height="56" aria-hidden="true"><path d="M40 12 L62 22 L60 44 Q58 60 40 68 Q22 60 20 44 L18 22 Z" fill="#991b1b" stroke="#fbbf24" stroke-width="2.8"/><circle cx="40" cy="40" r="13" fill="#f59e0b" stroke="#fef08a" stroke-width="1.8"/><polygon points="40,29 43,37 51,40 43,43 40,51 37,43 29,40 37,37" fill="#fef08a"/></svg>'
    },
    {
      id: 'vijaya',
      name: 'Vijaya Lakshmi',
      symbol: 'Sacred Victory Banner',
      significance: 'Goddess of Triumph & Perseverance',
      desc: 'Vijaya Lakshmi inspires victory in noble efforts — not only over obstacles, but also over doubt, fear, and discouragement.',
      svg: '<svg viewBox="0 0 80 80" width="56" height="56" aria-hidden="true"><line x1="24" y1="12" x2="24" y2="68" stroke="#fbbf24" stroke-width="4" stroke-linecap="round"/><circle cx="24" cy="11" r="4" fill="#fde047"/><path d="M26 16 L64 24 L52 34 L64 44 L26 48 Z" fill="#dc2626" stroke="#fde047" stroke-width="2"/><circle cx="40" cy="32" r="6" fill="#fde047"/><rect x="18" y="64" width="12" height="5" rx="2" fill="#b45309"/></svg>'
    },
    {
      id: 'vidya',
      name: 'Vidya Lakshmi',
      symbol: 'Sacred Grantha Scripture',
      significance: 'Goddess of Knowledge, Arts & Wisdom',
      desc: 'Vidya Lakshmi illuminates the mind with curiosity, learning, music, and humility — reminding us that true wealth is wisdom.',
      svg: '<svg viewBox="0 0 80 80" width="56" height="56" aria-hidden="true"><path d="M14 24 Q27 18 40 26 Q53 18 66 24 L66 56 Q53 50 40 58 Q27 50 14 56 Z" fill="#fef3c7" stroke="#d97706" stroke-width="2.5"/><line x1="40" y1="26" x2="40" y2="58" stroke="#b45309" stroke-width="2"/><line x1="20" y1="34" x2="34" y2="33" stroke="#92400e" stroke-width="1.8"/><line x1="20" y1="42" x2="34" y2="41" stroke="#92400e" stroke-width="1.8"/><line x1="46" y1="33" x2="60" y2="34" stroke="#92400e" stroke-width="1.8"/><line x1="46" y1="41" x2="60" y2="42" stroke="#92400e" stroke-width="1.8"/><circle cx="40" cy="14" r="4.5" fill="#fde047" stroke="#f59e0b" stroke-width="1.5"/></svg>'
    }
  ];

  var LOTUS_BACK_SVG = '<svg viewBox="0 0 80 80" width="46" height="46" aria-hidden="true"><circle cx="40" cy="40" r="32" fill="none" stroke="#fbbf24" stroke-width="1.6" stroke-dasharray="4 3"/><path d="M40 16 C46 28 46 42 40 52 C34 42 34 28 40 16Z" fill="#fbbf24" opacity="0.9"/><path d="M40 52 C27 46 22 34 25 24 C32 31 36 41 40 52Z" fill="#f59e0b" opacity="0.85"/><path d="M40 52 C53 46 58 34 55 24 C48 31 44 41 40 52Z" fill="#f59e0b" opacity="0.85"/><circle cx="40" cy="57" r="3.5" fill="#fde047"/></svg>';

  var DIFFS = {
    easy: { label: 'Easy', pairs: 4, secs: 60, cols: 4 },
    medium: { label: 'Medium', pairs: 6, secs: 90, cols: 4 },
    hard: { label: 'Hard', pairs: 8, secs: 120, cols: 4 }
  };

  function injectCSS() {
    if (document.getElementById('al-quest-css')) return;
    var s = document.createElement('style');
    s.id = 'al-quest-css';
    s.textContent =
      '.al-stage{position:relative;background:radial-gradient(circle at 50% 0%,#7f1d1d 0%,#450a0a 58%,#220408 100%);border:2px solid #d4af37;border-radius:20px;padding:16px;color:#fffbeb;overflow:hidden;box-shadow:0 12px 32px rgba(0,0,0,0.45)}' +
      '.al-petal{position:absolute;top:-16px;width:10px;height:14px;background:radial-gradient(circle,#fbcfe8,#ec4899);border-radius:60% 40% 60% 40%;opacity:0.55;pointer-events:none;animation:alPetalFall linear infinite}' +
      '@keyframes alPetalFall{0%{transform:translateY(0) rotate(0deg);opacity:0}15%{opacity:0.6}90%{opacity:0.45}100%{transform:translateY(520px) rotate(260deg);opacity:0}}' +
      '.al-hud{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-bottom:12px;position:relative;z-index:2}' +
      '.al-pill{background:#2d0812;border:1.5px solid #d4af37;color:#fef3c7;border-radius:999px;padding:5px 12px;font-size:0.82rem;font-weight:800}' +
      '.al-grid{display:grid;gap:10px;margin:0 auto;position:relative;z-index:2;max-width:460px}' +
      '.al-card{aspect-ratio:1/1.08;perspective:900px;background:transparent;border:none;padding:0;cursor:pointer;position:relative}' +
      '.al-card-inner{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .46s cubic-bezier(.22,.61,.36,1)}' +
      '.al-card.flipped .al-card-inner,.al-card.matched .al-card-inner{transform:rotateY(180deg)}' +
      '.al-face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:6px;box-sizing:border-box}' +
      '.al-back{background:linear-gradient(145deg,#6b0f24,#3b0712);border:2px solid #d4af37;box-shadow:inset 0 0 12px rgba(251,191,36,0.22)}' +
      '.al-front{background:linear-gradient(160deg,#fffbeb,#fef3c7);border:2px solid #d97706;color:#450a0a;transform:rotateY(180deg)}' +
      '.al-card.matched .al-front{border-color:#fbbf24;box-shadow:0 0 18px rgba(251,191,36,0.72),inset 0 0 10px rgba(245,158,11,0.28)}' +
      '.al-card-name{font-size:0.7rem;font-weight:800;line-height:1.15;margin-top:3px;color:#78350f;text-align:center}' +
      '.al-knowledge{position:relative;z-index:2;margin-top:12px;background:#fffbeb;color:#450a0a;border:2px solid #d4af37;border-radius:14px;padding:12px 14px;text-align:left;animation:alFadeIn .3s ease}' +
      '@keyframes alFadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}' +
      '.al-diff-btn{background:#2d0812;color:#fef3c7;border:2px solid #d4af37;border-radius:14px;padding:12px 14px;cursor:pointer;text-align:center;flex:1 1 130px;font-weight:800;transition:transform .15s,background .15s}' +
      '.al-diff-btn:hover{background:#7f1d1d;transform:translateY(-2px)}' +
      '.al-summary-list{max-height:210px;overflow:auto;display:grid;gap:8px;margin-top:10px;text-align:left}' +
      '@media(max-width:480px){.al-grid{gap:7px}.al-card-name{font-size:0.62rem}.al-stage{padding:12px}}' +
      '@media(prefers-reduced-motion:reduce){.al-petal{display:none!important}.al-card-inner{transition:none!important}}';
    document.head.appendChild(s);
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function fmtTime(sec) {
    var m = Math.floor(sec / 60), s = sec % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  FG.E.ashtaLakshmi = function (ctx) {
    injectCSS();
    var hintEl = document.querySelector('#fg-main .fg-hint');
    if (hintEl) hintEl.style.display = 'none';

    var wrap = ctx.el;
    var activeTimer = null;
    var flipTimer = null;
    var dead = false;

    function clearTimers() {
      if (activeTimer) { clearInterval(activeTimer); activeTimer = null; }
      if (flipTimer) { clearTimeout(flipTimer); flipTimer = null; }
    }
    ctx.on(function () { dead = true; clearTimers(); });

    function petalsHtml() {
      var out = '';
      for (var i = 0; i < 8; i++) {
        out += '<span class="al-petal" style="left:' + (8 + i * 12) + '%;animation-duration:' + (7 + (i % 4) * 1.8) + 's;animation-delay:' + (i * 0.7) + 's;"></span>';
      }
      return out;
    }

    function showIntro() {
      clearTimers();
      wrap.innerHTML =
        '<div class="al-stage">' + petalsHtml() +
          '<div style="position:relative;z-index:2;text-align:center;">' +
            '<div style="font-size:2.3rem;">🪷</div>' +
            '<h2 style="margin:4px 0;color:#fde047;">Ashta Lakshmi – The Divine Memory Quest</h2>' +
            '<p style="font-size:0.9rem;color:#fef3c7;margin:6px 0 12px;line-height:1.5;">Enter the sacred temple sanctum! Behind the golden lotus cards lie the sacred symbols of the <b>eight forms of Ashta Lakshmi</b>. Flip two cards at a time, match every pair before time runs out, and unlock their cultural wisdom.</p>' +
            '<div style="background:#2d0812;border:1px solid #d4af37;border-radius:12px;padding:10px 12px;font-size:0.84rem;color:#fde68a;margin-bottom:14px;">' +
              '<b>How to Play:</b> Tap any two lotus cards to reveal them. Matching pairs stay lit and unlock sacred knowledge. Mismatched pairs flip back after a moment.' +
            '</div>' +
            '<div style="font-weight:800;color:#fde047;margin-bottom:8px;">Select Difficulty Level</div>' +
            '<div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;">' +
              '<button type="button" class="al-diff-btn" data-d="easy"><div style="font-size:1.05rem;color:#fde047;">🌸 Easy</div><div style="font-size:0.78rem;margin-top:3px;">4 Pairs (8 Cards) · 60s</div></button>' +
              '<button type="button" class="al-diff-btn" data-d="medium"><div style="font-size:1.05rem;color:#fde047;">🪔 Medium</div><div style="font-size:0.78rem;margin-top:3px;">6 Pairs (12 Cards) · 90s</div></button>' +
              '<button type="button" class="al-diff-btn" data-d="hard"><div style="font-size:1.05rem;color:#fde047;">👑 Hard</div><div style="font-size:0.78rem;margin-top:3px;">8 Pairs (16 Cards) · 120s</div></button>' +
            '</div>' +
          '</div>' +
        '</div>';

      var btns = wrap.querySelectorAll('.al-diff-btn');
      for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', function () {
          startRound(this.getAttribute('data-d'));
        });
      }
    }

    function startRound(diffKey) {
      clearTimers();
      var diff = DIFFS[diffKey] || DIFFS.hard;
      var chosenForms = shuffle(FORMS).slice(0, diff.pairs);
      var deck = shuffle(chosenForms.concat(chosenForms)).map(function (f, idx) {
        return { uid: idx, form: f, matched: false };
      });

      var timeLeft = diff.secs;
      var attempts = 0;
      var matchedPairs = 0;
      var openCards = [];
      var locked = false;
      var unlockedList = [];

      wrap.innerHTML =
        '<div class="al-stage">' + petalsHtml() +
          '<div class="al-hud">' +
            '<span class="al-pill">🏛️ ' + diff.label + '</span>' +
            '<span class="al-pill" id="al-timer">⏱ ' + fmtTime(timeLeft) + '</span>' +
            '<span class="al-pill" id="al-pairs">🪷 Pairs: 0/' + diff.pairs + '</span>' +
            '<span class="al-pill" id="al-attempts">🎯 Attempts: 0</span>' +
          '</div>' +
          '<div class="al-grid" id="al-grid" style="grid-template-columns:repeat(' + diff.cols + ',1fr);">' +
            deck.map(function (c, i) {
              return '<button type="button" class="al-card" data-idx="' + i + '" aria-label="Hidden sacred card">' +
                '<div class="al-card-inner">' +
                  '<div class="al-face al-back">' + LOTUS_BACK_SVG + '</div>' +
                  '<div class="al-face al-front">' + c.form.svg + '<div class="al-card-name">' + c.form.name + '</div></div>' +
                '</div>' +
              '</button>';
            }).join('') +
          '</div>' +
          '<div id="al-knowledge-slot"></div>' +
          '<div style="text-align:center;margin-top:10px;position:relative;z-index:2;">' +
            '<button type="button" id="al-restart-btn" style="background:#2d0812;color:#fde047;border:1.5px solid #d4af37;border-radius:999px;padding:6px 14px;font-size:0.78rem;font-weight:800;cursor:pointer;">↻ Change Difficulty</button>' +
          '</div>' +
        '</div>';

      wrap.querySelector('#al-restart-btn').addEventListener('click', showIntro);

      var timerEl = wrap.querySelector('#al-timer');
      var pairsEl = wrap.querySelector('#al-pairs');
      var attEl = wrap.querySelector('#al-attempts');
      var kSlot = wrap.querySelector('#al-knowledge-slot');
      var cardEls = wrap.querySelectorAll('.al-card');

      activeTimer = setInterval(function () {
        if (dead) { clearTimers(); return; }
        timeLeft--;
        if (timerEl) timerEl.textContent = '⏱ ' + fmtTime(Math.max(0, timeLeft));
        if (timeLeft <= 0) {
          clearTimers();
          locked = true;
          showTimeUp(diffKey, matchedPairs, diff.pairs, attempts);
        }
      }, 1000);

      function renderKnowledge(f) {
        if (!kSlot) return;
        kSlot.innerHTML =
          '<div class="al-knowledge">' +
            '<div style="display:flex;align-items:center;gap:10px;">' +
              '<div style="flex-shrink:0;">' + f.svg + '</div>' +
              '<div>' +
                '<div style="font-size:0.75rem;font-weight:800;color:#b45309;text-transform:uppercase;letter-spacing:0.4px;">✨ Sacred Knowledge Unlocked</div>' +
                '<div style="font-size:1.02rem;font-weight:900;color:#450a0a;">' + f.name + ' · <span style="color:#92400e;font-weight:700;">' + f.symbol + '</span></div>' +
                '<div style="font-size:0.82rem;font-weight:700;color:#7f1d1d;margin-top:2px;">' + f.significance + '</div>' +
              '</div>' +
            '</div>' +
            '<p style="margin:8px 0 0;font-size:0.86rem;line-height:1.45;color:#1c1917;">' + f.desc + '</p>' +
          '</div>';
      }

      for (var i = 0; i < cardEls.length; i++) {
        cardEls[i].addEventListener('click', function () {
          if (locked || dead) return;
          var idx = parseInt(this.getAttribute('data-idx'), 10);
          var card = deck[idx];
          if (!card || card.matched) return;
          if (openCards.length === 1 && openCards[0].idx === idx) return;

          this.classList.add('flipped');
          FG.tone(520, 0.08, 'sine');
          openCards.push({ idx: idx, el: this, card: card });

          if (openCards.length === 2) {
            locked = true;
            attempts++;
            if (attEl) attEl.textContent = '🎯 Attempts: ' + attempts;

            var c1 = openCards[0], c2 = openCards[1];
            if (c1.card.form.id === c2.card.form.id) {
              c1.card.matched = true;
              c2.card.matched = true;
              c1.el.classList.add('matched');
              c2.el.classList.add('matched');
              matchedPairs++;
              if (pairsEl) pairsEl.textContent = '🪷 Pairs: ' + matchedPairs + '/' + diff.pairs;
              FG.tone(784, 0.16, 'triangle');
              unlockedList.push(c1.card.form);
              renderKnowledge(c1.card.form);
              openCards = [];
              locked = false;

              if (matchedPairs === diff.pairs) {
                clearTimers();
                var timeTaken = diff.secs - timeLeft;
                flipTimer = setTimeout(function () {
                  if (!dead) showCompletion(diffKey, diff.pairs, attempts, timeTaken, unlockedList);
                }, 750);
              }
            } else {
              FG.tone(240, 0.14, 'sawtooth');
              flipTimer = setTimeout(function () {
                if (dead) return;
                c1.el.classList.remove('flipped');
                c2.el.classList.remove('flipped');
                openCards = [];
                locked = false;
              }, 850);
            }
          }
        });
      }
    }

    function showTimeUp(diffKey, matchedPairs, totalPairs, attempts) {
      wrap.innerHTML =
        '<div class="al-stage" style="text-align:center;">' + petalsHtml() +
          '<div style="position:relative;z-index:2;padding:14px 6px;">' +
            '<div style="font-size:2.5rem;">⏳</div>' +
            '<h2 style="color:#fde047;margin:6px 0;">Time’s Up in the Sanctum!</h2>' +
            '<p style="color:#fef3c7;font-size:0.92rem;">You matched <b>' + matchedPairs + ' of ' + totalPairs + '</b> sacred pairs in <b>' + attempts + '</b> attempts.</p>' +
            '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:14px;">' +
              '<button type="button" class="fg-btn" id="al-retry" style="background:#fbbf24;color:#450a0a;">↻ Try Again</button>' +
              '<button type="button" class="fg-btn alt" id="al-chg">Change Difficulty</button>' +
            '</div>' +
          '</div>' +
        '</div>';
      wrap.querySelector('#al-retry').addEventListener('click', function () { startRound(diffKey); });
      wrap.querySelector('#al-chg').addEventListener('click', showIntro);
    }

    function showCompletion(diffKey, totalPairs, attempts, timeTaken, unlockedList) {
      var accuracy = Math.min(100, Math.round((totalPairs / Math.max(1, attempts)) * 100));
      var stars = accuracy >= 80 ? 3 : (accuracy >= 55 ? 2 : 1);

      // Save progress & award Festora Coins cleanly
      try {
        FG.ST.done.varamahalakshmi = FG.ST.done.varamahalakshmi || {};
        var rec = FG.ST.done.varamahalakshmi[ctx.n] || { best: 0, stars: 0, plays: 0 };
        var first = !rec.plays;
        rec.plays++;
        rec.best = Math.max(rec.best, accuracy);
        rec.stars = Math.max(rec.stars, stars);
        FG.ST.done.varamahalakshmi[ctx.n] = rec;
        FG.ST.xp += 20 + stars * 10;
        FG.save();
        if (first && typeof window.addCoins === 'function') window.addCoins(25, 'Ashta Lakshmi Memory Master');
      } catch (e) {}

      FG.tone(880, 0.25, 'sine');
      wrap.innerHTML =
        '<div class="al-stage" style="text-align:center;">' + petalsHtml() +
          '<div style="position:relative;z-index:2;">' +
            '<div style="font-size:2.6rem;">🏆</div>' +
            '<div style="display:inline-block;background:#fbbf24;color:#450a0a;font-weight:900;font-size:0.78rem;padding:4px 12px;border-radius:999px;margin-bottom:6px;">SPECIAL ACHIEVEMENT UNLOCKED</div>' +
            '<h2 style="margin:2px 0;color:#fde047;">Ashta Lakshmi Memory Master</h2>' +
            '<div style="font-size:1.5rem;margin:4px 0;">' + '⭐'.repeat(stars) + '☆'.repeat(3 - stars) + '</div>' +
            '<div class="al-hud" style="margin-top:10px;">' +
              '<span class="al-pill">⏱ Time: ' + timeTaken + 's</span>' +
              '<span class="al-pill">🎯 Attempts: ' + attempts + '</span>' +
              '<span class="al-pill">✨ Accuracy: ' + accuracy + '%</span>' +
              '<span class="al-pill">🪷 Pairs: ' + totalPairs + '/' + totalPairs + '</span>' +
            '</div>' +
            '<div style="background:#fffbeb;color:#450a0a;border:2px solid #d4af37;border-radius:14px;padding:12px;margin-top:10px;text-align:left;">' +
              '<div style="font-weight:900;color:#7f1d1d;font-size:0.9rem;">📜 Sacred Knowledge Summary</div>' +
              '<div class="al-summary-list">' +
                unlockedList.map(function (f) {
                  return '<div style="display:flex;align-items:center;gap:8px;padding:6px 8px;background:#fef3c7;border-radius:10px;border:1px solid #f59e0b;">' +
                    '<div style="flex-shrink:0;transform:scale(0.68);margin:-10px;">' + f.svg + '</div>' +
                    '<div><b style="color:#450a0a;font-size:0.84rem;">' + f.name + '</b> <span style="font-size:0.76rem;color:#92400e;">(' + f.symbol + ')</span><div style="font-size:0.75rem;color:#1c1917;">' + f.significance + '</div></div>' +
                  '</div>';
                }).join('') +
              '</div>' +
            '</div>' +
            '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:14px;">' +
              '<button type="button" class="fg-btn" id="al-replay" style="background:#fbbf24;color:#450a0a;">↻ Play Again</button>' +
              '<button type="button" class="fg-btn alt" id="al-exit">← Back to Games</button>' +
            '</div>' +
          '</div>' +
        '</div>';

      wrap.querySelector('#al-replay').addEventListener('click', showIntro);
      wrap.querySelector('#al-exit').addEventListener('click', function () { FG.exit(); });
    }

    showIntro();
  };
})();
