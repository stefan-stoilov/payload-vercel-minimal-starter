# Frontend components

**Surface:** Frontend · **Category:** various

Reusable React components for the public website, under `src/components/`, plus the
shadcn-style primitives in `src/components/ui/` and the context providers in
`src/providers/`. (Blocks and heros have their own docs:
[blocks.md](./blocks.md), [heros.md](./heros.md).)

## Layout & navigation

| Component | Path | Purpose | Server/Client |
| --- | --- | --- | --- |
| Header | `Header/Component.tsx` | Server wrapper; fetches the `header` global | Server |
| HeaderClient | `Header/Component.client.tsx` | Renders Logo + nav; applies header theme | Client |
| HeaderNav | `Header/Nav/index.tsx` | Nav links + search icon | Client |
| Footer | `Footer/Component.tsx` | Footer nav + `ThemeSelector` | Server |
| AdminBar | `components/AdminBar/index.tsx` | Edit/preview bar for logged-in editors | Client |
| Logo | `components/Logo/Logo.tsx` | Site logo image | Server |

> Header/Footer are **globals** — their config and admin RowLabels are in
> [globals.md](./globals.md). The components above are the frontend half.

## Content rendering

| Component | Path | Purpose | Server/Client |
| --- | --- | --- | --- |
| RichText | `components/RichText/index.tsx` | Renders Lexical content; also renders inline blocks (Banner, Code, MediaBlock, CTA) | Server |
| Media | `components/Media/index.tsx` | Dispatches to image or video | Client |
| ImageMedia | `components/Media/ImageMedia/index.tsx` | Next.js `<Image>` with responsive `sizes` | Client |
| VideoMedia | `components/Media/VideoMedia/index.tsx` | `<video>` wrapper | Client |

## Links

| Component | Path | Purpose | Server/Client |
| --- | --- | --- | --- |
| CMSLink | `components/Link/index.tsx` | Polymorphic link: internal reference (`pages`/`posts`) or external URL; optional button appearance | Server |

## Collections (post listing)

| Component | Path | Purpose | Server/Client |
| --- | --- | --- | --- |
| CollectionArchive | `components/CollectionArchive/index.tsx` | Responsive grid of post `Card`s | Server |
| Card | `components/Card/index.tsx` | Post preview: image, title, description, categories | Client (clickable card) |
| Pagination | `components/Pagination/index.tsx` | Prev/next + numbered page links | Client |
| PageRange | `components/PageRange/index.tsx` | "Showing X–Y of Z Posts" text | Server |

## Special / integration

| Component | Path | Purpose | Server/Client |
| --- | --- | --- | --- |
| LivePreviewListener | `components/LivePreviewListener/index.tsx` | Refreshes the page on CMS save during live preview | Client |
| PayloadRedirects | `components/PayloadRedirects/index.tsx` | Resolves Payload `redirects` collection entries server-side | Server |
| Search | `search/Component.tsx` | Debounced search input that updates the `?q=` query | Client |

## UI primitives (`components/ui/`)

shadcn-style primitives built on Radix + Tailwind. Used by blocks, forms, and
layout components.

| Primitive | File |
| --- | --- |
| Button | `ui/button.tsx` |
| Card | `ui/card.tsx` |
| Input | `ui/input.tsx` |
| Label | `ui/label.tsx` |
| Textarea | `ui/textarea.tsx` |
| Checkbox | `ui/checkbox.tsx` |
| Select | `ui/select.tsx` |
| Pagination | `ui/pagination.tsx` |

> `Button` has a Storybook story (`ui/button.stories.tsx`); see also the block
> stories described in [blocks.md](./blocks.md#storybook).

## Providers

`src/providers/index.tsx` composes the context stack, wired into the app by
`src/app/(frontend)/layout.tsx`:

```
<Providers> = <ThemeProvider><HeaderThemeProvider>{children}</…></…>
```

| Provider | Path | Purpose | Hook |
| --- | --- | --- | --- |
| Theme | `providers/Theme/index.tsx` | Light/dark mode via `data-theme`, localStorage + system preference | `useTheme()` |
| InitTheme | `providers/Theme/InitTheme/index.tsx` | Inline `<head>` script that sets the theme before paint (no flash) | — |
| ThemeSelector | `providers/Theme/ThemeSelector/index.tsx` | Auto/Light/Dark switch (in footer) | — |
| HeaderTheme | `providers/HeaderTheme/index.tsx` | Lets a hero/page override the header color independently | `useHeaderTheme()` |

## Root layout wiring

`src/app/(frontend)/layout.tsx` ties it together: sets Geist fonts + `data-theme`
via `InitTheme`, imports `globals.css`, then renders
`<Providers>` → `AdminBar` → `Header` → `{children}` → `Footer`, and exports the
default `metadata` (OpenGraph via `mergeOpenGraph`).
