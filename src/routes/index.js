import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import FilesRoute from './Files'
import SettingsRoute from './Settings'

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: { onEnter: (nextState, replace) => replace('/files') },
  childRoutes: [
    FilesRoute(store),
    SettingsRoute(store)
  ]
})

export default createRoutes
