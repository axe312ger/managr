import { join } from 'path'
import rimraf from 'rimraf'

export default function del (config) {
  return function (file) {
    const filePath = join(config.contentDir, file.path)

    rimraf(filePath, { glob: false }, (err) => {
      if (err) {
        throw err
      }
      return true
    })
  }
}
