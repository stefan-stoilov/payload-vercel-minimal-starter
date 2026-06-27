import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Locale } from '@/utilities/locales'

export async function Header({ locale }: { locale: Locale }) {
  const headerData = await getCachedGlobal('header', locale, 1)()

  return <HeaderClient data={headerData} />
}
