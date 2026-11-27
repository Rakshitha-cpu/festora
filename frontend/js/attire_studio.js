/* ===== FESTORA – COCO-STYLE FESTIVE ATTIRE STUDIO & SHOPPING LOOKBOOK (All 66 Festivals) ===== */
(function () {
  'use strict';

  const WARDROBE_BY_GROUP = {
    karnataka: {
      handloom: 'Mysore Silk & Ilkal Handloom (GI Tagged)',
      girl: [
        { id: 'ka_mysore', name: 'Mysore Silk Saree', main: '#6b0f6c', accent: '#fbbf24', trim: '#fef08a', style: 'saree', jewel: 'temple', head: 'gajra', query: 'Mysore Silk Saree pure zari', desc: 'Graceful purple & gold Mysore Silk Saree with traditional zari border.' },
        { id: 'ka_ilkal', name: 'Ilkal Zari Saree', main: '#065f46', accent: '#dc2626', trim: '#fde047', style: 'saree', jewel: 'temple', head: 'gajra', query: 'Ilkal Silk Saree Karnataka', desc: 'Traditional North Karnataka Ilkal handloom with crimson temple border.' },
        { id: 'ka_langavoni', name: 'Langa Voni', main: '#be185d', accent: '#047857', trim: '#fef08a', style: 'lehenga', jewel: 'pearl', head: 'gajra', query: 'Silk Langa Voni Half Saree', desc: 'Festive South Indian half-saree with rich contrasting zari dupatta.' }
      ],
      boy: [
        { id: 'ka_panche', name: 'Silk Panche & Peta', main: '#fffbeb', accent: '#d97706', trim: '#991b1b', style: 'dhoti', jewel: 'temple', head: 'peta', query: 'Karnataka Silk Panche Angavastram', desc: 'Auspicious ivory silk kurta and gold-bordered panche with angavastram.' },
        { id: 'ka_peta', name: 'Royal Mysore Kurta', main: '#7f1d1d', accent: '#fbbf24', trim: '#fef08a', style: 'kurta', jewel: 'minimal', head: 'peta', query: 'Mysore Peta Silk Kurta Men', desc: 'Vijayanagara-inspired royal brocade kurta with traditional Mysore Peta.' }
      ]
    },
    tamilnadu: {
      handloom: 'Kanchipuram Korvai & Madurai Sungudi',
      girl: [
        { id: 'tn_kanchi', name: 'Kanjeevaram Silk', main: '#991b1b', accent: '#fbbf24', trim: '#fef08a', style: 'saree', jewel: 'temple', head: 'gajra', query: 'Kanjeevaram Pure Silk Saree', desc: 'Iconic Tamil temple-border Kanjeevaram silk woven with pure gold zari.' },
        { id: 'tn_sungudi', name: 'Madurai Sungudi', main: '#3730a3', accent: '#f59e0b', trim: '#fde047', style: 'saree', jewel: 'pearl', head: 'gajra', query: 'Madurai Sungudi Cotton Saree', desc: 'Lightweight tie-dye Sungudi saree ideal for Pongal and temple visits.' },
        { id: 'tn_pavadai', name: 'Pattu Pavadai', main: '#0f766e', accent: '#fbbf24', trim: '#fef08a', style: 'lehenga', jewel: 'temple', head: 'gajra', query: 'Pattu Pavadai Silk Set', desc: 'Vibrant silk skirt and blouse set worn for Pongal and Karthigai Deepam.' }
      ],
      boy: [
        { id: 'tn_veshti', name: 'Kanchi Silk Veshti', main: '#fffbeb', accent: '#b45309', trim: '#f59e0b', style: 'dhoti', jewel: 'minimal', head: 'none', query: 'Tamil Silk Veshti Angavastram', desc: 'Crisp gold-bordered silk veshti paired with matching silk shirt.' }
      ]
    },
    kerala: {
      handloom: 'Balaramapuram & Chendamangalam Kasavu',
      girl: [
        { id: 'kl_kasavu', name: 'Kasavu Settu Mundu', main: '#fffbeb', accent: '#d97706', trim: '#f59e0b', style: 'saree', jewel: 'temple', head: 'gajra', query: 'Kerala Kasavu Saree Settu Mundu', desc: 'Handwoven ivory cotton bordered with gleaming golden kasavu zari.' },
        { id: 'kl_tissue', name: 'Golden Tissue Kasavu', main: '#fef3c7', accent: '#b45309', trim: '#fde047', style: 'saree', jewel: 'pearl', head: 'gajra', query: 'Kerala Golden Tissue Kasavu Saree', desc: 'Luminous gold-tissue weave worn for Onam Sadya and Vishu.' }
      ],
      boy: [
        { id: 'kl_mundu', name: 'Kasavu Mundu & Juba', main: '#fffbeb', accent: '#d97706', trim: '#b45309', style: 'dhoti', jewel: 'minimal', head: 'none', query: 'Kerala Kasavu Mundu Juba Men', desc: 'Classic Kerala festive mundu paired with crisp ivory cotton-silk juba.' },
        { id: 'kl_gold', name: 'Gold-Border Kurta', main: '#fef3c7', accent: '#92400e', trim: '#fbbf24', style: 'kurta', jewel: 'minimal', head: 'none', query: 'Kerala Silk Kurta Mundu', desc: 'Festive golden-weave kurta for temple celebrations and Thrissur Pooram.' }
      ]
    },
    maharashtra: {
      handloom: 'Yeola Paithani & Kolhapuri Pheta',
      girl: [
        { id: 'mh_paithani', name: 'Paithani Nauvari', main: '#581c87', accent: '#fbbf24', trim: '#fde047', style: 'saree', jewel: 'temple', head: 'gajra', query: 'Paithani Silk Saree Maharashtra', desc: 'Royal purple Paithani silk with oblique square zari borders and peacock motifs.' },
        { id: 'mh_peshwai', name: 'Peshwai Silk Saree', main: '#be123c', accent: '#fbbf24', trim: '#fef08a', style: 'saree', jewel: 'pearl', head: 'gajra', query: 'Nauvari Silk Saree Marathi', desc: 'Traditional nine-yard festive drape paired with pearl jewelry.' }
      ],
      boy: [
        { id: 'mh_pheta', name: 'Kurta & Saffron Pheta', main: '#fffbeb', accent: '#ea580c', trim: '#fbbf24', style: 'dhoti', jewel: 'minimal', head: 'peta', query: 'Marathi Kurta Dhoti Saffron Pheta', desc: 'Traditional Marathi festive kurta-dhoti crowned with a saffron pheta turban.' },
        { id: 'mh_bandi', name: 'Brocade Bandi Set', main: '#b45309', accent: '#fef08a', trim: '#fbbf24', style: 'kurta', jewel: 'minimal', head: 'peta', query: 'Mens Brocade Nehru Jacket Kurta', desc: 'Tailored festive bandi jacket over crisp silk kurta.' }
      ]
    },
    gujarat: {
      handloom: 'Jamnagar Bandhani & Patan Patola',
      girl: [
        { id: 'gj_chaniya', name: 'Mirror Chaniya Choli', main: '#db2777', accent: '#fbbf24', trim: '#38bdf8', style: 'lehenga', jewel: 'pearl', head: 'gajra', query: 'Navratri Mirror Work Chaniya Choli', desc: 'Flared Kutchi mirror-work lehenga choli made for Garba twirls.' },
        { id: 'gj_patola', name: 'Bandhani Patola', main: '#b91c1c', accent: '#fde047', trim: '#fbbf24', style: 'saree', jewel: 'temple', head: 'gajra', query: 'Gujarati Bandhani Patola Saree', desc: 'Vibrant tie-dye Bandhani silk with traditional Gujarati drape.' }
      ],
      boy: [
        { id: 'gj_kediyu', name: 'Kutch Kediyu & Dhoti', main: '#4338ca', accent: '#fbbf24', trim: '#f43f5e', style: 'kurta', jewel: 'minimal', head: 'safa', query: 'Mens Navratri Kediyu Dhoti', desc: 'Flared mirror-embroidered Kutchi kediyu jacket with colorful turban.' },
        { id: 'gj_bandhani', name: 'Bandhani Kurta', main: '#d97706', accent: '#991b1b', trim: '#fde047', style: 'kurta', jewel: 'minimal', head: 'safa', query: 'Mens Bandhani Kurta Jacket', desc: 'Festive tie-dye Bandhani kurta ideal for Uttarayan & Navratri.' }
      ]
    },
    punjab: {
      handloom: 'Patiala Phulkari & Gotapatti',
      girl: [
        { id: 'pb_phulkari', name: 'Phulkari Patiala Suit', main: '#e11d48', accent: '#fbbf24', trim: '#fde047', style: 'lehenga', jewel: 'pearl', head: 'dupatta', query: 'Phulkari Patiala Salwar Suit', desc: 'Bright festive suit paired with hand-embroidered floral Phulkari dupatta.' },
        { id: 'pb_sharara', name: 'Gotapatti Sharara', main: '#d97706', accent: '#b91c1c', trim: '#fef08a', style: 'lehenga', jewel: 'temple', head: 'dupatta', query: 'Punjabi Mustard Sharara Suit', desc: 'Golden mustard Basant/Lohri ensemble with shimmering gota-patti borders.' }
      ],
      boy: [
        { id: 'pb_turban', name: 'Phulkari Jacket & Turban', main: '#1d4ed8', accent: '#fbbf24', trim: '#fef08a', style: 'kurta', jewel: 'minimal', head: 'safa', query: 'Mens Punjabi Kurta Jacket Turban', desc: 'Crisp Punjabi kurta-pajama layered with embroidered jacket and turban.' },
        { id: 'pb_lohri', name: 'Saffron Silk Kurta', main: '#b45309', accent: '#fde047', trim: '#fbbf24', style: 'kurta', jewel: 'minimal', head: 'safa', query: 'Mens Festive Silk Kurta Pajama', desc: 'Warm harvest-hued silk kurta for Baisakhi and Lohri bonfires.' }
      ]
    },
    east: {
      handloom: 'Fulia Tant, Baluchari & Sambalpuri Ikat',
      girl: [
        { id: 'ea_lalpaar', name: 'Lal-Paar Garad Saree', main: '#fffbeb', accent: '#dc2626', trim: '#fbbf24', style: 'saree', jewel: 'temple', head: 'gajra', query: 'Bengali Lal Paar Garad Saree', desc: 'Iconic ivory silk saree with bold auspicious crimson borders.' },
        { id: 'ea_sambalpuri', name: 'Sambalpuri Ikat Silk', main: '#0f766e', accent: '#fbbf24', trim: '#dc2626', style: 'saree', jewel: 'pearl', head: 'gajra', query: 'Sambalpuri Ikat Silk Saree', desc: 'Handwoven Odisha Ikat featuring traditional conch and temple motifs.' }
      ],
      boy: [
        { id: 'ea_panjabi', name: 'Tussar Panjabi & Dhuti', main: '#fef3c7', accent: '#b91c1c', trim: '#d97706', style: 'dhoti', jewel: 'minimal', head: 'none', query: 'Bengali Tussar Silk Panjabi Dhoti', desc: 'Golden tussar silk Panjabi kurta paired with pleated festive dhuti.' },
        { id: 'ea_ikat', name: 'Sambalpuri Kurta', main: '#7c2d12', accent: '#fbbf24', trim: '#fef08a', style: 'kurta', jewel: 'minimal', head: 'none', query: 'Sambalpuri Silk Kurta Men', desc: 'Handloom Ikat-bordered kurta worn during Rath Yatra and Nuakhai.' }
      ]
    },
    northeast: {
      handloom: 'Sualkuchi Golden Muga Silk & Gamocha',
      girl: [
        { id: 'ne_mekhela', name: 'Muga Mekhela Chador', main: '#d97706', accent: '#dc2626', trim: '#fef08a', style: 'saree', jewel: 'temple', head: 'gajra', query: 'Assam Muga Silk Mekhela Chador', desc: 'Naturally golden Assamese Muga silk two-piece drape with crimson motifs.' },
        { id: 'ne_puan', name: 'Tribal Handloom Wrap', main: '#047857', accent: '#f43f5e', trim: '#fde047', style: 'lehenga', jewel: 'pearl', head: 'gajra', query: 'Northeast Indian Handloom Mekhela', desc: 'Intricate geometric handloom wrap celebrating harvest and folk dance.' }
      ],
      boy: [
        { id: 'ne_gamocha', name: 'Silk Kurta & Gamocha', main: '#fffbeb', accent: '#dc2626', trim: '#d97706', style: 'dhoti', jewel: 'minimal', head: 'none', query: 'Assam Kurta Dhoti Gamocha', desc: 'Ivory silk kurta-dhoti draped with the iconic red-and-white handwoven Gamocha.' }
      ]
    },
    eid: {
      handloom: 'Lucknowi Chikankari & Banarasi Brocade',
      girl: [
        { id: 'eid_anarkali', name: 'Chikankari Anarkali', main: '#047857', accent: '#fbbf24', trim: '#fef08a', style: 'lehenga', jewel: 'pearl', head: 'dupatta', query: 'Chikankari Anarkali Suit Eid', desc: 'Flowing emerald Chikankari gown with delicate gold zari border.' },
        { id: 'eid_sharara', name: 'Ivory Zari Sharara', main: '#fffbeb', accent: '#d97706', trim: '#fbbf24', style: 'lehenga', jewel: 'pearl', head: 'dupatta', query: 'Ivory Gold Zari Sharara Eid', desc: 'Elegant hand-embroidered festive sharara paired with pearl chandbalis.' }
      ],
      boy: [
        { id: 'eid_sherwani', name: 'Embroidered Sherwani', main: '#1e3a8a', accent: '#fbbf24', trim: '#fef08a', style: 'kurta', jewel: 'minimal', head: 'none', query: 'Mens Embroidered Eid Sherwani', desc: 'Tailored royal indigo sherwani with golden collar embroidery.' },
        { id: 'eid_chikan', name: 'Chikankari Kurta', main: '#fffbeb', accent: '#d97706', trim: '#fbbf24', style: 'kurta', jewel: 'minimal', head: 'none', query: 'Mens Lucknowi Chikankari Kurta', desc: 'Classic white hand-embroidered Chikankari kurta for Eid prayers.' }
      ]
    },
    xmas: {
      handloom: 'Winter Velvet & Handwoven Shawl',
      girl: [
        { id: 'xm_gown', name: 'Crimson Velvet Gown', main: '#b91c1c', accent: '#fbbf24', trim: '#fef08a', style: 'lehenga', jewel: 'pearl', head: 'none', query: 'Crimson Velvet Party Gown', desc: 'Warm crimson velvet festive dress accented with pearl jewelry.' },
        { id: 'xm_emerald', name: 'Emerald Silk Dress', main: '#065f46', accent: '#fde047', trim: '#fbbf24', style: 'saree', jewel: 'pearl', head: 'none', query: 'Emerald Green Silk Festive Saree', desc: 'Rich evergreen silk outfit paired with gold winter accessories.' }
      ],
      boy: [
        { id: 'xm_blazer', name: 'Crimson Velvet Blazer', main: '#7f1d1d', accent: '#fbbf24', trim: '#fffbeb', style: 'kurta', jewel: 'minimal', head: 'none', query: 'Mens Maroon Velvet Festive Blazer', desc: 'Sharp winter blazer and crisp shirt for Christmas Eve celebrations.' }
      ]
    },
    default: {
      handloom: 'Banarasi Brocade & Chanderi Silk',
      girl: [
        { id: 'df_banarasi', name: 'Banarasi Silk Saree', main: '#be185d', accent: '#fbbf24', trim: '#fef08a', style: 'saree', jewel: 'temple', head: 'gajra', query: 'Banarasi Brocade Silk Saree', desc: 'Luminous Banarasi silk woven with intricate gold floral brocade.' },
        { id: 'df_lehenga', name: 'Chanderi Zari Lehenga', main: '#d97706', accent: '#991b1b', trim: '#fde047', style: 'lehenga', jewel: 'pearl', head: 'dupatta', query: 'Chanderi Silk Festive Lehenga', desc: 'Graceful Chanderi silk lehenga with sheer golden zari dupatta.' }
      ],
      boy: [
        { id: 'df_kurta', name: 'Brocade Nehru Kurta', main: '#4338ca', accent: '#fbbf24', trim: '#fef08a', style: 'kurta', jewel: 'minimal', head: 'safa', query: 'Mens Brocade Nehru Jacket Kurta', desc: 'Classic Indian festive silk kurta layered with a woven brocade jacket.' },
        { id: 'df_dhoti', name: 'Silk Kurta & Dhoti', main: '#fffbeb', accent: '#d97706', trim: '#991b1b', style: 'dhoti', jewel: 'minimal', head: 'none', query: 'Mens Silk Kurta Dhoti Set', desc: 'Traditional auspicious silk kurta and gold-bordered dhoti.' }
      ]
    }
  };

  function getGroupForFestival(fid, g) {
    if (fid === 'eid') return 'eid';
    if (fid === 'xmas') return 'xmas';
    const st = (g && g.state) || '';
    if (st === 'Karnataka') return 'karnataka';
    if (st === 'Tamil Nadu') return 'tamilnadu';
    if (st === 'Kerala') return 'kerala';
    if (st === 'Maharashtra' || st === 'Goa') return 'maharashtra';
    if (st === 'Gujarat' || st === 'Rajasthan') return 'gujarat';
    if (st === 'Punjab' || st === 'Haryana' || st === 'Himachal Pradesh') return 'punjab';
    if (st === 'West Bengal' || st === 'Odisha') return 'east';
    if (st === 'Assam' || st === 'Nagaland' || st === 'Meghalaya' || st === 'Mizoram' || st === 'Manipur') return 'northeast';
    return 'default';
  }

  function injectCSS() {
    if (document.getElementById('att-coco-css')) return;
    const s = document.createElement('style');
    s.id = 'att-coco-css';
    s.textContent = `
      @keyframes attBreathe { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
      @keyframes attTwirl { 0%{transform:rotateY(0deg) scale(1)} 50%{transform:rotateY(180deg) scale(1.06)} 100%{transform:rotateY(360deg) scale(1)} }
      @keyframes attWalk { 0%,100%{transform:translateX(0) rotate(0deg)} 25%{transform:translateX(-7px) rotate(-1.4deg)} 75%{transform:translateX(7px) rotate(1.4deg)} }
      @keyframes attCeleb { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-10px) scale(1.04)} }
      .att-shell { position:relative; border-radius:22px; overflow:hidden; border:2.5px solid #d97706; background:linear-gradient(135deg,#2a0814,#581c2b 45%,#7c2d12); box-shadow:0 16px 40px rgba(0,0,0,0.35); color:#fffbeb; }
      .att-bg-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:0.92; pointer-events:none; }
      .att-bg-scrim { position:absolute; inset:0; background:linear-gradient(90deg,rgba(24,5,12,0.52) 0%,rgba(24,5,12,0.12) 45%,rgba(24,5,12,0.62) 100%); pointer-events:none; }
      .att-layout { position:relative; z-index:2; display:grid; grid-template-columns:82px 1fr 310px; gap:12px; padding:16px; min-height:490px; align-items:stretch; }
      .att-rail { display:flex; flex-direction:column; gap:10px; justify-content:center; align-items:center; }
      .att-rail-btn { width:72px; height:72px; border-radius:18px; border:2px solid rgba(254,240,138,0.55); color:#ffffff; font-weight:800; font-size:0.72rem; cursor:pointer; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; box-shadow:0 6px 16px rgba(0,0,0,0.38); transition:transform .15s; }
      .att-rail-btn:hover { transform:scale(1.06); }
      .att-stage-col { position:relative; display:flex; flex-direction:column; justify-content:flex-end; align-items:center; min-height:390px; }
      .att-model-box { transition:transform .25s ease; transform-style:preserve-3d; cursor:grab; user-select:none; touch-action:none; }
      .att-model-box:active { cursor:grabbing; }
      .att-pose-breathe { animation:attBreathe 3.2s ease-in-out infinite; }
      .att-pose-twirl { animation:attTwirl .9s ease-in-out 2; }
      .att-pose-walk { animation:attWalk 1.35s ease-in-out infinite; }
      .att-pose-celeb { animation:attCeleb .7s ease-in-out 3; }
      .att-wardrobe-panel { background:linear-gradient(180deg,rgba(74,10,28,0.92),rgba(42,6,18,0.95)); border:2px solid #fbbf24; border-radius:20px; padding:14px; display:flex; flex-direction:column; gap:10px; box-shadow:0 12px 30px rgba(0,0,0,0.45); backdrop-filter:blur(8px); }
      .att-wgrid { display:grid; grid-template-columns:1fr 1fr; gap:9px; }
      .att-wcard { position:relative; background:rgba(255,251,235,0.1); border:1.5px solid rgba(251,191,36,0.45); border-radius:14px; padding:8px 6px; color:#fef3c7; cursor:pointer; text-align:center; transition:transform .14s, border-color .14s, background .14s; }
      .att-wcard:hover { transform:translateY(-2px); border-color:#fde047; }
      .att-wcard.on { background:rgba(251,191,36,0.24); border:2px solid #fde047; box-shadow:0 0 14px rgba(253,224,71,0.45); }
      .att-check { position:absolute; top:5px; right:5px; width:18px; height:18px; border-radius:50%; background:#fbbf24; color:#450a0a; font-size:0.7rem; font-weight:900; display:flex; align-items:center; justify-content:center; }
      .att-save-cta { width:100%; padding:11px 14px; border-radius:999px; border:2px solid #fef08a; background:linear-gradient(135deg,#fbbf24,#d97706); color:#450a0a; font-weight:900; font-size:0.9rem; cursor:pointer; box-shadow:0 6px 18px rgba(251,191,36,0.35); }
      .att-look-card { background:#fffbeb; color:#451a03; border:2px solid #d97706; border-radius:16px; padding:12px; box-shadow:0 8px 22px rgba(0,0,0,0.28); }
      @media(max-width:860px){
        .att-layout { grid-template-columns:1fr; padding:12px; }
        .att-rail { flex-direction:row; flex-wrap:wrap; order:2; }
        .att-rail-btn { width:62px; height:60px; font-size:0.68rem; }
        .att-stage-col { order:1; min-height:310px; }
        .att-wardrobe-panel { order:3; }
      }
    `;
    document.head.appendChild(s);
  }

  function miniThumbSvg(item) {
    return `<svg viewBox="0 0 64 72" width="60" height="68" style="display:block;margin:0 auto 4px;border-radius:10px;background:linear-gradient(180deg,#fef3c7,#fde68a);" aria-hidden="true">
      ${item.style === 'saree' || item.style === 'lehenga'
        ? `<path d="M18,12 L46,12 L52,66 L12,66 Z" fill="${item.main}" stroke="${item.accent}" stroke-width="2.2"/>
           <path d="M20,12 L47,64 L36,66 L16,20 Z" fill="${item.accent}" opacity="0.92"/>
           <line x1="13" y1="58" x2="51" y2="58" stroke="${item.trim}" stroke-width="4"/>
           <path d="M18,28 Q32,36 46,28" fill="none" stroke="#fbbf24" stroke-width="2.5"/>`
        : `<rect x="16" y="10" width="32" height="30" rx="6" fill="${item.main}" stroke="${item.accent}" stroke-width="2.2"/>
           <path d="M18,38 L46,38 L50,66 L14,66 Z" fill="#fffbeb" stroke="${item.accent}" stroke-width="2"/>
           <path d="M20,10 L27,10 L27,40 L20,40 Z" fill="${item.accent}" opacity="0.9"/>
           <line x1="16" y1="60" x2="48" y2="60" stroke="${item.accent}" stroke-width="3"/>`}
    </svg>`;
  }

  function buildFashionModelSVG(gender, item, pose) {
    const isGirl = gender === 'girl';
    const skin = isGirl ? '#e5aa7a' : '#d89866';
    const hair = '#181412';
    const poseNamaste = pose === 'namaste';

    const jewel = item.jewel === 'temple'
      ? `<path d="M97,114 Q120,140 143,114" fill="none" stroke="#fbbf24" stroke-width="4.5"/><circle cx="120" cy="131" r="4.5" fill="#dc2626" stroke="#fde047" stroke-width="1.6"/>
         <path d="M92,162 Q120,168 148,162" fill="none" stroke="#fbbf24" stroke-width="5.5"/><circle cx="120" cy="166" r="4" fill="#dc2626" stroke="#fef08a" stroke-width="1.2"/>`
      : (item.jewel === 'pearl'
        ? `<path d="M97,114 Q120,136 143,114" fill="none" stroke="#f8fafc" stroke-width="4" stroke-dasharray="1 5" stroke-linecap="round"/>`
        : '');

    const head = isGirl
      ? (item.head === 'gajra'
        ? `<circle cx="145" cy="76" r="10" fill="#fef9c3" stroke="#eab308" stroke-width="1.5"/><circle cx="148" cy="68" r="6" fill="#fffbeb"/>`
        : (item.head === 'dupatta' ? `<path d="M92,70 Q120,38 148,70 L158,124 L142,124 Q120,66 98,124 L82,124 Z" fill="${item.accent}" opacity="0.45"/>` : ''))
      : (item.head === 'peta' || item.head === 'safa'
        ? `<path d="M88,58 Q120,24 154,58 L148,70 Q120,56 92,70 Z" fill="${item.head === 'safa' ? '#dc2626' : item.accent}" stroke="#fde047" stroke-width="2.2"/><circle cx="120" cy="48" r="5" fill="#fef08a"/>`
        : '');

    const dress = isGirl
      ? (item.style === 'lehenga'
        ? `<path d="M96,118 L144,118 L142,162 L98,162 Z" fill="${item.main}" stroke="${item.accent}" stroke-width="2.2"/>
           <path d="M96,162 L144,162 L186,274 L54,274 Z" fill="${item.main}" stroke="${item.accent}" stroke-width="2.8"/>
           <path d="M98,120 L164,258 L144,264 L88,130 Z" fill="${item.accent}" opacity="0.88"/>
           <line x1="58" y1="260" x2="182" y2="260" stroke="${item.trim}" stroke-width="5.5"/>`
        : `<path d="M90,118 L150,118 L174,274 L66,274 Z" fill="${item.main}" stroke="${item.accent}" stroke-width="2.8"/>
           <path d="M92,118 L160,268 L134,274 L82,132 Z" fill="${item.accent}" opacity="0.92"/>
           <line x1="68" y1="258" x2="172" y2="258" stroke="${item.trim}" stroke-width="5.5"/>
           <line x1="70" y1="266" x2="170" y2="266" stroke="${item.accent}" stroke-width="2.5"/>`)
      : (item.style === 'dhoti'
        ? `<rect x="86" y="118" width="68" height="96" rx="12" fill="${item.main}" stroke="${item.accent}" stroke-width="2.4"/>
           <path d="M88,208 L152,208 L162,274 L78,274 Z" fill="#fffbeb" stroke="${item.accent}" stroke-width="2.4"/>
           <line x1="80" y1="260" x2="160" y2="260" stroke="${item.accent}" stroke-width="4.5"/>
           <path d="M94,118 L108,118 L108,212 L94,212 Z" fill="${item.accent}" opacity="0.92"/>`
        : `<rect x="84" y="118" width="72" height="114" rx="14" fill="${item.main}" stroke="${item.accent}" stroke-width="2.6"/>
           <rect x="92" y="226" width="24" height="48" rx="6" fill="#fffbeb" stroke="${item.accent}" stroke-width="1.8"/>
           <rect x="124" y="226" width="24" height="48" rx="6" fill="#fffbeb" stroke="${item.accent}" stroke-width="1.8"/>
           <line x1="120" y1="120" x2="120" y2="174" stroke="${item.trim}" stroke-width="3"/>`);

    const arms = poseNamaste
      ? `<path d="M88,134 Q96,170 117,152" fill="none" stroke="${skin}" stroke-width="10" stroke-linecap="round"/>
         <path d="M152,134 Q144,170 123,152" fill="none" stroke="${skin}" stroke-width="10" stroke-linecap="round"/>
         <text x="120" y="150" font-size="22" text-anchor="middle" dominant-baseline="central">🙏</text>`
      : `<line x1="88" y1="134" x2="64" y2="188" stroke="${skin}" stroke-width="10" stroke-linecap="round"/>
         <line x1="152" y1="134" x2="176" y2="188" stroke="${skin}" stroke-width="10" stroke-linecap="round"/>`;

    return `
      <svg id="att-svg-${gender}" viewBox="0 0 240 296" width="205" height="252" style="max-width:100%;height:auto;display:block;margin:0 auto;filter:drop-shadow(0 12px 18px rgba(0,0,0,0.48));">
        <ellipse cx="120" cy="280" rx="54" ry="9" fill="rgba(0,0,0,0.38)"/>
        ${isGirl ? `<path d="M86,74 C82,116 88,150 96,162 L144,162 C152,150 158,116 154,74 Z" fill="${hair}"/>` : ''}
        ${dress}
        ${arms}
        <rect x="111" y="98" width="18" height="22" rx="6" fill="${skin}"/>
        <circle cx="120" cy="74" r="24" fill="${skin}" stroke="#b45309" stroke-width="0.9"/>
        <path d="M95,70 C97,46 143,46 145,70 C134,58 106,58 95,70 Z" fill="${hair}"/>
        ${head}
        <circle cx="110" cy="73" r="2.7" fill="#111827"/>
        <circle cx="130" cy="73" r="2.7" fill="#111827"/>
        ${isGirl ? `<circle cx="120" cy="65" r="2.8" fill="#dc2626"/>` : `<path d="M108,84 Q120,79 132,84" stroke="#1f2937" stroke-width="2.6" fill="none" stroke-linecap="round"/>`}
        <path d="M113,90 Q120,96 127,90" stroke="#7f1d1d" stroke-width="2.4" fill="none" stroke-linecap="round"/>
        ${jewel}
      </svg>
    `;
  }

  window.renderFestivalAttire = function () {
    injectCSS();
    const fid = window.cur || 'ganesh';
    const g = (window.G$ && window.G$[fid]) || (window.FEST && window.FEST.find(x => x.id === fid)) || { name: 'Festival', state: 'India', e: '🪔' };
    const grpKey = getGroupForFestival(fid, g);
    const grp = WARDROBE_BY_GROUP[grpKey] || WARDROBE_BY_GROUP.default;

    window.S = window.S || {};
    window.S.attire = window.S.attire || {};

    const st = window._attCoco = (window._attCoco && window._attCoco.fid === fid) ? window._attCoco : {
      fid,
      mode: 'both',
      girlItem: grp.girl[0],
      boyItem: grp.boy[0],
      pose: 'breathe',
      scale: 1,
      offX: 0,
      offY: 0,
      saved: false
    };

    const allCards = grp.girl.slice(0, 3).map(x => Object.assign({ who: 'girl' }, x))
      .concat(grp.boy.slice(0, 2).map(x => Object.assign({ who: 'boy' }, x))).slice(0, 4);

    function renderStage() {
      const stage = document.getElementById('att-runway-stage');
      if (!stage) return;
      const poseCls = st.pose === 'twirl' ? 'att-pose-twirl' : (st.pose === 'walk' ? 'att-pose-walk' : (st.pose === 'celeb' ? 'att-pose-celeb' : 'att-pose-breathe'));
      let modelsHtml = '';
      if (st.mode === 'girl' || st.mode === 'both') {
        modelsHtml += `<div class="${poseCls}" style="flex:0 1 190px;">${buildFashionModelSVG('girl', st.girlItem, st.pose)}</div>`;
      }
      if (st.mode === 'boy' || st.mode === 'both') {
        modelsHtml += `<div class="${poseCls}" style="flex:0 1 190px;">${buildFashionModelSVG('boy', st.boyItem, st.pose)}</div>`;
      }
      stage.innerHTML = `<div id="att-drag-grp" class="att-model-box" style="display:flex;justify-content:center;align-items:flex-end;gap:2px;transform:translate(${st.offX}px,${st.offY}px) scale(${st.scale});">${modelsHtml}</div>`;
      attachDrag();
    }

    function attachDrag() {
      const el = document.getElementById('att-drag-grp');
      if (!el) return;
      let sx = 0, sy = 0, ox = st.offX, oy = st.offY, down = false;
      el.addEventListener('pointerdown', (e) => { down = true; sx = e.clientX; sy = e.clientY; ox = st.offX; oy = st.offY; });
      window.addEventListener('pointermove', (e) => {
        if (!down) return;
        st.offX = Math.max(-75, Math.min(75, ox + (e.clientX - sx)));
        st.offY = Math.max(-35, Math.min(35, oy + (e.clientY - sy)));
        el.style.transform = `translate(${st.offX}px,${st.offY}px) scale(${st.scale})`;
      });
      window.addEventListener('pointerup', () => { down = false; });
    }

    function renderWardrobeAndLook() {
      const grid = document.getElementById('att-wgrid');
      if (grid) {
        grid.innerHTML = allCards.map(it => {
          const isOn = (it.who === 'girl' && st.girlItem.id === it.id) || (it.who === 'boy' && st.boyItem.id === it.id);
          return `<button type="button" class="att-wcard ${isOn ? 'on' : ''}" onclick="window._coco.pick('${it.who}','${it.id}')">
            ${isOn ? '<span class="att-check">✓</span>' : ''}
            ${miniThumbSvg(it)}
            <div style="font-weight:800;font-size:0.78rem;line-height:1.2;">${it.name}</div>
          </button>`;
        }).join('');
      }

      const lookEl = document.getElementById('att-look-summary');
      if (lookEl) {
        const gQ = encodeURIComponent(st.girlItem.query);
        const bQ = encodeURIComponent(st.boyItem.query);
        const mainItem = st.mode === 'boy' ? st.boyItem : st.girlItem;
        const q = encodeURIComponent(mainItem.query);
        lookEl.innerHTML = `
          <div style="display:flex;gap:10px;align-items:center;">
            ${miniThumbSvg(mainItem)}
            <div style="flex:1;">
              <div style="font-weight:900;font-size:0.88rem;color:#7c2d12;">Traditional Elegance for ${g.name}</div>
              <div style="font-size:0.75rem;color:#451a03;margin-top:2px;">${st.girlItem.name} &amp; ${st.boyItem.name}</div>
            </div>
          </div>
          <div style="margin-top:8px;padding-top:8px;border-top:1px solid #f59e0b;">
            <div style="font-size:0.72rem;font-weight:800;color:#92400e;margin-bottom:5px;">Shop This Attire Online:</div>
            <div style="display:flex;gap:5px;flex-wrap:wrap;">
              <a href="https://www.amazon.in/s?k=${q}" target="_blank" rel="noopener" style="background:#ffffff;color:#1c1917;border:1px solid #d97706;text-decoration:none;padding:4px 9px;border-radius:999px;font-size:0.72rem;font-weight:800;">🛒 Amazon</a>
              <a href="https://www.myntra.com/${encodeURIComponent(mainItem.query.toLowerCase().replace(/\s+/g, '-'))}" target="_blank" rel="noopener" style="background:#ffffff;color:#db2777;border:1px solid #db2777;text-decoration:none;padding:4px 9px;border-radius:999px;font-size:0.72rem;font-weight:800;">👗 Myntra</a>
              <a href="https://www.ajio.com/search/?text=${q}" target="_blank" rel="noopener" style="background:#ffffff;color:#1e293b;border:1px solid #64748b;text-decoration:none;padding:4px 9px;border-radius:999px;font-size:0.72rem;font-weight:800;">✨ Ajio</a>
              <a href="https://www.craftsvilla.com/catalogsearch/result/?q=${q}" target="_blank" rel="noopener" style="background:#ffffff;color:#991b1b;border:1px solid #991b1b;text-decoration:none;padding:4px 9px;border-radius:999px;font-size:0.72rem;font-weight:800;">🪷 Craftsvilla</a>
            </div>
          </div>
        `;
      }
    }

    window._coco = {
      setMode: (m) => { st.mode = m; renderStage(); renderWardrobeAndLook(); },
      pick: (who, id) => {
        const list = who === 'boy' ? grp.boy : grp.girl;
        const found = list.find(x => x.id === id);
        if (!found) return;
        if (who === 'boy') st.boyItem = found; else st.girlItem = found;
        st.pose = 'twirl';
        renderStage();
        renderWardrobeAndLook();
      },
      setPose: (p) => { st.pose = p; renderStage(); },
      cycleZoom: () => { st.scale = st.scale >= 1.15 ? 0.9 : +(st.scale + 0.12).toFixed(2); renderStage(); },
      resetPos: () => { st.scale = 1; st.offX = 0; st.offY = 0; st.pose = 'breathe'; renderStage(); },
      saveLook: () => {
        st.saved = true;
        st.pose = 'celeb';
        renderStage();
        if (!window.S.attire[fid]) {
          window.S.attire[fid] = true;
          if (typeof window.addCoins === 'function') window.addCoins(25, g.name + ' Attire Styled');
          if (typeof window.saveProgress === 'function') window.saveProgress();
        } else if (typeof window.toast === 'function') {
          window.toast('✨ Look saved for ' + g.name + '! Tap any store below to shop.');
        }
      }
    };

    setTimeout(() => { renderStage(); renderWardrobeAndLook(); }, 15);

    return `
      <div style="max-width:980px;margin:0 auto;padding-bottom:24px;">
        <div class="att-shell">
          <img class="att-bg-img" src="photos/attire_temple_bg.jpg?v=1" alt="" onerror="this.style.display='none'">
          <div class="att-bg-scrim"></div>
          <div class="att-layout">
            <div class="att-rail">
              <button type="button" class="att-rail-btn" onclick="window._coco.setPose('twirl')" style="background:linear-gradient(180deg,#db2777,#9d174d);">
                <span style="font-size:1.35rem;">💃</span><span>Twirl</span>
              </button>
              <button type="button" class="att-rail-btn" onclick="window._coco.setPose('namaste')" style="background:linear-gradient(180deg,#7c3aed,#4c1d95);">
                <span style="font-size:1.35rem;">🙏</span><span>Namaste</span>
              </button>
              <button type="button" class="att-rail-btn" onclick="window._coco.setPose('celeb')" style="background:linear-gradient(180deg,#f59e0b,#b45309);">
                <span style="font-size:1.35rem;">🎉</span><span>Celebration</span>
              </button>
              <button type="button" class="att-rail-btn" onclick="window._coco.cycleZoom()" style="background:rgba(24,24,27,0.78);">
                <span style="font-size:1.25rem;">🔍</span><span>Zoom</span>
              </button>
              <button type="button" class="att-rail-btn" onclick="window._coco.resetPos()" style="background:rgba(24,24,27,0.78);">
                <span style="font-size:1.25rem;">✥</span><span>Move / Reset</span>
              </button>
            </div>

            <div class="att-stage-col">
              <div style="position:absolute;top:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
                <div style="background:rgba(24,5,12,0.7);border:1px solid rgba(251,191,36,0.5);border-radius:999px;padding:4px 12px;font-size:0.78rem;font-weight:800;color:#fde68a;">🪷 ${g.name} · Dress · Play · Celebrate</div>
                <div style="display:flex;gap:4px;">
                  <button type="button" onclick="window._coco.setMode('both')" style="background:rgba(255,255,255,0.9);color:#450a0a;border:none;border-radius:999px;padding:4px 9px;font-size:0.72rem;font-weight:800;cursor:pointer;">👫 Both</button>
                  <button type="button" onclick="window._coco.setMode('girl')" style="background:rgba(255,255,255,0.9);color:#450a0a;border:none;border-radius:999px;padding:4px 9px;font-size:0.72rem;font-weight:800;cursor:pointer;">👩 Girl</button>
                  <button type="button" onclick="window._coco.setMode('boy')" style="background:rgba(255,255,255,0.9);color:#450a0a;border:none;border-radius:999px;padding:4px 9px;font-size:0.72rem;font-weight:800;cursor:pointer;">👨 Boy</button>
                </div>
              </div>
              <div id="att-runway-stage" style="width:100%;display:flex;align-items:flex-end;justify-content:center;padding-top:34px;"></div>
            </div>

            <div class="att-wardrobe-panel">
              <div style="text-align:center;border-bottom:1px solid rgba(251,191,36,0.35);padding-bottom:6px;">
                <div style="font-weight:900;font-size:1rem;color:#fde047;">🪷 Festival Wardrobe</div>
                <div style="font-size:0.78rem;color:#fef3c7;">${g.name}</div>
              </div>
              <div id="att-wgrid" class="att-wgrid"></div>
              <button type="button" class="att-save-cta" onclick="window._coco.saveLook()">✨ Complete &amp; Save Look</button>
              <div id="att-look-summary" class="att-look-card"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  };
})();
