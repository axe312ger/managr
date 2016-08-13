import React from 'react'
import classes from './Folder.scss'

import folderEmpty from './assets/folder-empty.svg'
import folderFull from './assets/folder-full.svg'
import document from './assets/document.svg'

export const Folder = (props) => {
  const selectFolderIcon = (children) => {
    return children.length ? folderFull : folderEmpty
  }
  const icon = 'children' in props.file ? selectFolderIcon(props.file.children) : document
  const changePath = () => {
    if ('children' in props.file) {
      props.changePath(props.file.name)
    }
  }
  const wrapperClass = 'children' in props.file ? classes.wrapperClickable : classes.wrapper

  return (
    <div className={wrapperClass} onClick={changePath}>
      <div className={classes.icon}>
        <img src={icon} />
      </div>
      <div className={classes.title}>
        {props.file.name}
      </div>
    </div>
  )
}

Folder.propTypes = {
  file: React.PropTypes.object.isRequired,
  changePath: React.PropTypes.func.isRequired
}

export default Folder
