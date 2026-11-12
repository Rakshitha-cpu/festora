// Festora Knowledge Graph seed script (v2 -- 62 entities across 15 states)
// Run: docker cp graph/seed.cypher festora_neo4j:/seed.cypher
//      docker exec -i festora_neo4j cypher-shell -u neo4j -p festora123 -f /seed.cypher

CREATE CONSTRAINT entity_id IF NOT EXISTS FOR (e:Entity) REQUIRE e.id IS UNIQUE;

// ---- States / UTs ----
MERGE (karnataka:Entity:State {id:'karnataka', name:'Karnataka'})
MERGE (kerala:Entity:State {id:'kerala', name:'Kerala'})
MERGE (tamilnadu:Entity:State {id:'tamil-nadu', name:'Tamil Nadu'})
MERGE (andhra:Entity:State {id:'andhra-pradesh', name:'Andhra Pradesh'})
MERGE (telangana:Entity:State {id:'telangana', name:'Telangana'})
MERGE (maharashtra:Entity:State {id:'maharashtra', name:'Maharashtra'})
MERGE (bengal:Entity:State {id:'west-bengal', name:'West Bengal'})
MERGE (rajasthan:Entity:State {id:'rajasthan', name:'Rajasthan'})
MERGE (punjab:Entity:State {id:'punjab', name:'Punjab'})
MERGE (gujarat:Entity:State {id:'gujarat', name:'Gujarat'})
MERGE (odisha:Entity:State {id:'odisha', name:'Odisha'})
MERGE (assam:Entity:State {id:'assam', name:'Assam'})
MERGE (nagaland:Entity:State {id:'nagaland', name:'Nagaland'})
MERGE (ladakh:Entity:State {id:'ladakh', name:'Ladakh'})
MERGE (up:Entity:State {id:'uttar-pradesh', name:'Uttar Pradesh'})

// ---- Karnataka ----
MERGE (yakshagana:Entity:PerformingArt {id:'yakshagana', name:'Yakshagana'})
MERGE (bhootakola:Entity:RitualPerformance {id:'bhoota-kola', name:'Bhoota Kola'})
MERGE (dollukunitha:Entity:PerformingArt {id:'dollu-kunitha', name:'Dollu Kunitha'})
MERGE (mysoredasara:Entity:Festival {id:'mysore-dasara', name:'Mysore Dasara'})
MERGE (mysorepalace:Entity:HeritageSite {id:'mysore-palace', name:'Mysore Palace'})
MERGE (ragimudde:Entity:Cuisine {id:'ragi-mudde', name:'Ragi Mudde'})
MERGE (hampi:Entity:HeritageSite {id:'hampi', name:'Hampi'})
MERGE (yakshagana)-[:LOCATED_IN]->(karnataka)
MERGE (bhootakola)-[:LOCATED_IN]->(karnataka)
MERGE (dollukunitha)-[:LOCATED_IN]->(karnataka)
MERGE (mysoredasara)-[:LOCATED_IN]->(karnataka)
MERGE (mysorepalace)-[:LOCATED_IN]->(karnataka)
MERGE (ragimudde)-[:LOCATED_IN]->(karnataka)
MERGE (hampi)-[:LOCATED_IN]->(karnataka)
MERGE (yakshagana)-[:RELATED_TO]->(bhootakola)
MERGE (yakshagana)-[:RELATED_TO]->(dollukunitha)
MERGE (mysoredasara)-[:CELEBRATED_AT]->(mysorepalace)

// ---- Kerala ----
MERGE (kathakali:Entity:PerformingArt {id:'kathakali', name:'Kathakali'})
MERGE (theyyam:Entity:RitualPerformance {id:'theyyam', name:'Theyyam'})
MERGE (onam:Entity:Festival {id:'onam', name:'Onam'})
MERGE (mohiniyattam:Entity:PerformingArt {id:'mohiniyattam', name:'Mohiniyattam'})
MERGE (vallamkali:Entity:Festival {id:'vallam-kali', name:'Vallam Kali'})
MERGE (kathakali)-[:LOCATED_IN]->(kerala)
MERGE (theyyam)-[:LOCATED_IN]->(kerala)
MERGE (onam)-[:LOCATED_IN]->(kerala)
MERGE (mohiniyattam)-[:LOCATED_IN]->(kerala)
MERGE (vallamkali)-[:LOCATED_IN]->(kerala)
MERGE (kathakali)-[:RELATED_TO]->(theyyam)
MERGE (kathakali)-[:RELATED_TO]->(mohiniyattam)
MERGE (vallamkali)-[:RELATED_TO]->(onam)

