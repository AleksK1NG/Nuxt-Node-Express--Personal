export const actions = {
  async nuxtServerInit({ commit, dispatch }) {
    try {
      await dispatch('auth/loadUSer')
    } catch (error) {
      console.error(error)
    }
  }
}
