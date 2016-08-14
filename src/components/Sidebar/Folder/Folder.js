import React from 'react'
import classes from './Folder.scss'

import Icon from 'components/Icon'
import NodeTitle from 'components/NodeTitle'
import { isFolder } from 'services/datastructure'

export const Folder = (props) => {
  const changePath = () => {
    if (isFolder(props.file)) {
      props.changePath(props.file.name)
    }
  }
  const wrapperClass = isFolder(props.file) ? classes.wrapperClickable : classes.wrapper

  return (
    <div className={wrapperClass} onClick={changePath}>
      <div className={classes.icon}>
        <Icon file={props.file} />
      </div>
      <div className={classes.title}>
        <NodeTitle file={props.file} />
      </div>
    </div>
  )
}

Folder.propTypes = {
  file: React.PropTypes.object.isRequired,
  changePath: React.PropTypes.func.isRequired
}

export default Folder
