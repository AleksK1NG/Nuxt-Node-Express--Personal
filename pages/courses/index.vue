<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title">All Courses</h1>
        <div class="columns is-multiline">
          <!-- iterate columns with v-for and don't forget :key -->
          <div v-for="course in courses" :key="course._id" class="column is-one-quarter">
            <!-- pass a course as a prop to course-card -->
            <v-popover offset="16" trigger="hover" placement="right-start">
              <course-card :course="course" />
              <template slot="popover">
                <course-card-tooltip
                  :title="course.title"
                  :subtitle="course.category.name"
                  :description="course.subtitle"
                  :wsl="course.wsl"
                />
              </template>
            </v-popover>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CourseCardTooltip from '../../components/CourseCardTooltip'
import CourseCard from '../../components/coursePage/courseCard'

export default {
  name: 'CoursesPage',
  components: { CourseCard, CourseCardTooltip },
  head: {
    title: 'Tech Courses | Alex Bryksin'
  },

  computed: {
    ...mapState({
      courses: (state) => state.course.courses
    })
  },
  async fetch({ store }) {
    await store.dispatch('course/fetchCourses')
  }
}
</script>

<style scoped></style>
