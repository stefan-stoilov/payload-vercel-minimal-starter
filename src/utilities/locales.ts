import type { TypedLocale } from 'payload'

/**
 * Locales the site supports. Keep in sync with `localization.locales` in
 * `src/payload.config.ts`.
 */
export const locales = ['en', 'nl'] as const

export type Locale = TypedLocale

/**
 * The default locale. Pages in this locale are served without a URL prefix
 * (e.g. `/about`), while every other locale is prefixed (e.g. `/nl/about`).
 */
export const defaultLocale: Locale = 'en'

export const isLocale = (value: string | undefined | null): value is Locale =>
  typeof value === 'string' && (locales as readonly string[]).includes(value)

/**
 * Prefix a site-relative path with the locale segment, omitting the prefix for
 * the default locale. Pass through external/absolute URLs untouched.
 */
export const localizePath = (path: string, locale: Locale): string => {
  if (!path || /^https?:\/\//.test(path)) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (locale === defaultLocale) return normalized
  return `/${locale}${normalized === '/' ? '' : normalized}`
}
