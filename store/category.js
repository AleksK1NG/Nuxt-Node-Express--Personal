import { SET_CATEGORIES, SET_ERROR, SET_LOADING } from '~/store/constants'

export const state = () => ({
  categories: [],
  isLoading: false,
  error: null
})

export const getters = {
  hasCategories: (state) => state.categories.length > 0
}
export const mutations = {
  [SET_CATEGORIES]: (state, categories) => (state.categories = categories),
  [SET_LOADING]: (state, loading) => (state.isLoading = loading),
  [SET_ERROR]: (state, error) => (state.error = error)
}
export const actions = {
  async fetchCategories({ commit, getters }) {
    if (getters.hasCategories) return

    commit(SET_LOADING, true)
    try {
      const categories = await this.$axios.$get('/api/v1/categories')
      commit(SET_CATEGORIES, categories)
      commit(SET_LOADING, false)
      commit(SET_ERROR, null)

      return categories
    } catch (error) {
      console.error(error)
      commit(SET_ERROR, error)
      commit(SET_LOADING, false)
      return error
    }
  }
}
