import React from 'react'

const Delete = function () {
  this.fileActions = [{
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

  return this
}

export default new Delete()
