<template>
  <div class="flex flex-wrap border">
    <tiptap-menu-item
        :action="() => editor.chain().focus().toggleBold().run()"
        :isActive="() => editor.isActive('bold')"
    >
      <span class="font-bold">b</span>
    </tiptap-menu-item>

    <tiptap-menu-item
        :action="() => editor.chain().focus().toggleItalic().run()"
        :isActive="() => editor.isActive('italic')"
    >
      <span class="italic">i</span>
    </tiptap-menu-item>

    <tiptap-menu-item
        :action="() => editor.chain().focus().toggleStrike().run()"
        :isActive="() => editor.isActive('strike')"
    >
      <span class="line-through">strike</span>
    </tiptap-menu-item>

    <tiptap-menu-item
        :action="() => editor.chain().focus().toggleUnderline().run()"
        :isActive="() => editor.isActive('underline')"
    >
      <span class="underline">u</span>
    </tiptap-menu-item>

    <tiptap-menu-item
        :action="() => editor.chain().focus().toggleCode().run()"
        :isActive="() => editor.isActive('code')"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
    </tiptap-menu-item>

    <tiptap-menu-item
        :action="setLink"
        :isActive="() => editor.isActive('link')"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
    </tiptap-menu-item>

    <tiptap-menu-item
        :action="addImage"
        :isActive="() => editor.isActive('image')"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
    </tiptap-menu-item>

    <tiptap-menu-item
        :action="() => editor.chain().focus().setTextAlign('left').run()"
        :isActive="() => editor.isActive({ textAlign: 'left' })"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
    </tiptap-menu-item>

    <tiptap-menu-item
        :action="() => editor.chain().focus().setTextAlign('center').run()"
        :isActive="() => editor.isActive({ textAlign: 'center' })"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
    </tiptap-menu-item>

    <tiptap-menu-item
        :action="() => editor.chain().focus().setTextAlign('right').run()"
        :isActive="() => editor.isActive({ textAlign: 'right' })"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
    </tiptap-menu-item>

    <tiptap-menu-item
        :action="() => editor.chain().focus().setTextAlign('justify').run()"
        :isActive="() => editor.isActive({ textAlign: 'justify' })"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
    </tiptap-menu-item>

    <tiptap-menu-item
        :action="() => editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :isActive="() => editor.isActive('heading', { level: 1 })"
    >
      h1
    </tiptap-menu-item>

    <tiptap-menu-item
        :action="() => editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :isActive="() => editor.isActive('heading', { level: 2 })"
    >
      h2
    </tiptap-menu-item>

    <tiptap-menu-item
        :action="() => editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :isActive="() => editor.isActive('heading', { level: 3 })"
    >
      h3
    </tiptap-menu-item>

    <tiptap-menu-item
        :action="() => editor.chain().focus().toggleBlockquote().run()"
        :isActive="() => editor.isActive('blockquote')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/></svg>
    </tiptap-menu-item>
  </div>
</template>

<script>
import TiptapMenuItem from './TiptapMenuItem';

export default {
  name: "TiptapMenuBar",
  components: {
    TiptapMenuItem
  },
  props: {
    editor: {
      type: Object,
      required: true
    }
  },
  methods: {
    addImage() {
      const url = window.prompt('Please insert a valid URL for your image')

      if (url) {
        this.editor
            .chain()
            .focus()
            .setImage({ src: url })
            .run()
      }
    },
    setLink() {
      const url = window.prompt('Please insert a valid URL')

      this.editor
          .chain()
          .focus()
          //.extendMarkRange('link')
          .setLink({ href: url })
          .run()
    },
  },
}
</script>

<style scoped>
</style>