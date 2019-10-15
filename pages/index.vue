<template>
  <div>
    <hero
      :title="courseHero.title"
      :subtitle="courseHero.subtitle"
      :image="courseHero.image"
      :promoLink="courseHero.product && courseHero.product.productLink"
    />
    <section class="section">
      <div class="container">
        <h1 class="title">Featured Courses</h1>
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
    <section class="section">
      <div class="container">
        <h1 class="title">Featured Articles</h1>
        <div class="columns is-multiline">
          <div v-for="blog in featuredBlogs" class="column is-one-quarter">
            <blog-card :key="blog._id" :blog="blog" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Hero from '../components/shared/Hero'
import CourseCard from '../components/coursePage/courseCard'
import BlogCard from '../components/homePage/BlogCard'
import { mapState } from 'vuex'
import CourseCardTooltip from '../components/CourseCardTooltip'

export default {
  head: {
    title: 'Online Courses and Blog | Alex Bryksin'
  },
  components: { CourseCardTooltip, BlogCard, CourseCard, Hero },
  computed: {
    ...mapState({
      courses: (state) => state.course.courses,
      featuredBlogs: (state) => state.blog.blogItems.featured,
      courseHero: (state) => state.hero.hero
    })
  },
  async fetch({ store }) {
    await store.dispatch('course/fetchCourses')
    await store.dispatch('blog/fetchFeaturedBlogs', { 'filter[featured]': true })
  }
}
</script>

<style scoped lang="scss">
.links {
  padding-top: 15px;
}
</style>
