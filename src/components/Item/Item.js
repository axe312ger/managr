import React from 'react'
import classes from './Item.scss'

import Icon from 'components/Icon'
import NodeTitle from 'components/NodeTitle'
import NodeTimestamp from 'components/NodeTimestamp'
import NodeSize from 'components/NodeSize'
import { isNode } from 'utils/datastructure'

export const Item = (props, context) => {
  const { file, showSize, showTimes, showActions, onClick } = props
  const wrapperClass = isNode(file) ? classes.wrapperClickable : classes.wrapper
  let size = null
  let created = null
  let modified = null
  let actions = null
  let onClickCb = null

  if (onClick) {
    onClickCb = () => {
      onClick(file)
    }
  }

  if (showSize) {
    size = (isNode(file) ? null : <NodeSize size={file.stats.size} />)
  }
  if (showTimes) {
    created = <NodeTimestamp timestamp={file.stats.created} />
    modified = <NodeTimestamp timestamp={file.stats.modified} />
  }

  if (showActions) {
    actions = context.managr.pluginAPI.renderFileActions(file)
  }
  return (
    <div className={wrapperClass} onClick={onClickCb}>
      <div className={classes.icon}>
        <Icon file={file} />
      </div>
      <div className={classes.title}>
        <NodeTitle file={file} />
      </div>
      <div className={classes.size}>{size}</div>
      <div className={classes.created}>{modified}</div>
      <div className={classes.modified}>{created}</div>
      <div className={classes.actions}>{actions}</div>
    </div>
  )
}

Item.propTypes = {
  file: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func,
  showSize: React.PropTypes.bool,
  showTimes: React.PropTypes.bool,
  showActions: React.PropTypes.bool
}

Item.contextTypes = {
  managr: React.PropTypes.object.isRequired
}

export default Item
