import type { CollectionBeforeDeleteHook } from 'payload'

import { APIError } from 'payload'

// Prevents the homepage (slug `home`) from being deleted via the MCP plugin.
// Scoped to `req.payloadAPI === 'MCP'` so admin-panel deletes are unaffected.
export const protectHomepageFromMcp: CollectionBeforeDeleteHook = async ({ id, req }) => {
  if ((req.payloadAPI as string) !== 'MCP') return

  const page = await req.payload.findByID({
    id,
    collection: 'pages',
    depth: 0,
    req,
  })

  if (page?.slug === 'home') {
    throw new APIError('The homepage cannot be deleted via MCP.', 403)
  }
}
