import type { ContentBlock } from '@/payload-types'

import { mockRichText } from '../../mocks/fixtures'

export const contentMock = {
  blockType: 'content',
  columns: [
    {
      id: 'content-col-full',
      size: 'full',
      richText: mockRichText(
        'A flexible content block',
        'Compose pages from rich text columns of varying widths. This first column spans the full grid.',
      ),
    },
    {
      id: 'content-col-third',
      size: 'oneThird',
      richText: mockRichText(
        'One third',
        'A narrower column, useful for supporting copy or feature highlights.',
      ),
      enableLink: true,
      link: {
        type: 'custom',
        label: 'Learn more',
        url: '/about',
        appearance: 'outline',
      },
    },
    {
      id: 'content-col-twothirds',
      size: 'twoThirds',
      richText: mockRichText(
        'Two thirds',
        'A wider column sitting alongside the narrower one to form a responsive layout.',
      ),
    },
  ],
} satisfies ContentBlock

export const contentSingleColumnMock = {
  blockType: 'content',
  columns: [
    {
      id: 'content-col-single',
      size: 'full',
      richText: mockRichText(
        'Single full-width column',
        'When you only need one column, the block renders a single full-width region.',
      ),
    },
  ],
} satisfies ContentBlock
