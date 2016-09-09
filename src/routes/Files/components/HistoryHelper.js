import React from 'react'

// @todo move to utils
const splitPath = (path) => path.split('/')
const splatToPath = (splat) => splitPath(splat).slice(1)

export const FilesView = React.createClass({
  componentWillMount () {
    this.props.changePath(splatToPath(this.props.routeParams.splat))
  },
  componentWillUpdate (nextProps) {
    // Push new path to browser history if current path changed
    if (this.props.pathURI !== nextProps.pathURI) {
      this.props.push(nextProps.pathURI)
    }
  },
  render () {
    return <div />
  },
  propTypes: {
    routeParams: React.PropTypes.object.isRequired,
    changePath: React.PropTypes.func.isRequired,
    pathURI: React.PropTypes.string.isRequired,
    push: React.PropTypes.func.isRequired
  }
})

export default FilesView
