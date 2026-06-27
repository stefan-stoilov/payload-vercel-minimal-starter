# Heros

**Surface:** Frontend (rendered) + Shared (field config) · **Category:** Hero

A "hero" is the lead section at the top of a page. Unlike blocks, the hero is a
single **field group** on the Pages collection — the editor picks one `type` and
fills its fields, rather than stacking many.

## Field config

`src/heros/config.ts` exports the `hero` group field (added to Pages):

| Field | Type | Notes |
| --- | --- | --- |
| `type` | select | `none` \| `highImpact` \| `mediumImpact` \| `lowImpact` (default `lowImpact`) |
| `richText` | richText | Lexical with Heading/FixedToolbar/InlineToolbar features |
| `links` | array | via `linkGroup`, max 2 |
| `media` | upload → `media` | Required; only shown when type is `highImpact` or `mediumImpact` |

## Render dispatch

`src/heros/RenderHero.tsx` maps `hero.type` → a component (returns `null` for
`none`):

```ts
const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
}
```

`RenderHero` is used by `app/(frontend)/[slug]/page.tsx`. Note **PostHero is not in
this map** — it's rendered directly by the post page.

## Hero catalog

| Hero | Path | Purpose | Server/Client |
| --- | --- | --- | --- |
| HighImpactHero | `heros/HighImpact/index.tsx` | Full-bleed media background (≈80vh) with overlaid rich text + links | Client |
| MediumImpactHero | `heros/MediumImpact/index.tsx` | Rich text above a contained image (optional caption) | Server |
| LowImpactHero | `heros/LowImpact/index.tsx` | Text-only / minimal hero | Server |
| PostHero | `heros/PostHero/index.tsx` | Post header: title, categories, authors, date, hero image with gradient | Server |

> HighImpactHero is a client component because it calls the `HeaderTheme` provider
> to force a dark header over its background. The page-level `page.client.tsx`
> companions also set header theme per route.
