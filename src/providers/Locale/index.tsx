'use client'

import React, { createContext, useContext } from 'react'

import { defaultLocale, type Locale } from '@/utilities/locales'

const LocaleContext = createContext<Locale>(defaultLocale)

export const LocaleProvider: React.FC<{ children: React.ReactNode; locale: Locale }> = ({
  children,
  locale,
}) => {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
}

/**
 * Returns the active locale for the current request. Available to any client
 * component rendered beneath `<Providers>` in the localized layout.
 */
export const useLocale = (): Locale => useContext(LocaleContext)
