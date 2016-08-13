import React from 'react'

import moment from 'moment'
import filesize from 'filesize'

import Icon from 'components/Icon'

import classes from './FilesTable.scss'

export const FilesTable = React.createClass({
  render () {
    if (!this.props.node.children) {
      return <div>Sorry, no files loaded yet</div>
    }

    const filesList = this.props.node.children.map((file) => {
      const size = filesize(file.stats.size, {bits: true})
      const times = {
        created: {
          default: moment(file.stats.created).format('MMMM Do YYYY, h:mm:ss a'),
          fromNow: moment(file.stats.created).fromNow()
        },
        modified: {
          default: moment(file.stats.modified).format('MMMM Do YYYY, h:mm:ss a'),
          fromNow: moment(file.stats.modified).fromNow()
        }
      }
      return (
        <tr key={file.name}>
          <td><Icon file={file} /></td>
          <td>{file.name}</td>
          <td>{'children' in file ? size : null}</td>
          <td title={times.created.default}>{times.created.fromNow}</td>
          <td title={times.modified.default}>{times.modified.fromNow}</td>
        </tr>
      )
    })

    return (
      <div>
        <h1>Working directory: {this.props.node.name}</h1>
        <h4>Contains { this.props.node.children.length } nodes.</h4>
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
