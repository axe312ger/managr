import React from 'react'
import Async from 'babel!react-promise'

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
    throw new Error('file action must have a title')
  }
  if (typeof action.id !== 'string') {
    throw new Error('file action must have an id')
  }

  if (!('component' in action || 'getComponent' in action)) {
    throw new Error('file action must contain a component')
  }

  action.selector = prepareSelector(action.selector)
  action.target = prepareSelector(action.target)

  return action
}

export default function PluginAPI (config) {
  const plugins = config.plugins

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

PluginAPI.prototype.getMatchingFileActions = function (file) {
  const name = file.name
  const mime = file.stats.mime

  return Object.keys(this.fileActions)
    .map((fileActionId) => {
      return this.fileActions[fileActionId]
    })
    .filter((fileAction) => {
      const target = new RegExp(fileAction.target)
      const selector = new RegExp(fileAction.selector)
      return target.test(name) && (mime ? selector.test(mime) : true)
    })
}

PluginAPI.prototype.renderFileActions = function (file) {
  return this.getMatchingFileActions(file)
    .map((fileAction) => {
      if ('getComponent' in fileAction) {
        const promise = fileAction.getComponent({ file })
        const render = (actionComponent) => actionComponent
        return <Async key={fileAction.id} promise={promise} then={render} />
      }

      return fileAction.component({
        file,
        key: fileAction.id
      })
    })
}
