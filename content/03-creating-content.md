---
title: Creating Content
author: Fair Dinkum Publishing
date: 2026-06-09
---

# Creating Content for Your eBook

This chapter covers everything you need to know about writing and organizing content for Fair Dinkum Book Hub.

## Markdown Basics

Fair Dinkum Book Hub uses Markdown for content creation. Markdown is a lightweight markup language that's easy to write and read.

### Headings

```markdown
# Heading 1 (Chapter)
## Heading 2 (Section)
### Heading 3 (Subsection)
#### Heading 4
##### Heading 5
###### Heading 6
```

### Text Formatting

```markdown
**Bold text**
*Italic text*
***Bold and italic***
~~Strikethrough~~
`inline code`
```

### Lists

Unordered lists:

```markdown
- Item one
- Item two
  - Nested item
  - Another nested item
- Item three
```

Ordered lists:

```markdown
1. First item
2. Second item
3. Third item
```

### Links and Images

```markdown
[Link text](https://example.com)
![Alt text](image.jpg)
```

### Code Blocks

```markdown
```javascript
function helloWorld() {
  console.log('Hello, World!');
}
```
```

### Blockquotes

```markdown
> This is a quote
> 
> - With a list
> - Inside it
```

## YAML Frontmatter

Every chapter should start with YAML frontmatter containing metadata:

```yaml
---
title: Chapter Title
author: Author Name
date: 2026-06-09
---
```

### Supported Fields

- `title` (required) - Chapter or section title
- `author` (recommended) - Author or contributor name
- `date` (optional) - Creation or publication date
- `description` (optional) - Short description
- `keywords` (optional) - Comma-separated keywords

## File Organization

### Naming Convention

Name your files with numeric prefixes:

```
01-introduction.md
02-getting-started.md
03-creating-content.md
04-building-publishing.md
05-best-practices.md
```

Files are processed in alphabetical order, so the numeric prefix ensures proper ordering.

### Directory Structure

```
content/
├── 01-introduction.md
├── 02-getting-started.md
├── 03-creating-content.md
├── 04-building-publishing.md
└── 05-best-practices.md
```

## Content Guidelines

### Writing Style

- **Be clear and concise**: Use simple language
- **Use short paragraphs**: Easier to read on screens
- **Include examples**: Show, don't just tell
- **Be consistent**: Maintain formatting throughout

### Structure

Each chapter should have:

1. **Introduction** - Overview of the chapter
2. **Main content** - Organized with subheadings
3. **Examples** - Code or practical demonstrations
4. **Summary** - Key takeaways (optional)

### Best Practices

✅ **Do:**
- Use descriptive headings
- Keep lines reasonably short
- Use proper markdown formatting
- Include alt text for images
- Link to related sections

❌ **Don't:**
- Use all caps for emphasis
- Mix heading levels
- Create walls of text
- Use unclear abbreviations
- Forget to validate frontmatter

## Validation

Before building, validate your content:

```bash
# Validate markdown syntax
npm run validate:markdown

# Validate YAML frontmatter
npm run validate:frontmatter

# Run all validations
npm test
```

## Adding Images

Place images in an `assets/` directory:

```
.
├── assets/
│   └── image.jpg
└── content/
    └── 03-creating-content.md
```

Reference in markdown:

```markdown
![Description of image](../assets/image.jpg)
```

## Tips for Better Content

1. **Outline first** - Plan your content before writing
2. **Write in drafts** - Break content into manageable sections
3. **Review and edit** - Polish your writing
4. **Test the build** - Ensure it renders correctly
5. **Get feedback** - Have others review your content

You're now ready to create professional eBook content!
