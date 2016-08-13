import React from 'react'
import classes from './Folder.scss'

import folderEmpty from './assets/folder-empty.svg'
// import folderFull from './assets/folder-full.svg'

export const Folder = (props) => (
  <div className={classes.wrapper}>
    <div className={classes.icon}>
      <img src={folderEmpty} />
    </div>
    <div className={classes.title}>
      {props.file.filename}
    </div>
  </div>
)

Folder.propTypes = {
  file: React.PropTypes.object.isRequired
}

export default Folder
