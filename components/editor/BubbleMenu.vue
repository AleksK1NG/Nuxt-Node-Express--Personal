<template>
  <editor-menu-bubble :editor="editor" :keep-in-bounds="keepInBounds" v-slot="{ commands, isActive, menu }">
    <div
      class="menububble"
      :class="{ 'is-active': menu.isActive }"
      :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
    >
      <button class="menububble__button" :class="{ 'is-active': isActive.bold() }" @click="commands.bold()">
        <Icon name="bold" size="small" />
      </button>
      <button class="menububble__button" :class="{ 'is-active': isActive.italic() }" @click="commands.italic()">
        <Icon name="italic" size="small" />
      </button>
      <button class="menububble__button" :class="{ 'is-active': isActive.code() }" @click="commands.code()">
        <Icon name="code" size="small" />
      </button>
      <button class="menububble__button" :class="{ 'is-active': isActive.strike() }" @click="commands.strike()">
        <Icon name="strikethrough" size="small" />
      </button>
      <button class="menububble__button" :class="{ 'is-active': isActive.underline() }" @click="commands.underline()">
        <Icon name="underline" size="small" />
      </button>
      <button
        class="menububble__button"
        :class="{ 'is-active': isActive.heading({ level: 1 }) }"
        @click="commands.heading({ level: 1 })"
      >
        H1
      </button>

      <button
        class="menububble__button"
        :class="{ 'is-active': isActive.heading({ level: 2 }) }"
        @click="commands.heading({ level: 2 })"
      >
        H2
      </button>

      <button
        class="menububble__button"
        :class="{ 'is-active': isActive.heading({ level: 3 }) }"
        @click="commands.heading({ level: 3 })"
      >
        H3
      </button>
    </div>
  </editor-menu-bubble>
</template>

<script>
import { EditorMenuBubble } from 'tiptap'
import Icon from '../shared/Icon'
export default {
  name: 'BubbleMenu',
  components: {
    Icon,
    EditorMenuBubble
  },
  props: {
    editor: {
      type: Object
    }
  },
  data() {
    return {
      keepInBounds: true
    }
  }
}
</script>
