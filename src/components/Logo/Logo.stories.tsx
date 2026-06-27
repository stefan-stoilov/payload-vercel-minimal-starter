import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Logo } from './Logo'

const meta = {
  title: 'Components/Logo',
  component: Logo,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    loading: { control: 'select', options: ['lazy', 'eager'] },
    priority: { control: 'select', options: ['auto', 'high', 'low'] },
  },
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Priority: Story = { args: { loading: 'eager', priority: 'high' } }
