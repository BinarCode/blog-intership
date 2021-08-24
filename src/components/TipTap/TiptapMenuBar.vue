<template>
  <div class="flex flex-wrap border">
    <tiptap-menu-item
        :action="() => this.editor.chain().focus().toggleBold().run()"
        :isActive="() => this.editor.isActive('bold')"
    >
      <span class="font-bold">b</span>
    </tiptap-menu-item>

    <tiptap-menu-item
        :action="() => this.editor.chain().focus().toggleItalic().run()"
        :isActive="() => this.editor.isActive('italic')"
    >
      <span class="italic">i</span>
    </tiptap-menu-item>

    <tiptap-menu-item
        :action="() => this.editor.chain().focus().toggleStrike().run()"
        :isActive="() => this.editor.isActive('strike')"
    >
      <span class="line-through">strike</span>
    </tiptap-menu-item>

    <tiptap-menu-item
        :action="() => this.editor.chain().focus().toggleUnderline().run()"
        :isActive="() => this.editor.isActive('underline')"
    >
      <span class="underline">u</span>
    </tiptap-menu-item>

    <tiptap-menu-item
        :action="() => this.editor.chain().focus().toggleCode().run()"
        :isActive="() => this.editor.isActive('code')"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
    </tiptap-menu-item>

    <tiptap-menu-item
        :action="setLink"
        :isActive="() => this.editor.isActive('link')"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
    </tiptap-menu-item>

    <tiptap-menu-item
        :action="addImage"
        :isActive="() => this.editor.isActive('image')"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
    </tiptap-menu-item>

    <tiptap-menu-item
        :action="() => this.editor.chain().focus().setTextAlign('left').run()"
        :isActive="() => this.editor.isActive({ textAlign: 'left' })"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
    </tiptap-menu-item>

    <tiptap-menu-item
        :action="() => this.editor.chain().focus().setTextAlign('center').run()"
        :isActive="() => this.editor.isActive({ textAlign: 'center' })"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
    </tiptap-menu-item>

    <tiptap-menu-item
        :action="() => this.editor.chain().focus().setTextAlign('right').run()"
        :isActive="() => this.editor.isActive({ textAlign: 'right' })"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
    </tiptap-menu-item>

    <tiptap-menu-item
        :action="() => this.editor.chain().focus().setTextAlign('justify').run()"
        :isActive="() => this.editor.isActive({ textAlign: 'justify' })"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
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