# Harel Ringel - Professional Portfolio

A clean, professional single-page portfolio website showcasing skills, experience, and contact information.

## Features

- Responsive single-page design
- Professional layout with clear sections
- PDF export capability for resume
- Clean, modern aesthetic
- Print-optimized styling

## Structure

```
portfolio_site/
├── index.html          # Main portfolio page
├── export-pdf.js       # PDF export script
├── package.json        # Node.js dependencies
├── photo.jpg          # Profile photo (120x120px recommended)
└── README.md          # This file
```

## Setup

1. Clone or download this repository
2. Add your profile photo as `photo.jpg` (120x120px recommended)
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Viewing the Portfolio

Simply open `index.html` in any modern web browser.

### Exporting to PDF

Generate a PDF version of your resume:

```bash
npm run export-pdf
```

This creates `Harel-Ringel-Resume.pdf` in the same directory.

## Customization

### Update Content

Edit `index.html` to update:
- Personal information
- Skills and expertise
- Work experience
- Education
- Contact details

### Styling

All styles are contained within `<style>` tags in `index.html`. Key sections:
- `:root` - Color scheme and fonts
- `.container` - Main layout
- `.section` - Section styling
- Print styles under `@media print`

### Colors

Current color scheme:
- Primary: #2c3e50 (dark blue-gray)
- Secondary: #3498db (bright blue)
- Accent: #e74c3c (red)
- Background: #f8f9fa (light gray)

## Technologies

- HTML5
- CSS3
- Puppeteer (for PDF export)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT License - Feel free to use this template for your own portfolio.

## Author

Harel Ringel
