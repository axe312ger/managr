import React from 'react'
import classes from './Item.scss'

import Icon from 'components/Icon'
import NodeTitle from 'components/NodeTitle'
import NodeTimestamp from 'components/NodeTimestamp'
import NodeSize from 'components/NodeSize'
import { isNode } from 'services/datastructure'

export const Item = (props, context) => {
  const { file, showSize, showTime, showActions, onClick } = props
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
  if (showTime) {
    created = <div className={classes.created}><NodeTimestamp timestamp={file.stats.created} /></div>
    modified = <div className={classes.modified}><NodeTimestamp timestamp={file.stats.modified} /></div>
  }
  if (showActions) {
    actions = context.managr.pluginAPI.renderFileActions(file)
  }
  return (
    <div className={wrapperClass} onClick={onClickCb}>
      <div className={classes.icon}>
        <Icon file={props.file} />
      </div>
      <div className={classes.title}>
        <NodeTitle file={props.file} />
      </div>
      { size }
      { modified }
      { created }
      { actions }
    </div>
  )
}

Item.propTypes = {
  file: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func,
  showSize: React.PropTypes.bool,
  showTime: React.PropTypes.bool,
  showActions: React.PropTypes.bool
}

Item.contextTypes = {
  managr: React.PropTypes.object.isRequired
}

export default Item
