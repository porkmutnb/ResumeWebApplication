const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.html')) results.push(file);
    }
  });
  return results;
}

const files = walk('./src/app/backoffice/components/manage');

const replacements = [
  { regex: /dark:bg-blue-900/g, replacement: 'dark:bg-gray-800' },
  { regex: /dark:bg-sky-900/g, replacement: 'dark:bg-gray-900' },
  { regex: /dark:text-gray-300/g, replacement: 'dark:text-white' },
  { regex: /dark:text-gray-400/g, replacement: 'dark:text-white' },
  { regex: /dark:text-gray-100/g, replacement: 'dark:text-white' },
  { regex: /dark:text-gray-200/g, replacement: 'dark:text-white' },
  { regex: /dark:border-gray-600/g, replacement: 'dark:border-white/20' },
  { regex: /dark:border-gray-700/g, replacement: 'dark:border-white/20' }
];

let updatedCount = 0;

files.forEach(file => {
  let originalContent = fs.readFileSync(file, 'utf8');
  let newContent = originalContent;

  replacements.forEach(({ regex, replacement }) => {
    newContent = newContent.replace(regex, replacement);
  });

  if (originalContent !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Updated ' + file);
    updatedCount++;
  }
});

console.log(`Successfully updated ${updatedCount} backoffice manage files.`);
