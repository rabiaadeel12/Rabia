# rabia-portfolio

Interactive cherry-red portfolio site. Vite + React + Tailwind v4.

## Run it

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`. `npm run build` writes a static site to
`dist/`, which you can drop on Vercel, Netlify, Cloudflare Pages, or GitHub
Pages.

## Edit the content

Everything on the page comes from **`src/content.js`** — name, about text,
stack groups, projects, credentials, playlist, socials. Nothing is
hard-coded in the components.

## Change the look

`src/index.css` holds the whole design system as CSS custom properties at
the top: colours, radii, shadows, fonts. Change `--lilac` / `--cotton` /
`--sky` / `--mint` / `--butter` and the entire site — including the game's
blobs — follows, because the canvas reads its palette from those same
tokens.

The site is dark-only by design — no light-mode toggle.

## What's where

```
src/
  content.js             all copy and data — start here
  index.css              tokens + every component class
  hooks.js               scroll reveal, scroll progress, active nav section, tilt
  App.jsx                page composition
  components/
    Cursor.jsx            custom dot-and-ring cursor (fine pointers only)
    IntroSplash.jsx        the boot-up beat + "want something on?" prompt on load
    FloatingPlayer.jsx     playlist widget, opt-in from the splash (first track is real audio)
    Nav.jsx                floating pill nav + scroll progress bar
    Hero.jsx               name, tagline, facts
    InteractiveCat.jsx     rigged 3D cat (three.js + GLTF), lazy-loaded,
                           docked as a small pet widget in the corner
    Marquee.jsx            tilted infinite ticker (pauses on hover)
    About.jsx              bio + the "right now" snapshot
    Stack.jsx              tools grouped by purpose
    Projects.jsx           project cards with cursor-driven 3D tilt
    Research.jsx           education & credentials, dated list
    BlobCatch.jsx           30-second canvas mini-game, best score in localStorage
    Contact.jsx             CTA + socials + footer
```

## Notes

- Reveal animations only hide elements that start below the fold, so the
  first paint is never blank — good for link previews and screenshots.
- `prefers-reduced-motion` disables the marquee, auras, cursor, and
  tilt — and for the cat specifically, skips loading three.js
  altogether (not just pausing it), so reduced-motion visitors never
  pay for that bundle.
- `InteractiveCat.jsx` renders a small rigged GLB (self-hosted at
  `public/models/toon-cat.glb`, ~200KB) with plain three.js — no
  react-three-fiber. It's docked as a small fixed widget in the bottom
  corner of the viewport (not a big hero panel) and lazy-loaded
  (`React.lazy` in `Hero.jsx`) so the ~160KB gzipped three.js chunk
  never blocks the initial page render. Model credit: "Toon Cat FREE"
  by Omabuarts Studio, CC-BY-4.0 (see the code comment at the top of
  `InteractiveCat.jsx` for the source link) — no on-page credit line by
  request.
- The floating player is mostly a mood widget — most tracks play nothing
  and talk to no service — except whichever entry in `content.js` has a
  `src` field (currently the first one, self-hosted at
  `public/audio/`). That one plays for real: the intro splash starts it
  from inside the actual click event (so the browser's autoplay gate
  allows it), and `FloatingPlayer.jsx` takes over the same `<audio>`
  element (`src/audioPlayer.js`) afterward. Add or remove `src` on a
  track to change which ones are real.
- No email address is published by default beyond the one in
  `content.js` — a public page invites scraping in a way a PDF CV does
  not, so the phone number is deliberately absent.
- One photo, `public/images/rabia-cutout.png`, set in `content.js` as
  `profile.heroPhoto`. Its background is removed (fully transparent,
  not just a matching flat colour), floating beside the headline in
  the hero with a soft glow and a slow bob. To replace it: start from
  a photo shot on a plain, even background, cut out the background
  (leave it truly transparent, not filled with a solid colour) before
  dropping the file in.
