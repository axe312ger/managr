import React from 'react'

import { isNode } from 'services/datastructure'

import classes from './Sidebar.scss'

import Folder from './Folder'

export const Sidebar = React.createClass({
  render () {
    const filesToggleTitle = this.props.filesShown ? 'hide files' : 'show files'
    const filesToggleCb = this.props.filesShown ? this.props.hideFiles : this.props.showFiles
    const FilesToggle = <button onClick={filesToggleCb}>{filesToggleTitle}</button>

    let backButton = null
    if (this.props.path.length) {
      const fakeFile = {
        name: '..',
        children: []
      }
      backButton = <Folder key={fakeFile.name} file={fakeFile} changePath={this.props.popDir} />
    }

    const folders = isNode(this.props.node) ? this.props.node.children.map((file) => (
      <Folder key={file.name} file={file} changePath={this.props.pushDir} />
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
  },
  componentWillMount: function () {
    this.props.getTree()
  },
  propTypes: {
    node: React.PropTypes.object.isRequired,
    path: React.PropTypes.array.isRequired,
    getTree: React.PropTypes.func.isRequired,
    pushDir: React.PropTypes.func.isRequired,
    popDir: React.PropTypes.func.isRequired,
    filesShown: React.PropTypes.bool.isRequired,
    showFiles: React.PropTypes.func.isRequired,
    hideFiles: React.PropTypes.func.isRequired
  }
})

export default Sidebar
