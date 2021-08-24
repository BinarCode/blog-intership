<template>
  <div class="border">
    <tiptap-menu-bar />
    <editor-content :editor="editor" class="border-2 border-black"/>
    <span>{{ editor.getCharacterCount() }}</span>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2';
import StarterKit from '@tiptap/starter-kit'
import Blockquote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import CharacterCount from '@tiptap/extension-character-count';

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
  mounted() {
    this.editor = new Editor({
      content: this.value,
      extensions: [
          StarterKit,
          Blockquote,
          Bold,
          BulletList,
          CharacterCount /* .configure({ limit: this.limit }) */
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
</style>
