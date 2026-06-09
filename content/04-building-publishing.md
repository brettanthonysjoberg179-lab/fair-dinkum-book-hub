---
title: Building and Publishing
author: Fair Dinkum Publishing
date: 2026-06-09
---

# Building and Publishing Your eBook

This chapter covers the building process and how to publish your eBook to various platforms.

## Building Your eBook

### Basic Build Command

To build all formats at once:

```bash
npm run build
```

This creates:
- `dist/html/index.html` - Web version
- `dist/ebook.pdf` - PDF version
- `dist/ebook.epub` - E-reader version
- `dist/ebook.mobi` - Kindle version

### Building Specific Formats

Build individual formats as needed:

```bash
# HTML only
npm run build:html

# PDF only
npm run build:pdf

# EPUB only
npm run build:epub
```

### Build Process Steps

1. **Validation** - Checks markdown and frontmatter
2. **HTML Generation** - Creates web-ready HTML
3. **PDF Conversion** - Generates print-ready PDF
4. **EPUB Creation** - Creates e-reader format
5. **Optimization** - Minifies and compresses files

## Output Formats

### PDF Format

**Best for:**
- Printing
- Desktop reading
- Archiving
- Sharing

**Features:**
- Print-ready typography
- Page numbers and headers/footers
- Embedded fonts
- Optimized file size

**Distribution:**
- Direct download
- Email
- Print-on-demand services

### EPUB Format

**Best for:**
- E-readers (Kindle, Kobo, etc.)
- Mobile devices
- Reflowable text
- Accessibility

**Features:**
- Responsive layout
- Font selection
- Bookmarks and annotations
- Table of contents

**Distribution:**
- Amazon Kindle Store
- Apple Books
- Google Play Books
- Smashwords
- Draft2Digital

### MOBI Format

**Best for:**
- Amazon Kindle devices
- Legacy e-readers
- Offline reading

**Features:**
- Kindle-optimized
- Auto-generated from EPUB
- Smaller file size
- Wide compatibility

### HTML Format

**Best for:**
- Web viewing
- GitHub Pages
- Online reading
- Accessibility

**Features:**
- Responsive design
- Interactive elements
- Search-friendly
- Mobile-optimized

## Publishing Platforms

### Self-Publishing Platforms

#### Amazon Kindle Direct Publishing (KDP)

1. Create account at kdp.amazon.com
2. Create new book
3. Upload MOBI or PDF
4. Set pricing
5. Publish

#### Apple Books

1. Join Apple Books for Authors
2. Upload EPUB
3. Add metadata
4. Submit for review
5. Publish

#### Google Play Books

1. Register at play.google.com/books/publish
2. Upload EPUB or PDF
3. Add book details
4. Submit

#### Draft2Digital

1. Sign up at draft2digital.com
2. Upload EPUB
3. Choose retail partners
4. Publish

### Direct Sales

- Host PDF on your website
- Use services like Gumroad
- Email directly to customers
- GitHub Pages for web version

## GitHub Integration

### Automatic Builds

Push to trigger automatic builds:

```bash
git add .
git commit -m "Update content"
git push origin main
```

GitHub Actions will:
- Validate content
- Build all formats
- Create releases
- Deploy to GitHub Pages

### Viewing Built eBooks

**GitHub Pages (HTML):**
```
https://username.github.io/fair-dinkum-book-hub
```

**Releases (PDF, EPUB, MOBI):**
```
https://github.com/username/fair-dinkum-book-hub/releases
```

## Pre-Publication Checklist

- ✅ All content validated
- ✅ Frontmatter complete
- ✅ Images included and optimized
- ✅ Links verified
- ✅ Formatting consistent
- ✅ Proof-read content
- ✅ Build successful
- ✅ Output files reviewed
- ✅ Metadata ready
- ✅ Distribution plan set

## Version Management

Update version in `package.json`:

```json
{
  "version": "1.0.0"
}
```

Follow semantic versioning:
- **1.0.0** - Format: MAJOR.MINOR.PATCH
- MAJOR - Breaking changes
- MINOR - New features
- PATCH - Bug fixes

## Marketing Your eBook

1. **Create landing page** - Use GitHub Pages
2. **Share on social media** - Announce publication
3. **Send to mailing list** - Email subscribers
4. **Submit to directories** - eBook aggregators
5. **Get reviews** - Request reader feedback

You're ready to publish your eBook!
