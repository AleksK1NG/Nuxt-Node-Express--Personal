<template>
  <div>
    <Header title="Write your Blogs" exitLink="/instructor/blogs" />
    <div class="blog-editor-container">
      <div class="container">
        <EditorComponent @editorUpdated="saveBlog" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '~/components/shared/Header'
import EditorComponent from '../../../components/editor/index'
export default {
  name: 'editorPage',
  layout: 'instructor',
  components: {
    EditorComponent,
    Header
  },
  methods: {
    saveBlog(blogData) {
      this.$store
        .dispatch('instructor/blog/createBlog', blogData)
        .then((blog) => {
          this.$router.push(`/instructor/blog/${blog._id}/edit`)
          this.$toasted.success('Blog created', { duration: 3000, position: 'top-center' })
        })
        .catch(() => this.$toasted.error('Some error', { duration: 3000, position: 'top-center' }))
    }
  }
}
</script>
<style lang="scss">
.blog-editor-container {
  padding-top: 60px;
}
</style>
