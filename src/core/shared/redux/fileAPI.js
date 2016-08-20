// Constants
export const TREE_LOADED = 'managr/treeLoaded'
export const GET_TREE = 'server/getTree'
export const FILE_ERRORED = 'managr/fileErrored'
export const FILE_CREATE = 'server/fileCreate'
export const FILE_CREATED = 'managr/fileCreated'
export const FILE_READ = 'server/fileRead'
export const FILE_READED = 'managr/fileReaded'
export const FILE_DELETE = 'server/fileDelete'
export const FILE_DELETED = 'managr/fileDeleted'

// Action Creators
export function treeLoaded (tree, path) {
  return {
    type: TREE_LOADED,
    tree,
    path
  }
}

export function getTree () {
  return {
    type: GET_TREE
  }
}

export function fileErrored (msg, file) {
  return {
    type: FILE_ERRORED,
    msg,
    file
  }
}

export function fileCreate (file) {
  return {
    type: FILE_CREATE,
    file
  }
}

export function fileCreated (file) {
  return {
    type: FILE_CREATED,
    file
  }
}

export function fileRead (file) {
  return {
    type: FILE_READ,
    file
  }
}

export function fileReaded (file) {
  return {
    type: FILE_READED,
    file
  }
}

export function fileDelete (file) {
  return {
    type: FILE_DELETE,
    file
  }
}

export function fileDeleted (file) {
  return {
    type: FILE_DELETED,
    file
  }
}
