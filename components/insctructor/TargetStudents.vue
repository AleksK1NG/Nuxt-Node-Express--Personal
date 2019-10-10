<template>
  <div class="card manage-card">
    <header class="card-header card-section">
      <p class="card-header-title">Target your Students</p>
    </header>
    <div class="card-content card-section">
      <form>
        <MultiLineTextInput
          @emitAdd="addLine('wsl')"
          @emitUpdate="updateLine($event, 'wsl')"
          @emitRemove="removeLine($event, 'wsl')"
          :lines="course.wsl"
          label="What will students learn"
        />
        <MultiLineTextInput
          @emitAdd="addLine('requirements')"
          @emitUpdate="updateLine($event, 'requirements')"
          @emitRemove="removeLine($event, 'requirements')"
          :lines="course.requirements"
          label="What are the requirements"
        />
      </form>
    </div>
  </div>
</template>
<script>
import Header from '~/components/shared/Header'
import MultiLineTextInput from '../form/MultiLineTextInput'
import { ADD_COURSE_LINE, REMOVE_COURSE_LINE, UPDATE_COURSE_LINE } from '../../store/constants'

export default {
  name: 'TargetStudents',
  components: { MultiLineTextInput, Header },
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  methods: {
    addLine(field) {
      this.$store.commit(`instructor/course/${ADD_COURSE_LINE}`, field)
    },
    removeLine(index, field) {
      this.$store.commit(`instructor/course/${REMOVE_COURSE_LINE}`, { field, index })
    },
    updateLine({ value, index }, field) {
      this.$store.commit(`instructor/course/${UPDATE_COURSE_LINE}`, { field, value, index })
    }
  }
}
</script>
