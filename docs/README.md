# Component & Architecture Documentation

This `docs/` folder maps every component in the template and makes explicit which
surface each one belongs to: the **Payload admin/CMS** side or the **Next.js
frontend** side, and within those, what is a **collection**, **global**, **block**,
**hero**, **provider**, or **primitive**.

## What this template is

The [Payload CMS](https://payloadcms.com) "website / vercel starter" template — a
single codebase that serves two surfaces from one `src/` tree:

- **Payload admin + API** at `/admin` and `/api` — the CMS where editors manage
  content (collections, globals, blocks, forms, media).
- **Next.js frontend** — the public website that renders that content.

### Tech stack

| Area | Choice |
| --- | --- |
| CMS | Payload 3.x (`src/payload.config.ts`) |
| Framework | Next.js 16 (App Router), React 19 |
| Rich text | Lexical (`@payloadcms/richtext-lexical`) |
| Database | Vercel Postgres (`@payloadcms/db-vercel-postgres`) |
| File storage | Vercel Blob (`@payloadcms/storage-vercel-blob`) |
| Styling | Tailwind CSS v4, shadcn-style UI primitives, OKLCH theme vars |
| Images | `sharp` + Next.js `<Image>` |
| Component workshop | Storybook (`@storybook/nextjs-vite`) |

## Classification legend

Throughout these docs each item is tagged by **surface** and **category**:

- **Surface** — `Admin UI` (renders inside the Payload admin panel), `Frontend`
  (renders on the public site), or `Shared` (config/data used by both).
- **Category** — `Collection`, `Global`, `Block`, `Hero`, `Provider`, `Primitive`
  (shadcn UI), `Layout/Nav`, or `Config` (fields, hooks, access, plugins).

## `src/` directory map

```
src/
├── payload.config.ts        Payload config: collections, globals, plugins, db
├── payload-types.ts         Generated TS types (do not edit by hand)
├── app/
│   ├── (frontend)/          Public website routes + globals.css
│   └── (payload)/           Admin UI + REST/GraphQL API routes
├── collections/             Pages, Posts, Media, Categories, Users
├── Header/  Footer/         Globals (config + RowLabel + revalidate hook)
├── blocks/                  Block config + frontend Component + RenderBlocks
├── heros/                   Hero variants + RenderHero + config
├── components/              Frontend React components + ui/ primitives
├── providers/               Theme + HeaderTheme React context
├── fields/                  Reusable field configs (link, linkGroup, lexical)
├── access/                  Access-control functions
├── hooks/                   Shared collection/global hooks
├── plugins/                 Payload plugin registration
├── search/                  Search plugin sync + frontend Search component
├── utilities/               Helpers (data fetching, meta, formatting)
├── endpoints/seed/          Demo-content seeding scripts
└── migrations/              Database migrations
```

## Documentation index

| Doc | Covers |
| --- | --- |
| [architecture.md](./architecture.md) | The two surfaces, data/render flow, theming, and a full component classification table |
| [collections.md](./collections.md) | Pages, Posts, Media, Categories, Users (+ Folders, plugin collections) |
| [globals.md](./globals.md) | Header & Footer globals |
| [blocks.md](./blocks.md) | All blocks, their config, and how they render |
| [heros.md](./heros.md) | Hero variants and `RenderHero` |
| [admin-ui.md](./admin-ui.md) | Components that customize the Payload admin panel |
| [frontend-components.md](./frontend-components.md) | `src/components/`, `ui/` primitives, and providers |
| [building-blocks.md](./building-blocks.md) | Reusable fields, hooks, access, plugins, utilities |
