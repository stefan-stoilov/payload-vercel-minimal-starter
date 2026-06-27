import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import type { Media, Page } from '@/payload-types'

/**
 * Shared mock fixtures for block Storybook stories.
 *
 * These builders produce data typed against the generated Payload types
 * (`@/payload-types`). Per-block `mock.ts` files compose them and assert the
 * result `satisfies <GeneratedBlockType>`, so a Payload config change that
 * renames/removes/retypes a field surfaces as a compile error after
 * `pnpm payload generate:types`.
 */

/**
 * Build a minimal, valid Lexical editor state: an optional `h2` heading
 * followed by one paragraph per provided line.
 *
 * The internal Lexical node literals are asserted to `DefaultTypedEditorState`
 * (constructing the fully-typed serialized node unions by hand adds noise
 * without improving the config-change safety, which lives at the block level).
 */
export const mockRichText = (heading: string, ...paragraphs: string[]): DefaultTypedEditorState => {
  const textNode = (text: string) => ({
    type: 'text',
    detail: 0,
    format: 0,
    mode: 'normal',
    style: '',
    text,
    version: 1,
  })

  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          tag: 'h2',
          children: [textNode(heading)],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
        ...paragraphs.map((text) => ({
          type: 'paragraph',
          children: [textNode(text)],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
          textFormat: 0,
        })),
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  } as unknown as DefaultTypedEditorState
}

/**
 * A fully-typed `Media` object pointing at the static OG image in `public/`,
 * which Storybook serves at `/website-template-OG.webp` via `staticDirs`.
 */
export const mockMedia = (overrides: Partial<Media> = {}): Media => ({
  id: 1,
  alt: 'Payload website template open graph image',
  url: '/website-template-OG.webp',
  thumbnailURL: '/website-template-OG.webp',
  filename: 'website-template-OG.webp',
  mimeType: 'image/webp',
  filesize: 98_000,
  width: 1200,
  height: 630,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  ...overrides,
})

/** A minimal `Page`, enough for reference-link stories (`title`, `slug`). */
export const mockPage = (overrides: Partial<Page> = {}): Page =>
  ({
    id: 1,
    title: 'About',
    slug: 'about',
    layout: [],
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    _status: 'published',
    ...overrides,
  }) as Page
