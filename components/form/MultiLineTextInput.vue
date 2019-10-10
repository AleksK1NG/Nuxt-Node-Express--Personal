<template>
  <div>
    <label class="label">{{ label }}</label>
    <div v-for="(line, index) in lines" :key="line.index" class="multi-field field">
      <div class="control multi-control">
        <div class="multi-input-container">
          <input
            @input="emitUpdate($event, index)"
            :value="line.value"
            placeholder="Add Something Nice (:"
            class="input is-medium multi-input"
            type="text"
          />
        </div>
        <div class="btn-container">
          <button @click.prevent="emitRemove(index)" type="button" class="button is-danger multi-button">
            Delete
          </button>
        </div>
      </div>
    </div>
    <button @click="emitAdd" type="button" class="m-b-sm button is-medium is-link is-outlined">
      Add an answer
    </button>
  </div>
</template>

<script>
export default {
  name: 'MultiLineTextInput',
  props: {
    label: {
      type: String,
      required: true
    },
    lines: {
      type: Array,
      required: true
    }
  },
  computed: {
    lastLine() {
      return this.lines[this.lines.length - 1]
    },
    hasLines() {
      return this.lines.length > 0
    },
    hasLastLineValue() {
      return this.lastLine && this.lastLine.value !== ''
    },
    canDeleteLine() {
      return this.lines.length > 1
    },
    canAddLine() {
      return this.hasLines && this.hasLastLineValue
    }
  },
  methods: {
    emitAdd() {
      this.canAddLine && this.$emit('emitAdd')
    },
    emitRemove(index) {
      this.canDeleteLine && this.$emit('emitRemove', index)
    },
    emitUpdate(event, index) {
      const { value } = event.target
      this.$emit('emitUpdate', { value, index })
    }
  }
}
</script>

<style scoped lang="scss">
.multi-input {
  float: left;
  width: 100%;
}
.multi-button {
  height: inherit;
}
.multi-input-container {
  display: flex;
  flex: 1;
}
.btn-container {
  display: flex;
  opacity: 0;
}
.multi-control {
  display: flex;
  &:hover > .btn-container {
    opacity: 1;
  }
}
</style>
