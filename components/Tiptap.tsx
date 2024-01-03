'use client';

import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Document from '@tiptap/extension-document';
import Placeholder from '@tiptap/extension-placeholder';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import { Button } from './ui/button';

const CustomDocument = Document.extend({
  content: 'heading block*',
});

const Tiptap = ({ setContent, heading, paragraph }: any) => {
  const editor = useEditor({
    extensions: [
      CustomDocument,
      StarterKit.configure({
        document: false,
      }),
      Placeholder.configure({
        showOnlyCurrent: false,
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return heading;
          }

          return paragraph;
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'my-custom-class',
        },
        keepMarks: true,
        keepAttributes: true,
        itemTypeName: 'listItem',
      }),
      ListItem,
    ],
    content: `<h1></h1>
    <p></p>
  `,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      setContent(json);
    },
  });

  return (
    <div className='w-full text-lg p-8 m-auto rounded-lg'>
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className='flex bg-secondary text-center rounded-lg'
        >
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            variant='ghost'
            className='w-8 hover:bg-primary/50 font-bold'
          >
            B
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            variant='ghost'
            className='w-8 hover:bg-primary/50 italic'
          >
            I
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            variant='ghost'
            className='w-8 hover:bg-primary/50 line-through
'
          >
            S
          </Button>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </div>
  );
};
export default Tiptap;
