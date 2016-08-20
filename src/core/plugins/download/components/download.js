import React from 'react'

export default React.createClass({
  render () {
    return <button onClick={this.read}>Download</button>
  },
  read () {
    this.context.managr.fileAPI.read(this.props.file)
  },
  propTypes: {
    file: React.PropTypes.object.isRequired
  },
  contextTypes: {
    managr: React.PropTypes.object.isRequired
  }
})
