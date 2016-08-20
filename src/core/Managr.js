import PluginAPI from './PluginAPI'

export default function Managr (config) {
  const pluginAPI = new PluginAPI(config.plugins)
  return {
    pluginAPI
  }
}
