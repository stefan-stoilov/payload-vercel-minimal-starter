import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Button } from './button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'

const meta = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-[20rem]">
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>A short description that sits under the title.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here — any React node is supported.</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  ),
}

export const ContentOnly: Story = {
  render: () => (
    <Card className="w-[20rem]">
      <CardContent className="pt-6">Just some content, no header or footer.</CardContent>
    </Card>
  ),
}
