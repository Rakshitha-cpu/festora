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

  function getModelPhoto(gender, item) {
    if (gender === 'boy') {
      return (item.style === 'dhoti') ? 'photos/attire_boy_panche.jpg?v=1' : 'photos/attire_boy_kurta.jpg?v=1';
    }
    return (item.style === 'lehenga') ? 'photos/attire_girl_lehenga.jpg?v=1' : 'photos/attire_girl_saree.jpg?v=1';
  }

  function miniThumbSvg(item) {
    const who = (item.style === 'dhoti' || item.style === 'kurta') ? 'boy' : 'girl';
    const src = getModelPhoto(who, item);
    return `<div style="width:64px;height:78px;margin:0 auto 5px;border-radius:10px;overflow:hidden;border:1.5px solid #fbbf24;background:#2a0814;">
      <img src="${src}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;object-position:top center;">
    </div>`;
  }

  function buildFashionModelSVG(gender, item, pose) {
    const src = getModelPhoto(gender, item);
    const badge = pose === 'namaste'
      ? '<div style="position:absolute;bottom:22px;left:50%;transform:translateX(-50%);background:rgba(255,251,235,0.94);color:#92400e;border:1.5px solid #fbbf24;border-radius:999px;padding:3px 12px;font-size:0.8rem;font-weight:800;white-space:nowrap;box-shadow:0 4px 12px rgba(0,0,0,0.35);">🙏 Namaste</div>'
      : (pose === 'celeb'
        ? '<div style="position:absolute;top:12px;left:50%;transform:translateX(-50%);font-size:1.35rem;pointer-events:none;">✨🌸✨</div>'
        : '');
    return `
      <div style="position:relative;width:210px;height:390px;margin:0 auto;overflow:hidden;border-radius:24px;-webkit-mask-image:radial-gradient(ellipse 88% 92% at 50% 48%,#000 68%,transparent 100%);mask-image:radial-gradient(ellipse 88% 92% at 50% 48%,#000 68%,transparent 100%);">
        <img src="${src}" alt="${item.name}" draggable="false" style="width:100%;height:100%;object-fit:cover;object-position:top center;pointer-events:none;">
        ${badge}
      </div>
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
        modelsHtml += `<div class="${poseCls}" style="flex:0 1 205px;">${buildFashionModelSVG('girl', st.girlItem, st.pose)}</div>`;
      }
      if (st.mode === 'boy' || st.mode === 'both') {
        modelsHtml += `<div class="${poseCls}" style="flex:0 1 205px;">${buildFashionModelSVG('boy', st.boyItem, st.pose)}</div>`;
      }
      stage.innerHTML = `<div id="att-drag-grp" class="att-model-box" style="display:flex;justify-content:center;align-items:flex-end;gap:0px;transform:translate(${st.offX}px,${st.offY}px) scale(${st.scale});">${modelsHtml}</div>`;
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
            <div style="display:flex;gap:4px;flex-wrap:nowrap;">
              <a href="https://www.amazon.in/s?k=${q}" target="_blank" rel="noopener" style="background:#ffffff;color:#1c1917;border:1px solid #d97706;text-decoration:none;padding:4px 7px;border-radius:999px;font-size:0.68rem;font-weight:800;white-space:nowrap;">🛒 Amazon</a>
              <a href="https://www.myntra.com/${encodeURIComponent(mainItem.query.toLowerCase().replace(/\s+/g, '-'))}" target="_blank" rel="noopener" style="background:#ffffff;color:#db2777;border:1px solid #db2777;text-decoration:none;padding:4px 7px;border-radius:999px;font-size:0.68rem;font-weight:800;white-space:nowrap;">👗 Myntra</a>
              <a href="https://www.ajio.com/search/?text=${q}" target="_blank" rel="noopener" style="background:#ffffff;color:#1e293b;border:1px solid #64748b;text-decoration:none;padding:4px 7px;border-radius:999px;font-size:0.68rem;font-weight:800;white-space:nowrap;">✨ Ajio</a>
              <a href="https://www.craftsvilla.com/catalogsearch/result/?q=${q}" target="_blank" rel="noopener" style="background:#ffffff;color:#991b1b;border:1px solid #991b1b;text-decoration:none;padding:4px 7px;border-radius:999px;font-size:0.68rem;font-weight:800;white-space:nowrap;">🪷 Craftsvilla</a>
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
              <div id="att-runway-stage" style="width:100%;display:flex;align-items:flex-end;justify-content:center;"></div>
            </div>

            <div class="att-wardrobe-panel">
              <div style="text-align:center;border-bottom:1px solid rgba(251,191,36,0.35);padding-bottom:8px;">
                <div style="font-weight:900;font-size:1rem;color:#fde047;">🪷 Festival Wardrobe</div>
                <div style="font-size:0.78rem;color:#fef3c7;margin-bottom:6px;">${g.name}</div>
                <div style="display:flex;gap:4px;justify-content:center;">
                  <button type="button" onclick="window._coco.setMode('both')" style="background:rgba(255,255,255,0.92);color:#450a0a;border:none;border-radius:999px;padding:3px 10px;font-size:0.72rem;font-weight:800;cursor:pointer;">👫 Both</button>
                  <button type="button" onclick="window._coco.setMode('girl')" style="background:rgba(255,255,255,0.92);color:#450a0a;border:none;border-radius:999px;padding:3px 10px;font-size:0.72rem;font-weight:800;cursor:pointer;">👩 Girl</button>
                  <button type="button" onclick="window._coco.setMode('boy')" style="background:rgba(255,255,255,0.92);color:#450a0a;border:none;border-radius:999px;padding:3px 10px;font-size:0.72rem;font-weight:800;cursor:pointer;">👨 Boy</button>
                </div>
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
