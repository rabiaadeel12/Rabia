# rabia-portfolio

Interactive pastel-dreamcore portfolio site. Vite + React + Tailwind v4.

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
stack groups, projects, writing list, playlist, socials. Nothing is hard-coded
in the components. Entries marked `PLACEHOLDER` are samples; the projects and
writing sections are labelled as samples on the page too, so swap those first.

## Change the look

`src/index.css` holds the whole design system as CSS custom properties at the
top: colours, radii, shadows, fonts. Change `--lilac` / `--cotton` / `--sky` /
`--mint` / `--butter` and the entire site — including the game's blobs — follows,
because the canvas reads its palette from those same tokens.

Three theme states are handled: light, dark via `prefers-color-scheme`, and an
explicit `data-theme="light" | "dark"` on `<html>` if you ever add a toggle.

## What's where

```
src/
  content.js            all copy and data — start here
  index.css             tokens + every component class
  hooks.js              scroll reveal, scroll progress, active nav section
  App.jsx               page composition
  components/
    Nav.jsx             floating pill nav + scroll progress bar
    Hero.jsx            name, tagline, floating sticker cluster
    Marquee.jsx         tilted infinite ticker (pauses on hover)
    About.jsx           your bio + the plan/act/observe loop
    Stack.jsx           tools grouped by purpose
    Projects.jsx        die-cut project stickers
    Writing.jsx         dated list of posts and papers
    NowPlaying.jsx      player-shaped vibe widget (no audio, no API)
    BlobCatch.jsx       30-second canvas mini-game, best score in localStorage
    Contact.jsx         CTA + socials + footer
```

## Notes

- Reveal animations only hide elements that start below the fold, so the first
  paint is never blank — good for link previews and screenshots.
- `prefers-reduced-motion` disables the marquee, auras, bobbing, and reveals.
- The player is a mood widget: it plays nothing and talks to no service. Put
  your real build playlist in `content.js`.
- No email address is published by default — `socials` ships with
  `you@example.com`. Change it only if you want it public.
