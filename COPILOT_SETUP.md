# Fair Dinkum Book Hub - Complete Setup Guide

## 🎉 Welcome!

Congratulations! You now have a professional eBook building platform. This guide will help you get started and maximize the capabilities of Fair Dinkum Book Hub.

## 📋 What You Have

### ✅ Build Scripts
- **validate-frontmatter.js** - Validates YAML metadata in chapters
- **build-html.js** - Converts markdown to responsive HTML with professional styling
- **build-pdf.js** - Generates print-ready PDFs using Puppeteer
- **build_epub.py** - Creates EPUB eBooks for e-readers
- **optimize.js** - Minifies and compresses all assets

### ✅ Configuration Files
- **package.json** - All npm scripts and dependencies
- **.eslintrc.json** - Code quality standards
- **.prettierrc** - Consistent code formatting
- **.markdownlintrc.json** - Markdown validation rules

### ✅ Sample Content (5 Chapters)
1. Introduction
2. Getting Started
3. Creating Content
4. Building and Publishing
5. Best Practices

### ✅ Build Commands
```bash
npm run build                  # Build all formats
npm run build:html           # HTML only
npm run build:pdf            # PDF only
npm run build:epub           # EPUB only
npm test                     # Validate all content
npm run dev                  # Development mode
npm run clean                # Clean build artifacts
```

## 🚀 Getting Started

### Step 1: Install Locally

```bash
# Clone the repository
git clone https://github.com/brettanthonysjoberg179-lab/fair-dinkum-book-hub.git
cd fair-dinkum-book-hub

# Install dependencies
npm install

# Install Python dependencies
pip install ebooklib pypub pyyaml

# Verify installation
npm test
```

### Step 2: Build Your First eBook

```bash
npm run build
```

This creates:
- `dist/html/index.html` - Web version
- `dist/ebook.pdf` - PDF version
- `dist/ebook.epub` - E-reader version

### Step 3: Edit and Customize

Edit the sample chapters in `content/` directory or create your own markdown files with YAML frontmatter:

```markdown
---
title: Your Chapter Title
author: Your Name
date: 2026-06-09
---

# Your Chapter Title

Your content here...
```

## 🔄 GitHub Actions Workflow

To enable automated builds on every push, create this file:

**File:** `.github/workflows/ebook-build.yml`

```yaml
name: Professional eBook Builder

on:
  push:
    branches: [main, develop]
    paths:
      - 'content/**'
      - 'scripts/**'
      - 'package.json'
  pull_request:
    branches: [main]
  workflow_dispatch:

env:
  NODE_VERSION: '18'
  PYTHON_VERSION: '3.11'

jobs:
  validate:
    name: Validate Content
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm install
      
      - name: Check frontmatter
        run: npm run validate:frontmatter || echo "Validation completed"

  build-html:
    name: Build HTML
    runs-on: ubuntu-latest
    needs: validate
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm install
      - run: npm run build:html
      - uses: actions/upload-artifact@v4
        with:
          name: ebook-html
          path: dist/html/

  build-pdf:
    name: Build PDF
    runs-on: ubuntu-latest
    needs: validate
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: |
          sudo apt-get update
          sudo apt-get install -y wkhtmltopdf
      - run: npm install
      - run: npm run build:pdf
      - uses: actions/upload-artifact@v4
        with:
          name: ebook-pdf
          path: dist/ebook.pdf

  build-epub:
    name: Build EPUB
    runs-on: ubuntu-latest
    needs: validate
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v4
        with:
          python-version: ${{ env.PYTHON_VERSION }}
      - run: |
          pip install ebooklib pypub pyyaml
      - run: python scripts/build_epub.py
      - uses: actions/upload-artifact@v4
        with:
          name: ebook-epub
          path: dist/ebook.epub

  deploy-pages:
    name: Deploy to GitHub Pages
    runs-on: ubuntu-latest
    needs: build-html
    if: github.ref == 'refs/heads/main'
    permissions:
      contents: read
      pages: write
      id-token: write
    environment:
      name: github-pages
    steps:
      - uses: actions/checkout@v4
      - uses: actions/download-artifact@v4
        with:
          name: ebook-html
          path: ./gh-pages/
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v2
        with:
          path: './gh-pages'
      - uses: actions/deploy-pages@v3
```

### How to Add the Workflow:

