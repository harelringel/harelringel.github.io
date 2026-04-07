const puppeteer = require('puppeteer');
const path = require('path');

async function exportPDF() {
  console.log('Starting PDF export...');
  
  const browser = await puppeteer.launch({
    headless: 'new'
  });
  
  const page = await browser.newPage();
  
  // Load the local HTML file
  const htmlPath = 'file://' + path.resolve(__dirname, 'index.html');
  console.log('Loading:', htmlPath);
  
  await page.goto(htmlPath, {
    waitUntil: 'networkidle0'
  });
  
  // Generate PDF with A4 settings
  await page.pdf({
    path: 'Harel-Ringel-Resume.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      right: '0mm',
      bottom: '0mm',
      left: '0mm'
    }
  });
  
  console.log('PDF exported successfully: Harel-Ringel-Resume.pdf');
  
  await browser.close();
}

exportPDF().catch(error => {
  console.error('Error exporting PDF:', error);
  process.exit(1);
});
