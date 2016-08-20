import React from 'react'
import Dropzone from 'react-dropzone'

import FilesTable from '../containers/FilesTableContainer'
import classes from './FilesView.scss'

const splatToPath = (splat) => splat.split('/').slice(1)

export const FilesView = React.createClass({
  componentWillMount () {
    // Set initial path based on url
    const path = splatToPath(this.props.routeParams.splat)
    this.props.changePath(path)
  },
  componentWillUpdate (nextProps) {
    const currentParamPath = '/files' + this.props.routeParams.splat
    const nextCurrentPath = nextProps.currentPath

    // Push new path to browser history if current path changed
    if (nextCurrentPath !== currentParamPath) {
      this.props.push(nextProps.currentPath)
    }
  },
  render () {
    const onDrop = (files) => {
      files.map((file) => {
        const fr = new FileReader()
        fr.addEventListener('loadend', () => {
          this.context.managr.fileAPI.create({
            name: file.name,
            path: [...this.props.path, file.name].join('/'),
            data: fr.result
          })
        })
        fr.readAsArrayBuffer(file)
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
    currentPath: React.PropTypes.string.isRequired,
    path: React.PropTypes.array.isRequired,
    push: React.PropTypes.func.isRequired
  },
  contextTypes: {
    managr: React.PropTypes.object.isRequired
  }
})

export default FilesView
