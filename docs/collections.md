# Collections

**Surface:** Shared (defined for the admin, consumed by the frontend) ·
**Category:** Collection

Collections are Payload's content types. They're registered in
`src/payload.config.ts` and defined under `src/collections/` (plus one inline
collection and three plugin-generated ones).

```ts
// src/payload.config.ts
collections: [ { slug: 'folders', ... }, Pages, Posts, Media, Categories, Users ]
```

## Pages

- **Slug:** `pages` · **Path:** `src/collections/Pages/index.ts`
- **Purpose:** Flexible content pages assembled from blocks. The `home` slug is the
  site homepage.
- **Key fields:** `title`, `hero` (group from `src/heros/config.ts`),
  `layout` (blocks: CallToAction, Content, MediaBlock, Archive, FormBlock),
  `publishedAt`, `slug`, plus SEO tab (`meta.title/description/image`).
- **Features:** Versioned **drafts** with autosave + scheduled publish; **live
  preview** (via `generatePreviewPath`).
- **Access:** read = `authenticatedOrPublished`; create/update/delete = `authenticated`.
- **Hooks:** `beforeChange` → `populatePublishedAt`; `afterChange` → `revalidatePage`;
  `afterDelete` → `revalidateDelete`.
- **Rendered by:** `app/(frontend)/[slug]/page.tsx` → `RenderHero` + `RenderBlocks`.

## Posts

- **Slug:** `posts` · **Path:** `src/collections/Posts/index.ts`
- **Purpose:** Blog posts with categories, authors, and related posts.
- **Key fields:** `title`, `heroImage` (upload), `content` (richText with inline
  Banner/Code/MediaBlock), `relatedPosts` (self-relationship), `categories`,
  `authors` (relationship to users), `populatedAuthors` (hidden array), `publishedAt`,
  `slug`, SEO tab.
- **Features:** Versioned drafts + autosave + scheduled publish; live preview.
- **Access:** read = `authenticatedOrPublished`; create/update/delete = `authenticated`.
- **Hooks:** `beforeChange` → `populatePublishedAt`; `afterChange` → `revalidatePost`;
  `afterRead` → `populateAuthors`; `afterDelete` → `revalidateDelete`.
- **Rendered by:** `posts/[slug]/page.tsx` → `PostHero` + `RichText` + `RelatedPosts`;
  archive at `posts/page.tsx` → `CollectionArchive`.

## Media

- **Slug:** `media` · **Path:** `src/collections/Media.ts`
- **Purpose:** Uploads (images/video) with alt text, caption, and responsive sizes.
- **Key fields:** `alt`, `caption` (richText), `folder` (relationship).
- **Features:** Upload collection with **focal point**; generated image sizes:
  `thumbnail` (300w), `square` (500×500), `small` (600w), `medium` (900w),
  `large` (1400w), `xlarge` (1920w), `og` (1200×630). Stored in Vercel Blob.
- **Access:** read = `anyone`; create/update/delete = `authenticated`.

## Categories

- **Slug:** `categories` · **Path:** `src/collections/Categories.ts`
- **Purpose:** Taxonomy for filtering posts.
- **Key fields:** `title`, `slug`.
- **Features:** Hierarchical via the **nested docs** plugin (`generateURL` builds a
  breadcrumb-style path).
- **Access:** read = `anyone`; create/update/delete = `authenticated`. `useAsTitle: 'title'`.

## Users

- **Slug:** `users` · **Path:** `src/collections/Users/index.ts`
- **Purpose:** Admin/auth users; also the `authors` relationship target for posts.
- **Key fields:** `name` (+ Payload's built-in auth: email/password).
- **Features:** **Auth enabled**; this is the admin `user` collection
  (`admin.user: Users.slug`).
- **Access:** all operations = `authenticated`. `useAsTitle: 'name'`,
  `defaultColumns: ['name', 'email']`.

## Folders (inline)

- **Slug:** `folders` · **Defined inline in** `src/payload.config.ts`
- **Purpose:** Organize media into folders (`folders: true`). Single `name` field;
  `useAsTitle: 'name'`.

## Plugin-generated collections

These are created automatically by plugins (not present under `src/collections/`).
See [building-blocks.md](./building-blocks.md#plugins).

| Slug | Plugin | Purpose |
| --- | --- | --- |
| `forms` | `formBuilderPlugin` | Define forms used by the Form block (payment field disabled; rich-text confirmation message) |
| `form-submissions` | `formBuilderPlugin` | Stores submitted form data |
| `redirects` | `redirectsPlugin` | URL redirects for `pages`/`posts`; `afterChange` → `revalidateRedirects` |
| `search` | `searchPlugin` | Search index synced from `posts` via `beforeSyncWithSearch` |
