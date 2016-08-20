import React from 'react'

export default function Delete () {}

Delete.prototype.fileActions = [{
  id: 'delete',
  title: 'Delete',
  getComponent: (props) => {
    return new Promise((resolve, reject) => {
      require.ensure([], () => {
        const component = require('./components/delete').default
        resolve(React.createElement(component, props))
      }, 'delete')
    })
  }
}]
