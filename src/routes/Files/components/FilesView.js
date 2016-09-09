import React from 'react'
import Dropzone from 'react-dropzone'

import FilesTable from '../containers/FilesTableContainer'
import classes from './FilesView.scss'
import HistoryHelper from './HistoryHelper'

export const FilesView = React.createClass({
  render () {
    const onDrop = (files) => {
      files.map((file) => {
        const path = [...this.props.path, file.name].join('/')
        this.context.managr.fileAPI.create(file, path)
      })
    }
    const onClick = () => {
      this.refs.dropzone.open()
    }
    return (
      <div>
        <HistoryHelper
          routeParams={this.props.routeParams}
          changePath={this.props.changePath}
          pathURI={this.props.pathURI}
          push={this.props.push}
        />
        <Dropzone className={classes.dropzone} activeClassName={classes.dropzoneActive}
          ref='dropzone' disableClick multiple onDrop={onDrop}>
          <div className={classes.hint}>
            <span>Upload files by dropping them into this area or by </span>
            <a onClick={onClick}>clicking here</a>
          </div>
          <FilesTable />
        </Dropzone>
      </div>
    )
  },
  propTypes: {
    routeParams: React.PropTypes.object.isRequired,
    changePath: React.PropTypes.func.isRequired,
    pathURI: React.PropTypes.string.isRequired,
    path: React.PropTypes.array.isRequired,
    push: React.PropTypes.func.isRequired
  },
  contextTypes: {
    managr: React.PropTypes.object.isRequired
  }
})

export default FilesView
