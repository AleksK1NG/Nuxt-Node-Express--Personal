<template>
  <div>
    <input
      @input="emitInputValue"
      @blur="v.$touch()"
      :maxLength="maxLength"
      type="text"
      placeholder="e.g. Amazing Course in Flutter!"
      class="input is-large"
    />
    <span class="icon is-small is-right">
      {{ remainingLength }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'TextInputWithCount',
  props: {
    maxLength: {
      type: Number,
      default: 50,
      required: false
    },
    v: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    currentValue: ''
  }),
  computed: {
    inputLength() {
      return this.currentValue.length || ''
    },
    remainingLength() {
      if (this.inputLength > 0 && this.inputLength < this.maxLength) {
        return this.maxLength - this.inputLength
      } else if (this.inputLength === 0) {
        return this.maxLength
      } else {
        return 0
      }
    }
  },
  methods: {
    emitInputValue($event) {
      this.currentValue = $event.target.value
      this.$emit('input', $event.target.value)
    }
  }
}
</script>

<style scoped></style>
