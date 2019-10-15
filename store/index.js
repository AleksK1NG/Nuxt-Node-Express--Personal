export const actions = {
  async nuxtServerInit({ commit, dispatch }) {
    try {
      await dispatch('auth/loadUSer')
      await dispatch('hero/fetchHero').catch(() => console.log('Cannot fetch page data'))
    } catch (error) {
      console.error(error)
    }
  }
}

// initial fetch on server
