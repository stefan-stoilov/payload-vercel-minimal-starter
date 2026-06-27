import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CallToActionBlock } from './Component'
import { callToActionMock } from './mock'

const meta = {
  title: 'Blocks/CallToAction',
  component: CallToActionBlock,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof CallToActionBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: callToActionMock }
