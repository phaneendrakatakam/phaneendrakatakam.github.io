# Portfolio V2.4 — Fast Cinematic Motion Test

Local-only review build. Do not push until approved.

## Final refinements

- Overall entrance/reveal timing is substantially faster and snappier.
- Intro is rebuilt as a compact sci-fi title sequence: kinetic PK core, scan sweep, name reveal, energy line, status lock, and alternating shutter exit.
- Hero content now performs a second-stage reveal after the intro instead of finishing behind the boot screen.
- Journey route and milestone sequence reaches the FDE summit much faster.
- Skills and stats stagger more quickly.
- Hover, modal, card, and section transitions respond faster while keeping the existing visual effects.
- Native mouse pointer, grouped skills, and minimal project cards remain unchanged.

## Local test

```powershell
python -m http.server 8000
```

Open `http://localhost:8000`.


## V2.5 skill icons

Uses real visual icons in the Skills section via Iconify CDN so the stack feels closer to the provided reference.


## V2.6 — Cinematic polish

- Reordered skills around the Cloud → AI story.
- Increased real skill icon size and refined spacing/card hierarchy.
- Expanded the opening into a ~2.4s cinematic three-act sequence with letterbox bars, energy streaks, kinetic role progression, and a shutter/energy reveal.
- Kept the rest of the portfolio interactions fast and responsive.

## V2.7 — Longer cinematic intro

- Preserves the exact V2.6 cinematic intro design and sequence.
- Extends the intro from about 2.4 seconds to about 3.0 seconds.
- Adds a slightly longer hold after the role/story reveal before the final energy blast and shutter transition.

## V2.8 — Mobile summary cleanup

- Removed the `∞ / Problems to Solve` summary item.
- Removed the `Real-World / Infrastructure × Intelligence × Impact` summary item.
- Summary now contains only Experience, AI Projects, and AWS Certifications.
- Replaced the old decorative stat glyphs with consistent icons.
- Fixed mobile alignment using a fixed icon column and text column.
- Reduced mobile vertical spacing so the summary card no longer feels oversized.

## V2.9 — Animation performance polish

- Replaced SVG `<animateMotion>` on the Journey runner with a CSS-animated energy trail using `stroke-dashoffset`.
- Removes the Chrome DevTools “SVG animations are not supported” warning from that Journey effect.
- The energy trail now uses a bright core plus a soft halo instead of a moving SVG circle.
- Pauses continuous decorative animations when their section is offscreen.
- Pauses CSS animation work when the browser tab is hidden.
- Keeps the existing constellation pause behavior and makes its resume path safer.
- Reduces constellation density, device-pixel ratio, line work, and render rate on compact/coarse-pointer devices.
- Disables several repaint-heavy continuous ambient effects on phones while preserving the cinematic intro and key Journey animation.
- Preserves `prefers-reduced-motion`.
