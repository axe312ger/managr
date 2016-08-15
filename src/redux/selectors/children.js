import { isNode, isLeaf } from 'services/datastructure'

const sortByType = (a, b) => {
  if (isNode(a) === isNode(b)) {
    return sortByName(a, b)
  }
  return isNode(a) ? -1 : 1
}

const sortByName = (a, b) => {
  if (a.name === b.name) {
    return 0
  }
  return a.name < b.name ? -1 : 1
}

export const sortChildrenByType = (node) => {
  const children = node.children.sort(sortByType)

  return {
    ...node,
    children
  }
}

export const sortChildrenByName = (node) => {
  const children = node.children.sort(sortByType)

  return {
    ...node,
    children
  }
}

export const filterFolders = (node) => {
  const children = node.children.filter((node) => isLeaf(node))

  return {
    ...node,
    children
  }
}

export const filterFiles = (node) => {
  const children = node.children.filter((node) => isNode(node))

  return {
    ...node,
    children
  }
}
