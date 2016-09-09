import { saveConfig } from './Storage'

// Constants
export const SIDEBAR_SHOW_FILES = 'managr/display/sidebar/showFiles'
export const SIDEBAR_HIDE_FILES = 'managr/display/sidebar/hideFiles'
export const TABLE_SHOW_FOLDERS = 'managr/display/table/showFolders'
export const TABLE_HIDE_FOLDERS = 'managr/display/table/hideFolders'

// Action Creators
export function sidebarShowFiles () {
  return dispatch => {
    dispatch({
      type: SIDEBAR_SHOW_FILES
    })
    dispatch(saveConfig())
  }
}
export function sidebarHideFiles () {
  return dispatch => {
    dispatch({
      type: SIDEBAR_HIDE_FILES
    })
    dispatch(saveConfig())
  }
}
export function tableShowFolders () {
  return dispatch => {
    dispatch({
      type: TABLE_SHOW_FOLDERS
    })
    dispatch(saveConfig())
  }
}
export function tableHideFolders () {
  return dispatch => {
    dispatch({
      type: TABLE_HIDE_FOLDERS
    })
    dispatch(saveConfig())
  }
}

// Reducer
export const defaultState = {
  sidebar: {
    showFiles: false
  },
  table: {
    showFolders: true
  }
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case SIDEBAR_SHOW_FILES:
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          showFiles: true
        }
      }
    case SIDEBAR_HIDE_FILES:
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          showFiles: false
        }
      }
    case TABLE_SHOW_FOLDERS:
      return {
        ...state,
        table: {
          ...state.table,
          showFolders: true
        }
      }
    case TABLE_HIDE_FOLDERS:
      return {
        ...state,
        table: {
          ...state.table,
          showFolders: false
        }
      }
    default:
      return state
  }
}
