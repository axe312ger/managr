// Constants
export const SIDEBAR_SHOW_FILES = 'managr/display/sidebar/showFiles'
export const SIDEBAR_HIDE_FILES = 'managr/display/sidebar/hideFiles'
export const TABLE_SHOW_FOLDERS = 'managr/display/table/showFolders'
export const TABLE_HIDE_FOLDERS = 'managr/display/table/hideFolders'

// Action Creators
export function sidebarShowFiles () { return { type: SIDEBAR_SHOW_FILES } }
export function sidebarHideFiles () { return { type: SIDEBAR_HIDE_FILES } }
export function tableShowFolders () { return { type: TABLE_SHOW_FOLDERS } }
export function tableHideFolders () { return { type: TABLE_HIDE_FOLDERS } }

// Reducer
export const defaultState = {
  sidebar: {
    showFiles: false
  },
  table: {
    showFolders: false
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
