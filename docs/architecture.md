# Architecture

The template runs **two surfaces from one Next.js app**, separated by App Router
route groups under `src/app/`.

## The two surfaces

### `(payload)` — admin + API

`src/app/(payload)/`

| Route | Purpose |
| --- | --- |
| `admin/[[...segments]]/page.tsx` | The Payload admin panel (CMS UI) |
| `admin/importMap.js` | Generated map of custom admin components |
| `api/[...slug]/route.ts` | Payload REST API |
| `api/graphql/route.ts` | GraphQL API |
| `api/graphql-playground/route.ts` | GraphQL playground |

Everything the editor sees lives here. Custom React that customizes this panel is
documented in [admin-ui.md](./admin-ui.md).

### `(frontend)` — the public website

`src/app/(frontend)/`

| Route | Renders |
| --- | --- |
| `layout.tsx` | Root layout: wires `Providers`, `AdminBar`, `Header`, `Footer`, theme init, fonts, global metadata |
| `page.tsx` + `[slug]/page.tsx` | Pages collection documents (home = the `home` slug) |
| `posts/page.tsx` | Posts archive (paginated, 12/page) |
| `posts/[slug]/page.tsx` | A single post (PostHero + RichText content) |
| `posts/page/[pageNumber]/page.tsx` | Paginated post archive pages |
| `search/page.tsx` | Search results from the `search` collection |
| `next/seed/route.ts` | POST endpoint to seed demo content |
| `next/preview/route.ts`, `next/exit-preview/route.ts` | Draft-mode preview enter/exit |
| `(sitemaps)/pages-sitemap.xml`, `posts-sitemap.xml` | Dynamic sitemaps |

The `*.page.client.tsx` siblings are small client components that set the header
theme for that route via the `HeaderTheme` provider.

## Data & render flow

A page request flows from CMS data to rendered React like this:

```
Page document (Pages collection)
  ├── hero  ──────────────►  RenderHero  ──►  HighImpact | MediumImpact | LowImpact
  └── layout (blocks[]) ──►  RenderBlocks ──►  Archive | Content | CTA | Form | Media
                                                   │
RichText fields ──► RichText component ──► inline blocks: Banner, Code, MediaBlock, CTA
```

- **`src/heros/RenderHero.tsx`** maps `hero.type` → a hero component.
- **`src/blocks/RenderBlocks.tsx`** maps each block's `blockType` → its component
  (`archive`, `content`, `cta`, `formBlock`, `mediaBlock`).
- **`src/components/RichText/index.tsx`** renders Lexical content and additionally
  renders blocks embedded *inside* rich text (Banner, Code, MediaBlock, CTA).
- A post page renders `PostHero` directly (not through `RenderHero`) and appends
  `RelatedPosts` directly (not through `RenderBlocks`).

See [blocks.md](./blocks.md) and [heros.md](./heros.md) for the per-item detail.

## Drafts, live preview & revalidation

- **Drafts/versions**: Pages and Posts have versioned drafts with autosave and
  scheduled publish. The frontend reads drafts when Next.js **draft mode** is on
  (entered via `next/preview`).
- **Live preview**: configured in `payload.config.ts` (`admin.livePreview`,
  breakpoints Mobile/Tablet/Desktop). `LivePreviewListener` on the frontend
  refreshes the page when an editor saves.
