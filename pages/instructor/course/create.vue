<template>
  <div class="full-page-takeover-window">
    <div class="full-page-takeover-page">
      <InstructorHeader title="Step 1 of 2" exitLink="/instructor/courses" />
      <div class="full-page-takeover-header-bottom-progress">
        <div :style="{ width: progress }" class="full-page-takeover-header-bottom-progress-highlight"></div>
      </div>
      <div class="course-create full-page-takeover-container">
        <div class="container">
          <CreateCourseStepOne v-if="activeStep === 1" />
          <CreateCourseStepTwo v-if="activeStep === 2" />
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
                <button v-if="!isLastStep" @click.prevent="nextStep" class="button is-large float-right">
                  Continue
                </button>
                <button v-else @click="() => {}" class="button is-success is-large float-right">
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
    steps: ['CourseCreateStep1', 'CourseCreateStep2']
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
    }
  },
  methods: {
    nextStep() {
      if (this.activeStep === 2) return
      this.activeStep++
    },
    prevStep() {
      if (this.activeStep === 1) return
      this.activeStep--
    }
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
    font-weight: 300;
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
  }
}
</style>
