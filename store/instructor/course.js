import {
  ADD_COURSE,
  ADD_COURSE_LINE,
  REMOVE_COURSE_LINE,
  SET_CAN_UPDATE_COURSE,
  SET_COURSE,
  SET_COURSES,
  SET_ERROR,
  SET_LOADING,
  UPDATE_COURSE_LINE,
  UPDATE_COURSE_VALUE
} from '~/store/constants'

export const state = () => ({
  courses: [],
  course: {},
  isLoading: false,
  error: null,
  canUpdateCourse: false
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
  },

  async updateCourse({ commit, state }) {
    commit(SET_LOADING, true)

    const course = state.course

    try {
      const updatedCourse = await this.$axios.$patch(`/api/v1/products/${course._id}`, course)

      commit(SET_COURSE, updatedCourse)
      commit(SET_LOADING, false)
      commit(SET_ERROR, null)
      commit(SET_CAN_UPDATE_COURSE, false)
      return true
    } catch (error) {
      console.error(error)
      commit(SET_ERROR, error)
      commit(SET_LOADING, false)
      commit(SET_CAN_UPDATE_COURSE, false)
      return error
    }
  }
}
export const mutations = {
  [ADD_COURSE_LINE]: (state, field) => state.course[field].push({ value: '' }),
  [REMOVE_COURSE_LINE]: (state, { field, index }) => state.course[field].splice(index, 1),
  // [UPDATE_COURSE_LINE]: (state, { index, value, field }) => (state.course[field][index].value = value),
  [UPDATE_COURSE_LINE]: (state, { index, value, field }) => {
    state.course[field][index].value = value
    state.canUpdateCourse = true
  },
  [UPDATE_COURSE_VALUE]: (state, { value, field }) => {
    state.course[field] = value
    state.canUpdateCourse = true
  },
  [SET_COURSE]: (state, newCourse) => (state.course = newCourse),
  [SET_COURSES]: (state, courses) => (state.courses = courses),
  [SET_LOADING]: (state, loading) => (state.isLoading = loading),
  [SET_ERROR]: (state, error) => (state.error = error),
  [ADD_COURSE]: (state, newCourse) => state.courses.push(newCourse),
  [SET_CAN_UPDATE_COURSE]: (state, payload) => (state.canUpdateCourse = payload)
}
export const getters = {}
