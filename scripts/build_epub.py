#!/usr/bin/env python3
"""
EPUB eBook generation script
Converts markdown content to EPUB format
"""

import os
import sys
import yaml
from pathlib import Path
from ebooklib import epub


def load_frontmatter(content):
    """Parse YAML frontmatter from markdown content"""
    if not content.startswith('---'):
        return {}, content

    lines = content.split('\n')
    end_index = -1

    for i in range(1, len(lines)):
        if lines[i].strip() == '---':
            end_index = i
            break

    if end_index == -1:
        return {}, content

    try:
        frontmatter_str = '\n'.join(lines[1:end_index])
        metadata = yaml.safe_load(frontmatter_str) or {}
        body = '\n'.join(lines[end_index + 1:]).strip()
        return metadata, body
    except yaml.YAMLError as e:
        print(f"Warning: Could not parse frontmatter: {e}")
        return {}, content


def build_epub():
    """Build EPUB from markdown files in content directory"""
    try:
        print("🚀 Starting EPUB generation...")

        # Create book
        book = epub.EpubBook()
        book.set_identifier('fair-dinkum-book-hub')
        book.set_language('en')

        # Get metadata from first chapter if available
        content_dir = Path('content')
        metadata_file = Path('book_metadata.yaml')

        metadata = {
            'title': 'Fair Dinkum Book Hub',
            'author': 'Your Name',
            'language': 'en',
        }

        if metadata_file.exists():
            with open(metadata_file, 'r', encoding='utf-8') as f:
                file_metadata = yaml.safe_load(f)
                if file_metadata:
                    metadata.update(file_metadata)

        book.set_title(metadata['title'])
        book.add_author(metadata['author'])

        chapters = []

        # Process markdown files
        if not content_dir.exists():
            print("⚠️  Content directory not found")
            return False

        md_files = sorted([f for f in content_dir.iterdir() if f.suffix == '.md'])

        for idx, md_file in enumerate(md_files, 1):
            print(f"  Processing: {md_file.name}")

            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()

            meta, body = load_frontmatter(content)
            title = meta.get('title', md_file.stem)

            # Create chapter
            chapter = epub.EpubHtml()
            chapter.file_name = f'chap_{idx:02d}.xhtml'
            chapter.title = title
            chapter.content = f'<h1>{title}</h1>\n<p>{body.replace(chr(10), "</p><p>")}</p>'

            chapters.append(chapter)
            book.add_item(chapter)

        # Add navigation
        book.toc = chapters
        book.spine = ['nav'] + chapters

        # Add default NCX and Nav files
        book.add_item(epub.EpubNcx())
        book.add_item(epub.EpubNav())

        # Create dist directory
        dist_dir = Path('dist')
        dist_dir.mkdir(exist_ok=True)

        # Write EPUB
        epub_path = dist_dir / 'ebook.epub'
        epub.write_epub(str(epub_path), book, {})

        file_size = epub_path.stat().st_size / (1024 * 1024)
        print(f"✅ EPUB generated successfully")
        print(f"📊 File size: {file_size:.2f} MB")
        print(f"📁 Output: {epub_path}")
        print(f"📚 Chapters: {len(chapters)}")

        return True

    except Exception as e:
        print(f"❌ EPUB generation failed: {str(e)}")
        return False


if __name__ == '__main__':
    success = build_epub()
    sys.exit(0 if success else 1)
