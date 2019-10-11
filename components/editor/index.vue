<template>
  <div class="editor editor-squished">
    <BubbleMenu :editor="editor" />
    <editor-content class="edito__content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from 'tiptap'
import {
  Heading,
  Bold,
  Code,
  Italic,
  Strike,
  Underline,
  History
} from 'tiptap-extensions'
import BubbleMenu from './BubbleMenu'
export default {
  name: 'EditorComponent',
  components: {
    BubbleMenu,
    EditorContent
  },
  data() {
    return {
      editor: null
    }
  },
  // This is called only on client (in browser)
  mounted() {
    this.editor = new Editor({
      extensions: [
        new Heading({ levels: [1, 2, 3]}),
        new Bold(),
        new Code(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History()
      ]
    })
  },
  beforeDestroy() {
    // Always destroy your editor instance when it's no longer needed
    this.editor && this.editor.destroy()
  }
}
</script>
