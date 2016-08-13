import React from 'react'
import classes from './Folder.scss'

import folderEmpty from './assets/folder-empty.svg'
import folderFull from './assets/folder-full.svg'

export const Folder = (props) => {
  const icon = <img src={props.file.children ? folderFull : folderEmpty} />
  const changePath = () => {
    if (props.file.children) {
      props.changePath(props.file.name)
    }
  }
  return (
    <div className={classes.wrapper}>
      <div className={classes.icon}>
        {icon}
      </div>
      <div className={classes.title} onClick={changePath}>
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
