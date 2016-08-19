import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import makeRootReducer from './reducers'

import createSocketIoMiddleware from 'redux-socket.io'
import io from 'socket.io-client'

import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage'
import filter from 'redux-storage-decorator-filter'
import debounce from 'redux-storage-decorator-debounce'

import { SAVE_CONFIG } from 'redux/modules/Storage'

const ActionBlackList = []
const ActionWhiteList = [SAVE_CONFIG]

const storeBlacklist = ['*']
const storeWhitelist = [
  'settings',
  ['files', ['path']]
]

const storageEngine = debounce(filter(createEngine('managr'), storeWhitelist, storeBlacklist), 1500)
const storageMiddleware = storage.createMiddleware(storageEngine, ActionBlackList, ActionWhiteList)
const storageLoad = storage.createLoader(storageEngine)
const storageReducer = storage.reducer(makeRootReducer())

const socket = io(__API__)
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/')

export default (initialState = {}, history) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk, socketIoMiddleware, routerMiddleware(history), storageMiddleware]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  if (__DEBUG__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    storageReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  storageLoad(store)
    .catch(() => console.log('Failed to load previous state'))

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
