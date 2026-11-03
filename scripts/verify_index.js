const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');

console.log('Total characters:', content.length);
console.log('Total lines:', content.split('\n').length);

let errors = 0;

// 1. Tag balance check
const tagsToCheck = ['section', 'figure', 'figcaption', 'svg', 'table', 'thead', 'tbody', 'tr', 'td', 'th', 'div', 'p', 'span'];
tagsToCheck.forEach(tag => {
  const openCount = (content.match(new RegExp(`<${tag}(\\s+[^>]*)?>`, 'gi')) || []).length;
  const closeCount = (content.match(new RegExp(`</${tag}>`, 'gi')) || []).length;
  console.log(`Tag <${tag}>: open=${openCount}, close=${closeCount}, diff=${openCount - closeCount}`);
  if (openCount !== closeCount) errors++;
});

// 2. Inline script check
const scriptRegex = /<script(?:\s+[^>]*)?>([\s\S]*?)<\/script>/gi;
let match;
let scriptIndex = 0;

while ((match = scriptRegex.exec(content)) !== null) {
  scriptIndex++;
  const scriptContent = match[1];
  // If it's KaTeX config or external library loader, test parsing
  if (scriptContent.trim().length > 0) {
    try {
      new Function(scriptContent);
      console.log(`Script #${scriptIndex} syntax valid (${scriptContent.length} chars).`);
    } catch (err) {
      console.error(`Script #${scriptIndex} syntax ERROR:`, err.message);
      errors++;
    }
  }
}

// 3. Check for tab characters in KaTeX text
const tabText = content.match(/\\\text\{/g);
if (tabText) {
  console.log(`Warning: Found raw \\text in HTML: ${tabText.length} occurrences.`);
} else {
  console.log('No unescaped tab text found.');
}

// 4. Control characters: TeX written through a Python/JS string turns \t \b \f \r into these
const ctrl = [];
content.split('\n').forEach((line, i) => {
  // allow a CRLF line ending and tab indentation; anything else below 0x20 is a lost escape
  const body = line.replace(/\r$/, '').replace(/^[\t ]+/, '');
  if (/[\x00-\x09\x0B-\x1F]/.test(body)) ctrl.push(i + 1);
});
if (ctrl.length) {
  console.error(`Control characters (eaten TeX escapes?) on lines: ${ctrl.slice(0, 20).join(', ')}`);
  errors++;
} else {
  console.log('No control characters found.');
}

console.log(`Verification complete. Errors: ${errors}`);
if (errors > 0) process.exit(1);
