export async function loadList(store, request) {
  const version = ++store.requestVersion
  store.listLoading = true
  store.loadError = ''
  try {
    const data = await request()
    if (version !== store.requestVersion) return
    if (!Array.isArray(data?.data)) throw new Error('Invalid list response')
    store.items = data.data
    store.totalCount = data.totalCount || 0
    store.query.page = data.page || store.query.page
    store.query.pageSize = data.pageSize || store.query.pageSize
  } catch {
    if (version === store.requestVersion) {
      store.loadError = 'Не удалось загрузить данные. Проверьте соединение и попробуйте ещё раз.'
    }
  } finally {
    if (version === store.requestVersion) store.listLoading = false
  }
}
