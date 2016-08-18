const PluginManagr = function (plugins = []) {
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
  // Register file based actions
  this.fileActions = plugins.reduce((actions, plugin) => {
    if (plugin.hasOwnProperty('fileActions')) {
      return [...actions, ...plugin.fileActions]
    }
    return actions
  }, [])
  .map((action) => prepareFileAction(action))

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
  return this.fileActions.map((action) => {
    return {
      title: action.title,
      id: action.id,
      selector: action.selector.toString(),
      target: action.target.toString()
    }
  })
}

export default PluginManagr
