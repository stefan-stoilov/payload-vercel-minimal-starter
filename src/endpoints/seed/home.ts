import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

type HomeArgs = {
  image: Media
}

export const home: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({ image }) => {
  return {
    slug: 'home',
    _status: 'published',
    title: 'Home',
    meta: {
      title: 'Payload Minimal Starter',
      description: 'A minimal website starter built with Payload and Next.js.',
      image: image.id,
    },
    layout: [
      {
        blockType: 'content',
        columns: [
          {
            size: 'full',
            enableLink: false,
            richText: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'heading',
                    children: [
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Payload Minimal Starter',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    tag: 'h1',
                    version: 1,
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'A deliberately minimal starting point. Edit this page in the admin panel, add your own blocks, and build the UI you want.',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    textFormat: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            },
          },
        ],
      },
      {
        blockType: 'mediaBlock',
        media: image.id,
      },
    ],
  }
}
