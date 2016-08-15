import { createSelector } from 'reselect'

import { getCurrentNode } from './tree'

import { sortChildrenByType, sortChildrenByName, filterFolders, filterFiles } from './children'

export const sidebarFilesShown = (state) => state.display.sidebar.showFiles
export const tableFoldersShown = (state) => state.display.table.showFolders

export const sidebarNode = createSelector(
    [getCurrentNode, sidebarFilesShown],
    (currentNode, showFiles) => {
      let node = currentNode

      if (!currentNode) {
        return {}
      }

      if (!showFiles) {
        node = filterFiles(node)
      }

      return sortChildrenByType(node)
    }
)

export const tableNode = createSelector(
    [getCurrentNode, tableFoldersShown],
    (currentNode, showFolders) => {
      let node = currentNode

      if (!currentNode) {
        return {}
      }

      if (!showFolders) {
        node = filterFolders(node)
      }

      return sortChildrenByName(node)
    }
)
