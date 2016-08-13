import co from 'co'
import fs from 'co-fs-extra'
import mime from 'mime-types'
import { join } from 'path'

const ROOT_PATH = 'content'

module.exports = co.wrap(function * (path = ROOT_PATH) {
  return yield createItem(path)
})

function filterStats (stats) {
  const { size, birthtime, mtime } = stats
  return {
    created: birthtime,
    modified: mtime,
    size
  }
}

function * createItem (path) {
  const stats = yield fs.stat(path)

  if (!stats.isDirectory()) {
    return {
      name: path,
      stats: Object.assign({}, filterStats(stats), { mime: mime.lookup(path) })
    }
  }

  const list = yield fs.readdir(path)
  const children = yield list.map((dirItem) => {
    const fullPath = join(path, dirItem)
    return createItem(fullPath)
  })

  return {
    name: path,
    stats: filterStats(stats),
    children
  }
}
