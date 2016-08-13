// Constants
export const TREE_LOADED = 'managr/treeLoaded'
export const GET_TREE = 'server/getTree'
export const CHANGE_PATH = 'managr/changePath'
export const PUSH_DIR = 'managr/pushDir'
export const POP_DIR = 'managr/popDir'

// Action Creators
export function treeLoaded (tree) {
  return {
    type: TREE_LOADED,
    tree
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

export function pushDir (dir) {
  return {
    type: PUSH_DIR,
    dir
  }
}

export function popDir () {
  return {
    type: POP_DIR
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
