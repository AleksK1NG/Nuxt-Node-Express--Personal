<template>
  <div class="card manage-card">
    <header class="card-header card-section">
      <p class="card-header-title">Target your Students</p>
    </header>
    <div class="card-content card-section">
      <form>
        <MultiLineTextInput :lines="course.wsl" label="What will students learn" />
        <MultiLineTextInput :lines="course.requirements" label="What are the requirements" />
      </form>
    </div>
  </div>
</template>
<script>
import Header from '~/components/shared/Header'
import MultiLineTextInput from '../form/MultiLineTextInput'

export default {
  name: 'TargetStudents',
  components: { MultiLineTextInput, Header },
  props: {
    course: {
      type: Object,
      required: true
    }
  }
}
</script>
