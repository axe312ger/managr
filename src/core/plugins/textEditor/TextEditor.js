import React from 'react'

import textEditor from './components/textEditor'

export default function TextEditor () {}

TextEditor.prototype.fileActions = [{
  id: 'textEditor',
  title: 'TextEditor',
  selector: /^text\//,
  component: (props) => React.createElement(textEditor, props)
}]
