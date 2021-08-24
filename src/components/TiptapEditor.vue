<template>
  <div>
    <tiptap-menu-bar :editor="editor" class="sticky top-0 border z-10" />
    <editor-content :editor="editor" class="border-2 border-black"/>
    <span class="float-right">Character count: {{ editor.getCharacterCount() }}</span>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2';
import StarterKit from '@tiptap/starter-kit'
import Code from '@tiptap/extension-code'
import CharacterCount from '@tiptap/extension-character-count';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';

import TiptapMenuBar from '@/components/TipTap/TiptapMenuBar';


export default {
  name: "TiptapEditor",
  components: {
    EditorContent,
    TiptapMenuBar
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editor: null,
      // limit: 100000
    }
  },
  beforeMount() {
    this.editor = new Editor({
      content: this.value,
      extensions: [
          StarterKit,
          Code.configure({HTMLAttributes: { class: 'rounded px-1 text-gray-900 bg-gray-300' }}),
          CharacterCount, /* .configure({ limit: this.limit }) */
          Underline,
          Link.configure({HTMLAttributes: { class: 'text-blue-400 cursor-pointer hover:underline' }}),
          Image,
          TextAlign.configure({
            types: ['heading', 'paragraph'],
          }),
      ],
      onUpdate: () => {
        this.$emit('input', this.editor.getHTML())
      },
    })
  },
  beforeDestroy() {
    this.editor.destroy();
  }
}
</script>

<style scoped>
code {
  @apply bg-gray-300;
}
</style>
