import type { BannerBlock } from '@/payload-types'

import { mockRichText } from '../../mocks/fixtures'

const messages: Record<BannerBlock['style'], string> = {
  info: 'Heads up — this is an informational banner used inside rich text.',
  warning: 'Warning — double-check this configuration before continuing.',
  error: 'Something went wrong while processing your request.',
  success: 'Success — your changes have been saved.',
}

export const bannerMock = (style: BannerBlock['style']) =>
  ({
    blockType: 'banner',
    style,
    content: mockRichText(messages[style]),
  }) satisfies BannerBlock
