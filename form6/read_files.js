const fs = require('fs');
const path = require('path');

const files = [
  'src/lib/store.ts',
  'src/app/checkout/page.tsx',
  'src/app/product/[slug]/page.tsx',
  'src/components/sections/Hero.tsx',
];

let output = '';

files.forEach(f => {
  try {
    let content = fs.readFileSync(f, 'utf8');
    // Remove BOM if present
    if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1);
    output += `\n\n========== FILE: ${f} ==========\n`;
    output += content;
    output += `\n========== END: ${f} ==========\n`;
  } catch (e) {
    output += `\nERROR reading ${f}: ${e.message}\n`;
  }
});

fs.writeFileSync('files_output.txt', output, 'utf8');
console.log('Done. Written to files_output.txt');
console.log('Total chars:', output.length);
