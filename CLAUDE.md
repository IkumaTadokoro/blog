# CLAUDE.md

必ず日本語で回答してください。
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Start development server:**
```bash
pnpm dev
```

**Build for production:**
```bash
pnpm build
```

**Deploy to Cloudflare:**
```bash
pnpm deploy
```

**Preview locally:**
```bash
pnpm preview:local
```

**Type checking and linting:**
```bash
pnpm check          # Runs both astro check and biome check
pnpm check:astro     # Astro type checking
pnpm check:biome     # Biome linting
pnpm format          # Format code with Biome
pnpm lint            # Lint and fix with Biome
```

**Testing:**
```bash
pnpm test            # Unit tests with Vitest
pnpm test:ui         # Vitest UI
pnpm test:e2e        # E2E tests with Playwright
pnpm test:e2e:update # Update Playwright snapshots
```

## Architecture

This is an Astro-based blog site using the Content Layer API with a Feature-Sliced Design (FSD) architecture.

### Content Collections
- **Blog posts:** Located in `src/data/blog/` with `.mdx` files
- **Talks:** External data loaded via RSS feeds and APIs
- Collections are defined in `src/content.config.ts` using custom loaders

### Project Structure (FSD-inspired)
```
src/
├── entities/          # Business entities (blog, talk, author)
│   ├── blog/
│   │   ├── api/       # Data loaders
│   │   ├── model/     # Schemas and types
│   │   └── ui/        # Reusable blog components
│   └── talk/
├── features/          # Feature implementations
│   ├── blog/          # Blog-specific features
│   ├── pagination/    # Pagination logic
│   └── rss/          # RSS feed generation
├── pages/             # Astro pages (routing)
├── shared/            # Shared utilities and UI
│   ├── config/        # Site and markdown configuration
│   ├── lib/          # Utilities
│   └── ui/           # Base UI components
└── widgets/           # Layout components
    └── layout/        # Header, footer, document structure
```

### Key Technologies
- **Astro 5** with Content Layer API
- **React** for interactive components
- **Tailwind CSS** with custom configuration
- **Biome** for linting and formatting
- **Vitest** for unit testing
- **Playwright** for E2E testing
- **pnpm** as package manager
- **Cloudflare Pages** for deployment

### Content Management
- Blog posts use MDX with frontmatter validation via Zod schemas
- Custom loaders handle external data sources (talks from RSS/APIs)
- Markdown processing includes syntax highlighting, auto-linking, and external link handling

### Code Style
- **Biome** handles formatting and linting
- Tab indentation, single quotes, trailing commas
- Astro files excluded from Biome formatting
- Pre-commit hooks run type checking, linting, and tests via Lefthook
