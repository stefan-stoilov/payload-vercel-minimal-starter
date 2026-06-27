import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { mockPost } from '@/mocks/fixtures'

import { Card } from './index'

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    showCategories: { control: 'boolean' },
  },
  args: {
    doc: mockPost(),
    relationTo: 'posts',
    showCategories: true,
  },
  decorators: [
    (Story) => (
      <div className="w-[24rem]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithoutCategories: Story = { args: { showCategories: false } }

export const TitleOverride: Story = { args: { title: 'A custom card title' } }
