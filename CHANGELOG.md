# Changelog

## 2.4 — Fast Cinematic Motion test build

- Shortened the opening sequence from roughly 2.5 seconds to roughly 1.45 seconds.
- Rebuilt the intro around a kinetic PK core, scan pass, full-name reveal, energy blast, and alternating shutter exit.
- Added a second-stage hero entrance that begins immediately after the intro clears.
- Accelerated scroll reveals, journey-path drawing, milestone timing, grouped-skill stagger, stats counting, modal motion, and hover transitions.
- Preserved the V2.3 grouped skills, compact projects, native cursor, constellation, parallax, and interactive motion.
- Local review build only; not pushed.

## 2.2 — Max Motion test build

- Added cinematic boot, constellation background, cursor effects, scroll progress, magnetic buttons, 3D project-card tilt, journey parallax/energy runner, richer staggered reveals, and continuous micro-animations.
- Preserved responsive/mobile behavior and added reduced-motion/performance fallbacks.
- Prepared for local review only; not pushed.

## 2.0 — Repository cleanup

- Consolidated the stylesheet into one clean final set of rules while preserving the current visual design.
- Removed obsolete project screenshot/mockup CSS and superseded header/mobile overrides.
- Removed hidden legacy hero tags and decorative social-link symbols from the HTML.
- Simplified the contact modal markup and replaced decorative symbols with clear text actions.
- Added explicit favicon references.
- Added `aria-controls` to the mobile navigation button.
- Kept the working responsive hamburger navigation and contact interactions.
- Replaced multiple per-version change-note files with this single changelog.
- Moved the final responsive QA notes to `docs/QA.md`.
- Refreshed the README to match the current portfolio.

## 1.9 — Mobile navigation

- Fixed the mobile hamburger menu being clipped by the rounded header.
- Added outside-tap closing and desktop resize reset behavior.
- Validated responsive layouts across desktop, tablet, and mobile viewports.

## 1.8 — Content cleanup

- Simplified career journey milestone copy.
- Removed project screenshots and decorative project icons.
- Refined project cards for repository-first navigation.

## 1.7 — Header containment

- Improved header inset, rounded corners, and edge spacing.

## 1.5–1.6 — Contact and header polish

- Simplified contact presentation and direct profile links.
- Improved header spacing and cache-busting.

## 1.4 — Recruiter-focused polish

- Refined hero and project content around Cloud, Applied AI, and Forward Deployed Engineering.


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