// ---- Tamil Nadu ----
MERGE (bharatanatyam:Entity:PerformingArt {id:'bharatanatyam', name:'Bharatanatyam'})
MERGE (pongal:Entity:Festival {id:'pongal', name:'Pongal'})
MERGE (chettinad:Entity:Cuisine {id:'chettinad-cuisine', name:'Chettinad Cuisine'})
MERGE (meenakshi:Entity:HeritageSite {id:'meenakshi-temple', name:'Meenakshi Amman Temple'})
MERGE (jallikattu:Entity:RitualPerformance {id:'jallikattu', name:'Jallikattu'})
MERGE (bharatanatyam)-[:LOCATED_IN]->(tamilnadu)
MERGE (pongal)-[:LOCATED_IN]->(tamilnadu)
MERGE (chettinad)-[:LOCATED_IN]->(tamilnadu)
MERGE (meenakshi)-[:LOCATED_IN]->(tamilnadu)
MERGE (jallikattu)-[:LOCATED_IN]->(tamilnadu)
MERGE (jallikattu)-[:RELATED_TO]->(pongal)

// ---- Andhra Pradesh / Telangana ----
MERGE (kuchipudi:Entity:PerformingArt {id:'kuchipudi', name:'Kuchipudi'})
MERGE (tirupati:Entity:HeritageSite {id:'tirupati', name:'Tirumala Venkateswara Temple'})
MERGE (bathukamma:Entity:Festival {id:'bathukamma', name:'Bathukamma'})
MERGE (charminar:Entity:HeritageSite {id:'charminar', name:'Charminar'})
MERGE (kuchipudi)-[:LOCATED_IN]->(andhra)
MERGE (tirupati)-[:LOCATED_IN]->(andhra)
MERGE (bathukamma)-[:LOCATED_IN]->(telangana)
MERGE (charminar)-[:LOCATED_IN]->(telangana)

// ---- Maharashtra ----
MERGE (ganeshchaturthi:Entity:Festival {id:'ganesh-chaturthi', name:'Ganesh Chaturthi'})
MERGE (lavani:Entity:PerformingArt {id:'lavani', name:'Lavani'})
MERGE (ajanta:Entity:HeritageSite {id:'ajanta-caves', name:'Ajanta Caves'})
MERGE (ganeshchaturthi)-[:LOCATED_IN]->(maharashtra)
MERGE (lavani)-[:LOCATED_IN]->(maharashtra)
MERGE (ajanta)-[:LOCATED_IN]->(maharashtra)

// ---- West Bengal ----
MERGE (durgapuja:Entity:Festival {id:'durga-puja', name:'Durga Puja'})
MERGE (chhau:Entity:PerformingArt {id:'chhau-dance', name:'Chhau Dance'})
MERGE (rasgulla:Entity:Cuisine {id:'rasgulla', name:'Rasgulla'})
MERGE (durgapuja)-[:LOCATED_IN]->(bengal)
MERGE (chhau)-[:LOCATED_IN]->(bengal)
MERGE (rasgulla)-[:LOCATED_IN]->(bengal)

// ---- Rajasthan ----
MERGE (ghoomar:Entity:PerformingArt {id:'ghoomar', name:'Ghoomar'})
MERGE (pushkar:Entity:Festival {id:'pushkar-fair', name:'Pushkar Camel Fair'})
MERGE (dalbaati:Entity:Cuisine {id:'dal-baati-churma', name:'Dal Baati Churma'})
MERGE (ghoomar)-[:LOCATED_IN]->(rajasthan)
MERGE (pushkar)-[:LOCATED_IN]->(rajasthan)
MERGE (dalbaati)-[:LOCATED_IN]->(rajasthan)

// ---- Punjab ----
MERGE (bhangra:Entity:PerformingArt {id:'bhangra', name:'Bhangra'})
MERGE (goldentemple:Entity:HeritageSite {id:'golden-temple', name:'Golden Temple'})
MERGE (baisakhi:Entity:Festival {id:'baisakhi', name:'Baisakhi'})
MERGE (bhangra)-[:LOCATED_IN]->(punjab)
MERGE (goldentemple)-[:LOCATED_IN]->(punjab)
MERGE (baisakhi)-[:LOCATED_IN]->(punjab)
MERGE (bhangra)-[:RELATED_TO]->(baisakhi)

