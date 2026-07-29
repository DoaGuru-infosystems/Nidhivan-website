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
    // Only touch files in components or Pages, skip UI folder to be safe
    if (file.includes(path.join('ui'))) return;

    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    // Replace page-content
    content = content.replace(/\bpage-content\b/g, 'relative');

    // Replace section-full
    content = content.replace(/\bsection-full\s+relative\b/g, 'relative');
    content = content.replace(/\bsection-full\b/g, 'relative');

    // Replace section-head
    content = content.replace(/\bsection-head\b/g, 'mb-10');

    // Specific combined replacements
    content = content.replace(/\bmobile-page-padding\s+p-tb150\b/g, 'py-8 md:py-[150px]');
    content = content.replace(/\bmobile-page-padding\s+p-t80\s+p-b80\b/g, 'py-8 md:py-20');
    content = content.replace(/\bmobile-page-padding\s+p-t80\s+p-b50\b/g, 'py-8 md:pt-20 md:pb-12');
    content = content.replace(/\bmobile-page-padding\s+p-t80\s+p-b30\b/g, 'py-8 md:pt-20 md:pb-8');
    content = content.replace(/\bmobile-page-padding\s+p-t80\s+p-b10\b/g, 'py-8 md:pt-20 md:pb-2');
    
    // mobile-page-padding alone -> py-8 md:py-0
    content = content.replace(/\bmobile-page-padding\b/g, 'py-8 md:py-0');

    // Specific standalone usages
    content = content.replace(/\bp-t80\b/g, 'pt-20');
    content = content.replace(/\bp-b80\b/g, 'pb-20');
    content = content.replace(/\bp-b50\b/g, 'pb-12');
    content = content.replace(/\bp-b40\b/g, 'pb-10');
    content = content.replace(/\bp-b30\b/g, 'pb-8');
    content = content.replace(/\bp-b10\b/g, 'pb-2');
    content = content.replace(/\bp-t50\b/g, 'pt-12');
    content = content.replace(/\bp-t150\b/g, 'pt-[150px]');
    content = content.replace(/\bp-tb150\b/g, 'py-[150px]');
    content = content.replace(/\bp-tb80\b/g, 'py-20');

    // Fix any double relative
    content = content.replace(/\brelative\s+relative\b/g, 'relative');
    content = content.replace(/className="\s+/g, 'className="');

    if (content !== originalContent) {
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});
