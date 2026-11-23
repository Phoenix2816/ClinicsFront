import test from 'node:test'
import assert from 'node:assert/strict'
import { loadList } from '../src/services/loadList.mjs'
const state = () => ({ items: [], totalCount: 0, requestVersion: 0, query: { page: 1, pageSize: 10 } })
test('failed list loads expose an error and allow retry', async () => {
  const store = state()
  await loadList(store, async () => { throw new Error('Network failure') })
  assert.ok(store.loadError); assert.equal(store.listLoading, false)
  await loadList(store, async () => ({ data: [{ id: 1 }], totalCount: 1 }))
  assert.equal(store.loadError, ''); assert.equal(store.items[0].id, 1)
})
test('old filter results cannot overwrite newer results', async () => {
  const store = state(); let resolveOld
  const old = loadList(store, () => new Promise(resolve => { resolveOld = resolve }))
  await loadList(store, async () => ({ data: [{ id: 2 }], totalCount: 1 }))
  resolveOld({ data: [{ id: 1 }], totalCount: 1 }); await old
  assert.equal(store.items[0].id, 2)
})
