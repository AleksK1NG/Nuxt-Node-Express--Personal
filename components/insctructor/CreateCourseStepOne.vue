<template>
  <div class="course-create-wrapper">
    <div class="course-create-headerText">
      Please choose title of your Course.
    </div>
    <h2 class="course-create-subtitle">
      No worries, you can change title later.
    </h2>
    <form class="course-create-form">
      <div class="course-create-form-group">
        <div class="field course-create-form-field control has-icons-right">
          <input
            @input="emitFormData"
            v-model="form.title"
            :maxLength="50"
            type="text"
            placeholder="e.g. Amazing Course in Flutter!"
            class="input is-large"
          />
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'CreateCourseStepOne',
  data: () => ({
    form: {
      title: ''
    }
  }),
  computed: {
    isValid() {
      return !this.$v.$invalid
    }
  },
  validations: {
    form: {
      title: {
        required
      }
    }
  },
  methods: {
    emitFormData() {
      this.$emit('updateStep', { data: this.form, isValid: this.isValid })
    }
  }
}
</script>
