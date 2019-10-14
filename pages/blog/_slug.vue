<template>
  <div class="blog-editor-container">
    <div class="container">
      <div class="blog-section-user">
        <UserTile :name="blog.author.name" :avatar="blog.author.avatar" :date="blog.createdAt | formatDate" />
      </div>
      <div class="blog-content" v-html="blog.content"></div>
    </div>
  </div>
</template>

<script>
import UserTile from '~/components/shared/UserTile'
export default {
  name: 'SlugPage',
  components: {
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
