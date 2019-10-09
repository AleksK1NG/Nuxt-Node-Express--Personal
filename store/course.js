import { SET_COURSES, SET_ERROR, SET_LOADING } from '~/store/constants'

export const state = () => ({
  courses: [],
  course: {},
  isLoading: false,
  error: null
})

export const actions = {
  async fetchCourses({ commit }) {
    commit(SET_LOADING, true)
    try {
      const courses = await this.$axios.$get('/api/v1/products')
      commit(SET_COURSES, courses)
      commit(SET_LOADING, false)
      commit(SET_ERROR, null)
      return courses
    } catch (error) {
      console.error(error)
      commit(SET_ERROR, error)
      commit(SET_LOADING, false)
      return error
    }
  }
}

export const mutations = {
  [SET_COURSES]: (state, courses) => (state.courses = courses),
  [SET_LOADING]: (state, loading) => (state.isLoading = loading),
  [SET_ERROR]: (state, error) => (state.error = error)
}
