import { LOCATION_CHANGE, push } from 'react-router-redux'

import { encodePath, decodePath } from 'utils/navigation'

import { saveConfig } from './Storage'

import { TREE_LOADED } from 'core/shared/redux/fileAPI'

// Constants
export const CHANGE_PATH = 'managr/changePath'
export const PUSH_DIR = 'managr/pushDir'
export const POP_DIR = 'managr/popDir'

// Action Creators
export function changePath (path) {
  return dispatch => {
    dispatch({
      type: CHANGE_PATH,
      path
    })
    dispatch(push(encodePath(path)))
    dispatch(saveConfig())
  }
}

export function pushDir (dir) {
  return (dispatch, getState) => {
    dispatch({
      type: PUSH_DIR,
      dir
    })
    const { files } = getState()
    dispatch(push(encodePath(files.path)))
    dispatch(saveConfig())
  }
}

export function popDir () {
  return (dispatch, getState) => {
    dispatch({
      type: POP_DIR
    })
    const { files } = getState()
    dispatch(push(encodePath(files.path)))
    dispatch(saveConfig())
  }
}

// Reducer
export const defaultState = {
  tree: {},
  path: [],
  lastUpdated: -1
}

export default function (state = defaultState, action) {
  let path
  switch (action.type) {
    case TREE_LOADED:
      return {
        ...state,
        tree: action.tree,
        lastUpdated: Date.now()
      }
    case LOCATION_CHANGE:
      path = state.path
      const { pathname } = action.payload
      if (pathname.indexOf('/files') !== -1 && pathname !== encodePath(path)) {
        path = decodePath(pathname)
      }

      return {
        ...state,
        path
      }
    case CHANGE_PATH:
      path = action.path

      if (typeof path === 'string') {
        path = path.split('/')
      }

      return {
        ...state,
        path
      }
    case PUSH_DIR:
      const { dir } = action
      const nextPath = [...state.path, dir.name]
      return {
        ...state,
        path: nextPath
      }
    case POP_DIR:
      return {
        ...state,
        path: state.path.slice(0, state.path.length - 1)
      }
    default:
      return state
  }
}
