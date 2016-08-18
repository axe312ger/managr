import PluginManagr from './PluginManagr'

import DeletePlugin from './delete'
import MarkdownPlugin from './markdown'

const managr = new PluginManagr([
  DeletePlugin,
  MarkdownPlugin
])

console.dir(managr.exportFileActions())

export default managr
