# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development (runs Velite content build, then Next.js dev server)
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

All pages live under `src/app/(home)/` route group, which wraps content in Header + Footer via its layout. Key routes:

- `/` — Home (Hero, AboutMe, LatestProjects, MyExperience)
- `/labs/*` — Interactive experiments (UI components, Modern CSS, ECharts, React Virtual)
- `/projects/[slug]` — Dynamic MDX content pages
- `/music` — Spotify integration dashboard
- `/hiking`, `/activities` — Strava activity tracking
- `/api/spotify/*` — Spotify API proxy routes
- `/api/resume` — Server-rendered resume PDF (`force-static`, prerendered at build time)

### Content System

**Velite** compiles MDX from `content/projects/` into `.velite/` (gitignored). Config in `velite.config.ts`. Content is imported as `#site/content` (path alias to `.velite/`). Code blocks use `rehype-pretty-code` with `github-dark` theme.

### Styling

Tailwind v4 configured entirely in `src/app/globals.css` via `@theme` directive — no separate tailwind.config file. Theme uses OKLCH color space CSS variables (`--foreground`, `--background`, `--border`, `--muted-foreground`, etc.) with light/dark mode support via `next-themes`. The core shadcn tokens in the first `:root`/`.dark` blocks come from shadcn preset `b1D0dv72` (style `radix-mira`, neutral, `--radius: 0.625rem`); the later `:root`/`.dark` blocks only hold site-specific extras (`surface-*`, `foreground-secondary`, `success`/`info`/`warning`, `accent-violet`). Don't re-add shadcn slot tokens there — later blocks win and silently override the preset. Site font is **LINE Seed Sans TH** (Thai + Latin, from https://seed.line.me), loaded with `next/font/local` from `src/app/fonts/LINESeedSansTH_W_*.woff2` in `src/app/layout.tsx`. Only weights 100/400/700/800/900 exist, so `font-medium` renders as Regular and `font-semibold` as Bold. `lineSeed.variable` must stay on `<html>` (not `<body>`): `--font-sans` is declared on `:root` as `var(--font-line-seed)` and resolves to Times if the variable isn't defined at that level. (The resume PDF still uses its own Inter TTF.)

### Key Patterns

- **ShowcaseWrapper** (`src/app/(home)/labs/ui/_components/showcase-wrapper.tsx`): Wraps lab demos with Preview/Code tabs and Shiki syntax highlighting
- **Card** (`src/components/card.tsx`): Reusable card accepting a `thumbnail: ReactNode` for inline SVG illustrations that respond to theme
- **Lab illustrations** (`src/components/lab-illustrations/`): Inline SVG React components using Tailwind theme classes (`stroke-foreground`, `fill-card`, etc.) for dark/light mode support
- **Tech stack icons** (`src/components/icons/`): Brand SVG components consumed by `AboutMe`. Icons should NOT hardcode `width`/`height` attributes — let the parent control sizing via Tailwind (e.g. `[&_svg]:h-6 [&_svg]:w-auto`) so wordmarks and square marks line up at the same optical height
- **Providers** (`src/components/providers.tsx`): ThemeProvider + React Query QueryClientProvider
- **Resume PDF** (`src/components/resume-pdf/ResumeDocument.tsx` + `src/app/api/resume/route.tsx`): JSX-based resume rendered with `@react-pdf/renderer`. **The PDF is the resume — there is no markdown source.** Content comes from two single sources of truth: experience entries from `src/data/experiences.ts` (shared with the on-page `MyExperience` component) and header/summary/skills/education from `src/data/resume-meta.ts`. Edit those data files, never try to regenerate from a markdown file. Inter variable TTF lives in `src/components/resume-pdf/fonts/` (server-only, NOT in `public/`) and is loaded via `process.cwd()` path so Next.js output file tracing bundles it for Vercel functions. The route is `runtime = 'nodejs'` + `dynamic = 'force-static'` so the PDF prerenders once at build time and serves as a cached static asset
- **Experience data** (`src/data/experiences.ts`): Typed object literals with `as const satisfies readonly Experience[]` pattern (NOT class instances). The `Experience` type lives in `src/lib/experience.ts`. This shape is consumed by both `MyExperience` (web) and `ResumeDocument` (PDF) — keep them in sync by editing the data file alone

### External Integrations

- **Spotify API**: Client credentials in env vars (`SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`)
- **Strava API**: Activity data (`STRAVA_CLIENT_ID`, `STRAVA_CLIENT_SECRET`, `STRAVA_ACCESS_TOKEN`, `STRAVA_REFRESH_TOKEN`)
- **Vercel**: `@vercel/analytics` + `@vercel/speed-insights`

### shadcn/ui

Configured via `components.json` (style `radix-mira`, installed with `bunx --bun shadcn@latest init --preset b1D0dv72 --template next`). Components live in `src/components/ui/` and import `cn` from shadcn's `cn` package (replacement for clsx + tailwind-merge); `@/lib/utils` re-exports it alongside app helpers (`calculateDuration`, `decodePolyline`). Re-running `init` overwrites `src/lib/utils.ts` and `globals.css` — restore the helpers and re-check the token blocks afterwards. Add new components with `npx shadcn@latest add <component>`.

### Path Aliases

- `@/*` → `./src/*`
- `#site/content` → `./.velite`

### Dependency Notes

- **`overrides`** in `package.json` are scoped security pins: `velite → sharp ^0.35.5` (velite pins `^0.34.5`, which has libvips CVEs) and `@tailwindcss/typography → postcss-selector-parser ^7.1.7` (typography pins `6.0.10`, GHSA-rj75-hqrm-r3gf). Drop each once the parent package bumps its own range — `npm audit` should stay at 0. Do NOT re-add a global `brace-expansion` override: ESLint 10's minimatch needs brace-expansion v5 and a `^2` pin crashes lint.
- **TypeScript is pinned `~6.0.3`, not 7.x**: `typescript-eslint` (pulled in by `eslint-config-next`) hard-fails on TS ≥ 7 and only supports `<6.1.0`. Bump once typescript-eslint adds TS 7 support (typescript-eslint/typescript-eslint#10940).
- **TanStack Table v9** (`src/components/custom-ui/data-table/`): features are opt-in via `dataTableFeatures` (`tableFeatures({...})`). Using a new table/row/column API (filtering, visibility, etc.) requires registering its feature there first, or the method won't exist. Column pinning is logical (`start`/`end`, not `left`/`right`); column `meta.sticky` follows the same naming. Use `DataTableColumnDef<TData>` for column arrays.
- **React Compiler** is active in Next 16.4 via `babel-plugin-react-compiler`. Lint will emit `react-hooks/incompatible-library` warnings on `useVirtualizer()` calls in `src/components/virtual/*` and the `/labs/virtual` page. These are informational — the compiler gracefully skips memoizing those components, TanStack Virtual handles its own memoization. Do not try to "fix" by wrapping or refactoring.
- **`@react-pdf/renderer`** powers `/api/resume`. It only supports a Flexbox subset of CSS (no grid, no media queries), embedded fonts must be **TTF or OTF only** (woff/woff2 are NOT supported), and the route must run on `runtime = 'nodejs'` (edge runtime will not work). React-PDF auto-subsets fonts, so the final PDF stays small even though `Inter.ttf` is 856 KB on disk.
