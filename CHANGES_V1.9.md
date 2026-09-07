# V1.9 Mobile Menu Fix

- Fixed the hamburger menu on phones.
- Root cause: the rounded header used `overflow: hidden`, which clipped the dropdown menu rendered below it.
- Mobile header now uses `overflow: visible`.
- Menu appears directly below the header with Home, Journey, Projects, Skills, Experience, Certifications, and Contact.
- Hamburger animates into a close icon while open.
- Tapping a navigation item closes the menu.
- Tapping outside the header closes the menu.
- Asset cache version bumped to `1.9`.
