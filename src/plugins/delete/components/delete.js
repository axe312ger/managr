import React from 'react'

export default React.createClass({
  render () {
    return <button onClick={this.delete}>Delete</button>
  },
  delete () {
    this.context.socket.emit('file/delete', this.props.file)
  },
  propTypes: {
    file: React.PropTypes.object.isRequired
  },
  contextTypes: {
    socket: React.PropTypes.object.isRequired
  }
})
