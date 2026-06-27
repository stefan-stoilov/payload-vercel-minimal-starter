import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { mockMedia } from '@/mocks/fixtures'

import { Media } from './index'

const meta = {
  title: 'Components/Media',
  component: Media,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Media>

export default meta
type Story = StoryObj<typeof meta>

// VideoMedia is intentionally omitted — it requires a real video asset.

export const Default: Story = {
  args: {
    resource: mockMedia(),
    className: 'w-[40rem] max-w-full',
  },
}

export const Fill: Story = {
  args: {
    resource: mockMedia(),
    fill: true,
    imgClassName: 'object-cover',
  },
  decorators: [
    (Story) => (
      <div className="relative h-[20rem] w-[30rem] overflow-hidden rounded-lg">
        <Story />
      </div>
    ),
  ],
}
