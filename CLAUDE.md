# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Lint
npm run lint
```

No test framework is configured.

## Architecture

**Next.js 16 App Router** portfolio site with TypeScript, React 19.3, Tailwind CSS v4, and shadcn/ui. UI primitives mix `@radix-ui/*`, `radix-ui` (umbrella package), and `@base-ui/react`.

### Routing

**Single-page site** — the home page is the only page. It lives under the `src/app/(home)/` route group, whose layout wraps it in Header + Footer.

- `/` — Home (Hero, AboutMe, LatestProjects, MyExperience)
- `/api/spotify/now-playing` — Spotify proxy; feeds the header equalizer and the footer player
- `/api/resume` — Server-rendered resume PDF (`force-static`, prerendered at build time)

Old paths (`/projects/*`, `/labs/*`, `/music`, `/hiking`, `/activities`) permanently redirect home via `redirects()` in `next.config.ts`; anything else hits `src/app/not-found.tsx`. Social previews come from `metadataBase` + `openGraph` in the root layout and the generated `src/app/opengraph-image.tsx` (`next/og`).

The header has no nav — just the logo, the now-playing equalizer (only while something is playing), and the theme toggle. "View Projects" in the Hero scrolls to `#projects`; "All Projects" links to the GitHub profile.

### Projects

`LatestProjects` shows GitHub repos only, via `getGithubProjects()` in `src/lib/github.ts`: public, non-fork, non-archived repos with a description and the `portfolio` topic, newest push first. To show a project on the site, add the `portfolio` topic to its GitHub repo. Cards link out to GitHub. (The old MDX/Velite project pages were removed.)

### Styling

Tailwind v4 configured entirely in `src/app/globals.css` via `@theme` directive — no separate tailwind.config file. Theme uses OKLCH color space CSS variables (`--foreground`, `--background`, `--border`, `--muted-foreground`, etc.) with light/dark mode support via `next-themes`. The core shadcn tokens in the first `:root`/`.dark` blocks come from shadcn preset `b1D0dv72` (style `radix-mira`, neutral, `--radius: 0.625rem`); the later `:root`/`.dark` blocks only hold site-specific extras (`surface-*`, `foreground-secondary`, `success`/`info`/`warning`, `accent-violet`). Don't re-add shadcn slot tokens there — later blocks win and silently override the preset. Site font is **LINE Seed Sans TH** (Thai + Latin, from https://seed.line.me), loaded with `next/font/local` from `src/app/fonts/LINESeedSansTH_W_*.woff2` in `src/app/layout.tsx`. Only weights 100/400/700/800/900 exist, so `font-medium` renders as Regular and `font-semibold` as Bold. `lineSeed.variable` must stay on `<html>` (not `<body>`): `--font-sans` is declared on `:root` as `var(--font-line-seed)` and resolves to Times if the variable isn't defined at that level. (The resume PDF still uses its own Inter TTF.)

### Key Patterns

- **Tech stack icons** (`src/components/icons/`): Brand SVG components consumed by `AboutMe`. Icons should NOT hardcode `width`/`height` attributes — let the parent control sizing via Tailwind (e.g. `[&_svg]:h-6 [&_svg]:w-auto`) so wordmarks and square marks line up at the same optical height
- **Providers** (`src/components/providers.tsx`): ThemeProvider + React Query QueryClientProvider
- **Resume PDF** (`src/components/resume-pdf/ResumeDocument.tsx` + `src/app/api/resume/route.tsx`): JSX-based resume rendered with `@react-pdf/renderer`. **The PDF is the resume — there is no markdown source.** Content comes from two single sources of truth: experience entries from `src/data/experiences.ts` (shared with the on-page `MyExperience` component) and header/summary/skills/education from `src/data/resume-meta.ts`. Edit those data files, never try to regenerate from a markdown file. Inter variable TTF lives in `src/components/resume-pdf/fonts/` (server-only, NOT in `public/`) and is loaded via `process.cwd()` path so Next.js output file tracing bundles it for Vercel functions. The route is `runtime = 'nodejs'` + `dynamic = 'force-static'` so the PDF prerenders once at build time and serves as a cached static asset
- **Experience data** (`src/data/experiences.ts`): Typed object literals with `as const satisfies readonly Experience[]` pattern (NOT class instances). The `Experience` type lives in `src/lib/experience.ts`. This shape is consumed by both `MyExperience` (web) and `ResumeDocument` (PDF) — keep them in sync by editing the data file alone

### External Integrations

- **Spotify API**: Client credentials in env vars (`SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`)
- **GitHub API**: project cards (`GITHUB_TOKEN` optional — raises the rate limit)
- **Vercel**: `@vercel/analytics` + `@vercel/speed-insights`

### shadcn/ui

Configured via `components.json` (style `radix-mira`, installed with `bunx --bun shadcn@latest init --preset b1D0dv72 --template next`). Components live in `src/components/ui/` and import `cn` from shadcn's `cn` package (replacement for clsx + tailwind-merge); `@/lib/utils` re-exports it alongside app helpers (`calculateDuration`). Re-running `init` overwrites `src/lib/utils.ts` and `globals.css` — restore the helpers and re-check the token blocks afterwards. Add new components with `npx shadcn@latest add <component>`.

### Path Aliases

- `@/*` → `./src/*`

### Dependency Notes

- Do NOT add a global `brace-expansion` override: ESLint 10's minimatch needs brace-expansion v5 and a `^2` pin crashes lint.
- **TypeScript is pinned `~6.0.3`, not 7.x**: `typescript-eslint` (pulled in by `eslint-config-next`) hard-fails on TS ≥ 7 and only supports `<6.1.0`. Bump once typescript-eslint adds TS 7 support (typescript-eslint/typescript-eslint#10940).
- **React Compiler** is active in Next 16.4 via `babel-plugin-react-compiler`.
- **`@react-pdf/renderer`** powers `/api/resume`. It only supports a Flexbox subset of CSS (no grid, no media queries), embedded fonts must be **TTF or OTF only** (woff/woff2 are NOT supported), and the route must run on `runtime = 'nodejs'` (edge runtime will not work). React-PDF auto-subsets fonts, so the final PDF stays small even though `Inter.ttf` is 856 KB on disk.
