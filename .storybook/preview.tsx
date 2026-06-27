import type { Preview } from '@storybook/nextjs-vite'
import { withThemeByDataAttribute } from '@storybook/addon-themes'

import '../src/app/(frontend)/globals.css'

const systemPrefersDark =
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches

const preview: Preview = {
  parameters: {
    // App Router components (Card, Pagination, CollectionArchive) call
    // next/navigation hooks; this enables Storybook's mocked App Router.
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: systemPrefersDark ? 'dark' : 'light',
      attributeName: 'data-theme',
      // parentSelector defaults to 'html', which is what globals.css targets
    }),
  ],
}

export default preview
