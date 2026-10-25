import fs from 'fs';

const text = fs.readFileSync('C:/Users/swapnil/.gemini/antigravity-ide/brain/f51c63e0-808b-4cf9-b862-923e3cdbc8ab/.system_generated/steps/8/content.md', 'utf8');

const hStart = text.indexOf('<header');
const hEnd = text.indexOf('</header>');
console.log('--- HEADER ---');
console.log(text.substring(hStart, hEnd + 9));

const sStart = text.indexOf('<section id="top"');
const sEnd = text.indexOf('</section>', sStart);
console.log('\n--- HERO ---');
console.log(text.substring(sStart, sEnd + 10));
