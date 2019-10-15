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
          <div v-for="course in courses" :key="course._id" class="column is-one-quarter">
            <course-card :course="course" />
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h1 class="title">Featured Articles</h1>
        <div class="columns is-multiline">
          <div v-for="blog in featuredBlogs" class="column is-one-quarter">
            <BlogCard :key="blog._id" :blog="blog" />
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

export default {
  components: { BlogCard, CourseCard, Hero },
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
