# Pithonix AI global website

React 19 with Vite and TypeScript. Pages are in `pages/`, shared parts in `components/`, all styles and keyframes in `index.css`. Run with `npm run dev`, build with `npm run build`.

## Motion (reanimate skill)

The `reanimate` skill is installed at `.claude/skills/reanimate/` (MIT, from niazMorshed2007/reanimate). It films a reference animation (live site, screen recording, mp4, gif or Lottie), rebuilds it here, films the copy the same way, and compares the two until timing and easing match. Run: `/reanimate <what>, <where it is>, <where it goes>`.

- **Build in CSS and React.** There is no animation library here. Reuse the keyframes in `index.css` and `components/ScrollReveal.tsx` before adding new ones. Ask before adding a library.
- **Our look, their timing.** Copy timing, order and easing only. Never copy another brand's shapes, colours, images or wording.
- **Reduced motion is missing today.** `index.css` has no `prefers-reduced-motion` rule. Add one with the first motion change, and make the canvas backgrounds (`ParticleNetwork`, `CircuitBackground`) respect it.
- **Capturing our copy:** `npm run dev`, then capture the local URL at the same viewport as the reference.
- Evidence goes in `.reanimate/<name>/` (git-ignored). Needs Bun; first run downloads about 250 MB of tools.
