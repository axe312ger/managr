import React from 'react'

import classes from './NodeTitle.scss'

const NodeTitle = React.createClass({
  render () {
    return (
      <div className={classes.title} title={this.props.file.name}>
        {this.props.file.name}
      </div>
    )
  },
  propTypes: {
    file: React.PropTypes.object
  }
})

export default NodeTitle
