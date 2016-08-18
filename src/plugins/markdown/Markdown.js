const Markdown = function () {
  this.fileActions = [{
    id: 'markdown',
    title: 'Markdown',
    target: /\.md$/,
    getComponent: () => {
      return new Promise((resolve, reject) => {
        require.ensure([], () => {
          const component = require('./components/markdown').default
          resolve(component())
        }, 'markdown')
      })
    }
  }]

  return this
}

export default new Markdown()
