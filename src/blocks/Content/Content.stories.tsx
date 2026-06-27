import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ContentBlock } from './Component'
import { contentMock, contentSingleColumnMock } from './mock'

const meta = {
  title: 'Blocks/Content',
  component: ContentBlock,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ContentBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: contentMock }

export const SingleColumn: Story = { args: contentSingleColumnMock }
