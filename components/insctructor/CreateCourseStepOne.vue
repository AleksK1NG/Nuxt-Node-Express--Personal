<template>
  <div class="course-create-wrapper">
    <div class="course-create-headerText">
      Please choose title of your Course.
    </div>
    <h2 class="course-create-subtitle">
      No worries, you can change title later.
    </h2>
    <form @input="emitFormData" class="course-create-form">
      <div class="course-create-form-group">
        <div class="field course-create-form-field control has-icons-right">
          <TextInputWithCount
            v-model="form.title"
            :v="$v.form.title"
            :maxLength="50"
          />
          <div v-if="$v.form.title.$error" class="form-error">
            <span v-if="!$v.form.title.required" class="help is-danger">Title is required!</span>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import TextInputWithCount from '../form/TextInputWithCount'
export default {
  name: 'CreateCourseStepOne',
  components: { TextInputWithCount },
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
