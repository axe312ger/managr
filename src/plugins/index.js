import PluginManagr from './PluginManagr'

import DeletePlugin from './delete'
import MarkdownPlugin from './markdown'

const managr = new PluginManagr([
  new DeletePlugin(),
  new MarkdownPlugin()
])

export default managr
