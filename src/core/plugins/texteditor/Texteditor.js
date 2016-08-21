import React from 'react'

export default function TextEditor () {}

TextEditor.prototype.fileActions = [{
  id: 'textEditor',
  title: 'TextEditor',
  selector: /^text\//,
  getComponent: (props) => {
    return new Promise((resolve, reject) => {
      require.ensure([], () => {
        const component = require('./components/textEditor').default
        resolve(React.createElement(component, props))
      }, 'textEditor')
    })
  }
}]
