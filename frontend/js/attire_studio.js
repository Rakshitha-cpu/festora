/* ===== FESTORA – FESTIVE ATTIRE STUDIO & HANDLOOM LOOKBOOK (All 66 Festivals) ===== */
(function () {
  'use strict';

  const STATE_ATTIRE = {
    'Karnataka': {
      women: 'Mysore Silk / Ilkal Saree',
      men: 'Silk Panche & Angavastram',
      handloom: 'Mysore & Ilkal Handloom Silk (GI Tagged)',
      story: 'Pure mulberry silk woven in Mysuru with real gold zari borders, paired with fresh jasmine gajra and temple gold jewelry.'
    },
    'Tamil Nadu': {
      women: 'Kanjeevaram Zari Silk Saree',
      men: 'Kanchi Silk Veshti & Angavastram',
      handloom: 'Kanchipuram Korvai Silk',
      story: 'Famous for its contrasting temple borders and rich korvai weave, Kanjeevaram silk is worn for auspicious temple and home rituals.'
    },
    'Kerala': {
      women: 'Kasavu Settu Mundu (Kerala Saree)',
      men: 'Mundu & Juba with Gold Kasavu',
      handloom: 'Balaramapuram & Chendamangalam Kasavu',
      story: 'Handwoven unbleached ivory cotton bordered with gleaming gold kasavu zari, reflecting Kerala’s serene festive elegance.'
    },
    'Maharashtra': {
      women: 'Paithani / Nauvari Saree',
      men: 'Kurta, Dhoti & Kolhapuri Pheta',
      handloom: 'Yeola Paithani Peacock Weave',
      story: 'Iconic Paithani silk with oblique square zari borders and peacock motifs, celebrating Marathi cultural pride.'
    },
    'Gujarat': {
      women: 'Bandhani / Mirrorwork Chaniya Choli',
      men: 'Embroidered Kediyu & Dhoti',
      handloom: 'Jamnagar Bandhani & Patan Patola',
      story: 'Vibrant tie-dye Bandhani and mirror-work embroidery that shimmer with every dance step.'
    },
    'Punjab': {
      women: 'Phulkari Patiala Salwar Suit',
      men: 'Kurta-Pajama, Jacket & Turban',
      handloom: 'Patiala Phulkari Floral Embroidery',
      story: 'Hand-embroidered floral Phulkari dupattas in bright harvest hues paired with traditional Punjabi silhouettes.'
    },
    'West Bengal': {
      women: 'Lal-Paar Tant / Baluchari Saree',
      men: 'Tussar Silk Panjabi & Dhuti',
      handloom: 'Fulia Tant & Bishnupur Baluchari',
      story: 'Crisp white cotton or silk with auspicious crimson borders, honoring Bengali artistic heritage.'
    },
    'Assam': {
      women: 'Muga Silk Mekhela Chador',
      men: 'Silk Kurta, Dhoti & Woven Gamocha',
      handloom: 'Sualkuchi Golden Muga Silk',
      story: 'Naturally golden Muga silk unique to Assam, paired with the iconic red-and-white handwoven Gamocha.'
    },
    'Odisha': {
      women: 'Sambalpuri Ikat Silk Saree',
      men: 'Sambalpuri Kurta & Uttariya',
      handloom: 'Sambalpuri Bandha (Ikat) Weave',
      story: 'Intricate resist-dyed conch, wheel, and temple patterns woven into luminous handloom silk.'
    },
    'Telangana': {
      women: 'Pochampally Ikat / Gadwal Saree',
      men: 'Pochampally Silk Kurta & Dhoti',
      handloom: 'Pochampally & Gadwal Handloom',
      story: 'Geometric Ikat weaves and rich Gadwal silk borders treasured across Telangana and Andhra celebrations.'
    },
    'Andhra Pradesh': {
      women: 'Uppada / Dharmavaram Silk Saree',
      men: 'Silk Pancha & Kanduva',
      handloom: 'Dharmavaram & Uppada Jamdani',
      story: 'Lightweight luminous silk with delicate jamdani motifs and broad golden borders.'
    },
    'Rajasthan': {
      women: 'Leheriya / Gota-Patti Ghagra Choli',
      men: 'Angrakha Kurta & Rajasthani Safa',
      handloom: 'Jaipur Leheriya & Kota Doria',
      story: 'Wave-patterned Leheriya and shimmering Gota-Patti work paired with royal colorful turbans.'
    },
    'Goa': {
      women: 'Kunbi / Kashti Festive Saree',
      men: 'Festive Kurta & Konkani Waistcoat',
      handloom: 'Goan Kunbi Checkered Cotton-Silk',
      story: 'Traditional checkered red-and-white Kunbi weaves and coastal festive attire.'
    }
  };

  const FEST_OVERRIDES = {
    eid: {
      women: 'Chikankari Anarkali & Zari Dupatta',
      men: 'Embroidered Sherwani / Chikankari Kurta',
      handloom: 'Lucknowi Chikankari & Banarasi Brocade',
      story: 'Delicate hand-embroidered Lucknowi Chikankari and rich brocade worn for Eid prayers and family feasts.'
    },
    xmas: {
      women: 'Crimson Velvet Gown / Festive Saree',
      men: 'Tailored Festive Blazer & Waistcoat',
      handloom: 'Winter Velvet & Handwoven Shawl',
      story: 'Warm crimson and emerald winter ensembles worn for midnight mass and Christmas gatherings.'
    },
    hampi: {
      women: 'Vijayanagara Temple Silk & Kempu Jewelry',
      men: 'Royal Kurta & Mysore Peta',
      handloom: 'Ilkal & Molakalmuru Temple Silk',
      story: 'Inspired by Vijayanagara court heritage, featuring deep temple silks and traditional Kempu stone ornaments.'
    }
  };

  const PALETTES = [
    { id: 'crimson', name: 'Crimson Zari', main: '#be185d', accent: '#fbbf24', trim: '#fef08a' },
    { id: 'saffron', name: 'Marigold Gold', main: '#d97706', accent: '#991b1b', trim: '#fde047' },
    { id: 'emerald', name: 'Peacock Green', main: '#047857', accent: '#f59e0b', trim: '#fde68a' },
    { id: 'royal', name: 'Royal Indigo', main: '#4338ca', accent: '#fbbf24', trim: '#fef08a' },
    { id: 'ivory', name: 'Kasavu Ivory', main: '#fef3c7', accent: '#d97706', trim: '#b45309' },
    { id: 'maroon', name: 'Temple Maroon', main: '#881337', accent: '#f59e0b', trim: '#fde047' }
  ];

  const JEWELRY = [
    { id: 'temple', name: 'Temple Gold' },
    { id: 'pearl', name: 'Royal Pearls' },
    { id: 'minimal', name: 'Minimalist' }
  ];

  const HEADGEAR = [
    { id: 'gajra', name: 'Jasmine / Peta' },
    { id: 'crown', name: 'Zari Crown / Safa' },
    { id: 'none', name: 'Classic' }
  ];

  const PROPS = [
    { id: 'diya', name: '🪔 Brass Diya' },
    { id: 'lotus', name: '🪷 Sacred Lotus' },
    { id: 'kalash', name: '🏺 Kalasha' },
    { id: 'flute', name: '🎶 Festive Bell' }
  ];

  function getAttireInfo(fid, g) {
    if (FEST_OVERRIDES[fid]) return FEST_OVERRIDES[fid];
    const st = (g && g.state) || '';
    if (STATE_ATTIRE[st]) return STATE_ATTIRE[st];
    return {
      women: 'Banarasi / Chanderi Silk Saree',
      men: 'Festive Silk Kurta & Brocade Stole',
      handloom: 'Indian Handloom Silk & Zari',
      story: 'Traditional handwoven Indian silk with gleaming zari borders, worn during auspicious festival rituals and gatherings.'
    };
  }

  function buildLookSVG(st, g) {
    const pal = PALETTES.find(p => p.id === st.palette) || PALETTES[0];
    const isWomen = st.model === 'women';
    const skin = '#dca06d';
    const hair = '#1c1917';
    const propIcon = st.prop === 'diya' ? '🪔' : (st.prop === 'lotus' ? '🪷' : (st.prop === 'kalash' ? '🏺' : '🔔'));

    const jewelSvg = st.jewelry === 'temple'
      ? `<path d="M98,112 Q120,136 142,112" fill="none" stroke="#fbbf24" stroke-width="4.5"/><circle cx="120" cy="128" r="4.5" fill="#dc2626" stroke="#fde047" stroke-width="1.5"/>`
      : (st.jewelry === 'pearl'
        ? `<path d="M98,112 Q120,134 142,112" fill="none" stroke="#f8fafc" stroke-width="4" stroke-dasharray="1 5" stroke-linecap="round"/>`
        : '');

    const headSvg = isWomen
      ? (st.head === 'gajra'
        ? `<circle cx="144" cy="78" r="10" fill="#fef9c3" stroke="#eab308" stroke-width="1.5"/><circle cx="147" cy="70" r="6" fill="#fffbeb"/>`
        : (st.head === 'crown' ? `<path d="M98,52 L110,36 L120,46 L130,36 L142,52 Z" fill="#fbbf24" stroke="#92400e" stroke-width="1.5"/>` : ''))
      : (st.head === 'gajra'
        ? `<path d="M88,58 Q120,26 154,56 L148,68 Q120,56 92,68 Z" fill="${pal.accent}" stroke="#fde047" stroke-width="2"/><circle cx="120" cy="48" r="5" fill="#fef08a"/>`
        : (st.head === 'crown' ? `<path d="M90,56 Q120,22 152,58 L146,68 L94,68 Z" fill="#dc2626" stroke="#fbbf24" stroke-width="2.5"/><path d="M120,26 L126,42 L114,42 Z" fill="#fde047"/>` : ''));

    const garmentSvg = isWomen
      ? `
        <path d="M84,120 L156,120 L174,268 L66,268 Z" fill="${pal.main}" stroke="${pal.accent}" stroke-width="3"/>
        <path d="M88,120 L158,266 L134,268 L78,132 Z" fill="${pal.accent}" opacity="0.92"/>
        <line x1="68" y1="254" x2="172" y2="254" stroke="${pal.trim}" stroke-width="5"/>
        <line x1="70" y1="261" x2="170" y2="261" stroke="${pal.accent}" stroke-width="2.5"/>
        <path d="M86,120 Q120,145 154,120" fill="${pal.main}" stroke="${pal.trim}" stroke-width="2"/>
      `
      : `
        <rect x="82" y="120" width="76" height="106" rx="14" fill="${pal.main}" stroke="${pal.accent}" stroke-width="2.5"/>
        <path d="M84,220 L156,220 L164,268 L76,268 Z" fill="#fffbeb" stroke="${pal.accent}" stroke-width="2.5"/>
        <line x1="78" y1="258" x2="162" y2="258" stroke="${pal.accent}" stroke-width="4"/>
        <path d="M92,120 L108,120 L108,215 L92,215 Z" fill="${pal.accent}" opacity="0.92"/>
        <line x1="120" y1="122" x2="120" y2="162" stroke="${pal.trim}" stroke-width="3"/>
      `;

    return `
      <svg id="att-look-svg" viewBox="0 0 240 295" width="240" height="295" style="max-width:100%;height:auto;display:block;margin:0 auto;">
        <defs>
          <radialGradient id="attGlow" cx="50%" cy="42%" r="52%">
            <stop offset="0%" stop-color="#fef3c7"/>
            <stop offset="100%" stop-color="#fde68a"/>
          </radialGradient>
        </defs>
        <rect x="4" y="4" width="232" height="287" rx="20" fill="url(#attGlow)" stroke="#d97706" stroke-width="3"/>
        <circle cx="120" cy="140" r="88" fill="#fffbeb" opacity="0.72" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="6 4"/>
        <text x="120" y="26" text-anchor="middle" font-size="11" font-weight="bold" fill="#92400e" font-family="Georgia,serif">${(g.e || '🪔') + ' ' + (g.name || 'Festival')} Lookbook</text>

        ${isWomen ? `<circle cx="120" cy="78" r="30" fill="${hair}"/>` : ''}
        ${garmentSvg}
        <line x1="84" y1="136" x2="56" y2="178" stroke="${skin}" stroke-width="11" stroke-linecap="round"/>
        <line x1="156" y1="136" x2="184" y2="172" stroke="${skin}" stroke-width="11" stroke-linecap="round"/>
        <text x="188" y="172" font-size="26" text-anchor="middle" dominant-baseline="central">${propIcon}</text>

        <rect x="111" y="102" width="18" height="22" rx="6" fill="${skin}"/>
        <circle cx="120" cy="78" r="26" fill="${skin}" stroke="#b45309" stroke-width="1"/>
        <path d="M94,74 C96,50 144,50 146,74 C135,62 105,62 94,74 Z" fill="${hair}"/>
        ${headSvg}
        <circle cx="110" cy="77" r="3" fill="#111827"/>
        <circle cx="130" cy="77" r="3" fill="#111827"/>
        ${isWomen ? `<circle cx="120" cy="69" r="3" fill="#dc2626"/>` : `<path d="M108,88 Q120,83 132,88" stroke="#1f2937" stroke-width="3" fill="none" stroke-linecap="round"/>`}
        <path d="M113,93 Q120,99 127,93" stroke="#7f1d1d" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        ${jewelSvg}
      </svg>
    `;
  }

  window.renderFestivalAttire = function () {
    const fid = window.cur || 'ganesh';
    const g = (window.G$ && window.G$[fid]) || (window.FEST && window.FEST.find(x => x.id === fid)) || { name: 'Festival', state: 'India', e: '🪔' };
    const info = getAttireInfo(fid, g);

    window.S = window.S || {};
    window.S.attire = window.S.attire || {};
    const st = window._attState = window._attState || {
      model: 'women',
      palette: 'crimson',
      jewelry: 'temple',
      head: 'gajra',
      prop: 'diya',
      speaking: false
    };

    function stopVoice() {
      try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {}
      st.speaking = false;
      const b = document.getElementById('att-voice-btn');
      if (b) b.textContent = '🔊 Hear Outfit Story';
    }

    function refreshPreview() {
      const stage = document.getElementById('att-stage-box');
      if (stage) stage.innerHTML = buildLookSVG(st, g);
      const nameEl = document.getElementById('att-outfit-name');
      if (nameEl) nameEl.textContent = st.model === 'women' ? info.women : info.men;
      document.querySelectorAll('.att-opt-btn').forEach(btn => {
        const grp = btn.getAttribute('data-g'), val = btn.getAttribute('data-v');
        const active = st[grp] === val;
        btn.style.borderColor = active ? '#b45309' : '#e5e7eb';
        btn.style.background = active ? '#fef3c7' : '#ffffff';
        btn.style.color = active ? '#78350f' : '#374151';
      });
    }

    window._attCtrl = {
      set: (grp, val) => { st[grp] = val; refreshPreview(); },
      toggleVoice: () => {
        if (st.speaking) { stopVoice(); return; }
        const text = `${g.name} traditional attire: ${st.model === 'women' ? info.women : info.men}, woven in ${info.handloom}. ${info.story}`;
        try {
          if (!window.speechSynthesis) return;
          window.speechSynthesis.cancel();
          const u = new SpeechSynthesisUtterance(text);
          u.lang = 'en-IN';
          u.rate = 0.95;
          u.onend = stopVoice;
          u.onerror = stopVoice;
          st.speaking = true;
          const b = document.getElementById('att-voice-btn');
          if (b) b.textContent = '⏹ Stop Audio';
          window.speechSynthesis.speak(u);
        } catch (e) {}
      },
      saveLook: () => {
        if (!window.S.attire[fid]) {
          window.S.attire[fid] = true;
          if (typeof window.addCoins === 'function') window.addCoins(25, g.name + ' Festive Look Styled');
          if (typeof window.saveProgress === 'function') window.saveProgress();
        } else if (typeof window.toast === 'function') {
          window.toast('✨ Look updated for ' + g.name + '!');
        }
      },
      downloadPng: () => {
        const svgEl = document.getElementById('att-look-svg');
        if (!svgEl) return;
        const xml = new XMLSerializer().serializeToString(svgEl);
        const img = new Image();
        img.onload = () => {
          const cv = document.createElement('canvas');
          cv.width = 480; cv.height = 590;
          const ctx = cv.getContext('2d');
          ctx.drawImage(img, 0, 0, 480, 590);
          const a = document.createElement('a');
          a.download = `festora-${fid}-attire.png`;
          a.href = cv.toDataURL('image/png');
          a.click();
        };
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(xml);
      }
    };

    setTimeout(refreshPreview, 10);

    return `
      <div style="max-width:920px;margin:0 auto;padding-bottom:28px;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:14px;">
          <div>
            <h2 style="margin:0;color:var(--ink);">👗 ${g.name} Festive Attire Studio</h2>
            <small style="color:var(--mut);">Customize authentic regional handlooms, jewelry & festive accessories.</small>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button type="button" id="att-voice-btn" onclick="window._attCtrl.toggleVoice()" style="background:#fffbeb;color:#92400e;border:1.5px solid #d97706;border-radius:999px;padding:6px 14px;font-weight:800;font-size:0.82rem;cursor:pointer;">🔊 Hear Outfit Story</button>
            <button type="button" onclick="window._attCtrl.saveLook()" style="background:#b45309;color:#ffffff;border:none;border-radius:999px;padding:7px 14px;font-weight:800;font-size:0.82rem;cursor:pointer;">✨ Save Look (+25 Coins)</button>
            <button type="button" onclick="window._attCtrl.downloadPng()" style="background:#15803d;color:#ffffff;border:none;border-radius:999px;padding:7px 14px;font-weight:800;font-size:0.82rem;cursor:pointer;">📥 Download Lookbook</button>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;align-items:start;">
          <div style="background:#ffffff;border:2px solid #d97706;border-radius:18px;padding:16px;text-align:center;box-shadow:0 8px 24px rgba(146,64,14,0.1);">
            <div style="display:flex;gap:8px;justify-content:center;margin-bottom:12px;">
              <button type="button" class="att-opt-btn" data-g="model" data-v="women" onclick="window._attCtrl.set('model','women')" style="padding:6px 14px;border-radius:999px;border:1.5px solid #b45309;font-weight:800;font-size:0.82rem;cursor:pointer;">👩 Women's Attire</button>
              <button type="button" class="att-opt-btn" data-g="model" data-v="men" onclick="window._attCtrl.set('model','men')" style="padding:6px 14px;border-radius:999px;border:1.5px solid #e5e7eb;font-weight:800;font-size:0.82rem;cursor:pointer;">👨 Men's Attire</button>
            </div>
            <div id="att-stage-box">${buildLookSVG(st, g)}</div>
          </div>

          <div style="display:flex;flex-direction:column;gap:12px;">
            <div style="background:#ffffff;border:2px solid #d97706;border-radius:16px;padding:14px 16px;box-shadow:0 6px 18px rgba(146,64,14,0.08);">
              <div style="font-size:0.74rem;font-weight:800;color:#b45309;text-transform:uppercase;">Traditional Heritage Look · ${g.state || 'India'}</div>
              <h3 id="att-outfit-name" style="margin:4px 0;color:#451a03;">${st.model === 'women' ? info.women : info.men}</h3>
              <div style="font-size:0.82rem;font-weight:700;color:#92400e;margin-bottom:6px;">🧵 Handloom: ${info.handloom}</div>
              <p style="margin:0;font-size:0.88rem;line-height:1.5;color:#1c1917;">${info.story}</p>
            </div>

            <div style="background:#ffffff;border:1.5px solid #e5e7eb;border-radius:16px;padding:14px 16px;">
              <div style="font-weight:800;font-size:0.82rem;color:#78350f;margin-bottom:6px;">1. Silk & Handloom Color</div>
              <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;">
                ${PALETTES.map(p => `<button type="button" class="att-opt-btn" data-g="palette" data-v="${p.id}" onclick="window._attCtrl.set('palette','${p.id}')" style="display:inline-flex;align-items:center;gap:5px;padding:5px 10px;border-radius:999px;border:1.5px solid #e5e7eb;font-size:0.76rem;font-weight:700;cursor:pointer;"><span style="width:12px;height:12px;border-radius:50%;background:${p.main};border:1px solid ${p.accent};display:inline-block;"></span>${p.name}</button>`).join('')}
              </div>

              <div style="font-weight:800;font-size:0.82rem;color:#78350f;margin-bottom:6px;">2. Jewelry & Ornaments</div>
              <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;">
                ${JEWELRY.map(j => `<button type="button" class="att-opt-btn" data-g="jewelry" data-v="${j.id}" onclick="window._attCtrl.set('jewelry','${j.id}')" style="padding:5px 11px;border-radius:999px;border:1.5px solid #e5e7eb;font-size:0.76rem;font-weight:700;cursor:pointer;">${j.name}</button>`).join('')}
              </div>

              <div style="font-weight:800;font-size:0.82rem;color:#78350f;margin-bottom:6px;">3. Hair / Headgear</div>
              <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;">
                ${HEADGEAR.map(h => `<button type="button" class="att-opt-btn" data-g="head" data-v="${h.id}" onclick="window._attCtrl.set('head','${h.id}')" style="padding:5px 11px;border-radius:999px;border:1.5px solid #e5e7eb;font-size:0.76rem;font-weight:700;cursor:pointer;">${h.name}</button>`).join('')}
              </div>

              <div style="font-weight:800;font-size:0.82rem;color:#78350f;margin-bottom:6px;">4. Festive Prop</div>
              <div style="display:flex;gap:6px;flex-wrap:wrap;">
                ${PROPS.map(pr => `<button type="button" class="att-opt-btn" data-g="prop" data-v="${pr.id}" onclick="window._attCtrl.set('prop','${pr.id}')" style="padding:5px 11px;border-radius:999px;border:1.5px solid #e5e7eb;font-size:0.76rem;font-weight:700;cursor:pointer;">${pr.name}</button>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  };
})();
