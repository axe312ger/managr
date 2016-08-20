import Managr from './Managr'

import DeletePlugin from './plugins/delete'
import MarkdownPlugin from './plugins/markdown'

const managr = new Managr({
  contentDir: '',
  plugins: [
    new DeletePlugin(),
    new MarkdownPlugin()
  ]
})

export default managr
