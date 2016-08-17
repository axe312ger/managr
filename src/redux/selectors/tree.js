import { createSelector } from 'reselect'

export const tree = (state) => state.files.tree
export const path = (state) => state.files.path
export const currentPath = (state) => [
  '/files',
  ...path(state)
].join('/')

export const getCurrentNode = createSelector(tree, path, (tree, path) => {
  if (!(tree && tree.children)) {
    return false
  }

  return path.reduce((node, folder) => {
    if (!folder) {
      return node
    }

    const { children } = node
    return children.find((child) => child.name === folder)
  }, tree)
})
