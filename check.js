const fs = require('fs');
let html = fs.readFileSync('C:\\Users\\User\\OneDrive\\Desktop\\festora\\frontend\\index.html', 'utf8');
if (html.indexOf('<h2>The Story</h2><div class="snap">${g.story.map') > -1) {
    console.log("SUCCESS");
} else {
    console.log("FAILED");
}
