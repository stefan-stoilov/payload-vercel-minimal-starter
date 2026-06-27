import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { BannerBlock } from './Component'
import { bannerMock } from './mock'

const meta = {
  title: 'Blocks/Banner',
  component: BannerBlock,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof BannerBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = { args: bannerMock('info') }

export const Warning: Story = { args: bannerMock('warning') }

export const Error: Story = { args: bannerMock('error') }

export const Success: Story = { args: bannerMock('success') }
