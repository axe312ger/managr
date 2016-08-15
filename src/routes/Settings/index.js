export default (store) => ({
  path: 'settings',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Settings = require('./containers/SettingsContainer').default

      cb(null, Settings)
    }, 'settings')
  }
})
