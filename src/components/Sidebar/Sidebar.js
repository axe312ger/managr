import React from 'react'

import { isNode } from 'utils/datastructure'

import classes from './Sidebar.scss'

import Item from 'components/Item'

export const Sidebar = React.createClass({
  render () {
    const filesToggleTitle = this.props.filesShown ? 'hide files' : 'show files'
    const filesToggleCb = this.props.filesShown ? this.props.hideFiles : this.props.showFiles
    const FilesToggle = <button onClick={filesToggleCb}>{filesToggleTitle}</button>

    let backButton = null
    let items = []

    if (this.props.path.length) {
      const fakeFile = {
        name: '..',
        children: []
      }
      backButton = <Item
        key={fakeFile.name}
        file={fakeFile}
        onClick={this.props.popDir} />
    }

    if (isNode(this.props.node)) {
      items = this.props.node.children.map((file) => (
        <Item
          key={file.name}
          file={file}
          onClick={this.props.pushDir} />
      ))
    }

    return (
      <div className={classes.wrapper}>
        <header>
          {FilesToggle}
        </header>
        <main>
          {backButton}
          {items}
        </main>
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