// ---- Gujarat ----
MERGE (garba:Entity:PerformingArt {id:'garba', name:'Garba'})
MERGE (rannutsav:Entity:Festival {id:'rann-utsav', name:'Rann Utsav'})
MERGE (dhokla:Entity:Cuisine {id:'dhokla', name:'Dhokla'})
MERGE (garba)-[:LOCATED_IN]->(gujarat)
MERGE (rannutsav)-[:LOCATED_IN]->(gujarat)
MERGE (dhokla)-[:LOCATED_IN]->(gujarat)

// ---- Odisha ----
MERGE (odissi:Entity:PerformingArt {id:'odissi', name:'Odissi'})
MERGE (rathyatra:Entity:Festival {id:'rath-yatra', name:'Rath Yatra'})
MERGE (konark:Entity:HeritageSite {id:'konark-sun-temple', name:'Konark Sun Temple'})
MERGE (odissi)-[:LOCATED_IN]->(odisha)
MERGE (rathyatra)-[:LOCATED_IN]->(odisha)
MERGE (konark)-[:LOCATED_IN]->(odisha)

// ---- Assam ----
MERGE (bihu:Entity:Festival {id:'bihu', name:'Bihu'})
MERGE (kaziranga:Entity:HeritageSite {id:'kaziranga', name:'Kaziranga National Park'})
MERGE (bihu)-[:LOCATED_IN]->(assam)
MERGE (kaziranga)-[:LOCATED_IN]->(assam)

// ---- Nagaland ----
MERGE (hornbill:Entity:Festival {id:'hornbill-festival', name:'Hornbill Festival'})
MERGE (hornbill)-[:LOCATED_IN]->(nagaland)

// ---- Ladakh ----
MERGE (cham:Entity:RitualPerformance {id:'cham-dance', name:'Cham Dance'})
MERGE (hemis:Entity:HeritageSite {id:'hemis-monastery', name:'Hemis Monastery'})
MERGE (cham)-[:LOCATED_IN]->(ladakh)
MERGE (hemis)-[:LOCATED_IN]->(ladakh)
MERGE (hemis)-[:RELATED_TO]->(cham)

// ---- Uttar Pradesh ----
MERGE (kathak:Entity:PerformingArt {id:'kathak', name:'Kathak'})
MERGE (tajmahal:Entity:HeritageSite {id:'taj-mahal', name:'Taj Mahal'})
MERGE (kumbhmela:Entity:Festival {id:'kumbh-mela', name:'Kumbh Mela'})
MERGE (kathak)-[:LOCATED_IN]->(up)
MERGE (tajmahal)-[:LOCATED_IN]->(up)
MERGE (kumbhmela)-[:LOCATED_IN]->(up)

// ---- Category tags ----
MERGE (perfArt:Category {name:'Performing Art'})
MERGE (yakshagana)-[:CATEGORY]->(perfArt)
MERGE (kathakali)-[:CATEGORY]->(perfArt)
MERGE (dollukunitha)-[:CATEGORY]->(perfArt)
MERGE (bharatanatyam)-[:CATEGORY]->(perfArt)
MERGE (mohiniyattam)-[:CATEGORY]->(perfArt)
MERGE (kuchipudi)-[:CATEGORY]->(perfArt)
MERGE (lavani)-[:CATEGORY]->(perfArt)
MERGE (chhau)-[:CATEGORY]->(perfArt)
MERGE (ghoomar)-[:CATEGORY]->(perfArt)
MERGE (bhangra)-[:CATEGORY]->(perfArt)
MERGE (garba)-[:CATEGORY]->(perfArt)
MERGE (odissi)-[:CATEGORY]->(perfArt)
MERGE (kathak)-[:CATEGORY]->(perfArt)

MERGE (festivalCat:Category {name:'Festival'})
MERGE (mysoredasara)-[:CATEGORY]->(festivalCat)
MERGE (onam)-[:CATEGORY]->(festivalCat)
MERGE (pongal)-[:CATEGORY]->(festivalCat)
MERGE (bathukamma)-[:CATEGORY]->(festivalCat)
MERGE (ganeshchaturthi)-[:CATEGORY]->(festivalCat)
MERGE (durgapuja)-[:CATEGORY]->(festivalCat)
MERGE (pushkar)-[:CATEGORY]->(festivalCat)
MERGE (baisakhi)-[:CATEGORY]->(festivalCat)
MERGE (rannutsav)-[:CATEGORY]->(festivalCat)
MERGE (rathyatra)-[:CATEGORY]->(festivalCat)
MERGE (bihu)-[:CATEGORY]->(festivalCat)
MERGE (hornbill)-[:CATEGORY]->(festivalCat)
MERGE (kumbhmela)-[:CATEGORY]->(festivalCat)
MERGE (vallamkali)-[:CATEGORY]->(festivalCat);
