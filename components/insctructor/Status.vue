<template>
  <div class="card manage-card">
    <header class="card-header card-section">
      <p class="card-header-title">Status</p>
    </header>
    <div class="card-content card-section">
      <div class="field">
        <label class="label">Status</label>
        <div class="select is-medium">
          <select :value="course.status" @change="($event) => emitCourseValue($event, 'status')">
            >
            <option value="default">Change Status</option>
            <option value="active">
              Active
            </option>
            <option value="published">
              Published
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '~/components/shared/Header'

export default {
  name: 'Status',
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
