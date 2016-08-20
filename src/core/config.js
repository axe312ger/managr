import path from 'path'

import DeletePlugin from './plugins/delete'
// import MarkdownPlugin from './plugins/markdown'

export default function (io) {
  return {
    io,
    contentDir: path.resolve(__dirname, '..', '..', 'example-content'),
    plugins: [
      new DeletePlugin()// ,
      // new MarkdownPlugin()
    ]
  }
}
