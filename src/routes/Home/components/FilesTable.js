import React from 'react'

import Icon from 'components/Icon'
import NodeTitle from 'components/NodeTitle'
import NodeTimestamp from 'components/NodeTimestamp'
import NodeSize from 'components/NodeSize'
import { isFolder } from 'services/datastructure'

import classes from './FilesTable.scss'

export const FilesTable = React.createClass({
  render () {
    if (!this.props.node.children) {
      return <div>Sorry, no files loaded yet</div>
    }

    const filesList = this.props.node.children.map((file) => {
      const size = isFolder(file) ? null : <NodeSize size={file.stats.size} />
      return (
        <tr key={file.name}>
          <td><Icon file={file} /></td>
          <td><NodeTitle file={file} /></td>
          <td>{size}</td>
          <td><NodeTimestamp timestamp={file.stats.created} /></td>
          <td><NodeTimestamp timestamp={file.stats.modified} /></td>
        </tr>
      )
    })

    return (
      <div>
        <h1>{this.props.node.name}</h1>
        <h4>Path {this.props.node.path} with { this.props.node.children.length } visible childs.</h4>
        <table className={classes.table}>
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Size</th>
              <th>Created</th>
              <th>Modified</th>
            </tr>
          </thead>
          <tbody>
            { filesList }
          </tbody>
        </table>
      </div>
    )
  },
  componentWillMount: function () {
    this.props.getTree()
  },
  propTypes: {
    node: React.PropTypes.object.isRequired,
    lastUpdated: React.PropTypes.number.isRequired,
    getTree: React.PropTypes.func.isRequired
  }
})

export default FilesTable
