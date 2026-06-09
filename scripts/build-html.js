#!/usr/bin/env node
/**
 * HTML build script
 * Converts markdown content to responsive HTML
 */

const fs = require('fs');
const path = require('path');
const marked = require('marked');
const yaml = require('js-yaml');

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true,
});

function loadFrontmatter(content) {
  if (!content.startsWith('---')) {
    return { title: '', author: '', date: '' }, content;
  }

  const lines = content.split('\n');
  let endIndex = -1;

  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      endIndex = i;
      break;
    }
  }

  if (endIndex === -1) {
    return { title: '', author: '', date: '' }, content;
  }

  try {
    const frontmatterStr = lines.slice(1, endIndex).join('\n');
    const metadata = yaml.load(frontmatterStr) || {};
    const body = lines.slice(endIndex + 1).join('\n').trim();
    return metadata, body;
  } catch (e) {
    console.warn(`Warning: Could not parse frontmatter: ${e.message}`);
    return { title: '', author: '', date: '' }, content;
  }
}

function buildHTML() {
  try {
    console.log('🚀 Starting HTML generation...\n');

    const contentDir = path.join(__dirname, '../content');
    const distDir = path.join(__dirname, '../dist/html');

    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }

    // Get all markdown files
    const files = fs
      .readdirSync(contentDir)
      .filter(f => f.endsWith('.md'))
      .sort();

    if (files.length === 0) {
      console.warn('⚠️  No markdown files found in content directory');
      return false;
    }

    console.log(`📚 Processing ${files.length} markdown file(s)...\n`);

    let htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fair Dinkum Book Hub</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="book-header">
            <h1>Fair Dinkum Book Hub</h1>
            <p class="subtitle">Professional eBook Publishing Platform</p>
        </header>
        <nav class="toc">
            <h2>Table of Contents</h2>
            <ul>
`;

    // Build table of contents and collect chapters
    const chapters = [];
    files.forEach((file, index) => {
      const content = fs.readFileSync(path.join(contentDir, file), 'utf-8');
      const [metadata, body] = loadFrontmatter(content);
      const title = metadata.title || file.replace('.md', '');
      const id = `chapter-${index + 1}`;

      chapters.push({ file, metadata, body, title, id, index: index + 1 });
      htmlContent += `                <li><a href="#${id}">${title}</a></li>\n`;
    });

    htmlContent += `            </ul>
        </nav>
        <main class="book-content">
`;

    // Add chapters to HTML
    chapters.forEach(chapter => {
      console.log(`  ✓ Processing: ${chapter.file}`);

      const html = marked.parse(chapter.body);
      htmlContent += `            <section id="${chapter.id}" class="chapter">
                <h2>${chapter.title}</h2>
                <div class="chapter-meta">
                    <span class="author">${chapter.metadata.author || 'Unknown'}</span>
                    <span class="date">${chapter.metadata.date || ''}</span>
                </div>
                <div class="chapter-content">
                    ${html}
                </div>
            </section>
`;
    });

    htmlContent += `        </main>
        <footer class="book-footer">
            <p>&copy; 2026 Fair Dinkum Book Hub. All rights reserved.</p>
        </footer>
    </div>
</body>
</html>
`;

    // Write HTML file
    const htmlPath = path.join(distDir, 'index.html');
    fs.writeFileSync(htmlPath, htmlContent);

    // Create CSS file
    const cssContent = `/* Fair Dinkum eBook Styles */

:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --text-color: #333;
    --bg-color: #f8f9fa;
    --border-color: #e0e0e0;
    --line-height: 1.6;
    --max-width: 900px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Georgia', 'Times New Roman', serif;
    color: var(--text-color);
    background-color: var(--bg-color);
    line-height: var(--line-height);
}

