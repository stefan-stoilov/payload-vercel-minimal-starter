import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'

import { home } from './home'
import { imageHero1 } from './image-hero-1'
import { defaultLocale } from '@/utilities/locales'

const collections: CollectionSlug[] = ['media', 'pages', 'forms', 'form-submissions', 'search']

const globals: GlobalSlug[] = ['header', 'footer']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // This seeds content in the default locale (English) only. Because the Payload
  // config sets `localization.fallback: true`, every other locale (e.g. Dutch / `nl`)
  // automatically falls back to these English values until a translation is provided —
  // so `/nl/*` renders the English content out of the box.
  //
  // To add Dutch translations later, run a second pass after each create:
  //   - Fully-localized fields (page `title`/`layout`/`meta`):
  //       await payload.update({ collection, id, locale: 'nl', data: <translated> })
  //   - Localized labels inside shared arrays (header/footer `navItems`): read back the
  //     created doc, keep each row's `id`, and update with `locale: 'nl'` swapping only the
  //     label by index — otherwise the rows are recreated and the English labels orphan.

  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database
  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {
          navItems: [],
        },
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info(`— Seeding media...`)

  const heroImageBuffer = await fetchFileByURL(
    'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp',
  )

  const imageDoc = await payload.create({
    collection: 'media',
    locale: defaultLocale,
    data: imageHero1,
    file: heroImageBuffer,
  })

  payload.logger.info(`— Seeding home page...`)

  await payload.create({
    collection: 'pages',
    locale: defaultLocale,
    depth: 0,
    data: home({ image: imageDoc }),
  })

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      locale: defaultLocale,
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Home',
              url: '/',
            },
          },
        ],
      },
    }),
    payload.updateGlobal({
      slug: 'footer',
      locale: defaultLocale,
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Admin',
              url: '/admin',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Payload',
              newTab: true,
              url: 'https://payloadcms.com/',
            },
          },
        ],
      },
    }),
  ])

  payload.logger.info('Seeded database successfully!')
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}
