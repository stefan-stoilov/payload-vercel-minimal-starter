import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { mockHero } from '@/mocks/fixtures'

import { MediumImpactHero } from './index'

const meta = {
  title: 'Heros/MediumImpact',
  component: MediumImpactHero,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof MediumImpactHero>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: mockHero({ type: 'mediumImpact' }),
}
