// Constants
export const TREE_LOADED = 'managr/treeLoaded'
export const GET_TREE = 'server/getTree'

// Action Creators
export function treeLoaded (files) {
  return {
    type: TREE_LOADED,
    files
  }
}

export function getTree (path = '/') {
  return {
    type: GET_TREE,
    path
  }
}

// Reducer
export const defaultState = {
  files: {},
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
    default:
      return state
  }
}
