import React from 'react'

export default function Markdown () {}

Markdown.prototype.fileActions = [{
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
