import { SET_ERROR, SET_HEROES, SET_LOADING } from '~/store/constants'

export const state = () => ({
  heroes: [],
  isLoading: false,
  error: null
})

export const getters = {}

export const mutations = {
  [SET_LOADING]: (state, loading) => (state.isLoading = loading),
  [SET_ERROR]: (state, error) => (state.error = error),
  [SET_HEROES]: (state, heroes) => (state.heroes = heroes)
}

export const actions = {
  async fetchHeroes({ commit }) {
    commit(SET_LOADING, true)

    try {
      const heroes = await this.$axios.$get('/api/v1/product-heroes')
      debugger
      commit(SET_HEROES, heroes)
      commit(SET_ERROR, null)
      commit(SET_LOADING, false)
      return heroes
    } catch (error) {
      console.error(error)
      commit(SET_ERROR, error)
      commit(SET_LOADING, false)
      return error
    }
  }
}
