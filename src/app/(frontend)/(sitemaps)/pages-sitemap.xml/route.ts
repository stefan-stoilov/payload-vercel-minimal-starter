import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

import { localizePath, locales } from '@/utilities/locales'

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    const results = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const paths: { path: string; lastmod: string }[] = [
      { path: '/search', lastmod: dateFallback },
      { path: '/posts', lastmod: dateFallback },
      ...(results.docs ?? [])
        .filter((page) => Boolean(page?.slug))
        .map((page) => ({
          path: page?.slug === 'home' ? '/' : `/${page?.slug}`,
          lastmod: page.updatedAt || dateFallback,
        })),
    ]

    // One entry per (path, locale) with hreflang alternates linking the set.
    return paths.flatMap(({ path, lastmod }) =>
      locales.map((locale) => ({
        loc: `${SITE_URL}${localizePath(path, locale)}`,
        lastmod,
        alternateRefs: locales.map((alt) => ({
          href: `${SITE_URL}${localizePath(path, alt)}`,
          hreflang: alt,
          hrefIsAbsolute: true,
        })),
      })),
    )
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}
