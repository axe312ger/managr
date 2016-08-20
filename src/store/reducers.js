import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import files from 'redux/modules/Files'
import display from 'redux/modules/Display'
import settings from 'redux/modules/Settings'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    files,
    display,
    settings,
    router,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
