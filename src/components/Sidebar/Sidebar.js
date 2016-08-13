import React from 'react'
import classes from './Sidebar.scss'

import Folder from './Folder'

export const Sidebar = (props) => {
  if (!props.files.children) {
    return <p>nope</p>
  }

  let backButton = null
  // @todo: remove true when after merge
  if (true || (props.files.name.match(/\//g) || []).length) {
    const fakeFile = {
      name: '..',
      children: []
    }
    backButton = <Folder key={fakeFile.name} file={fakeFile} changePath={props.popDir} />
  }

  const folders = props.files.children.map((file) => (
    <Folder key={file.name} file={file} changePath={props.changePath} />
  ))

  return (
    <div className={classes.wrapper}>
      {backButton}
      {folders}
    </div>
  )
}

Sidebar.propTypes = {
  files: React.PropTypes.object.isRequired,
  changePath: React.PropTypes.func.isRequired,
  popDir: React.PropTypes.func.isRequired
}

export default Sidebar
