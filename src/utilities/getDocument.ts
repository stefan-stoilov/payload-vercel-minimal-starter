import type { Config } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import { defaultLocale, type Locale } from '@/utilities/locales'

type Collection = keyof Config['collections']

async function getDocument(collection: Collection, slug: string, locale: Locale, depth = 0) {
  const payload = await getPayload({ config: configPromise })

  const page = await payload.find({
    collection,
    depth,
    locale,
    fallbackLocale: defaultLocale,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return page.docs[0]
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug.
 * The locale is part of the cache key so each language is cached separately,
 * while the shared tag (`<collection>_<slug>`) invalidates every locale at once.
 */
export const getCachedDocument = (collection: Collection, slug: string, locale: Locale) =>
  unstable_cache(async () => getDocument(collection, slug, locale), [collection, slug, locale], {
    tags: [`${collection}_${slug}`],
  })
