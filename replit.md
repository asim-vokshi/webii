# Asim Vokshi School Website

Official website for Shkolla e Mesme me Orientim Gjuhësor "Asim Vokshi" — a language-focused high school in Tirana, Albania.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Other commands

```bash
npm run build     # production build → dist/
npm run preview   # preview the production build
npm run typecheck # TypeScript check
```

## Stack

- React 19 + Vite 7
- Tailwind CSS v4
- Framer Motion (animations)
- Wouter (routing)
- Shadcn/ui components (Radix UI base)
- Lenis (smooth scrolling)

## Project structure

```
src/
  pages/       # one file per route
  components/  # shared components + ui/ (shadcn)
  hooks/       # custom React hooks
  contexts/    # React contexts (theme)
  content/     # site content data
  lib/         # utilities
public/
  images/      # static images
  videos/      # static videos
index.html
vite.config.ts
```

## User preferences

- Keep it simple: plain npm, no monorepo tooling
