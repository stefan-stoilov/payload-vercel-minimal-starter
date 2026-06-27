import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Pagination } from './index'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    page: { control: 'number' },
    totalPages: { control: 'number' },
  },
  args: {
    page: 3,
    totalPages: 5,
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Middle: Story = {}

export const FirstPage: Story = { args: { page: 1, totalPages: 5 } }

export const LastPage: Story = { args: { page: 5, totalPages: 5 } }
