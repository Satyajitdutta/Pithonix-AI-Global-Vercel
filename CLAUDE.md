# Pithonix AI global website

React 19 with Vite and TypeScript. Pages are in `pages/`, shared parts in `components/`, all styles and keyframes in `index.css`. Run with `npm run dev`, build with `npm run build`.

## Motion (reanimate skill)

The `reanimate` skill is installed at `.claude/skills/reanimate/` (MIT, from niazMorshed2007/reanimate). It films a reference animation (live site, screen recording, mp4, gif or Lottie), rebuilds it here, films the copy the same way, and compares the two until timing and easing match. Run: `/reanimate <what>, <where it is>, <where it goes>`.

- **Build in CSS and React.** There is no animation library here. Reuse the keyframes in `index.css` and `components/ScrollReveal.tsx` before adding new ones. Ask before adding a library.
- **Our look, their timing.** Copy timing, order and easing only. Never copy another brand's shapes, colours, images or wording.
- **Reduced motion is missing today.** `index.css` has no `prefers-reduced-motion` rule. Add one with the first motion change, and make the canvas backgrounds (`ParticleNetwork`, `CircuitBackground`) respect it.
- **Capturing our copy:** `npm run dev`, then capture the local URL at the same viewport as the reference.
- Evidence goes in `.reanimate/<name>/` (git-ignored). Needs Bun; first run downloads about 250 MB of tools.

## Design skills (Hallmark, Impeccable, Taste Skill, added 2026-11-25)

Installed at `.claude/skills/hallmark/`, `.claude/skills/impeccable/` and `.claude/skills/design-taste-frontend/` (Taste Skill). They are snapshots from `pithonix-repo-library`; update them with its `scripts/install-skill.sh`, never by hand.

- **This file wins.** The theme, fonts, writing rules and any canonical figures in this file beat every skill's defaults. The skills sharpen our design, they never replace it.
- **Which one when:** Hallmark for a brand new page. Impeccable to refine or audit an existing page (`/impeccable audit`, `polish`, `quieter`, `typeset`). Taste Skill to check that a new marketing page fits the business, in a real browser. reanimate for motion. When they disagree: Hallmark leads on the look of new pages, Impeccable on refinements, Taste Skill on fit to the business.
- **No redesign of a live page** unless the founder asks for one. A refinement keeps the current look, copy and layout.
- **Background checks:** Taste Skill runs a check when Claude finishes a turn while it is in use, and it can take a few minutes. Impeccable offers a check after every edit: answer no unless the founder has agreed. Impeccable downloads its engine on first use into `scripts/bin/`, which is git-ignored.
- **Working files:** `.taste-skill/` and `.impeccable/` may be committed. They stop consecutive designs from looking the same.
- Hallmark's image generation needs a paid Together AI key. It stays off unless the founder provides one.
