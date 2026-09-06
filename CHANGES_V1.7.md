# V1.7 Header Containment Fix

This revision specifically addresses the remaining edge issue visible at wide desktop widths / browser zoom levels.

- Increased left and right header inset.
- Increased header inner padding.
- Made the header corners more visibly rounded.
- Enabled `overflow: hidden` so button glow/content cannot visually spill beyond rounded edges.
- Added dedicated safe space around the `PK` mark so the left side of `P` cannot clip.
- Added extra right-side breathing room around `Let's Connect`.
- Added responsive values for desktop, tablet, and mobile.
- Bumped CSS/JS cache version to `1.7`.
