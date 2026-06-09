#!/usr/bin/env node
/**
 * PDF generation script using Puppeteer
 * Converts HTML to professional PDF format
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function buildPDF() {
  try {
    console.log('🚀 Starting PDF generation...\n');

    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Set viewport for consistent rendering
    await page.setViewport({
      width: 1920,
      height: 1080,
    });

    const htmlPath = path.join(__dirname, '../dist/html/index.html');

    if (!fs.existsSync(htmlPath)) {
      console.error('❌ HTML file not found. Run `npm run build:html` first.');
      await browser.close();
      return false;
    }

    console.log(`📄 Loading: ${htmlPath}`);
    await page.goto(`file://${htmlPath}`, {
      waitUntil: 'networkidle0',
    });

    const distDir = path.join(__dirname, '../dist');
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }

    const pdfPath = path.join(distDir, 'ebook.pdf');

    console.log('🖨️  Rendering PDF...');
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: {
        top: '1cm',
        right: '1cm',
        bottom: '1cm',
        left: '1cm',
      },
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<div style="font-size: 10px; width: 100%; text-align: center;"></div>',
      footerTemplate: '<div style="font-size: 10px; width: 100%; text-align: center;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
    });

    await browser.close();

    const fileSize = fs.statSync(pdfPath).size / (1024 * 1024);
    console.log('\n✅ PDF generated successfully');
    console.log(`📊 File size: ${fileSize.toFixed(2)} MB`);
    console.log(`📁 Output: ${pdfPath}`);

    return true;
  } catch (error) {
    console.error('❌ PDF generation failed:', error.message);
    return false;
  }
}

// Main execution
buildPDF().then(success => {
  process.exit(success ? 0 : 1);
});
