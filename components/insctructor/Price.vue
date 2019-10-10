<template>
  <div class="card manage-card">
    <header class="card-header card-section">
      <p class="card-header-title">Pricing</p>
    </header>
    <div class="card-content card-section">
      <div class="field">
        <label class="label">Price of the course</label>
        <div class="control">
          <input
            @input="($event) => emitCourseValue($event, 'price')"
            :value="course.price"
            class="input is-medium"
            type="text"
            placeholder="179.99"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">Discounted Price for the course</label>
        <div class="control">
          <input class="input is-medium" type="text" placeholder="9.99" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '~/components/shared/Header'

export default {
  name: 'Price',
  components: { Header },
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  methods: {
    emitCourseValue(event, field) {
      this.$emit('emitCourseValue', { value: event.target.value, field })
    }
  }
}
</script>
