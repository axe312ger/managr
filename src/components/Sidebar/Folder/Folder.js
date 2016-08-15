import React from 'react'
import classes from './Folder.scss'

import Icon from 'components/Icon'
import NodeTitle from 'components/NodeTitle'
import { isNode } from 'services/datastructure'

export const Folder = (props) => {
  const changePath = () => {
    if (isNode(props.file)) {
      props.changePath(props.file.name)
    }
  }
  const wrapperClass = isNode(props.file) ? classes.wrapperClickable : classes.wrapper

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
