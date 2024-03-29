<template>
  <div class="full-page-takeover-window">
    <div class="full-page-takeover-page">
      <InstructorHeader :title="`Step ${activeStep} of ${steps.length}`" exitLink="/instructor/courses" />
      <div class="full-page-takeover-header-bottom-progress">
        <div :style="{ width: progress }" class="full-page-takeover-header-bottom-progress-highlight"></div>
      </div>
      <div class="course-create full-page-takeover-container">
        <div class="container">
          <keep-alive>
            <component ref="activeComponentRef" :is="activeComponent" @updateStep="mergeFormData" />
          </keep-alive>
        </div>
        <div class="full-page-footer-row">
          <div class="container">
            <div class="full-page-footer-col">
              <div v-if="!isFirstStep">
                <a @click.prevent="prevStep" class="button is-large">Previous</a>
              </div>
              <div v-else class="empty-container"></div>
            </div>
            <div class="full-page-footer-col">
              <div>
                <button
                  :disabled="!canProceed"
                  v-if="!isLastStep"
                  @click.prevent="nextStep"
                  class="button is-large float-right"
                >
                  Continue
                </button>
                <button
                  :disabled="!canProceed"
                  v-else
                  @click="createCourse"
                  class="button is-success is-large float-right"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreateCourseStepOne from '../../../components/insctructor/CreateCourseStepOne'
import CreateCourseStepTwo from '../../../components/insctructor/CreateCourseStepTwo'
import InstructorHeader from '../../../components/shared/Header'
export default {
  name: 'createCourse',
  components: { InstructorHeader, CreateCourseStepTwo, CreateCourseStepOne },
  data: () => ({
    activeStep: 1,
    steps: ['CreateCourseStepOne', 'CreateCourseStepTwo'],
    canProceed: false,
    form: {
      title: '',
      category: ''
    }
  }),
  computed: {
    stepsLength() {
      return this.steps.length
    },
    isLastStep() {
      return this.activeStep === this.stepsLength
    },
    isFirstStep() {
      return this.activeStep === 1
    },
    progress() {
      return `${(100 / this.stepsLength) * this.activeStep}%`
    },
    activeComponent() {
      return this.steps[this.activeStep - 1]
    },
    categories() {
      return this.$store.state.category.categories
    }
  },
  methods: {
    nextStep() {
      if (this.activeStep === 2) return
      this.activeStep++
      // access component computed value by using ref
      // $nextTick
      this.$nextTick(() => (this.canProceed = this.$refs.activeComponentRef.isValid))
    },
    prevStep() {
      if (this.activeStep === 1) return
      this.activeStep--
      this.canProceed = true
    },
    mergeFormData({ data, isValid }) {
      this.form = { ...this.form, ...data }
      this.canProceed = isValid
    },
    createCourse() {
      this.$store
        .dispatch('instructor/course/createCourse', this.form)
        .then(() => {
          this.$router.push('/instructor/courses')
          this.$toasted.success('Course successfully created', { duration: 3000, position: 'top-center' })
        })
        .catch(() => this.$toasted.error('Error', { duration: 3000, position: 'top-center' }))
    }
  },
  fetch({ store }) {
    return store.dispatch('category/fetchCategories')
  }
}
</script>

<style lang="scss">
.float-right {
  float: right;
}
.empty-container {
  width: 1px;
  height: 1px;
}
.course-create {
  &-wrapper {
    margin-top: 60px;
    text-align: center;
  }
  &-headerText {
    font-weight: 500;
    line-height: 1.1;
    margin-top: 21px;
    margin-bottom: 10.5px;
    font-size: 36px;
  }
  &-subtitle {
    font-size: 24px;
    font-weight: 300;
    margin-top: 21px;
    margin-bottom: 10.5px;
  }
  &-form {
    margin-top: 60px;
    &-group {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &-field {
      min-width: 552px;
    }
    .select {
      width: 100%;
      > select {
        width: 100%;
      }
    }
  }
}
</style>
