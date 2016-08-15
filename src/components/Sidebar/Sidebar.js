import React from 'react'

import { isNode } from 'services/datastructure'

import classes from './Sidebar.scss'

import Folder from './Folder'

export const Sidebar = (props) => {
  const filesToggleTitle = props.filesShown ? 'hide files' : 'show files'
  const filesToggleCb = props.filesShown ? props.hideFiles : props.showFiles
  const FilesToggle = <button onClick={filesToggleCb}>{filesToggleTitle}</button>

  let backButton = null
  if (props.path.length) {
    const fakeFile = {
      name: '..',
      children: []
    }
    backButton = <Folder key={fakeFile.name} file={fakeFile} changePath={props.popDir} />
  }

  const folders = isNode(props.node) ? props.node.children.map((file) => (
    <Folder key={file.name} file={file} changePath={props.pushDir} />
  )) : []

  return (
    <div className={classes.wrapper}>
      <main>
        {backButton}
        {folders}
      </main>
      <footer>
        {FilesToggle}
      </footer>
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
