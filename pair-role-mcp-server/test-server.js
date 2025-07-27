// Test script to verify the server can run
const path = require('path');
console.error('Server test starting...');
console.error('Current directory:', process.cwd());
console.error('Script location:', __dirname);
console.error('Looking for agents in:', path.resolve(process.cwd(), 'sub-agents'));

// Try to list files
const fs = require('fs');
try {
  const files = fs.readdirSync(path.resolve(process.cwd(), 'sub-agents'));
  console.error('Found agent files:', files.length);
} catch (e) {
  console.error('Error reading agents directory:', e.message);
}

console.error('Test complete - if you see this, Node.js is working correctly');