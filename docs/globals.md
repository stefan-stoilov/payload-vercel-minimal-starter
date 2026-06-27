# Globals

**Surface:** Shared · **Category:** Global

Globals are single-instance content (one Header, one Footer) rather than
collections of many documents. Unusually for this template, they live at the
**top level of `src/`** (not under `src/collections/`), each in its own folder that
bundles the Payload config, a custom admin row label, the revalidate hook, and the
frontend component that consumes it.

Registered in `src/payload.config.ts`:

```ts
globals: [Header, Footer]
```

## Header

| File | Surface | Role |
| --- | --- | --- |
| `src/Header/config.ts` | Admin | Global config (slug `header`) |
| `src/Header/RowLabel.tsx` | Admin UI | Custom row label for `navItems` (client) |
| `src/Header/hooks/revalidateHeader.ts` | Shared | `afterChange` → revalidate tag `global_header` |
| `src/Header/Component.tsx` | Frontend | Server component; fetches the header global |
| `src/Header/Component.client.tsx` | Frontend | Client; renders Logo + nav, applies header theme |
| `src/Header/Nav/index.tsx` | Frontend | Nav menu (CMS links + search icon) |

- **Slug:** `header` · **Fields:** `navItems` (array built with
  [`linkGroup`](./building-blocks.md#fields)).
- **Access:** public read. Versions disabled.
- **Admin UI:** `RowLabel.tsx` renders each nav row as `Nav item N: <label>` using
  Payload's `useRowLabel` hook.
- **Frontend:** `Header/Component.tsx` reads the global (cached via
  `getCachedGlobal`) and passes data to `HeaderClient`, which integrates with the
  `HeaderTheme` provider.

## Footer

| File | Surface | Role |
| --- | --- | --- |
| `src/Footer/config.ts` | Admin | Global config (slug `footer`) |
| `src/Footer/RowLabel.tsx` | Admin UI | Custom row label for `navItems` (client) |
| `src/Footer/hooks/revalidateFooter.ts` | Shared | `afterChange` → revalidate tag `global_footer` |
| `src/Footer/Component.tsx` | Frontend | Server component; renders nav + `ThemeSelector` |

- **Slug:** `footer` · **Fields:** `navItems` (array via `linkGroup`).
- **Access:** public read. Versions disabled.
- **Frontend:** renders the footer nav links plus the `ThemeSelector`
  (Auto/Light/Dark switch) from the Theme provider.

> Both globals' frontend components and their RowLabels are cross-referenced in
> [frontend-components.md](./frontend-components.md) and
> [admin-ui.md](./admin-ui.md) respectively.
