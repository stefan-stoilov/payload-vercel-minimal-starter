import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { mockPost } from '@/mocks/fixtures'

import { CMSLink } from './index'

const meta = {
  title: 'Components/CMSLink',
  component: CMSLink,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    appearance: {
      control: 'select',
      options: ['inline', 'default', 'outline', 'secondary', 'ghost', 'destructive', 'link'],
    },
    type: { control: 'select', options: ['custom', 'reference'] },
    label: { control: 'text' },
    url: { control: 'text' },
    newTab: { control: 'boolean' },
  },
  args: {
    type: 'custom',
    url: '/',
    label: 'Learn more',
    appearance: 'inline',
  },
} satisfies Meta<typeof CMSLink>

export default meta
type Story = StoryObj<typeof meta>

export const Inline: Story = {}

export const ButtonDefault: Story = { args: { appearance: 'default', label: 'Get started' } }

export const ButtonOutline: Story = { args: { appearance: 'outline', label: 'Read the docs' } }

export const Reference: Story = {
  args: {
    type: 'reference',
    label: 'Read the post',
    appearance: 'default',
    reference: { relationTo: 'posts', value: mockPost() },
  },
}
