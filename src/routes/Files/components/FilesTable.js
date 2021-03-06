import React from 'react'
import Item from 'components/Item'

import classes from './FilesTable.scss'
import classesItem from 'components/Item/Item.scss'

export const FilesTable = React.createClass({
  render () {
    let backButton = null

    if (!this.props.node.children) {
      return <div>Sorry, no files loaded yet</div>
    }

    if (this.props.tableFoldersShown && this.props.path.length) {
      const fakeFile = {
        name: '..',
        children: []
      }
      backButton = <Item
        key={fakeFile.name}
        file={fakeFile}
        onClick={this.props.popDir} />
    }

    const filesList = this.props.node.children.map((file) => {
      return (
        <Item
          key={file.name}
          file={file}
          showSize
          showTimes
          showActions
          onClick={this.props.pushDir}
          />
      )
    })

    return (
      <div>
        <h1>{this.props.node.name}</h1>
        <h4>Path {this.props.node.path} with { this.props.node.children.length } visible childs.</h4>
        <div className={classes.table}>
          <div className={classesItem.wrapper}>
            <div className={classesItem.icon} />
            <div className={classesItem.title}>Name</div>
            <div className={classesItem.size}>Size</div>
            <div className={classesItem.created}>Created</div>
            <div className={classesItem.modified}>Modified</div>
            <div className={classesItem.actions}>Actions</div>
          </div>
          <div className={classes.tableContent}>
            {backButton}
            {filesList}
          </div>
        </div>
      </div>
    )
  },
  propTypes: {
    node: React.PropTypes.object.isRequired,
    lastUpdated: React.PropTypes.number.isRequired,
    path: React.PropTypes.array.isRequired,
    pushDir: React.PropTypes.func.isRequired,
    popDir: React.PropTypes.func.isRequired,
    tableFoldersShown: React.PropTypes.bool.isRequired
  }
})

export default FilesTable
