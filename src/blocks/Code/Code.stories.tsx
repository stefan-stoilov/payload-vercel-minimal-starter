import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CodeBlock } from './Component'
import { codeCssMock, codeJavaScriptMock, codeTypeScriptMock } from './mock'

const meta = {
  title: 'Blocks/Code',
  component: CodeBlock,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof CodeBlock>

export default meta
type Story = StoryObj<typeof meta>

export const TypeScript: Story = { args: codeTypeScriptMock }

export const JavaScript: Story = { args: codeJavaScriptMock }

export const Css: Story = { args: codeCssMock }
