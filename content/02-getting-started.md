---
title: Getting Started
author: Fair Dinkum Publishing
date: 2026-06-09
---

# Getting Started with Fair Dinkum Book Hub

This chapter walks you through the initial setup and configuration of Fair Dinkum Book Hub on your system.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v18.0.0 or higher
- **Python** v3.11 or higher
- **Git** v2.0 or higher
- **npm** v9.0.0 or higher

You can check your versions by running:

```bash
node --version
python --version
git --version
npm --version
```

## Installation Steps

### Step 1: Clone the Repository

```bash
git clone https://github.com/brettanthonysjoberg179-lab/fair-dinkum-book-hub.git
cd fair-dinkum-book-hub
```

### Step 2: Install Node Dependencies

```bash
npm install
```

This will install all required Node.js packages including:
- Puppeteer (for PDF generation)
- Marked (for markdown parsing)
- js-yaml (for YAML parsing)
- And more build tools

### Step 3: Install System Dependencies

For Ubuntu/Debian:

```bash
sudo apt-get update
sudo apt-get install -y wkhtmltopdf calibre pandoc ghostscript
```

For macOS:

```bash
brew install wkhtmltopdf calibre pandoc ghostscript
```

### Step 4: Install Python Dependencies

```bash
pip install ebooklib pypub pyyaml
```

## Verifying Installation

Run the test command to verify everything is installed correctly:

```bash
npm test
```

You should see output confirming:
- ✅ Markdown validation passed
- ✅ Frontmatter validation passed
- ✅ All dependencies installed

## Directory Structure

Your project directory should look like this:

```
fair-dinkum-book-hub/
├── content/                 # Your markdown chapters
├── scripts/                 # Build scripts
├── dist/                    # Build output (auto-generated)
├── .github/workflows/       # GitHub Actions workflows
├── package.json             # Node dependencies
├── .eslintrc.json          # Linting rules
├── .prettierrc              # Code formatting
└── README.md                # Project documentation
```

## Your First Build

To create your first eBook:

```bash
npm run build
```

This will:
1. Validate all markdown files
2. Build HTML version
3. Generate PDF from HTML
4. Create EPUB format
5. Optimize all assets

Output files will be in the `dist/` directory:
- `dist/html/index.html` - Web version
- `dist/ebook.pdf` - PDF version
- `dist/ebook.epub` - E-reader version

## Troubleshooting

### Missing Pandoc

If you see errors about Pandoc, install it:

```bash
# Ubuntu/Debian
sudo apt-get install pandoc

# macOS
brew install pandoc
```

### Node Version Issues

If npm scripts fail, ensure you're using Node v18+:

```bash
node --version
nvm install 18
nvm use 18
```

### Python Module Errors

Reinstall Python dependencies:

```bash
pip install --upgrade ebooklib pypub pyyaml
```

## Next Steps

Now that you have everything set up:

1. Read the next chapter on creating content
2. Add your first markdown chapter
3. Build and preview your eBook
4. Customize styling as needed

You're ready to start writing!
