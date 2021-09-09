<template>
  <div>
    <div class=" ">
      <tiptap-menu-bar :editor="editor" class="sticky border-none" />
      <editor-content
        :editor="editor"
        :class="classes"
        class="h-80 overflow-y-auto"
      />
    </div>
    <span class="float-right">
      {{ $t('tiptap.characterCount') }}: {{ editor.getCharacterCount() }}
    </span>
  </div>
</template>

<script>
import TiptapMenuBar from '@/components/TiptapEditor/TiptapMenuBar';
import { Editor, EditorContent } from '@tiptap/vue-2';
import StarterKit from '@tiptap/starter-kit';
import Paragraph from '@tiptap/extension-paragraph';
import Code from '@tiptap/extension-code';
import CharacterCount from '@tiptap/extension-character-count';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Blockquote from '@tiptap/extension-blockquote';
import Heading from '@tiptap/extension-heading';

export default {
  name: 'TiptapEditor',

  components: {
    EditorContent,
    TiptapMenuBar,
  },

  props: {
    classes: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      editor: null,
      // limit: 100000
    };
  },

  beforeMount() {
    this.editor = new Editor({
      content: this.value,
      extensions: [
        StarterKit,
        Paragraph.configure({
          HTMLAttributes: { class: 'my-5' },
        }),
        Code.configure({
          HTMLAttributes: { class: 'rounded px-1 text-gray-900 bg-gray-300' },
        }),
        CharacterCount /* .configure({ limit: this.limit }) */,
        Underline,
        Link.configure({
          HTMLAttributes: {
            class: 'text-blue-400 cursor-pointer hover:underline',
          },
        }),
        Image,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Blockquote.configure({
          HTMLAttributes: {
            class: 'ml-2 pl-1 py-3 border-l-2 border-gray-300',
          },
        }),
        Heading.configure({ HTMLAttributes: { class: 'font-extralight' } }),
      ],
      onUpdate: () => {
        this.$emit('input', this.editor.getHTML());
      },
    });
  },

  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style>
.ProseMirror {
  /* border: 1px solid black; */
  min-height: 320px;
  padding: 5px;
  @apply text-sm;
}

.ProseMirror h1 {
  @apply text-5xl;
}

.ProseMirror h2 {
  @apply text-4xl;
}

.ProseMirror h3 {
  @apply text-3xl;
}
</style>
