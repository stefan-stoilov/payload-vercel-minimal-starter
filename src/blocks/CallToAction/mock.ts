import type { CallToActionBlock } from '@/payload-types'

import { mockRichText } from '../../mocks/fixtures'

export const callToActionMock = {
  blockType: 'cta',
  richText: mockRichText(
    'Ready to get started?',
    'Spin up a Payload + Next.js project and ship content-driven pages in minutes.',
  ),
  links: [
    {
      id: 'cta-link-1',
      link: {
        type: 'custom',
        label: 'View all posts',
        url: '/posts',
        appearance: 'default',
      },
    },
    {
      id: 'cta-link-2',
      link: {
        type: 'custom',
        label: 'Read the docs',
        url: 'https://payloadcms.com/docs',
        newTab: true,
        appearance: 'outline',
      },
    },
  ],
} satisfies CallToActionBlock
