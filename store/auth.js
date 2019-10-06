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
      return Promise.resolve(user)
    } catch (error) {
      console.error(error)
      commit(SET_ERROR, error)
      commit(SET_LOADING, false)
      return Promise.resolve(error)
    }
  }
}

export const mutations = {
  [SET_ERROR]: (state, error) => (state.error = error),
  [SET_LOADING]: (state, loading) => (state.loading = loading),
  [SET_USER]: (state, user) => (state.user = user)
}

export const getters = {}