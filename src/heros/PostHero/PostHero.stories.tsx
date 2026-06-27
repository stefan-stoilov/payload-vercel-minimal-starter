import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { mockPost } from '@/mocks/fixtures'

import { PostHero } from './index'

const meta = {
  title: 'Heros/PostHero',
  component: PostHero,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof PostHero>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    post: mockPost(),
  },
}
