import React from 'react'
import classes from './Sidebar.scss'

import Folder from './Folder'

export const Sidebar = (props) => {
  if (!props.files.children) {
    return <p>nope</p>
  }

  const folders = props.files.children.map((file) => (
    <Folder key={file.name} file={file} changePath={props.changePath} />
  ))

  return (
    <div className={classes.wrapper}>
      {folders}
    </div>
  )
}

Sidebar.propTypes = {
  files: React.PropTypes.object.isRequired,
  changePath: React.PropTypes.func.isRequired
}

export default Sidebar
