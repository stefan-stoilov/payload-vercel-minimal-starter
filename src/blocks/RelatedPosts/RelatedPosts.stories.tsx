import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { RelatedPosts } from './Component'
import { relatedPostsMock } from './mock'

const meta = {
  title: 'Blocks/RelatedPosts',
  component: RelatedPosts,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof RelatedPosts>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: relatedPostsMock }
