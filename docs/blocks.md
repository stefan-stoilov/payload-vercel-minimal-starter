# Blocks

**Surface:** Shared (config = admin, Component = frontend) · **Category:** Block

Blocks are reusable content units editors stack inside a page `layout` or embed
inside rich text. Each lives in a folder under `src/blocks/` that typically holds:

- `config.ts` — the Payload `Block` definition (fields + `blockType` slug)
- `Component.tsx` — the React component that renders it on the frontend
- (some also have `mock.ts` + `*.stories.tsx` for Storybook)

## How blocks are rendered

There are **three** rendering paths — not every block goes through `RenderBlocks`:

1. **Page layout blocks** → `src/blocks/RenderBlocks.tsx` maps `blockType` to a
   component:

   ```ts
   const blockComponents = {
     archive: ArchiveBlock,
     content: ContentBlock,
     cta: CallToActionBlock,
     formBlock: FormBlock,
     mediaBlock: MediaBlock,
   }
   ```

2. **Inline rich-text blocks** → `src/components/RichText/index.tsx` renders
   blocks embedded inside Lexical content: **Banner**, **Code**, **MediaBlock**,
   and **CTA**.

3. **Post-page block** → **RelatedPosts** has no `config.ts`; it is rendered
   directly by `posts/[slug]/page.tsx`.

## Block catalog

| Block | `blockType` | Config | Component | Rendered via |
| --- | --- | --- | --- | --- |
| Archive | `archive` | `ArchiveBlock/config.ts` | `ArchiveBlock/Component.tsx` | RenderBlocks |
| Content | `content` | `Content/config.ts` | `Content/Component.tsx` | RenderBlocks |
| CallToAction | `cta` | `CallToAction/config.ts` | `CallToAction/Component.tsx` | RenderBlocks + RichText |
| Form | `formBlock` | `Form/config.ts` | `Form/Component.tsx` | RenderBlocks |
| MediaBlock | `mediaBlock` | `MediaBlock/config.ts` | `MediaBlock/Component.tsx` | RenderBlocks + RichText |
| Banner | `banner` | `Banner/config.ts` | `Banner/Component.tsx` | RichText (inline) |
| Code | `code` | `Code/config.ts` | `Code/Component.tsx` | RichText (inline) |
| RelatedPosts | — | _(none)_ | `RelatedPosts/Component.tsx` | Post page (direct) |

## Per-block detail

### Archive — `archive`

- **Purpose:** Grid of posts, either auto-populated by category or hand-picked.
- **Fields:** `introContent` (richText), `populateBy` (`collection` | `selection`),
  `relationTo` (`posts`), `categories`, `limit`, `selectedDocs`.
- **Server/Client:** async server component — queries Payload directly via
  `getPayload()`, then renders `CollectionArchive`.

### Content — `content`

- **Purpose:** Multi-column rich text with optional per-column links.
- **Fields:** `columns[]` of `{ size: oneThird | half | twoThirds | full, richText,
  enableLink, link }`.
- **Server/Client:** server. Uses a column-span grid.

### CallToAction — `cta`

- **Purpose:** Rich text beside action button(s).
- **Fields:** `richText`, `links` (`linkGroup`, appearances `default`/`outline`,
  max 2).
- **Server/Client:** server. Renders `RichText` + `CMSLink`s.

### Form — `formBlock`

- **Purpose:** Embeds a form defined in the Form Builder plugin's `forms`
  collection.
- **Fields:** `form` (relationship → `forms`, required), `enableIntro`,
  `introContent` (conditional richText).
- **Field components:** `src/blocks/Form/` includes per-type inputs — Checkbox,
  Email, Number, Select, Text, Textarea, Country, State, plus Width/Message/Error.
- **Server/Client:** client — uses `react-hook-form`, submits to
  `/api/form-submissions`.

### MediaBlock — `mediaBlock`

- **Purpose:** Display an image/video, optionally with caption.
- **Fields:** `media` (upload → `media`, required).
- **Props:** also accepts `staticImage`, `imgClassName`, `disableInnerContainer`,
  etc. when used inline.
- **Server/Client:** server. Renders the `Media` component.

### Banner — `banner` _(inline only)_

- **Purpose:** Colored alert callout inside rich text.
- **Fields:** `style` (`info` | `warning` | `error` | `success`), `content` (richText).
- **Server/Client:** server.

### Code — `code` _(inline only)_

- **Purpose:** Syntax-highlighted code block with a copy button.
- **Fields:** `language` (`typescript` | `javascript` | `css`), `code`.
- **Files:** `Component.tsx` (server) delegates to `Component.client.tsx` +
  `CopyButton.tsx` (client).

### RelatedPosts _(no block config)_

- **Purpose:** "Keep reading" grid at the bottom of a post.
- **Props:** `{ docs?: Post[]; introContent?: DefaultTypedEditorState }`.
- **Server/Client:** server. Renders `Card`s. Rendered directly by the post page,
  populated from the post's `relatedPosts` relationship.

## Storybook

Six presentational blocks have Storybook stories + type-safe mocks (each `mock.ts`
is annotated with the generated block type so a config change breaks the build):
CallToAction, Content, Banner, MediaBlock, Code, RelatedPosts. See the
`*.stories.tsx` / `mock.ts` files in each block folder and
`src/mocks/fixtures.ts`. Async (Archive) and API-dependent (Form) blocks
are intentionally excluded.
