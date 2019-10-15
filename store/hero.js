import { SET_BLOG_PAGINATION, SET_ERROR, SET_HERO, SET_LOADING, SET_USER_BLOGS } from '~/store/constants'

export const state = () => ({
  hero: null,
  isLoading: false,
  error: null
})

export const getters = {}

export const mutations = {
  [SET_LOADING]: (state, loading) => (state.isLoading = loading),
  [SET_ERROR]: (state, error) => (state.error = error),
  [SET_HERO]: (state, hero) => (state.hero = hero)
}

export const actions = {
  async createHero({ commit }, courseHeroData) {
    commit(SET_LOADING, true)

    try {
      const hero = await this.$axios.$post('/api/v1/product-heroes', courseHeroData)
      debugger
      commit(SET_HERO, hero)
      commit(SET_ERROR, null)
      commit(SET_LOADING, false)
      return hero
    } catch (error) {
      console.error(error)
      commit(SET_ERROR, error)
      commit(SET_LOADING, false)
      return error
    }
  }
}
