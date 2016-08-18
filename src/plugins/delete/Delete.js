const Delete = function () {
  this.fileActions = [{
    id: 'delete',
    title: 'Delete',
    getComponent: () => {
      return new Promise((resolve, reject) => {
        require.ensure([], () => {
          const component = require('./components/delete').default
          resolve(component())
        }, 'delete')
      })
    }
  }]

  return this
}

export default new Delete()
