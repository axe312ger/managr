import React from 'react'
import Dropzone from 'react-dropzone'

import FilesTable from '../containers/FilesTableContainer'
import classes from './FilesView.scss'

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
        <Dropzone className={classes.dropzone} activeClassName={classes.dropzoneActive}
          ref='dropzone' disableClick multiple onDrop={onDrop}>
          <div className={classes.hint}>
            <p className={classes.hintDesktop}>
              <span>Upload files by dropping them into this area or by </span>
              <a onClick={onClick}>clicking here</a>
            </p>
            <p className={classes.hintMobile}>
              <a onClick={onClick}>Upload files by clicking here</a>
            </p>
          </div>
          <FilesTable />
        </Dropzone>
      </div>
    )
  },
  propTypes: {
    path: React.PropTypes.array.isRequired
  },
  contextTypes: {
    managr: React.PropTypes.object.isRequired
  }
})

export default FilesView
