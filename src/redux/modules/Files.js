// Constants
export const TREE_LOADED = 'managr/treeLoaded'
export const GET_TREE = 'server/getTree'
export const CHANGE_PATH = 'managr/changePath'
export const POP_DIR = 'managr/popDir'

// Action Creators
export function treeLoaded (files) {
  return {
    type: TREE_LOADED,
    files
  }
}

export function getTree () {
  return {
    type: GET_TREE
  }
}

export function changePath (path) {
  return {
    type: CHANGE_PATH,
    path
  }
}

export function popDir () {
  return {
    type: POP_DIR
  }
}

// Reducer
export const defaultState = {
  files: {},
  path: '/',
  lastUpdated: -1
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case TREE_LOADED:
      return {
        ...state,
        files: action.files,
        lastUpdated: Date.now()
      }
    case CHANGE_PATH:
      return {
        ...state,
        path: action.path
      }
    default:
      return state
  }
}
