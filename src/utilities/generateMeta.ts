import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { defaultLocale, localizePath, locales, type Locale } from './locales'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
  locale?: Locale
  /** Unprefixed, default-locale site path for this document, e.g. `/about` or `/posts/foo`. */
  path?: string
}): Promise<Metadata> => {
  const { doc, locale = defaultLocale, path = '/' } = args

  const serverUrl = getServerSideURL()
  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title
    ? doc?.meta?.title + ' | Payload Website Template'
    : 'Payload Website Template'

  // hreflang alternates: one absolute URL per locale plus an x-default.
  const languages = locales.reduce<Record<string, string>>((acc, code) => {
    acc[code] = serverUrl + localizePath(path, code)
    return acc
  }, {})
  languages['x-default'] = serverUrl + localizePath(path, defaultLocale)

  return {
    description: doc?.meta?.description,
    alternates: {
      canonical: serverUrl + localizePath(path, locale),
      languages,
    },
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      locale,
      title,
      url: localizePath(path, locale),
    }),
    title,
  }
}
