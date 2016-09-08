import co from 'co'
import fs from 'co-fs-extra'
import mime from 'mime-types'
import { isHidden } from 'hidefile'
import { join, basename, relative, resolve } from 'path'

const BLACKLIST = [
  // Project related
  '.git', 'node_modules',
  // OSX
  '.DS_Store', '.AppleDouble', '.LSOverride',
  // Windows
  'Thumbs.db', 'ehthumbs.db'
]

function filterStats (stats) {
  const { size, birthtime, mtime } = stats
  return {
    created: birthtime,
    modified: mtime,
    size
  }
}

function *createItem (path, config) {
  const fullPath = resolve(config.contentDir, path)
  const stats = yield fs.stat(fullPath)
  const name = basename(path)

  if (BLACKLIST.indexOf(name) !== -1) {
    return false
  }

  const hidden = yield new Promise(
    (resolve, reject) => isHidden(fullPath, (err, res) => {
      if (err) {
        reject()
      }
      resolve(res)
    })
  )

  const leaf = {
    name,
    path: relative(config.contentDir, path),
    stats: {
      ...filterStats(stats),
      mime: mime.lookup(fullPath),
      hidden
    }
  }

  if (!stats.isDirectory()) {
    return leaf
  }

  const list = yield fs.readdir(fullPath)

  const dirtyChildren = yield list
    .map((dirItem) => {
      const newPath = join(path, dirItem)
      return createItem(newPath, config)
    })

  const children = dirtyChildren.filter((file) => file) // Drop rejected children

  return {
    ...leaf,
    children
  }
}

export default function Tree (config) {
  return co.wrap(function * (path = config.contentDir) {
    return yield createItem(path, config)
  })
}
