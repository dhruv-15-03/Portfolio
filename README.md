# Portfolio — Dhruv Rastogi

A storytelling-driven, motion-aware personal site for a Full Stack Engineer focused on backend, JVM systems, and LLM applications.

> **Live:** [dhruvrastogi.me](https://dhruvrastogi.me)

---

## What this site is

Five routes, one narrative:

| Route             | Purpose                                                                    |
| ----------------- | -------------------------------------------------------------------------- |
| `/`               | Hero · live DhrLang playground · tech marquee · short intro                |
| `/about`          | Story arc, technical arsenal, tools, GitHub heatmap                        |
| `/project`        | "Featured" + "More work" bands, every card uses Impact → Problem → Approach |
| `/work/boot-usage`| Long-form case study — Apache-2.0 Spring Boot Actuator starter            |
| `/work/ai-court`  | Long-form case study — ML legal-outcome classifier + MLOps + RAG search    |
| `/work/algovisualizer` | Long-form case study — 18 ML algorithms running in-browser via WebAssembly |
| `/resume`         | Career overview with sticky right-rail TOC and a single PDF download       |

A global CTA band sits above the footer on every route so there is always a clear next action.

---

## The signature moment

The home page embeds a **live in-browser DhrLang playground** — a hand-written tokenizer and recursive-descent parser that mirrors the real compiler's shape. You type DhrLang source, and the AST on the right rebuilds on every keystroke.

It covers the parser-level surface (classes, `kaam` methods, typed locals — `num`/`duo`/`sab`/`kya`/`ek` — multi-dim arrays, expressions with precedence, member access, `try`/`catch`/`finally`). Type checking, generics, IR lowering, and the bytecode + EVM backends live in the [full DhrLang compiler](https://github.com/dhruv-15-03/DhrLang) (currently v3.0.0).

Why a playground instead of a screen recording? It cannot exist in a README, and it transfers credibility in under five seconds.

---

## Stack

- **React 17** + **react-router-dom 6** (SPA)
- **react-bootstrap 2** for layout primitives
- **typewriter-effect** for the hero role rotator
- **react-parallax-tilt** for subtle 3D on selected surfaces
- **react-github-calendar** for the GitHub heatmap
- **react-icons** for the icon set (Di / Si / Fa / Bs / Cg / Fi / Ai)
- **Create React App 5** + `patch-package`

No CSS framework beyond Bootstrap reset; everything visual lives in [`src/style.css`](src/style.css). No animation library — `framer-motion` and `gsap` were intentionally avoided. All motion is hand-written CSS keyframes plus tiny `IntersectionObserver` hooks ([`useReveal`](src/hooks/useReveal.js), [`useCountUp`](src/hooks/useCountUp.js)).

Bundle size: **~195 KB JS / ~35 KB CSS** gzipped.

---

## Premium polish layer

- **Magnetic cursor** with mouse-follow halo ([`src/components/Cursor.js`](src/components/Cursor.js)). Auto-disables on touch devices, on `prefers-reduced-motion`, and below 1280 px.
- **Global spotlight** — a fixed radial gradient anchored to the cursor coordinate via CSS variables `--mx` / `--my`.
- **Scroll progress bar** at the top of the viewport, throttled with `requestAnimationFrame`.
- **Page transitions** on route change (fade · slide · subtle blur-in).
- **Animated number counters** in the hero metrics, fired by `IntersectionObserver`.
- **Infinite tech marquee** below the hero.
- **Glassmorphic navbar** that activates blur once the user scrolls past 20 px, with an animated gradient underline on the active route.
- **SVG film-grain overlay** at 0.06 opacity for texture.
- All effects respect `prefers-reduced-motion`.

---

## Project structure

```
src/
├── App.js                  # Routes + global polish layer
├── index.js
├── style.css               # Single source of truth for layout + motion
├── components/
│   ├── Navbar.js
│   ├── Footer.js
│   ├── CTA.js              # Global "Let's talk" band, rendered above the footer
│   ├── Cursor.js           # Magnetic cursor + spotlight driver
│   ├── ScrollProgress.js
│   ├── PageTransition.js
│   ├── TechMarquee.js
│   ├── DhrLangPlayground.js  # The signature moment
│   ├── Home/    (Home, Home2, Type)
│   ├── About/   (About, AboutCard, Techstack, Toolstack, Github)
│   ├── Projects/(Projects, ProjectCards)
│   ├── Resume/  (ResumeNew  — career-overview page, single CV download)
│   └── Work/    (CaseStudy shared frame · BootUsageCase · AICourtCase)
├── hooks/
│   ├── useReveal.js        # Scroll-reveal IntersectionObserver
│   └── useCountUp.js       # Easing number tween
└── Assets/
```

---

## Run locally

```powershell
npm install
npm start          # dev server on http://localhost:3000
npm run build      # production bundle in /build
npx serve -s build # serve the production bundle on http://localhost:3000
```

Requires Node 16+.

---

## Design rules I held to

1. **Gradient restraint.** One gradient-text element per viewport (the `DHRUV RASTOGI` wordmark in the hero). Everything else is white or muted gray.
2. **Defensible content only.** Every claim on the site maps to either a job on the resume, a public GitHub artifact, or a public profile.
3. **Honest motion.** Every animation has a job; no decoration-for-decoration's sake. All of it degrades gracefully.
4. **No template assets.** No stock photos. No avatar illustration. No placeholder copy.
5. **Story over showcase.** Project cards lead with **Impact**, then Problem, then Approach. Case studies follow Outcomes → Problem → Architecture → Trade-offs → Postmortem → Stack.

---

## Contact

- **Email** — dhruvrastogi2004@gmail.com
- **LinkedIn** — [dhruv-rastogi-3b744032b](https://www.linkedin.com/in/dhruv-rastogi-3b744032b/)
- **GitHub** — [@dhruv-15-03](https://github.com/dhruv-15-03)
- **LeetCode** — [dhruv_1503](https://leetcode.com/u/dhruv_1503/) (Knight, 1,000+ solved)

Open to **Founding Engineer** and **Senior IC** roles — fully remote, hybrid, or relocation.

---

MIT licensed. Built with care.
