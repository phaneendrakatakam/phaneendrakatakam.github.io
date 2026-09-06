# Phaneendra Katakam — Portfolio

Static portfolio website designed for GitHub Pages.

## Live-site setup

1. Create a repository named `phaneendrakatakam.github.io`.
2. Upload the contents of this folder to the repository root.
3. In GitHub: **Settings → Pages → Deploy from a branch → main/master → /(root)**.
4. GitHub will publish the site at `https://phaneendrakatakam.github.io`.

## Current project links

- KnowledgeHub AI → https://github.com/phaneendrakatakam/KnowledgeHub-AI
- SupportPilot AI → https://github.com/phaneendrakatakam/SupportPilot-AI

## Future demo links

When a live project is deployed, edit the relevant `href` in `index.html`.

Example:

```html
<a class="project-link" href="https://your-live-demo.example.com">View Live Demo →</a>
```

You can optionally add a second button for the GitHub repository.

## Update workflow

```bash
git add .
git commit -m "Update portfolio"
git push
```

GitHub Pages will redeploy the latest version automatically.

## Files

- `index.html` — portfolio content and structure
- `css/style.css` — full responsive visual design
- `js/main.js` — mobile navigation, scroll reveal, active navigation
- `assets/resume/Phaneendra_Katakam.pdf` — resume used by the Resume button


## Change the portfolio quote

Open:

`js/portfolio-config.js`

Change only the `quote` value, save, commit, and push. GitHub Pages will redeploy automatically.

A shortlist is included in `QUOTE_OPTIONS.md`.


## V1.4 recruiter polish

- Selected quote: “Good engineering is not only about building systems — it is about understanding what the system needs to solve.”
- Refined hero copy to emphasize practical AI + production operations.
- Added recruiter-scan focus chips: AWS SAP-C02, RAG, Agentic AI, Production Operations.
- Rewrote project cards around actual V3 capabilities.
- Replaced decorative project mockups with real V3 screenshots loaded from the public GitHub repositories.
- Preserved the contact modal and direct LinkedIn / GitHub / Email links.

### Screenshot note

The project screenshots are loaded from the public `KnowledgeHub-AI` and `SupportPilot-AI` repositories through `raw.githubusercontent.com`.
If either repository becomes private or the image path is renamed, update the corresponding `<img src="...">` in `index.html`.
