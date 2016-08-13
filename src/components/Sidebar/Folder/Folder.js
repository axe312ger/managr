import React from 'react'
import classes from './Folder.scss'

import folderEmpty from './assets/folder-empty.svg'
import folderFull from './assets/folder-full.svg'

export const Folder = (props) => {
  const icon = <img src={'children' in props.file ? folderFull : folderEmpty} />
  const changePath = () => {
    if ('children' in props.file) {
      props.changePath(props.file.name)
    }
  }
  const wrapperClass = 'children' in props.file ? classes.wrapperClickable : classes.wrapper

  return (
    <div className={wrapperClass} onClick={changePath}>
      <div className={classes.icon}>
        {icon}
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
