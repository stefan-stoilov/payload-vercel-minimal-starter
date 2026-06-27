import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { mockHero } from '@/mocks/fixtures'
import { HeaderThemeProvider } from '@/providers/HeaderTheme'

import { HighImpactHero } from './index'

const meta = {
  title: 'Heros/HighImpact',
  component: HighImpactHero,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  // HighImpactHero calls useHeaderTheme(); wrap it in the provider for realism.
  decorators: [
    (Story) => (
      <HeaderThemeProvider>
        <Story />
      </HeaderThemeProvider>
    ),
  ],
} satisfies Meta<typeof HighImpactHero>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: mockHero({ type: 'highImpact' }),
}
