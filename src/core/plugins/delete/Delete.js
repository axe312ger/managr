import React from 'react'

import del from './components/delete'

export default function Delete () {}

Delete.prototype.fileActions = [{
  id: 'delete',
  title: 'Delete',
  component: (props) => React.createElement(del, props)
}]
