const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components');

const replacements = [
  { from: /from-\[#4DA3FF\]/g, to: 'from-fuchsia-400' },
  { from: /to-\[#6EE7FF\]/g, to: 'to-purple-500' },
  { from: /text-\[#4DA3FF\]/g, to: 'text-fuchsia-400' },
  { from: /border-\[#4DA3FF\]/g, to: 'border-fuchsia-500' },
  { from: /bg-\[#4DA3FF\]/g, to: 'bg-fuchsia-500' },
  
  { from: /shadow-\[0_0_15px_rgba\(77,163,255,0\.2\)\]/g, to: 'shadow-[0_0_10px_rgba(217,70,239,0.2)]' },
  { from: /shadow-\[0_0_15px_rgba\(77,163,255,0\.4\)\]/g, to: 'shadow-[0_0_10px_rgba(217,70,239,0.3)]' },
  { from: /shadow-\[0_0_20px_rgba\(77,163,255,0\.4\)\]/g, to: 'shadow-[0_0_15px_rgba(217,70,239,0.3)]' },
  { from: /shadow-\[0_0_25px_rgba\(77,163,255,0\.5\)\]/g, to: 'shadow-[0_0_15px_rgba(217,70,239,0.3)]' },
  { from: /shadow-\[0_0_10px_#4DA3FF\]/g, to: 'shadow-[0_0_10px_rgba(217,70,239,0.4)]' },
  
  { from: /#4DA3FF/g, to: '#d946ef' },
  { from: /#6EE7FF/g, to: '#a855f7' },
  
  { from: /rgba\(59,\s*130,\s*246/g, to: 'rgba(217,70,239' }, // blue-500 -> fuchsia-500

  // Replace tailwind class substrings
  { from: /blue-300/g, to: 'fuchsia-300' },
  { from: /blue-400/g, to: 'fuchsia-400' },
  { from: /blue-500/g, to: 'fuchsia-500' },
  { from: /blue-600/g, to: 'fuchsia-600' },
  { from: /blue-800/g, to: 'fuchsia-800' },
  { from: /blue-900/g, to: 'fuchsia-900' },
  
  { from: /cyan-400/g, to: 'purple-400' },
  { from: /cyan-500/g, to: 'purple-500' },
  { from: /cyan-600/g, to: 'purple-600' },
  
  // Specific glow reduction
  { from: /blur-\[150px\]/g, to: 'blur-[80px]' },
  { from: /blur-\[130px\]/g, to: 'blur-[60px]' },
  { from: /blur-\[100px\]/g, to: 'blur-[60px]' }
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const { from, to } of replacements) {
        content = content.replace(from, to);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(dir);
console.log('Done!');
