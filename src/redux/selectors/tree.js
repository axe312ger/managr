import { createSelector } from 'reselect'

export const tree = (state) => state.files.tree
export const path = (state) => state.files.path

export const currentFolder = createSelector(tree, path, (tree, path) => {
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

export const folders = createSelector(currentFolder, (tree) => {
  if (!(tree && tree.children)) {
    return {}
  }
  const children = tree.children.filter((node) => 'children' in node)

  return {
    ...tree,
    children
  }
})

export const files = createSelector(currentFolder, (tree) => {
  if (!(tree && tree.children)) {
    return {}
  }
  const children = tree.children.filter((node) => !('children' in node))

  return {
    ...tree,
    children
  }
})
