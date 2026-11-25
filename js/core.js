/* ===== FESTORA GAMES v3 - CORE: Games page, game runner, rewards, leaderboard ===== */
(function () {
  'use strict';
  if (window.FG) return;
  var FG = window.FG = { E: {}, CFG: {}, SETS: {}, _st: null };
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  var U = FG.U = {
    rnd: function (n) { return Math.floor(Math.random() * n); },
    pick: function (a) { return a[Math.floor(Math.random() * a.length)]; },
    shuffle: function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; },
    esc: function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); },
    $: function (id) { return document.getElementById(id); },
    clamp: function (v, a, b) { return Math.max(a, Math.min(b, v)); }
  };
  var esc = U.esc, $ = U.$;
  var ST = FG.ST = (function () { var o; try { o = JSON.parse(lsGet('festora_games_v3') || '{}'); } catch (e) { o = {}; } if (!o || typeof o !== 'object') o = {}; o.xp = +o.xp || 0; o.done = o.done || {}; o.mute = !!o.mute; return o; })();
  FG.save = function () { lsSet('festora_games_v3', JSON.stringify(ST)); };

  /* ---- sound ---- */
  var actx = null;
  FG.tone = function (f, d, type) {
    if (ST.mute) return;
    try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); var o = actx.createOscillator(), g = actx.createGain(); o.type = type || 'sine'; o.frequency.value = f; g.gain.setValueAtTime(.1, actx.currentTime); g.gain.exponentialRampToValueAtTime(.0001, actx.currentTime + (d || .12)); o.connect(g); g.connect(actx.destination); o.start(); o.stop(actx.currentTime + (d || .12)); } catch (e) {}
  };

  /* ---- styles ---- */
  var css = document.createElement('style');
  css.textContent =
    '#fg-root{position:fixed;inset:0;z-index:100000;display:none;flex-direction:column;color:#fff;font-family:system-ui,sans-serif;background:radial-gradient(circle at 50% 0,var(--a,#c9931a),var(--b,#4a1d6b) 60%,#0d0818)}#fg-root.on{display:flex}' +
    '.fg-top{display:flex;gap:8px;align-items:center;padding:10px 12px;background:#0008}.fg-top b{flex:1;font-size:.95rem}.fg-top button{background:#fff2;color:#fff;border:1px solid #fff5;border-radius:10px;padding:8px 12px;font:700 .85rem system-ui,sans-serif;cursor:pointer}' +
    '.fg-main{flex:1;overflow:auto;padding:12px;display:flex;flex-direction:column;align-items:center}.fg-wrap{width:100%;max-width:520px}' +
    '.fg-box{background:#0007;border-radius:16px;padding:16px;margin:10px 0;line-height:1.5;text-align:center}.fg-box h2,.fg-box h3{margin:0 0 6px;color:#ffd54a}' +
    '.fg-btn{background:#fff;color:#3a1a5a;border:0;border-radius:12px;padding:12px 20px;font:800 1rem system-ui,sans-serif;cursor:pointer;margin:4px}.fg-btn.alt{background:#ffffff26;color:#fff;border:1px solid #fff6}.fg-btn[disabled]{opacity:.45}' +
    '.fg-hud{display:flex;gap:8px;font-weight:800;margin-bottom:8px;flex-wrap:wrap;justify-content:center}.fg-hud span{background:#0007;border-radius:12px;padding:5px 11px}' +
    '.fg-cv{width:min(94vw,380px);aspect-ratio:3/4;border-radius:16px;touch-action:none;background:#000;box-shadow:0 8px 28px #0008;display:block;margin:0 auto}' +
    '.fg-msg{min-height:1.3em;text-align:center;font-weight:800;margin:6px 0}.fg-hint{opacity:.88;font-size:.85rem;margin:8px 0;text-align:center}' +
    '.fg-row{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;align-items:center;margin:8px 0}.fg-pill{display:inline-block;background:#0007;border-radius:20px;padding:3px 10px;font-size:.78rem;margin:2px}' +
    '.fg-card{background:var(--card,#1e1b2e);border:1.5px solid var(--line,#ffffff33);border-radius:16px;padding:14px;text-align:center;color:var(--ink,#fff)}' +
    '.fg-shake{animation:fgshake .3s}@keyframes fgshake{25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}' +
    '.fg-cell{border:0;border-radius:10px;font-size:1.6rem;cursor:pointer;background:#ffffff2e;color:#fff;padding:0;line-height:1;transition:transform .15s}.fg-cell:active{transform:scale(.9)}.fg-cell.sel{outline:3px solid #ffd54a}' +
    '.fg-dp{display:grid;grid-template-columns:repeat(3,64px);gap:6px;justify-content:center;margin:8px auto}.fg-dp button{height:56px;border-radius:12px;border:0;background:#ffffff33;color:#fff;font-size:1.4rem;cursor:pointer}' +
    '@media (prefers-reduced-motion:reduce){#fg-root *{animation:none!important}}';
  document.head.appendChild(css);

  var root = document.createElement('div'); root.id = 'fg-root'; root.setAttribute('role', 'dialog'); root.setAttribute('aria-label', 'Festival game');
  root.innerHTML = '<div class="fg-top"><b id="fg-title"></b><button type="button" id="fg-mute"></button><button type="button" id="fg-back">← Games</button></div><div class="fg-main" id="fg-main"></div>';
  document.body.appendChild(root);
  var main = $('fg-main'), cleans = [], paused = false, curFest = null, curN = 0;
  function setMute() { $('fg-mute').textContent = ST.mute ? '🔇' : '🔊'; $('fg-mute').setAttribute('aria-label', ST.mute ? 'Sound off' : 'Sound on'); }
  setMute();
  $('fg-mute').addEventListener('click', function () { ST.mute = !ST.mute; FG.save(); setMute(); });
  function stopAll() { while (cleans.length) { try { cleans.pop()(); } catch (e) {} } FG._st = null; }
  FG.stopAll = stopAll;
  FG.exit = function () { stopAll(); root.classList.remove('on'); try { document.body.style.overflow = ''; document.dispatchEvent(new Event('fg:exit')); } catch (e) {} if (window.page === 'Games' && typeof window.draw === 'function') { try { window.draw(); } catch (e) {} } };
  $('fg-back').addEventListener('click', FG.exit);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && root.classList.contains('on')) FG.exit(); });
  document.addEventListener('visibilitychange', function () { paused = document.hidden; });
  window.addEventListener('popstate', function () { if (root.classList.contains('on')) FG.exit(); });

  /* ---- context given to each engine ---- */
  function makeCtx(el, cfg, r, endCb) {
    var c = { el: el, cfg: cfg, r: r, d: (r - 1) / 2, set: cfg.set, hero: cfg.set[0], good: cfg.set.slice(1, 6), bad: cfg.bad, ended: false };
    c.on = function (fn) { cleans.push(fn); };
    c.hud = function (parts) { var d = document.createElement('div'); d.className = 'fg-hud'; d.innerHTML = parts.map(function (p) { return '<span id="h-' + p[0] + '">' + esc(p[1]) + '</span>'; }).join(''); el.appendChild(d); };
    c.set_ = function (id, t) { var e = $('h-' + id); if (e) e.textContent = t; };
    c.say = function (t, ok) { var m = $('fg-msg'); if (m) { m.textContent = t || ''; m.style.color = ok ? '#9dffb0' : '#ffb3b3'; } };
    c.canvas = function (w, h) {
      var cv = document.createElement('canvas'); cv.className = 'fg-cv'; cv.width = w; cv.height = h; cv.style.aspectRatio = w + '/' + h; el.appendChild(cv);
      var ctx = cv.getContext('2d');
      return { cv: cv, ctx: ctx, w: w, h: h, pt: function (e) { var rc = cv.getBoundingClientRect(); return { x: (e.clientX - rc.left) * w / rc.width, y: (e.clientY - rc.top) * h / rc.height }; } };
    };
    c.html = function (h) { var d = document.createElement('div'); d.innerHTML = h; el.appendChild(d); return d; };
    c.loop = function (fn) {
      var raf = 0, last = performance.now(), t = 0, dead = false;
      function f(now) { if (dead || c.ended) return; var dt = Math.min(.05, (now - last) / 1000); last = now; if (!paused) { t += dt; try { fn(dt, t); } catch (e) { dead = true; if (window.console) console.error(e); return; } } raf = requestAnimationFrame(f); }
      raf = requestAnimationFrame(f); cleans.push(function () { dead = true; cancelAnimationFrame(raf); });
    };
    c.key = function (fn) { function h(e) { var r2 = fn(e); if (r2) e.preventDefault(); } document.addEventListener('keydown', h, true); cleans.push(function () { document.removeEventListener('keydown', h, true); }); };
    c.timer = function (sec, tick, done) {
      var left = sec, iv = setInterval(function () { if (paused) return; left--; tick(left); if (left <= 0) { clearInterval(iv); done(); } }, 1000);
      cleans.push(function () { clearInterval(iv); }); tick(left);
      return { add: function (n) { left = Math.max(1, left + n); tick(left); }, left: function () { return left; } };
    };
    c.timeout = function (fn, ms) { var id = setTimeout(function () { if (!c.ended) fn(); }, ms); cleans.push(function () { clearTimeout(id); }); return id; };
    c.tone = FG.tone;
    /* pct 0-100 shows how well you did; win true if you passed this round */
    c.end = function (win, pct, note) { if (c.ended) return; c.ended = true; stopAll(); endCb(win, U.clamp(Math.round(pct), 0, 100), note || ''); };
    return c;
  }

  /* ---- screens ---- */
  function festName(id) { var l = window.FEST || []; for (var i = 0; i < l.length; i++) if (l[i].id === id) return l[i].name; return id; }
  function festInfo(id) { return (window.G$ && window.G$[id]) || (window.FEST || []).filter(function (f) { return f.id === id; })[0] || { name: id, e: '🪔' }; }
  function theme(id) { var f = festInfo(id); root.style.setProperty('--a', f.c1 || (f.th && f.th['--gold']) || '#c9931a'); root.style.setProperty('--b', f.c2 || (f.th && f.th['--mar']) || '#4a1d6b'); }
  FG.gameCfg = function (fid, n) {
    var d = FG.CFG[fid]; if (!d || !d[n - 1]) return null; var g = d[n - 1], set = FG.SETS[fid] || ['🪔', '🌸', '🎁', '⭐', '🔔', '🍬', '🥁', '🌼'];
    return { fid: fid, n: n, engine: g[0], title: g[1], story: g[2], opts: g[3] || {}, set: set, bad: (g[3] && g[3].bad) || ['💣', '🕷️', '🪨'] };
  };
  FG.ENG_LABEL = { lane3d: '3D Runner', dash: 'Side Runner', flap: 'Flying', catch: 'Catching', sling: 'Aim & Shoot', rhythm: 'Rhythm', memory: '3D Memory', match3: 'Match-3', slide: 'Sliding Puzzle', hidden: 'Hidden Objects', whack: 'Pop & Tap', maze: 'Maze', cook: 'Cooking Timing', archery: 'Archery', balance: 'Balance', tug: 'Sprint Race', stack: 'Tower Stacking', lights: 'Lamp Lighting', boat: 'Boat Race', kite: 'Kite Battle', rangoli: 'Rangoli', pyramid: 'Team Puzzle' };

  /* The Games page of the app (replaces the old play zone) */
  window.renderFestivalGames = function () {
    var id = window.cur || 'ganesh', f = festInfo(id), d = FG.CFG[id] || [], rec = ST.done[id] || {};
    var h = '<div style="max-width:900px;margin:0 auto"><h2 style="margin:6px 0">' + esc(f.e || '🎮') + ' ' + esc(f.name) + ' Games</h2><p style="margin:0 0 12px;color:var(--mut)">Three different games for this festival. Finish all 3 rounds of each game to earn stars and coins.</p>' +
      '<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px">';
    d.forEach(function (g, i) {
      var r = rec[i + 1] || {}, stars = r.stars ? '⭐'.repeat(r.stars) + '☆'.repeat(3 - r.stars) : '☆☆☆';
      h += '<div class="card" style="text-align:center"><div style="font-size:2.6rem">' + esc(FG.SETS[id] ? FG.SETS[id][i] || '🎮' : '🎮') + '</div><h3 style="margin:6px 0 2px">' + esc(g[1]) + '</h3><small style="color:var(--gold);font-weight:700">' + esc(FG.ENG_LABEL[g[0]] || g[0]) + '</small><p style="font-size:.86rem;color:var(--mut);margin:8px 0">' + esc(g[2]) + '</p><div style="margin:6px 0">' + stars + (r.best ? ' · best ' + r.best : '') + '</div><button type="button" onclick="FG.start(\'' + id + '\',' + (i + 1) + ')">▶ Play</button></div>';
    });
    h += '</div></div>';
    return h;
  };

  FG.start = function (fid, n) {
    stopAll(); var g = FG.gameCfg(fid, n); if (!g) return; curFest = fid; curN = n; theme(fid);
    root.classList.add('on'); try { document.body.style.overflow = 'hidden'; } catch (e) {}
    $('fg-title').textContent = festInfo(fid).e + ' ' + g.title;
    main.innerHTML = '<div class="fg-wrap"><div class="fg-box"><div style="font-size:3rem">' + esc(g.set[0]) + '</div><h2>' + esc(g.title) + '</h2><p>' + esc(g.story) + '</p><p style="opacity:.85;font-size:.85rem">' + esc(FG.HOW[g.engine] || '') + '</p><p class="fg-pill">3 rounds · gets harder each round</p></div><div class="fg-row"><button type="button" class="fg-btn" id="fg-go">▶ Start</button></div></div>';
    $('fg-go').addEventListener('click', function () { round(fid, n, 1, []); });
  };

  FG._round = function (f, n, r) { round(f, n, r, []); };
  function round(fid, n, r, scores) {
    stopAll(); var g = FG.gameCfg(fid, n); theme(fid);
    main.innerHTML = '<div class="fg-wrap"><div class="fg-hint" style="margin:0 0 6px"><b>Round ' + r + ' of 3</b></div><div id="fg-area"></div><div class="fg-msg" id="fg-msg" role="status" aria-live="polite"></div></div>';
    var el = $('fg-area'), ctx = makeCtx(el, g, r, function (win, pct, note) {
      FG.tone(win ? 700 : 200, .25, win ? 'sine' : 'sawtooth');
      if (!win) {
        main.innerHTML = '<div class="fg-wrap"><div class="fg-box"><h2>😅 So close!</h2><p>' + esc(note || 'Try this round again.') + '</p><div class="fg-row"><button type="button" class="fg-btn" id="fg-re">↻ Retry round ' + r + '</button><button type="button" class="fg-btn alt" id="fg-ex">Back to games</button></div></div></div>';
        $('fg-re').addEventListener('click', function () { round(fid, n, r, scores); }); $('fg-ex').addEventListener('click', FG.exit); return;
      }
      scores[r - 1] = pct;
      if (r < 3) {
        main.innerHTML = '<div class="fg-wrap"><div class="fg-box"><h2>🎉 Round ' + r + ' cleared!</h2><p>Score ' + pct + (note ? ' · ' + esc(note) : '') + '</p><div class="fg-row"><button type="button" class="fg-btn" id="fg-nx">Next round ▶</button></div></div></div>';
        $('fg-nx').addEventListener('click', function () { round(fid, n, r + 1, scores); });
      } else finish(fid, n, scores);
    });
    FG._st = { ctx: ctx };
    var fn = FG.E[g.engine];
    try { fn(ctx); } catch (e) { el.innerHTML = '<div class="fg-box">Sorry, this game could not start.</div>'; if (window.console) console.error(e); }
  }

  function finish(fid, n, scores) {
    var g = FG.gameCfg(fid, n), avg = Math.round(scores.reduce(function (a, b) { return a + b; }, 0) / 3), stars = avg >= 85 ? 3 : avg >= 65 ? 2 : 1;
    ST.done[fid] = ST.done[fid] || {}; var rec = ST.done[fid][n] || { best: 0, stars: 0, plays: 0 }, first = !rec.plays, better = avg > rec.best;
    rec.plays++; rec.best = Math.max(rec.best, avg); rec.stars = Math.max(rec.stars, stars); ST.done[fid][n] = rec;
    var xp = 20 + stars * 10; ST.xp += xp; FG.save();
    var coins = 0; if ((first || better) && typeof window.addCoins === 'function') { coins = first ? 10 + stars * 5 : 5; try { window.addCoins(coins, g.title); } catch (e) {} }
    var f = festInfo(fid), tip = (f.didYouKnow || (f.hint) || '');
    var tipTxt = Array.isArray(tip) ? tip[0] : tip;
    main.innerHTML = '<div class="fg-wrap"><div class="fg-box"><div style="font-size:3rem">🏆</div><h2>' + esc(g.title) + ' complete!</h2><div style="font-size:2rem">' + '⭐'.repeat(stars) + '☆'.repeat(3 - stars) + '</div><div class="fg-row"><span class="fg-pill">Score ' + avg + '</span><span class="fg-pill">+' + xp + ' XP</span>' + (coins ? '<span class="fg-pill">+' + coins + ' coins</span>' : '') + '</div></div>' +
      (tipTxt ? '<div class="fg-box"><h3>🪔 Did you know?</h3><p>' + esc(String(tipTxt)) + '</p></div>' : '') + '<div class="fg-box" id="fg-lb" style="display:none"></div>' +
      '<div class="fg-row"><button type="button" class="fg-btn" id="fg-rp">↻ Play again</button>' + (n < 3 ? '<button type="button" class="fg-btn alt" id="fg-nx">Next game ▶</button>' : '') + '<button type="button" class="fg-btn alt" id="fg-ex">Back to games</button></div></div>';
    $('fg-rp').addEventListener('click', function () { FG.start(fid, n); }); $('fg-ex').addEventListener('click', FG.exit);
    var nx = $('fg-nx'); if (nx) nx.addEventListener('click', function () { FG.start(fid, n + 1); });
    FG.submit(fid, n, avg);
  }

  /* leaderboard (talks to the Festora server; hidden if the server has no API) */
  FG.submit = function (fid, n, score) {
    try {
      var name = 'Player'; try { var u = JSON.parse(lsGet('festora_current_user') || 'null'); if (u && u.name) name = String(u.name).slice(0, 20); else if (lsGet('festora_name')) name = String(lsGet('festora_name')).slice(0, 20); } catch (e) {}
      fetch('/api/score', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ festival: fid, game: n, name: name, score: score }) })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function () { return fetch('/api/leaderboard?festival=' + encodeURIComponent(fid) + '&game=' + n); })
        .then(function (r) { return r && r.ok ? r.json() : null; })
        .then(function (j) { var b = $('fg-lb'); if (!b || !j || !j.top || !j.top.length) return; b.style.display = ''; b.innerHTML = '<h3>🏅 Top players</h3>' + j.top.map(function (t, i) { return '<div>' + (i + 1) + '. ' + esc(t.name) + ' - ' + (+t.score || 0) + '</div>'; }).join(''); })
        .catch(function () {});
    } catch (e) {}
  };
  FG.HOW = {};
})();
