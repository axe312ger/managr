import path from 'path'

import DeletePlugin from './plugins/delete'
import DownloadPlugin from './plugins/download'
import TextEditorPlugin from './plugins/textEditor'

export default function (io) {
  return {
    io,
    contentDir: path.resolve(__dirname, '..', '..', 'example-content'),
    plugins: [
      new DownloadPlugin(),
      new TextEditorPlugin(),
      new DeletePlugin()
    ]
  }
}
