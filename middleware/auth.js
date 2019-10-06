export default function({ store, redirect }) {
  const isAuth = store.getters['auth/isAuthenticatedGetter']

  if (!isAuth) {
    return redirect('/notAuthenticated')
  }
}
