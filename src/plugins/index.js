import PluginManagr from './PluginManagr'

import DeletePlugin from './delete'

const managr = new PluginManagr([
  DeletePlugin
])

console.dir(managr.exportFileActions())

export default managr
