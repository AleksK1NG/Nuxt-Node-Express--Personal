<template>
  <div class="blog-editor-container">
    <div class="container">
      <div class="blog-section-user">
        <user-tile :name="blog.author.name" :avatar="blog.author.avatar" :date="blog.createdAt | formatDate" />
      </div>
      <EditorView :initialContent="blog.content" />
    </div>
  </div>
</template>

<script>
import UserTile from '~/components/shared/UserTile'
import EditorView from '../../components/editor/EditorView'
export default {
  name: 'SlugPage',
  components: {
    EditorView,
    UserTile
  },
  computed: {
    blog() {
      return this.$store.state.blog.blog
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('blog/fetchBlogBySlug', params.slug)
  }
}
</script>
<style scoped lang="scss">
.blog-content,
.blog-section-user {
  max-width: 800px;
  margin: 10px auto;
}
</style>
