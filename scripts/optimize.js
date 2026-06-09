#!/usr/bin/env node
/**
 * Asset optimization script
 * Minifies HTML, CSS, and JavaScript files
 */

const fs = require('fs');
const path = require('path');

function minifyHTML(content) {
  return content
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/>\s+</g, '><')
    .replace(/\s+/g, ' ')
    .trim();
}

function minifyCSS(content) {
  return content
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,])\s*/g, '$1')
    .trim();
}

function minifyJS(content) {
  return content
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,=])\s*/g, '$1')
    .trim();
}

function optimizeAssets() {
  try {
    console.log('🚀 Starting asset optimization...\n');

    const distDir = path.join(__dirname, '../dist/html');

    if (!fs.existsSync(distDir)) {
      console.warn('⚠️  No dist directory found');
      return false;
    }

    const files = fs.readdirSync(distDir);
    let optimizedCount = 0;

    files.forEach(file => {
      const filePath = path.join(distDir, file);
      const ext = path.extname(file);

      try {
        if (ext === '.html') {
          console.log(`  📄 Optimizing: ${file}`);
          let content = fs.readFileSync(filePath, 'utf-8');
          const originalSize = content.length;

          content = minifyHTML(content);

          fs.writeFileSync(filePath, content);
          const newSize = content.length;
          const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(2);

          console.log(`     ✓ Reduced by ${reduction}% (${originalSize} → ${newSize} bytes)`);
          optimizedCount++;
        } else if (ext === '.css') {
          console.log(`  🎨 Optimizing: ${file}`);
          let content = fs.readFileSync(filePath, 'utf-8');
          const originalSize = content.length;

          content = minifyCSS(content);

          fs.writeFileSync(filePath, content);
          const newSize = content.length;
          const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(2);

          console.log(`     ✓ Reduced by ${reduction}% (${originalSize} → ${newSize} bytes)`);
          optimizedCount++;
        } else if (ext === '.js') {
          console.log(`  ⚙️  Optimizing: ${file}`);
          let content = fs.readFileSync(filePath, 'utf-8');
          const originalSize = content.length;

          content = minifyJS(content);

          fs.writeFileSync(filePath, content);
          const newSize = content.length;
          const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(2);

          console.log(`     ✓ Reduced by ${reduction}% (${originalSize} → ${newSize} bytes)`);
          optimizedCount++;
        }
      } catch (error) {
        console.warn(`     ⚠️  Error optimizing ${file}: ${error.message}`);
      }
    });

    console.log(`\n✅ Optimization complete`);
    console.log(`📊 Files optimized: ${optimizedCount}`);

    return true;
  } catch (error) {
    console.error('❌ Optimization failed:', error.message);
    return false;
  }
}

// Main execution
optimizeAssets().then(success => {
  process.exit(success ? 0 : 1);
});
