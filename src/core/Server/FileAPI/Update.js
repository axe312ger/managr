import fs from 'fs'
import { join } from 'path'

export default function update (config) {
  return function (file) {
    const filePath = join(config.contentDir, file.path)
    return fs.createWriteStream(filePath, {
      flags: 'w'
    })
  }
}
