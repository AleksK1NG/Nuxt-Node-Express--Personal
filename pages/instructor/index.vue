<template>
  <div class="instructor-page">
    <div class="centered">
      <div class="columns">
        <!-- Go to /instructor/courses -->
        <div class="box" @click="() => {}">
          <div>
            Courses
          </div>
        </div>
        <!-- Go to /instructor/blogs -->
        <div class="box" @click="() => {}">
          <div>
            Blogs
          </div>
        </div>
        <!-- Go to /instructor/heroes -->
        <div class="box" @click="() => {}">
          <div>
            Heroes
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'instructor',
    middleware: 'admin'
  }
</script>

<style scoped></style>
