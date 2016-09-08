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
    dispatch(saveConfig())
  }
}

export function pushDir (dir) {
  return dispatch => {
    dispatch({
      type: PUSH_DIR,
      dir
    })
    dispatch(saveConfig())
  }
}

export function popDir () {
  return dispatch => {
    dispatch({
      type: POP_DIR
    })
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
  switch (action.type) {
    case TREE_LOADED:
      return {
        ...state,
        tree: action.tree,
        lastUpdated: Date.now()
      }
    case CHANGE_PATH:
      let { path } = action

      if (typeof path === 'string') {
        path = path.split('/')
      }

      return {
        ...state,
        path
      }
    case PUSH_DIR:
      const { dir } = action
      const nextPath = [...state.path, dir]
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
