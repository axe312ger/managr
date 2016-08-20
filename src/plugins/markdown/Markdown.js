import React from 'react'

const Markdown = function () {
  this.fileActions = [{
    id: 'markdown',
    title: 'Markdown',
    target: /\.md$/,
    getComponent: () => {
      return new Promise((resolve, reject) => {
        require.ensure([], () => {
          const component = require('./containers/markdownContainer').default
          resolve(React.createElement(component))
        }, 'markdown')
      })
    }
  }]

  return this
}

export default new Markdown()
