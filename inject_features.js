const fs = require('fs');
const path = require('path');

const targetFile = path.join('C:\\Users\\User\\OneDrive\\Desktop\\festora\\frontend\\index.html');
let html = fs.readFileSync(targetFile, 'utf8');

// ==========================================
// 1. ADD CERTIFICATE GENERATOR LOGIC
// ==========================================
const certScript = `
// --- CERTIFICATE GENERATOR ---
function downloadCert(score) {
    let userName = localStorage.getItem('festora_name');
    if (!userName) {
        userName = prompt("Enter your name for the certificate:");
        if (!userName) return; // cancelled
        localStorage.setItem('festora_name', userName);
    }
    
    const canvas = document.createElement('canvas');
    canvas.width = 800; canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    // Draw background
    const grad = ctx.createLinearGradient(0,0,800,600);
    grad.addColorStop(0, '#fbe3a6');
    grad.addColorStop(1, '#b5653a');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,800,600);
    
    // Border
    ctx.strokeStyle = '#c9931a';
    ctx.lineWidth = 15;
    ctx.strokeRect(20, 20, 760, 560);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(28, 28, 744, 544);
    
    // Text
    ctx.textAlign = 'center';
    ctx.fillStyle = '#3a2a18';
    ctx.font = 'bold 48px Georgia';
    ctx.fillText('Certificate of Completion', 400, 120);
    
    ctx.font = 'italic 24px Georgia';
    ctx.fillText('This certifies that', 400, 200);
    
    ctx.font = 'bold 56px Arial';
    ctx.fillStyle = '#2f6b3a';
    ctx.fillText(userName, 400, 280);
    
    ctx.font = '24px Georgia';
    ctx.fillStyle = '#3a2a18';
    ctx.fillText('has successfully completed the Festora Quiz', 400, 360);
    
    ctx.font = 'bold 32px Georgia';
    ctx.fillText('Score: ' + score + ' / 10', 400, 430);
    
    ctx.font = '20px Arial';
    ctx.fillStyle = '#7a6650';
    const dateStr = new Date().toLocaleDateString();
    ctx.fillText('Date: ' + dateStr, 400, 520);
    
    // Trigger download
    const link = document.createElement('a');
    link.download = 'Festora_Certificate.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// --- TEXT TO SPEECH (MULTI-LANGUAGE) ---
function speakStep(text) {
    if(!('speechSynthesis' in window)) {
        alert("Your browser does not support text-to-speech.");
        return;
    }
    window.speechSynthesis.cancel(); // stop any ongoing speech
    const utter = new SpeechSynthesisUtterance(text);
    const langSelect = document.getElementById('ttsLang');
    if(langSelect) {
        utter.lang = langSelect.value;
    }
    window.speechSynthesis.speak(utter);
}
`;

// Inject global functions before the last </script>
if (!html.includes('downloadCert')) {
    html = html.replace('/* =================================================== */\n</script>', '/* =================================================== */\n' + certScript + '\n</script>');
    if (!html.includes('downloadCert')) {
        // Fallback injection if the above failed
        html = html.substring(0, html.lastIndexOf('</script>')) + certScript + '\n</script>' + html.substring(html.lastIndexOf('</script>') + 9);
    }
}

// ==========================================
// 2. QUIZ: INJECT DOWNLOAD CERT BUTTON
// ==========================================
const originalQuizBtn = `<button class="alt" onclick="go('Games')">Continue to Games</button>`;
const newQuizBtn = `<button style="background:#2f6b3a;color:white" onclick="downloadCert(\${c})">🎓 Download Certificate</button> <button class="alt" onclick="go('Games')">Continue to Games</button>`;
html = html.replace(originalQuizBtn, newQuizBtn);

// ==========================================
// 3. CELEBRATE: INJECT TTS BUTTON & SELECT
// ==========================================
// Find the Celebrate rendering logic. 
// It looks like: <h3>\${s[1]}</h3>\${first(s[2])}<div class="row"
// We'll replace it to add the languages and listen button.

const ttsHtml = `
<div class="row" style="margin-top:10px; background:var(--card); padding:8px; border-radius:8px; border:1px solid var(--line);">
    <select id="ttsLang" style="padding:6px; border-radius:6px; font-size:14px; border:1px solid #ccc;">
        <option value="en-IN">English</option>
        <option value="hi-IN">हिंदी (Hindi)</option>
        <option value="kn-IN">ಕನ್ನಡ (Kannada)</option>
        <option value="te-IN">తెలుగు (Telugu)</option>
        <option value="ta-IN">தமிழ் (Tamil)</option>
        <option value="ml-IN">മലയാളം (Malayalam)</option>
    </select>
    <button class="alt" onclick="speakStep('\${s[1]}. \${s[2]}')">🔊 Listen</button>
</div>
<div class="row"
`;

// Applying the replacement carefully
html = html.replace('${first(s[2])}<div class="row"', '${first(s[2])}' + ttsHtml.replace(/\n/g, ''));


// ==========================================
// 4. FOOD: ADD YOUTUBE SEARCH ON CLICK
// ==========================================
// Original: <div class="tile" style="font-size:6rem">${f[0]}</div>
// Replace with clickable version
const oldFoodTile = `<div class="tile" style="font-size:6rem">\${f[0]}</div>`;
const newFoodTile = `<div class="tile" style="font-size:6rem; cursor:pointer;" title="Click to watch preparation video!" onclick="window.open('https://www.youtube.com/results?search_query=' + encodeURIComponent('\${f[1]} recipe'), '_blank')">\${f[0]}</div><small style="color:var(--mar);font-weight:bold;">👆 Click photo to watch preparation video!</small>`;
html = html.replace(oldFoodTile, newFoodTile);


// ==========================================
// 5. GALLERY: REPLACE EMOJI TILES WITH REAL IMAGES
// ==========================================
// We'll use pollinations.ai for real on-demand generative image placeholders based on the title.
// For the grid view:
const oldGalTile = `<div class="tile" onclick="R.lb=\${x[1]};draw()" title="\${x[0][2]}">\${x[0][1]}</div>`;
const newGalTile = `<div class="tile" onclick="R.lb=\${x[1]};draw()" title="\${x[0][2]}" style="background: url('https://image.pollinations.ai/prompt/' + encodeURIComponent(x[0][2] + ' realistic photography india festival') + '?width=400&height=300&nologo=true') center/cover; color: transparent;">\${x[0][1]}</div>`;
// Global replace because it might appear multiple times or exactly once
html = html.split(oldGalTile).join(newGalTile);

// For the lightbox view:
const oldLbTile = `<div class="tile" style="height:40vh;font-size:7rem">\${it[1]}</div>`;
const newLbTile = `<div class="tile" style="height:40vh;font-size:7rem; background: url('https://image.pollinations.ai/prompt/' + encodeURIComponent(it[2] + ' realistic photography india festival') + '?width=800&height=600&nologo=true') center/cover; color: transparent;">\${it[1]}</div>`;
html = html.replace(oldLbTile, newLbTile);


// Save the modifications
fs.writeFileSync(targetFile, html, 'utf8');
console.log("Features added successfully!");
