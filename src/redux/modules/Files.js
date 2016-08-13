import { loadFiles } from 'api'

// Constants

export const FILES_LOAD = 'managr/files/load'
export const FILES_LOADED = 'managr/files/loaded'

// Action Creators

export function filesLoaded (files) {
  return {
    type: FILES_LOADED,
    files
  }
}

export function filesLoad (path = '/') {
  return function (dispatch) {
    return loadFiles()
    .then(files => dispatch(filesLoaded(files)))
  }
}

// Reducer
export const defaultState = {
  files: [],
  lastUpdated: -1
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case FILES_LOADED:
      return {
        ...state,
        files: action.files,
        lastUpdated: Date.now()
      }
    default:
      return state
  }
}
