import React from 'react'

export default React.createClass({
  render () {
    return <button onClick={this.delete}>Delete</button>
  },
  delete () {
    this.context.managr.fileAPI.delete(this.props.file)
  },
  propTypes: {
    file: React.PropTypes.object.isRequired
  },
  contextTypes: {
    managr: React.PropTypes.object.isRequired
  }
})
