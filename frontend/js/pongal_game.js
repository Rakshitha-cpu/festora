/* ===== FESTORA – SAKKARAI PONGAL: TRADITIONAL CLAY POT RITUAL (EXCLUSIVELY FOR PONGAL) ===== */
(function () {
  'use strict';
  var FG = window.FG;
  if (!FG || !FG.E) return;

  FG.ENG_LABEL = FG.ENG_LABEL || {};
  FG.HOW = FG.HOW || {};
  FG.ENG_LABEL.sweetPongal = 'Traditional Cooking';
  FG.HOW.sweetPongal = 'Stoke the firewood under the decorated clay pot, add real Sakkarai Pongal ingredients in order, stir gently, and celebrate the auspicious overflow!';

  var INGREDIENTS = [
    { id: 'milk', name: 'Fresh Milk', ta: 'Paal', color: '#fffbeb', icon: '🥛', note: 'Fresh milk is boiled first until it rises to the rim.' },
    { id: 'rice', name: 'New Harvest Rice', ta: 'Pacharisi', color: '#fef9c3', icon: '🍚', note: 'Newly harvested raw rice honors the farmers and Sun God.' },
    { id: 'dal', name: 'Moong Dal', ta: 'Paasi Paruppu', color: '#fde047', icon: '🟡', note: 'Roasted split yellow moong dal gives a creamy, rich base.' },
    { id: 'jaggery', name: 'Cane Jaggery', ta: 'Vellam', color: '#92400e', icon: '🟫', note: 'Melted jaggery gives Sakkarai Pongal its deep golden sweetness.' },
    { id: 'ghee', name: 'Ghee & Cashews', ta: 'Nei & Munthiri', color: '#f59e0b', icon: '🧈', note: 'Pure ghee, roasted cashews, and cardamom complete the prasad.' }
  ];

  function injectCSS() {
    if (document.getElementById('sp-pongal-css')) return;
    var s = document.createElement('style');
    s.id = 'sp-pongal-css';
    s.textContent =
      '.sp-stage{position:relative;background:linear-gradient(180deg,#fef3c7 0%,#fed7aa 55%,#7c2d12 100%);border:2px solid #d97706;border-radius:20px;padding:14px;color:#451a03;overflow:hidden;box-shadow:0 12px 30px rgba(0,0,0,0.38)}' +
      '.sp-hud{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-bottom:10px}' +
      '.sp-pill{background:#451a03;color:#fef3c7;border:1.5px solid #f59e0b;border-radius:999px;padding:4px 12px;font-size:0.8rem;font-weight:800}' +
      '.sp-cv{width:100%;max-width:440px;height:auto;display:block;margin:0 auto;border-radius:16px;border:2px solid #b45309;background:#fff7ed}' +
      '.sp-guide{background:#fffbeb;border:1.5px solid #d97706;border-radius:12px;padding:10px 12px;margin:10px auto 0;max-width:440px;text-align:center}' +
      '.sp-ing-row{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:10px}' +
      '.sp-ing-btn{background:#fffbeb;color:#451a03;border:2px solid #d97706;border-radius:12px;padding:8px 10px;cursor:pointer;font-weight:800;font-size:0.78rem;display:flex;flex-direction:column;align-items:center;min-width:78px;transition:transform .12s,background .12s}' +
      '.sp-ing-btn:hover:not(:disabled){transform:translateY(-2px);background:#fef3c7}' +
      '.sp-ing-btn.done{background:#dcfce7;border-color:#16a34a;color:#14532d;opacity:0.85}' +
      '.sp-ing-btn.next{border-color:#dc2626;box-shadow:0 0 0 2px rgba(220,38,38,0.28)}' +
      '.sp-act-btn{background:#b45309;color:#ffffff;border:none;border-radius:999px;padding:10px 18px;font-size:0.88rem;font-weight:800;cursor:pointer;user-select:none;touch-action:manipulation}' +
      '.sp-act-btn:active{transform:scale(0.96)}' +
      '@media(max-width:480px){.sp-ing-btn{min-width:64px;padding:6px 7px;font-size:0.72rem}}';
    document.head.appendChild(s);
  }

  FG.E.sweetPongal = function (ctx) {
    injectCSS();
    var hintEl = document.querySelector('#fg-main .fg-hint');
    if (hintEl) hintEl.style.display = 'none';

    var wrap = ctx.el;
    var dead = false;
    var raf = 0;

    ctx.on(function () {
      dead = true;
      if (raf) cancelAnimationFrame(raf);
    });

    function showGame() {
      var step = 0; // 0..4 ingredients, 5 = final boil & overflow, 6 = shout Pongalo Pongal!
      var heat = 28; // 0..100, sweet spot 45..78
      var progress = 0; // 0..100
      var stirring = false;
      var fanning = false;
      var startTime = Date.now();
      var mistakes = 0;
      var foam = 0;
      var steam = Array.from({ length: 16 }, function (_, i) {
        return { x: 185 + (i % 5) * 14, y: 120 - Math.random() * 50, vy: 0.4 + Math.random() * 0.5, r: 5 + Math.random() * 6, a: Math.random() };
      });
      var bubbles = Array.from({ length: 10 }, function () {
        return { x: 182 + Math.random() * 76, y: 122 + Math.random() * 8, r: 2 + Math.random() * 3, p: Math.random() * 6.28 };
      });

      wrap.innerHTML =
        '<div class="sp-stage">' +
          '<div class="sp-hud">' +
            '<span class="sp-pill" id="sp-step-pill">Step 1/6: Add Fresh Milk</span>' +
            '<span class="sp-pill" id="sp-heat-pill">🔥 Heat: Warm</span>' +
            '<span class="sp-pill" id="sp-prog-pill">🍲 Cooked: 0%</span>' +
          '</div>' +
          '<canvas class="sp-cv" id="sp-canvas" width="440" height="270"></canvas>' +
          '<div class="sp-guide">' +
            '<div id="sp-msg" style="font-weight:800;font-size:0.9rem;color:#7c2d12;">Tap <b>🥛 Fresh Milk</b> to pour it into the decorated clay Pongal pot!</div>' +
            '<div id="sp-sub" style="font-size:0.78rem;color:#92400e;margin-top:3px;">Keep the firewood warm and stir gently with the wooden ladle.</div>' +
          '</div>' +
          '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:10px;" id="sp-controls">' +
            '<button type="button" class="sp-act-btn" id="sp-fan-btn" style="background:#dc2626;">🔥 Hold: Fan Fire</button>' +
            '<button type="button" class="sp-act-btn" id="sp-stir-btn" style="background:#92400e;">🥄 Hold: Stir Pot</button>' +
            '<button type="button" class="sp-act-btn" id="sp-shout-btn" style="display:none;background:#15803d;">🎉 Shout: Pongalo Pongal!</button>' +
          '</div>' +
          '<div class="sp-ing-row" id="sp-ings">' +
            INGREDIENTS.map(function (ing, idx) {
              return '<button type="button" class="sp-ing-btn ' + (idx === 0 ? 'next' : '') + '" data-idx="' + idx + '">' +
                '<span style="font-size:1.35rem;">' + ing.icon + '</span>' +
                '<span style="margin-top:2px;">' + ing.name + '</span>' +
                '<span style="font-size:0.66rem;color:#92400e;">' + ing.ta + '</span>' +
              '</button>';
            }).join('') +
          '</div>' +
        '</div>';

      var cv = wrap.querySelector('#sp-canvas');
      var gctx = cv.getContext('2d');
      var msgEl = wrap.querySelector('#sp-msg');
      var subEl = wrap.querySelector('#sp-sub');
      var stepPill = wrap.querySelector('#sp-step-pill');
      var heatPill = wrap.querySelector('#sp-heat-pill');
      var progPill = wrap.querySelector('#sp-prog-pill');
      var fanBtn = wrap.querySelector('#sp-fan-btn');
      var stirBtn = wrap.querySelector('#sp-stir-btn');
      var shoutBtn = wrap.querySelector('#sp-shout-btn');
      var ingBtns = wrap.querySelectorAll('.sp-ing-btn');

      fanBtn.addEventListener('pointerdown', function () { fanning = true; });
      fanBtn.addEventListener('pointerup', function () { fanning = false; });
      fanBtn.addEventListener('pointerleave', function () { fanning = false; });
      fanBtn.addEventListener('pointercancel', function () { fanning = false; });

      stirBtn.addEventListener('pointerdown', function () { stirring = true; });
      stirBtn.addEventListener('pointerup', function () { stirring = false; });
      stirBtn.addEventListener('pointerleave', function () { stirring = false; });
      stirBtn.addEventListener('pointercancel', function () { stirring = false; });

      function updateIngButtons() {
        for (var i = 0; i < ingBtns.length; i++) {
          ingBtns[i].classList.remove('next', 'done');
          if (i < step) { ingBtns[i].classList.add('done'); ingBtns[i].disabled = true; }
          else if (i === step) ingBtns[i].classList.add('next');
        }
      }

      for (var i = 0; i < ingBtns.length; i++) {
        ingBtns[i].addEventListener('click', function () {
          if (dead || step >= INGREDIENTS.length) return;
          var idx = parseInt(this.getAttribute('data-idx'), 10);
          if (idx !== step) {
            mistakes++;
            FG.tone(220, 0.12, 'sawtooth');
            msgEl.textContent = 'Add ' + INGREDIENTS[step].icon + ' ' + INGREDIENTS[step].name + ' (' + INGREDIENTS[step].ta + ') next!';
            return;
          }
          var ing = INGREDIENTS[step];
          FG.tone(587, 0.14, 'triangle');
          step++;
          progress = Math.min(85, step * 16);
          updateIngButtons();
          if (step < INGREDIENTS.length) {
            stepPill.textContent = 'Step ' + (step + 1) + '/6: Add ' + INGREDIENTS[step].name;
            msgEl.textContent = 'Added ' + ing.icon + ' ' + ing.name + '! Now add ' + INGREDIENTS[step].icon + ' ' + INGREDIENTS[step].name + '.';
            subEl.textContent = ing.note;
          } else {
            stepPill.textContent = 'Step 6/6: Bring to Auspicious Boil!';
            msgEl.textContent = 'All ingredients are in! Hold 🔥 Fan Fire & 🥄 Stir Pot until it boils over!';
            subEl.textContent = 'Watch the creamy golden Sakkarai Pongal rise to the rim!';
          }
        });
      }

      shoutBtn.addEventListener('click', function () {
        if (dead || step !== 6) return;
        FG.tone(880, 0.25, 'sine');
        var sec = Math.max(5, Math.round((Date.now() - startTime) / 1000));
        var score = Math.max(60, 100 - mistakes * 6);
        showDone(sec, score);
      });

      var lastT = performance.now();
      function draw(now) {
        if (dead) return;
        var dt = Math.min(0.05, (now - lastT) / 1000);
        lastT = now;

        // Heat & cooking physics
        if (fanning) heat = Math.min(100, heat + 32 * dt);
        else heat = Math.max(15, heat - 9 * dt);
        if (stirring) heat = Math.max(20, heat - 6 * dt);

        if (step === 5) {
          if (heat >= 45) progress = Math.min(100, progress + (stirring ? 14 : 9) * dt);
          if (progress >= 100) {
            step = 6;
            foam = 1;
            shoutBtn.style.display = 'inline-block';
            stepPill.textContent = '🎉 Pongal is Overflowing!';
            msgEl.textContent = 'The clay pot is overflowing! Tap "🎉 Shout: Pongalo Pongal!" to offer it to Surya!';
            subEl.textContent = 'In Tamil tradition, overflowing milk & rice symbolizes boundless prosperity.';
            FG.tone(740, 0.2, 'triangle');
          }
        }

        heatPill.textContent = heat < 40 ? '🔥 Heat: Low' : (heat <= 80 ? '🔥 Heat: Ideal' : '🔥 Heat: High!');
        progPill.textContent = '🍲 Cooked: ' + Math.round(progress) + '%';

        var w = cv.width, h = cv.height;
        gctx.clearRect(0, 0, w, h);

        // Sunrise Tamil courtyard sky
        var sky = gctx.createLinearGradient(0, 0, 0, h);
        sky.addColorStop(0, '#fed7aa'); sky.addColorStop(0.65, '#fff7ed'); sky.addColorStop(1, '#d97706');
        gctx.fillStyle = sky; gctx.fillRect(0, 0, w, h);

        // Rising Surya (Sun)
        gctx.fillStyle = '#fbbf24';
        gctx.beginPath(); gctx.arc(220, 62, 34, 0, Math.PI * 2); gctx.fill();
        gctx.strokeStyle = 'rgba(245,158,11,0.45)'; gctx.lineWidth = 3;
        for (var r = 0; r < 12; r++) {
          var ang = (r / 12) * Math.PI * 2 + now * 0.0003;
          gctx.beginPath();
          gctx.moveTo(220 + Math.cos(ang) * 40, 62 + Math.sin(ang) * 40);
          gctx.lineTo(220 + Math.cos(ang) * 52, 62 + Math.sin(ang) * 52);
          gctx.stroke();
        }

        // Courtyard floor + Kolam border
        gctx.fillStyle = '#b45309'; gctx.fillRect(0, 212, w, 58);
        gctx.fillStyle = '#ffffff';
        for (var k = 0; k < 11; k++) {
          gctx.beginPath(); gctx.arc(22 + k * 40, 245, 3, 0, Math.PI * 2); gctx.fill();
        }

        // Two tall green Sugarcane stalks framing the pot
        [72, 368].forEach(function (sx) {
          gctx.fillStyle = '#15803d'; gctx.fillRect(sx - 6, 35, 12, 185);
          gctx.strokeStyle = '#fef08a'; gctx.lineWidth = 2;
          for (var seg = 60; seg <= 200; seg += 28) {
            gctx.beginPath(); gctx.moveTo(sx - 7, seg); gctx.lineTo(sx + 7, seg); gctx.stroke();
          }
          gctx.fillStyle = '#16a34a';
          gctx.beginPath(); gctx.ellipse(sx - 18, 42, 18, 6, -0.4, 0, Math.PI * 2); gctx.fill();
          gctx.beginPath(); gctx.ellipse(sx + 18, 42, 18, 6, 0.4, 0, Math.PI * 2); gctx.fill();
        });

        // Traditional Mud Stove (Aduppu) & Firewood Flames
        gctx.fillStyle = '#78350f';
        gctx.beginPath();
        gctx.moveTo(155, 222); gctx.lineTo(172, 185); gctx.lineTo(268, 185); gctx.lineTo(285, 222);
        gctx.closePath(); gctx.fill();
        gctx.fillStyle = '#291509'; gctx.fillRect(190, 195, 60, 27);

        // Animated flames
        var fScale = 0.5 + (heat / 100) * 0.9;
        for (var fi = -1; fi <= 1; fi++) {
          var fx = 220 + fi * 14, fy = 216;
          var fh = (14 + Math.sin(now * 0.015 + fi) * 4) * fScale;
          gctx.fillStyle = '#f97316';
          gctx.beginPath(); gctx.moveTo(fx - 7, fy); gctx.quadraticCurveTo(fx, fy - fh * 1.4, fx + 7, fy); gctx.fill();
          gctx.fillStyle = '#fde047';
          gctx.beginPath(); gctx.moveTo(fx - 3.5, fy); gctx.quadraticCurveTo(fx, fy - fh * 0.9, fx + 3.5, fy); gctx.fill();
        }

        // Traditional Terracotta Clay Pot (Pongal Paanai)
        var potGrad = gctx.createRadialGradient(204, 152, 10, 220, 160, 56);
        potGrad.addColorStop(0, '#ea580c'); potGrad.addColorStop(0.7, '#c2410c'); potGrad.addColorStop(1, '#7c2d12');
        gctx.fillStyle = potGrad;
        gctx.beginPath(); gctx.ellipse(220, 162, 52, 42, 0, 0, Math.PI * 2); gctx.fill();

        // White & Red Vibhuti/Kumkum festive stripes on pot
        gctx.strokeStyle = '#ffffff'; gctx.lineWidth = 3;
        gctx.beginPath(); gctx.arc(220, 152, 48, 0.25, Math.PI - 0.25); gctx.stroke();
        gctx.strokeStyle = '#dc2626'; gctx.lineWidth = 2;
        gctx.beginPath(); gctx.arc(220, 158, 46, 0.3, Math.PI - 0.3); gctx.stroke();

        // Turmeric garland tied around pot neck
        gctx.strokeStyle = '#facc15'; gctx.lineWidth = 4;
        gctx.beginPath(); gctx.ellipse(220, 128, 38, 7, 0, 0, Math.PI); gctx.stroke();

        // Pot Rim & Pongal Mixture Inside
        gctx.fillStyle = '#9a3412';
        gctx.beginPath(); gctx.ellipse(220, 122, 42, 12, 0, 0, Math.PI * 2); gctx.fill();

        var liqColor = step >= 4 ? '#d97706' : (step >= 3 ? '#fde047' : '#fffbeb');
        gctx.fillStyle = liqColor;
        gctx.beginPath(); gctx.ellipse(220, 122, 36, 9, 0, 0, Math.PI * 2); gctx.fill();

        // Overflowing foam when step === 6
        if (step === 6 || foam > 0) {
          gctx.fillStyle = '#fef3c7';
          for (var oi = 0; oi < 5; oi++) {
            var ox = 192 + oi * 14;
            var oy = 128 + Math.sin(now * 0.008 + oi) * 3;
            gctx.beginPath(); gctx.ellipse(ox, oy, 10, 14, 0, 0, Math.PI * 2); gctx.fill();
          }
        }

        // Bubbling inside pot
        if (heat > 40 && step >= 1) {
          gctx.fillStyle = 'rgba(255,255,255,0.75)';
          bubbles.forEach(function (b) {
            var r2 = b.r * (0.6 + 0.5 * Math.sin(now * 0.01 + b.p));
            gctx.beginPath(); gctx.arc(b.x, b.y, r2, 0, Math.PI * 2); gctx.fill();
          });
        }

        // Wooden Ladle stirring
        var ladleX = stirring ? 220 + Math.sin(now * 0.015) * 18 : 244;
        gctx.strokeStyle = '#78350f'; gctx.lineWidth = 5; gctx.lineCap = 'round';
        gctx.beginPath(); gctx.moveTo(ladleX, 120); gctx.lineTo(ladleX + 22, 72); gctx.stroke();

        // Rising Steam
        if (heat > 35 && step >= 1) {
          steam.forEach(function (st) {
            st.y -= st.vy * (heat / 55);
            if (st.y < 36) { st.y = 114; st.x = 185 + Math.random() * 70; }
            gctx.fillStyle = 'rgba(255,255,255,' + (0.28 * ((st.y - 36) / 78)) + ')';
            gctx.beginPath(); gctx.arc(st.x + Math.sin(now * 0.004 + st.y) * 5, st.y, st.r, 0, Math.PI * 2); gctx.fill();
          });
        }

        raf = requestAnimationFrame(draw);
      }
      raf = requestAnimationFrame(draw);
    }

    function showDone(sec, score) {
      if (raf) cancelAnimationFrame(raf);
      var stars = score >= 90 ? 3 : (score >= 75 ? 2 : 1);
      try {
        FG.ST.done.pongal = FG.ST.done.pongal || {};
        var rec = FG.ST.done.pongal[ctx.n] || { best: 0, stars: 0, plays: 0 };
        var first = !rec.plays;
        rec.plays++;
        rec.best = Math.max(rec.best, score);
        rec.stars = Math.max(rec.stars, stars);
        FG.ST.done.pongal[ctx.n] = rec;
        FG.ST.xp += 20 + stars * 10;
        FG.save();
        if (first && typeof window.addCoins === 'function') window.addCoins(25, 'Sakkarai Pongal');
      } catch (e) {}

      wrap.innerHTML =
        '<div class="sp-stage" style="text-align:center;">' +
          '<div style="font-size:2.6rem;">🍲🌞</div>' +
          '<h2 style="margin:4px 0;color:#7c2d12;">Pongalo Pongal! Sacred Prasad Ready</h2>' +
          '<div style="font-size:1.5rem;margin:4px 0;">' + '⭐'.repeat(stars) + '☆'.repeat(3 - stars) + '</div>' +
          '<div class="sp-hud" style="margin-top:8px;">' +
            '<span class="sp-pill">⏱ Time: ' + sec + 's</span>' +
            '<span class="sp-pill">✨ Perfection: ' + score + '%</span>' +
          '</div>' +
          '<div class="sp-guide" style="text-align:left;">' +
            '<b>Why Pongal Overflows:</b> Boiling fresh harvest rice, moong dal, jaggery, and ghee in a decorated clay pot until it overflows expresses gratitude to the Sun God (Surya) and nature for abundance.' +
          '</div>' +
          '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:14px;">' +
            '<button type="button" class="sp-act-btn" id="sp-replay" style="background:#b45309;">↻ Cook Again</button>' +
            '<button type="button" class="sp-act-btn" id="sp-exit" style="background:#451a03;">← Back to Games</button>' +
          '</div>' +
        '</div>';

      wrap.querySelector('#sp-replay').addEventListener('click', showGame);
      wrap.querySelector('#sp-exit').addEventListener('click', function () { FG.exit(); });
    }

    showGame();
  };
})();
