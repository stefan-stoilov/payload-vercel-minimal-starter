import { NextResponse, type NextRequest } from 'next/server'

import { defaultLocale, locales } from '@/utilities/locales'

/**
 * Locale routing with a hidden default locale.
 *
 * - `/nl/...`        → served as-is (matches the `[locale]` segment)
 * - `/en/...`        → 308-redirected to the unprefixed path (keeps EN canonical)
 * - everything else  → internally rewritten to `/en/...` so the default-locale
 *                      route tree renders it while the URL stays unprefixed
 *
 * Admin, API, Payload `next/*` handlers, sitemaps and static files are skipped.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/next/')
  ) {
    return NextResponse.next()
  }

  const firstSegment = pathname.split('/')[1]

  // Default locale must stay unprefixed → redirect /en or /en/* to the bare path
  if (firstSegment === defaultLocale) {
    const url = req.nextUrl.clone()
    url.pathname = pathname.replace(/^\/en(?=\/|$)/, '') || '/'
    return NextResponse.redirect(url, 308)
  }

  // A supported non-default locale (e.g. /nl) is served by the [locale] tree
  if ((locales as readonly string[]).includes(firstSegment)) {
    return NextResponse.next()
  }

  // Unprefixed path → rewrite onto the default-locale tree (URL is unchanged)
  const url = req.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Run on everything except Next internals and files with an extension
  // (covers `*.xml` sitemaps, `robots.txt`, `favicon.*`, images, etc.).
  matcher: ['/((?!_next/|.*\\..*).*)'],
}
