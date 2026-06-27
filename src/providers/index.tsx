import React from 'react'

import type { Locale } from '@/utilities/locales'

import { HeaderThemeProvider } from './HeaderTheme'
import { LocaleProvider } from './Locale'
import { ThemeProvider } from './Theme'

export const Providers: React.FC<{
  children: React.ReactNode
  locale: Locale
}> = ({ children, locale }) => {
  return (
    <LocaleProvider locale={locale}>
      <ThemeProvider>
        <HeaderThemeProvider>{children}</HeaderThemeProvider>
      </ThemeProvider>
    </LocaleProvider>
  )
}