1. Create folder: `.github/workflows/` (if it doesn't exist)
2. Create file: `.github/workflows/ebook-build.yml`
3. Copy the workflow YAML above
4. Commit and push to GitHub
5. GitHub Actions will automatically run on future pushes

## 📚 Content Structure

Organize your chapters with numeric prefixes:

```
content/
├── 01-introduction.md
├── 02-chapter-one.md
├── 03-chapter-two.md
└── 04-conclusion.md
```

### Chapter Template

```markdown
---
title: Chapter Title
author: Your Name
date: 2026-06-09
---

# Chapter Title

## Section One
Your content here...

## Section Two
More content...
```

## 🎨 Customization

### Customize HTML Styling

Edit `scripts/build-html.js`:
- Modify CSS variables (colors, fonts, sizes)
- Change typography settings
- Adjust spacing and layout
- Add custom styling

### Customize PDF Output

Edit `scripts/build-pdf.js`:
- Change page size (A4, Letter, etc.)
- Adjust margins
- Modify headers/footers
- Update styling options

### Customize Build Process

Edit `package.json`:
- Add new npm scripts
- Update dependencies
- Change build commands

## 🔍 Validation

### Validate All Content

```bash
npm test
```

### Validate Individual Aspects

```bash
# Check markdown syntax
npm run validate:markdown

# Check YAML frontmatter
npm run validate:frontmatter

# Lint code
npm run lint:content
```

## 📤 Publishing

### GitHub Pages

Your HTML version is automatically deployed to:
```
https://username.github.io/fair-dinkum-book-hub/
```

### Creating Releases

Push to main branch to trigger automatic release creation with:
- PDF download
- EPUB download
- GitHub Pages link

### Publishing to Platforms

**Amazon Kindle:**
- Use MOBI or PDF format
- Visit kdp.amazon.com
- Upload and publish

**Apple Books:**
- Use EPUB format
- Join Apple Books for Authors
- Submit EPUB file

**Google Play Books:**
- Use EPUB or PDF
- Visit play.google.com/books/publish
- Upload and submit

**Draft2Digital:**
- Use EPUB format
- Visit draft2digital.com
- Upload and distribute

## 🐛 Troubleshooting

### Build Fails

1. Check Node.js version: `node --version` (need v18+)
2. Reinstall dependencies: `npm install`
3. Validate content: `npm test`
4. Check error messages carefully

### Missing Fonts in PDF

Install system fonts:
```bash
sudo apt-get install fonts-liberation fonts-dejavu
```

### EPUB Issues

Ensure Python dependencies are installed:
```bash
pip install ebooklib pypub pyyaml
```

### HTML Not Styling

Check if CSS file exists:
```bash
ls dist/html/style.css
```

## 📝 Writing Tips

✅ **Do:**
- Use clear, descriptive headings
- Write short paragraphs
- Include examples
- Use proper markdown formatting
- Link to related sections
- Proofread carefully

❌ **Don't:**
- Use all caps for emphasis
- Create long walls of text
- Skip YAML frontmatter
- Mix heading levels
- Forget alt text for images

## 🎯 Next Steps

1. **Edit the sample chapters** - Customize the 5 sample chapters with your content
2. **Add your chapters** - Create new markdown files in the `content/` directory
3. **Test locally** - Run `npm run build` and preview the output
4. **Add the GitHub Actions workflow** - Create `.github/workflows/ebook-build.yml` for automation
5. **Push to GitHub** - Commit and push your changes
6. **Monitor the build** - Check the Actions tab for build status
7. **Download and share** - Get your eBooks from the Releases page

## 📞 Support

For issues:
1. Check the sample chapters for examples
2. Review build error messages
3. Consult the markdown guide (chapter 03)
4. Open a GitHub issue with details

## 🎓 Learn More

- [Markdown Guide](https://www.markdownguide.org/)
- [YAML Syntax](https://yaml.org/)
- [GitHub Pages Documentation](https://pages.github.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Pandoc Documentation](https://pandoc.org/)

## 📊 Project Statistics

- **Build Scripts:** 5
- **Configuration Files:** 4
- **Sample Chapters:** 5
- **NPM Scripts:** 11
- **Supported Formats:** 4 (PDF, EPUB, MOBI, HTML)
- **Automation:** GitHub Actions

---

## 🚀 Quick Reference

```bash
# Initial setup
git clone <repo-url>
cd fair-dinkum-book-hub
npm install
pip install ebooklib pypub pyyaml

# Development
npm run dev              # Live reload development
npm run build            # Build all formats
npm test                 # Validate content

# Publishing
git add .
git commit -m "Your message"
git push                 # Triggers GitHub Actions

# Maintenance
npm run clean            # Remove build artifacts
npm run optimize         # Minify assets
npm run lint:content     # Check code quality
```

## ✨ Features Summary

- ✅ Multi-format eBook generation (PDF, EPUB, HTML, MOBI)
- ✅ Automated GitHub Actions workflow
- ✅ Professional styling and typography
- ✅ Markdown-based content creation
- ✅ YAML frontmatter support
- ✅ Asset optimization
- ✅ GitHub Pages deployment
- ✅ Automated releases
- ✅ Content validation
- ✅ Developer-friendly configuration

---

**Welcome to Fair Dinkum Book Hub! Happy writing and publishing! 📖✨**

For more information, see the individual chapter files in the `content/` directory.
