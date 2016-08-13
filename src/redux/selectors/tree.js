import { createSelector } from 'reselect'

export const tree = (state) => state.files.tree
export const path = (state) => state.files.path

export const folder = createSelector(tree, path, (tree, path) => {
  if (!(tree && tree.children)) {
    return {}
  }

  return path.reduce((node, folder) => {
    if (!folder) {
      return node
    }

    const { children } = node
    return children.find((child) => child.name === folder)
  }, tree)
})
