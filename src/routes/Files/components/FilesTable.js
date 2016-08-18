import React from 'react'
import Async from 'babel!react-promise'

import Icon from 'components/Icon'
import NodeTitle from 'components/NodeTitle'
import NodeTimestamp from 'components/NodeTimestamp'
import NodeSize from 'components/NodeSize'
import { isNode } from 'services/datastructure'

import classes from './FilesTable.scss'

export const FilesTable = React.createClass({
  getActionComponents (file) {
    const name = file.name
    const mime = file.stats.mime

    return this.props.fileActions
      .filter((action) => {
        const target = new RegExp(action.target)
        const selector = new RegExp(action.selector)
        return target.test(name) && (mime ? selector.test(mime) : true)
      })
      .map((action) => {
        const promise = this.context.fileActions[action.id].getComponent()
        const render = (component) => component
        return <Async key={action.id} promise={promise} then={render} />
      })
  },
  render () {
    if (!this.props.node.children) {
      return <div>Sorry, no files loaded yet</div>
    }

    const filesList = this.props.node.children.map((file) => {
      const size = isNode(file) ? null : <NodeSize size={file.stats.size} />
      const actions = this.getActionComponents(file)

      return (
        <tr key={file.name}>
          <td><Icon file={file} /></td>
          <td><NodeTitle file={file} /></td>
          <td>{size}</td>
          <td><NodeTimestamp timestamp={file.stats.created} /></td>
          <td><NodeTimestamp timestamp={file.stats.modified} /></td>
          <td>{actions}</td>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { filesList }
          </tbody>
        </table>
      </div>
    )
  },
  propTypes: {
    node: React.PropTypes.object.isRequired,
    lastUpdated: React.PropTypes.number.isRequired,
    fileActions: React.PropTypes.array.isRequired
  },
  contextTypes: {
    fileActions: React.PropTypes.object.isRequired
  }
})

export default FilesTable
