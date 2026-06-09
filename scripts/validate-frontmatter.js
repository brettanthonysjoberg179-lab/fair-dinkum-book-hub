#!/usr/bin/env node
/**
 * Frontmatter validation script
 * Validates YAML frontmatter in markdown files
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function validateFrontmatter(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

    if (!frontmatterMatch) {
      console.warn(`⚠️  No frontmatter found in ${path.basename(filePath)}`);
      return true; // Not an error, just a warning
    }

    try {
      const metadata = yaml.load(frontmatterMatch[1]);
      
      // Validate required fields
      if (!metadata.title) {
        console.error(`❌ Missing required field 'title' in ${path.basename(filePath)}`);
        return false;
      }

      if (!metadata.author) {
        console.warn(`⚠️  Missing recommended field 'author' in ${path.basename(filePath)}`);
      }

      console.log(`✅ Valid frontmatter in ${path.basename(filePath)}`);
      return true;
    } catch (e) {
      console.error(`❌ Invalid YAML in ${path.basename(filePath)}: ${e.message}`);
      return false;
    }
  } catch (e) {
    console.error(`❌ Error reading file ${path.basename(filePath)}: ${e.message}`);
    return false;
  }
}

function validateDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.error(`❌ Directory not found: ${dirPath}`);
    return false;
  }

  const files = fs.readdirSync(dirPath)
    .filter(f => f.endsWith('.md'))
    .map(f => path.join(dirPath, f));

  if (files.length === 0) {
    console.warn('⚠️  No markdown files found');
    return true;
  }

  console.log(`\n📄 Validating ${files.length} markdown file(s)...\n`);

  let allValid = true;
  files.forEach(file => {
    if (!validateFrontmatter(file)) {
      allValid = false;
    }
  });

  console.log('');
  return allValid;
}

// Main execution
const args = process.argv.slice(2);
const targetDir = args.length > 0 ? args[0] : 'content';

console.log('🔍 Starting frontmatter validation...\n');

const isValid = validateDirectory(targetDir);

if (isValid) {
  console.log('✅ All frontmatter validation passed!');
  process.exit(0);
} else {
  console.log('❌ Frontmatter validation failed!');
  process.exit(1);
}
