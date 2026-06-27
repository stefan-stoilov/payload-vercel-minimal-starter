# Building blocks (config layer)

**Surface:** Shared / Admin · **Category:** Config

The reusable, non-visual pieces that collections, globals, and blocks are built
from: field factories, access functions, hooks, plugins, search, and utilities.

## Fields (`src/fields/`)

| Field | Path | Purpose |
| --- | --- | --- |
| `link()` | `fields/link.ts` | A link group: `type` (reference vs custom URL), `newTab`, `reference` (→ `pages`/`posts`) or `url`, optional `label`, optional `appearance` (`default`/`outline`). Accepts `appearances`, `disableLabel`, `overrides`. |
| `linkGroup()` | `fields/linkGroup.ts` | An array of `link()` fields (field name `links`). Accepts `appearances` and array `overrides` (e.g. `maxRows`). |
| `defaultLexical` | `fields/defaultLexical.ts` | The project-wide default Lexical editor (Bold/Italic/Underline/Paragraph/Link with internal-reference support + URL validation). Set as `editor` in `payload.config.ts`. |

`link`/`linkGroup` are used by the Header/Footer nav, the hero, the CTA block, and
Content columns.

## Access control (`src/access/`)

| Function | Path | Rule |
| --- | --- | --- |
| `anyone` | `access/anyone.ts` | Always allow (public read: Media, Categories, Header, Footer) |
| `authenticated` | `access/authenticated.ts` | Allow if `req.user` exists (create/update/delete; Users) |
| `authenticatedOrPublished` | `access/authenticatedOrPublished.ts` | Logged-in users see everything; the public sees only `_status: published` (Pages/Posts read) |

## Hooks

| Hook | Path | Type | Purpose |
| --- | --- | --- | --- |
| `populatePublishedAt` | `hooks/populatePublishedAt.ts` | `beforeChange` | Default `publishedAt` to now on Pages/Posts |
| `revalidateRedirects` | `hooks/revalidateRedirects.ts` | `afterChange` | Revalidate tag `redirects` |
| `revalidatePage` / `revalidateDelete` | `collections/Pages/hooks/revalidatePage.ts` | `afterChange`/`afterDelete` | Revalidate the page path + `pages-sitemap` |
| `revalidatePost` / `revalidateDelete` | `collections/Posts/hooks/revalidatePost.ts` | `afterChange`/`afterDelete` | Revalidate the post path + `posts-sitemap` |
| `populateAuthors` | `collections/Posts/hooks/populateAuthors.ts` | `afterRead` | Fill `populatedAuthors` from the authors relationship (so the Users collection stays private) |
| `revalidateHeader` | `Header/hooks/revalidateHeader.ts` | `afterChange` | Revalidate tag `global_header` |
| `revalidateFooter` | `Footer/hooks/revalidateFooter.ts` | `afterChange` | Revalidate tag `global_footer` |

These hooks are how publishing in the CMS updates the statically-rendered
frontend (see [architecture.md](./architecture.md#drafts-live-preview--revalidation)).

## Plugins (`src/plugins/index.ts`)

Registered in `payload.config.ts` via the `plugins` array.

| Plugin | What it adds |
| --- | --- |
| `redirectsPlugin` | `redirects` collection for `pages`/`posts`; `from` field note; `afterChange` → `revalidateRedirects` |
| `nestedDocsPlugin` | Hierarchy + URL generation for `categories` |
| `seoPlugin` | SEO meta fields with custom `generateTitle` / `generateURL` (`"… \| Payload Website Template"`) |
| `formBuilderPlugin` | `forms` + `form-submissions` collections; payment field disabled; rich-text confirmation message |
| `searchPlugin` | `search` collection synced from `posts` via `beforeSyncWithSearch`, with `searchFields` overrides |

> `vercelBlobStorage` (media storage) is also registered in the config's `plugins`
> array, alongside `...plugins`.

## Search (`src/search/`)

| File | Purpose |
| --- | --- |
| `beforeSync.ts` (`beforeSyncWithSearch`) | Transforms a post into a search doc (slug, title, meta, categories) before indexing |
| `fieldOverrides.ts` (`searchFields`) | Extra read-only fields on the `search` collection: `slug`, `meta`, `categories` |
| `Component.tsx` | The frontend search input (also listed in [frontend-components.md](./frontend-components.md)) |

## Utilities (`src/utilities/`)

| Utility | Purpose |
| --- | --- |
| `getGlobals.ts` | `getGlobal` / `getCachedGlobal` — fetch globals with cache tag `global_<slug>` |
| `getDocument.ts` | `getDocument` / `getCachedDocument` by collection + slug |
| `getRedirects.ts` | Cached fetch of the `redirects` collection |
| `getMeUser.ts` | Current authenticated user (via `payload-token` cookie) |
| `generateMeta.ts` | Build Next.js `Metadata` from a Page/Post |
| `mergeOpenGraph.ts` | Merge default OpenGraph with per-doc values |
| `getURL.ts` | `getServerSideURL()` / `getClientSideURL()` |
| `generatePreviewPath.ts` | Build live-preview/draft URLs |
| `formatDateTime.ts`, `formatAuthors.ts` | Display formatting |
| `getMediaUrl.ts` | Resolve a full media URL |
| `useClickableCard.ts`, `useDebounce.ts`, `canUseDOM.ts`, `ui.ts` (`cn`) | Client helpers |

## Seeding & migrations

- `src/endpoints/seed/` — scripts that populate demo content (triggered by the
  SeedButton / `next/seed` route).
- `src/migrations/` — database migrations for the Postgres schema.
