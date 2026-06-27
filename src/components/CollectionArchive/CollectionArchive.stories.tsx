import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { mockPost } from '@/mocks/fixtures'

import { CollectionArchive } from './index'

const meta = {
  title: 'Components/CollectionArchive',
  component: CollectionArchive,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof CollectionArchive>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    posts: [
      mockPost({ id: 1 }),
      mockPost({
        id: 2,
        title: 'Designing content models that scale',
        slug: 'designing-content-models-that-scale',
      }),
      mockPost({
        id: 3,
        title: 'Type-safe mocks for Storybook',
        slug: 'type-safe-mocks-for-storybook',
      }),
    ],
  },
}
