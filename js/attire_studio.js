/* ===== FESTORA – COCO-STYLE FESTIVE ATTIRE STUDIO & SHOPPING LOOKBOOK (All 66 Festivals) ===== */
(function () {
  'use strict';

  const WARDROBE_BY_GROUP = {
    karnataka: {
      handloom: 'Mysore Silk & Ilkal Handloom (GI Tagged)',
      girl: [
        { id: 'ka_mysore', name: 'Mysore Silk Zari Saree', main: '#be185d', accent: '#fbbf24', trim: '#fef08a', style: 'saree', jewel: 'temple', head: 'gajra', query: 'Mysore Silk Saree pure zari', desc: 'Pure mulberry silk woven in Mysuru with gleaming gold kasuti/zari borders.' },
        { id: 'ka_ilkal', name: 'Ilkal Kasuti Silk Saree', main: '#047857', accent: '#dc2626', trim: '#fde047', style: 'saree', jewel: 'temple', head: 'gajra', query: 'Ilkal Silk Saree Karnataka', desc: 'Traditional North Karnataka handloom featuring distinctive red temple borders.' },
        { id: 'ka_langavoni', name: 'Pattu Langa Voni', main: '#7c2d12', accent: '#f59e0b', trim: '#fef08a', style: 'lehenga', jewel: 'pearl', head: 'gajra', query: 'Silk Langa Voni Half Saree', desc: 'Classic South Indian festive half-saree with contrasting zari dupatta.' }
      ],
      boy: [
        { id: 'ka_panche', name: 'Silk Panche & Angavastram', main: '#fffbeb', accent: '#d97706', trim: '#991b1b', style: 'dhoti', jewel: 'temple', head: 'peta', query: 'Karnataka Silk Panche Angavastram', desc: 'Auspicious ivory silk kurta and zari-bordered panche paired with Mysore Peta.' },
        { id: 'ka_peta', name: 'Royal Kurta & Mysore Peta', main: '#991b1b', accent: '#fbbf24', trim: '#fef08a', style: 'kurta', jewel: 'minimal', head: 'peta', query: 'Mysore Peta Silk Kurta Men', desc: 'Inspired by Mysuru and Vijayanagara royal courts with golden brocade.' }
      ]
    },
    tamilnadu: {
      handloom: 'Kanchipuram Korvai & Madurai Sungudi',
      girl: [
        { id: 'tn_kanchi', name: 'Kanjeevaram Korvai Silk', main: '#b91c1c', accent: '#fbbf24', trim: '#fef08a', style: 'saree', jewel: 'temple', head: 'gajra', query: 'Kanjeevaram Pure Silk Saree', desc: 'Iconic Tamil temple-border silk saree woven with rich gold zari.' },
        { id: 'tn_sungudi', name: 'Madurai Sungudi Saree', main: '#4338ca', accent: '#f59e0b', trim: '#fde047', style: 'saree', jewel: 'pearl', head: 'gajra', query: 'Madurai Sungudi Cotton Saree', desc: 'Lightweight dotted tie-dye cotton saree ideal for daytime harvest rituals.' },
        { id: 'tn_pavadai', name: 'Pattu Pavadai Sattai', main: '#0f766e', accent: '#fbbf24', trim: '#fef08a', style: 'lehenga', jewel: 'temple', head: 'gajra', query: 'Pattu Pavadai Silk Set', desc: 'Vibrant silk skirt and blouse set worn for Pongal and Deepam.' }
      ],
      boy: [
        { id: 'tn_veshti', name: 'Kanchi Silk Veshti & Shirt', main: '#fef3c7', accent: '#b45309', trim: '#f59e0b', style: 'dhoti', jewel: 'minimal', head: 'none', query: 'Tamil Silk Veshti Angavastram', desc: 'Crisp gold-bordered silk veshti paired with matching silk shirt.' },
        { id: 'tn_temple', name: 'Temple Zari Kurta Set', main: '#d97706', accent: '#7c2d12', trim: '#fef08a', style: 'kurta', jewel: 'temple', head: 'none', query: 'Mens Silk Kurta Dhoti Set', desc: 'Rich saffron silk kurta worn during temple processions.' }
      ]
    },
    kerala: {
      handloom: 'Balaramapuram & Chendamangalam Kasavu',
      girl: [
        { id: 'kl_kasavu', name: 'Kasavu Settu Mundu', main: '#fffbeb', accent: '#d97706', trim: '#f59e0b', style: 'saree', jewel: 'temple', head: 'gajra', query: 'Kerala Kasavu Saree Settu Mundu', desc: 'Handwoven ivory cotton bordered with gleaming golden kasavu zari.' },
        { id: 'kl_tissue', name: 'Golden Tissue Kasavu Saree', main: '#fef3c7', accent: '#b45309', trim: '#fde047', style: 'saree', jewel: 'pearl', head: 'gajra', query: 'Kerala Golden Tissue Kasavu Saree', desc: 'Luminous gold-tissue weave worn for Onam Sadya and Vishu.' }
      ],
      boy: [
        { id: 'kl_mundu', name: 'Kasavu Mundu & Ivory Juba', main: '#fffbeb', accent: '#d97706', trim: '#b45309', style: 'dhoti', jewel: 'minimal', head: 'none', query: 'Kerala Kasavu Mundu Juba Men', desc: 'Classic Kerala festive mundu paired with crisp ivory cotton-silk juba.' },
        { id: 'kl_gold', name: 'Gold-Bordered Kurta & Mundu', main: '#fef3c7', accent: '#92400e', trim: '#fbbf24', style: 'kurta', jewel: 'minimal', head: 'none', query: 'Kerala Silk Kurta Mundu', desc: 'Festive golden-weave kurta for temple celebrations and Thrissur Pooram.' }
      ]
    },
    maharashtra: {
      handloom: 'Yeola Paithani & Kolhapuri Pheta',
      girl: [
        { id: 'mh_paithani', name: 'Yeola Paithani Nauvari', main: '#6d28d9', accent: '#fbbf24', trim: '#fde047', style: 'saree', jewel: 'temple', head: 'gajra', query: 'Paithani Silk Saree Maharashtra', desc: 'Royal purple Paithani silk with oblique square zari borders and peacock motifs.' },
        { id: 'mh_peshwai', name: 'Crimson Peshwai Saree', main: '#be123c', accent: '#fbbf24', trim: '#fef08a', style: 'saree', jewel: 'pearl', head: 'gajra', query: 'Nauvari Silk Saree Marathi', desc: 'Traditional nine-yard festive drape paired with Nath and pearl jewelry.' }
      ],
      boy: [
        { id: 'mh_pheta', name: 'Kurta, Dhoti & Saffron Pheta', main: '#fffbeb', accent: '#ea580c', trim: '#fbbf24', style: 'dhoti', jewel: 'minimal', head: 'peta', query: 'Marathi Kurta Dhoti Saffron Pheta', desc: 'Traditional Marathi festive kurta-dhoti crowned with a saffron pheta turban.' },
        { id: 'mh_bandi', name: 'Brocade Bandi & Kurta', main: '#b45309', accent: '#fef08a', trim: '#fbbf24', style: 'kurta', jewel: 'minimal', head: 'peta', query: 'Mens Brocade Nehru Jacket Kurta', desc: 'Tailored festive bandi jacket over crisp silk kurta.' }
      ]
    },
    gujarat: {
      handloom: 'Jamnagar Bandhani & Patan Patola',
      girl: [
        { id: 'gj_chaniya', name: 'Mirror-Work Chaniya Choli', main: '#db2777', accent: '#fbbf24', trim: '#38bdf8', style: 'lehenga', jewel: 'pearl', head: 'gajra', query: 'Navratri Mirror Work Chaniya Choli', desc: 'Flared Kutchi mirror-work lehenga choli made for Garba twirls.' },
        { id: 'gj_patola', name: 'Bandhani Patola Saree', main: '#b91c1c', accent: '#fde047', trim: '#fbbf24', style: 'saree', jewel: 'temple', head: 'gajra', query: 'Gujarati Bandhani Patola Saree', desc: 'Vibrant tie-dye Bandhani silk with traditional Gujarati seed-pearl drape.' }
      ],
      boy: [
        { id: 'gj_kediyu', name: 'Embroidered Kediyu & Dhoti', main: '#4338ca', accent: '#fbbf24', trim: '#f43f5e', style: 'kurta', jewel: 'minimal', head: 'safa', query: 'Mens Navratri Kediyu Dhoti', desc: 'Flared mirror-embroidered Kutchi kediyu jacket with colorful turban.' },
        { id: 'gj_bandhani', name: 'Bandhani Kurta & Jacket', main: '#d97706', accent: '#991b1b', trim: '#fde047', style: 'kurta', jewel: 'minimal', head: 'safa', query: 'Mens Bandhani Kurta Jacket', desc: 'Festive tie-dye Bandhani kurta ideal for Uttarayan & Navratri.' }
      ]
    },
    punjab: {
      handloom: 'Patiala Phulkari & Gotapatti',
      girl: [
        { id: 'pb_phulkari', name: 'Phulkari Patiala Suit', main: '#e11d48', accent: '#fbbf24', trim: '#fde047', style: 'lehenga', jewel: 'pearl', head: 'dupatta', query: 'Phulkari Patiala Salwar Suit', desc: 'Bright festive kurta-salwar paired with hand-embroidered floral Phulkari dupatta.' },
        { id: 'pb_sharara', name: 'Mustard Gotapatti Sharara', main: '#d97706', accent: '#b91c1c', trim: '#fef08a', style: 'lehenga', jewel: 'temple', head: 'dupatta', query: 'Punjabi Mustard Sharara Suit', desc: 'Golden mustard Basant/Lohri ensemble with shimmering gota-patti borders.' }
      ],
      boy: [
        { id: 'pb_turban', name: 'Kurta, Phulkari Jacket & Turban', main: '#1d4ed8', accent: '#fbbf24', trim: '#fef08a', style: 'kurta', jewel: 'minimal', head: 'safa', query: 'Mens Punjabi Kurta Jacket Turban', desc: 'Crisp Punjabi kurta-pajama layered with embroidered jacket and turban.' },
        { id: 'pb_lohri', name: 'Saffron Festive Kurta Set', main: '#b45309', accent: '#fde047', trim: '#fbbf24', style: 'kurta', jewel: 'minimal', head: 'safa', query: 'Mens Festive Silk Kurta Pajama', desc: 'Warm harvest-hued silk kurta for Baisakhi and Lohri bonfires.' }
      ]
    },
    east: {
      handloom: 'Fulia Tant, Baluchari & Sambalpuri Ikat',
      girl: [
        { id: 'ea_lalpaar', name: 'Lal-Paar Tant / Garad Saree', main: '#fffbeb', accent: '#dc2626', trim: '#fbbf24', style: 'saree', jewel: 'temple', head: 'gajra', query: 'Bengali Lal Paar Garad Saree', desc: 'Iconic ivory silk/cotton saree with bold auspicious crimson borders.' },
        { id: 'ea_sambalpuri', name: 'Sambalpuri Ikat Silk', main: '#0f766e', accent: '#fbbf24', trim: '#dc2626', style: 'saree', jewel: 'pearl', head: 'gajra', query: 'Sambalpuri Ikat Silk Saree', desc: 'Handwoven Odisha Ikat featuring traditional conch and temple motifs.' }
      ],
      boy: [
        { id: 'ea_panjabi', name: 'Tussar Silk Panjabi & Dhuti', main: '#fef3c7', accent: '#b91c1c', trim: '#d97706', style: 'dhoti', jewel: 'minimal', head: 'none', query: 'Bengali Tussar Silk Panjabi Dhoti', desc: 'Golden tussar silk Panjabi kurta paired with pleated festive dhuti.' },
        { id: 'ea_ikat', name: 'Sambalpuri Kurta & Uttariya', main: '#7c2d12', accent: '#fbbf24', trim: '#fef08a', style: 'kurta', jewel: 'minimal', head: 'none', query: 'Sambalpuri Silk Kurta Men', desc: 'Handloom Ikat-bordered kurta worn during Rath Yatra and Nuakhai.' }
      ]
    },
    northeast: {
      handloom: 'Sualkuchi Golden Muga Silk & Gamocha',
      girl: [
        { id: 'ne_mekhela', name: 'Muga Silk Mekhela Chador', main: '#d97706', accent: '#dc2626', trim: '#fef08a', style: 'saree', jewel: 'temple', head: 'gajra', query: 'Assam Muga Silk Mekhela Chador', desc: 'Naturally golden Assamese Muga silk two-piece drape with crimson motifs.' },
        { id: 'ne_puan', name: 'Handwoven Tribal Festive Wrap', main: '#047857', accent: '#f43f5e', trim: '#fde047', style: 'lehenga', jewel: 'pearl', head: 'gajra', query: 'Northeast Indian Handloom Mekhela', desc: 'Intricate geometric handloom wrap celebrating harvest and folk dance.' }
      ],
      boy: [
        { id: 'ne_gamocha', name: 'Assam Silk Kurta & Gamocha', main: '#fffbeb', accent: '#dc2626', trim: '#d97706', style: 'dhoti', jewel: 'minimal', head: 'none', query: 'Assam Kurta Dhoti Gamocha', desc: 'Ivory silk kurta-dhoti draped with the iconic red-and-white handwoven Gamocha.' }
      ]
    },
    eid: {
      handloom: 'Lucknowi Chikankari & Banarasi Brocade',
      girl: [
        { id: 'eid_anarkali', name: 'Chikankari Zari Anarkali', main: '#047857', accent: '#fbbf24', trim: '#fef08a', style: 'lehenga', jewel: 'pearl', head: 'dupatta', query: 'Chikankari Anarkali Suit Eid', desc: 'Flowing emerald Chikankari gown with delicate gold zari border and jhumkas.' },
        { id: 'eid_sharara', name: 'Ivory & Gold Zari Sharara', main: '#fffbeb', accent: '#d97706', trim: '#fbbf24', style: 'lehenga', jewel: 'pearl', head: 'dupatta', query: 'Ivory Gold Zari Sharara Eid', desc: 'Elegant hand-embroidered festive sharara paired with pearl chandbalis.' }
      ],
      boy: [
        { id: 'eid_sherwani', name: 'Embroidered Eid Sherwani', main: '#1e3a8a', accent: '#fbbf24', trim: '#fef08a', style: 'kurta', jewel: 'minimal', head: 'none', query: 'Mens Embroidered Eid Sherwani', desc: 'Tailored royal indigo sherwani with golden collar embroidery.' },
        { id: 'eid_chikan', name: 'Lucknowi Chikankari Kurta', main: '#fffbeb', accent: '#d97706', trim: '#fbbf24', style: 'kurta', jewel: 'minimal', head: 'none', query: 'Mens Lucknowi Chikankari Kurta', desc: 'Classic white hand-embroidered Chikankari kurta for Eid prayers.' }
      ]
    },
    xmas: {
      handloom: 'Winter Velvet & Handwoven Shawl',
      girl: [
        { id: 'xm_gown', name: 'Crimson Velvet Festive Gown', main: '#b91c1c', accent: '#fbbf24', trim: '#fef08a', style: 'lehenga', jewel: 'pearl', head: 'none', query: 'Crimson Velvet Party Gown', desc: 'Warm crimson velvet festive dress accented with pearl jewelry.' },
        { id: 'xm_emerald', name: 'Emerald Silk Winter Dress', main: '#065f46', accent: '#fde047', trim: '#fbbf24', style: 'saree', jewel: 'pearl', head: 'none', query: 'Emerald Green Silk Festive Saree', desc: 'Rich evergreen silk outfit paired with gold winter accessories.' }
      ],
      boy: [
        { id: 'xm_blazer', name: 'Tailored Festive Velvet Blazer', main: '#7f1d1d', accent: '#fbbf24', trim: '#fffbeb', style: 'kurta', jewel: 'minimal', head: 'none', query: 'Mens Maroon Velvet Festive Blazer', desc: 'Sharp winter blazer and crisp shirt for Christmas Eve celebrations.' }
      ]
    },
    default: {
      handloom: 'Banarasi Brocade & Chanderi Silk',
      girl: [
        { id: 'df_banarasi', name: 'Banarasi Brocade Silk Saree', main: '#be185d', accent: '#fbbf24', trim: '#fef08a', style: 'saree', jewel: 'temple', head: 'gajra', query: 'Banarasi Brocade Silk Saree', desc: 'Luminous Banarasi silk woven with intricate gold floral brocade.' },
        { id: 'df_lehenga', name: 'Chanderi Zari Lehenga', main: '#d97706', accent: '#991b1b', trim: '#fde047', style: 'lehenga', jewel: 'pearl', head: 'dupatta', query: 'Chanderi Silk Festive Lehenga', desc: 'Graceful Chanderi silk lehenga with sheer golden zari dupatta.' }
      ],
      boy: [
        { id: 'df_kurta', name: 'Brocade Nehru Jacket & Kurta', main: '#4338ca', accent: '#fbbf24', trim: '#fef08a', style: 'kurta', jewel: 'minimal', head: 'safa', query: 'Mens Brocade Nehru Jacket Kurta', desc: 'Classic Indian festive silk kurta layered with a woven brocade jacket.' },
        { id: 'df_dhoti', name: 'Silk Kurta & Zari Dhoti', main: '#fffbeb', accent: '#d97706', trim: '#991b1b', style: 'dhoti', jewel: 'minimal', head: 'none', query: 'Mens Silk Kurta Dhoti Set', desc: 'Traditional auspicious silk kurta and gold-bordered dhoti.' }
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
      @keyframes attTwirl { 0%{transform:rotateY(0deg) scale(1)} 50%{transform:rotateY(180deg) scale(1.05)} 100%{transform:rotateY(360deg) scale(1)} }
      @keyframes attWalk { 0%,100%{transform:translateX(0) rotate(0deg)} 25%{transform:translateX(-8px) rotate(-1.5deg)} 75%{transform:translateX(8px) rotate(1.5deg)} }
      .att-model-box { transition:transform .25s ease; transform-style:preserve-3d; cursor:grab; user-select:none; touch-action:none; }
      .att-model-box:active { cursor:grabbing; }
      .att-pose-breathe { animation:attBreathe 3s ease-in-out infinite; }
      .att-pose-twirl { animation:attTwirl .95s ease-in-out 2; }
      .att-pose-walk { animation:attWalk 1.4s ease-in-out infinite; }
      .att-wardrobe-card { display:flex; align-items:center; gap:10px; width:100%; text-align:left; padding:9px 10px; border-radius:14px; border:2px solid #e5e7eb; background:#ffffff; cursor:pointer; transition:transform .14s, border-color .14s, background .14s; }
      .att-wardrobe-card:hover { transform:translateY(-1px); border-color:#f59e0b; }
      .att-wardrobe-card.on { border-color:#b45309; background:#fef3c7; box-shadow:0 4px 12px rgba(180,83,9,0.16); }
    `;
    document.head.appendChild(s);
  }

  function miniSwatchSvg(item) {
    return `<svg viewBox="0 0 48 56" width="46" height="54" style="flex-shrink:0;border-radius:10px;background:#fffbeb;border:1px solid #f59e0b;" aria-hidden="true">
      ${item.style === 'saree' || item.style === 'lehenga'
        ? `<path d="M12,10 L36,10 L42,50 L6,50 Z" fill="${item.main}" stroke="${item.accent}" stroke-width="2"/><path d="M14,10 L37,49 L29,50 L10,16 Z" fill="${item.accent}" opacity="0.9"/><line x1="7" y1="44" x2="41" y2="44" stroke="${item.trim}" stroke-width="3"/>`
        : `<rect x="11" y="10" width="26" height="24" rx="5" fill="${item.main}" stroke="${item.accent}" stroke-width="2"/><rect x="13" y="34" width="22" height="16" fill="#fffbeb" stroke="${item.accent}" stroke-width="2"/><path d="M14,10 L20,10 L20,32 L14,32 Z" fill="${item.accent}"/>`}
    </svg>`;
  }

  function buildFashionModelSVG(gender, item, pose, fid) {
    const isGirl = gender === 'girl';
    const skin = isGirl ? '#e2a878' : '#d69765';
    const hair = '#1c1917';
    const poseNamaste = pose === 'namaste';

    const jewel = item.jewel === 'temple'
      ? `<path d="M98,116 Q120,140 142,116" fill="none" stroke="#fbbf24" stroke-width="4.5"/><circle cx="120" cy="132" r="4.5" fill="#dc2626" stroke="#fde047" stroke-width="1.5"/>`
      : (item.jewel === 'pearl'
        ? `<path d="M98,116 Q120,136 142,116" fill="none" stroke="#f8fafc" stroke-width="4" stroke-dasharray="1 5" stroke-linecap="round"/>`
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
        ? `<path d="M96,120 L144,120 L142,162 L98,162 Z" fill="${item.main}" stroke="${item.accent}" stroke-width="2.2"/>
           <path d="M96,162 L144,162 L182,272 L58,272 Z" fill="${item.main}" stroke="${item.accent}" stroke-width="2.8"/>
           <path d="M98,122 L162,258 L144,264 L88,132 Z" fill="${item.accent}" opacity="0.88"/>
           <line x1="62" y1="258" x2="178" y2="258" stroke="${item.trim}" stroke-width="5"/>`
        : `<path d="M90,120 L150,120 L172,272 L68,272 Z" fill="${item.main}" stroke="${item.accent}" stroke-width="2.8"/>
           <path d="M92,120 L158,268 L134,272 L82,134 Z" fill="${item.accent}" opacity="0.92"/>
           <line x1="70" y1="258" x2="170" y2="258" stroke="${item.trim}" stroke-width="5"/>
           <line x1="72" y1="265" x2="168" y2="265" stroke="${item.accent}" stroke-width="2.5"/>`)
      : (item.style === 'dhoti'
        ? `<rect x="86" y="120" width="68" height="96" rx="12" fill="${item.main}" stroke="${item.accent}" stroke-width="2.4"/>
           <path d="M88,210 L152,210 L162,272 L78,272 Z" fill="#fffbeb" stroke="${item.accent}" stroke-width="2.4"/>
           <line x1="80" y1="260" x2="160" y2="260" stroke="${item.accent}" stroke-width="4.5"/>
           <path d="M94,120 L108,120 L108,212 L94,212 Z" fill="${item.accent}" opacity="0.9"/>`
        : `<rect x="84" y="120" width="72" height="114" rx="14" fill="${item.main}" stroke="${item.accent}" stroke-width="2.6"/>
           <rect x="92" y="226" width="24" height="46" rx="6" fill="#fffbeb" stroke="${item.accent}" stroke-width="1.8"/>
           <rect x="124" y="226" width="24" height="46" rx="6" fill="#fffbeb" stroke="${item.accent}" stroke-width="1.8"/>
           <line x1="120" y1="122" x2="120" y2="174" stroke="${item.trim}" stroke-width="3"/>`);

    const arms = poseNamaste
      ? `<path d="M88,136 Q96,172 117,154" fill="none" stroke="${skin}" stroke-width="10" stroke-linecap="round"/>
         <path d="M152,136 Q144,172 123,154" fill="none" stroke="${skin}" stroke-width="10" stroke-linecap="round"/>
         <text x="120" y="152" font-size="22" text-anchor="middle" dominant-baseline="central">🙏</text>`
      : `<line x1="88" y1="136" x2="64" y2="188" stroke="${skin}" stroke-width="10" stroke-linecap="round"/>
         <line x1="152" y1="136" x2="176" y2="188" stroke="${skin}" stroke-width="10" stroke-linecap="round"/>`;

    return `
      <svg id="att-svg-${gender}" viewBox="0 0 240 290" width="215" height="260" style="max-width:100%;height:auto;display:block;margin:0 auto;filter:drop-shadow(0 8px 14px rgba(120,53,15,0.22));">
        ${isGirl ? `<circle cx="120" cy="78" r="29" fill="${hair}"/>` : ''}
        ${dress}
        ${arms}
        <rect x="111" y="100" width="18" height="22" rx="6" fill="${skin}"/>
        <circle cx="120" cy="76" r="25" fill="${skin}" stroke="#b45309" stroke-width="0.9"/>
        <path d="M95,72 C97,48 143,48 145,72 C134,60 106,60 95,72 Z" fill="${hair}"/>
        ${head}
        <circle cx="110" cy="75" r="2.8" fill="#111827"/>
        <circle cx="130" cy="75" r="2.8" fill="#111827"/>
        ${isGirl ? `<circle cx="120" cy="67" r="2.8" fill="#dc2626"/>` : `<path d="M108,85 Q120,80 132,85" stroke="#1f2937" stroke-width="2.8" fill="none" stroke-linecap="round"/>`}
        <path d="M113,91 Q120,97 127,91" stroke="#7f1d1d" stroke-width="2.4" fill="none" stroke-linecap="round"/>
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
      mode: 'girl', // 'girl', 'boy', 'both'
      girlItem: grp.girl[0],
      boyItem: grp.boy[0],
      pose: 'breathe', // 'breathe', 'twirl', 'walk', 'namaste'
      scale: 1,
      offX: 0,
      offY: 0,
      saved: false
    };

    function renderStage() {
      const stage = document.getElementById('att-runway-stage');
      if (!stage) return;
      const poseCls = st.pose === 'twirl' ? 'att-pose-twirl' : (st.pose === 'walk' ? 'att-pose-walk' : 'att-pose-breathe');
      let modelsHtml = '';
      if (st.mode === 'girl' || st.mode === 'both') {
        modelsHtml += `<div class="${poseCls}" style="flex:0 1 200px;">${buildFashionModelSVG('girl', st.girlItem, st.pose, fid)}</div>`;
      }
      if (st.mode === 'boy' || st.mode === 'both') {
        modelsHtml += `<div class="${poseCls}" style="flex:0 1 200px;">${buildFashionModelSVG('boy', st.boyItem, st.pose, fid)}</div>`;
      }
      stage.innerHTML = `<div id="att-drag-grp" class="att-model-box" style="display:flex;justify-content:center;align-items:flex-end;gap:4px;transform:translate(${st.offX}px,${st.offY}px) scale(${st.scale});">${modelsHtml}</div>`;
      attachDrag();
    }

    function attachDrag() {
      const el = document.getElementById('att-drag-grp');
      if (!el) return;
      let sx = 0, sy = 0, ox = st.offX, oy = st.offY, down = false;
      el.addEventListener('pointerdown', (e) => { down = true; sx = e.clientX; sy = e.clientY; ox = st.offX; oy = st.offY; });
      window.addEventListener('pointermove', (e) => {
        if (!down) return;
        st.offX = Math.max(-70, Math.min(70, ox + (e.clientX - sx)));
        st.offY = Math.max(-35, Math.min(35, oy + (e.clientY - sy)));
        el.style.transform = `translate(${st.offX}px,${st.offY}px) scale(${st.scale})`;
      });
      window.addEventListener('pointerup', () => { down = false; });
    }

    function renderWardrobeAndInfo() {
      const col = document.getElementById('att-wardrobe-col');
      if (col) {
        const showGirl = st.mode === 'girl' || st.mode === 'both';
        const showBoy = st.mode === 'boy' || st.mode === 'both';
        let h = '';
        if (showGirl) {
          h += `<div style="font-weight:800;font-size:0.8rem;color:#92400e;margin:2px 0 6px;">👩 Women's ${g.name} Wardrobe</div>`;
          h += grp.girl.map(it => `
            <button type="button" class="att-wardrobe-card ${st.girlItem.id === it.id ? 'on' : ''}" onclick="window._coco.pick('girl','${it.id}')">
              ${miniSwatchSvg(it)}
              <div>
                <div style="font-weight:800;font-size:0.86rem;color:#451a03;">${it.name}</div>
                <div style="font-size:0.74rem;color:#78350f;margin-top:2px;">Tap to wear</div>
              </div>
            </button>
          `).join('');
        }
        if (showBoy) {
          h += `<div style="font-weight:800;font-size:0.8rem;color:#92400e;margin:10px 0 6px;">👨 Men's ${g.name} Wardrobe</div>`;
          h += grp.boy.map(it => `
            <button type="button" class="att-wardrobe-card ${st.boyItem.id === it.id ? 'on' : ''}" onclick="window._coco.pick('boy','${it.id}')">
              ${miniSwatchSvg(it)}
              <div>
                <div style="font-weight:800;font-size:0.86rem;color:#451a03;">${it.name}</div>
                <div style="font-size:0.74rem;color:#78350f;margin-top:2px;">Tap to wear</div>
              </div>
            </button>
          `).join('');
        }
        col.innerHTML = h;
      }

      const infoEl = document.getElementById('att-active-info');
      if (infoEl) {
        const curItem = st.mode === 'boy' ? st.boyItem : st.girlItem;
        infoEl.innerHTML = `
          <div style="font-size:0.75rem;font-weight:800;color:#b45309;text-transform:uppercase;">🧵 ${grp.handloom}</div>
          <div style="font-weight:900;font-size:1rem;color:#451a03;margin-top:2px;">${curItem.name}</div>
          <div style="font-size:0.84rem;color:#1c1917;margin-top:3px;">${curItem.desc}</div>
        `;
      }

      document.querySelectorAll('.att-mode-btn').forEach(b => {
        const on = b.getAttribute('data-m') === st.mode;
        b.style.background = on ? '#b45309' : '#ffffff';
        b.style.color = on ? '#ffffff' : '#78350f';
      });
    }

    function renderShopLookSection() {
      const box = document.getElementById('att-shop-look');
      if (!box) return;
      if (!st.saved) { box.style.display = 'none'; return; }
      box.style.display = 'block';
      const itemsToShop = st.mode === 'both' ? [st.girlItem, st.boyItem] : (st.mode === 'boy' ? [st.boyItem] : [st.girlItem]);

      box.innerHTML = `
        <div style="background:#ffffff;border:2px solid #16a34a;border-radius:18px;padding:16px;margin-top:14px;box-shadow:0 8px 24px rgba(22,163,74,0.12);">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px;">
            <div>
              <h3 style="margin:0;color:#14532d;">🛍️ Shop Your Styled ${g.name} Real Attire Online</h3>
              <small style="color:#166534;">Find real handloom & festive outfits matching the look you styled above:</small>
            </div>
            <button type="button" onclick="window._coco.downloadPng()" style="background:#15803d;color:#ffffff;border:none;border-radius:999px;padding:7px 14px;font-weight:800;font-size:0.8rem;cursor:pointer;">📥 Download Lookbook PNG</button>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:12px;">
            ${itemsToShop.map(it => {
              const q = encodeURIComponent(it.query);
              return `
                <div style="background:#fffbeb;border:1.5px solid #d97706;border-radius:14px;padding:12px;display:flex;gap:10px;align-items:center;">
                  ${miniSwatchSvg(it)}
                  <div style="flex:1;">
                    <div style="font-weight:900;color:#451a03;font-size:0.92rem;">${it.name}</div>
                    <div style="font-size:0.75rem;color:#78350f;margin:2px 0 8px;">${grp.handloom}</div>
                    <div style="display:flex;gap:6px;flex-wrap:wrap;">
                      <a href="https://www.amazon.in/s?k=${q}" target="_blank" rel="noopener" style="background:#f59e0b;color:#1c1917;text-decoration:none;padding:4px 10px;border-radius:999px;font-size:0.74rem;font-weight:800;">🛒 Amazon India</a>
                      <a href="https://www.myntra.com/${encodeURIComponent(it.query.toLowerCase().replace(/\s+/g, '-'))}" target="_blank" rel="noopener" style="background:#db2777;color:#ffffff;text-decoration:none;padding:4px 10px;border-radius:999px;font-size:0.74rem;font-weight:800;">👗 Myntra</a>
                      <a href="https://www.ajio.com/search/?text=${q}" target="_blank" rel="noopener" style="background:#1e293b;color:#ffffff;text-decoration:none;padding:4px 10px;border-radius:999px;font-size:0.74rem;font-weight:800;">✨ Ajio</a>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    window._coco = {
      setMode: (m) => { st.mode = m; renderStage(); renderWardrobeAndInfo(); renderShopLookSection(); },
      pick: (who, id) => {
        const list = who === 'boy' ? grp.boy : grp.girl;
        const found = list.find(x => x.id === id);
        if (!found) return;
        if (who === 'boy') st.boyItem = found; else st.girlItem = found;
        st.pose = 'twirl';
        renderStage();
        renderWardrobeAndInfo();
        renderShopLookSection();
      },
      setPose: (p) => { st.pose = p; renderStage(); },
      zoom: (dz) => { st.scale = Math.max(0.8, Math.min(1.25, +(st.scale + dz).toFixed(2))); renderStage(); },
      resetPos: () => { st.scale = 1; st.offX = 0; st.offY = 0; st.pose = 'breathe'; renderStage(); },
      saveAndShop: () => {
        st.saved = true;
        if (!window.S.attire[fid]) {
          window.S.attire[fid] = true;
          if (typeof window.addCoins === 'function') window.addCoins(25, g.name + ' Attire Styled');
          if (typeof window.saveProgress === 'function') window.saveProgress();
        }
        renderShopLookSection();
        const box = document.getElementById('att-shop-look');
        if (box) box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      },
      downloadPng: () => {
        const svgEl = document.getElementById(st.mode === 'boy' ? 'att-svg-boy' : 'att-svg-girl');
        if (!svgEl) return;
        const xml = new XMLSerializer().serializeToString(svgEl);
        const img = new Image();
        img.onload = () => {
          const cv = document.createElement('canvas');
          cv.width = 480; cv.height = 580;
          const ctx = cv.getContext('2d');
          ctx.fillStyle = '#fffbeb'; ctx.fillRect(0, 0, 480, 580);
          ctx.drawImage(img, 25, 20, 430, 520);
          const a = document.createElement('a');
          a.download = `festora-${fid}-lookbook.png`;
          a.href = cv.toDataURL('image/png');
          a.click();
        };
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(xml);
      }
    };

    setTimeout(() => { renderStage(); renderWardrobeAndInfo(); renderShopLookSection(); }, 15);

    return `
      <div style="max-width:960px;margin:0 auto;padding-bottom:28px;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
          <div>
            <h2 style="margin:0;color:var(--ink);">👗 ${g.name} Festive Wardrobe Studio</h2>
            <small style="color:var(--mut);">Tap any ${g.name} outfit from the right wardrobe column to dress the movable Boy &amp; Girl models.</small>
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            <button type="button" class="att-mode-btn" data-m="girl" onclick="window._coco.setMode('girl')" style="padding:6px 12px;border-radius:999px;border:1.5px solid #b45309;font-weight:800;font-size:0.8rem;cursor:pointer;">👩 Girl</button>
            <button type="button" class="att-mode-btn" data-m="boy" onclick="window._coco.setMode('boy')" style="padding:6px 12px;border-radius:999px;border:1.5px solid #b45309;font-weight:800;font-size:0.8rem;cursor:pointer;">👨 Boy</button>
            <button type="button" class="att-mode-btn" data-m="both" onclick="window._coco.setMode('both')" style="padding:6px 12px;border-radius:999px;border:1.5px solid #b45309;font-weight:800;font-size:0.8rem;cursor:pointer;">👫 Both</button>
            <button type="button" onclick="window._coco.saveAndShop()" style="background:#15803d;color:#ffffff;border:none;border-radius:999px;padding:7px 14px;font-weight:800;font-size:0.82rem;cursor:pointer;">✨ Save &amp; Shop Real Look</button>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:minmax(270px,1.25fr) minmax(240px,1fr);gap:14px;align-items:start;">
          <div style="background:linear-gradient(180deg,#fffbeb 0%,#fef3c7 68%,#e6b87d 100%);border:2px solid #d97706;border-radius:20px;padding:12px;position:relative;overflow:hidden;box-shadow:0 10px 26px rgba(146,64,14,0.14);">
            <div style="text-align:center;margin-bottom:4px;">
              <span style="background:#ffffff;color:#92400e;border:1px solid #f59e0b;border-radius:999px;padding:2px 12px;font-size:0.78rem;font-weight:800;">${g.e || '🪔'} ${g.name} Runway · Drag Model to Move</span>
            </div>
            <div id="att-runway-stage" style="min-height:270px;display:flex;align-items:flex-end;justify-content:center;padding:8px 0;"></div>
            <div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-top:8px;">
              <button type="button" onclick="window._coco.setPose('twirl')" style="background:#ffffff;color:#78350f;border:1px solid #d97706;border-radius:999px;padding:4px 10px;font-size:0.75rem;font-weight:800;cursor:pointer;">💃 Twirl</button>
              <button type="button" onclick="window._coco.setPose('walk')" style="background:#ffffff;color:#78350f;border:1px solid #d97706;border-radius:999px;padding:4px 10px;font-size:0.75rem;font-weight:800;cursor:pointer;">🚶 Walk</button>
              <button type="button" onclick="window._coco.setPose('namaste')" style="background:#ffffff;color:#78350f;border:1px solid #d97706;border-radius:999px;padding:4px 10px;font-size:0.75rem;font-weight:800;cursor:pointer;">🙏 Namaste</button>
              <button type="button" onclick="window._coco.zoom(0.1)" style="background:#ffffff;color:#78350f;border:1px solid #d97706;border-radius:999px;padding:4px 9px;font-size:0.75rem;font-weight:800;cursor:pointer;">＋</button>
              <button type="button" onclick="window._coco.zoom(-0.1)" style="background:#ffffff;color:#78350f;border:1px solid #d97706;border-radius:999px;padding:4px 9px;font-size:0.75rem;font-weight:800;cursor:pointer;">－</button>
              <button type="button" onclick="window._coco.resetPos()" style="background:#ffffff;color:#78350f;border:1px solid #d97706;border-radius:999px;padding:4px 10px;font-size:0.75rem;font-weight:800;cursor:pointer;">🎯 Reset</button>
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:10px;">
            <div id="att-wardrobe-col" style="background:#fffbeb;border:2px solid #d97706;border-radius:16px;padding:12px;display:flex;flex-direction:column;gap:8px;max-height:310px;overflow:auto;"></div>
            <div id="att-active-info" style="background:#ffffff;border:1.5px solid #d97706;border-radius:14px;padding:12px;"></div>
          </div>
        </div>

        <div id="att-shop-look" style="display:none;"></div>
      </div>
    `;
  };
})();
