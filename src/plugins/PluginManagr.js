// Human friendly selectors to support *, string matching and regex
const prepareSelector = (selector) => {
  // transform asterisk to match all regex
  selector = selector === '*' ? /.*/ : selector
  // transform strings to regex
  selector = !(selector instanceof RegExp) ? new RegExp(`^${selector}$`) : selector

  return selector
}

// Prepare actions with default config and validate it
const prepareFileAction = (action) => {
  // Default action values
  action = Object.assign({
    target: '*',
    selector: '*'
  }, action)

  // Throw error for missing required properties
  if (typeof action.title !== 'string') {
    throw new Error('action must have a title')
  }
  if (typeof action.id !== 'string') {
    throw new Error('action must have an id')
  }

  action.selector = prepareSelector(action.selector)
  action.target = prepareSelector(action.target)

  return action
}

const PluginManagr = function (plugins = []) {
  // Register plugins
  this.plugins = plugins.reduce((plugins, plugin) => {
    return {
      ...plugins,
      [plugin.id]: plugin
    }
  }, {})

  // Register file based actions
  this.fileActions = plugins.reduce((actions, plugin) => {
    if ('fileActions' in plugin) {
      return [...actions, ...plugin.fileActions]
    }
    return actions
  }, [])
  .map((action) => prepareFileAction(action))
  .reduce((actions, action) => {
    return {
      ...actions,
      [action.id]: action
    }
  }, {})

  return this
}

// Inject plugin configuration in state
PluginManagr.prototype.injectState = function (state) {
  const plugins = {
    fileActions: this.exportFileActions()
  }
  return {
    ...state,
    plugins
  }
}

// Export actions for Frontend
PluginManagr.prototype.exportFileActions = function () {
  return Object.keys(this.fileActions).map((actionId) => {
    const action = this.fileActions[actionId]
    return {
      title: action.title,
      id: action.id,
      selector: action.selector.toString().slice(1, -1),
      target: action.target.toString().slice(1, -1)
    }
  })
}

export default PluginManagr
