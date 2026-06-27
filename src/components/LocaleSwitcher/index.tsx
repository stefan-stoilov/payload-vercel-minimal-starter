'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { cn } from '@/utilities/ui'
import { defaultLocale, locales, type Locale } from '@/utilities/locales'
import { useLocale } from '@/providers/Locale'

const labels: Record<Locale, string> = {
  en: 'EN',
  nl: 'NL',
}

/**
 * Builds the equivalent path in `next` for the current `pathname`, accounting
 * for the default locale being served without a URL prefix.
 */
function swapLocale(pathname: string, current: Locale, next: Locale): string {
  let base = pathname

  if (
    current !== defaultLocale &&
    (pathname === `/${current}` || pathname.startsWith(`/${current}/`))
  ) {
    base = pathname.slice(`/${current}`.length) || '/'
  }

  if (next === defaultLocale) return base || '/'
  return `/${next}${base === '/' ? '' : base}`
}

export const LocaleSwitcher: React.FC<{ className?: string }> = ({ className }) => {
  const pathname = usePathname()
  const active = useLocale()

  return (
    <div className={cn('flex items-center gap-2 text-sm', className)}>
      {locales.map((locale, i) => (
        <React.Fragment key={locale}>
          {i > 0 && <span className="opacity-40">/</span>}
          <Link
            aria-current={locale === active ? 'true' : undefined}
            className={cn(
              'uppercase transition-opacity hover:opacity-100',
              locale === active ? 'font-semibold' : 'opacity-60',
            )}
            href={swapLocale(pathname, active, locale)}
            hrefLang={locale}
          >
            {labels[locale]}
          </Link>
        </React.Fragment>
      ))}
    </div>
  )
}
