import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import type { Category, Media, Page, Post } from '@/payload-types'

/** The inner `link` object of a hero/linkGroup link row. */
type HeroLink = NonNullable<Page['hero']['links']>[number]['link']

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

/** A fully-typed `Category`. */
export const mockCategory = (overrides: Partial<Category> = {}): Category => ({
  id: 1,
  title: 'Engineering',
  slug: 'engineering',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  ...overrides,
})

/**
 * A minimal but type-complete `Post`, enough for `RelatedPosts` / `Card`
 * (title, slug, categories, meta) and `PostHero` (heroImage, populatedAuthors,
 * publishedAt).
 */
export const mockPost = (overrides: Partial<Post> = {}): Post => ({
  id: 1,
  title: 'Building with Payload and Next.js',
  slug: 'building-with-payload-and-nextjs',
  content: mockRichText('Building with Payload and Next.js') as Post['content'],
  heroImage: mockMedia(),
  categories: [mockCategory(), mockCategory({ id: 2, title: 'Guides', slug: 'guides' })],
  populatedAuthors: [{ id: 'author-1', name: 'Ada Lovelace' }],
  meta: {
    title: 'Building with Payload and Next.js',
    description:
      'A short, fabricated excerpt used to preview how related posts appear inside the grid.',
    image: mockMedia(),
  },
  publishedAt: '2024-01-01T00:00:00.000Z',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  _status: 'published',
  ...overrides,
})

/**
 * A typed `link` row (the shape produced by the `link()` field, shared by the
 * hero, CallToAction, and Header/Footer nav). Typing against `Page['hero']`
 * keeps it config-safe.
 */
export const mockLink = (overrides: Partial<HeroLink> = {}): HeroLink => ({
  type: 'custom',
  url: '/',
  label: 'Learn more',
  appearance: 'default',
  newTab: false,
  ...overrides,
})

/**
 * A fully-typed `Page['hero']` group (type + richText + links + media), used by
 * the High/Medium-impact hero stories. Asserted against the generated `Page`
 * type so a hero config change surfaces as a compile error.
 */
export const mockHero = (overrides: Partial<Page['hero']> = {}): Page['hero'] => ({
  type: 'mediumImpact',
  richText: mockRichText(
    'Build faster with Payload',
    'A flexible, code-first headless CMS that fits your Next.js app.',
  ) as Page['hero']['richText'],
  links: [
    { link: mockLink({ label: 'Get started', appearance: 'default' }), id: 'link-1' },
    {
      link: mockLink({ label: 'Read the docs', appearance: 'outline', url: '/docs' }),
      id: 'link-2',
    },
  ],
  media: mockMedia(),
  ...overrides,
})
