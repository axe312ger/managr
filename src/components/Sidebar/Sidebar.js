import React from 'react'
import classes from './Sidebar.scss'

import Folder from './Folder'

export const Sidebar = (props) => {
  if (!props.node.children) {
    return <p>nope</p>
  }

  let backButton = null
  if (props.path.length) {
    const fakeFile = {
      name: '..',
      children: []
    }
    backButton = <Folder key={fakeFile.name} file={fakeFile} changePath={props.popDir} />
  }

  const folders = props.node.children.map((file) => (
    <Folder key={file.name} file={file} changePath={props.pushDir} />
  ))

  return (
    <div className={classes.wrapper}>
      {backButton}
      {folders}
    </div>
  )
}

Sidebar.propTypes = {
  node: React.PropTypes.object.isRequired,
  changePath: React.PropTypes.func.isRequired,
  pushDir: React.PropTypes.func.isRequired,
  popDir: React.PropTypes.func.isRequired
}

export default Sidebar
