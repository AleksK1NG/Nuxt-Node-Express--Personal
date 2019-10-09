import { ADD_COURSE, SET_COURSE, SET_COURSES, SET_ERROR, SET_LOADING } from '~/store/constants'

export const state = () => ({
  courses: [],
  course: {},
  isLoading: false,
  error: null
})

export const actions = {
  async fetchInstructorCourses({ commit }) {
    commit(SET_LOADING, true)
    try {
      const courses = await this.$axios.$get('/api/v1/products/user-products')
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
  },

  async fetchCourseById({ commit }, courseId) {
    commit(SET_LOADING, true)

    try {

      const course = await this.$axios.$get(`/api/v1/products/${courseId}`)
      commit(SET_COURSE, course)
      commit(SET_LOADING, false)
      commit(SET_ERROR, null)

      return true
    } catch (error) {
      console.error(error)
      commit(SET_ERROR, error)
      commit(SET_LOADING, false)
      return error
    }
  },

  async createCourse({ commit }, courseData) {
    commit(SET_LOADING, true)

    try {
      const course = await this.$axios.$post('/api/v1/products', courseData)

      commit(ADD_COURSE, course)
      commit(SET_LOADING, false)
      commit(SET_ERROR, null)

      return true
    } catch (error) {
      console.error(error)
      commit(SET_ERROR, error)
      commit(SET_LOADING, false)
      return error
    }
  }
}
export const mutations = {
  [SET_COURSE]: (state, newCourse) => (state.course = newCourse),
  [SET_COURSES]: (state, courses) => (state.courses = courses),
  [SET_LOADING]: (state, loading) => (state.isLoading = loading),
  [SET_ERROR]: (state, error) => (state.error = error),
  [ADD_COURSE]: (state, newCourse) => state.courses.push(newCourse)
}
export const getters = {}
