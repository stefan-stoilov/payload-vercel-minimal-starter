import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { MediaBlock } from './Component'
import { mediaMock, mediaWithCaptionMock } from './mock'

const meta = {
  title: 'Blocks/MediaBlock',
  component: MediaBlock,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof MediaBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: mediaMock }

export const WithCaption: Story = { args: mediaWithCaptionMock }
