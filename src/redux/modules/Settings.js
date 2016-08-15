// Constants
export const SHOW_HIDDEN_FILES = 'managr/settings/showHiddenFiles'
export const HIDE_HIDDEN_FILES = 'managr/settings/hideHiddenFiles'

// Action Creators
export function showHiddenFiles () { return { type: SHOW_HIDDEN_FILES } }
export function hideHiddenFiles () { return { type: HIDE_HIDDEN_FILES } }

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
