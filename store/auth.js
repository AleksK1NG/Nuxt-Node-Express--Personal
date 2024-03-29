import { SET_ERROR, SET_LOADING, SET_USER } from '~/store/constants'

export const state = () => ({
  user: null,
  isLoading: false,
  error: null
})

export const actions = {
  async login({ commit }, loginData) {
    commit(SET_LOADING, true)
    try {
      const user = await this.$axios.$post('/api/v1/users/login', loginData)

      commit(SET_USER, user)
      commit(SET_ERROR, null)
      commit(SET_LOADING, false)
      return user
    } catch (error) {
      console.error(error)
      commit(SET_ERROR, error)
      commit(SET_LOADING, false)
      return error
    }
  },

  async register({ commit }, registerData) {
    commit(SET_LOADING, true)
    try {
      await this.$axios.$post('/api/v1/users/register', registerData)

      commit(SET_ERROR, null)
      commit(SET_LOADING, false)
      return true
    } catch (error) {
      let errorMessage = 'Something went wrong, try to register again!'
      if (error.response.data.errors) {
        errorMessage = error.response.data.errors.message
        return errorMessage
      }
      console.error(error)
      commit(SET_ERROR, error)
      commit(SET_LOADING, false)
      return errorMessage
    }
  },

  async loadUSer({ commit, getters }) {
    commit(SET_LOADING, true)

    if (getters.userGetter) return Promise.resolve(getters.userGetter)

    try {
      const user = await this.$axios.$get('/api/v1/users/me')

      commit(SET_USER, user)
      commit(SET_ERROR, null)
      commit(SET_LOADING, false)
      return user
    } catch (e) {
      console.error(error)
      commit(SET_ERROR, error)
      commit(SET_LOADING, false)
      return error
    }
  },

  async logout({ commit }) {
    try {
      await this.$axios.$post('/api/v1/users/logout')

      commit(SET_USER, null)
      commit(SET_ERROR, null)
      commit(SET_LOADING, false)
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
  [SET_ERROR]: (state, error) => (state.error = error),
  [SET_LOADING]: (state, loading) => (state.loading = loading),
  [SET_USER]: (state, user) => (state.user = user)
}

export const getters = {
  userGetter: (state) => state.user || null,
  isLoadingGetter: (state) => state.isLoading,
  isAuthenticatedGetter: (state) => !!state.user,
  isAdminGetter: (state) => state.user && state.user.role && state.user.role === 'admin'
}
