'use client'

import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { localizePath, type Locale } from '@/utilities/locales'
import { useLocale } from '@/providers/Locale'

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<MediaBlockProps>

const internalDocToHref =
  (locale: Locale) =>
  ({ linkNode }: { linkNode: SerializedLinkNode }) => {
    const { value } = linkNode.fields.doc!
    if (typeof value !== 'object') {
      throw new Error('Expected value to be an object')
    }
    const slug = value.slug
    return localizePath(`/${slug}`, locale)
  }

const buildConverters =
  (locale: Locale): JSXConvertersFunction<NodeTypes> =>
  ({ defaultConverters }) => ({
    ...defaultConverters,
    ...LinkJSXConverter({ internalDocToHref: internalDocToHref(locale) }),
    blocks: {
      mediaBlock: ({ node }) => (
        <MediaBlock
          className="col-start-1 col-span-3"
          imgClassName="m-0"
          {...node.fields}
          captionClassName="mx-auto max-w-[48rem]"
          enableGutter={false}
          disableInnerContainer={true}
        />
      ),
    },
  })

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  const locale = useLocale()
  return (
    <ConvertRichText
      converters={buildConverters(locale)}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
