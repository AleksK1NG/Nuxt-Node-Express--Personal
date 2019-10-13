<template>
  <div class="editor editor-squished">
    <BasicMenu :editor="editor" />
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
  History,
  Blockquote,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  CodeBlockHighlight
} from 'tiptap-extensions'
import BubbleMenu from './BubbleMenu'
import BasicMenu from './BasicMenu'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'

export default {
  name: 'EditorComponent',
  components: {
    BasicMenu,
    BubbleMenu,
    EditorContent
  },
  data() {
    return {
      editor: null
    }
  },
  // This is called only on client
  mounted() {
    this.editor = new Editor({
      extensions: [
        new Heading({ levels: [1, 2, 3] }),
        new Bold(),
        new Code(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History(),
        new Blockquote(),
        new HorizontalRule(),
        new OrderedList(),
        new BulletList(),
        new ListItem(),
        new CodeBlockHighlight({
          languages: {
            javascript,
            css
          }
        })
      ]
    })
  },
  beforeDestroy() {
    // Always destroy your editor instance when it's no longer needed
    this.editor && this.editor.destroy()
  }
}
</script>
