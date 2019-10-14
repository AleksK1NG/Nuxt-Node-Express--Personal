import { SET_BLOG, SET_ERROR, SET_LOADING, SET_USER_BLOGS } from '~/store/constants'
import { separateBlogs } from '~/helpers/separateBlogsHelper'

export const state = () => ({
  userBlogs: {
    drafts: [],
    published: []
  },
  blog: {},
  isLoading: false,
  error: null
})

export const getters = {}

export const mutations = {
  [SET_BLOG]: (state, newBlog) => (state.blog = newBlog),
  [SET_LOADING]: (state, loading) => (state.isLoading = loading),
  [SET_ERROR]: (state, error) => (state.error = error),
  [SET_USER_BLOGS]: (state, { field, items }) => (state.userBlogs[field] = items)
}

export const actions = {
  async createBlog({ commit }, blogData) {
    commit(SET_LOADING, true)

    try {
      const blog = await this.$axios.$post('/api/v1/blogs', blogData)

      commit(SET_BLOG, blog)
      commit(SET_ERROR, null)
      commit(SET_LOADING, false)
      return blog
    } catch (error) {
      console.error(error)
      commit(SET_ERROR, error)
      commit(SET_LOADING, false)
      return error
    }
  },

  async fetchUserBlogs({ commit }) {
    commit(SET_LOADING, true)

    try {
      const blogs = await this.$axios.$get('/api/v1/blogs/me')
      // separate blogs by status
      const { published, drafts } = separateBlogs(blogs)
      // set user blogs by field name
      commit(SET_USER_BLOGS, { field: 'published', items: published })
      commit(SET_USER_BLOGS, { field: 'drafts', items: drafts })
      commit(SET_ERROR, null)
      commit(SET_LOADING, false)
      return { published, drafts }
    } catch (error) {
      console.error(error)
      commit(SET_ERROR, error)
      commit(SET_LOADING, false)
      return error
    }
  },

  async fetchBlogById({ commit }, blogId) {
    commit(SET_LOADING, true)

    try {
      const blog = await this.$axios.$get(`/api/v1/blogs/${blogId}`)

      commit(SET_BLOG, blog)
      commit(SET_ERROR, null)
      commit(SET_LOADING, false)
      return blog
    } catch (error) {
      console.error(error)
      commit(SET_ERROR, error)
      commit(SET_LOADING, false)
      return error
    }
  },

  async updateBlog({ commit }, { data, id }) {
    commit(SET_LOADING, true)

    try {
      const blog = await this.$axios.$patch(`/api/v1/blogs/${id}`, data)
      debugger
      commit(SET_BLOG, blog)
      commit(SET_ERROR, null)
      commit(SET_LOADING, false)
      return blog
    } catch (error) {
      console.error(error)
      commit(SET_ERROR, error)
      commit(SET_LOADING, false)
      return error
    }
  }
}
