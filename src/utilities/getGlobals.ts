import type { Config } from '@/payload-types'

import configPromise from '@payload-config'
import { type DataFromGlobalSlug, getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import { defaultLocale, type Locale } from '@/utilities/locales'

type Global = keyof Config['globals']

async function getGlobal<T extends Global>(
  slug: T,
  locale: Locale,
  depth = 0,
): Promise<DataFromGlobalSlug<T>> {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
    locale,
    fallbackLocale: defaultLocale,
  })

  return global
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug.
 * The locale is part of the cache key so each language is cached separately,
 * while the shared tag (`global_<slug>`) invalidates every locale at once.
 */
export const getCachedGlobal = <T extends Global>(slug: T, locale: Locale, depth = 0) =>
  unstable_cache(async () => getGlobal<T>(slug, locale, depth), [slug, locale], {
    tags: [`global_${slug}`],
  })
