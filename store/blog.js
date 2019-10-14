import { SET_ERROR, SET_LOADING, SET_USER_BLOGS } from '~/store/constants'

export const state = () => ({
  blogItems: {
    all: [],
    featured: []
  },
  isLoading: false,
  error: null
})

export const getters = {}
export const mutations = {
  [SET_LOADING]: (state, loading) => (state.isLoading = loading),
  [SET_ERROR]: (state, error) => (state.error = error),
  [SET_USER_BLOGS]: (state, { field, items }) => (state.blogItems[field] = items)
}
export const actions = {
  async fetchAllBlogs({ commit }) {
    commit(SET_LOADING, true)

    try {
      const { blogs } = await this.$axios.$get('/api/v1/blogs')
      // set user blogs by field name
      commit(SET_USER_BLOGS, { field: 'all', items: blogs })
      commit(SET_ERROR, null)
      commit(SET_LOADING, false)
      return blogs
    } catch (error) {
      console.error(error)
      commit(SET_ERROR, error)
      commit(SET_LOADING, false)
      return error
    }
  }
}
