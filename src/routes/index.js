import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'
import SettingsRoute from './Settings'

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    SettingsRoute(store)
  ]
})

export default createRoutes
