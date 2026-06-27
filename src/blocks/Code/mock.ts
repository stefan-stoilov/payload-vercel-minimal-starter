import type { CodeBlock } from '@/payload-types'

export const codeTypeScriptMock = {
  blockType: 'code',
  language: 'typescript',
  code: [
    "import { getPayload } from 'payload'",
    "import config from '@payload-config'",
    '',
    'const payload = await getPayload({ config })',
    "const { docs } = await payload.find({ collection: 'posts', limit: 3 })",
  ].join('\n'),
} satisfies CodeBlock

export const codeJavaScriptMock = {
  blockType: 'code',
  language: 'javascript',
  code: ['const greet = (name) => `Hello, ${name}!`', '', "console.log(greet('world'))"].join('\n'),
} satisfies CodeBlock

export const codeCssMock = {
  blockType: 'code',
  language: 'css',
  code: [
    ':root {',
    '  --primary: oklch(0.2 0 0);',
    '}',
    '',
    '.button {',
    '  color: var(--primary);',
    '}',
  ].join('\n'),
} satisfies CodeBlock
