import { createSelector } from 'reselect'

export const tree = (state) => state.files.tree
export const path = (state) => state.files.path

export const folder = createSelector(tree, path, (tree, path) => {
  if (!(tree && tree.children)) {
    return {}
  }

  const [, ...folders] = path

  return folders.reduce((node, folder) => {
    if (!folder) {
      return node
    }

    const { children } = node
    return children.find((child) => child.name.indexOf(folder) !== -1)
  }, tree)
})
