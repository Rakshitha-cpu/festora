/* ===== FESTORA – KARTHIGAI DEEPAM EXCLUSIVE GAMES ===== */
(function () {
  'use strict';
  var FG = window.FG;
  if (!FG || !FG.E) return;

  FG.ENG_LABEL = FG.ENG_LABEL || {};
  FG.HOW = FG.HOW || {};
  FG.ENG_LABEL.mahaDeepam = 'Sacred Lamp Lighting';
  FG.HOW.mahaDeepam = 'Tap the clay diyas along Arunachala Hill to light them. When a night breeze blows, tap Shield to protect your flames!';
  FG.ENG_LABEL.deepamMaze = 'Temple Sanctum Path';
  FG.HOW.deepamMaze = 'Use Arrow keys, swipe, or the D-pad buttons to collect all sacred oil jars and reach the Temple Sanctum.';

  /* ---------- 1. Tiruvannamalai Maha Deepam (Lamp Lighting) ---------- */
  FG.E.mahaDeepam = function (ctx) {
    var hintEl = document.querySelector('#fg-main .fg-hint');
    if (hintEl) hintEl.style.display = 'none';

    var W = 380, H = 430;
    var n = 9;
    var lamps = [];
    // Arrange lamps along temple steps & Arunachala hill silhouette
    var coords = [
      [75, 360], [190, 365], [305, 360],
      [95, 285], [190, 290], [285, 285],
      [130, 210], [250, 210],
      [190, 128]
    ];
    for (var i = 0; i < n; i++) {
      lamps.push({ x: coords[i][0], y: coords[i][1], lit: false, glow: 0, peak: i === n - 1 });
    }

    var timeLeft = 65;
    var windWarn = 0;
    var windGust = 0;
    var nextWind = 6.5;
    var shield = 0;
    var shieldCd = 0;
    var over = false;
    var raf = 0;
    var timerIv = null;

    ctx.el.innerHTML =
      '<div style="background:linear-gradient(180deg,#0f172a,#1e1b4b);border:2px solid #f59e0b;border-radius:18px;padding:12px;color:#fffbeb;text-align:center;">' +
        '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:8px;">' +
          '<span id="kd-lit" style="background:#312e81;border:1px solid #fbbf24;border-radius:999px;padding:4px 12px;font-size:0.82rem;font-weight:800;">🪔 Lit: 0/' + n + '</span>' +
          '<span id="kd-time" style="background:#312e81;border:1px solid #fbbf24;border-radius:999px;padding:4px 12px;font-size:0.82rem;font-weight:800;">⏱ 65s</span>' +
        '</div>' +
        '<canvas id="kd-cv" width="' + W + '" height="' + H + '" style="width:100%;max-width:380px;height:auto;border-radius:14px;border:1.5px solid #f59e0b;display:block;margin:0 auto;touch-action:none;cursor:pointer;"></canvas>' +
        '<div style="margin-top:10px;display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap;">' +
          '<button type="button" id="kd-shield" style="background:#d97706;color:#fff;border:none;border-radius:999px;padding:10px 20px;font-weight:800;font-size:0.9rem;cursor:pointer;">🤲 Shield Flames</button>' +
          '<span id="kd-msg" style="font-size:0.82rem;color:#fde68a;font-weight:700;">Tap unlit clay diyas to light them!</span>' +
        '</div>' +
      '</div>';

    var cv = ctx.el.querySelector('#kd-cv');
    var g = cv.getContext('2d');
    var litEl = ctx.el.querySelector('#kd-lit');
    var timeEl = ctx.el.querySelector('#kd-time');
    var shieldBtn = ctx.el.querySelector('#kd-shield');
    var msgEl = ctx.el.querySelector('#kd-msg');

    function cleanup() {
      over = true;
      if (raf) cancelAnimationFrame(raf);
      if (timerIv) clearInterval(timerIv);
    }
    ctx.on(cleanup);

    function activateShield() {
      if (over || shieldCd > 0) return;
      shield = 2.4;
      shieldCd = 2.6;
      FG.tone(520, 0.14, 'triangle');
      msgEl.textContent = '🤲 Flames shielded from the breeze!';
    }
    shieldBtn.addEventListener('click', activateShield);

    cv.addEventListener('pointerdown', function (e) {
      if (over) return;
      e.preventDefault();
      var rc = cv.getBoundingClientRect();
      var px = (e.clientX - rc.left) * (W / rc.width);
      var py = (e.clientY - rc.top) * (H / rc.height);
      var best = null, bd = 48;
      lamps.forEach(function (l) {
        var d = Math.hypot(l.x - px, l.y - py);
        if (d < bd) { bd = d; best = l; }
      });
      if (best && !best.lit) {
        best.lit = true;
        FG.tone(620 + Math.random() * 200, 0.1, 'sine');
        var cnt = lamps.filter(function (l) { return l.lit; }).length;
        litEl.textContent = '🪔 Lit: ' + cnt + '/' + n;
        if (cnt === n) {
          over = true;
          clearInterval(timerIv);
          FG.tone(880, 0.25, 'triangle');
          showWin(timeLeft);
        }
      }
    });

    timerIv = setInterval(function () {
      if (over) return;
      timeLeft--;
      timeEl.textContent = '⏱ ' + Math.max(0, timeLeft) + 's';
      if (timeLeft <= 0) {
        cleanup();
        showLose();
      }
    }, 1000);

    function showWin(rem) {
      var score = Math.min(100, 65 + Math.round(rem * 0.6));
      try {
        FG.ST.done.karthigai = FG.ST.done.karthigai || {};
        var rec = FG.ST.done.karthigai[ctx.n] || { best: 0, stars: 0, plays: 0 };
        var first = !rec.plays;
        rec.plays++; rec.best = Math.max(rec.best, score); rec.stars = Math.max(rec.stars, 3);
        FG.ST.done.karthigai[ctx.n] = rec; FG.ST.xp += 40; FG.save();
        if (first && typeof window.addCoins === 'function') window.addCoins(25, 'Maha Deepam Lit');
      } catch (e) {}
      ctx.el.innerHTML =
        '<div style="background:linear-gradient(180deg,#1e1b4b,#312e81);border:2px solid #fbbf24;border-radius:18px;padding:22px;color:#fffbeb;text-align:center;">' +
          '<div style="font-size:2.6rem;">🪔✨</div>' +
          '<h2 style="color:#fde047;margin:6px 0;">Maha Deepam Shines Bright!</h2>' +
          '<p style="color:#fef3c7;">All ' + n + ' sacred lamps on Arunachala Hill are lit with ' + rem + 's remaining!</p>' +
          '<div style="margin-top:14px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">' +
            '<button type="button" class="fg-btn" id="kd-rp" style="background:#fbbf24;color:#1e1b4b;">↻ Light Again</button>' +
            '<button type="button" class="fg-btn alt" id="kd-ex">← Back to Games</button>' +
          '</div>' +
        '</div>';
      ctx.el.querySelector('#kd-rp').addEventListener('click', function () { FG.E.mahaDeepam(ctx); });
      ctx.el.querySelector('#kd-ex').addEventListener('click', function () { FG.exit(); });
    }

    function showLose() {
      var cnt = lamps.filter(function (l) { return l.lit; }).length;
      ctx.el.innerHTML =
        '<div style="background:linear-gradient(180deg,#1e1b4b,#312e81);border:2px solid #fbbf24;border-radius:18px;padding:22px;color:#fffbeb;text-align:center;">' +
          '<div style="font-size:2.4rem;">💨</div>' +
          '<h2 style="color:#fde047;margin:6px 0;">Time’s Up!</h2>' +
          '<p style="color:#fef3c7;">You lit ' + cnt + ' of ' + n + ' lamps. Use Shield whenever the wind warning appears!</p>' +
          '<div style="margin-top:14px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">' +
            '<button type="button" class="fg-btn" id="kd-rp" style="background:#fbbf24;color:#1e1b4b;">↻ Try Again</button>' +
            '<button type="button" class="fg-btn alt" id="kd-ex">← Back to Games</button>' +
          '</div>' +
        '</div>';
      ctx.el.querySelector('#kd-rp').addEventListener('click', function () { FG.E.mahaDeepam(ctx); });
      ctx.el.querySelector('#kd-ex').addEventListener('click', function () { FG.exit(); });
    }

    var lastT = performance.now();
    function loop(now) {
      if (over) return;
      var dt = Math.min(0.05, (now - lastT) / 1000);
      lastT = now;

      nextWind -= dt;
      if (nextWind <= 0 && windWarn <= 0 && windGust <= 0) {
        windWarn = 1.8;
        nextWind = 7.0;
        msgEl.textContent = '💨 Cool breeze coming! Tap Shield Flames!';
      }
      if (windWarn > 0) {
        windWarn -= dt;
        if (windWarn <= 0) {
          windGust = 0.7;
          if (shield <= 0) {
            // Blow out at most 2 lit lamps so it's fair and fun
            var blown = 0;
            for (var b = lamps.length - 1; b >= 0 && blown < 2; b--) {
              if (lamps[b].lit) { lamps[b].lit = false; blown++; }
            }
            var cnt2 = lamps.filter(function (l) { return l.lit; }).length;
            litEl.textContent = '🪔 Lit: ' + cnt2 + '/' + n;
            FG.tone(180, 0.2, 'sawtooth');
            msgEl.textContent = blown ? '💨 The breeze blew out ' + blown + ' lamp(s)! Re-light them!' : '💨 Breeze passed!';
          } else {
            msgEl.textContent = '✨ Shield protected all flames!';
          }
        }
      }
      if (windGust > 0) windGust -= dt;
      if (shield > 0) shield = Math.max(0, shield - dt);
      if (shieldCd > 0) shieldCd = Math.max(0, shieldCd - dt);
      shieldBtn.disabled = shieldCd > 0;
      shieldBtn.textContent = shieldCd > 0 ? '🤲 Recharging (' + shieldCd.toFixed(1) + 's)' : '🤲 Shield Flames';
      shieldBtn.style.opacity = shieldCd > 0 ? '0.6' : '1';

      // Draw Karthigai Night & Arunachala Hill
      var sky = g.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, '#090d24'); sky.addColorStop(1, '#2e1065');
      g.fillStyle = sky; g.fillRect(0, 0, W, H);

      // Full Moon (Karthigai Pournami)
      g.fillStyle = '#fef08a';
      g.beginPath(); g.arc(315, 58, 22, 0, Math.PI * 2); g.fill();

      // Stars
      g.fillStyle = '#fff';
      for (var s = 0; s < 28; s++) g.fillRect((s * 67) % W, (s * 41) % 150, 1.8, 1.8);

      // Arunachala Hill silhouette
      g.fillStyle = '#1e1b4b';
      g.beginPath(); g.moveTo(0, H); g.lineTo(190, 130); g.lineTo(W, H); g.closePath(); g.fill();

      // Temple steps
      g.fillStyle = '#312e81';
      g.fillRect(40, 345, 300, 85);
      g.fillRect(75, 270, 230, 75);
      g.fillRect(115, 195, 150, 75);

      // Draw Lamps
      lamps.forEach(function (l, idx) {
        l.glow += ((l.lit ? 1 : 0) - l.glow) * Math.min(1, dt * 8);
        var rad = l.peak ? 68 : 44;
        if (l.glow > 0.02) {
          var gr = g.createRadialGradient(l.x, l.y - 10, 2, l.x, l.y - 10, rad * l.glow);
          gr.addColorStop(0, 'rgba(253,224,71,' + (0.8 * l.glow) + ')');
          gr.addColorStop(1, 'rgba(245,158,11,0)');
          g.fillStyle = gr;
          g.beginPath(); g.arc(l.x, l.y - 10, rad, 0, Math.PI * 2); g.fill();
        }
        // Clay diya base
        var pw = l.peak ? 28 : 20;
        g.fillStyle = '#b45309';
        g.beginPath(); g.ellipse(l.x, l.y, pw, 9, 0, 0, Math.PI); g.fill();
        g.fillStyle = '#f59e0b';
        g.beginPath(); g.ellipse(l.x, l.y, pw, 4.5, 0, 0, Math.PI * 2); g.fill();
        if (l.lit) {
          var fl = Math.sin(now * 0.014 + idx) * 2;
          g.fillStyle = '#fef08a';
          g.beginPath(); g.ellipse(l.x + fl * 0.3, l.y - 13, l.peak ? 7 : 5, (l.peak ? 16 : 11) + fl, 0, 0, Math.PI * 2); g.fill();
          g.fillStyle = '#f97316';
          g.beginPath(); g.ellipse(l.x + fl * 0.3, l.y - 10, l.peak ? 4 : 3, l.peak ? 9 : 6, 0, 0, Math.PI * 2); g.fill();
        } else {
          // Subtle tap ring on unlit lamp
          g.strokeStyle = 'rgba(251,191,36,0.55)'; g.lineWidth = 1.5;
          g.beginPath(); g.arc(l.x, l.y - 2, pw + 5 + Math.sin(now * 0.005 + idx) * 2, 0, Math.PI * 2); g.stroke();
        }
      });

      if (windWarn > 0) {
        g.fillStyle = '#fde047'; g.font = 'bold 18px system-ui'; g.textAlign = 'center';
        g.fillText('💨 Breeze Approaching!', W / 2, 44);
      }
      if (shield > 0) {
        g.strokeStyle = 'rgba(56,189,248,0.75)'; g.lineWidth = 4;
        g.beginPath(); g.arc(W / 2, 240, 155, Math.PI, Math.PI * 2); g.stroke();
      }
      if (windGust > 0) {
        g.strokeStyle = 'rgba(255,255,255,0.45)'; g.lineWidth = 2;
        for (var q = 0; q < 7; q++) {
          var wx = ((now * 0.6 + q * 80) % (W + 80)) - 40;
          g.beginPath(); g.moveTo(wx, 90 + q * 45); g.lineTo(wx + 55, 90 + q * 45); g.stroke();
        }
      }

      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
  };

  /* ---------- 2. Annamalaiyar Temple Sanctum Path (Reliable Maze) ---------- */
  FG.E.deepamMaze = function (ctx) {
    var hintEl = document.querySelector('#fg-main .fg-hint');
    if (hintEl) hintEl.style.display = 'none';

    var n = 9;
    var grid = [
      [1,1,1,1,1,1,1,1,1],
      [1,0,0,0,1,0,0,0,1],
      [1,0,1,0,1,0,1,0,1],
      [1,0,1,0,0,0,1,0,1],
      [1,0,1,1,1,0,1,0,1],
      [1,0,0,0,1,0,0,0,1],
      [1,1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1]
    ];
    var jars = [
      { x: 3, y: 1, got: false },
      { x: 7, y: 1, got: false },
      { x: 1, y: 5, got: false },
      { x: 3, y: 7, got: false }
    ];
    var px = 1, py = 1, got = 0, timeLeft = 60, over = false, iv = null;

    ctx.el.innerHTML =
      '<div style="background:linear-gradient(180deg,#2e1065,#1e1b4b);border:2px solid #f59e0b;border-radius:18px;padding:12px;color:#fffbeb;text-align:center;">' +
        '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:8px;">' +
          '<span id="km-jars" style="background:#312e81;border:1px solid #fbbf24;border-radius:999px;padding:4px 12px;font-size:0.82rem;font-weight:800;">🏺 Oil Jars: 0/4</span>' +
          '<span id="km-time" style="background:#312e81;border:1px solid #fbbf24;border-radius:999px;padding:4px 12px;font-size:0.82rem;font-weight:800;">⏱ 60s</span>' +
        '</div>' +
        '<canvas id="km-cv" width="324" height="324" style="width:100%;max-width:324px;height:auto;border-radius:14px;border:1.5px solid #f59e0b;display:block;margin:0 auto;touch-action:none;"></canvas>' +
        '<div id="km-msg" style="font-size:0.82rem;color:#fde68a;font-weight:700;margin-top:6px;">Collect all 4 oil jars, then enter the Sanctum (🛕)!</div>' +
        '<div class="fg-dp" style="margin-top:8px;"><span></span><button type="button" data-d="u">▲</button><span></span><button type="button" data-d="l">◀</button><button type="button" data-d="d">▼</button><button type="button" data-d="r">▶</button></div>' +
      '</div>';

    var cv = ctx.el.querySelector('#km-cv');
    var g = cv.getContext('2d');
    var cs = 324 / n;
    var jarsEl = ctx.el.querySelector('#km-jars');
    var timeEl = ctx.el.querySelector('#km-time');
    var msgEl = ctx.el.querySelector('#km-msg');

    function stop() { over = true; if (iv) clearInterval(iv); }
    ctx.on(stop);

    function move(dx, dy) {
      if (over) return;
      var nx = px + dx, ny = py + dy;
      if (nx < 0 || ny < 0 || nx >= n || ny >= n || grid[ny][nx]) return;
      px = nx; py = ny;
      FG.tone(360, 0.04, 'triangle');
      jars.forEach(function (j) {
        if (!j.got && j.x === px && j.y === py) {
          j.got = true; got++;
          FG.tone(720, 0.12, 'sine');
          jarsEl.textContent = '🏺 Oil Jars: ' + got + '/4';
          if (got === 4) msgEl.textContent = '✨ All oil jars collected! Head to the Sanctum (🛕) at bottom-right!';
        }
      });
      if (px === 7 && py === 7) {
        if (got >= 4) {
          stop();
          FG.tone(880, 0.25, 'sine');
          try {
            FG.ST.done.karthigai = FG.ST.done.karthigai || {};
            var rec = FG.ST.done.karthigai[ctx.n] || { best: 0, stars: 0, plays: 0 };
            var first = !rec.plays;
            rec.plays++; rec.best = 100; rec.stars = 3;
            FG.ST.done.karthigai[ctx.n] = rec; FG.ST.xp += 40; FG.save();
            if (first && typeof window.addCoins === 'function') window.addCoins(25, 'Temple Sanctum Lit');
          } catch (e) {}
          ctx.el.innerHTML =
            '<div style="background:linear-gradient(180deg,#1e1b4b,#312e81);border:2px solid #fbbf24;border-radius:18px;padding:22px;color:#fffbeb;text-align:center;">' +
              '<div style="font-size:2.6rem;">🛕🪔</div>' +
              '<h2 style="color:#fde047;margin:6px 0;">Sanctum Deepam Lit!</h2>' +
              '<p style="color:#fef3c7;">You delivered all 4 sacred oil jars with ' + timeLeft + 's remaining!</p>' +
              '<div style="margin-top:14px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">' +
                '<button type="button" class="fg-btn" id="km-rp" style="background:#fbbf24;color:#1e1b4b;">↻ Play Again</button>' +
                '<button type="button" class="fg-btn alt" id="km-ex">← Back to Games</button>' +
              '</div>' +
            '</div>';
          ctx.el.querySelector('#km-rp').addEventListener('click', function () { FG.E.deepamMaze(ctx); });
          ctx.el.querySelector('#km-ex').addEventListener('click', function () { FG.exit(); });
          return;
        } else {
          msgEl.textContent = 'Collect all 4 oil jars first (' + got + '/4)!';
        }
      }
      draw();
    }

    ctx.key(function (e) {
      var m = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1], a: [-1, 0], d: [1, 0], w: [0, -1], s: [0, 1] }[e.key];
      if (m) { move(m[0], m[1]); return 1; }
    });
    var sx = 0, sy = 0;
    cv.addEventListener('pointerdown', function (e) { sx = e.clientX; sy = e.clientY; });
    cv.addEventListener('pointerup', function (e) {
      var dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 14) return;
      if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? 1 : -1, 0);
      else move(0, dy > 0 ? 1 : -1);
    });
    var dbs = ctx.el.querySelectorAll('[data-d]');
    for (var i = 0; i < dbs.length; i++) {
      dbs[i].addEventListener('click', function () {
        var d = this.getAttribute('data-d');
        move(d === 'l' ? -1 : d === 'r' ? 1 : 0, d === 'u' ? -1 : d === 'd' ? 1 : 0);
      });
    }

    iv = setInterval(function () {
      if (over) return;
      timeLeft--;
      timeEl.textContent = '⏱ ' + Math.max(0, timeLeft) + 's';
      if (timeLeft <= 0) {
        stop();
        ctx.el.innerHTML =
          '<div style="background:linear-gradient(180deg,#1e1b4b,#312e81);border:2px solid #fbbf24;border-radius:18px;padding:22px;color:#fffbeb;text-align:center;">' +
            '<div style="font-size:2.4rem;">⏳</div>' +
            '<h2 style="color:#fde047;margin:6px 0;">Time’s Up!</h2>' +
            '<p style="color:#fef3c7;">You collected ' + got + ' of 4 oil jars.</p>' +
            '<div style="margin-top:14px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">' +
              '<button type="button" class="fg-btn" id="km-rp" style="background:#fbbf24;color:#1e1b4b;">↻ Try Again</button>' +
              '<button type="button" class="fg-btn alt" id="km-ex">← Back to Games</button>' +
            '</div>' +
          '</div>';
        ctx.el.querySelector('#km-rp').addEventListener('click', function () { FG.E.deepamMaze(ctx); });
        ctx.el.querySelector('#km-ex').addEventListener('click', function () { FG.exit(); });
      }
    }, 1000);

    function draw() {
      g.fillStyle = '#1e1b4b'; g.fillRect(0, 0, 324, 324);
      for (var y = 0; y < n; y++) {
        for (var x = 0; x < n; x++) {
          if (grid[y][x]) {
            g.fillStyle = '#7c2d12'; g.fillRect(x * cs, y * cs, cs, cs);
            g.fillStyle = '#b45309'; g.fillRect(x * cs, y * cs, cs, 3);
          }
        }
      }
      g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = (cs * 0.68) + 'px serif';
      jars.forEach(function (j) { if (!j.got) g.fillText('🏺', (j.x + 0.5) * cs, (j.y + 0.54) * cs); });
      g.fillText(got >= 4 ? '🛕' : '🔒', 7.5 * cs, 7.54 * cs);
      g.fillText('🪔', (px + 0.5) * cs, (py + 0.54) * cs);
    }
    draw();
  };
})();
