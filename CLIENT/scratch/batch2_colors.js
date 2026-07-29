const fs = require('fs');
const path = require('path');

function getFiles(dir, filesList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getFiles(filePath, filesList);
        } else if (filePath.endsWith('.jsx')) {
            filesList.push(filePath);
        }
    }
    return filesList;
}

const files = getFiles('e:/AdDubey/nidhivan_real_estate/Website_Code/CLIENT/src');

files.forEach(file => {
    if (file.includes(path.join('ui'))) return;

    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    // .text-black -> text-[#2B2B2B]
    content = content.replace(/\btext-black\b/g, 'text-[#2B2B2B]');

    // .text-gray -> text-gray-100  (Wait, style.css .text-gray is #f5f6f6, so text-gray-100)
    // BUT we must avoid replacing existing text-gray-500 etc.
    content = content.replace(/\btext-gray(?!\-[a-zA-Z0-9]+)\b/g, 'text-[#f5f6f6]');

    // bg-repeat-x is naturally bg-repeat-x in Tailwind, so NO ACTION NEEDED
    // text-left is naturally text-left in Tailwind, so NO ACTION NEEDED
    // bg-transparent is naturally bg-transparent, so NO ACTION NEEDED

    if (content !== originalContent) {
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});
