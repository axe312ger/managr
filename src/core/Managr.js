import PluginAPI from './PluginAPI'
import FileAPI from './FileAPI'

export default function Managr (config) {
  const pluginAPI = new PluginAPI(config)
  const fileAPI = new FileAPI(config)
  return {
    pluginAPI,
    fileAPI
  }
}
