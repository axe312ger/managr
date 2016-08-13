import React from 'react'

import folderEmpty from './assets/folder-empty.svg'
import folderFull from './assets/folder-full.svg'
import document from './assets/document.svg'

const Icon = (props) => {
  const selectFolderIcon = (children) => {
    return children.length ? folderFull : folderEmpty
  }
  const iconFile = 'children' in props.file ? selectFolderIcon(props.file.children) : document
  return (
    <img src={iconFile} alt={props.file.name} />
  )
}

Icon.propTypes = {
  file: React.PropTypes
}

export default Icon
