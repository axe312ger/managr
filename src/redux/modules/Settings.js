import { saveConfig } from './Storage'

// Constants
export const SHOW_HIDDEN_FILES = 'managr/settings/showHiddenFiles'
export const HIDE_HIDDEN_FILES = 'managr/settings/hideHiddenFiles'

// Action Creators
export function showHiddenFiles () {
  return dispatch => {
    dispatch({
      type: SHOW_HIDDEN_FILES
    })
    dispatch(saveConfig())
  }
}
export function hideHiddenFiles () {
  return dispatch => {
    dispatch({
      type: HIDE_HIDDEN_FILES
    })
    dispatch(saveConfig())
  }
}

// Reducer
export const defaultState = {
  hiddenFilesShown: false
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case SHOW_HIDDEN_FILES:
      return {
        ...state,
        hiddenFilesShown: true
      }
    case HIDE_HIDDEN_FILES:
      return {
        ...state,
        hiddenFilesShown: false
      }
    default:
      return state
  }
}
