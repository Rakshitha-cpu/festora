/* ===== FESTORA – THAIPUSAM EXCLUSIVE ZERO-LAG GAMES ===== */
(function () {
  'use strict';
  var FG = window.FG;
  if (!FG || !FG.E) return;

  FG.ENG_LABEL = FG.ENG_LABEL || {};
  FG.HOW = FG.HOW || {};
  FG.ENG_LABEL.kavadiBalance = 'Kavadi Balance';
  FG.HOW.kavadiBalance = 'Tap or hold Left / Right (or Arrow keys) to keep the sacred Peacock Kavadi balanced as you walk up Palani Hill!';
  FG.ENG_LABEL.palaniClimb = 'Sacred Hill Climb';
  FG.HOW.palaniClimb = 'Alternate tapping Left Step and Right Step (or A/D, Left/Right arrows) to climb the Palani temple steps quickly!';
  FG.ENG_LABEL.velDrums = 'Urumi Drum Rhythm';
  FG.HOW.velDrums = 'Tap the 3 drum pads (or keys 1, 2, 3) when the falling beats reach the golden ring!';

  function saveWin(ctx, score) {
    try {
      FG.ST.done.thaipusam = FG.ST.done.thaipusam || {};
      var rec = FG.ST.done.thaipusam[ctx.n] || { best: 0, stars: 0, plays: 0 };
      var first = !rec.plays;
      var stars = score >= 85 ? 3 : (score >= 65 ? 2 : 1);
      rec.plays++; rec.best = Math.max(rec.best, score); rec.stars = Math.max(rec.stars, stars);
      FG.ST.done.thaipusam[ctx.n] = rec; FG.ST.xp += 20 + stars * 10; FG.save();
      if (first && typeof window.addCoins === 'function') window.addCoins(25, 'Thaipusam Game');
    } catch (e) {}
  }

  /* ---------- 1. Kavadi Balance (Smooth 60fps, Zero-Lag) ---------- */
  FG.E.kavadiBalance = function (ctx) {
    var hintEl = document.querySelector('#fg-main .fg-hint');
    if (hintEl) hintEl.style.display = 'none';

    var W = 360, H = 300;
    var angle = 0; // -1..1 (safe within -0.75..0.75)
    var vel = 0;
    var lean = 0;
    var timeLeft = 24;
    var stability = 100;
    var over = false, raf = 0, iv = null;

    ctx.el.innerHTML =
      '<div style="background:#431407;border:2px solid #f59e0b;border-radius:18px;padding:12px;color:#fffbeb;text-align:center;">' +
        '<div style="display:flex;gap:8px;justify-content:center;margin-bottom:8px;">' +
          '<span id="tp-t" style="background:#7c2d12;border:1px solid #fbbf24;border-radius:999px;padding:4px 12px;font-size:0.82rem;font-weight:800;">⏱ 24s</span>' +
          '<span id="tp-s" style="background:#7c2d12;border:1px solid #fbbf24;border-radius:999px;padding:4px 12px;font-size:0.82rem;font-weight:800;">⚖️ Balance: 100%</span>' +
        '</div>' +
        '<canvas id="tp-cv" width="' + W + '" height="' + H + '" style="width:100%;max-width:360px;height:auto;border-radius:14px;border:1.5px solid #f59e0b;display:block;margin:0 auto;background:#fff7ed;touch-action:none;"></canvas>' +
        '<div style="display:flex;gap:12px;justify-content:center;margin-top:10px;">' +
          '<button type="button" id="tp-l" style="background:#d97706;color:#fff;border:none;border-radius:14px;padding:14px 26px;font-weight:900;font-size:1rem;cursor:pointer;user-select:none;touch-action:manipulation;">◀ Lean Left</button>' +
          '<button type="button" id="tp-r" style="background:#d97706;color:#fff;border:none;border-radius:14px;padding:14px 26px;font-weight:900;font-size:1rem;cursor:pointer;user-select:none;touch-action:manipulation;">Lean Right ▶</button>' +
        '</div>' +
      '</div>';

    var cv = ctx.el.querySelector('#tp-cv');
    var g = cv.getContext('2d');
    var tEl = ctx.el.querySelector('#tp-t');
    var sEl = ctx.el.querySelector('#tp-s');
    var lBtn = ctx.el.querySelector('#tp-l');
    var rBtn = ctx.el.querySelector('#tp-r');

    function cleanup() { over = true; if (raf) cancelAnimationFrame(raf); if (iv) clearInterval(iv); }
    ctx.on(cleanup);

    lBtn.addEventListener('pointerdown', function (e) { e.preventDefault(); lean = -1; });
    rBtn.addEventListener('pointerdown', function (e) { e.preventDefault(); lean = 1; });
    function stopLean() { lean = 0; }
    lBtn.addEventListener('pointerup', stopLean); lBtn.addEventListener('pointerleave', stopLean); lBtn.addEventListener('pointercancel', stopLean);
    rBtn.addEventListener('pointerup', stopLean); rBtn.addEventListener('pointerleave', stopLean); rBtn.addEventListener('pointercancel', stopLean);
    ctx.key(function (e) {
      if (e.key === 'ArrowLeft' || e.key === 'a') { angle -= 0.14; return 1; }
      if (e.key === 'ArrowRight' || e.key === 'd') { angle += 0.14; return 1; }
    });

    iv = setInterval(function () {
      if (over) return;
      timeLeft--;
      tEl.textContent = '⏱ ' + Math.max(0, timeLeft) + 's';
      if (timeLeft <= 0) {
        cleanup();
        var sc = Math.max(60, Math.round(stability));
        saveWin(ctx, sc);
        FG.tone(880, 0.25, 'sine');
        ctx.el.innerHTML =
          '<div style="background:#431407;border:2px solid #fbbf24;border-radius:18px;padding:22px;color:#fffbeb;text-align:center;">' +
            '<div style="font-size:2.6rem;">🔱🦚</div>' +
            '<h2 style="color:#fde047;margin:6px 0;">Vel Muruga! Kavadi Delivered!</h2>' +
            '<p style="color:#fef3c7;">You carried the sacred Kavadi to Palani Temple with ' + sc + '% balance!</p>' +
            '<div style="margin-top:14px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">' +
              '<button type="button" class="fg-btn" id="tp-rp" style="background:#fbbf24;color:#431407;">↻ Play Again</button>' +
              '<button type="button" class="fg-btn alt" id="tp-ex">← Back to Games</button>' +
            '</div>' +
          '</div>';
        ctx.el.querySelector('#tp-rp').addEventListener('click', function () { FG.E.kavadiBalance(ctx); });
        ctx.el.querySelector('#tp-ex').addEventListener('click', function () { FG.exit(); });
      }
    }, 1000);

    var lastT = performance.now();
    function loop(now) {
      if (over) return;
      var dt = Math.min(0.04, (now - lastT) / 1000);
      lastT = now;

      // Gentle breeze + player control
      var breeze = Math.sin(now * 0.0022) * 0.65 + Math.cos(now * 0.0037) * 0.35;
      vel += (breeze * 0.8 + lean * 2.2) * dt;
      vel *= 0.92;
      angle += vel * dt;
      if (Math.abs(angle) > 0.72) stability = Math.max(0, stability - 16 * dt);
      sEl.textContent = '⚖️ Balance: ' + Math.round(stability) + '%';

      if (Math.abs(angle) > 1.08) {
        cleanup();
        FG.tone(180, 0.25, 'sawtooth');
        ctx.el.innerHTML =
          '<div style="background:#431407;border:2px solid #fbbf24;border-radius:18px;padding:22px;color:#fffbeb;text-align:center;">' +
            '<div style="font-size:2.4rem;">😅</div>' +
            '<h2 style="color:#fde047;margin:6px 0;">Kavadi Tilted Too Far!</h2>' +
            '<p style="color:#fef3c7;">Keep the Kavadi centered between the golden markers.</p>' +
            '<div style="margin-top:14px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">' +
              '<button type="button" class="fg-btn" id="tp-rp" style="background:#fbbf24;color:#431407;">↻ Try Again</button>' +
              '<button type="button" class="fg-btn alt" id="tp-ex">← Back to Games</button>' +
            '</div>' +
          '</div>';
        ctx.el.querySelector('#tp-rp').addEventListener('click', function () { FG.E.kavadiBalance(ctx); });
        ctx.el.querySelector('#tp-ex').addEventListener('click', function () { FG.exit(); });
        return;
      }

      // Fast, clean rendering
      g.fillStyle = '#fff7ed'; g.fillRect(0, 0, W, H);
      // Palani Hill steps
      g.fillStyle = '#fed7aa'; g.fillRect(0, 210, W, 90);
      g.fillStyle = '#fdba74'; g.fillRect(0, 245, W, 55);

      // Balance meter bar at top
      g.fillStyle = '#431407'; g.fillRect(60, 22, 240, 14);
      g.fillStyle = '#22c55e'; g.fillRect(140, 22, 80, 14);
      var pinX = 180 + angle * 110;
      g.fillStyle = Math.abs(angle) > 0.72 ? '#ef4444' : '#fde047';
      g.fillRect(pinX - 5, 18, 10, 22);

      // Devotee & Rotating Kavadi Arch
      g.save();
      g.translate(180, 195);
      // Devotee body
      g.fillStyle = '#d97706'; g.fillRect(-16, -24, 32, 48);
      g.fillStyle = '#d99b66'; g.beginPath(); g.arc(0, -38, 14, 0, Math.PI * 2); g.fill();
      // Kavadi arch
      g.rotate(angle * 0.55);
      g.strokeStyle = '#92400e'; g.lineWidth = 6;
      g.beginPath(); g.moveTo(-78, -42); g.lineTo(78, -42); g.stroke();
      g.strokeStyle = '#15803d'; g.lineWidth = 5;
      g.beginPath(); g.arc(0, -42, 68, Math.PI, Math.PI * 2); g.stroke();
      // Milk pots on both ends
      g.fillStyle = '#f59e0b';
      g.beginPath(); g.arc(-74, -30, 10, 0, Math.PI * 2); g.arc(74, -30, 10, 0, Math.PI * 2); g.fill();
      g.font = '22px serif'; g.textAlign = 'center'; g.fillText('🦚', 0, -112);
      g.restore();

      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
  };

  /* ---------- 2. Palani Hill Step Climb (Zero-Lag Tapper) ---------- */
  FG.E.palaniClimb = function (ctx) {
    var hintEl = document.querySelector('#fg-main .fg-hint');
    if (hintEl) hintEl.style.display = 'none';

    var goal = 40, steps = 0, lastSide = '', timeLeft = 28, over = false, iv = null;

    ctx.el.innerHTML =
      '<div style="background:#431407;border:2px solid #f59e0b;border-radius:18px;padding:14px;color:#fffbeb;text-align:center;">' +
        '<div style="display:flex;gap:8px;justify-content:center;margin-bottom:10px;">' +
          '<span id="pc-st" style="background:#7c2d12;border:1px solid #fbbf24;border-radius:999px;padding:4px 12px;font-size:0.82rem;font-weight:800;">🛕 Steps: 0/' + goal + '</span>' +
          '<span id="pc-tm" style="background:#7c2d12;border:1px solid #fbbf24;border-radius:999px;padding:4px 12px;font-size:0.82rem;font-weight:800;">⏱ 28s</span>' +
        '</div>' +
        '<div style="background:#fff7ed;border-radius:14px;padding:16px;border:1.5px solid #f59e0b;color:#431407;">' +
          '<div style="font-size:2.4rem;">🛕</div>' +
          '<div style="height:18px;background:#fed7aa;border-radius:999px;overflow:hidden;margin:10px 0;border:1px solid #d97706;">' +
            '<div id="pc-bar" style="height:100%;width:0%;background:linear-gradient(90deg,#f59e0b,#16a34a);transition:width .08s;"></div>' +
          '</div>' +
          '<div id="pc-msg" style="font-weight:800;font-size:0.9rem;color:#7c2d12;">Alternate Left Step & Right Step to climb Palani Hill!</div>' +
        '</div>' +
        '<div style="display:flex;gap:12px;justify-content:center;margin-top:12px;">' +
          '<button type="button" id="pc-l" style="background:#d97706;color:#fff;border:none;border-radius:14px;padding:16px 26px;font-weight:900;font-size:1rem;cursor:pointer;touch-action:manipulation;">🦶 Left Step</button>' +
          '<button type="button" id="pc-r" style="background:#b45309;color:#fff;border:none;border-radius:14px;padding:16px 26px;font-weight:900;font-size:1rem;cursor:pointer;touch-action:manipulation;">Right Step 🦶</button>' +
        '</div>' +
      '</div>';

    var stEl = ctx.el.querySelector('#pc-st');
    var tmEl = ctx.el.querySelector('#pc-tm');
    var barEl = ctx.el.querySelector('#pc-bar');
    var msgEl = ctx.el.querySelector('#pc-msg');

    function cleanup() { over = true; if (iv) clearInterval(iv); }
    ctx.on(cleanup);

    function step(side) {
      if (over) return;
      if (side === lastSide) {
        FG.tone(220, 0.06, 'square');
        msgEl.textContent = 'Alternate! Tap the ' + (side === 'L' ? 'Right' : 'Left') + ' Step!';
        return;
      }
      lastSide = side;
      steps++;
      FG.tone(420 + steps * 8, 0.06, 'triangle');
      stEl.textContent = '🛕 Steps: ' + steps + '/' + goal;
      barEl.style.width = Math.round((steps / goal) * 100) + '%';
      msgEl.textContent = steps % 2 ? 'Vel Muruga! Keep climbing!' : 'Arohara! Almost there!';
      if (steps >= goal) {
        cleanup();
        var sc = Math.min(100, 70 + timeLeft);
        saveWin(ctx, sc);
        FG.tone(880, 0.25, 'sine');
        ctx.el.innerHTML =
          '<div style="background:#431407;border:2px solid #fbbf24;border-radius:18px;padding:22px;color:#fffbeb;text-align:center;">' +
            '<div style="font-size:2.6rem;">🛕🔱</div>' +
            '<h2 style="color:#fde047;margin:6px 0;">Reached Palani Temple Peak!</h2>' +
            '<p style="color:#fef3c7;">You climbed all ' + goal + ' steps with ' + timeLeft + 's remaining!</p>' +
            '<div style="margin-top:14px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">' +
              '<button type="button" class="fg-btn" id="pc-rp" style="background:#fbbf24;color:#431407;">↻ Climb Again</button>' +
              '<button type="button" class="fg-btn alt" id="pc-ex">← Back to Games</button>' +
            '</div>' +
          '</div>';
        ctx.el.querySelector('#pc-rp').addEventListener('click', function () { FG.E.palaniClimb(ctx); });
        ctx.el.querySelector('#pc-ex').addEventListener('click', function () { FG.exit(); });
      }
    }

    ctx.el.querySelector('#pc-l').addEventListener('pointerdown', function (e) { e.preventDefault(); step('L'); });
    ctx.el.querySelector('#pc-r').addEventListener('pointerdown', function (e) { e.preventDefault(); step('R'); });
    ctx.key(function (e) {
      if (e.key === 'ArrowLeft' || e.key === 'a') { step('L'); return 1; }
      if (e.key === 'ArrowRight' || e.key === 'd') { step('R'); return 1; }
    });

    iv = setInterval(function () {
      if (over) return;
      timeLeft--;
      tmEl.textContent = '⏱ ' + Math.max(0, timeLeft) + 's';
      if (timeLeft <= 0) {
        cleanup();
        ctx.el.innerHTML =
          '<div style="background:#431407;border:2px solid #fbbf24;border-radius:18px;padding:22px;color:#fffbeb;text-align:center;">' +
            '<div style="font-size:2.4rem;">⏳</div>' +
            '<h2 style="color:#fde047;margin:6px 0;">Time’s Up!</h2>' +
            '<p style="color:#fef3c7;">You climbed ' + steps + ' of ' + goal + ' steps.</p>' +
            '<div style="margin-top:14px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">' +
              '<button type="button" class="fg-btn" id="pc-rp" style="background:#fbbf24;color:#431407;">↻ Try Again</button>' +
              '<button type="button" class="fg-btn alt" id="pc-ex">← Back to Games</button>' +
            '</div>' +
          '</div>';
        ctx.el.querySelector('#pc-rp').addEventListener('click', function () { FG.E.palaniClimb(ctx); });
        ctx.el.querySelector('#pc-ex').addEventListener('click', function () { FG.exit(); });
      }
    }, 1000);
  };

  /* ---------- 3. Urumi Drum Rhythm (Smooth 3-Lane Tapper) ---------- */
  FG.E.velDrums = function (ctx) {
    var hintEl = document.querySelector('#fg-main .fg-hint');
    if (hintEl) hintEl.style.display = 'none';

    var W = 330, H = 300, hits = 0, goal = 15, misses = 0, over = false, raf = 0;
    var notes = [], nextNote = 0.5;
    var freqs = [261.63, 329.63, 392.00];

    ctx.el.innerHTML =
      '<div style="background:#431407;border:2px solid #f59e0b;border-radius:18px;padding:12px;color:#fffbeb;text-align:center;">' +
        '<div style="display:flex;gap:8px;justify-content:center;margin-bottom:8px;">' +
          '<span id="vd-sc" style="background:#7c2d12;border:1px solid #fbbf24;border-radius:999px;padding:4px 12px;font-size:0.82rem;font-weight:800;">🥁 Beats: 0/' + goal + '</span>' +
          '<span id="vd-ms" style="background:#7c2d12;border:1px solid #fbbf24;border-radius:999px;padding:4px 12px;font-size:0.82rem;font-weight:800;">Misses: 0/5</span>' +
        '</div>' +
        '<canvas id="vd-cv" width="' + W + '" height="' + H + '" style="width:100%;max-width:330px;height:auto;border-radius:14px;border:1.5px solid #f59e0b;display:block;margin:0 auto;background:#1c0a04;"></canvas>' +
        '<div style="display:flex;gap:10px;justify-content:center;margin-top:10px;">' +
          '<button type="button" class="vd-pad" data-l="0" style="flex:1;max-width:100px;background:#d97706;color:#fff;border:none;border-radius:12px;padding:14px 8px;font-weight:900;cursor:pointer;">🥁 Vel</button>' +
          '<button type="button" class="vd-pad" data-l="1" style="flex:1;max-width:100px;background:#b45309;color:#fff;border:none;border-radius:12px;padding:14px 8px;font-weight:900;cursor:pointer;">🔱 Muruga</button>' +
          '<button type="button" class="vd-pad" data-l="2" style="flex:1;max-width:100px;background:#d97706;color:#fff;border:none;border-radius:12px;padding:14px 8px;font-weight:900;cursor:pointer;">🦚 Arohara</button>' +
        '</div>' +
      '</div>';

    var cv = ctx.el.querySelector('#vd-cv');
    var g = cv.getContext('2d');
    var scEl = ctx.el.querySelector('#vd-sc');
    var msEl = ctx.el.querySelector('#vd-ms');

    function cleanup() { over = true; if (raf) cancelAnimationFrame(raf); }
    ctx.on(cleanup);

    function hitLane(lane) {
      if (over) return;
      for (var i = 0; i < notes.length; i++) {
        var n = notes[i];
        if (!n.hit && n.lane === lane && Math.abs(n.y - 250) < 36) {
          n.hit = true;
          hits++;
          FG.tone(freqs[lane], 0.14, 'triangle');
          scEl.textContent = '🥁 Beats: ' + hits + '/' + goal;
          if (hits >= goal) {
            cleanup();
            var sc = Math.max(60, 100 - misses * 8);
            saveWin(ctx, sc);
            FG.tone(880, 0.25, 'sine');
            ctx.el.innerHTML =
              '<div style="background:#431407;border:2px solid #fbbf24;border-radius:18px;padding:22px;color:#fffbeb;text-align:center;">' +
                '<div style="font-size:2.6rem;">🥁🔱</div>' +
                '<h2 style="color:#fde047;margin:6px 0;">Urumi Rhythm Master!</h2>' +
                '<p style="color:#fef3c7;">You matched all ' + goal + ' procession beats with ' + sc + '% accuracy!</p>' +
                '<div style="margin-top:14px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">' +
                  '<button type="button" class="fg-btn" id="vd-rp" style="background:#fbbf24;color:#431407;">↻ Play Again</button>' +
                  '<button type="button" class="fg-btn alt" id="vd-ex">← Back to Games</button>' +
                '</div>' +
              '</div>';
            ctx.el.querySelector('#vd-rp').addEventListener('click', function () { FG.E.velDrums(ctx); });
            ctx.el.querySelector('#vd-ex').addEventListener('click', function () { FG.exit(); });
          }
          return;
        }
      }
      FG.tone(150, 0.08, 'sawtooth');
    }

    var pads = ctx.el.querySelectorAll('.vd-pad');
    for (var i = 0; i < pads.length; i++) {
      pads[i].addEventListener('pointerdown', function (e) {
        e.preventDefault();
        hitLane(parseInt(this.getAttribute('data-l'), 10));
      });
    }
    ctx.key(function (e) {
      if (e.key === '1' || e.key === 'a') { hitLane(0); return 1; }
      if (e.key === '2' || e.key === 's') { hitLane(1); return 1; }
      if (e.key === '3' || e.key === 'd') { hitLane(2); return 1; }
    });

    var lastT = performance.now();
    function loop(now) {
      if (over) return;
      var dt = Math.min(0.04, (now - lastT) / 1000);
      lastT = now;

      nextNote -= dt;
      if (nextNote <= 0) {
        notes.push({ lane: Math.floor(Math.random() * 3), y: -15, hit: false });
        nextNote = 0.85;
      }

      g.fillStyle = '#1c0a04'; g.fillRect(0, 0, W, H);
      for (var l = 0; l < 3; l++) {
        var lx = 55 + l * 110;
        g.strokeStyle = 'rgba(251,191,36,0.2)'; g.lineWidth = 2;
        g.beginPath(); g.moveTo(lx, 0); g.lineTo(lx, H); g.stroke();
        g.strokeStyle = '#fbbf24'; g.lineWidth = 3;
        g.beginPath(); g.arc(lx, 250, 22, 0, Math.PI * 2); g.stroke();
      }

      for (var j = notes.length - 1; j >= 0; j--) {
        var n = notes[j];
        n.y += 145 * dt;
        if (!n.hit) {
          g.fillStyle = '#fde047';
          g.beginPath(); g.arc(55 + n.lane * 110, n.y, 16, 0, Math.PI * 2); g.fill();
          if (n.y > H + 10) {
            notes.splice(j, 1);
            misses++;
            msEl.textContent = 'Misses: ' + misses + '/5';
            if (misses >= 5) {
              cleanup();
              ctx.el.innerHTML =
                '<div style="background:#431407;border:2px solid #fbbf24;border-radius:18px;padding:22px;color:#fffbeb;text-align:center;">' +
                  '<div style="font-size:2.4rem;">🥁</div>' +
                  '<h2 style="color:#fde047;margin:6px 0;">Missed Too Many Beats!</h2>' +
                  '<p style="color:#fef3c7;">Tap the drum pads when the yellow beat enters the golden ring.</p>' +
                  '<div style="margin-top:14px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">' +
                    '<button type="button" class="fg-btn" id="vd-rp" style="background:#fbbf24;color:#431407;">↻ Try Again</button>' +
                    '<button type="button" class="fg-btn alt" id="vd-ex">← Back to Games</button>' +
                  '</div>' +
                '</div>';
              ctx.el.querySelector('#vd-rp').addEventListener('click', function () { FG.E.velDrums(ctx); });
              ctx.el.querySelector('#vd-ex').addEventListener('click', function () { FG.exit(); });
              return;
            }
          }
        } else {
          notes.splice(j, 1);
        }
      }

      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
  };
})();
