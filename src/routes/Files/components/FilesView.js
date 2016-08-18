import React from 'react'

import FilesTable from '../containers/FilesTableContainer'

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
  render: () => {
    return (
      <div>
        <FilesTable />
      </div>
    )
  },
  propTypes: {
    routeParams: React.PropTypes.object.isRequired,
    changePath: React.PropTypes.func.isRequired,
    currentPath: React.PropTypes.string.isRequired,
    push: React.PropTypes.func.isRequired
  }
})

export default FilesView
