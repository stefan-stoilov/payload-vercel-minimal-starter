import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { PageRange } from './index'

const meta = {
  title: 'Components/PageRange',
  component: PageRange,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    collection: { control: 'select', options: ['posts'] },
    currentPage: { control: 'number' },
    limit: { control: 'number' },
    totalDocs: { control: 'number' },
  },
  args: {
    collection: 'posts',
    currentPage: 1,
    limit: 12,
    totalDocs: 42,
  },
} satisfies Meta<typeof PageRange>

export default meta
type Story = StoryObj<typeof meta>

export const FirstPage: Story = {}

export const MiddlePage: Story = { args: { currentPage: 2 } }

export const NoResults: Story = { args: { totalDocs: 0 } }
