import React from 'react'

import { distanceInWordsToNow, format } from 'date-fns'

const NodeTimestamp = React.createClass({
  render () {
    const title = format(this.props.timestamp, 'MMMM Do YYYY, h:mm:ss a')
    const value = distanceInWordsToNow(this.props.timestamp, { includeSeconds: true }) + ' ago'
    return (
      <div title={title}>
        {value}
      </div>
    )
  },
  propTypes: {
    timestamp: React.PropTypes.string
  }
})

export default NodeTimestamp
