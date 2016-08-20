import fs from 'fs'
import { join } from 'path'

export default function create (config) {
  return function (file) {
    const filePath = join(config.contentDir, file.path)

    fs.writeFile(filePath, file.data, (err) => {
      if (err) {
        throw err
      }
      return true
    })
  }
}
