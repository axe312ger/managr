import co from 'co'
import fs from 'co-fs-extra'
import mime from 'mime-types'
import { isHidden } from 'hidefile'
import { join, basename, resolve } from 'path'
import config from '../../config'

const ROOT_PATH = resolve(config.dir_content)
const BLACKLIST = [
  // Project related
  '.git', 'node_modules',
  // OSX
  '.DS_Store', '.AppleDouble', '.LSOverride',
  // Windows
  'Thumbs.db', 'ehthumbs.db'
]

export default co.wrap(function * (path = ROOT_PATH) {
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
  const name = basename(path)

  if (BLACKLIST.indexOf(name) !== -1) {
    return false
  }

  const hidden = yield new Promise((resolve, reject) => isHidden(path, (err, res) => {
    if (err) {
      reject()
    }
    resolve(res)
  }))
  const leaf = {
    name,
    path,
    stats: {
      ...filterStats(stats),
      mime: mime.lookup(path),
      hidden
    }
  }

  if (!stats.isDirectory()) {
    return leaf
  }

  const list = yield fs.readdir(path)
  const dirtyChildren = yield list
    .map((dirItem) => {
      const fullPath = join(path, dirItem)
      return createItem(fullPath)
    })

  const children = dirtyChildren.filter((file) => file) // Drop rejected children

  return {
    ...leaf,
    children
  }
}
