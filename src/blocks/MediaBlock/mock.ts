import type { MediaBlock } from '@/payload-types'

import { mockMedia, mockRichText } from '../../mocks/fixtures'

export const mediaMock = {
  blockType: 'mediaBlock',
  media: mockMedia(),
} satisfies MediaBlock

export const mediaWithCaptionMock = {
  blockType: 'mediaBlock',
  media: mockMedia({
    caption: mockRichText('A caption rendered beneath the image.') as NonNullable<
      ReturnType<typeof mockMedia>['caption']
    >,
  }),
} satisfies MediaBlock
