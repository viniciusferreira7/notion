'use client'
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { initialContent } from './initialContent'
import { lowlight } from 'lowlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import css from 'highlight.js/lib/languages/css'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import {
  RxFontBold,
  RxFontItalic,
  RxStrikethrough,
  RxCode,
  RxChevronDown,
  RxChatBubble,
} from 'react-icons/rx'
import 'highlight.js/styles/tokyo-night-dark.css'
import { BubbleButton } from './BubbleButton'
import Image from 'next/image'

export function Editor() {
  lowlight.registerLanguage('html', html)
  lowlight.registerLanguage('css', css)
  lowlight.registerLanguage('ts', ts)

  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'outline-none',
      },
    },
  })

  return (
    <>
      {editor && (
        <BubbleMenu
          className="bg-zinc-50 shadow-xl border border-zinc-200 shadow-black/20 rounded-lg overflow-hidden flex divide-x divide-zinc-300"
          editor={editor}
          tippyOptions={{ duration: 100 }}
        >
          <BubbleButton>
            Text
            <RxChevronDown className="w-4 h-4" />
          </BubbleButton>
          <BubbleButton
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <RxChatBubble className="w-4 h-4" />
            Comment
          </BubbleButton>
          <div className="flex items-center">
            <BubbleButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              data-active={editor.isActive('bold')}
            >
              <RxFontBold className="w-4 h-4" />
            </BubbleButton>
            <BubbleButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              data-active={editor.isActive('italic')}
            >
              <RxFontItalic className="w-4 h-4" />
            </BubbleButton>
            <BubbleButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              data-active={editor.isActive('strike')}
            >
              <RxStrikethrough className="w-4 h-4" />
            </BubbleButton>
            <BubbleButton
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              data-active={editor.isActive('codeBlock')}
            >
              <RxCode />
            </BubbleButton>
          </div>
        </BubbleMenu>
      )}
      {editor && (
        <FloatingMenu
          className="bg-zinc-50 py-2 px-1 shadow-xl border border-zinc-200 shadow-black/20 rounded-lg overflow-hidden flex flex-col gap-1"
          editor={editor}
          tippyOptions={{ duration: 100 }}
          shouldShow={({ state }) => {
            const { $from } = state.selection

            const currentLineText = $from.nodeBefore?.textContent

            return currentLineText === '/'
          }}
        >
          <button
            className="flex items-center gap-2 rounded min-w-[280px] hover:bg-zinc-100"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            data-active={editor.isActive('heading', { level: 1 })}
          >
            <Image
              alt=""
              src="https://www.notion.so/images/blocks/header.57a7576a.png"
              className="w-12 object-cover"
              width={100}
              height={100}
            />
            <div className="flex flex-col text-left">
              <span className="text-md">Heading 1</span>
              <span className="text-sm text-zinc-500">Big section heading</span>
            </div>
          </button>
          <button
            className="flex items-center gap-2 rounded min-w-[280px] hover:bg-zinc-100"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            data-active={editor.isActive('heading', { level: 2 })}
          >
            <Image
              alt=""
              src="https://www.notion.so/images/blocks/subheader.9aab4769.png"
              className="w-12 object-cover"
              width={100}
              height={100}
            />
            <div className="flex flex-col text-left">
              <span className="text-md">Heading 2</span>
              <span className="text-sm text-zinc-500">
                Medium section heading
              </span>
            </div>
          </button>
          <button
            className="flex items-center gap-2 rounded min-w-[280px] hover:bg-zinc-100"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            data-active={editor.isActive('bulletList', { level: 1 })}
          >
            <Image
              alt=""
              src="https://www.notion.so/images/blocks/bulleted-list.0e87e917.png"
              className="w-12 object-cover"
              width={100}
              height={100}
            />
            <div className="flex flex-col text-left">
              <span className="text-md">Bulleted list</span>
              <span className="text-sm text-zinc-500">
                Create a simple bulleted list.
              </span>
            </div>
          </button>
        </FloatingMenu>
      )}
      <EditorContent
        className="w-[700px] mx-auto p-16 prose prose-zinc"
        editor={editor}
      />
    </>
  )
}
