export default function({ store, redirect }) {
  const isAdmin = store.getters['auth/isAdminGetter']

  if (!isAdmin) {
    return redirect('/')
  }
}
