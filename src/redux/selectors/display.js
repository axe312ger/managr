import { createSelector } from 'reselect'

import { getCurrentNode } from './tree'

import { sortChildrenByType, sortChildrenByName, filterFolders, filterFiles, filterHidden } from './children'
import { hiddenFilesShown } from './settings'

export const sidebarFilesShown = (state) => state.display.sidebar.showFiles
export const tableFoldersShown = (state) => state.display.table.showFolders

export const prepareNodeForDisplay = createSelector(
  [getCurrentNode, hiddenFilesShown],
  (currentNode, showHiddenFiles) => {
    let node = currentNode

    if (!currentNode) {
      return false
    }

    if (!showHiddenFiles) {
      node = filterHidden(node)
    }

    return node
  }
)

export const sidebarNode = createSelector(
    [prepareNodeForDisplay, sidebarFilesShown],
    (currentNode, showFiles) => {
      let node = currentNode

      if (!currentNode) {
        return false
      }

      if (!showFiles) {
        node = filterFiles(node)
      }

      return sortChildrenByType(node)
    }
)

export const tableNode = createSelector(
    [prepareNodeForDisplay, tableFoldersShown],
    (currentNode, showFolders) => {
      let node = currentNode

      if (!currentNode) {
        return false
      }

      if (!showFolders) {
        node = filterFolders(node)
      }

      return sortChildrenByName(node)
    }
)
