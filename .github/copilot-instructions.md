# Copilot Instructions for Storyteller Astro Blog Theme

## Project Overview
- **Frameworks:** Astro (static site generator), Tailwind CSS (styling), TypeScript-ready
- **Purpose:** Minimal, monochrome blog theme focused on promoting writing and storytelling through promoting self-published novels and books, and sharing personal blog posts about writing and storytelling.
- **Content:** Markdown-based posts with rich frontmatter (category, tags, author, featured, images)
- **Config:** Global site settings in `src/site.config.mjs` (titles, display options, labels, analytics)

## Key Architecture & Patterns
- **Content Collections:**
  - Blog posts in `src/content/article/*.md` (see `config.ts` for schema)
  - Frontmatter fields: `title`, `description`, `pubDate`, `author`, `category`, `tags`, `featured`, `thumb`, `large`
- **Components:**
  - Reusable Astro components in `src/components/` (e.g., `Header.astro`, `PostCard.astro`, `FeaturedCard.astro`, `Pagination.astro`)
  - Layouts in `src/layouts/` (main: `BlogLayout.astro`)
- **Pages:**
  - Route-based files in `src/pages/` (e.g., `index.astro`, `blog/[...page].astro`, `article/[slug].astro`, `author/[author].astro`)
  - Pagination logic in `blog/[...page].astro` (see `paginate(sortedPosts, { pageSize: 8 })`)
- **Styling:**
  - Tailwind CSS classes throughout; global styles in `src/styles/global.css`
  - Theme toggle logic in `public/scripts/theme-toggle.js` (dark/light mode, localStorage persistence)

## Developer Workflows
- **Install dependencies:** `bun install` | `npm install` | `pnpm install`
- **Start dev server:** `bun run dev` | `npm run dev` | `pnpm dev` (default: http://localhost:4321)
- **Build for production:** `bun run build` | `npm run build` | `pnpm build`
- **Preview build:** `bun run preview` | `npm run preview` | `pnpm preview`
- **Deploy:**
  - Netlify: build command (`bun build`/`npm run build`), publish `dist/`
  - Vercel: Astro preset
  - Static hosting: upload `dist/`

## Project-Specific Conventions
- **Monochrome design:** Minimal color palette, focus on typography (customize in `BlogLayout.astro`)
- **Multi-author support:** Author pages, attribution via frontmatter, default author in config
- **Featured posts:** Mark with `featured: true` in frontmatter; displayed on homepage if enabled in config
- **SEO & Analytics:**
  - Meta tags, OpenGraph, sitemap, RSS auto-generated
  - Google Analytics via `gTag` in `site.config.mjs` (privacy-respecting, can be disabled)
- **Navigation:**
  - Customize menu in `Header.astro`
  - Footer links toggled via config

## Integration Points
- **Astro Content Collections:** Type-safe schema in `src/content/config.ts`
- **Theme toggle:** JS logic in `public/scripts/theme-toggle.js`, CSS variables
- **Images:** Use `thumb`/`large` fields in frontmatter for post images

## Examples
- **New post:** Add `.md` file to `src/content/article/` with required frontmatter
- **Change homepage layout:** Edit `src/pages/index.astro` and update config options
- **Add new label/text:** Update `labels` in `site.config.mjs`

## References
- `src/site.config.mjs` — global site settings
- `src/content/config.ts` — content schema
- `src/components/` — UI components
- `src/pages/` — route/page logic
- `src/layouts/BlogLayout.astro` — main layout and design
- `public/scripts/theme-toggle.js` — theme system
- `src/styles/global.css` — global styles

---
**For unclear or missing conventions, ask the user for clarification before making major changes.**
