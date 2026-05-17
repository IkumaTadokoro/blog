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


<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:7510c1e2 -->
## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` to see full workflow context and commands.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work
bd close <id>         # Complete work
```

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files

**Architecture in one line:** issues live in a local Dolt DB; sync uses `refs/dolt/data` on your git remote; `.beads/issues.jsonl` is a passive export. See https://github.com/gastownhall/beads/blob/main/docs/SYNC_CONCEPTS.md for details and anti-patterns.

## Session Completion

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds
<!-- END BEADS INTEGRATION -->