.container {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 40px 20px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.book-header {
    text-align: center;
    margin-bottom: 40px;
    border-bottom: 2px solid var(--secondary-color);
    padding-bottom: 20px;
}

.book-header h1 {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 10px;
}

.subtitle {
    font-size: 1.1rem;
    color: var(--secondary-color);
    font-style: italic;
}

.toc {
    background-color: var(--bg-color);
    padding: 20px;
    border-left: 4px solid var(--secondary-color);
    margin-bottom: 40px;
}

.toc h2 {
    font-size: 1.5rem;
    color: var(--primary-color);
    margin-bottom: 15px;
}

.toc ul {
    list-style: none;
}

.toc li {
    margin: 8px 0;
}

.toc a {
    color: var(--secondary-color);
    text-decoration: none;
    transition: color 0.3s ease;
}

.toc a:hover {
    color: var(--primary-color);
    text-decoration: underline;
}

.book-content {
    margin: 40px 0;
}

.chapter {
    margin-bottom: 60px;
    page-break-after: always;
}

.chapter h2 {
    font-size: 2rem;
    color: var(--primary-color);
    margin-bottom: 10px;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 10px;
}

.chapter-meta {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 20px;
}

.chapter-meta span {
    margin-right: 20px;
}

.chapter-content {
    margin-top: 20px;
}

.chapter-content h3 {
    font-size: 1.5rem;
    color: var(--primary-color);
    margin-top: 30px;
    margin-bottom: 15px;
}

.chapter-content h4 {
    font-size: 1.2rem;
    color: var(--secondary-color);
    margin-top: 20px;
    margin-bottom: 10px;
}

.chapter-content p {
    margin-bottom: 15px;
    text-align: justify;
}

.chapter-content ul,
.chapter-content ol {
    margin-left: 30px;
    margin-bottom: 15px;
}

.chapter-content li {
    margin-bottom: 8px;
}

.chapter-content code {
    background-color: #f4f4f4;
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
}

.chapter-content pre {
    background-color: #2c3e50;
    color: #ecf0f1;
    padding: 15px;
    border-radius: 5px;
    overflow-x: auto;
    margin-bottom: 15px;
}

.chapter-content pre code {
    background-color: transparent;
    padding: 0;
    color: #ecf0f1;
}

.chapter-content blockquote {
    border-left: 4px solid var(--secondary-color);
    padding-left: 20px;
    margin-left: 0;
    margin-bottom: 15px;
    font-style: italic;
    color: #666;
}

.chapter-content table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 15px;
}

.chapter-content th,
.chapter-content td {
    border: 1px solid var(--border-color);
    padding: 12px;
    text-align: left;
}

.chapter-content th {
    background-color: var(--primary-color);
    color: white;
}

.book-footer {
    text-align: center;
    margin-top: 60px;
    padding-top: 20px;
    border-top: 2px solid var(--secondary-color);
    font-size: 0.9rem;
    color: #666;
}

/* Print styles */
@media print {
    body {
        background-color: white;
    }
    
    .container {
        box-shadow: none;
        max-width: 100%;
    }
    
    .chapter {
        page-break-after: always;
    }
    
    a {
        color: var(--primary-color);
        text-decoration: none;
    }
}

/* Mobile responsiveness */
@media (max-width: 768px) {
    .container {
        padding: 20px 10px;
    }
    
    .book-header h1 {
        font-size: 1.8rem;
    }
    
    .chapter h2 {
        font-size: 1.5rem;
    }
    
    .chapter-content {
        font-size: 0.95rem;
    }
}
`;

    const cssPath = path.join(distDir, 'style.css');
    fs.writeFileSync(cssPath, cssContent);

    console.log('\n✅ HTML generated successfully');
    console.log(`📁 Output: ${htmlPath}`);
    console.log(`🎨 Stylesheet: ${cssPath}`);
    console.log(`📚 Chapters: ${chapters.length}`);

    return true;
  } catch (error) {
    console.error('❌ HTML generation failed:', error.message);
    return false;
  }
}

// Main execution
buildHTML().then(success => {
  process.exit(success ? 0 : 1);
});
