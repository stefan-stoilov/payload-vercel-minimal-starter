import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { mockRichText } from '@/mocks/fixtures'

import RichText from './index'

const meta = {
  title: 'Components/RichText',
  component: RichText,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    enableGutter: { control: 'boolean' },
    enableProse: { control: 'boolean' },
  },
  args: {
    data: mockRichText(
      'Rendering rich text',
      'This paragraph is produced by the shared mockRichText fixture.',
      'Lexical content is converted to React by the RichText component.',
    ),
    enableGutter: true,
    enableProse: true,
  },
} satisfies Meta<typeof RichText>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NoGutter: Story = { args: { enableGutter: false } }

export const NoProse: Story = { args: { enableProse: false } }
