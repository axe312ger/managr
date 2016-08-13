import React from 'react'

import { distanceInWordsToNow, format } from 'date-fns'
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
          default: format(file.stats.created, 'MMMM Do YYYY, h:mm:ss a'),
          fromNow: distanceInWordsToNow(file.stats.created, { includeSeconds: true }) + ' ago'
        },
        modified: {
          default: format(file.stats.modified, 'MMMM Do YYYY, h:mm:ss a'),
          fromNow: distanceInWordsToNow(file.stats.modified, { includeSeconds: true }) + ' ago'
        }
      }
      return (
        <tr key={file.name}>
          <td><Icon file={file} /></td>
          <td>{file.name}</td>
          <td>{'children' in file ? null : size}</td>
          <td title={times.created.default}>{times.created.fromNow}</td>
          <td title={times.modified.default}>{times.modified.fromNow}</td>
        </tr>
      )
    })

    return (
      <div>
        <h1>{this.props.node.name}</h1>
        <h4>Path {this.props.node.path} with { this.props.node.children.length } nodes.</h4>
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
