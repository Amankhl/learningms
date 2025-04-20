'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Heading from '@tiptap/extension-heading'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import Paragraph from '@tiptap/extension-paragraph'
import { Button } from "@/components/ui/button"

export default function TextEditor({
  content,
  setContent,
}: {
  content: string
  setContent: (val: string) => void
}) {
  const editor = useEditor({
    extensions: [
      Paragraph,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
      Image,
      StarterKit.configure({
        heading: false, // use Heading extension instead
        bulletList: false,
        orderedList: false,
        listItem: false,
        paragraph: false,
      }),
    ],
    content,
    onUpdate({ editor }) {
      setContent(editor.getHTML())
    },
  })

  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append(
      'upload_preset',
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
    )

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    )

    const data = await res.json()
    return data.secure_url
  }

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (!file || !editor) return

    const imageUrl = await uploadImageToCloudinary(file)
    editor.chain().focus().setImage({ src: imageUrl }).run()
  }

  if (!editor) return null

  return (
    <div className="border rounded p-4 space-y-4 w-full">
      <div className="flex gap-2 flex-wrap">
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          variant={editor.isActive('bold') ? 'default' : 'secondary'}
        >
          Bold
        </Button>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          variant={editor.isActive('italic') ? 'default' : 'secondary'}
        >
          Italic
        </Button>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          variant={editor.isActive('bulletList') ? 'default' : 'secondary'}
        >
          Bullet
        </Button>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          variant={editor.isActive('orderedList') ? 'default' : 'secondary'}
        >
          Numbered
        </Button>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'secondary'}
        >
          H2
        </Button>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().clearContent().run()}
          variant="destructive"
        >
          Clear
        </Button>
        {/* <label className="cursor-pointer bg-gray-200 px-3 py-1 rounded text-sm">
          📷 Insert Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label> */}
      </div>

      <EditorContent
        editor={editor}
        className="min-h-[600px] border-t pt-4 prose max-w-none prose-img:rounded-lg prose-img:max-w-[80%] prose-img:mx-auto"
      />
    </div>
  )
}
