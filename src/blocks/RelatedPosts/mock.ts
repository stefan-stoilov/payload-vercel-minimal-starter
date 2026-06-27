import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import type { Post } from '@/payload-types'

import { mockCategory, mockPost, mockRichText } from '../../mocks/fixtures'

export const relatedPostsMock: {
  docs: Post[]
  introContent: DefaultTypedEditorState
} = {
  introContent: mockRichText('Related posts', 'Keep reading with these hand-picked articles.'),
  docs: [
    mockPost({
      id: 1,
      title: 'Building with Payload and Next.js',
      slug: 'building-with-payload-and-nextjs',
    }),
    mockPost({
      id: 2,
      title: 'Designing content models that scale',
      slug: 'designing-content-models-that-scale',
      categories: [mockCategory({ id: 3, title: 'Architecture', slug: 'architecture' })],
    }),
  ],
}
