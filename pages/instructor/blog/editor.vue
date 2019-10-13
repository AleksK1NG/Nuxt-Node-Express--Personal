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
    saveBlog({ content, title, subtitle }) {
      // store dispatch
    }
  }
}
</script>
<style lang="scss">
.blog-editor-container {
  padding-top: 60px;
}
</style>
