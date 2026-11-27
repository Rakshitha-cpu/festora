/* ===== FESTORA – INTERACTIVE CULTURAL KNOWLEDGE GRAPH & BFS PATH FINDER (All 66 Festivals) ===== */
(function () {
  'use strict';

  function getAllFestivals() {
    const list = Array.isArray(window.FEST) ? window.FEST : [];
    if (list.length) return list;
    if (window.G$) return Object.values(window.G$);
    return [];
  }

  function extractThemes(f) {
    const txt = ((f.tag || '') + ' ' + (f.name || '') + ' ' + (f.desc || '')).toLowerCase();
    const out = [];
    if (/light|lamp|diya|deepam|diwali/.test(txt)) out.push('Sacred Lamps & Lights');
    if (/harvest|crop|rice|grain|pongal|sankranti|bihu|onam|baisakhi|nuakhai/.test(txt)) out.push('Harvest & Gratitude');
    if (/goddess|lakshmi|durga|devi|gowri|shakti|navratri|varamahalakshmi/.test(txt)) out.push('Goddess & Shakti');
    if (/new year|yugadi|ugadi|gudi|vishu|navreh/.test(txt)) out.push('New Year & Renewal');
    if (/temple|chariot|rath|procession|utsav|hampi|thrissur|dasara/.test(txt)) out.push('Temple & Royal Heritage');
    if (/river|water|ghat|chhath|boat|kaveri|ganga|balijatra/.test(txt)) out.push('Sacred Rivers & Boats');
    if (/dance|music|drum|folk|garba|bihu|hornbill|wangala/.test(txt)) out.push('Folk Music & Dance');
    if (/spring|flower|rangoli|colour|holi|bathukamma|teej/.test(txt)) out.push('Flowers & Colors');
    if (!out.length) out.push('Sacred Community Rituals');
    return out.slice(0, 3);
  }

  function buildGraph() {
    const fests = getAllFestivals();
    const nodes = {}; // id -> { id, type, label, emoji, data }
    const adj = {};   // id -> Set of neighbor ids

    function addNode(id, type, label, emoji, data) {
      if (!nodes[id]) {
        nodes[id] = { id, type, label, emoji, data: data || {} };
        adj[id] = new Set();
      }
    }
    function addEdge(a, b) {
      if (!adj[a] || !adj[b] || a === b) return;
      adj[a].add(b);
      adj[b].add(a);
    }

    fests.forEach(f => {
      const fid = 'f:' + f.id;
      addNode(fid, 'fest', f.name, f.e || '🪔', { fest: f });

      const st = (f.state || 'India').trim();
      const sid = 's:' + st;
      addNode(sid, 'state', st, '📍', { state: st });
      addEdge(fid, sid);

      extractThemes(f).forEach(th => {
        const tid = 't:' + th;
        addNode(tid, 'theme', th, '✨', { theme: th });
        addEdge(fid, tid);
      });

      const foodArr = Array.isArray(f.foods) ? f.foods : (Array.isArray(f.food) ? f.food : []);
      if (foodArr.length) {
        const rawFood = foodArr[0];
        const fname = (typeof rawFood === 'string') ? rawFood : (rawFood.name || rawFood[1] || rawFood[0] || '');
        if (fname && typeof fname === 'string' && fname.length < 32) {
          const cleanF = fname.replace(/[^\w\s-]/g, '').trim() || fname;
          const foid = 'd:' + cleanF.toLowerCase();
          addNode(foid, 'food', cleanF, '🍽️', { food: cleanF });
          addEdge(fid, foid);
        }
      }
    });

    return { nodes, adj, fests };
  }

  function bfsPath(graph, startId, endId) {
    if (!graph.nodes[startId] || !graph.nodes[endId]) return null;
    if (startId === endId) return [startId];
    const q = [[startId]];
    const vis = new Set([startId]);
    while (q.length) {
      const path = q.shift();
      const cur = path[path.length - 1];
      const nbrs = Array.from(graph.adj[cur] || []);
      for (let i = 0; i < nbrs.length; i++) {
        const nb = nbrs[i];
        if (vis.has(nb)) continue;
        const next = path.concat(nb);
        if (nb === endId) return next;
        vis.add(nb);
        q.push(next);
      }
    }
    return null;
  }

  window.renderFestivalGraph = function () {
    const fid = window.cur || 'ganesh';
    const graph = buildGraph();
    const centerId = 'f:' + fid;
    const fests = graph.fests;
    const g = (window.G$ && window.G$[fid]) || fests.find(x => x.id === fid) || { id: fid, name: 'Festival', state: 'India', e: '🪔' };

    window.S = window.S || {};
    window.S.kgExplored = window.S.kgExplored || false;

    const defaultTarget = (fests.find(x => x.id === 'pongal' && x.id !== fid) || fests.find(x => x.id !== fid) || g).id;
    let state = {
      selectedId: centerId,
      path: null,
      targetFid: defaultTarget,
      layoutNodes: [],
      layoutEdges: [],
      dragNode: null
    };

    function computeLayout() {
      const W = 620, H = 400;
      const cx = W / 2, cy = H / 2;
      const visibleIds = new Set();
      const edges = [];

      if (state.path && state.path.length > 1) {
        state.path.forEach(id => visibleIds.add(id));
        for (let i = 0; i < state.path.length - 1; i++) {
          edges.push({ a: state.path[i], b: state.path[i + 1], isPath: true });
        }
        // Add 1-2 extra context nodes around start & end
        [state.path[0], state.path[state.path.length - 1]].forEach(endId => {
          Array.from(graph.adj[endId] || []).slice(0, 3).forEach(nb => {
            if (!visibleIds.has(nb)) {
              visibleIds.add(nb);
              edges.push({ a: endId, b: nb, isPath: false });
            }
          });
        });
      } else {
        visibleIds.add(centerId);
        const direct = Array.from(graph.adj[centerId] || []);
        direct.forEach(nb => {
          visibleIds.add(nb);
          edges.push({ a: centerId, b: nb, isPath: false });
          // Add 1 related festival from each neighbor
          const second = Array.from(graph.adj[nb] || []).filter(x => x !== centerId && x.startsWith('f:')).slice(0, 2);
          second.forEach(sf => {
            if (visibleIds.size < 14) {
              visibleIds.add(sf);
              edges.push({ a: nb, b: sf, isPath: false });
            }
          });
        });
      }

      const arr = Array.from(visibleIds).map(id => graph.nodes[id]).filter(Boolean);
      const placed = [];

      if (state.path && state.path.length > 1) {
        const pLen = state.path.length;
        const pathSet = new Set(state.path);
        state.path.forEach((id, idx) => {
          const nd = graph.nodes[id];
          if (!nd) return;
          const x = 68 + (idx / (pLen - 1)) * (W - 136);
          const y = cy + (idx % 2 === 0 ? -24 : 24);
          placed.push(Object.assign({ x, y, r: nd.type === 'fest' ? 25 : 20, inPath: true }, nd));
        });
        let extraIdx = 0;
        arr.filter(n => !pathSet.has(n.id)).forEach(nd => {
          const ang = (extraIdx / Math.max(1, arr.length - pLen)) * Math.PI * 2;
          const x = Math.max(55, Math.min(W - 55, cx + Math.cos(ang) * 210));
          const y = Math.max(50, Math.min(H - 50, cy + Math.sin(ang) * 145));
          placed.push(Object.assign({ x, y, r: 17, inPath: false }, nd));
          extraIdx++;
        });
      } else {
        const ring1 = [], ring2 = [];
        const directSet = new Set(Array.from(graph.adj[centerId] || []));
        arr.forEach(nd => {
          if (nd.id === centerId) placed.push(Object.assign({ x: cx, y: cy, r: 30, inPath: false }, nd));
          else if (directSet.has(nd.id)) ring1.push(nd);
          else ring2.push(nd);
        });
        ring1.forEach((nd, i) => {
          const ang = (i / Math.max(1, ring1.length)) * Math.PI * 2 - Math.PI / 2;
          placed.push(Object.assign({ x: cx + Math.cos(ang) * 112, y: cy + Math.sin(ang) * 92, r: 21, inPath: false }, nd));
        });
        ring2.forEach((nd, i) => {
          const ang = (i / Math.max(1, ring2.length)) * Math.PI * 2 - Math.PI / 3;
          placed.push(Object.assign({ x: cx + Math.cos(ang) * 235, y: cy + Math.sin(ang) * 155, r: 20, inPath: false }, nd));
        });
      }

      state.layoutNodes = placed;
      state.layoutEdges = edges;
    }

    function drawCanvas() {
      const cv = document.getElementById('kg-canvas');
      if (!cv) return;
      const ctx = cv.getContext('2d');
      const W = cv.width, H = cv.height;

      const bg = ctx.createRadialGradient(W / 2, H / 2, 20, W / 2, H / 2, W * 0.7);
      bg.addColorStop(0, '#1e1b4b');
      bg.addColorStop(0.65, '#0f172a');
      bg.addColorStop(1, '#090d1f');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      const byId = {};
      state.layoutNodes.forEach(n => { byId[n.id] = n; });

      // Draw edges
      state.layoutEdges.forEach(e => {
        const a = byId[e.a], b = byId[e.b];
        if (!a || !b) return;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        if (e.isPath) {
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 3.6;
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 10;
        } else {
          ctx.strokeStyle = 'rgba(148,163,184,0.34)';
          ctx.lineWidth = 1.6;
        }
        ctx.stroke();
        ctx.restore();
      });

      // Draw nodes
      const colors = { fest: '#f59e0b', state: '#38bdf8', theme: '#c084fc', food: '#34d399' };
      state.layoutNodes.forEach(n => {
        const isSel = state.selectedId === n.id;
        const col = colors[n.type] || '#fbbf24';
        ctx.save();
        if (isSel || n.inPath) {
          ctx.shadowColor = isSel ? '#fde047' : col;
          ctx.shadowBlur = isSel ? 18 : 10;
        }
        ctx.fillStyle = isSel ? '#fde047' : '#1e293b';
        ctx.strokeStyle = n.inPath ? '#fde047' : col;
        ctx.lineWidth = isSel ? 3.5 : 2.2;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        ctx.font = Math.round(n.r * 0.85) + 'px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(n.emoji, n.x, n.y + 1);

        // Label below node
        const lbl = n.label.length > 18 ? n.label.slice(0, 16) + '…' : n.label;
        ctx.font = (isSel || n.inPath ? 'bold ' : '') + '11px system-ui,sans-serif';
        ctx.fillStyle = isSel || n.inPath ? '#fef08a' : '#e2e8f0';
        ctx.fillText(lbl, n.x, n.y + n.r + 12);
      });
    }

    function renderInspector() {
      const card = document.getElementById('kg-insight-card');
      if (!card) return;
      const nd = graph.nodes[state.selectedId] || graph.nodes[centerId];
      if (!nd) return;

      const nbrFests = Array.from(graph.adj[nd.id] || [])
        .map(id => graph.nodes[id])
        .filter(Boolean)
        .slice(0, 6);

      const typeBadge = nd.type === 'fest' ? '🪔 Festival' : (nd.type === 'state' ? '📍 State / Region' : (nd.type === 'theme' ? '✨ Cultural Theme' : '🍽️ Traditional Food'));
      let bodyText = '';
      if (nd.type === 'fest' && nd.data.fest) {
        const f = nd.data.fest;
        bodyText = `${f.name} is celebrated in ${f.state || 'India'}. ${(f.tag || f.desc || 'Rich in cultural rituals and community heritage.')}`;
      } else if (nd.type === 'state') {
        bodyText = `Explore how festivals across ${nd.label} share regional languages, temple traditions, and seasonal harvest customs.`;
      } else if (nd.type === 'theme') {
        bodyText = `Multiple Indian festivals across different states are united by "${nd.label}" — showing India's shared cultural roots.`;
      } else {
        bodyText = `"${nd.label}" is a signature festive delicacy connecting regional harvests and family celebrations.`;
      }

      const festIdOnly = nd.id.startsWith('f:') ? nd.id.slice(2) : null;

      card.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:6px;">
          <span style="background:#fef3c7;color:#92400e;border:1px solid #f59e0b;border-radius:999px;padding:2px 10px;font-size:0.74rem;font-weight:800;">${typeBadge}</span>
          <button type="button" onclick="window._kgCtrl.speak('${nd.label.replace(/'/g, '')}: ${bodyText.replace(/'/g, '')}')" style="background:#fffbeb;color:#92400e;border:1px solid #d97706;border-radius:999px;padding:2px 9px;font-size:0.72rem;font-weight:800;cursor:pointer;">🔊 Listen</button>
        </div>
        <h3 style="margin:4px 0 6px;color:#451a03;">${nd.emoji} ${nd.label}</h3>
        <p style="margin:0 0 10px;font-size:0.86rem;line-height:1.5;color:#1c1917;">${bodyText}</p>
        ${festIdOnly && festIdOnly !== fid ? `<button type="button" onclick="window._kgCtrl.jump('${festIdOnly}')" style="width:100%;margin-bottom:10px;background:#b45309;color:#ffffff;border:none;border-radius:999px;padding:8px 14px;font-weight:800;font-size:0.84rem;cursor:pointer;">🚀 Jump to ${nd.label}</button>` : ''}
        <div style="font-size:0.76rem;font-weight:800;color:#78350f;margin-bottom:6px;">Connected Nodes (Tap to Inspect):</div>
        <div style="display:flex;gap:5px;flex-wrap:wrap;">
          ${nbrFests.map(nb => `<button type="button" onclick="window._kgCtrl.select('${nb.id}')" style="background:#fffbeb;color:#451a03;border:1px solid #d97706;border-radius:999px;padding:3px 9px;font-size:0.74rem;font-weight:700;cursor:pointer;">${nb.emoji} ${nb.label}</button>`).join('')}
        </div>
      `;

      const trail = document.getElementById('kg-path-trail');
      if (trail) {
        if (state.path && state.path.length > 1) {
          trail.style.display = 'block';
          trail.innerHTML = '<b>⚡ BFS Shortest Cultural Path (' + (state.path.length - 1) + ' hops):</b> ' +
            state.path.map(id => `<span style="background:#fef3c7;color:#78350f;padding:2px 8px;border-radius:999px;border:1px solid #f59e0b;font-weight:800;">${graph.nodes[id].emoji} ${graph.nodes[id].label}</span>`).join(' → ');
        } else {
          trail.style.display = 'none';
        }
      }
    }

    function bindCanvas() {
      const cv = document.getElementById('kg-canvas');
      if (!cv) return;
      function pt(e) {
        const r = cv.getBoundingClientRect();
        return { x: (e.clientX - r.left) * (cv.width / r.width), y: (e.clientY - r.top) * (cv.height / r.height) };
      }
      cv.addEventListener('pointerdown', e => {
        const p = pt(e);
        for (let i = state.layoutNodes.length - 1; i >= 0; i--) {
          const n = state.layoutNodes[i];
          if (Math.hypot(p.x - n.x, p.y - n.y) <= n.r + 8) {
            state.dragNode = n;
            state.selectedId = n.id;
            drawCanvas();
            renderInspector();
            break;
          }
        }
      });
      cv.addEventListener('pointermove', e => {
        if (!state.dragNode) return;
        const p = pt(e);
        state.dragNode.x = Math.max(36, Math.min(cv.width - 36, p.x));
        state.dragNode.y = Math.max(36, Math.min(cv.height - 36, p.y));
        drawCanvas();
      });
      window.addEventListener('pointerup', () => { state.dragNode = null; });
    }

    window._kgCtrl = {
      select: (id) => { state.selectedId = id; drawCanvas(); renderInspector(); },
      runBfs: () => {
        const fromSel = document.getElementById('kg-from');
        const toSel = document.getElementById('kg-to');
        const a = 'f:' + (fromSel ? fromSel.value : fid);
        const b = 'f:' + (toSel ? toSel.value : state.targetFid);
        state.path = bfsPath(graph, a, b);
        state.selectedId = b;
        computeLayout();
        drawCanvas();
        renderInspector();
        if (!window.S.kgExplored) {
          window.S.kgExplored = true;
          if (typeof window.addCoins === 'function') window.addCoins(25, 'BFS Cultural Path Discovered');
          if (typeof window.saveProgress === 'function') window.saveProgress();
        }
      },
      resetGraph: () => {
        state.path = null;
        state.selectedId = centerId;
        computeLayout();
        drawCanvas();
        renderInspector();
      },
      jump: (targetId) => {
        window.cur = targetId;
        try { cur = targetId; } catch (e) {}
        if (typeof window.applyTheme === 'function') window.applyTheme(targetId);
        if (typeof window.go === 'function') window.go('Overview');
      },
      speak: (txt) => {
        try {
          if (!window.speechSynthesis) return;
          window.speechSynthesis.cancel();
          const u = new SpeechSynthesisUtterance(txt);
          u.lang = 'en-IN';
          window.speechSynthesis.speak(u);
        } catch (e) {}
      }
    };

    computeLayout();
    setTimeout(() => { bindCanvas(); drawCanvas(); renderInspector(); }, 20);

    const festOpts = fests.map(f => `<option value="${f.id}">${f.e || '🪔'} ${f.name} (${f.state || 'India'})</option>`).join('');

    return `
      <div style="max-width:980px;margin:0 auto;padding-bottom:28px;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
          <div>
            <h2 style="margin:0;color:var(--ink);">🕸️ Cultural Knowledge Graph &amp; BFS Path Finder</h2>
            <small style="color:var(--mut);">Explore how all ${fests.length} Indian festivals connect across states, rituals &amp; foods. Drag or tap any node!</small>
          </div>
          <span style="background:#1e1b4b;color:#fde047;border:1.5px solid #f59e0b;border-radius:999px;padding:5px 12px;font-size:0.78rem;font-weight:800;">⚡ ${Object.keys(graph.nodes).length} Cultural Nodes</span>
        </div>

        <div style="background:#fffbeb;border:2px solid #d97706;border-radius:16px;padding:10px 14px;margin-bottom:12px;display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
          <b style="color:#92400e;font-size:0.84rem;">🔍 Find Cultural Connection:</b>
          <select id="kg-from" style="background:#ffffff;color:#1c1917;border:1.5px solid #d97706;border-radius:10px;padding:5px 8px;font-size:0.8rem;font-weight:700;max-width:210px;">
            ${fests.map(f => `<option value="${f.id}" ${f.id === fid ? 'selected' : ''}>${f.e || '🪔'} ${f.name}</option>`).join('')}
          </select>
          <span style="font-weight:900;color:#b45309;">→</span>
          <select id="kg-to" style="background:#ffffff;color:#1c1917;border:1.5px solid #d97706;border-radius:10px;padding:5px 8px;font-size:0.8rem;font-weight:700;max-width:210px;">
            ${fests.map(f => `<option value="${f.id}" ${f.id === state.targetFid ? 'selected' : ''}>${f.e || '🪔'} ${f.name}</option>`).join('')}
          </select>
          <button type="button" onclick="window._kgCtrl.runBfs()" style="background:linear-gradient(135deg,#f59e0b,#d97706);color:#1c1917;border:none;border-radius:999px;padding:6px 14px;font-weight:900;font-size:0.8rem;cursor:pointer;">⚡ Find Path (BFS)</button>
          <button type="button" onclick="window._kgCtrl.resetGraph()" style="background:#ffffff;color:#78350f;border:1.5px solid #d97706;border-radius:999px;padding:5px 12px;font-weight:800;font-size:0.78rem;cursor:pointer;">↻ Reset</button>
        </div>

        <div id="kg-path-trail" style="display:none;background:#ffffff;border:1.5px solid #f59e0b;border-radius:12px;padding:8px 12px;margin-bottom:12px;font-size:0.82rem;line-height:1.8;color:#451a03;"></div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:14px;align-items:start;">
          <div style="grid-column:span 1;background:#090d1f;border:2px solid #f59e0b;border-radius:18px;padding:8px;box-shadow:0 12px 28px rgba(15,23,42,0.35);">
            <canvas id="kg-canvas" width="620" height="400" style="width:100%;height:auto;display:block;border-radius:12px;cursor:pointer;touch-action:none;"></canvas>
            <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;padding:6px 4px 2px;font-size:0.72rem;color:#e2e8f0;font-weight:700;">
              <span>🟠 Festival</span><span>🔵 State</span><span>🟣 Tradition</span><span>🟢 Food</span><span>⭐ Gold = BFS Path</span>
            </div>
          </div>

          <div id="kg-insight-card" style="background:#ffffff;border:2px solid #d97706;border-radius:18px;padding:16px;box-shadow:0 8px 22px rgba(146,64,14,0.1);"></div>
        </div>
      </div>
    `;
  };
})();
