import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { mockHero } from '@/mocks/fixtures'

import { LowImpactHero } from './index'

const meta = {
  title: 'Heros/LowImpact',
  component: LowImpactHero,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof LowImpactHero>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: mockHero({ type: 'lowImpact' }),
}
