# Admin UI components

**Surface:** Admin UI · **Category:** Admin customization

These React components customize the **Payload admin panel** itself (not the public
site). They're registered with Payload either globally via `admin.components` in
`src/payload.config.ts` or per-field via a field's `components` option, and are
wired into the admin bundle through `src/app/(payload)/admin/importMap.js`.

## Registered globally (`admin.components`)

```ts
// src/payload.config.ts
admin: {
  components: {
    beforeLogin: ['@/components/BeforeLogin'],
    beforeDashboard: ['@/components/BeforeDashboard'],
  },
}
```

### BeforeLogin

- **Path:** `src/components/BeforeLogin/index.tsx`
- **Slot:** `admin.components.beforeLogin` — renders above the admin login form.
- **Purpose:** A welcome message on the login screen.
- **Server/Client:** Server.

### BeforeDashboard

- **Path:** `src/components/BeforeDashboard/index.tsx` (+ `index.scss`)
- **Slot:** `admin.components.beforeDashboard` — renders atop the admin dashboard
  after login.
- **Purpose:** Onboarding/welcome banner with setup instructions; uses Payload's
  `@payloadcms/ui` `Banner`.
- **Sub-component — SeedButton:** `src/components/BeforeDashboard/SeedButton/index.tsx`
  (+ `index.scss`). **Client** component that POSTs to the seed endpoint to
  populate demo content.

## Registered per field (custom row labels)

Array fields can supply a custom label component for each row. Both globals do this
for their `navItems` array via the field's `admin.components.RowLabel`.

### Header RowLabel

- **Path:** `src/Header/RowLabel.tsx`
- **Purpose:** Renders each Header nav row as `Nav item N: <link label>` using the
  `useRowLabel` hook.
- **Server/Client:** Client.

### Footer RowLabel

- **Path:** `src/Footer/RowLabel.tsx`
- **Purpose:** Same pattern for the Footer's `navItems`.
- **Server/Client:** Client.

## Admin-adjacent (lives on the frontend)

### AdminBar

- **Path:** `src/components/AdminBar/index.tsx`
- **Surface:** Frontend — but only shown to logged-in editors. It overlays the
  public page with "edit"/"exit preview" controls (wraps
  `@payloadcms/admin-bar`). Wired in `app/(frontend)/layout.tsx`.
- Documented here because it's admin-facing; its frontend wiring is in
  [frontend-components.md](./frontend-components.md).

> Other admin extension points exist in config but use built-in/plugin components:
> SEO fields (seo plugin), live-preview breakpoints, redirect field descriptions,
> and the rich-text confirmation-message editor on forms. See
> [building-blocks.md](./building-blocks.md#plugins).
