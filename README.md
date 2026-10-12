# Zyro Flow public website

Customer-facing marketing site and fictional WhatsApp booking demonstration, hosted on GitHub Pages. Visitors do not sign in. The video and interactive demo do not send messages, take payments, or store real booking data.

## Development

Run `npm install` and `npm run build`. Edit the readable HTML, CSS, and JavaScript in `src/`; `tools/build.mjs` produces the public HTML and minified assets with content-based filenames. Commit the generated files to publish through GitHub Pages.

## Performance and themes

The HTML includes the full page content before JavaScript runs. The minified stylesheet is inlined so first paint needs no additional CSS request. Scripts are deferred, fonts use the native system stack, video downloads only when playback begins, and its poster loads only when visible. Light and dark modes share contrast-tested color tokens. A saved theme overrides the system preference; otherwise the site follows system changes. Reduced-motion preferences are respected.

## Private systems

This public repository contains no backend credentials or database data. Live integrations and the backend remain separate. Contact: ananthajeethd4@gmail.com / +91 80896 01107.
