<template>
  <!-- Finish handling of URL -->
  <div>
    <Header title="Write your blog" exitLink="/instructor/blogs">
      <!-- TODO: Check if blog status is active -->
      <template #actionMenu>
        <div class="full-page-takeover-header-button">
          <!-- TODO: Check blog validity before publishing -->
          <Modal
            @opened="checkBlogValidity"
            openTitle="Publish"
            openBtnClass="button is-success is-medium is-inverted is-outlined"
            title="Review Details"
          >
            <div>
              <div class="title">Once you publish blog you cannot change url to a blog.</div>
              <!-- Check for error -->
              <div v-if="!publishError">
                <div class="subtitle">Current Url is:</div>
                <article class="message is-success">
                  <div class="message-body">
                    <!-- Get here actual slug -->
                    <strong>{{ getCurrentUrl() }}/blogs/{{ slug }}</strong>
                  </div>
                </article>
              </div>
              <article v-else class="message is-danger">
                <div class="message-body">
                  {{ publishError }}
                </div>
              </article>
            </div>
          </Modal>
        </div>
      </template>
      <!-- <template v-else #actionMenu>
        <div class="full-page-takeover-header-button">
          <Modal
            openTitle="Unpublish"
            openBtnClass="button is-success is-medium is-inverted is-outlined"
            title="Unpublish Blog">
            <div>
              <div class="title">Unpublish blog so it's no longer displayed in blogs page</div>
            </div>
          </Modal>
        </div>
      </template> -->
    </Header>
    <div class="blog-editor-container">
      <div class="container">
        <editor @editorMounted="initBlogContent" @editorUpdated="updateBlog" :isSaving="isSaving" />
      </div>
    </div>
  </div>
</template>
<script>
import Editor from '~/components/editor'
import Header from '~/components/shared/Header'
import Modal from '~/components/shared/Modal'
import slugify from 'slugify'
import { mapState } from 'vuex'

export default {
  name: 'BlogEdit',
  layout: 'instructor',
  components: {
    Editor,
    Header,
    Modal
  },
  data: () => ({
    publishError: ''
  }),
  computed: {
    ...mapState({
      blog: (store) => store.instructor.blog.blog,
      isSaving: (store) => store.instructor.blog.isLoading
    })
  },
  async fetch({ store, params }) {
    await store.dispatch('instructor/blog/fetchBlogById', params.id)
  },
  methods: {
    initBlogContent(initContent) {
      if (this.blog && this.blog.content) {
        initContent(this.blog.content)
      }
    },
    updateBlog(blogData) {
      this.$store
        .dispatch('instructor/blog/updateBlog', { data: blogData, id: this.blog._id })
        .then(() => {
          // this.$router.push(`/instructor/blogs`)
          this.$toasted.success('Blog Updated!', { duration: 3000, position: 'top-center' })
        })
        .catch(() => this.$toasted.error('Some error', { duration: 3000, position: 'top-center' }))
    },
    checkBlogValidity() {
      const title = this.$refs.editor.getNodeValueByName('title')
      this.publishError = ''
      if (title && title.length > 24) {
        // create slug from title
      } else {
        this.publishError = 'Cannot publish! Title needs to be longer than 24 characters!'
      }
    },
    getCurrentUrl() {
      // process.client will return true if we are in browser environment
      return process.client && window.location.origin
    },
    slugify(text) {
      return slugify(text, {
        replacement: '-',
        remove: null,
        lower: true
      })
    }
  }
}
</script>
