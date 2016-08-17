export default (store) => ({
  path: 'files',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const FilesView = require('./containers/FilesViewContainer').default

      cb(null, FilesView)
    }, 'filesView')
  }
})
