import React from 'react'
import classes from './Folder.scss'

import folderEmpty from './assets/folder-empty.svg'
import folderFull from './assets/folder-full.svg'

export const Folder = (props) => {
  const icon = <img src={props.file.children ? folderFull : folderEmpty} />
  return (
    <div className={classes.wrapper}>
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
  file: React.PropTypes.object.isRequired
}

export default Folder
