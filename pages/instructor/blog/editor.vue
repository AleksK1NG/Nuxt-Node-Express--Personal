<template>
  <div>
    <Header title="Write your Blogs" exitLink="/instructor/blogs" />
    <div class="blog-editor-container">
      <div class="container">
        <EditorComponent />
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
  }
}
</script>
<style lang="scss">
.blog-editor-container {
  padding-top: 60px;
}
</style>
