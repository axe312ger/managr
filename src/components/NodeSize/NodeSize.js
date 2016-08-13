import React from 'react'

import filesize from 'filesize'

const NodeSize = React.createClass({
  render () {
    const humanReadable = filesize(this.props.size)
    const title = filesize(this.props.size, {exponent: 0})
    return (
      <div title={title}>
        {humanReadable}
      </div>
    )
  },
  propTypes: {
    size: React.PropTypes.number
  }
})

export default NodeSize
