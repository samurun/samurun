/# CLAUDE.md

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

**Next.js 16 App Router** portfolio site with TypeScript, React 19, Tailwind CSS v4, and shadcn/ui (radix-lyra style).

### Routing

All pages live under `src/app/(home)/` route group, which wraps content in Header + Footer via its layout. Key routes:

- `/` — Home (Hero, AboutMe, LatestProjects, MyExperience)
- `/labs/*` — Interactive experiments (UI components, Modern CSS, ECharts, React Virtual)
- `/projects/[slug]`, `/blogs/[slug]` — Dynamic MDX content pages
- `/music` — Spotify integration dashboard
- `/hiking`, `/activities` — Strava activity tracking
- `/api/spotify/*` — Spotify API proxy routes

### Content System

**Velite** compiles MDX from `content/posts/` and `content/projects/` into `.velite/` (gitignored). Config in `velite.config.ts`. Content is imported as `#site/content` (path alias to `.velite/`). Code blocks use `rehype-pretty-code` with `github-dark` theme.

### Styling

Tailwind v4 configured entirely in `src/app/globals.css` via `@theme` directive — no separate tailwind.config file. Theme uses OKLCH color space CSS variables (`--foreground`, `--background`, `--border`, `--muted-foreground`, etc.) with light/dark mode support via `next-themes`. The `--radius` is forced to `0` for sharp corners.

### Key Patterns

- **ShowcaseWrapper** (`src/app/(home)/labs/ui/_components/showcase-wrapper.tsx`): Wraps lab demos with Preview/Code tabs and Shiki syntax highlighting
- **Card** (`src/components/card.tsx`): Reusable card accepting a `thumbnail: ReactNode` for inline SVG illustrations that respond to theme
- **Lab illustrations** (`src/components/lab-illustrations/`): Inline SVG React components using Tailwind theme classes (`stroke-foreground`, `fill-card`, etc.) for dark/light mode support
- **Providers** (`src/components/providers.tsx`): ThemeProvider + React Query QueryClientProvider

### External Integrations

- **Spotify API**: Client credentials in env vars (`SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`)
- **Strava API**: Activity data (`STRAVA_CLIENT_ID`, `STRAVA_CLIENT_SECRET`, `STRAVA_ACCESS_TOKEN`, `STRAVA_REFRESH_TOKEN`)
- **Vercel**: `@vercel/analytics` + `@vercel/speed-insights`

### shadcn/ui

Configured via `components.json`. Components live in `src/components/ui/`. Add new components with `npx shadcn@latest add <component>`.

### Path Aliases

- `@/*` → `./src/*`
- `#site/content` → `./.velite`
