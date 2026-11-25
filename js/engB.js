/* ===== FESTORA GAMES v3 - ENGINES B: puzzle, strategy, race ===== */
(function () {
  'use strict';
  var FG = window.FG; if (!FG) return; var E = FG.E, U = FG.U, $ = U.$, rnd = U.rnd, clamp = U.clamp, esc = U.esc;
  var EXTRA = ['🎁', '⭐', '🌸', '🔔', '🍬', '🎶', '🪔', '🌼', '🥁', '🎉', '🍯', '🌿'];
  function pool(c, n) { var out = [], s = c.set.slice(); EXTRA.forEach(function (e) { if (s.indexOf(e) < 0) s.push(e); }); s = U.shuffle(s); for (var i = 0; i < n; i++) out.push(s[i]); return out; }

  /* ---------- 3D memory flip ---------- */
  E.memory = function (c) {
    var np = [6, 8, 10][c.r - 1], items = pool(c, np), deck = U.shuffle(items.concat(items)), open = [], matched = 0, moves = 0, lock = false, T = [60, 70, 85][c.r - 1];
    c.hud([['m', 'Moves 0'], ['t', T + 's']]);
    var st = document.createElement('style'); st.textContent = '.mc{aspect-ratio:3/4;position:relative;transform-style:preserve-3d;transition:transform .45s;cursor:pointer;border:0;background:none;padding:0}.mc.f,.mc.m{transform:rotateY(180deg)}.mc span{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;display:flex;align-items:center;justify-content:center;border-radius:12px;font-size:1.9rem;box-shadow:0 5px 12px #0006}.mc .bk{background:linear-gradient(135deg,var(--a),var(--b));border:2px solid #fff8}.mc .fr{background:#fff;transform:rotateY(180deg)}.mc.m .fr{background:#d4f8d4;box-shadow:0 0 14px #7cff7c}'; c.el.appendChild(st);
    var d = c.html('<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;width:min(92vw,400px);perspective:900px;margin:0 auto"></div>').firstChild;
    deck.forEach(function (e, i) { d.insertAdjacentHTML('beforeend', '<button type="button" class="mc" data-i="' + i + '" aria-label="Card"><span class="bk">❓</span><span class="fr">' + e + '</span></button>'); });
    var cards = d.querySelectorAll('.mc'); FG._st.deck = deck;
    c.timer(T, function (l) { c.set_('t', l + 's'); }, function () { c.end(false, matched / np * 100, 'Time is up. You found ' + matched + ' of ' + np + ' pairs.'); });
    Array.prototype.forEach.call(cards, function (b) { b.addEventListener('click', function () { var i = +b.getAttribute('data-i'); if (lock || b.classList.contains('f') || b.classList.contains('m')) return; b.classList.add('f'); open.push(i); c.tone(440 + i * 15, .07);
      if (open.length === 2) { moves++; c.set_('m', 'Moves ' + moves); lock = true; var a = open[0], q = open[1]; if (deck[a] === deck[q]) c.timeout(function () { cards[a].classList.replace('f', 'm'); cards[q].classList.replace('f', 'm'); open = []; lock = false; matched++; c.tone(784, .12); if (matched === np) c.end(true, clamp(100 - Math.max(0, moves - np) * 4, 40, 100), moves + ' moves'); }, 400); else c.timeout(function () { cards[a].classList.remove('f'); cards[q].classList.remove('f'); open = []; lock = false; c.tone(200, .1, 'square'); }, 750); } }); });
  };

  /* ---------- match-3 ---------- */
  E.match3 = function (c) {
    var N = 6, K = 5, types = c.set.slice(0, K), goal = [600, 900, 1300][c.r - 1], moves = [18, 17, 16][c.r - 1], score = 0, sel = null, busy = false, b = [];
    function rr() { return rnd(K); }
    function find() { var m = {}, i, j; for (i = 0; i < N; i++) for (j = 0; j < N; j++) { if (b[i][j] < 0) continue; if (j < N - 2 && b[i][j] === b[i][j + 1] && b[i][j] === b[i][j + 2]) { m[i + ',' + j] = m[i + ',' + (j + 1)] = m[i + ',' + (j + 2)] = 1; } if (i < N - 2 && b[i][j] === b[i + 1][j] && b[i][j] === b[i + 2][j]) { m[i + ',' + j] = m[(i + 1) + ',' + j] = m[(i + 2) + ',' + j] = 1; } } return m; }
    function fill() { for (var i = 0; i < N; i++) { b[i] = []; for (var j = 0; j < N; j++) b[i][j] = rr(); } var g = 0; while (Object.keys(find()).length && g++ < 200) for (i = 0; i < N; i++) for (j = 0; j < N; j++) b[i][j] = rr(); }
    function swap(a, z, x, y) { var t = b[a][z]; b[a][z] = b[x][y]; b[x][y] = t; }
    function hasMove() { for (var i = 0; i < N; i++) for (var j = 0; j < N; j++) for (var d = 0; d < 2; d++) { var x = i + (d ? 0 : 1), y = j + (d ? 1 : 0); if (x < N && y < N) { swap(i, j, x, y); var ok = Object.keys(find()).length > 0; swap(i, j, x, y); if (ok) return true; } } return false; }
    fill(); var g2 = 0; while (!hasMove() && g2++ < 50) fill();
    c.hud([['s', 'Score 0/' + goal], ['m', 'Moves ' + moves]]);
    var wrap = c.html('<div id="m3" style="display:grid;grid-template-columns:repeat(' + N + ',1fr);gap:5px;width:min(92vw,380px);margin:0 auto;padding:8px;background:#0006;border-radius:14px"></div>').firstChild;
    function draw() { wrap.innerHTML = ''; for (var i = 0; i < N; i++) for (var j = 0; j < N; j++) { var bt = document.createElement('button'); bt.type = 'button'; bt.className = 'fg-cell' + (sel && sel[0] === i && sel[1] === j ? ' sel' : ''); bt.style.aspectRatio = '1'; bt.style.fontSize = '1.7rem'; bt.textContent = b[i][j] >= 0 ? types[b[i][j]] : ''; bt.setAttribute('data-r', i); bt.setAttribute('data-c', j); bt.setAttribute('aria-label', 'Tile'); (function (i2, j2) { bt.addEventListener('click', function () { clickCell(i2, j2); }); })(i, j); wrap.appendChild(bt); } }
    function cascade(chain) {
      var m = find(), keys = Object.keys(m); if (!keys.length) { busy = false; draw(); if (score >= goal) { c.end(true, 100, ''); return; } if (moves <= 0) { c.end(false, score / goal * 100, 'Out of moves. Score ' + score + ' of ' + goal + '.'); return; } var g3 = 0; while (!hasMove() && g3++ < 50) fill(); draw(); return; }
      score += keys.length * 10 * chain; c.set_('s', 'Score ' + score + '/' + goal); c.tone(500 + chain * 100, .1); keys.forEach(function (k) { var p = k.split(','); b[+p[0]][+p[1]] = -1; }); draw();
      c.timeout(function () { for (var j = 0; j < N; j++) { var col = []; for (var i = N - 1; i >= 0; i--) if (b[i][j] >= 0) col.push(b[i][j]); while (col.length < N) col.push(rr()); for (i = N - 1; i >= 0; i--) b[i][j] = col[N - 1 - i]; } draw(); c.timeout(function () { cascade(chain + 1); }, 220); }, 220);
    }
    function clickCell(i, j) {
      if (busy) return; if (!sel) { sel = [i, j]; draw(); return; } var a = sel[0], z = sel[1]; sel = null;
      if (Math.abs(a - i) + Math.abs(z - j) !== 1) { sel = [i, j]; draw(); return; }
      swap(a, z, i, j); if (!Object.keys(find()).length) { swap(a, z, i, j); c.tone(160, .15, 'sawtooth'); draw(); c.say('That swap makes no match.', false); return; }
      busy = true; moves--; c.set_('m', 'Moves ' + moves); c.say('', true); cascade(1);
    }
    FG._st.state = function () { return { b: b, N: N, busy: busy, moves: moves }; }; FG._st.swapTry = clickCell; draw();
  };

  /* ---------- sliding puzzle ---------- */
  E.slide = function (c) {
    var dims = [[3, 3], [3, 4], [4, 4]][c.r - 1], R = dims[0], C = dims[1], n = R * C, b = [], i, last = -1, moves = 0, T = [120, 150, 200][c.r - 1], em = pool(c, n - 1);
    for (i = 0; i < n - 1; i++) b.push(i + 1); b.push(0);
    function nb(z) { var r = Math.floor(z / C), q = z % C, o = []; if (r > 0) o.push(z - C); if (r < R - 1) o.push(z + C); if (q > 0) o.push(z - 1); if (q < C - 1) o.push(z + 1); return o; }
    for (var s = 0; s < [90, 140, 220][c.r - 1]; s++) { var z = b.indexOf(0), o = nb(z).filter(function (x) { return x !== last; }), m = o[rnd(o.length)]; last = z; b[z] = b[m]; b[m] = 0; }
    function solved() { return b.every(function (v, k) { return v === (k + 1) % n; }); }
    if (solved()) { var z0 = b.indexOf(0), m0 = nb(z0)[0]; b[z0] = b[m0]; b[m0] = 0; }
    c.hud([['m', 'Moves 0'], ['t', T + 's']]);
    var wrap = c.html('<div style="display:grid;grid-template-columns:repeat(' + C + ',1fr);gap:7px;width:min(86vw,' + (C * 82) + 'px);margin:0 auto;perspective:800px"></div>').firstChild;
    function draw() { wrap.innerHTML = ''; b.forEach(function (v, k) { var bt = document.createElement('button'); bt.type = 'button'; bt.className = 'fg-cell'; bt.style.cssText = 'aspect-ratio:1;font-size:1.9rem;position:relative;background:' + (v ? 'linear-gradient(135deg,#fff,#ffe9b8)' : 'transparent') + ';color:#4a1d6b;box-shadow:' + (v ? '0 5px 0 #0005' : 'none') + ';visibility:' + (v ? 'visible' : 'hidden'); if (v) bt.innerHTML = '<small style="position:absolute;top:3px;left:7px;font-size:.65rem;font-weight:800">' + v + '</small>' + em[v - 1]; bt.addEventListener('click', function () { var z = b.indexOf(0); if (nb(z).indexOf(k) < 0) { c.tone(180, .06, 'square'); return; } b[z] = b[k]; b[k] = 0; moves++; c.set_('m', 'Moves ' + moves); c.tone(520, .05); draw(); if (solved()) c.end(true, clamp(110 - moves * 1.2, 45, 100), moves + ' moves'); }); wrap.appendChild(bt); }); }
    FG._st.state = function () { return { b: b, R: R, C: C }; }; FG._st.move = function (k) { var z = b.indexOf(0); if (nb(z).indexOf(k) >= 0) { b[z] = b[k]; b[k] = 0; moves++; draw(); if (solved()) c.end(true, 80, ''); } };
    c.timer(T, function (l) { c.set_('t', l + 's'); }, function () { c.end(false, 30, 'Time is up.'); }); draw();
  };

  /* ---------- hidden objects ---------- */
  E.hidden = function (c) {
    var n = [5, 7, 9][c.r - 1], T = [60, 65, 70][c.r - 1], all = pool(c, 12), want = all.slice(0, n), clutter = all.slice(n).concat(EXTRA).filter(function (e) { return want.indexOf(e) < 0; }), found = 0, wrong = 0, over = false;
    c.hud([['f', 'Found 0/' + n], ['t', T + 's']]);
    c.html('<div class="fg-row" id="hl">' + want.map(function (e, i) { return '<span class="fg-pill" id="hw' + i + '" style="font-size:1.3rem">' + e + '</span>'; }).join('') + '</div>');
    var field = c.html('<div style="position:relative;width:min(94vw,420px);height:340px;margin:0 auto;border-radius:16px;overflow:hidden;background:linear-gradient(' + (c.cfg.opts.sky || '#8a6a3a') + ',#3a2a14);box-shadow:inset 0 0 40px #0008"></div>').firstChild;
    var arr = []; want.forEach(function (e, i) { arr.push({ e: e, w: i }); }); for (var q = 0; q < 34 + c.r * 8; q++) arr.push({ e: U.pick(clutter), w: -1 });
    U.shuffle(arr).forEach(function (it) { var bt = document.createElement('button'); bt.type = 'button'; bt.textContent = it.e; bt.setAttribute('aria-label', it.w >= 0 ? 'Hidden item' : 'Decoration'); bt.style.cssText = 'position:absolute;border:0;background:none;cursor:pointer;padding:0;font-size:' + (it.w >= 0 ? 24 : 24 + rnd(10)) + 'px;left:' + (Math.random() * 90) + '%;top:' + (Math.random() * 88) + '%;opacity:' + (it.w >= 0 ? .85 : .75) + ';z-index:' + (it.w >= 0 ? 2 : 1); bt.setAttribute('data-w', it.w);
      bt.addEventListener('click', function () { if (over || bt.disabled) return; if (it.w >= 0) { bt.disabled = true; found++; bt.style.transform = 'scale(1.8)'; bt.style.opacity = .3; var p = $('hw' + it.w); if (p) p.style.opacity = .3; c.set_('f', 'Found ' + found + '/' + n); c.tone(700 + found * 40, .1); if (found === n) { over = true; c.end(true, clamp(100 - wrong * 5, 50, 100), ''); } } else { wrong++; tm.add(-3); c.tone(160, .15, 'sawtooth'); } }); field.appendChild(bt); });
    var tm = c.timer(T, function (l) { c.set_('t', l + 's'); }, function () { over = true; c.end(false, found / n * 100, 'Time is up. Found ' + found + ' of ' + n + '.'); });
  };

  /* ---------- maze ---------- */
  E.maze = function (c) {
    var n = [9, 11, 13][c.r - 1], grid = [], i, j, k = c.canvas(360, 360), ctx = k.ctx, cs = 360 / n, T = [90, 100, 110][c.r - 1], lives = 3, got = 0, nItems = 4, px = 1, py = 1, guard = c.r >= 2 ? { x: n - 2, y: 1, t: 0 } : null, over = false;
    for (i = 0; i < n; i++) { grid[i] = []; for (j = 0; j < n; j++) grid[i][j] = 1; }
    (function carve(x, y) { grid[y][x] = 0; var d = U.shuffle([[2, 0], [-2, 0], [0, 2], [0, -2]]); d.forEach(function (v) { var nx = x + v[0], ny = y + v[1]; if (nx > 0 && ny > 0 && nx < n - 1 && ny < n - 1 && grid[ny][nx]) { grid[y + v[1] / 2][x + v[0] / 2] = 0; carve(nx, ny); } }); })(1, 1);
    for (i = 0; i < 2 + c.r; i++) { var x = 1 + 2 * rnd((n - 1) / 2), y = 1 + 2 * rnd((n - 1) / 2); grid[y][x + 1 < n - 1 ? x + 1 : x] = 0; }
    var items = [], free = []; for (i = 1; i < n - 1; i++) for (j = 1; j < n - 1; j++) if (!grid[i][j] && !(i === 1 && j === 1) && !(i === n - 2 && j === n - 2)) free.push([j, i]); U.shuffle(free).slice(0, nItems).forEach(function (p, q) { items.push({ x: p[0], y: p[1], e: c.good[q % c.good.length], got: 0 }); }); grid[n - 2][n - 2] = 0;
    c.hud([['i', 'Items 0/' + nItems], ['l', '❤️❤️❤️'], ['t', T + 's']]);
    function move(dx, dy) { if (over) return; var nx = px + dx, ny = py + dy; if (nx < 0 || ny < 0 || nx >= n || ny >= n || grid[ny][nx]) return; px = nx; py = ny; c.tone(300, .03, 'triangle'); items.forEach(function (it) { if (!it.got && it.x === px && it.y === py) { it.got = 1; got++; c.set_('i', 'Items ' + got + '/' + nItems); c.tone(760, .1); } }); if (px === n - 2 && py === n - 2) { if (got >= nItems) { over = true; c.end(true, clamp(100 - (3 - lives) * 15, 50, 100), ''); } else c.say('Collect all the items first!', false); } draw(); }
    c.key(function (e) { var m = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1], a: [-1, 0], d: [1, 0], w: [0, -1], s: [0, 1] }[e.key]; if (m) { move(m[0], m[1]); return 1; } });
    var sx, sy; k.cv.addEventListener('pointerdown', function (e) { var p = k.pt(e); sx = p.x; sy = p.y; }); k.cv.addEventListener('pointerup', function (e) { var p = k.pt(e), dx = p.x - sx, dy = p.y - sy; if (Math.max(Math.abs(dx), Math.abs(dy)) < 12) return; if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? 1 : -1, 0); else move(0, dy > 0 ? 1 : -1); });
    c.html('<div class="fg-dp"><span></span><button type="button" data-d="u" aria-label="Up">▲</button><span></span><button type="button" data-d="l" aria-label="Left">◀</button><button type="button" data-d="d" aria-label="Down">▼</button><button type="button" data-d="r" aria-label="Right">▶</button></div>');
    Array.prototype.forEach.call(c.el.querySelectorAll('[data-d]'), function (b) { b.addEventListener('click', function () { var d = b.getAttribute('data-d'); move(d === 'l' ? -1 : d === 'r' ? 1 : 0, d === 'u' ? -1 : d === 'd' ? 1 : 0); }); });
    function draw() { ctx.fillStyle = '#1b0f2e'; ctx.fillRect(0, 0, 360, 360); for (var y2 = 0; y2 < n; y2++) for (var x2 = 0; x2 < n; x2++) if (grid[y2][x2]) { ctx.fillStyle = c.cfg.opts.wall || '#6b3f8f'; ctx.fillRect(x2 * cs, y2 * cs, cs, cs); ctx.fillStyle = '#ffffff18'; ctx.fillRect(x2 * cs, y2 * cs, cs, 3); }
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = (cs * .7) + 'px serif'; items.forEach(function (it) { if (!it.got) ctx.fillText(it.e, (it.x + .5) * cs, (it.y + .55) * cs); }); ctx.fillText(got >= nItems ? '🚪' : '🔒', (n - 1.5) * cs, (n - 1.45) * cs); if (guard) ctx.fillText(c.bad[0], (guard.x + .5) * cs, (guard.y + .55) * cs); ctx.fillText(c.hero, (px + .5) * cs, (py + .55) * cs); }
    FG._st.state = function () { return { grid: grid, px: px, py: py, items: items, n: n, guard: guard }; }; FG._st.move = move;
    c.timer(T, function (l) { c.set_('t', l + 's'); }, function () { over = true; c.end(false, got / nItems * 100, 'Time is up.'); });
    if (guard) c.loop(function (dt) { guard.t += dt; if (guard.t > .55 - c.d * .15) { guard.t = 0; var ds = U.shuffle([[1, 0], [-1, 0], [0, 1], [0, -1]]).filter(function (v) { return !grid[guard.y + v[1]] || !grid[guard.y + v[1]][guard.x + v[0]]; }); var best = ds[0]; ds.forEach(function (v) { if (Math.random() < .6 && Math.hypot(guard.x + v[0] - px, guard.y + v[1] - py) < Math.hypot(guard.x + best[0] - px, guard.y + best[1] - py)) best = v; }); if (best) { guard.x += best[0]; guard.y += best[1]; } if (guard.x === px && guard.y === py) { lives--; c.tone(150, .25, 'sawtooth'); c.set_('l', lives > 0 ? '❤️'.repeat(lives) : '💔'); px = 1; py = 1; guard.x = n - 2; guard.y = 1; if (lives <= 0) { over = true; c.end(false, got / nItems * 100, 'The guard caught you.'); } } draw(); } });
    draw();
  };

  /* ---------- cooking timing ---------- */
  E.cook = function (c) {
    var k = c.canvas(360, 400), ctx = k.ctx, goal = [14, 20, 26][c.r - 1], total = [34, 42, 50][c.r - 1], heat = 20, inZone = 0, hold = false, tl = total, call = null, nextCall = 6, ing = U.shuffle(c.set).slice(0, 4), lost = 0;
    c.hud([['z', 'Cooked 0/' + goal + 's'], ['t', total + 's']]);
    c.html('<div class="fg-row"><button type="button" class="fg-btn" id="stir" style="min-width:150px;padding:18px">🔥 HOLD to STIR</button></div><div class="fg-row" id="ings">' + ing.map(function (e, i) { return '<button type="button" class="fg-btn alt" data-i="' + e + '" style="font-size:1.6rem;min-width:60px">' + e + '</button>'; }).join('') + '</div>');
    var sb = $('stir'); sb.addEventListener('pointerdown', function (e) { hold = true; e.preventDefault(); }); window.addEventListener('pointerup', up); function up() { hold = false; } c.on(function () { window.removeEventListener('pointerup', up); });
    c.key(function (e) { if (e.key === ' ') { hold = true; c.timeout(function () { hold = false; }, 160); return 1; } });
    Array.prototype.forEach.call(c.el.querySelectorAll('[data-i]'), function (b) { b.addEventListener('click', function () { if (!call) return; if (b.getAttribute('data-i') === call.e) { call = null; c.say('Added!', true); c.tone(760, .1); } else { c.tone(150, .15, 'sawtooth'); inZone = Math.max(0, inZone - 1.5); lost++; c.say('Wrong ingredient!', false); } }); });
    FG._st.state = function () { return { heat: heat, zone: zone(0), call: call }; }; FG._st.setHold = function (v) { hold = v; };
    var T = 0; function zone(t) { return 50 + Math.sin(T * (.5 + c.d * .4)) * 22; }
    c.loop(function (dt, t) {
      T = t; tl -= dt; heat = clamp(heat + (hold ? 55 : -38) * dt, 0, 100); var z = zone(), inz = Math.abs(heat - z) < 12; if (inz) inZone += dt; c.set_('z', 'Cooked ' + inZone.toFixed(0) + '/' + goal + 's'); c.set_('t', Math.max(0, Math.ceil(tl)) + 's');
      nextCall -= dt; if (nextCall <= 0 && !call) { call = { e: U.pick(ing), t: 3.2 }; nextCall = 7; c.say('Add ' + call.e + ' now!', true); } if (call) { call.t -= dt; if (call.t <= 0) { call = null; inZone = Math.max(0, inZone - 2); lost++; c.say('Too late! The pot burned a little.', false); } }
      if (inZone >= goal) { c.end(true, clamp(100 - lost * 8, 55, 100), ''); return; } if (tl <= 0) { c.end(false, inZone / goal * 100, 'Time is up. Keep the needle in the green zone.'); return; }
      ctx.fillStyle = '#2b1210'; ctx.fillRect(0, 0, 360, 400); ctx.font = '100px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(c.cfg.opts.pot || '🍲', 180, 110); if (hold) ctx.fillText('🔥', 180, 200);
      ctx.fillStyle = '#ffffff22'; ctx.fillRect(60, 260, 240, 24); ctx.fillStyle = '#2fbf5a99'; ctx.fillRect(60 + (z - 12) / 100 * 240, 260, 24 / 100 * 240 * 1, 24); ctx.fillStyle = inz ? '#9dffb0' : '#ffd54a'; ctx.fillRect(60 + heat / 100 * 240 - 4, 252, 8, 40);
      ctx.fillStyle = '#fff'; ctx.font = '14px system-ui'; ctx.fillText('cold', 60, 310); ctx.fillText('hot', 300, 310); if (call) { ctx.font = '44px serif'; ctx.fillText('Add ' + call.e + '!', 180, 350); }
    });
  };

  /* ---------- lamp lighting with wind ---------- */
  E.lights = function (c) {
    var n = [5, 8, 11][c.r - 1], gap = [0, 6, 4.4][c.r - 1] + (c.r > 1 ? 0 : 0), W = 360, H = 480, k = c.canvas(W, H), ctx = k.ctx, d = [], over = false, nextGust = gap > 0 ? 3 + gap : 1e9, warn = 0, gust = 0, shield = 0, cd = 0, holdT = 0, lamp = c.cfg.opts.lamp || '🪔';
    for (var i = 0; i < n; i++) { var col = i % 4, row = Math.floor(i / 4); d.push({ x: 50 + col * 85 + (row % 2 ? 20 : 0) + Math.random() * 10, y: 190 + row * 90 + Math.random() * 14, lit: 0, glow: 0 }); }
    c.hud([['n', '🪔 0/' + n], ['h', 'Hold 0.0s'], ['t', '70s']]); c.html('<div class="fg-row"><button type="button" class="fg-btn" id="shd" style="min-width:170px;padding:16px">🤲 SHIELD</button></div>');
    function doShield() { if (cd > 0 || over) return; shield = 1.6; cd = 3.5; c.tone(420, .15, 'triangle'); } $('shd').addEventListener('click', doShield); c.key(function (e) { if (e.key === ' ') { doShield(); return 1; } });
    k.cv.addEventListener('pointerdown', function (e) { var p = k.pt(e), best = null, bd = 44; d.forEach(function (o) { var dd = Math.hypot(o.x - p.x, o.y - p.y); if (dd < bd) { bd = dd; best = o; } }); if (best && !best.lit) { best.lit = 1; c.tone(600 + Math.random() * 300, .1); } e.preventDefault(); });
    FG._st.state = function () { return { d: d, warn: warn, gust: gust, cd: cd }; }; FG._st.shield = doShield;
    c.timer(70, function (l) { c.set_('t', l + 's'); }, function () { over = true; c.end(false, d.filter(function (o) { return o.lit; }).length / n * 100, 'The wind won this time.'); });
    var outs = 0;
    c.loop(function (dt, t) {
      nextGust -= dt; if (nextGust <= 0 && warn <= 0 && gust <= 0) { warn = 1.3; nextGust = gap + 1.3; }
      if (warn > 0) { warn -= dt; if (warn <= 0) { gust = .6; if (shield <= 0) { d.forEach(function (o) { if (o.lit) { o.lit = 0; outs++; } }); c.tone(140, .3, 'sawtooth'); } else c.tone(520, .2); } } if (gust > 0) gust -= dt; shield = Math.max(0, shield - dt); cd = Math.max(0, cd - dt);
      var lit = d.filter(function (o) { return o.lit; }).length; c.set_('n', '🪔 ' + lit + '/' + n); if (lit === n) { holdT += dt; if (holdT >= 3) { over = true; c.end(true, clamp(100 - outs * 3, 55, 100), ''); return; } } else holdT = 0; c.set_('h', 'Hold ' + holdT.toFixed(1) + 's'); $('shd').disabled = cd > 0; $('shd').textContent = cd > 0 ? '🤲 wait ' + cd.toFixed(1) : '🤲 SHIELD';
      var sky = ctx.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, '#0a0620'); sky.addColorStop(1, c.cfg.opts.sky || '#2b1250'); ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#fff'; for (var s = 0; s < 30; s++) ctx.fillRect((s * 61) % W, (s * 37) % 160, 1.5, 1.5); ctx.fillStyle = '#160a2e'; for (var b = 0; b < 8; b++) ctx.fillRect(b * 46, H - (120 + ((b * 53) % 90)), 44, 300);
      d.forEach(function (o, kk) { o.glow += ((o.lit ? 1 : 0) - o.glow) * Math.min(1, dt * 8); if (o.glow > .02) { var gr = ctx.createRadialGradient(o.x, o.y - 8, 2, o.x, o.y - 8, 46 * o.glow + 10); gr.addColorStop(0, 'rgba(255,200,80,' + .7 * o.glow + ')'); gr.addColorStop(1, 'rgba(255,140,0,0)'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(o.x, o.y - 8, 56, 0, 7); ctx.fill(); } ctx.fillStyle = '#b5651d'; ctx.beginPath(); ctx.ellipse(o.x, o.y, 20, 9, 0, 0, Math.PI); ctx.fill(); ctx.fillStyle = '#d98b3a'; ctx.beginPath(); ctx.ellipse(o.x, o.y, 20, 5, 0, 0, 7); ctx.fill(); if (o.lit) { var fl = Math.sin(t * 14 + kk) * 2; ctx.fillStyle = '#ffe27a'; ctx.beginPath(); ctx.ellipse(o.x + fl * .4, o.y - 12, 5, 10 + fl, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#ff8f1f'; ctx.beginPath(); ctx.ellipse(o.x + fl * .4, o.y - 9, 3, 6, 0, 0, 7); ctx.fill(); } });
      ctx.textAlign = 'center'; if (warn > 0) { ctx.font = '36px serif'; ctx.fillText('💨 Gust coming!', W / 2, 90); } if (shield > 0) { ctx.font = '60px serif'; ctx.fillText('🤲', W / 2, 140); } if (gust > 0) { ctx.strokeStyle = '#ffffff55'; ctx.lineWidth = 2; for (var q = 0; q < 8; q++) { ctx.beginPath(); ctx.moveTo((t * 700 + q * 70) % 460 - 50, 120 + q * 40); ctx.lineTo((t * 700 + q * 70) % 460 + 40, 120 + q * 40); ctx.stroke(); } }
    });
  };

  /* ---------- boat race ---------- */
  E.boat = function (c) {
    var k = c.canvas(360, 480), ctx = k.ctx, W = 360, H = 480, HZ = 130, cx = W / 2, objs = [], i, base = 1 / 30, rm = [.8, .9, 1][c.r - 1], topN = c.r === 1 ? 3 : 2;
    for (i = 0; i < 8 + c.r * 3; i++) objs.push({ lane: rnd(3), pos: .12 + Math.random() * .83, bad: 1, hit: 0 }); for (i = 0; i < 10; i++) objs.push({ lane: rnd(3), pos: .08 + Math.random() * .86, bad: 0, hit: 0 });
    var rivals = [0, 1, 2].map(function (kx) { return { d: 0, v: base * (rm + (kx - 1) * .04 + Math.random() * .05), fin: 0 }; }), me = { d: 0, lane: 1, px: 1, slow: 0, boost: 0 }, flowers = 0, over = false, beatLen = .9, beatT = 0, finOrder = 0, jud = '', lastRow = -9, boat = c.cfg.opts.boat || '🛶';
    c.hud([['p', 'Place -'], ['f', '🌸 0']]); c.html('<div class="fg-row"><button type="button" class="fg-btn alt" id="bl">◀</button><button type="button" class="fg-btn" id="br" style="min-width:140px;padding:16px">🚣 ROW!</button><button type="button" class="fg-btn alt" id="bq">▶</button></div>');
    function X(l, s) { return cx + (l - 1) * 105 * s; } function Y(s) { return HZ + (H - 120 - HZ) * s; } function move(d) { me.lane = clamp(me.lane + d, 0, 2); c.tone(300, .05, 'triangle'); }
    var tt = 0; function row() { if (tt - lastRow < .3) return; lastRow = tt; var off = Math.min(beatT, beatLen - beatT); if (off < .22) { me.boost = 1.2; jud = 'Perfect stroke!'; c.tone(520, .12); } else { jud = 'Off beat'; c.tone(180, .08, 'square'); me.slow = Math.max(me.slow, .6); } }
    c.key(function (e) { if (e.key === 'ArrowLeft') { move(-1); return 1; } if (e.key === 'ArrowRight') { move(1); return 1; } if (e.key === ' ') { row(); return 1; } });
    $('bl').addEventListener('click', function () { move(-1); }); $('bq').addEventListener('click', function () { move(1); }); $('br').addEventListener('pointerdown', function (e) { e.preventDefault(); row(); }); k.cv.addEventListener('pointerdown', function (e) { move(k.pt(e).x < W / 2 ? -1 : 1); e.preventDefault(); });
    FG._st.state = function () { return { me: me, objs: objs, beat: beatT, len: beatLen }; }; FG._st.row = row; FG._st.move = move;
    c.loop(function (dt, t) {
      tt = t; beatT = (beatT + dt) % beatLen; var sp = base * (1 + (me.boost > 0 ? .5 : 0) - (me.slow > 0 ? .5 : 0) + .05); me.boost = Math.max(0, me.boost - dt); me.slow = Math.max(0, me.slow - dt); me.d += sp * dt; me.px += (me.lane - me.px) * Math.min(1, dt * 12);
      rivals.forEach(function (r) { if (!r.fin) { r.d += r.v * dt; if (r.d >= 1) r.fin = ++finOrder; } });
      objs.forEach(function (o) { var rel = o.pos - me.d; if (!o.hit && rel < .018 && rel > -.02 && o.lane === me.lane) { o.hit = 1; if (o.bad) { me.slow = 1.1; c.tone(150, .2, 'sawtooth'); jud = 'Splash!'; } else { flowers++; c.set_('f', '🌸 ' + flowers); c.tone(760, .08); } } });
      c.set_('p', 'Place ' + (rivals.filter(function (r) { return r.d > me.d; }).length + 1));
      if (me.d >= 1) { over = true; var pos = 1 + rivals.filter(function (r) { return r.fin; }).length; c.end(pos <= topN, 100 - (pos - 1) * 22, 'You finished ' + ['', '1st', '2nd', '3rd', '4th'][pos] + (pos > topN ? '. Finish in the top ' + topN + ' to win.' : '')); return; }
      var sky = ctx.createLinearGradient(0, 0, 0, HZ); sky.addColorStop(0, '#7cc6ff'); sky.addColorStop(1, '#ffe9b0'); ctx.fillStyle = sky; ctx.fillRect(0, 0, W, HZ); ctx.fillStyle = '#1f7a3c'; ctx.fillRect(0, HZ - 22, W, 22); ctx.fillStyle = '#2b8a4a'; ctx.fillRect(0, HZ, W, H - HZ);
      ctx.fillStyle = c.cfg.opts.water || '#1e90b8'; ctx.beginPath(); ctx.moveTo(cx - 55, HZ); ctx.lineTo(cx + 55, HZ); ctx.lineTo(cx + 215, H); ctx.lineTo(cx - 215, H); ctx.fill(); for (var r = 0; r < 9; r++) { var s2 = ((r / 9 + me.d * 14) % 1); ctx.fillStyle = '#ffffff30'; ctx.fillRect(cx - 190 * s2, Y(s2), 380 * s2, 1 + 3 * s2); }
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; objs.filter(function (o) { return !o.hit && o.pos - me.d > -.03 && o.pos - me.d < .2; }).sort(function (a, b) { return b.pos - a.pos; }).forEach(function (o) { var s = Math.max(.04, 1 - (o.pos - me.d) / .2); ctx.font = (12 + 56 * s) + 'px serif'; ctx.fillText(o.bad ? '🪵' : '🌸', X(o.lane, s), Y(s)); });
      ctx.font = '64px serif'; ctx.fillText(boat, cx + (me.px - 1) * 105 * .9, Y(.9) + Math.sin(t * 5) * 3); var pulse = 1 - Math.min(1, Math.min(beatT, beatLen - beatT) / .22); ctx.strokeStyle = 'rgba(255,230,90,' + (.3 + pulse * .7) + ')'; ctx.lineWidth = 4 + pulse * 6; ctx.beginPath(); ctx.arc(cx, H - 38, 22 + pulse * 8, 0, 7); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.font = 'bold 16px system-ui'; ctx.fillText(jud, cx, H - 38);
      var bw = 340; ctx.fillStyle = '#0006'; ctx.fillRect(10, 10, bw, 8); ctx.fillStyle = '#ffd54a'; ctx.fillRect(10, 10, bw * Math.min(1, me.d), 8); ctx.fillStyle = '#ff7b7b'; rivals.forEach(function (r, q) { ctx.fillRect(10 + bw * Math.min(1, r.d) - 2, 22 + q * 6, 4, 4); });
    });
  };

  /* ---------- rangoli: fill the missing dots / remember the kolam ---------- */
  var PAL = ['#e63946', '#f4b400', '#2a9d8f', '#3a86ff', '#c77dff', '#ff7b00'];
  function rangoliFill(c) {
    var n = [5, 7, 9][c.r - 1], m = (n - 1) / 2, kc = [3, 4, 5][c.r - 1], blanks = [4, 8, 14][c.r - 1], g = [], q = [], i, j;
    for (i = 0; i <= m; i++) { q[i] = []; for (j = 0; j <= m; j++) q[i][j] = rnd(kc); } for (i = 0; i < n; i++) { g[i] = []; for (j = 0; j < n; j++) g[i][j] = q[Math.abs(i - m)][Math.abs(j - m)]; }
    function orbit(a, b) { var s = {}, o = []; [[a, b], [n - 1 - a, b], [a, n - 1 - b], [n - 1 - a, n - 1 - b]].forEach(function (p) { var key = p[0] + ',' + p[1]; if (!s[key]) { s[key] = 1; o.push(p); } }); return o; }
    var blank = {}, cells = []; for (i = 0; i < n; i++) for (j = 0; j < n; j++) cells.push([i, j]); cells = U.shuffle(cells); var nb = 0;
    cells.forEach(function (p) { if (nb >= blanks) return; var o = orbit(p[0], p[1]); if (o.length < 2) return; var hid = o.filter(function (x) { return blank[x[0] + ',' + x[1]]; }).length; if (hid >= o.length - 1 || blank[p[0] + ',' + p[1]]) return; blank[p[0] + ',' + p[1]] = 1; nb++; });
    var left = nb, sel = 0, mist = 0, cs = Math.floor(300 / n), maxM = 4 + c.r * 2;
    c.hud([['l', 'Missing ' + left], ['m', 'Mistakes 0']]);
    var h = '<div class="fg-row" id="pal">' + PAL.slice(0, kc).map(function (col, x) { return '<button type="button" data-c="' + x + '" aria-label="Colour ' + (x + 1) + '" style="background:' + col + ';width:48px;height:48px;border:3px solid #fff;border-radius:50%;cursor:pointer"></button>'; }).join('') + '</div><div style="display:grid;grid-template-columns:repeat(' + n + ',' + cs + 'px);gap:4px;justify-content:center;margin:10px auto;padding:12px;background:#0006;border-radius:16px;width:max-content">';
    for (i = 0; i < n; i++) for (j = 0; j < n; j++) { var isB = blank[i + ',' + j]; h += '<button type="button" data-i="' + i + '" data-j="' + j + '" ' + (isB ? '' : 'disabled') + ' style="width:' + cs + 'px;height:' + cs + 'px;border-radius:50%;border:' + (isB ? '3px dashed #fff' : '0') + ';background:' + (isB ? '#000' : PAL[g[i][j]]) + ';cursor:' + (isB ? 'pointer' : 'default') + '" aria-label="' + (isB ? 'Missing dot' : 'Dot') + '"></button>'; }
    c.html(h + '</div><div class="fg-hint">The pattern is mirror-symmetric left-right and top-bottom. Copy the colour of the mirror dots.</div>');
    c.el.querySelector('[data-c="0"]').style.outline = '3px solid #ffd54a';
    Array.prototype.forEach.call(c.el.querySelectorAll('[data-c]'), function (b) { b.addEventListener('click', function () { sel = +b.getAttribute('data-c'); Array.prototype.forEach.call(c.el.querySelectorAll('[data-c]'), function (z) { z.style.outline = ''; }); b.style.outline = '3px solid #ffd54a'; }); });
    FG._st.g = g; FG._st.blank = blank;
    Array.prototype.forEach.call(c.el.querySelectorAll('[data-i]'), function (b) { b.addEventListener('click', function () { if (b.disabled) return; var a = +b.getAttribute('data-i'), z = +b.getAttribute('data-j'); if (g[a][z] === sel) { b.style.background = PAL[sel]; b.style.border = '0'; b.disabled = true; delete blank[a + ',' + z]; left--; c.set_('l', 'Missing ' + left); c.tone(600, .08); if (!left) c.timeout(function () { c.end(true, clamp(100 - mist * 7, 50, 100), ''); }, 350); } else { mist++; c.set_('m', 'Mistakes ' + mist); b.classList.add('fg-shake'); c.tone(160, .2, 'sawtooth'); c.timeout(function () { b.classList.remove('fg-shake'); }, 320); if (mist > maxM) c.end(false, (nb - left) / nb * 100, 'Too many wrong colours.'); } }); });
  }
  function rangoliDots(c) {
    var n = [4, 5, 6][c.r - 1], edges = {}, mine = {}, cs = 300 / (n - 1), selD = null, phase = 'look', i, j, view = 'show', k = c.canvas(360, 360), ctx = k.ctx, ox = 30, oy = 30;
    function key(a, b, x, y) { var p = [a, b], q = [x, y]; if (a > x || (a === x && b > y)) { var t = p; p = q; q = t; } return p[0] + ',' + p[1] + '-' + q[0] + ',' + q[1]; }
    var half = Math.ceil(n / 2);
    for (i = 0; i < n; i++) for (j = 0; j < n; j++) { [[1, 0], [0, 1]].forEach(function (d) { var x = i + d[0], y = j + d[1]; if (x >= n || y >= n) return; if (i < half && j < half && Math.random() < .5) { var mi = n - 1 - i, mj = n - 1 - j, mx = n - 1 - x, my = n - 1 - y; edges[key(i, j, x, y)] = 1; edges[key(mi, j, mx, y)] = 1; edges[key(i, mj, x, my)] = 1; edges[key(mi, mj, mx, my)] = 1; } }); }
    if (Object.keys(edges).length < 4) { edges[key(0, 0, 1, 0)] = edges[key(n - 1, 0, n - 2, 0)] = edges[key(0, n - 1, 1, n - 1)] = edges[key(n - 1, n - 1, n - 2, n - 1)] = 1; }
    var tot = Object.keys(edges).length, peek = 6 - c.r * 1; c.hud([['p', 'Memorise: ' + peek + 's'], ['e', 'Lines 0/' + tot]]); var btn = c.html('<div class="fg-row"><button type="button" class="fg-btn" id="chk" disabled>✔ Check my rangoli</button></div>');
    function X(a) { return ox + a * cs; } function Y(b) { return oy + b * cs; }
    function drawAll() { ctx.fillStyle = '#3a1a2a'; ctx.fillRect(0, 0, 360, 360); var set = view === 'show' ? edges : mine; ctx.strokeStyle = view === 'show' ? '#ffd54a' : '#7cf0ff'; ctx.lineWidth = 6; ctx.lineCap = 'round'; Object.keys(set).forEach(function (kk) { var p = kk.split('-'), a = p[0].split(',').map(Number), b = p[1].split(',').map(Number); ctx.beginPath(); ctx.moveTo(X(a[0]), Y(a[1])); ctx.lineTo(X(b[0]), Y(b[1])); ctx.stroke(); }); for (var a2 = 0; a2 < n; a2++) for (var b2 = 0; b2 < n; b2++) { ctx.fillStyle = selD && selD[0] === a2 && selD[1] === b2 ? '#ff7b00' : '#fff'; ctx.beginPath(); ctx.arc(X(a2), Y(b2), 7, 0, 7); ctx.fill(); } }
    FG._st.edges = edges; FG._st.mine = mine; FG._st.key = key; FG._st.n = n;
    var tm = c.timer(peek, function (l) { c.set_('p', 'Memorise: ' + l + 's'); }, function () { view = 'mine'; phase = 'draw'; c.set_('p', 'Now draw it!'); $('chk').disabled = false; drawAll(); }); drawAll();
    k.cv.addEventListener('pointerdown', function (e) { if (phase !== 'draw') return; var p = k.pt(e), a = Math.round((p.x - ox) / cs), b = Math.round((p.y - oy) / cs); if (a < 0 || b < 0 || a >= n || b >= n || Math.hypot(p.x - X(a), p.y - Y(b)) > 24) return; if (!selD) selD = [a, b]; else { var dx = Math.abs(selD[0] - a), dy = Math.abs(selD[1] - b); if (dx + dy === 1) { var kk = key(selD[0], selD[1], a, b); if (mine[kk]) delete mine[kk]; else mine[kk] = 1; c.set_('e', 'Lines ' + Object.keys(mine).length + '/' + tot); c.tone(500, .05); selD = null; } else selD = (dx + dy === 0) ? null : [a, b]; } drawAll(); e.preventDefault(); });
    $('chk').addEventListener('click', function () { var good = 0, bad = 0; Object.keys(mine).forEach(function (kk) { if (edges[kk]) good++; else bad++; }); var pct = Math.max(0, (good - bad) / tot * 100); c.end(pct >= 80, pct, 'Accuracy ' + Math.round(pct) + '%. You need 80%.'); });
    c.html('<div class="fg-hint">Memorise the pattern. Then tap one dot and a neighbouring dot to draw or erase a line.</div>');
  }
  E.rangoli = function (c) { if (c.cfg.opts.mode === 'dots') rangoliDots(c); else rangoliFill(c); };

  /* ---------- team pyramid puzzle ---------- */
  var NM = ['Ravi', 'Meera', 'Arjun', 'Sita', 'Karan', 'Pooja', 'Vikram', 'Asha', 'Rohan', 'Nisha', 'Sunil', 'Tara', 'Dev', 'Lata', 'Om'];
  E.pyramid = function (c) {
    var rows = c.r + 2, cnt = rows * (rows + 1) / 2, wts = [], names = U.shuffle(NM).slice(0, cnt), set = {};
    while (wts.length < cnt) { var w = 38 + rnd(46); if (!set[w]) { set[w] = 1; wts.push(w); } } wts.sort(function (a, b) { return b - a; });
    var sol = [], idx = 0; for (var r = rows - 1; r >= 0; r--) { sol[r] = U.shuffle(wts.slice(idx, idx + r + 1)); idx += r + 1; }
    var people = U.shuffle(wts.map(function (w2, i) { return { id: i, w: w2, n: names[i] }; })), slot = [], selP = null, tests = 0, bad = {};
    for (var a = 0; a < rows; a++) { slot[a] = []; for (var b = 0; b <= a; b++) slot[a][b] = null; }
    c.hud([['t', 'Tests 0']]); c.html('<div class="fg-box" style="margin:0 0 8px"><b>Rule:</b> everyone must weigh <b>less</b> than both people they stand on. The heaviest go at the bottom.</div><div id="pp" style="display:flex;flex-direction:column;align-items:center;gap:6px"></div><div class="fg-row" id="ro"></div><div class="fg-row"><button type="button" class="fg-btn" id="pt">✔ TEST pyramid</button></div>');
    function placed() { var s = {}; slot.forEach(function (rw) { rw.forEach(function (p) { if (p) s[p.id] = 1; }); }); return s; }
    function draw() {
      var pyr = $('pp'); pyr.innerHTML = '';
      for (var r2 = 0; r2 < rows; r2++) { var rowEl = document.createElement('div'); rowEl.style.cssText = 'display:flex;gap:6px'; for (var c2 = 0; c2 <= r2; c2++) (function (r3, c3) { var p = slot[r3][c3], bt = document.createElement('button'); bt.type = 'button'; bt.style.cssText = 'width:' + Math.min(66, Math.floor(330 / rows) - 6) + 'px;height:56px;border-radius:12px;border:2px ' + (p ? 'solid' : 'dashed') + ' ' + (bad[r3 + ',' + c3] ? '#ff5a5a' : '#fff') + ';background:' + (p ? (bad[r3 + ',' + c3] ? '#7a1f1f' : '#ffffff33') : '#0004') + ';color:#fff;font:inherit;font-size:.7rem;cursor:pointer;padding:0'; bt.innerHTML = p ? '🧑<br>' + esc(p.n) + '<br>' + p.w + 'kg' : (r3 === 0 ? '🏁' : '+'); bt.addEventListener('click', function () { if (slot[r3][c3]) { slot[r3][c3] = null; bad = {}; draw(); ros(); return; } if (selP) { slot[r3][c3] = selP; selP = null; bad = {}; c.tone(520, .08); draw(); ros(); } }); rowEl.appendChild(bt); })(r2, c2); pyr.appendChild(rowEl); }
    }
    function ros() { var s = placed(), ro = $('ro'); ro.innerHTML = ''; people.forEach(function (p) { if (s[p.id]) return; var bt = document.createElement('button'); bt.type = 'button'; bt.className = 'fg-cell'; bt.style.cssText = 'min-width:62px;padding:6px;font-size:.75rem;' + (selP && selP.id === p.id ? 'outline:3px solid #ffd54a' : ''); bt.innerHTML = '🧑<br><b>' + esc(p.n) + '</b><br>' + p.w + ' kg'; bt.addEventListener('click', function () { selP = p; c.tone(440, .05); ros(); }); ro.appendChild(bt); }); }
    FG._st.state = function () { return { sol: sol, rows: rows, people: people }; }; FG._st.place = function (r2, c2, w2) { slot[r2][c2] = people.filter(function (p) { return p.w === w2; })[0]; draw(); ros(); };
    $('pt').addEventListener('click', function () { var full = true; slot.forEach(function (rw) { rw.forEach(function (p) { if (!p) full = false; }); }); if (!full) { c.say('Fill every spot first.', false); return; } tests++; c.set_('t', 'Tests ' + tests); bad = {}; var ok = true; for (var r2 = 0; r2 < rows - 1; r2++) for (var c2 = 0; c2 <= r2; c2++) { var me = slot[r2][c2].w; if (me >= slot[r2 + 1][c2].w || me >= slot[r2 + 1][c2 + 1].w) { bad[r2 + ',' + c2] = 1; ok = false; } } draw(); if (ok) c.end(true, clamp(100 - (tests - 1) * 12, 50, 100), tests + ' test' + (tests > 1 ? 's' : '')); else { c.tone(160, .25, 'sawtooth'); c.say('Wobble! Red spots have someone heavier above a lighter person.', false); } });
    draw(); ros();
  };
})();
