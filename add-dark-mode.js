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

const files = walk('./src/app');

// We use negative lookaheads to prevent double-adding the dark mode classes
const replacements = [
  { regex: /bg-white(?! dark:bg-gray-800)([^a-zA-Z0-9-])/g, replacement: 'bg-white dark:bg-gray-800$1' },
  { regex: /bg-gray-50(?! dark:bg-gray-900)([^a-zA-Z0-9-])/g, replacement: 'bg-gray-50 dark:bg-gray-900$1' },
  { regex: /text-gray-900(?! dark:text-gray-100)([^a-zA-Z0-9-])/g, replacement: 'text-gray-900 dark:text-gray-100$1' },
  { regex: /text-gray-800(?! dark:text-gray-200)([^a-zA-Z0-9-])/g, replacement: 'text-gray-800 dark:text-gray-200$1' },
  { regex: /text-gray-700(?! dark:text-gray-300)([^a-zA-Z0-9-])/g, replacement: 'text-gray-700 dark:text-gray-300$1' },
  { regex: /text-gray-600(?! dark:text-gray-400)([^a-zA-Z0-9-])/g, replacement: 'text-gray-600 dark:text-gray-400$1' },
  { regex: /border-gray-200(?! dark:border-gray-700)([^a-zA-Z0-9-])/g, replacement: 'border-gray-200 dark:border-gray-700$1' },
  { regex: /border-gray-300(?! dark:border-gray-600)([^a-zA-Z0-9-])/g, replacement: 'border-gray-300 dark:border-gray-600$1' },
  { regex: /bg-blue-300(?! dark:bg-blue-900)([^a-zA-Z0-9-])/g, replacement: 'bg-blue-300 dark:bg-blue-900$1' },
  { regex: /bg-sky-200(?! dark:bg-sky-900)([^a-zA-Z0-9-])/g, replacement: 'bg-sky-200 dark:bg-sky-900$1' },
  { regex: /text-black(?! dark:text-white)([^a-zA-Z0-9-])/g, replacement: 'text-black dark:text-white$1' }
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

console.log(`Successfully updated ${updatedCount} files.`);
