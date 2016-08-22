import React from 'react'

import textEditor from './components/textEditor'

export default function TextEditor () {}

TextEditor.prototype.fileActions = [{
  id: 'textEditor',
  title: 'TextEditor',
  selector: /^text\//,
  component: (props) => React.createElement(textEditor, props)
  // Async is not working, seems not to work component and forceUpdate() fails
  // @todo find out why
  // getComponent: (props) => {
  //   return new Promise((resolve, reject) => {
  //     require.ensure([], () => {
  //       const component = require('./components/textEditor').default
  //       resolve(React.createElement(component, props))
  //     }, 'textEditor')
  //   })
  // }
}]
