/* ===== FESTORA GAMES v3 - ENGINES A: action games ===== */
(function () {
  'use strict';
  var FG = window.FG; if (!FG) return; var E = FG.E, U = FG.U, $ = U.$, rnd = U.rnd, clamp = U.clamp;
  Object.assign(FG.HOW, {
    lane3d: 'Swipe or press ← → to change lane. Grab the good items, dodge the bad ones.', dash: 'Tap, click or press Space to jump (jump twice for a double jump).', flap: 'Tap or press Space to fly up. Pass through the gaps.', catch: 'Drag left and right (or use ← →) to catch the good items.',
    sling: 'Drag back from the ball and let go to shoot. Clear every target.', rhythm: 'Tap the lane (or press D F J K) when a note reaches the glowing line.', whack: 'Tap the festival items as they pop up. Avoid the bombs.', balance: 'Move your finger/mouse or press ← → to keep the pot balanced.',
    tug: 'Tap LEFT and RIGHT alternately, as fast as you can, to sprint ahead.', stack: 'Tap to drop the sliding block. Line it up with the one below.', archery: 'Move to aim, press and hold to charge power, release to shoot.', kite: 'Move to steer your kite. HOLD to pull and cut rival strings. Do not get caught uncut for long.',
    memory: 'Flip two cards at a time and find all the matching pairs.', match3: 'Swap two neighbouring tiles to line up 3 or more. Reach the target score.', slide: 'Slide the tiles into order by tapping a tile next to the empty space.', hidden: 'Find all the objects listed above. Wrong taps cost time.',
    maze: 'Use arrow keys, swipe or the buttons. Collect all items, then reach the exit.', cook: 'Hold STIR to keep the needle in the green zone. Tap the ingredient when it is called.', lights: 'Tap each lamp to light it. Press SHIELD when the wind warning shows. Keep all lit for 3 seconds.', boat: 'Tap the sides to steer. Press ROW on the beat for a boost. Finish in the top places.',
    rangoli: 'Follow the instructions on screen to complete the rangoli pattern.', pyramid: 'Pick a person, then a spot. Everyone must weigh less than those they stand on.'
  });
  function hazard(c) { return c.bad; }

  /* ---------- 3D lane runner ---------- */
  E.lane3d = function (c) {
    var k = c.canvas(360, 480), ctx = k.ctx, W = 360, H = 480, HZ = 120, goal = [90, 140, 200][c.r - 1], score = 0, lives = 3, lane = 1, px = 1, objs = [], spawn = 0, shake = 0, cx = W / 2, road = c.cfg.opts.road || '#3d2a52';
    c.hud([['s', 'Score 0/' + goal], ['l', '❤️❤️❤️'], ['t', '45s']]);
    function X(l, s) { return cx + (l - 1) * 118 * s; } function Y(s) { return HZ + (H - 110 - HZ) * s; }
    function move(d) { lane = clamp(lane + d, 0, 2); c.tone(300, .05, 'triangle'); }
    c.key(function (e) { if (e.key === 'ArrowLeft' || e.key === 'a') { move(-1); return 1; } if (e.key === 'ArrowRight' || e.key === 'd') { move(1); return 1; } });
    var sx = null; k.cv.addEventListener('pointerdown', function (e) { var p = k.pt(e); sx = p.x; move(p.x < W / 2 ? -1 : 1); e.preventDefault(); });
    c.timer(45, function (l) { c.set_('t', l + 's'); }, function () { c.end(score >= goal, score / goal * 100, 'Time is up. Score ' + score + ' of ' + goal); });
    FG._st.objs = objs;
    c.loop(function (dt, t) {
      var v = Math.min(1.15, .5 + c.d * .2 + score * .002); spawn -= dt;
      if (spawn <= 0) { spawn = Math.max(.32, .8 - c.d * .15 - score * .0015); var bad = Math.random() < .3 + c.d * .08; objs.push({ l: rnd(3), s: 0, e: bad ? U.pick(hazard(c)) : U.pick(c.good), bad: bad }); }
      px += (lane - px) * Math.min(1, dt * 14); objs.forEach(function (o) { o.s += dt * v * (.35 + o.s * 1.1); });
      objs = objs.filter(function (o) { if (!o.hit && o.s > .86 && o.s < 1.02 && o.l === lane) { o.hit = 1; if (o.bad) { lives--; shake = .25; c.tone(150, .25, 'sawtooth'); c.set_('l', lives > 0 ? '❤️'.repeat(lives) : '💔'); if (lives <= 0) c.timeout(function () { c.end(false, score / goal * 100, 'Out of lives. Score ' + score); }, 150); } else { score += 10; c.tone(700 + rnd(300), .08); c.set_('s', 'Score ' + score + '/' + goal); if (score >= goal) c.timeout(function () { c.end(true, 100, ''); }, 100); } return false; } return o.s < 1.1; });
      shake = Math.max(0, shake - dt); ctx.save(); if (shake > 0) ctx.translate((Math.random() - .5) * 8, (Math.random() - .5) * 8);
      var g = ctx.createLinearGradient(0, 0, 0, HZ + 20); g.addColorStop(0, '#120a26'); g.addColorStop(1, c.cfg.opts.sky || '#c9931a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#26143c'; ctx.fillRect(0, HZ, W, H - HZ); ctx.fillStyle = road; ctx.beginPath(); ctx.moveTo(cx - 40, HZ); ctx.lineTo(cx + 40, HZ); ctx.lineTo(cx + 200, H); ctx.lineTo(cx - 200, H); ctx.fill();
      ctx.strokeStyle = '#ffd54a'; ctx.lineWidth = 3; [-1.5, -.5, .5, 1.5].forEach(function (m) { ctx.beginPath(); ctx.moveTo(cx + m * 27, HZ); ctx.lineTo(cx + m * 118, H); ctx.stroke(); });
      for (var r = 0; r < 8; r++) { var s2 = ((r / 8 + t * .5) % 1); ctx.fillStyle = '#ffffff22'; ctx.fillRect(cx - 200 * s2, Y(s2), 400 * s2, 2 + 4 * s2); }
      objs.slice().sort(function (a, b) { return a.s - b.s; }).forEach(function (o) { var s = Math.max(.05, o.s), sz = 14 + 58 * s; ctx.font = sz + 'px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(o.e, X(o.l, s), Y(s)); });
      ctx.font = '62px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(c.hero, cx + (px - 1) * 118 * .93, Y(.93) - Math.abs(Math.sin(t * 9)) * 8); ctx.restore();
    });
  };

  /* ---------- side-scrolling runner ---------- */
  E.dash = function (c) {
    var k = c.canvas(360, 480), ctx = k.ctx, W = 360, H = 480, GY = 380, goal = [120, 200, 300][c.r - 1], dist = 0, coins = 0, lives = 3, y = GY, vy = 0, jumps = 0, obs = [], tok = [], spawn = 1, inv = 0, sc = 0;
    c.hud([['s', 'Score 0/' + goal], ['l', '❤️❤️❤️']]);
    function jump() { if (jumps < 2) { vy = -640; jumps++; c.tone(520 + jumps * 120, .1, 'triangle'); } }
    c.key(function (e) { if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w') { jump(); return 1; } });
    k.cv.addEventListener('pointerdown', function (e) { jump(); e.preventDefault(); });
    FG._st.state = function () { return { obs: obs, y: y }; }; FG._st.jump = jump;
    c.loop(function (dt, t) {
      var sp = 250 + c.d * 80 + t * 3; dist += sp * dt; sc = Math.floor(dist / 8) + coins * 5; spawn -= dt;
      if (spawn <= 0) { spawn = (1.5 - c.d * .4) * (.75 + Math.random() * .6) * (260 / sp) * 1.1; obs.push({ x: W + 30, e: U.pick(hazard(c)) }); if (Math.random() < .7) tok.push({ x: W + 30 + 120, y: GY - 80 - rnd(90), e: U.pick(c.good) }); }
      vy += 1800 * dt; y += vy * dt; if (y >= GY) { y = GY; vy = 0; jumps = 0; } inv = Math.max(0, inv - dt);
      obs.forEach(function (o) { o.x -= sp * dt; }); tok.forEach(function (o) { o.x -= sp * dt; });
      obs = obs.filter(function (o) { if (inv <= 0 && Math.abs(o.x - 80) < 26 && y > GY - 40) { lives--; inv = 1.2; c.tone(150, .25, 'sawtooth'); c.set_('l', lives > 0 ? '❤️'.repeat(lives) : '💔'); if (lives <= 0) c.timeout(function () { c.end(false, sc / goal * 100, 'Out of lives. Score ' + sc); }, 150); return false; } return o.x > -40; });
      tok = tok.filter(function (o) { if (Math.abs(o.x - 80) < 30 && Math.abs(o.y - (y - 30)) < 40) { coins++; c.tone(800, .08); return false; } return o.x > -40; });
      c.set_('s', 'Score ' + sc + '/' + goal); if (sc >= goal) c.end(true, 100, '');
      var g = ctx.createLinearGradient(0, 0, 0, GY); g.addColorStop(0, '#120a26'); g.addColorStop(1, c.cfg.opts.sky || '#d98b3a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#ffffff22'; for (var i = 0; i < 6; i++) ctx.fillRect(((i * 97 - dist * .2) % 440 + 440) % 440 - 40, 60 + (i * 41) % 160, 70, 16);
      ctx.fillStyle = c.cfg.opts.ground || '#5a3b1c'; ctx.fillRect(0, GY + 10, W, H - GY); ctx.fillStyle = '#00000033'; for (i = 0; i < 12; i++) ctx.fillRect(((i * 53 - dist) % 400 + 400) % 400 - 20, GY + 24, 28, 4);
      ctx.font = '40px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; obs.forEach(function (o) { ctx.fillText(o.e, o.x, GY + 10); }); ctx.font = '32px serif'; tok.forEach(function (o) { ctx.fillText(o.e, o.x, o.y); });
      ctx.globalAlpha = inv > 0 && Math.floor(t * 12) % 2 ? .35 : 1; ctx.font = '56px serif'; ctx.fillText(c.hero, 80, y + 8); ctx.globalAlpha = 1;
    });
  };

  /* ---------- flappy-style flyer ---------- */
  E.flap = function (c) {
    var k = c.canvas(360, 480), ctx = k.ctx, W = 360, H = 480, goal = [6, 10, 15][c.r - 1], by = 220, vy = 0, pipes = [], passed = 0, spawn = 0, gap = 165 - c.d * 25;
    c.hud([['s', 'Gaps 0/' + goal]]);
    function flap() { vy = -330; c.tone(500, .06, 'triangle'); } c.key(function (e) { if (e.key === ' ' || e.key === 'ArrowUp') { flap(); return 1; } }); k.cv.addEventListener('pointerdown', function (e) { flap(); e.preventDefault(); });
    FG._st.state = function () { return { by: by, pipes: pipes }; }; FG._st.flap = flap;
    c.loop(function (dt, t) {
      spawn -= dt; if (spawn <= 0) { spawn = 1.7 - c.d * .2; pipes.push({ x: W + 20, gy: 120 + rnd(H - 330), p: 0 }); }
      vy += 1000 * dt; by += vy * dt; pipes.forEach(function (p) { p.x -= (150 + c.d * 30) * dt; if (!p.p && p.x < 70) { p.p = 1; passed++; c.set_('s', 'Gaps ' + passed + '/' + goal); c.tone(760, .08); if (passed >= goal) c.timeout(function () { c.end(true, 100, ''); }, 200); } });
      pipes = pipes.filter(function (p) { return p.x > -60; });
      var hit = by < 14 || by > H - 40; pipes.forEach(function (p) { if (p.x < 100 && p.x + 50 > 50 && (by < p.gy || by + 28 > p.gy + gap)) hit = true; });
      if (hit) { c.tone(150, .3, 'sawtooth'); c.end(false, passed / goal * 100, 'You flew through ' + passed + ' of ' + goal + ' gaps.'); return; }
      var g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, c.cfg.opts.sky || '#7cc6ff'); g.addColorStop(1, '#ffe9b0'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = c.cfg.opts.pole || '#7a4a1e'; pipes.forEach(function (p) { ctx.fillRect(p.x, 0, 50, p.gy); ctx.fillRect(p.x, p.gy + gap, 50, H); ctx.fillStyle = '#00000033'; ctx.fillRect(p.x, p.gy - 8, 50, 8); ctx.fillRect(p.x, p.gy + gap, 50, 8); ctx.fillStyle = c.cfg.opts.pole || '#7a4a1e'; });
      ctx.font = '40px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.save(); ctx.translate(80, by); ctx.rotate(clamp(vy / 700, -.5, .7)); ctx.fillText(c.hero, 0, 0); ctx.restore();
    });
  };

  /* ---------- catcher ---------- */
  E.catch = function (c) {
    var k = c.canvas(360, 480), ctx = k.ctx, W = 360, H = 480, goal = [100, 160, 230][c.r - 1], score = 0, lives = 3, bx = W / 2, items = [], spawn = 0, basket = c.cfg.opts.basket || '🧺';
    c.hud([['s', 'Score 0/' + goal], ['l', '❤️❤️❤️'], ['t', '40s']]);
    k.cv.addEventListener('pointermove', function (e) { bx = clamp(k.pt(e).x, 30, W - 30); }); k.cv.addEventListener('pointerdown', function (e) { bx = clamp(k.pt(e).x, 30, W - 30); e.preventDefault(); });
    c.key(function (e) { if (e.key === 'ArrowLeft') { bx = clamp(bx - 40, 30, W - 30); return 1; } if (e.key === 'ArrowRight') { bx = clamp(bx + 40, 30, W - 30); return 1; } });
    FG._st.state = function () { return { items: items, bx: bx }; }; FG._st.setBx = function (x) { bx = x; };
    c.timer(40, function (l) { c.set_('t', l + 's'); }, function () { c.end(score >= goal, score / goal * 100, 'Score ' + score + ' of ' + goal); });
    c.loop(function (dt, t) {
      spawn -= dt; if (spawn <= 0) { spawn = Math.max(.3, .75 - c.d * .15 - t * .004); var bad = Math.random() < .25 + c.d * .08; items.push({ x: 25 + rnd(W - 50), y: -20, vy: 170 + c.d * 60 + t * 2 + rnd(60), e: bad ? U.pick(hazard(c)) : U.pick(c.good), bad: bad }); }
      items.forEach(function (o) { o.y += o.vy * dt; });
      items = items.filter(function (o) { if (o.y > H - 70 && o.y < H - 20 && Math.abs(o.x - bx) < 42) { if (o.bad) { lives--; c.tone(150, .25, 'sawtooth'); c.set_('l', lives > 0 ? '❤️'.repeat(lives) : '💔'); if (lives <= 0) c.timeout(function () { c.end(false, score / goal * 100, 'Out of lives. Score ' + score); }, 150); } else { score += 10; c.tone(700 + rnd(300), .07); c.set_('s', 'Score ' + score + '/' + goal); if (score >= goal) c.timeout(function () { c.end(true, 100, ''); }, 100); } return false; } return o.y < H + 20; });
      var g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#120a26'); g.addColorStop(1, c.cfg.opts.sky || '#c9931a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      ctx.font = '36px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; items.forEach(function (o) { ctx.fillText(o.e, o.x, o.y); }); ctx.font = '64px serif'; ctx.fillText(basket, bx, H - 45);
    });
  };

  /* ---------- sling / aim and shoot ---------- */
  E.sling = function (c) {
    var k = c.canvas(360, 480), ctx = k.ctx, W = 360, H = 480, bx = W / 2, by = H - 60, n = [3, 4, 5][c.r - 1], balls = n + 3, used = 0, ball = null, aim = null, hits = 0, wind = c.r === 3 ? 18 : 0, targets = [], shards = [], te = c.cfg.opts.target || '🏺';
    for (var i = 0; i < n; i++) targets.push({ x: 50 + (i + .5) * (260 / n) + rnd(20), y: 90 + rnd(170), a: 10 + rnd(25), w: 1 + Math.random() * 1.5, p: Math.random() * 6, hit: 0 });
    c.hud([['h', 'Targets 0/' + n], ['b', 'Shots ' + balls]]);
    function pos(t, tm) { return { x: t.x + Math.sin(tm * t.w + t.p) * t.a * c.d * 2.2, y: t.y }; }
    function vel(p) { var dx = bx - p.x, dy = by - p.y, l = Math.hypot(dx, dy), m = Math.min(l, 110); if (l < 6) return null; return { vx: dx / l * m * 5.4, vy: dy / l * m * 5.4 }; }
    function launch(v) { if (ball) return; ball = { x: bx, y: by, vx: v.vx, vy: v.vy }; used++; c.set_('b', 'Shots ' + Math.max(0, balls - used)); c.tone(330, .1, 'triangle'); }
    k.cv.addEventListener('pointerdown', function (e) { var p = k.pt(e); if (!ball && Math.hypot(p.x - bx, p.y - by) < 90) { aim = p; try { k.cv.setPointerCapture(e.pointerId); } catch (x) {} } e.preventDefault(); });
    k.cv.addEventListener('pointermove', function (e) { if (aim) aim = k.pt(e); }); k.cv.addEventListener('pointerup', function (e) { if (!aim) return; var v = vel(k.pt(e)); aim = null; if (v) launch(v); });
    FG._st.launch = launch; FG._st.targets = function (tm) { return targets.filter(function (t) { return !t.hit; }).map(function (t) { return pos(t, tm); }); }; FG._st.bx = bx; FG._st.by = by; FG._st.wind = wind;
    var T = 0;
    c.loop(function (dt, t) {
      T = t;
      if (ball) { ball.vx += wind * dt; ball.vy += 520 * dt; ball.x += ball.vx * dt; ball.y += ball.vy * dt;
        targets.forEach(function (tg) { if (tg.hit) return; var p = pos(tg, t); if (Math.hypot(ball.x - p.x, ball.y - p.y) < 30) { tg.hit = 1; hits++; c.set_('h', 'Targets ' + hits + '/' + n); c.tone(240, .25, 'square'); for (var s = 0; s < 12; s++) shards.push({ x: p.x, y: p.y, vx: (Math.random() - .5) * 240, vy: -Math.random() * 200, l: 1 }); ball = null; } });
        if (ball && (ball.y > H + 20 || ball.x < -30 || ball.x > W + 30)) ball = null;
        if (hits >= n) { c.timeout(function () { c.end(true, 100 - Math.max(0, used - n) * 10, used + ' shots'); }, 600); } else if (!ball && used >= balls) c.timeout(function () { c.end(false, hits / n * 100, 'Out of shots. Hit ' + hits + ' of ' + n + '.'); }, 400); }
      var sky = ctx.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, '#1a1050'); sky.addColorStop(1, c.cfg.opts.sky || '#e08a3a'); ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#2b1a14'; ctx.fillRect(0, H - 40, W, 40);
      ctx.font = '48px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; targets.forEach(function (tg) { if (!tg.hit) { var p = pos(tg, t); ctx.fillText(te, p.x, p.y); } });
      if (aim) { var v = vel(aim); ctx.strokeStyle = '#ffffff88'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(aim.x, aim.y); ctx.stroke(); if (v) { ctx.fillStyle = '#fff'; var px = bx, py = by, vx = v.vx, vy = v.vy; for (var q = 0; q < 16; q++) { vx += wind * .04; vy += 520 * .04; px += vx * .04; py += vy * .04; ctx.fillRect(px - 2, py - 2, 4, 4); } } }
      ctx.font = '30px serif'; ctx.fillText(c.hero, ball ? ball.x : (aim ? aim.x : bx), ball ? ball.y : (aim ? aim.y : by));
      shards.forEach(function (s) { s.x += s.vx * dt; s.y += s.vy * dt; s.vy += 500 * dt; s.l -= dt; ctx.globalAlpha = Math.max(0, s.l); ctx.fillStyle = '#c0632a'; ctx.fillRect(s.x, s.y, 6, 6); }); ctx.globalAlpha = 1; shards = shards.filter(function (s) { return s.l > 0; });
      if (wind) { ctx.font = '14px system-ui'; ctx.fillStyle = '#fff'; ctx.fillText('wind →', 40, 20); }
    });
    FG._st.time = function () { return T; };
  };

  /* ---------- rhythm ---------- */
  E.rhythm = function (c) {
    var inst = c.cfg.opts.inst ? ['Low', 'Mid', 'High', 'Accent'].map(function (x) { return c.cfg.opts.inst + ' ' + x; }) : ['Drum', 'Cymbal', 'Flute', 'Bell'], bpm = [80, 96, 112][c.r - 1], beat = 60 / bpm, fall = 1.9 - c.d * .3, N = [20, 28, 36][c.r - 1], need = [55, 62, 70][c.r - 1], win = .15, notes = [], tc = 2, i;
    for (i = 0; i < N; i++) { notes.push({ lane: rnd(4), t: tc, hit: 0, done: 0 }); tc += beat * (c.r === 3 && i % 5 === 3 ? .5 : 1); }
    var k = c.canvas(360, 480), ctx = k.ctx, cols = ['#ff7b00', '#2a9d8f', '#e63946', '#3a86ff'], LW = 90, HY = 400, hits = 0, combo = 0, flash = [0, 0, 0, 0], jud = '', start = performance.now(), over = false;
    c.hud([['s', 'Hit 0/' + N], ['c', 'Combo 0']]);
    c.html('<div class="fg-row">' + inst.map(function (t, i) { return '<button type="button" class="fg-btn" data-l="' + i + '" style="min-width:72px;padding:16px 6px;font-size:.78rem">' + U.esc(t) + '<br><small>' + 'DFJK'[i] + '</small></button>'; }).join('') + '</div>');
    var now = function () { return (performance.now() - start) / 1000; }; FG._st.notes = notes; FG._st.now = now; FG._st.tap = tap;
    function tap(l) { if (over) return; var n0 = now(), best = null; notes.forEach(function (n) { if (n.lane === l && !n.done && Math.abs(n.t - n0) < win && (!best || Math.abs(n.t - n0) < Math.abs(best.t - n0))) best = n; }); flash[l] = .15; c.tone([196, 262, 330, 523][l], .09, 'square'); if (best) { best.done = best.hit = 1; hits++; combo++; jud = Math.abs(best.t - n0) < win * .5 ? 'Perfect!' : 'Good'; c.set_('s', 'Hit ' + hits + '/' + N); c.set_('c', 'Combo ' + combo); } else { combo = 0; c.set_('c', 'Combo 0'); jud = 'Miss'; } }
    c.key(function (e) { var l = 'dfjk'.indexOf(e.key.toLowerCase()); if (l >= 0) { tap(l); return 1; } });
    Array.prototype.forEach.call(c.el.querySelectorAll('[data-l]'), function (b) { b.addEventListener('pointerdown', function (e) { e.preventDefault(); tap(+b.getAttribute('data-l')); }); });
    c.loop(function (dt) {
      var n0 = now(); ctx.fillStyle = '#12081f'; ctx.fillRect(0, 0, 360, 480);
      for (var l = 0; l < 4; l++) { ctx.fillStyle = flash[l] > 0 ? cols[l] + '66' : '#ffffff0d'; ctx.fillRect(l * LW + 2, 0, LW - 4, 480); flash[l] = Math.max(0, flash[l] - dt); }
      ctx.strokeStyle = '#ffd54a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, HY); ctx.lineTo(360, HY); ctx.stroke(); var all = true;
      notes.forEach(function (n) { if (!n.done && n0 - n.t > win) { n.done = 1; combo = 0; c.set_('c', 'Combo 0'); } if (!n.done) all = false; if (n.hit) return; var y = HY - (n.t - n0) / fall * HY; if (y < -30 || y > 520) return; ctx.fillStyle = cols[n.lane]; ctx.beginPath(); ctx.arc(n.lane * LW + LW / 2, y, 28, 0, 7); ctx.fill(); });
      ctx.fillStyle = '#fff'; ctx.font = 'bold 22px system-ui'; ctx.textAlign = 'center'; ctx.fillText(jud, 180, 450);
      if (all && n0 > notes[notes.length - 1].t + .3) { over = true; var pct = Math.round(hits / N * 100); c.end(pct >= need, pct, pct + '% of the beats hit' + (pct < need ? '. You need ' + need + '%.' : '')); }
    });
  };

  /* ---------- pop and tap ---------- */
  E.whack = function (c) {
    var goal = [100, 150, 210][c.r - 1], score = 0, act = {}, over = false, holes = [];
    c.hud([['s', 'Score 0/' + goal], ['t', '30s']]);
    var d = c.html('<div id="wk" style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;width:min(92vw,360px);margin:0 auto"></div>').firstChild;
    for (var i = 0; i < 9; i++) { var b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', 'Hole'); b.style.cssText = 'aspect-ratio:1;border-radius:50%;background:radial-gradient(#000 40%,#3b2314 41%);position:relative;overflow:hidden;cursor:pointer;border:0;box-shadow:inset 0 8px 14px #000'; b.innerHTML = '<span style="position:absolute;left:0;right:0;bottom:-100%;text-align:center;font-size:2.6rem;transition:bottom .15s"></span>'; d.appendChild(b); holes.push(b); }
    function setUp(i, on, e) { var s = holes[i].firstChild; if (e) s.textContent = e; s.style.bottom = on ? '12%' : '-100%'; }
    FG._st.holes = function () { return act; };
    function pop() { if (over) return; var free = []; for (var i = 0; i < 9; i++) if (!act[i]) free.push(i); if (free.length) { var i2 = U.pick(free), bad = Math.random() < .22, e = bad ? U.pick(hazard(c)) : U.pick(c.good); act[i2] = { bad: bad }; setUp(i2, 1, e); c.timeout(function () { setUp(i2, 0); delete act[i2]; }, 750 - c.d * 200 + rnd(350)); } c.timeout(pop, 380 - c.d * 100 + rnd(280)); }
    holes.forEach(function (h, i) { h.addEventListener('click', function () { var a = act[i]; if (!a || over) return; if (a.bad) { score = Math.max(0, score - 15); c.tone(150, .2, 'sawtooth'); } else { score += 10; c.tone(660 + rnd(200), .07); } setUp(i, 0); delete act[i]; c.set_('s', 'Score ' + score + '/' + goal); if (score >= goal) { over = true; c.end(true, 100, ''); } }); });
    c.timer(30, function (l) { c.set_('t', l + 's'); }, function () { over = true; c.end(score >= goal, score / goal * 100, 'Score ' + score + ' of ' + goal); }); pop();
  };

  /* ---------- balance (pot on the head / swing / meditation) ---------- */
  E.balance = function (c) {
    var k = c.canvas(360, 480), ctx = k.ctx, W = 360, H = 480, T = [25, 35, 45][c.r - 1], th = 0, om = 0, u = 0, left = T, px = 180, over = false, tilt = .0;
    c.hud([['t', 'Hold ' + T + 's'], ['s', 'Steady']]);
    k.cv.addEventListener('pointermove', function (e) { u = clamp((k.pt(e).x - W / 2) / (W / 2), -1, 1); }); k.cv.addEventListener('pointerdown', function (e) { u = clamp((k.pt(e).x - W / 2) / (W / 2), -1, 1); e.preventDefault(); });
    c.key(function (e) { if (e.key === 'ArrowLeft') { u = clamp(u - .25, -1, 1); return 1; } if (e.key === 'ArrowRight') { u = clamp(u + .25, -1, 1); return 1; } });
    FG._st.state = function () { return { th: th, om: om }; }; FG._st.setU = function (v) { u = v; };
    c.loop(function (dt, t) {
      left -= dt; c.set_('t', 'Hold ' + Math.max(0, Math.ceil(left)) + 's'); var gust = Math.sin(t * 1.3) * (1.1 + c.d * 1.2) + Math.sin(t * 3.1 + 1) * .6 * (1 + c.d);
      var al = 2.2 * th + gust - u * 5.5; om += al * dt; om *= (1 - .6 * dt); th += om * dt; px += (180 + u * 70 - px) * Math.min(1, dt * 6);
      if (Math.abs(th) > 1.0) { over = true; c.end(false, (T - left) / T * 100, 'The pot fell after ' + Math.round(T - left) + ' seconds.'); return; }
      c.set_('s', Math.abs(th) < .35 ? '🟢 Steady' : Math.abs(th) < .7 ? '🟡 Wobbling' : '🔴 Danger!');
      if (left <= 0) { over = true; c.end(true, 100, ''); return; }
      var g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#120a26'); g.addColorStop(1, c.cfg.opts.sky || '#c9931a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#2b1a14'; ctx.fillRect(0, 400, W, 80);
      ctx.font = '120px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('🧍', px, 330); ctx.save(); ctx.translate(px, 250); ctx.rotate(th); ctx.font = '84px serif'; ctx.fillText(c.cfg.opts.pot || '🏺', 0, -26); ctx.restore();
      ctx.fillStyle = '#ffffff33'; ctx.fillRect(40, 440, 280, 8); ctx.fillStyle = '#ffd54a'; ctx.fillRect(180 + th / 1.0 * 140 - 4, 434, 8, 20);
    });
  };

  /* ---------- sprint race (tap alternately) ---------- */
  E.tug = function (c) {
    var laneN = 4, need = [3, 2, 1][c.r - 1], pos = [0, 0, 0, 0], ai = [0, 1, 2].map(function (i) { return 10 + c.d * 3 + i * .4 + Math.random(); }), last = '', sp = 0, over = false, fin = [], hint = c.cfg.opts.runner || c.hero;
    c.hud([['p', 'Place -'], ['d', '0%']]);
    var d = c.html('<div id="rc" style="width:min(94vw,380px);margin:0 auto"></div>').firstChild;
    d.innerHTML = [0, 1, 2, 3].map(function (i) { return '<div style="position:relative;height:50px;margin:6px 0;background:' + (i === 0 ? '#ffffff2a' : '#ffffff14') + ';border-radius:10px;overflow:hidden"><div id="rn' + i + '" style="position:absolute;left:0;top:6px;font-size:2rem;transition:left .1s linear">' + (i === 0 ? hint : U.pick(c.set)) + '</div><div style="position:absolute;right:6px;top:8px;font-size:1.6rem">🏁</div></div>'; }).join('');
    c.html('<div class="fg-row"><button type="button" class="fg-btn" id="tl" style="min-width:130px;padding:22px 10px">◀ LEFT</button><button type="button" class="fg-btn" id="tr" style="min-width:130px;padding:22px 10px">RIGHT ▶</button></div>');
    function tap(s) { if (over) return; if (s === last) { sp = Math.max(0, sp - 1.2); c.tone(140, .05, 'square'); return; } last = s; sp = Math.min(22, sp + 1.5); c.tone(s === 'L' ? 330 : 392, .04, 'triangle'); }
    FG._st.tap = tap; $('tl').addEventListener('pointerdown', function (e) { e.preventDefault(); tap('L'); }); $('tr').addEventListener('pointerdown', function (e) { e.preventDefault(); tap('R'); });
    c.key(function (e) { if (e.key === 'ArrowLeft' || e.key === 'z') { tap('L'); return 1; } if (e.key === 'ArrowRight' || e.key === 'x') { tap('R'); return 1; } });
    c.loop(function (dt) {
      sp = Math.max(0, sp - 5 * dt); pos[0] += sp * dt * 1.15; for (var i = 1; i < 4; i++) pos[i] += (ai[i - 1] + Math.sin(performance.now() / 700 + i) * 1.5) * dt;
      for (i = 0; i < 4; i++) { var e = $('rn' + i); if (e) e.style.left = 'calc(' + Math.min(100, pos[i]) + '% - ' + (Math.min(100, pos[i]) * .09) + 'px)'; if (pos[i] >= 100 && fin.indexOf(i) < 0) fin.push(i); }
      c.set_('d', Math.min(100, Math.round(pos[0])) + '%'); c.set_('p', 'Place ' + (1 + pos.filter(function (p, j) { return j && p > pos[0]; }).length));
      if (fin.indexOf(0) >= 0 && !over) { over = true; var place = fin.indexOf(0) + 1; c.end(place <= need, 100 - (place - 1) * 28, 'You finished ' + ['', '1st', '2nd', '3rd', '4th'][place] + (place > need ? '. You need to finish ' + ['', '1st', 'in the top 2', 'in the top 3'][need] + '.' : '')); }
    });
  };

  /* ---------- tower stacking ---------- */
  E.stack = function (c) {
    var k = c.canvas(360, 480), ctx = k.ctx, W = 360, H = 480, goal = [8, 12, 16][c.r - 1], BH = 30, tower = [{ x: 105, w: 150 }], cur = { x: 0, w: 150, dir: 1 }, speed = 150 + c.d * 60, cam = 0, floors = 0, over = false;
    c.hud([['f', 'Height 0/' + goal]]);
    function drop() { if (over) return; var b = tower[tower.length - 1], l = Math.max(cur.x, b.x), r2 = Math.min(cur.x + cur.w, b.x + b.w), w = r2 - l; if (w <= 4) { over = true; c.tone(150, .3, 'sawtooth'); c.end(false, floors / goal * 100, 'The tower fell at height ' + floors + '.'); return; } if (Math.abs(cur.x - b.x) < 5) { l = b.x; w = b.w; c.tone(880, .1); } else c.tone(520, .08); tower.push({ x: l, w: w }); floors++; c.set_('f', 'Height ' + floors + '/' + goal); cur = { x: dirStart(), w: w, dir: floors % 2 ? -1 : 1 }; speed += 6; if (floors >= goal) { over = true; c.timeout(function () { c.end(true, 100, ''); }, 300); } }
    function dirStart() { return floors % 2 ? W : -150; }
    cur.x = -150; FG._st.drop = drop; FG._st.state = function () { return { cur: cur, top: tower[tower.length - 1] }; };
    k.cv.addEventListener('pointerdown', function (e) { drop(); e.preventDefault(); }); c.key(function (e) { if (e.key === ' ' || e.key === 'Enter') { drop(); return 1; } });
    c.loop(function (dt, t) {
      cur.x += cur.dir * speed * dt; if (cur.x > W - 20 && cur.dir > 0) cur.dir = -1; if (cur.x + cur.w < 20 && cur.dir < 0) cur.dir = 1;
      var target = Math.max(0, (tower.length - 7) * BH); cam += (target - cam) * Math.min(1, dt * 4);
      var g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#120a26'); g.addColorStop(1, c.cfg.opts.sky || '#d98b3a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#2b1a14'; ctx.fillRect(0, H - 40 + cam, W, 200);
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; tower.forEach(function (b, i) { var y = H - 40 - (i + 1) * BH + cam; ctx.fillStyle = ['#e63946', '#f4b400', '#2a9d8f', '#3a86ff', '#c77dff', '#ff7b00'][i % 6]; ctx.fillRect(b.x, y, b.w, BH - 2); ctx.font = '22px serif'; ctx.fillText(c.set[i % c.set.length], b.x + b.w / 2, y + BH / 2); });
      var y2 = H - 40 - (tower.length + 1) * BH + cam; ctx.fillStyle = '#ffffffcc'; ctx.fillRect(cur.x, y2, cur.w, BH - 2); ctx.font = '22px serif'; ctx.fillStyle = '#000'; ctx.fillText(c.hero, cur.x + cur.w / 2, y2 + BH / 2);
    });
  };

  /* ---------- archery ---------- */
  E.archery = function (c) {
    var k = c.canvas(360, 480), ctx = k.ctx, W = 360, H = 480, bx = 50, by = 400, goal = [25, 32, 40][c.r - 1], arrows = 5, used = 0, score = 0, aim = { x: 200, y: 300 }, charge = 0, charging = false, shot = null, wind = c.r >= 2 ? (c.r === 2 ? 25 : -40) : 0, over = false, marks = [], te = c.cfg.opts.target || '🎯', tt = 0;
    c.hud([['s', 'Score 0/' + goal], ['a', 'Arrows 5']]);
    function tgt(t) { return { x: 300, y: 220 + Math.sin(t * (.9 + c.d * .7)) * 120 }; }
    function release() { if (!charging || shot || over) return; charging = false; var ang = Math.atan2(by - aim.y, aim.x - bx), pw = 300 + charge * 4.6; shot = { x: bx, y: by, vx: Math.cos(ang) * pw, vy: -Math.sin(ang) * pw, a: ang }; used++; c.set_('a', 'Arrows ' + (arrows - used)); c.tone(260, .1, 'triangle'); charge = 0; }
    k.cv.addEventListener('pointermove', function (e) { aim = k.pt(e); }); k.cv.addEventListener('pointerdown', function (e) { aim = k.pt(e); if (!shot) charging = true; e.preventDefault(); }); k.cv.addEventListener('pointerup', release); window.addEventListener('pointerup', release); c.on(function () { window.removeEventListener('pointerup', release); });
    FG._st.state = function () { return { tgt: tgt(tt), bx: bx, by: by, wind: wind }; }; FG._st.fire = function (ang, pw) { aim = { x: bx + Math.cos(ang) * 100, y: by - Math.sin(ang) * 100 }; charge = pw; charging = true; release(); }; FG._st.time = function () { return tt; };
    c.loop(function (dt, t) {
      tt = t; if (charging) charge = Math.min(100, charge + 70 * dt);
      if (shot) { shot.vx += wind * dt; shot.vy += 380 * dt; shot.x += shot.vx * dt; shot.y += shot.vy * dt; shot.a = Math.atan2(-shot.vy, shot.vx); var tg = tgt(t), d = Math.hypot(shot.x - tg.x, shot.y - tg.y);
        if (shot.x >= tg.x - 6 && shot.x <= tg.x + 14 && d < 46) { var s = d < 12 ? 10 : d < 26 ? 7 : 4; score += s; marks.push({ x: shot.x, y: shot.y - tg.y, t: t }); c.set_('s', 'Score ' + score + '/' + goal); c.tone(s === 10 ? 988 : 660, .15); c.say(s === 10 ? 'Bullseye! +10' : '+' + s, true); shot = null; }
        else if (shot.x > W + 20 || shot.y > H || shot.x < -20) { shot = null; c.say('Missed', false); }
        if (!shot) { if (score >= goal) { over = true; c.timeout(function () { c.end(true, 100, ''); }, 400); } else if (used >= arrows) { over = true; c.timeout(function () { c.end(false, score / goal * 100, 'Score ' + score + ' of ' + goal + '.'); }, 400); } } }
      var g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#1a1050'); g.addColorStop(1, c.cfg.opts.sky || '#e08a3a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#2b1a14'; ctx.fillRect(0, 430, W, 50);
      var tg2 = tgt(t); ctx.font = '84px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(te, tg2.x, tg2.y); ctx.font = '50px serif'; ctx.fillText(c.hero, bx - 6, by + 4);
      if (!shot && !over) { var ang = Math.atan2(by - aim.y, aim.x - bx); ctx.strokeStyle = '#ffffff99'; ctx.lineWidth = 2; ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + Math.cos(ang) * 90, by - Math.sin(ang) * 90); ctx.stroke(); ctx.setLineDash([]); }
      if (shot) { ctx.save(); ctx.translate(shot.x, shot.y); ctx.rotate(-shot.a); ctx.fillStyle = '#fff'; ctx.fillRect(-18, -1.5, 36, 3); ctx.restore(); }
      ctx.fillStyle = '#ffffff33'; ctx.fillRect(20, 455, 200, 10); ctx.fillStyle = charge > 80 ? '#ff5a5a' : '#ffd54a'; ctx.fillRect(20, 455, charge * 2, 10);
      if (wind) { ctx.font = '14px system-ui'; ctx.fillStyle = '#fff'; ctx.textAlign = 'left'; ctx.fillText('wind ' + (wind > 0 ? '→' : '←'), 240, 462); }
    });
  };

  /* ---------- kite battle ---------- */
  E.kite = function (c) {
    var k = c.canvas(360, 480), ctx = k.ctx, W = 360, H = 480, n = [2, 3, 4][c.r - 1], me = { x: 180, y: 300 }, tgt = { x: 180, y: 300 }, hold = false, lives = 3, riv = [], held = 0, cutT = 0, kk = ['🪁', '🪁', '🪁', '🪁'];
    for (var i = 0; i < n; i++) riv.push({ x: 60 + i * 80, y: 120 + rnd(150), p: Math.random() * 6, s: .6 + Math.random() * .5 + c.d * .3, dead: 0, vy: 0 });
    c.hud([['k', 'Cut 0/' + n], ['l', '❤️❤️❤️'], ['t', '45s']]);
    k.cv.addEventListener('pointermove', function (e) { tgt = k.pt(e); }); k.cv.addEventListener('pointerdown', function (e) { tgt = k.pt(e); hold = true; e.preventDefault(); }); window.addEventListener('pointerup', up); function up() { hold = false; } c.on(function () { window.removeEventListener('pointerup', up); });
    c.key(function (e) { if (e.key === 'ArrowLeft') { tgt.x -= 40; return 1; } if (e.key === 'ArrowRight') { tgt.x += 40; return 1; } if (e.key === 'ArrowUp') { tgt.y -= 40; return 1; } if (e.key === 'ArrowDown') { tgt.y += 40; return 1; } if (e.key === ' ') { hold = true; c.timeout(function () { hold = false; }, 500); return 1; } });
    FG._st.state = function () { return { me: me, riv: riv }; }; FG._st.setT = function (x, y, h) { tgt = { x: x, y: y }; hold = !!h; };
    var cut = 0; c.timer(45, function (l) { c.set_('t', l + 's'); }, function () { c.end(false, cut / n * 100, 'Time is up. You cut ' + cut + ' of ' + n + '.'); });
    c.loop(function (dt, t) {
      me.x += (tgt.x - me.x) * Math.min(1, dt * (hold ? 9 : 4)); me.y += (tgt.y - me.y) * Math.min(1, dt * (hold ? 9 : 4)); me.x = clamp(me.x, 20, W - 20); me.y = clamp(me.y, 40, H - 90); cutT = Math.max(0, cutT - dt);
      riv.forEach(function (r, i) { if (r.dead) { r.vy += 300 * dt; r.y += r.vy * dt; return; } r.p += dt * r.s; r.x = 180 + Math.sin(r.p + i * 1.7) * 140; r.y = 130 + Math.cos(r.p * .8 + i) * 80 + i * 22;
        if (Math.hypot(r.x - me.x, r.y - me.y) < 36) { if (hold) { r.dead = 1; cut++; c.set_('k', 'Cut ' + cut + '/' + n); c.tone(880, .15); if (cut >= n) c.timeout(function () { c.end(true, 100, ''); }, 400); } else { r.near = (r.near || 0) + dt; if (r.near > .7 && cutT <= 0) { lives--; cutT = 1.2; r.near = 0; c.tone(150, .25, 'sawtooth'); c.set_('l', lives > 0 ? '❤️'.repeat(lives) : '💔'); if (lives <= 0) c.timeout(function () { c.end(false, cut / n * 100, 'Your string got cut.'); }, 150); } } } else r.near = 0; });
      var g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, c.cfg.opts.sky || '#4aa8ff'); g.addColorStop(1, '#ffe9b0'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.strokeStyle = '#ffffffaa'; ctx.lineWidth = 1.5;
      riv.forEach(function (r) { if (r.dead && r.y > H + 40) return; ctx.beginPath(); ctx.moveTo(r.x, r.y); ctx.quadraticCurveTo(r.x + 20, (r.y + H) / 2, 180 + (r.x - 180) * .4, H); ctx.stroke(); ctx.font = '44px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(c.set[(riv.indexOf(r) + 1) % c.set.length] === '' ? '🪁' : '🪁', r.x, r.y); });
      ctx.strokeStyle = hold ? '#ffd54a' : '#fff'; ctx.lineWidth = hold ? 3 : 2; ctx.beginPath(); ctx.moveTo(me.x, me.y); ctx.quadraticCurveTo(me.x - 10, (me.y + H) / 2, 180, H); ctx.stroke(); ctx.font = '54px serif'; ctx.globalAlpha = cutT > 0 && Math.floor(t * 12) % 2 ? .4 : 1; ctx.fillText(c.cfg.opts.kite || '🪁', me.x, me.y); ctx.globalAlpha = 1;
      if (hold) { ctx.font = '14px system-ui'; ctx.fillStyle = '#fff'; ctx.fillText('PULL!', me.x, me.y - 40); }
    });
  };
})();
