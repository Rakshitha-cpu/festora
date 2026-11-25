/* ===== FESTORA 3D FESTIVAL HOME DECORATION (Three.js + PBR Procedural Architecture) ===== */
(function () {
  'use strict';
  if (window.Home3D && window.Home3D._v3) return;

  const THREE_CDN = 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.min.js';

  // ---- 61 UNIQUE FESTIVAL HOME ARCHITECTURES & 8 MISSING ITEMS EACH ----
  const ARCH_PRESETS = {
    haveli_courtyard: { roomType: 'Haveli Courtyard', pillars: 'sandstone', arch: 'cusped', roof: 'open_sky', window: 'jharokha' },
    nalukettu:        { roomType: 'Kerala Nalukettu', pillars: 'teakwood', arch: 'flat_carved', roof: 'sloped_tile', window: 'wooden_slat' },
    tamil_courtyard:  { roomType: 'Tamil Mutram Courtyard', pillars: 'granite_wood', arch: 'mandapam', roof: 'courtyard', window: 'open_verandah' },
    pandal:           { roomType: 'Bengali Pandal Hall', pillars: 'bamboo_drape', arch: 'shola_arch', roof: 'canopy', window: 'draped_curtain' },
    temple_sanctum:   { roomType: 'Stone Temple Sanctum', pillars: 'carved_stone', arch: 'gopuram', roof: 'corbelled', window: 'deep_niche' },
    monastery:        { roomType: 'Himalayan Monastery', pillars: 'painted_wood', arch: 'tibetan', roof: 'flat_beam', window: 'banner_window' },
    tribal_bamboo:    { roomType: 'Tribal Bamboo Morung', pillars: 'bamboo', arch: 'log_beam', roof: 'thatch', window: 'open_bamboo' },
    desert_tent:      { roomType: 'Desert Pavilion Tent', pillars: 'brass_pole', arch: 'scalloped_tent', roof: 'tent_drape', window: 'desert_vista' },
    himachali_wood:   { roomType: 'Himachali Kath-Kuni Home', pillars: 'deodar_wood', arch: 'carved_pine', roof: 'slate_gable', window: 'mountain_view' },
    river_ghat:       { roomType: 'Sacred River Ghat', pillars: 'sandstone_step', arch: 'ghat_pavilion', roof: 'open_sky', window: 'river_horizon' },
    mughal_arch:      { roomType: 'Mughal Courtyard Diwan', pillars: 'marble', arch: 'pointed_mughal', roof: 'open_sky', window: 'jali_screen' },
    goan_villa:       { roomType: 'Goan Heritage Villa', pillars: 'laterite_wood', arch: 'colonial_arch', roof: 'pitched_tile', window: 'oyster_shell' },
    royal_durbar:     { roomType: 'Mysore Royal Durbar', pillars: 'gilded_pillar', arch: 'hoysala_arch', roof: 'coffered', window: 'palace_balcony' },
    maratha_wada:     { roomType: 'Maratha Wada Courtyard', pillars: 'teak_octagonal', arch: 'cypress_arch', roof: 'courtyard', window: 'wooden_jharokha' },
    punjabi_verandah: { roomType: 'Punjabi Haveli Verandah', pillars: 'brick_wood', arch: 'phulkari_arch', roof: 'open_courtyard', window: 'courtyard_gate' }
  };

  // Helper to build 8 distinct 3D slots with diverse shapes & prices
  function makeItems(specs) {
    const slots = [
      [0, 1.35, -3.15],    // 0: Altar center hero
      [-2.35, 0.95, -2.5], // 1: Left pedestal / lamp
      [2.35, 0.95, -2.5],  // 2: Right pedestal / lamp
      [0, 0.06, 0.45],     // 3: Center floor centerpiece (rangoli / pookalam / carpet)
      [-1.55, 0.55, 0.9],  // 4: Left floor/table prop
      [1.55, 0.55, 0.9],   // 5: Right floor/table prop
      [0, 3.35, -3.4],     // 6: Overhead toran / banner / arch decor
      [-0.05, 2.75, 0.2]   // 7: Hanging lantern / chandelier / star
    ];
    return specs.map((sp, i) => ({
      id: sp[0], name: sp[1], price: sp[2], shape: sp[3], color: sp[4] || '#f59e0b',
      slot: slots[i], scale: sp[5] || 1.0
    }));
  }

  // Unique festival configurations for all 61 festivals
  const RAW_HOMES = {
    ganesh:       ['maratha_wada', 'night',   'warm_gold',   ['#f59e0b','#b45309','#3b1f10','#542d18','#140c1c'], 'mud', 'plaster', ['clay_idol','brass_samai'], ['petals','smoke'], [
      ['g_idol','Eco Clay Ganesha Idol',45,'idol','#d97706',1.15], ['g_samai_l','Left Brass Samai Lamp',25,'lamp','#fbbf24'], ['g_samai_r','Right Brass Samai Lamp',25,'lamp','#fbbf24'],
      ['g_rangoli','Maratha Rangoli Floor',30,'rangoli','#f59e0b'], ['g_modak','Silver Modak Thali',20,'feast','#fde68a'], ['g_kalash','Durva & Coconut Kalash',20,'kalash','#22c55e'],
      ['g_toran','Mango & Hibiscus Toran',15,'toran','#ef4444'], ['g_kandil','Hanging Akash Kandil',35,'lantern','#f97316']
    ]],
    diwali:       ['haveli_courtyard', 'night', 'festive_glow', ['#fbbf24','#7c3aed','#2d1636','#3b1d4a','#070412'], 'marble', 'stone', ['diya_row','fairy_lights'], ['fireworks','sparks'], [
      ['d_lakshmi','Lakshmi-Ganesha Silver Shrine',50,'idol','#fde047',1.1], ['d_deep_l','Panch-Diya Brass Stand (L)',25,'lamp','#f59e0b'], ['d_deep_r','Panch-Diya Brass Stand (R)',25,'lamp','#f59e0b'],
      ['d_rangoli','Gold-Leaf Lotus Rangoli',35,'rangoli','#fbbf24',1.2], ['d_urli','Rose Petal Brass Urli',30,'pot','#0ea5e9'], ['d_sweets','Kaju Katli & Mithai Tray',20,'feast','#f472b6'],
      ['d_toran','Marigold & Fairy Toran',20,'toran','#f97316'], ['d_lantern','Royal Kandeel Chandelier',40,'lantern','#ec4899']
    ]],
    onam:         ['nalukettu', 'day', 'lush_sunlight', ['#10b981','#f59e0b','#4a2f18','#e6dcc8','#38bdf8'], 'wood', 'plaster', ['oonjal_swing','wooden_pillars'], ['petals','dust'], [
      ['o_thrikk','Thrikkakara Clay Pyramid',35,'idol','#d97706'], ['o_vila_l','Kerala Nilavilakku (L)',30,'lamp','#fbbf24'], ['o_vila_r','Kerala Nilavilakku (R)',30,'lamp','#fbbf24'],
      ['o_pookalam','10-Ring Floral Pookalam',45,'rangoli','#ec4899',1.25], ['o_sadya','Banana-Leaf Onam Sadya',35,'feast','#22c55e'], ['o_urli','Bell-Metal Urli Bowl',25,'pot','#d97706'],
      ['o_toran','Jasmine & Coconut Frond Toran',15,'toran','#fde047'], ['o_swing','Carved Oonjal Swing Decor',40,'swing','#92400e']
    ]],
    pongal:       ['tamil_courtyard', 'sunrise', 'golden_dawn', ['#eab308','#16a34a','#6b4423','#d4b483','#fb923c'], 'mud', 'mud', ['sugarcane_arch','cow_bell'], ['smoke','dust'], [
      ['p_surya','Surya Brass Emblem',35,'idol','#fbbf24'], ['p_kuthu_l','Tamil Kuthuvilakku (L)',25,'lamp','#f59e0b'], ['p_kuthu_r','Tamil Kuthuvilakku (R)',25,'lamp','#f59e0b'],
      ['p_kolam','White Rice-Flour Kolam',30,'rangoli','#ffffff',1.15], ['p_pot','Overflowing Pongal Clay Pot',45,'pot','#b45309',1.2], ['p_cane','Fresh Sugarcane Bundle',20,'feast','#22c55e'],
      ['p_toran','Turmeric & Mango Leaf Toran',15,'toran','#16a34a'], ['p_bell','Hanging Temple Brass Bell',30,'lantern','#eab308']
    ]],
    holi:         ['haveli_courtyard', 'day', 'vibrant_sun', ['#ec4899','#3b82f6','#634832','#e5c7a3','#7dd3fc'], 'stone', 'plaster', ['gulal_vats','splashed_wall'], ['petals','sparks'], [
      ['h_radha','Radha-Krishna Floral Swing',45,'idol','#ec4899'], ['h_pich_l','Brass Pichkari Stand (L)',25,'lamp','#fbbf24'], ['h_pich_r','Brass Pichkari Stand (R)',25,'lamp','#3b82f6'],
      ['h_rang','Splashed Gulal Floor Mandala',35,'rangoli','#ec4899',1.2], ['h_thandai','Chilled Thandai Matka',20,'pot','#f59e0b'], ['h_gujiya','Saffron Gujiya Platter',20,'feast','#fde047'],
      ['h_toran','Spring Rose & Marigold Toran',15,'toran','#f43f5e'], ['h_lantern','Colorful Paper Canopy',30,'lantern','#a855f7']
    ]],
    durga:        ['pandal', 'night', 'crimson_dramatic', ['#dc2626','#fbbf24','#3a1114','#54191e','#140608'], 'marble', 'cloth', ['shola_arch','dhunuchi_stand'], ['smoke','petals'], [
      ['du_pratima','Devi Durga Pratima Platform',50,'idol','#dc2626',1.2], ['du_dhun_l','Smoking Dhunuchi Burner (L)',25,'lamp','#f97316'], ['du_dhun_r','Smoking Dhunuchi Burner (R)',25,'lamp','#f97316'],
      ['du_alpana','Bengali White Alpana Art',35,'rangoli','#f8fafc',1.2], ['du_dhak','Decorated Bengali Dhak Drum',30,'drum','#b45309'], ['du_bhog','Khichuri & Payesh Bhog',20,'feast','#fde68a'],
      ['du_shola','Shola-Work Pandal Crown',35,'toran','#ffffff'], ['du_jhar','Crystal Pandal Chandelier',40,'lantern','#fbbf24']
    ]],
    eid:          ['mughal_arch', 'night', 'moonlit_emerald', ['#10b981','#fbbf24','#0f362c','#194a3c','#04121c'], 'marble', 'stone', ['crescent_dome','jali_screen'], ['sparks','dust'], [
      ['e_mihrab','Illuminated Crescent Arch',45,'idol','#10b981'], ['e_fan_l','Moroccan Brass Fanoos (L)',25,'lamp','#fbbf24'], ['e_fan_r','Moroccan Brass Fanoos (R)',25,'lamp','#fbbf24'],
      ['e_carpet','Emerald Persian Dastarkhwan',35,'rangoli','#059669',1.2], ['e_khurma','Silver Sheer Khurma Bowl',25,'feast','#fde68a'], ['e_dates','Medjool Dates & Rosewater',20,'pot','#d97706'],
      ['e_toran','Starry Crescent Festoon',20,'toran','#fbbf24'], ['e_lantern','Grand Crescent Chandelier',45,'lantern','#34d399']
    ]],
    xmas:         ['goan_villa', 'night', 'hearth_warmth', ['#e11d48','#16a34a','#3b2016','#7c2d12','#0f172a'], 'wood', 'plaster', ['stone_hearth','snow_window'], ['snow','sparks'], [
      ['x_crib','Wooden Nativity Crib',45,'idol','#92400e'], ['x_cand_l','Brass Altar Candle (L)',20,'lamp','#fde047'], ['x_cand_r','Brass Altar Candle (R)',20,'lamp','#fde047'],
      ['x_tree','Decorated Festive Tree',50,'tree','#15803d',1.25], ['x_bebinca','Goan Bebinca & Plum Cake',25,'feast','#b45309'], ['x_wreath','Holly & Cinnamon Urn',20,'pot','#dc2626'],
      ['x_lights','Warm Fairy Light Garland',25,'toran','#fbbf24'], ['x_star','Glowing Nakshatram Paper Star',40,'lantern','#fef08a']
    ]],
    dasara:       ['royal_durbar', 'night', 'palace_amber', ['#f59e0b','#7c2d12','#42240c','#6b3b14','#120a04'], 'marble', 'stone', ['palace_throne','gold_bulbs'], ['sparks','petals'], [
      ['da_golu','9-Tier Bommai Golu Steps',50,'idol','#f59e0b',1.15], ['da_lamp_l','Mysore Palace Torch (L)',25,'lamp','#fbbf24'], ['da_lamp_r','Mysore Palace Torch (R)',25,'lamp','#fbbf24'],
      ['da_rang','Royal Mysore Lotus Floor',35,'rangoli','#fbbf24'], ['da_sweet','Mysore Pak Silver Platter',20,'feast','#f59e0b'], ['da_kalash','Ayudha Puja Kalash',25,'kalash','#ef4444'],
      ['da_toran','Royal Marigold Durbar Arch',20,'toran','#f97316'], ['da_chand','Golden Palace Chandelier',40,'lantern','#fde047']
    ]],
    navratri:     ['haveli_courtyard', 'night', 'garba_violet', ['#a855f7','#ec4899','#2b123d','#411b5c','#090414'], 'stone', 'plaster', ['garba_circle','mirror_work'], ['sparks','petals'], [
      ['n_garbo','Perforated Clay Garbo Pot',45,'pot','#f97316',1.15], ['n_lamp_l','Brass Garba Stand (L)',25,'lamp','#fbbf24'], ['n_lamp_r','Brass Garba Stand (R)',25,'lamp','#fbbf24'],
      ['n_rang','Mirror-Work Garba Floor',35,'rangoli','#a855f7',1.2], ['n_dandiya','Painted Dandiya Sticks Rack',20,'drum','#ec4899'], ['n_prasad','Fafda & Jalebi Platter',20,'feast','#fde047'],
      ['n_toran','Kutchi Mirror Toran',25,'toran','#ec4899'], ['n_lantern','9-Color Navratri Canopy',35,'lantern','#c084fc']
    ]],
    bihu:         ['tribal_bamboo', 'day', 'spring_green', ['#e11d48','#16a34a','#4d311c','#c4a678','#7dd3fc'], 'wood', 'bamboo', ['loom_corner','gamosa_wall'], ['petals','dust'], [
      ['b_jaapi','Decorated Bamboo Jaapi',40,'idol','#f59e0b'], ['b_lamp_l','Earthen Saki Lamp (L)',20,'lamp','#fbbf24'], ['b_lamp_r','Earthen Saki Lamp (R)',20,'lamp','#fbbf24'],
      ['b_mat','Woven Assamese Sitalpati Mat',30,'rangoli','#e11d48'], ['b_dhol','Bihu Dhol & Pepa Horn',35,'drum','#b45309'], ['b_pitha','Til Pitha & Laru Tray',25,'feast','#fde68a'],
      ['b_gamosa','Woven Red-Border Gamosa',20,'toran','#dc2626'], ['b_lantern','Bamboo Woven Hanging Lamp',30,'lantern','#d97706']
    ]],
    hemis:        ['monastery', 'day', 'himalayan_crisp', ['#dc2626','#0284c7','#4f2014','#8c3a24','#bae6fd'], 'wood', 'stone', ['prayer_wheel','snow_peaks'], ['snow','smoke'], [
      ['he_thangka','Silk Thangka Shrine Scroll',50,'idol','#dc2626',1.15], ['he_butt_l','Yak Butter Lamp Stand (L)',25,'lamp','#fde047'], ['he_butt_r','Yak Butter Lamp Stand (R)',25,'lamp','#fde047'],
      ['he_mand','Sand Mandala Carpet',40,'rangoli','#3b82f6'], ['he_drum','Monastery Nga Drum',30,'drum','#b91c1c'], ['he_tea','Butter Tea & Momos Bowl',20,'feast','#d97706'],
      ['he_flags','5-Color Prayer Flags',25,'flag','#3b82f6'], ['he_bell','Bronze Dorje Chandelier',35,'lantern','#fbbf24']
    ]],
    chhath:       ['river_ghat', 'sunrise', 'surya_orange', ['#f97316','#0284c7','#5c361a','#382414','#fb923c'], 'stone', 'stone', ['ghat_steps','river_water'], ['water','smoke'], [
      ['ch_surya','Rising Surya Arghya Crest',45,'idol','#f97316'], ['ch_diya_l','Clay Diya Ghat Stand (L)',20,'lamp','#fbbf24'], ['ch_diya_r','Clay Diya Ghat Stand (R)',20,'lamp','#fbbf24'],
      ['ch_rang','Ghat Vermilion Kolam',30,'rangoli','#ef4444'], ['ch_soop','Bamboo Soop with Thekua',35,'feast','#d97706'], ['ch_kalash','Copper Arghya Kalash',25,'kalash','#b45309'],
      ['ch_cane','Sugarcane Canopy Arch',25,'toran','#16a34a'], ['ch_lamp','Floating Ghat Lantern',30,'lantern','#fde047']
    ]],
    lohri:        ['punjabi_verandah', 'night', 'bonfire_warm', ['#ea580c','#facc15','#452010','#6e3a20','#0f172a'], 'mud', 'plaster', ['charpai','phulkari_drape'], ['sparks','smoke'], [
      ['lo_bonfire','Sacred Courtyard Bonfire',50,'bonfire','#f97316',1.25], ['lo_lamp_l','Mustard Oil Diya Stand (L)',20,'lamp','#fbbf24'], ['lo_lamp_r','Mustard Oil Diya Stand (R)',20,'lamp','#fbbf24'],
      ['lo_rang','Phulkari Woven Rug',30,'rangoli','#ea580c'], ['lo_dhol','Punjabi Bhangra Dhol',35,'drum','#d97706'], ['lo_rewri','Rewri, Peanuts & Gajak',25,'feast','#fde68a'],
      ['lo_toran','Phulkari Embroidered Valance',25,'toran','#f43f5e'], ['lo_lantern','Warm Courtyard Lantern',30,'lantern','#fbbf24']
    ]],
    shivaratri:   ['temple_sanctum', 'night', 'mystic_indigo', ['#6366f1','#fbbf24','#1e1b2e','#2d2842','#050514'], 'stone', 'stone', ['stone_lingam','trishul'], ['smoke','sparks'], [
      ['sh_lingam','Sacred Stone Lingam & Bilva',50,'idol','#64748b',1.15], ['sh_deep_l','Temple Stone Lamp (L)',25,'lamp','#fbbf24'], ['sh_deep_r','Temple Stone Lamp (R)',25,'lamp','#fbbf24'],
      ['sh_yantra','Sacred Rudraksha Mandala',35,'rangoli','#818cf8'], ['sh_kalash','Copper Jalabhishek Kalash',30,'kalash','#b45309'], ['sh_damaru','Shiva Damaru & Brass Bell',25,'drum','#fbbf24'],
      ['sh_toran','Bilva Leaf & Rudraksha Arch',20,'toran','#22c55e'], ['sh_ghanta','Sanctum Bronze Temple Bell',35,'lantern','#d97706']
    ]],
    buddha:       ['temple_sanctum', 'day', 'serene_lotus', ['#eab308','#ec4899','#4a3b2c','#d6cfc2','#bae6fd'], 'stone', 'stone', ['bodhi_tree','lotus_pond'], ['petals','smoke'], [
      ['bu_statue','Golden Meditation Shrine',50,'idol','#eab308',1.15], ['bu_lamp_l','Lotus Butter Lamp (L)',25,'lamp','#fde047'], ['bu_lamp_r','Lotus Butter Lamp (R)',25,'lamp','#fde047'],
      ['bu_pond','Sacred Lotus Mandala',40,'rangoli','#f472b6'], ['bu_bowl','Singing Bowl & Incense',30,'pot','#d97706'], ['bu_kheer','Sujata Milk-Rice Kheer',20,'feast','#fef3c7'],
      ['bu_flags','Bodhi Leaf & Flag Garland',25,'flag','#eab308'], ['bu_lantern','Paper Lotus Lantern',35,'lantern','#fda4af']
    ]]
  };

  // Festival-specific metadata for the remaining 45 festivals so NO two share the same layout/palette/items
  const EXTRA_META = {
    gudi:        ['maratha_wada', 'sunrise', 'Marigold Dawn', ['#f97316','#16a34a','#523018','#d8c3a5','#fdba74'], 'wood', 'plaster', 'petals', 'Bamboo Gudi with Silk & Neem'],
    dahihandi:   ['maratha_wada', 'day', 'Monsoon Bright', ['#3b82f6','#f59e0b','#472d18','#c9b99b','#93c5fd'], 'stone', 'plaster', 'water', 'Suspended Clay Butter Handi'],
    karthigai:   ['tamil_courtyard', 'night', 'Agni Beacon', ['#f97316','#fde047','#2b1408','#3d1d0c','#09050c'], 'stone', 'stone', 'sparks', 'Thiruvannamalai Agni Deepam'],
    thaipusam:   ['temple_sanctum', 'day', 'Vel Devotion', ['#eab308','#dc2626','#4d2c12','#cbb89d','#fde68a'], 'stone', 'plaster', 'smoke', 'Peacock Feather Kavadi Arch'],
    thrissur:    ['temple_sanctum', 'sunset', 'Pooram Gold', ['#f59e0b','#dc2626','#3b1d0c','#613318','#fb923c'], 'stone', 'stone', 'fireworks', 'Golden Nettipattam Elephant Caparison'],
    attukal:     ['nalukettu', 'day', 'Hearth Devotion', ['#ea580c','#f59e0b','#452512','#decbb7','#fef08a'], 'mud', 'plaster', 'smoke', 'Earthen Attukal Pongala Hearth'],
    pulikali:    ['nalukettu', 'day', 'Tiger Carnival', ['#eab308','#18181b','#4a2e16','#d4c4a8','#7dd3fc'], 'wood', 'plaster', 'petals', 'Painted Tiger Mask & Chenda'],
    karaga:      ['temple_sanctum', 'night', 'Midnight Jasmine', ['#ec4899','#fde047','#1c0f24','#2e183b','#05030a'], 'stone', 'stone', 'petals', 'Jasmine Flower Karaga Crown Pot'],
    kambala:     ['tamil_courtyard', 'day', 'Coastal Paddy', ['#16a34a','#d97706','#3b2a14','#9e8767','#60a5fa'], 'mud', 'bamboo', 'water', 'Coastal Buffalo Plough Emblem'],
    baisakhi:    ['punjabi_verandah', 'day', 'Golden Wheat', ['#eab308','#f97316','#523616','#dfd0b8','#fde047'], 'mud', 'plaster', 'dust', 'Golden Wheat Sheaf & Dhol'],
    holamohalla: ['punjabi_verandah', 'day', 'Khalsa Valor', ['#0284c7','#f59e0b','#29334d','#cbd5e1','#93c5fd'], 'stone', 'stone', 'sparks', 'Nishan Sahib & Gatka Shield'],
    kilaraipur:  ['punjabi_verandah', 'day', 'Arena Sun', ['#d97706','#15803d','#4a3319','#d6c7b2','#bae6fd'], 'mud', 'plaster', 'dust', 'Rural Olympics Trophy Stand'],
    tarnetar:    ['desert_tent', 'day', 'Mirror Umbrella', ['#ec4899','#10b981','#5c1d38','#e6cfba','#7dd3fc'], 'mud', 'cloth', 'petals', 'Embroidered Tarnetar Chhatri'],
    pushkar:     ['desert_tent', 'sunset', 'Thar Amber', ['#f59e0b','#b91c1c','#5e2c14','#d49a6a','#fb923c'], 'mud', 'cloth', 'dust', 'Adorned Desert Camel Saddle'],
    lathmar:     ['haveli_courtyard', 'day', 'Braj Colors', ['#ec4899','#eab308','#541936','#e6cbb3','#fde047'], 'stone', 'plaster', 'petals', 'Braj Bamboo Shield & Gulal'],
    devdeepawali:['river_ghat', 'night', 'Million Lamps', ['#fbbf24','#3b82f6','#1c1429','#2a1e3d','#030712'], 'stone', 'stone', 'water', 'Kashi Stone Diya Pyramid'],
    rajaparba:   ['nalukettu', 'day', 'Monsoon Swing', ['#16a34a','#ec4899','#2b3b24','#cbd5c1','#94a3b8'], 'wood', 'plaster', 'water', 'Monsoon Flower Doli Swing'],
    rathyatra:   ['river_ghat', 'day', 'Nandighosha', ['#dc2626','#eab308','#5c1914','#d4b483','#93c5fd'], 'wood', 'stone', 'petals', 'Wooden Chariot Wheel & Canopy'],
    bathukamma:  ['tamil_courtyard', 'sunset', 'Floral Tower', ['#ec4899','#eab308','#421e33','#cbb89d','#f472b6'], 'mud', 'plaster', 'petals', '7-Tier Bathukamma Flower Stack'],
    medaram:     ['tribal_bamboo', 'night', 'Forest Sacred', ['#b91c1c','#16a34a','#291a10','#422a19','#052e16'], 'mud', 'bamboo', 'smoke', 'Sacred Forest Bamboo Altar'],
    hornbill:    ['tribal_bamboo', 'day', 'Naga Morung', ['#dc2626','#0f172a','#382014','#8c6239','#7dd3fc'], 'wood', 'bamboo', 'smoke', 'Carved Naga Log Drum & Feathers'],
    wangala:     ['tribal_bamboo', 'day', '100 Drums', ['#d97706','#15803d','#4a2e16','#b8926a','#fde047'], 'wood', 'bamboo', 'dust', 'Garo Dama Drum Ensemble'],
    shigmo:      ['goan_villa', 'day', 'Goan Spring', ['#f97316','#10b981','#5c2614','#e6ccb2','#7dd3fc'], 'stone', 'plaster', 'petals', 'Ghumot Clay Drum & Brass Flags'],
    bonderam:    ['goan_villa', 'day', 'Island Flags', ['#0284c7','#eab308','#203b54','#d9e2ec','#38bdf8'], 'stone', 'plaster', 'water', 'Divar Island Festival Flag'],
    kullu:       ['himachali_wood', 'day', 'Deodar Valley', ['#dc2626','#eab308','#4a2b16','#bfa68a','#bae6fd'], 'wood', 'wood', 'smoke', 'Kullu Devta Silver Palanquin'],
    bastar:      ['tribal_bamboo', 'sunset', 'Dhokra Brass', ['#b45309','#16a34a','#3d2210','#9e7b56','#fb923c'], 'mud', 'bamboo', 'smoke', 'Dhokra Lost-Wax Brass Shrine'],
    khajuraho:   ['temple_sanctum', 'night', 'Sculpted Amber', ['#d97706','#7c2d12','#2e1b10','#4a2c1b','#0f172a'], 'stone', 'stone', 'sparks', 'Classical Nataraja Stone Niche'],
    uttarayan:   ['haveli_courtyard', 'day', 'Kite Azure', ['#0284c7','#f59e0b','#3a4a5e','#d6cbb8','#38bdf8'], 'stone', 'plaster', 'dust', 'Colorful Diamond Kites & Firki'],
    rann:        ['desert_tent', 'night', 'White Moon', ['#e2e8f0','#f59e0b','#1e293b','#cbd5e1','#020617'], 'marble', 'cloth', 'sparks', 'Kutchi Mirror Bhunga Tent'],
    gangaur:     ['haveli_courtyard', 'sunset', 'Jaipur Rose', ['#f43f5e','#f59e0b','#5e232c','#e6b8af','#fb7185'], 'marble', 'plaster', 'petals', 'Isar & Gauri Royal Idols'],
    teej:        ['maratha_wada', 'day', 'Emerald Monsoon', ['#10b981','#eab308','#1f3d2b','#cbd5c1','#64748b'], 'wood', 'plaster', 'water', 'Leheriya Draped Banyan Swing'],
    nuakhai:     ['tribal_bamboo', 'day', 'Sambalpuri Gold', ['#eab308','#b91c1c','#472d16','#c4a678','#fde047'], 'mud', 'plaster', 'dust', 'New Rice Nabanna Clay Pot'],
    balijatra:   ['river_ghat', 'night', 'Kalinga Boita', ['#0284c7','#f59e0b','#172a3d','#25415c','#020617'], 'stone', 'stone', 'water', 'Miniature Banana-Bark Boita'],
    bonalu:      ['tamil_courtyard', 'day', 'Turmeric & Neem', ['#eab308','#dc2626','#522610','#d4b483','#fde047'], 'mud', 'plaster', 'smoke', 'Decorated Bonam Clay Pot'],
    ambubachi:   ['temple_sanctum', 'night', 'Kamakhya Crimson', ['#be123c','#f59e0b','#2e0a14','#47101f','#09040a'], 'stone', 'stone', 'smoke', 'Sacred Crimson Silk Altar'],
    chapchar:    ['tribal_bamboo', 'day', 'Mizo Bamboo', ['#10b981','#f43f5e','#283d2e','#b8a890','#7dd3fc'], 'wood', 'bamboo', 'petals', 'Cheraw Bamboo & Vakiria Crown'],
    sangai:      ['tribal_bamboo', 'sunset', 'Loktak Lotus', ['#0ea5e9','#ec4899','#1c333d','#94a3b8','#fb7185'], 'wood', 'bamboo', 'water', 'Loktak Phumdi Lotus Shrine'],
    rakhi:       ['haveli_courtyard', 'day', 'Silk & Saffron', ['#f43f5e','#f59e0b','#52252b','#e8d5c4','#fde68a'], 'marble', 'plaster', 'petals', 'Silver Rakhi & Tilak Thali'],
    gurpurab:    ['mughal_arch', 'night', 'Golden Sarovar', ['#fbbf24','#0284c7','#1a2540','#28375c','#030712'], 'marble', 'marble', 'sparks', 'Golden Dome Palki Sahib'],
    basant:      ['punjabi_verandah', 'day', 'Mustard Yellow', ['#facc15','#16a34a','#524414','#e8deb5','#fde047'], 'marble', 'plaster', 'petals', 'Saraswati Veena & Yellow Blooms'],
    karwachauth: ['haveli_courtyard', 'night', 'Sieve Moon', ['#e11d48','#fbbf24','#2b1122','#421933','#090412'], 'marble', 'stone', 'sparks', 'Brass Sieve & Earthen Karwa'],
    mahavir:     ['temple_sanctum', 'day', 'Ahimsa White', ['#f8fafc','#f59e0b','#4a4236','#e2e8f0','#bae6fd'], 'marble', 'stone', 'petals', 'White Marble Tirthankara Niche'],
    chithirai:   ['tamil_courtyard', 'day', 'Madurai Gold', ['#dc2626','#eab308','#541c14','#d4b483','#7dd3fc'], 'stone', 'stone', 'petals', 'Meenakshi Lotus Garland Arch'],
    ugadi:       ['tamil_courtyard', 'sunrise', 'Neem & Mango', ['#16a34a','#eab308','#423618','#d8c3a5','#fdba74'], 'wood', 'plaster', 'petals', 'Six-Taste Ugadi Pachadi Kalash'],
    vishu:       ['nalukettu', 'sunrise', 'Kani Gold', ['#facc15','#16a34a','#473816','#dfd3b8','#fde047'], 'wood', 'plaster', 'sparks', 'Golden Konna & Brass Uruli Kani'],
    varamahalakshmi: ['tamil_courtyard', 'morning', 'Varamahalakshmi Gold', ['#be185d','#fbbf24','#4a152e','#d8c3a5','#fdba74'], 'marble', 'plaster', 'petals', 'Silk-Draped Varamahalakshmi Kalasha'],
    yugadi:          ['nalukettu', 'sunrise', 'Bevu-Bella Dawn', ['#15803d','#eab308','#3b2f14','#d8c3a5','#fdba74'], 'wood', 'plaster', 'petals', 'Mango Torana & Bevu-Bella Kalash'],
    makarsankranti_ka: ['tamil_courtyard', 'day', 'Suggi Harvest', ['#d97706','#16a34a','#523614','#d4b483','#7dd3fc'], 'stone', 'plaster', 'sparks', 'Ellu-Bella & Sugarcane Mandapa'],
    hampi:           ['temple_sanctum', 'night', 'Vijayanagara Glow', ['#b45309','#fbbf24','#3a2414','#a8a29e','#090412'], 'stone', 'stone', 'sparks', 'Hampi Stone Chariot Miniature'],
    gowrihabba:      ['tamil_courtyard', 'morning', 'Swarna Gowri', ['#d97706','#15803d','#4a2511','#e2d4b7','#fde68a'], 'wood', 'plaster', 'petals', 'Swarna Gowri Mantapa & Bagina']
  };

  const HOME_DATA = {};
  Object.keys(RAW_HOMES).forEach(id => {
    const r = RAW_HOMES[id];
    HOME_DATA[id] = {
      id, arch: ARCH_PRESETS[r[0]], timeOfDay: r[1], lightingMood: r[2],
      palette: { primary: r[3][0], secondary: r[3][1], wall: r[3][2], floor: r[3][3], sky: r[3][4] },
      floorMat: r[4], wallMat: r[5], heroProps: r[6], ambientEffects: r[7],
      items: makeItems(r[8])
    };
  });

  Object.keys(EXTRA_META).forEach(id => {
    const m = EXTRA_META[id];
    const g = (window.G$ && window.G$[id]) || { name: id.toUpperCase(), food: [], rituals: [] };
    const c1 = m[3][0], c2 = m[3][1];
    const fDish = (g.food && g.food[0] && g.food[0][1]) || (g.name + ' Prasad');
    const rName = (g.rituals && g.rituals[0] && g.rituals[0][1]) || m[7];
    HOME_DATA[id] = {
      id, arch: ARCH_PRESETS[m[0]], timeOfDay: m[1], lightingMood: m[2],
      palette: { primary: c1, secondary: c2, wall: m[3][2], floor: m[3][3], sky: m[3][4] },
      floorMat: m[4], wallMat: m[5], heroProps: [m[7]], ambientEffects: [m[6], 'sparks'],
      items: makeItems([
        [id + '_hero', m[7], 45, 'idol', c1, 1.15],
        [id + '_lamp_l', 'Ceremonial Brass Lamp (L)', 25, 'lamp', '#fbbf24'],
        [id + '_lamp_r', 'Ceremonial Brass Lamp (R)', 25, 'lamp', '#fbbf24'],
        [id + '_floor', g.name + ' Floor Mandala', 35, 'rangoli', c2, 1.2],
        [id + '_kalash', rName + ' Vessel', 25, 'kalash', c1],
        [id + '_feast', fDish + ' Platter', 20, 'feast', '#fde68a'],
        [id + '_toran', g.name + ' Floral Arch Toran', 20, 'toran', c2],
        [id + '_lantern', 'Hanging Sanctum Lantern', 35, 'lantern', c1]
      ])
    };
  });

  window.HOME_DATA = HOME_DATA;

  // ---- PERSISTENCE HELPERS ----
  function getStore(fid) {
    if (typeof S === 'undefined') window.S = { coins: 100, f: {}, done: {} };
    S.f = S.f || {};
    S.f[fid] = S.f[fid] || { done: {}, owned: [], house: [] };
    S.f[fid].home3d = S.f[fid].home3d || { owned: [], placed: [], rewarded: false };
    return S.f[fid].home3d;
  }

  function saveState() {
    try { if (typeof window.saveProgress === 'function') window.saveProgress(); } catch (e) {}
  }

  function playChime(freq) {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      const ctx = new AC();
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'triangle';
      o.frequency.setValueAtTime(freq || 587.33, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime((freq || 587.33) * 1.5, ctx.currentTime + 0.18);
      g.gain.setValueAtTime(0.18, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      o.connect(g); g.connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + 0.36);
    } catch (e) {}
  }

  // ---- LAZY LOAD THREE.JS ----
  let threePromise = null;
  function loadThree() {
    if (window.THREE) return Promise.resolve(window.THREE);
    if (threePromise) return threePromise;
    threePromise = new Promise((resolve, reject) => {
      const sc = document.createElement('script');
      sc.src = THREE_CDN;
      sc.onload = () => window.THREE ? resolve(window.THREE) : reject(new Error('THREE missing'));
      sc.onerror = () => reject(new Error('Failed to load Three.js CDN'));
      document.head.appendChild(sc);
    });
    return threePromise;
  }

  // ---- PROCEDURAL PBR TEXTURES ----
  function makeNoiseTex(THREE, kind, baseHex) {
    const cv = document.createElement('canvas');
    cv.width = 256; cv.height = 256;
    const ctx = cv.getContext('2d');
    ctx.fillStyle = baseHex || '#7c5a3a';
    ctx.fillRect(0, 0, 256, 256);
    if (kind === 'wood') {
      for (let y = 0; y < 256; y += 3) {
        ctx.fillStyle = 'rgba(0,0,0,' + (0.04 + Math.random() * 0.09) + ')';
        ctx.fillRect(0, y, 256, 1 + Math.random() * 2);
      }
    } else if (kind === 'marble' || kind === 'stone') {
      for (let i = 0; i < 400; i++) {
        ctx.fillStyle = i % 2 ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)';
        ctx.fillRect(Math.random() * 256, Math.random() * 256, 4 + Math.random() * 14, 2 + Math.random() * 6);
      }
    } else {
      for (let i = 0; i < 900; i++) {
        ctx.fillStyle = i % 2 ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)';
        ctx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
      }
    }
    const tex = new THREE.CanvasTexture(cv);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(3, 3);
    return tex;
  }

  // ---- PROCEDURAL 3D PROP GEOMETRY BUILDER ----
  function buildPropMesh(THREE, shape, colorHex, isGhost) {
    const grp = new THREE.Group();
    const matMain = isGhost
      ? new THREE.MeshStandardMaterial({ color: colorHex, emissive: colorHex, emissiveIntensity: 0.7, transparent: true, opacity: 0.28, wireframe: false })
      : new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.35, metalness: (shape === 'lamp' || shape === 'kalash' || shape === 'lantern') ? 0.75 : 0.2 });
    const goldMat = isGhost ? matMain : new THREE.MeshStandardMaterial({ color: '#fbbf24', roughness: 0.25, metalness: 0.85 });
    const flameMat = isGhost ? matMain : new THREE.MeshBasicMaterial({ color: '#fef08a' });

    if (shape === 'lamp' || shape === 'kalash' || shape === 'pot') {
      const pts = shape === 'lamp'
        ? [new THREE.Vector2(0, 0), new THREE.Vector2(0.24, 0), new THREE.Vector2(0.06, 0.2), new THREE.Vector2(0.05, 0.7), new THREE.Vector2(0.22, 0.78), new THREE.Vector2(0.04, 0.9), new THREE.Vector2(0, 0.95)]
        : [new THREE.Vector2(0, 0), new THREE.Vector2(0.22, 0), new THREE.Vector2(0.32, 0.28), new THREE.Vector2(0.18, 0.55), new THREE.Vector2(0.24, 0.65), new THREE.Vector2(0, 0.65)];
      const lathe = new THREE.Mesh(new THREE.LatheGeometry(pts, 20), matMain);
      lathe.castShadow = !isGhost;
      grp.add(lathe);
      if (shape === 'lamp' && !isGhost) {
        const fl = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.16, 10), flameMat);
        fl.position.y = 1.02;
        fl.userData.isFlame = true;
        grp.add(fl);
      }
      if (shape === 'kalash') {
        const coco = new THREE.Mesh(new THREE.SphereGeometry(0.14, 14, 12), isGhost ? matMain : new THREE.MeshStandardMaterial({ color: '#78350f', roughness: 0.85 }));
        coco.position.y = 0.72;
        grp.add(coco);
      }
    } else if (shape === 'rangoli') {
      const disc1 = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, 0.03, 32), matMain);
      const disc2 = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.68, 0.045, 24), goldMat);
      const disc3 = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.06, 16), isGhost ? matMain : new THREE.MeshStandardMaterial({ color: '#ec4899', roughness: 0.5 }));
      grp.add(disc1, disc2, disc3);
    } else if (shape === 'toran') {
      for (let i = -4; i <= 4; i++) {
        const x = i * 0.34;
        const y = -0.18 * Math.cos((i / 4) * 1.1);
        const bead = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 10), i % 2 === 0 ? matMain : goldMat);
        bead.position.set(x, y, 0);
        grp.add(bead);
      }
    } else if (shape === 'lantern') {
      const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.65, 8), goldMat);
      cord.position.y = 0.45;
      const body = new THREE.Mesh(new THREE.OctahedronGeometry(0.28, 0), matMain);
      const core = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 10), flameMat);
      grp.add(cord, body, core);
    } else if (shape === 'tree') {
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.14, 0.4, 10), isGhost ? matMain : new THREE.MeshStandardMaterial({ color: '#78350f', roughness: 0.9 }));
      trunk.position.y = 0.2;
      const c1 = new THREE.Mesh(new THREE.ConeGeometry(0.65, 0.8, 16), matMain); c1.position.y = 0.7;
      const c2 = new THREE.Mesh(new THREE.ConeGeometry(0.48, 0.7, 16), matMain); c2.position.y = 1.15;
      const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.11, 0), goldMat); star.position.y = 1.56;
      grp.add(trunk, c1, c2, star);
    } else if (shape === 'bonfire') {
      for (let i = 0; i < 4; i++) {
        const log = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.8, 8), isGhost ? matMain : new THREE.MeshStandardMaterial({ color: '#5c2d16', roughness: 0.9 }));
        log.position.y = 0.08;
        log.rotation.z = Math.PI / 2.2;
        log.rotation.y = (i * Math.PI) / 4;
        grp.add(log);
      }
      const fl = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.65, 12), flameMat);
      fl.position.y = 0.42; fl.userData.isFlame = true;
      grp.add(fl);
    } else if (shape === 'drum') {
      const d = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.2, 0.52, 18), matMain);
      d.rotation.z = Math.PI / 2; d.position.y = 0.28;
      grp.add(d);
    } else if (shape === 'feast') {
      const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.36, 0.04, 24), goldMat);
      grp.add(plate);
      for (let k = 0; k < 5; k++) {
        const a = (k / 5) * Math.PI * 2;
        const sweet = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), matMain);
        sweet.position.set(Math.cos(a) * 0.18, 0.08, Math.sin(a) * 0.18);
        grp.add(sweet);
      }
    } else {
      // 'idol', 'swing', 'flag' - sculpted pedestal + sacred form
      const ped = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.38, 0.22, 16), goldMat);
      ped.position.y = 0.11;
      const body = new THREE.Mesh(new THREE.ConeGeometry(0.26, 0.62, 16), matMain);
      body.position.y = 0.52;
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 14), matMain);
      head.position.y = 0.92;
      const halo = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.03, 8, 24), goldMat);
      halo.position.y = 0.92;
      grp.add(ped, body, head, halo);
    }
    grp.traverse(obj => { if (obj.isMesh && !isGhost) { obj.castShadow = true; obj.receiveShadow = true; } });
    return grp;
  }

  // ---- ACTIVE SCENE CONTROLLER ----
  let activeCtrl = null;
  function disposeActive() {
    if (!activeCtrl) return;
    try { activeCtrl.cleanup(); } catch (e) {}
    activeCtrl = null;
  }

  function mount3D(container, festId) {
    disposeActive();
    const data = HOME_DATA[festId] || HOME_DATA.ganesh;
    const store = getStore(festId);
    const THREE = window.THREE;
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
    } catch (e) {
      render2DFallback(container, data, store);
      return;
    }

    const w = container.clientWidth || 760;
    const h = 440;
    const isLowEnd = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isLowEnd ? 1.5 : 2));
    renderer.setSize(w, h);
    renderer.shadowMap.enabled = !isLowEnd;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    if (THREE.SRGBColorSpace) renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.innerHTML = '';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = h + 'px';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.borderRadius = '18px';
    renderer.domElement.style.touchAction = 'none';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(data.palette.sky);
    scene.fog = new THREE.FogExp2(data.palette.sky, 0.045);

    const camera = new THREE.PerspectiveCamera(46, w / h, 0.1, 60);
    let camTheta = 0, camPhi = 1.15, camRadius = 7.4;
    let targetTheta = 0, targetPhi = 1.15, targetRadius = 7.4;
    let revealing = false, revealTimer = 0;

    // Lighting
    const hemi = new THREE.HemisphereLight(data.palette.primary, data.palette.wall, data.timeOfDay === 'night' ? 0.55 : 1.05);
    scene.add(hemi);

    const keyLight = new THREE.DirectionalLight(data.timeOfDay === 'night' ? '#93c5fd' : '#fff3d6', data.timeOfDay === 'night' ? 0.85 : 1.7);
    keyLight.position.set(4.5, 7.5, 5.5);
    keyLight.castShadow = !isLowEnd;
    keyLight.shadow.mapSize.set(1024, 1024);
    scene.add(keyLight);

    const altarLight = new THREE.PointLight(data.palette.primary, 2.2, 9);
    altarLight.position.set(0, 2.6, -2.4);
    scene.add(altarLight);

    // ---- UNIQUE FESTIVAL-SPECIFIC 3D ARCHITECTURE & ATMOSPHERE ----
    const disposables = [];
    const floorTex = makeNoiseTex(THREE, data.floorMat, data.palette.floor);
    const wallTex = makeNoiseTex(THREE, data.wallMat, data.palette.wall);
    disposables.push(floorTex, wallTex);

    const archType = (data.arch && data.arch.roof) || 'courtyard';
    const pillarStyle = (data.arch && data.arch.pillars) || 'stone';
    const isOpenSky = (archType === 'open_sky' || archType === 'open_courtyard' || pillarStyle === 'sandstone_step');
    const isGhat = (pillarStyle === 'sandstone_step');
    const isTent = (archType === 'tent_drape');
    const isMonastery = (pillarStyle === 'painted_wood');
    const isTemple = (pillarStyle === 'carved_stone');
    const isBamboo = (pillarStyle === 'bamboo');
    const isPalace = (pillarStyle === 'gilded_pillar');
    const isNalukettu = (pillarStyle === 'teakwood');
    const isPandal = (pillarStyle === 'bamboo_drape');
    const isGoan = (pillarStyle === 'laterite_wood');

    // Sky Celestial Elements (Moon / Sun / Stars)
    if (data.timeOfDay === 'night') {
      const starGeo = new THREE.BufferGeometry();
      const sPos = new Float32Array(90 * 3);
      for (let i = 0; i < 90; i++) {
        sPos[i * 3] = (Math.random() - 0.5) * 26;
        sPos[i * 3 + 1] = 3.5 + Math.random() * 8;
        sPos[i * 3 + 2] = -7 - Math.random() * 10;
      }
      starGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
      const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: '#fef9c3', size: 0.09, transparent: true, opacity: 0.85 }));
      scene.add(stars);
      if (festId === 'eid' || festId === 'karwachauth' || festId === 'shivaratri' || festId === 'rann') {
        const moon = new THREE.Mesh(new THREE.SphereGeometry(0.65, 16, 14), new THREE.MeshBasicMaterial({ color: '#fef08a' }));
        moon.position.set(3.2, 5.4, -9.5);
        scene.add(moon);
      }
    } else if (data.timeOfDay === 'sunrise' || data.timeOfDay === 'dawn') {
      const sun = new THREE.Mesh(new THREE.SphereGeometry(0.85, 16, 14), new THREE.MeshBasicMaterial({ color: '#fdba74' }));
      sun.position.set(-2.8, 4.4, -10.5);
      scene.add(sun);
    }

    // Floor
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(11.5, 11.5),
      new THREE.MeshStandardMaterial({ map: floorTex, bumpMap: floorTex, bumpScale: 0.04, roughness: data.floorMat === 'marble' ? 0.22 : 0.8, metalness: data.floorMat === 'marble' ? 0.1 : 0.04 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Royal crimson carpet for Palace / Pandal / Eid
    if (isPalace || isPandal || festId === 'eid') {
      const carpet = new THREE.Mesh(
        new THREE.BoxGeometry(2.1, 0.025, 6.8),
        new THREE.MeshStandardMaterial({ color: festId === 'eid' ? '#059669' : '#991b1b', roughness: 0.85 })
      );
      carpet.position.set(0, 0.015, 0.1);
      carpet.receiveShadow = true;
      scene.add(carpet);
    }

    // Ghat Water Plane for River Festivals
    if (isGhat) {
      const water = new THREE.Mesh(
        new THREE.PlaneGeometry(24, 12),
        new THREE.MeshStandardMaterial({ color: '#0369a1', roughness: 0.15, metalness: 0.55 })
      );
      water.rotation.x = -Math.PI / 2;
      water.position.set(0, -0.18, -10);
      scene.add(water);
      for (let st = 0; st < 3; st++) {
        const step = new THREE.Mesh(new THREE.BoxGeometry(11, 0.18, 0.8), new THREE.MeshStandardMaterial({ color: data.palette.wall, roughness: 0.8 }));
        step.position.set(0, 0.09 + st * 0.16, -4.6 + st * 0.45);
        scene.add(step);
      }
    }

    // Walls (height adapts to open courtyard vs enclosed mandapa/tent/villa)
    const wallMat = new THREE.MeshStandardMaterial({ map: wallTex, bumpMap: wallTex, bumpScale: 0.03, roughness: 0.82 });
    const wallH = isOpenSky ? 1.55 : (isGhat ? 0.9 : 4.5);
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(10.8, wallH, 0.35), wallMat);
    backWall.position.set(0, wallH / 2, -4.0); backWall.receiveShadow = true;
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.35, wallH, 9.2), wallMat);
    leftWall.position.set(-5.2, wallH / 2, 0.4); leftWall.receiveShadow = true;
    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.35, wallH, 9.2), wallMat);
    rightWall.position.set(5.2, wallH / 2, 0.4); rightWall.receiveShadow = true;
    scene.add(backWall, leftWall, rightWall);

    // Distinct Pillars & Overhead Architecture
    const pillarMat = new THREE.MeshStandardMaterial({
      color: data.palette.secondary,
      roughness: isPalace ? 0.25 : (isBamboo ? 0.75 : 0.45),
      metalness: isPalace ? 0.75 : 0.18
    });
    const trimMat = new THREE.MeshStandardMaterial({ color: data.palette.primary, roughness: 0.3, metalness: 0.65 });
    const pillarX = isTent ? [-3.8, 3.8] : [-3.3, -1.65, 1.65, 3.3];
    const pilH = isGhat ? 3.2 : 4.2;
    pillarX.forEach(px => {
      const pilGeo = (isNalukettu || isTemple)
        ? new THREE.BoxGeometry(0.34, pilH, 0.34)
        : (isBamboo ? new THREE.CylinderGeometry(0.1, 0.12, pilH, 8) : new THREE.CylinderGeometry(0.16, 0.21, pilH, 12));
      const pil = new THREE.Mesh(pilGeo, pillarMat);
      pil.position.set(px, pilH / 2, -3.35);
      pil.castShadow = true;
      scene.add(pil);
      if (isPalace || isTemple) {
        const cap = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.22, 0.48), trimMat);
        cap.position.set(px, pilH - 0.1, -3.35);
        scene.add(cap);
      }
    });

    const palaceBulbs = [];
    const prayerFlags = [];

    if (isTent) {
      // Scalloped Desert Tent Canopy
      const canopy = new THREE.Mesh(new THREE.ConeGeometry(6.2, 1.8, 8, 1, true), new THREE.MeshStandardMaterial({ color: data.palette.primary, side: THREE.DoubleSide, roughness: 0.75 }));
      canopy.position.set(0, 4.9, -0.5);
      scene.add(canopy);
    } else if (isNalukettu || isBamboo) {
      // Sloped Terracotta / Thatch Eaves
      const roofEave = new THREE.Mesh(new THREE.BoxGeometry(9.2, 0.25, 1.6), new THREE.MeshStandardMaterial({ color: isBamboo ? '#a16207' : '#9a3412', roughness: 0.85 }));
      roofEave.position.set(0, 4.25, -3.2);
      roofEave.rotation.x = 0.25;
      scene.add(roofEave);
    } else if (isTemple) {
      // Stepped Gopuram / Shikhara Backdrop
      for (let t = 0; t < 3; t++) {
        const tier = new THREE.Mesh(new THREE.BoxGeometry(4.4 - t * 1.1, 0.55, 0.6), pillarMat);
        tier.position.set(0, 4.1 + t * 0.55, -3.55);
        scene.add(tier);
      }
    } else if (isMonastery) {
      // Tibetan Monastery Beam + Fluttering Prayer Flags
      const beam = new THREE.Mesh(new THREE.BoxGeometry(7.4, 0.35, 0.5), trimMat);
      beam.position.set(0, 4.05, -3.35);
      scene.add(beam);
      const flagColors = ['#2563eb', '#f8fafc', '#dc2626', '#16a34a', '#eab308'];
      for (let fi = -4; fi <= 4; fi++) {
        const flg = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.34), new THREE.MeshStandardMaterial({ color: flagColors[(fi + 4) % 5], side: THREE.DoubleSide }));
        flg.position.set(fi * 0.7, 3.65 - Math.cos(fi * 0.3) * 0.2, -2.9);
        scene.add(flg);
        prayerFlags.push(flg);
      }
    } else {
      const archBar = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.34, 0.5), pillarMat);
      archBar.position.set(0, 4.05, -3.35);
      scene.add(archBar);
      if (isPalace || festId === 'hampi' || festId === 'diwali') {
        for (let bi = -6; bi <= 6; bi++) {
          const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.065, 8, 8), new THREE.MeshBasicMaterial({ color: '#fde047' }));
          bulb.position.set(bi * 0.55, 3.84, -3.1);
          scene.add(bulb);
          palaceBulbs.push(bulb);
        }
      }
    }

    if (isGoan) {
      const hearth = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.1, 0.6), new THREE.MeshStandardMaterial({ color: '#7c2d12', roughness: 0.9 }));
      hearth.position.set(-3.6, 0.55, -3.45);
      scene.add(hearth);
    }

    // Center Altar / Chowki Platform
    const altar = new THREE.Mesh(
      new THREE.BoxGeometry(isPalace ? 2.8 : 2.3, isGhat ? 0.55 : 0.88, 1.3),
      new THREE.MeshStandardMaterial({ color: isTemple ? '#57534e' : (isPalace ? '#78350f' : '#5c2d16'), map: floorTex, roughness: 0.52 })
    );
    altar.position.set(0, isGhat ? 0.28 : 0.44, -3.15);
    altar.castShadow = true; altar.receiveShadow = true;
    scene.add(altar);

    // Ambient Particles (petals, sparks, snow, steam/smoke)
    const pCount = isLowEnd ? 35 : 75;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 7.8;
      pPos[i * 3 + 1] = Math.random() * 4.4;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 6.2;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const effList = Array.isArray(data.ambientEffects) ? data.ambientEffects : [data.ambientEffects || 'petals'];
    const isSnow = effList.includes('snow');
    const isRise = effList.includes('smoke') || effList.includes('fireworks') || effList.includes('sparks');
    const pColor = isSnow ? '#ffffff' : (festId === 'holi' ? '#ec4899' : data.palette.primary);
    const pMat = new THREE.PointsMaterial({ color: pColor, size: isSnow ? 0.09 : 0.085, transparent: true, opacity: 0.82 });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Ghost Slots & Placed Items
    const ghostMeshes = {};
    const placedMeshes = {};
    const flames = [];

    function syncItems() {
      data.items.forEach(item => {
        const isPlaced = store.placed.includes(item.id);
        if (ghostMeshes[item.id]) ghostMeshes[item.id].visible = !isPlaced;
        if (isPlaced && !placedMeshes[item.id]) {
          const mesh = buildPropMesh(THREE, item.shape, item.color, false);
          mesh.position.set(item.slot[0], item.slot[1], item.slot[2]);
          mesh.scale.setScalar(item.scale || 1);
          mesh.traverse(o => { if (o.userData && o.userData.isFlame) flames.push(o); });
          scene.add(mesh);
          placedMeshes[item.id] = mesh;
        }
      });
    }

    data.items.forEach(item => {
      const ghost = buildPropMesh(THREE, item.shape, '#38bdf8', true);
      ghost.position.set(item.slot[0], item.slot[1], item.slot[2]);
      ghost.scale.setScalar(item.scale || 1);
      ghost.userData = { slotItemId: item.id, slotName: item.name };
      ghost.traverse(o => { o.userData.slotItemId = item.id; });
      scene.add(ghost);
      ghostMeshes[item.id] = ghost;
    });
    syncItems();

    // Pointer Orbit, Pinch Zoom & Raycasting
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let downX = 0, downY = 0, dragging = false;

    const onPointerDown = (e) => {
      dragging = true; downX = e.clientX; downY = e.clientY;
    };
    const onPointerMove = (e) => {
      if (!dragging) return;
      targetTheta -= (e.clientX - downX) * 0.006;
      targetPhi = Math.max(0.55, Math.min(1.42, targetPhi - (e.clientY - downY) * 0.004));
      downX = e.clientX; downY = e.clientY;
    };
    const onPointerUp = (e) => {
      const moved = Math.hypot(e.clientX - downX, e.clientY - downY);
      dragging = false;
      if (moved > 8) return;
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const visibleGhosts = Object.values(ghostMeshes).filter(g => g.visible);
      const hits = raycaster.intersectObjects(visibleGhosts, true);
      if (hits.length > 0) {
        const hitId = hits[0].object.userData.slotItemId;
        if (window._home3dSelected) {
          if (window._home3dSelected === hitId) {
            placeItem(festId, hitId);
          } else {
            setFeedback('That belongs in a different spot! Tap the glowing spot for the selected item.', false);
          }
        } else {
          // Direct tap on ghost slot selects or places if already owned
          if (store.owned.includes(hitId)) placeItem(festId, hitId);
          else buyAndPlaceItem(festId, hitId);
        }
      }
    };
    const onWheel = (e) => {
      e.preventDefault();
      targetRadius = Math.max(4.5, Math.min(10.5, targetRadius + e.deltaY * 0.004));
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('wheel', onWheel, { passive: false });

    const onResize = () => {
      if (!container.isConnected) return;
      const nw = container.clientWidth || 760;
      camera.aspect = nw / h;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, h);
    };
    window.addEventListener('resize', onResize);

    let rafId = 0, clock = 0, tabHidden = false;
    const onVis = () => { tabHidden = document.hidden; };
    document.addEventListener('visibilitychange', onVis);
    const animate = () => {
      if (!container.isConnected) { disposeActive(); return; }
      if (tabHidden) { rafId = requestAnimationFrame(animate); return; }
      clock += 0.016;
      if (revealing) {
        revealTimer += 0.016;
        targetTheta += 0.018;
        if (revealTimer > 3.2) revealing = false;
      } else if (!dragging && !reducedMotion) {
        targetTheta += 0.0018;
      }
      camTheta += (targetTheta - camTheta) * 0.08;
      camPhi += (targetPhi - camPhi) * 0.08;
      camRadius += (targetRadius - camRadius) * 0.08;

      camera.position.set(
        Math.sin(camTheta) * Math.sin(camPhi) * camRadius,
        Math.cos(camPhi) * camRadius + 0.6,
        Math.cos(camTheta) * Math.sin(camPhi) * camRadius
      );
      camera.lookAt(0, 1.15, -1.2);

      // Flicker lights & animate particles
      if (!reducedMotion) {
        altarLight.intensity = 2.0 + Math.sin(clock * 9) * 0.25;
        flames.forEach((fl, idx) => { fl.scale.y = 0.85 + Math.sin(clock * 14 + idx) * 0.22; });
        const posArr = pGeo.attributes.position.array;
        for (let i = 0; i < pCount; i++) {
          posArr[i * 3 + 1] -= 0.012;
          if (posArr[i * 3 + 1] < 0) posArr[i * 3 + 1] = 4.1;
        }
        pGeo.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    activeCtrl = {
      syncItems,
      triggerReveal: () => { revealing = true; revealTimer = 0; targetRadius = 6.2; },
      capturePng: () => {
        renderer.render(scene, camera);
        return renderer.domElement.toDataURL('image/png');
      },
      cleanup: () => {
        cancelAnimationFrame(rafId);
        renderer.domElement.removeEventListener('pointerdown', onPointerDown);
        renderer.domElement.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        renderer.domElement.removeEventListener('wheel', onWheel);
        window.removeEventListener('resize', onResize);
        document.removeEventListener('visibilitychange', onVis);
        scene.traverse(obj => {
          if (obj.geometry) try { obj.geometry.dispose(); } catch (e) {}
          if (obj.material) {
            const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
            mats.forEach(m => { try { m.dispose(); } catch (e) {} });
          }
        });
        scene.traverse(obj => {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
            else obj.material.dispose();
          }
        });
        disposables.forEach(t => t.dispose());
        renderer.dispose();
      }
    };
  }

  function render2DFallback(container, data, store) {
    container.innerHTML = `<div style="padding:28px;text-align:center;background:linear-gradient(135deg,${data.palette.wall},${data.palette.floor});border-radius:18px;border:2px solid ${data.palette.primary};color:#fff;">
      <h3>${data.arch.roomType} (2D Fallback Mode)</h3>
      <p>WebGL 3D is unavailable on this device. You can still buy and place all 8 items below!</p>
      <div>Decorated: <b>${store.placed.length}/8</b></div>
    </div>`;
  }

  function setFeedback(msg, ok) {
    const el = document.getElementById('h3d-msg');
    if (el) { el.textContent = msg; el.style.color = ok ? '#34d399' : '#fca5a5'; }
  }

  function buyAndPlaceItem(fid, itemId) {
    const data = HOME_DATA[fid] || HOME_DATA.ganesh;
    const item = data.items.find(x => x.id === itemId);
    if (!item) return;
    const store = getStore(fid);

    if (!store.owned.includes(itemId)) {
      if ((S.coins || 0) < item.price) {
        setFeedback('Not enough coins! Need ' + item.price + ' coins. Play Games to earn more!', false);
        return;
      }
      S.coins -= item.price;
      store.owned.push(itemId);
      saveState();
      const cEl = document.getElementById('coins');
      if (cEl) cEl.textContent = '🪙 ' + S.coins + ' Festora Coins';
    }
    placeItem(fid, itemId);
  }

  function placeItem(fid, itemId) {
    const data = HOME_DATA[fid] || HOME_DATA.ganesh;
    const item = data.items.find(x => x.id === itemId);
    const store = getStore(fid);
    if (!item || store.placed.includes(itemId)) return;
    store.placed.push(itemId);
    window._home3dSelected = null;
    playChime(659.25);
    saveState();
    if (activeCtrl) activeCtrl.syncItems();
    updateShopUI(fid);

    if (store.placed.length >= 8) {
      if (!store.rewarded) {
        store.rewarded = true;
        if (typeof window.addCoins === 'function') window.addCoins(150, data.id + ' 3D Home Complete');
        if (typeof window.mark === 'function') window.mark('house');
        saveState();
      }
      playChime(880);
      if (activeCtrl) activeCtrl.triggerReveal();
      setTimeout(() => showFinalSnapshot(fid), 3300);
    }
  }

  function showFinalSnapshot(fid) {
    const snapEl = document.getElementById('h3d-final');
    if (!snapEl) return;
    const pngUrl = activeCtrl ? activeCtrl.capturePng() : '';
    const g = (typeof window.getFestivalData === 'function') ? window.getFestivalData() : { name: fid };
    snapEl.style.display = 'block';
    snapEl.innerHTML = `
      <div style="background:#181410;border:2px solid #fbbf24;border-radius:18px;padding:20px;text-align:center;margin-top:16px;color:#fff;">
        <h3 style="margin:0 0 8px;color:#fbbf24;">🎉 Your Decorated ${g.name} 3D Home!</h3>
        ${pngUrl ? `<img src="${pngUrl}" alt="Decorated Home" style="width:100%;max-width:560px;border-radius:12px;border:1px solid #fbbf2455;margin:10px auto;display:block;">` : ''}
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:12px;">
          ${pngUrl ? `<a href="${pngUrl}" download="festora-${fid}-home.png"><button type="button" style="background:linear-gradient(135deg,#f59e0b,#d97706);color:#18181b;">📥 Download PNG</button></a>` : ''}
          <button type="button" class="alt" onclick="if(navigator.share){navigator.share({title:'My Festora ${g.name} Home',text:'I decorated my 3D ${g.name} festival home on Festora!'}).catch(()=>{});}else{alert('Download the PNG to share your decorated home!');}">📤 Share</button>
        </div>
      </div>
    `;
  }

  function updateShopUI(fid) {
    const data = HOME_DATA[fid] || HOME_DATA.ganesh;
    const store = getStore(fid);
    const prog = document.getElementById('h3d-prog');
    if (prog) prog.textContent = 'Decorated ' + store.placed.length + '/8';
    const bar = document.getElementById('h3d-bar');
    if (bar) bar.style.width = Math.round((store.placed.length / 8) * 100) + '%';
    const list = document.getElementById('h3d-shop');
    if (!list) return;
    list.innerHTML = data.items.map(it => {
      const placed = store.placed.includes(it.id);
      const owned = store.owned.includes(it.id);
      const sel = window._home3dSelected === it.id;
      return `<button type="button" ${placed ? 'disabled' : ''} onclick="window.Home3D._onShopClick('${fid}','${it.id}')" style="text-align:left;padding:10px 12px;border-radius:12px;background:${placed ? '#10b98122' : (sel ? '#f59e0b33' : '#261e16')};border:1.5px solid ${placed ? '#10b981' : (sel ? '#fbbf24' : '#ffffff22')};color:#fff;cursor:${placed ? 'default' : 'pointer'};min-width:170px;flex:1 1 170px;">
        <div style="font-weight:700;font-size:0.88rem;">${placed ? '✅ ' : ''}${it.name}</div>
        <div style="font-size:0.78rem;color:#fbbf24;margin-top:3px;">${placed ? 'Placed in 3D room' : (owned ? 'Tap to place' : '🪙 ' + it.price + ' coins · Buy & Place')}</div>
      </button>`;
    }).join('');
  }

  window.renderFestivalHome = function () {
    const fid = window.cur || 'ganesh';
    const data = HOME_DATA[fid] || HOME_DATA.ganesh;
    const g = (typeof window.getFestivalData === 'function') ? window.getFestivalData() : { name: fid, e: '🪔' };
    const store = getStore(fid);

    setTimeout(() => {
      const cvWrap = document.getElementById('h3d-canvas-wrap');
      if (!cvWrap) return;
      loadThree()
        .then(() => mount3D(cvWrap, fid))
        .catch(() => render2DFallback(cvWrap, data, store));
      updateShopUI(fid);
      if (store.placed.length >= 8) setTimeout(() => showFinalSnapshot(fid), 300);
    }, 20);

    return `
      <div style="max-width:980px;margin:0 auto;padding-bottom:30px;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
          <div>
            <h2 style="margin:0;">${g.e} ${g.name} · ${data.arch.roomType} (3D)</h2>
            <small style="color:var(--mut);">Drag to orbit · Scroll/Pinch to zoom · Buy missing items &amp; tap glowing spots (or click Shop buttons)</small>
          </div>
          <div style="display:flex;gap:8px;align-items:center;">
            <span id="h3d-prog" style="background:#f59e0b;color:#18181b;font-weight:800;padding:6px 14px;border-radius:16px;font-size:0.86rem;">Decorated ${store.placed.length}/8</span>
            <button type="button" class="alt" onclick="window.Home3D.exit()">← Back</button>
          </div>
        </div>
        <div style="height:8px;background:#2a2018;border-radius:6px;overflow:hidden;margin-bottom:12px;"><div id="h3d-bar" style="height:100%;width:${Math.round((store.placed.length / 8) * 100)}%;background:linear-gradient(90deg,#f59e0b,#10b981);transition:width .3s;"></div></div>
        <div id="h3d-canvas-wrap" style="width:100%;min-height:440px;background:#120d0a;border-radius:18px;border:2px solid ${data.palette.primary};display:flex;align-items:center;justify-content:center;color:#fde68a;">Loading 3D ${data.arch.roomType}...</div>
        <div id="h3d-msg" style="min-height:1.4em;text-align:center;font-weight:700;margin:8px 0;"></div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin:8px 0;">
          <b>🛍️ Missing Festival Items Shop</b>
          <a href="#Games" onclick="window.Home3D.exitToGames();return false;" style="color:#f59e0b;font-size:0.85rem;font-weight:700;">Need more coins? Play Games →</a>
        </div>
        <div id="h3d-shop" style="display:flex;flex-wrap:wrap;gap:10px;"></div>
        <div id="h3d-final" style="display:none;"></div>
      </div>
    `;
  };

  window.Home3D = {
    _v3: true,
    open: function (fid) {
      if (fid) { window.cur = fid; try { cur = fid; } catch (e) {} }
      if (typeof window.go === 'function') window.go('My Home');
    },
    exit: function () {
      disposeActive();
      if (typeof window.go === 'function') window.go('Overview');
    },
    exitToGames: function () {
      disposeActive();
      if (typeof window.go === 'function') window.go('Games');
    },
    _onShopClick: function (fid, itemId) {
      window._home3dSelected = itemId;
      buyAndPlaceItem(fid, itemId);
    }
  };
})();
