# ToolKit Pro - PDF & Image Tools SaaS

## Current State
New project. No existing application files.

## Requested Changes (Diff)

### Add
- Full SaaS-style web platform for PDF & Image tools
- Homepage with hero, drag & drop upload, tools grid, features section, how-it-works, FAQ
- Sticky navbar with logo, nav links, dark/light mode toggle
- Image Tools (all fully functional via HTML5 Canvas + jsPDF):
  - Image to PDF (with drag & reorder)
  - JPG to PNG / PNG to JPG converter
  - Image Compressor (quality slider)
  - Image Resizer (custom width/height)
  - Add Watermark (text + position)
  - Crop Tool
  - Rotate Image
  - Base64 Converter
- PDF Tools (UI ready, placeholder processing):
  - PDF to Word
  - Word to PDF
  - Merge PDF
  - Split PDF
- Multi-file upload with preview
- Loading spinner + progress bar during processing
- Success toast notifications after download
- Download all as ZIP (jszip)
- File size limit warnings
- Google AdSense placeholder slots (top banner, between tools grid, footer)
- Extra pages: About Us, Contact Us (form), Privacy Policy, Terms & Conditions
- SEO: meta tags, schema markup, proper heading hierarchy
- Dark/light mode toggle
- Fully mobile responsive

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Backend: minimal Motoko actor (contact form submission storage)
2. Frontend:
   - React Router for multi-page navigation
   - Homepage with all sections
   - Individual tool pages (each tool as a route)
   - Shared components: Navbar, Footer, AdBanner, Toast, FileUpload
   - Image processing via HTML5 Canvas
   - PDF generation via jsPDF
   - ZIP download via jszip
   - Dark mode via CSS variables + React context
   - AdSense placeholder divs with proper sizing
   - About, Contact, Privacy, Terms pages
   - SEO meta tags via react-helmet or direct head manipulation
