import path from 'path'

import DeletePlugin from './plugins/delete'
import DownloadPlugin from './plugins/download'
import MarkdownPlugin from './plugins/markdown'

export default function (io) {
  return {
    io,
    contentDir: path.resolve(__dirname, '..', '..', 'example-content'),
    plugins: [
      new DownloadPlugin(),
      new MarkdownPlugin(),
      new DeletePlugin()
    ]
  }
}
