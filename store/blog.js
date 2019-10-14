import Vue from 'vue'
import { SET_BLOG, SET_BLOG_PAGINATION, SET_ERROR, SET_LOADING, SET_USER_BLOGS } from '~/store/constants'

export const state = () => ({
  blog: {},
  blogItems: {
    all: [],
    featured: []
  },
  pagination: {
    count: 0,
    pageCount: 0,
    pageSize: 2,
    pageNum: 1
  },
  isLoading: false,
  error: null
})

export const getters = {}
export const mutations = {
  [SET_LOADING]: (state, loading) => (state.isLoading = loading),
  [SET_ERROR]: (state, error) => (state.error = error),
  [SET_USER_BLOGS]: (state, { field, items }) => (state.blogItems[field] = items),
  [SET_BLOG]: (state, blog) => (state.blog = blog),
  [SET_BLOG_PAGINATION]: (state, { count, pageCount }) => {
    Vue.set(state.pagination, count, count)
    Vue.set(state.pagination, pageCount, pageCount)
    debugger
  }
}
export const actions = {
  async fetchAllBlogs({ commit }) {
    commit(SET_LOADING, true)

    try {
      const { blogs, count, pageCount } = await this.$axios.$get('/api/v1/blogs')
      // set user blogs by field name
      commit(SET_USER_BLOGS, { field: 'all', items: blogs })
      commit(SET_BLOG_PAGINATION, { count, pageCount })
      commit(SET_ERROR, null)
      commit(SET_LOADING, false)
      return blogs
    } catch (error) {
      console.error(error)
      commit(SET_ERROR, error)
      commit(SET_LOADING, false)
      return error
    }
  },

  async fetchFeaturedBlogs({ commit }, filter) {
    commit(SET_LOADING, true)

    const url = this.$applyParamsToUrl('/api/v1/blogs', filter)

    try {
      const { blogs } = await this.$axios.$get(url)
      // set user blogs by field name
      commit(SET_USER_BLOGS, { field: 'featured', items: blogs })
      commit(SET_ERROR, null)
      commit(SET_LOADING, false)
      return blogs
    } catch (error) {
      console.error(error)
      commit(SET_ERROR, error)
      commit(SET_LOADING, false)
      return error
    }
  },

  async fetchBlogBySlug({ commit }, slug) {
    commit(SET_LOADING, true)

    try {
      const blog = await this.$axios.$get(`/api/v1/blogs/s/${slug}`)

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