- **Revalidation**: collection/global `afterChange`/`afterDelete` hooks call
  `revalidatePath`/`revalidateTag` so the static frontend updates on publish. See
  [building-blocks.md](./building-blocks.md#hooks).

## Theming flow

- `InitTheme` (in `<head>`) sets the `data-theme` attribute before paint to avoid a
  flash. The `Theme` provider manages light/dark (localStorage + system
  preference); `ThemeSelector` (in the footer) lets users switch Auto/Light/Dark.
- The `HeaderTheme` provider lets a hero/page override the header's color
  independently of the page theme. See [frontend-components.md](./frontend-components.md#providers).

## Full component classification table

Every React component in the template, by surface and category.

| Component | Path | Surface | Category | Server/Client |
| --- | --- | --- | --- | --- |
| BeforeLogin | `components/BeforeLogin/index.tsx` | Admin UI | Admin customization | Server |
| BeforeDashboard | `components/BeforeDashboard/index.tsx` | Admin UI | Admin customization | Server |
| SeedButton | `components/BeforeDashboard/SeedButton/index.tsx` | Admin UI | Admin customization | Client |
| Header RowLabel | `Header/RowLabel.tsx` | Admin UI | Global field UI | Client |
| Footer RowLabel | `Footer/RowLabel.tsx` | Admin UI | Global field UI | Client |
| Header | `Header/Component.tsx` + `Component.client.tsx` | Frontend | Global (Layout/Nav) | Server + Client |
| Footer | `Footer/Component.tsx` | Frontend | Global (Layout/Nav) | Server |
| AdminBar | `components/AdminBar/index.tsx` | Frontend | Layout/Nav (admin-adjacent) | Client |
| Logo | `components/Logo/Logo.tsx` | Frontend | Layout/Nav | Server |
| RichText | `components/RichText/index.tsx` | Frontend | Content rendering | Server |
| Media | `components/Media/index.tsx` (+ Image/Video) | Frontend | Content rendering | Client |
| CMSLink | `components/Link/index.tsx` | Frontend | Links | Server |
| CollectionArchive | `components/CollectionArchive/index.tsx` | Frontend | Collections | Server |
| Card | `components/Card/index.tsx` | Frontend | Collections | Client |
| Pagination | `components/Pagination/index.tsx` | Frontend | Collections | Client |
| PageRange | `components/PageRange/index.tsx` | Frontend | Collections | Server |
| LivePreviewListener | `components/LivePreviewListener/index.tsx` | Frontend | Special | Client |
| PayloadRedirects | `components/PayloadRedirects/index.tsx` | Frontend | Special | Server |
| ArchiveBlock | `blocks/ArchiveBlock/Component.tsx` | Frontend | Block | Server (async) |
| ContentBlock | `blocks/Content/Component.tsx` | Frontend | Block | Server |
| CallToActionBlock | `blocks/CallToAction/Component.tsx` | Frontend | Block | Server |
| MediaBlock | `blocks/MediaBlock/Component.tsx` | Frontend | Block | Server |
| BannerBlock | `blocks/Banner/Component.tsx` | Frontend | Block (inline) | Server |
| CodeBlock | `blocks/Code/Component.tsx` (+ client) | Frontend | Block (inline) | Server + Client |
| FormBlock | `blocks/Form/Component.tsx` | Frontend | Block | Client |
| RelatedPosts | `blocks/RelatedPosts/Component.tsx` | Frontend | Block (post-page) | Server |
| HighImpactHero | `heros/HighImpact/index.tsx` | Frontend | Hero | Client |
| MediumImpactHero | `heros/MediumImpact/index.tsx` | Frontend | Hero | Server |
| LowImpactHero | `heros/LowImpact/index.tsx` | Frontend | Hero | Server |
| PostHero | `heros/PostHero/index.tsx` | Frontend | Hero | Server |
| Theme provider | `providers/Theme/index.tsx` | Frontend | Provider | Client |
| HeaderTheme provider | `providers/HeaderTheme/index.tsx` | Frontend | Provider | Client |
| ThemeSelector | `providers/Theme/ThemeSelector/index.tsx` | Frontend | Provider UI | Client |
| Search | `search/Component.tsx` | Frontend | Special | Client |
| `ui/*` | `components/ui/*` | Frontend | Primitive (shadcn) | Client |

> Server/Client is based on the presence of a `'use client'` directive or client
> hooks; "Server + Client" means a server wrapper delegates to a client child.
