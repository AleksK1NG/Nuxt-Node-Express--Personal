<template>
  <div class="manage-page">
    <Header title="Some very nice course name" exitLink="/instructor/courses">
      <template #actionMenu>
        <div class="full-page-takeover-header-button">
          <button
            :disabled="!canUpdateCourse"
            @click="updateCourse"
            class="button is-primary is-inverted is-medium is-outlined"
          >
            Save
          </button>
        </div>
        <div class="full-page-takeover-header-button">
          <Modal
            openTitle="Favorite"
            openBtnClass="button is-primary is-inverted is-medium is-outlined"
            title="Make Course Hero"
            @opened="applyCourseValues"
            @submitted="createCourseHero"
          >
            <div>
              <form>
                <div class="field">
                  <label class="label">Hero title</label>
                  <span class="label-info">Suggested 64 Characters</span>
                  <div class="control">
                    <input
                      v-model="courseHero.title"
                      class="input is-medium"
                      type="text"
                      placeholder="Amazing course discount"
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Hero subtitle</label>
                  <span class="label-info">Suggested 128 Characters</span>
                  <input
                    v-model="courseHero.subtitle"
                    class="input is-medium"
                    type="text"
                    placeholder="Get all of the course for 9.99$"
                  />
                </div>
                <div class="field">
                  <label class="label">Hero image</label>
                  <span class="label-info">Image in format 3 by 1 (720 x 240)</span>
                  <input
                    v-model="courseHero.image"
                    class="input is-medium"
                    type="text"
                    placeholder="Some image in format 3 by 1 (720 x 240)"
                  />
                  <figure class="image is-3by1">
                    <img :src="courseHero.image" />
                  </figure>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </template>
    </Header>
    <div class="course-manage">
      <div class="container">
        <div class="columns">
          <div class="column is-3 p-lg">
            <!-- <aside class="menu is-hidden-mobile"> -->
            <aside class="menu">
              <p class="menu-label">
                Course Editing
              </p>
              <ul class="menu-list">
                <li>
                  <a :class="activeComponentClass(1)" @click.prevent="navigateTo(1)">Target Your Students </a>
                </li>
                <li>
                  <a :class="activeComponentClass(2)" @click.prevent="navigateTo(2)">
                    Course Landing Page
                  </a>
                </li>
              </ul>
              <p class="menu-label">
                Course Managment
              </p>
              <ul class="menu-list">
                <li>
                  <a :class="activeComponentClass(3)" @click.prevent="navigateTo(3)">
                    Price
                  </a>
                </li>
                <li>
                  <a :class="activeComponentClass(4)" @click.prevent="navigateTo(4)">
                    Status
                  </a>
                </li>
              </ul>
            </aside>
          </div>
          <div class="column">
            <keep-alive>
              <component @emitCourseValue="handleCourseUpdate" :course="course" :is="activeComponent" />
            </keep-alive>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '~/components/shared/Header'
import LandingPage from '../../../../components/insctructor/LandingPage'
import Status from '../../../../components/insctructor/Status'
import Price from '../../../../components/insctructor/Price'
import TargetStudents from '../../../../components/insctructor/TargetStudents'
import MultiComponentMixin from '../../../../mixins/MultiComponentMixin'
import { mapState } from 'vuex'
import { UPDATE_COURSE_VALUE } from '../../../../store/constants'
import Modal from '../../../../components/shared/Modal'
export default {
  name: 'manage',
  layout: 'instructor',
  components: { Modal, TargetStudents, Price, Status, LandingPage, Header },
  data: () => ({
    steps: ['TargetStudents', 'LandingPage', 'Price', 'Status'],
    activeStep: 1,
    courseHero: {}
  }),
  async fetch({ store, params }) {
    try {
      await store.dispatch('instructor/course/fetchCourseById', params.id)
      await store.dispatch('category/fetchCategories')
    } catch (error) {
      console.error(error)
    }
  },
  computed: {
    ...mapState({
      course: ({ instructor }) => instructor.course.course,
      canUpdateCourse: ({ instructor }) => instructor.course.canUpdateCourse
    })
  },
  mixins: [MultiComponentMixin],
  methods: {
    updateCourse() {
      this.$store
        .dispatch('instructor/course/updateCourse')
        .then(() => {
          this.$router.push('/instructor/courses')
          this.$toasted.success('Course successfully updated', { duration: 3000, position: 'top-center' })
        })
        .catch(() => this.$toasted.error('Error', { duration: 3000, position: 'top-center' }))
    },

    createCourseHero({ closeModal }) {
      const heroData = { ...this.courseHero }
      heroData.product = { ...this.course }
      this.$store
        .dispatch('hero/createHero', heroData)
        .then(() => {
          closeModal()
          this.$toasted.success('Course Hero was created!', { duration: 3000, position: 'top-center' })
        })
        .catch(() => this.$toasted.error('Error', { duration: 3000, position: 'top-center' }))
    },

    handleCourseUpdate({ value, field }) {
      // this.$store.dispatch('instructor/course/updateCourseValue', {value, field})
      this.$store.commit(`instructor/course/${UPDATE_COURSE_VALUE}`, { field, value })
    },

    navigateTo(step) {
      this.activeStep = step
    },

    activeComponentClass(step) {
      return this.activeStep === step ? 'is-active' : ''
    },

    applyCourseValues() {
      // !this.courseHero.title && this.$set(this.courseHero, 'title', this.course.title)
      // !this.courseHero.subtitle && this.$set(this.courseHero, 'subtitle', this.course.subtitle)
      this.$set(this.courseHero, 'title', this.course.title)
      this.$set(this.courseHero, 'subtitle', this.course.subtitle)
      this.$set(this.courseHero, 'image', this.course.image)
    }
  }
}
</script>

<style lang="scss">
.manage-page {
  .label-info {
    font-size: 13px;
    color: gray;
    font-style: italic;
  }
  .course-manage {
    padding-top: 40px;
    .menu {
      padding-top: 30px;
      &-label {
        font-size: 20px;
        color: black;
      }
      &-list {
        > li {
          font-size: 18px;
          margin-top: 10px;
          > a {
            &.is-active {
              border-left: 3px solid #58529f;
              background-color: transparent;
              color: inherit;
            }
          }
        }
      }
    }
    .card {
      &-section {
        padding: 40px;
      }
      &-header {
        &-title {
          padding: 0;
          color: #8f99a3;
          font-weight: 400;
          font-size: 25px;
        }
      }
    }
  }
}
</style>
