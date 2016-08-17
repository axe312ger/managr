export default (store) => ({
  path: 'settings',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const SettingsView = require('./containers/SettingsViewContainer').default

      cb(null, SettingsView)
    }, 'settingsView')
  }
})
