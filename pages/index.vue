<template>
  <div>
    <Hero />
    <section class="section">
      <div class="container">
        <h1 class="title">Featured Courses</h1>
        <div class="columns">
          <div class="column is-one-quarter">
            <CourseCard />
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h1 class="title">Featured Articles</h1>
        <div class="columns">
          <div class="column is-one-quarter">
            <BlogCard />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Hero from '../components/shared/Hero'
import CourseCard from '../components/coursePage/courseCard'
import BlogCard from '../components/blogPage/blogCard'
export default {
  components: { BlogCard, CourseCard, Hero }
}
</script>

<style scoped lang="scss">
.links {
  padding-top: 15px;
}
</style>
