export const isNode = function (child) {
  return child.hasOwnProperty('children')
}

export const isLeaf = function (child) {
  return !child.hasOwnProperty('children')
}
