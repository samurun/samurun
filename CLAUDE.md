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

**Next.js 16 App Router** portfolio site with TypeScript, React 19.2, Tailwind CSS v4, and shadcn/ui. UI primitives mix `@radix-ui/*`, `radix-ui` (umbrella package), and `@base-ui/react`.

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

Tailwind v4 configured entirely in `src/app/globals.css` via `@theme` directive — no separate tailwind.config file. Theme uses OKLCH color space CSS variables (`--foreground`, `--background`, `--border`, `--muted-foreground`, etc.) with light/dark mode support via `next-themes`. The `--radius` is forced to `0` for sharp corners.

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

Configured via `components.json`. Components live in `src/components/ui/`. Add new components with `npx shadcn@latest add <component>`.

### Path Aliases

- `@/*` → `./src/*`
- `#site/content` → `./.velite`

### Dependency Notes

- **`overrides.brace-expansion`** in `package.json` forces a safe version because ESLint 9.x still pins an old `minimatch@3` → `brace-expansion@1.1.12` (CVE GHSA-f886-m6hf-6m8v). Do not remove the override until ESLint upstream bumps its own deps — `npm audit` will regress to 1 moderate vuln.
- **`overrides.postcss`** in `package.json` forces `postcss@^8.5.17` because Next 16.2 pins a vulnerable nested `postcss` (GHSA-qx2v-qp2m-jg93). Do not remove until Next bumps its own dep — `npm audit` will regress to 2 moderate vulns. Never run `npm audit fix --force` here; it tries to downgrade to `next@9`.
- **Version policy**: stay on latest minor/patch within current majors. Deliberately NOT upgraded (as of 2026-07): `eslint` 9 (not 10), `typescript` 5.9 (not the 7.x native compiler), `react-day-picker` 9 (not 10).
- **React Compiler** is active in Next 16.2 via `babel-plugin-react-compiler`. Lint will emit `react-hooks/incompatible-library` warnings on `useVirtualizer()` calls in `src/components/virtual/*` and the `/labs/virtual` page. These are informational — the compiler gracefully skips memoizing those components, TanStack Virtual handles its own memoization. Do not try to "fix" by wrapping or refactoring.
- **`@react-pdf/renderer`** powers `/api/resume`. It only supports a Flexbox subset of CSS (no grid, no media queries), embedded fonts must be **TTF or OTF only** (woff/woff2 are NOT supported), and the route must run on `runtime = 'nodejs'` (edge runtime will not work). React-PDF auto-subsets fonts, so the final PDF stays small even though `Inter.ttf` is 856 KB on disk.
