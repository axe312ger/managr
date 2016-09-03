import fs from 'fs'
import { join } from 'path'

export default function update (config) {
  return function (oldPath, newPath) {
    const oldFilePath = join(config.contentDir, oldPath)
    const newFilePath = join(config.contentDir, newPath)
    return new Promise((resolve, reject) => {
      fs.rename(oldFilePath, newFilePath, resolve)
    })
  }
}
