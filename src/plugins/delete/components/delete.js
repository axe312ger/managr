import React from 'react'

const del = React.createClass({
  render () {
    return <button onClick={this.delete}>Delete</button>
  },
  delete () {
    this.context.socket.emit('file/delete', {
      name: this.props.file.name,
      path: this.props.path
    })
  },
  propTypes: {
    file: React.PropTypes.object.isRequired,
    path: React.PropTypes.array.isRequired
  },
  contextTypes: {
    socket: React.PropTypes.object.isRequired
  }
})

export default del
