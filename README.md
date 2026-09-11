# Phaneendra Katakam — Portfolio

Personal portfolio for **Phaneendra Katakam**, focused on the journey from Cloud Engineering and production operations toward Applied AI and Forward Deployed Engineering.

## Live site

https://phaneendrakatakam.github.io

## Featured projects

- **KnowledgeHub AI** — Multi-user multimodal RAG knowledge platform  
  https://github.com/phaneendrakatakam/KnowledgeHub-AI
- **SupportPilot AI** — Human-in-the-loop AI support investigation and resolution system  
  https://github.com/phaneendrakatakam/SupportPilot-AI

## Portfolio highlights

- Responsive desktop, tablet, and mobile layout
- Cloud → Applied AI → FDE career journey
- Recruiter-focused project summaries
- Direct LinkedIn, GitHub, email, and resume access
- Mobile navigation with accessible open/close state
- GitHub Pages deployment from `main`
- Lightweight static stack: HTML, CSS, and JavaScript

## Structure

```text
.
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   └── portfolio-config.js
├── assets/
│   └── resume/
│       └── Phaneendra_Katakam.pdf
├── docs/
│   └── QA.md
├── favicon.svg
├── favicon.ico
├── CHANGELOG.md
└── README.md
```

## Updating the portfolio

After changing files locally:

```bash
git add .
git commit -m "Update portfolio"
git push
```

GitHub Pages automatically redeploys the latest `main` branch.

### Updating project links

Project buttons currently open GitHub repositories. When a live demo is available, update the relevant `href` in `index.html`; a separate GitHub link can also be retained.

### Updating the quote

The displayed quote is configured in:

```text
js/portfolio-config.js
```

## Deployment

This repository is the GitHub Pages user site for `phaneendrakatakam`, so the production URL is:

```text
https://phaneendrakatakam.github.io
```


## V2.5 skill icons

Uses real visual icons in the Skills section via Iconify CDN so the stack feels closer to the provided reference.


## V2.6 — Cinematic polish

- Reordered skills around the Cloud → AI story.
- Increased real skill icon size and refined spacing/card hierarchy.
- Expanded the opening into a ~2.4s cinematic three-act sequence with letterbox bars, energy streaks, kinetic role progression, and a shutter/energy reveal.
- Kept the rest of the portfolio interactions fast and responsive.
