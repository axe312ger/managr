import React from 'react'
import classes from './Sidebar.scss'

import Folder from './Folder'

export const Sidebar = (props) => {
  const folders = props.files.map((file) => (
    <Folder key={file.filename} file={file} />
  ))

  return (
    <div className={classes.wrapper}>
      {folders}
    </div>
  )
}

Sidebar.propTypes = {
  files: React.PropTypes.array.isRequired
}

export default Sidebar
