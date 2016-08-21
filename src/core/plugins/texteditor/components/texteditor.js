import React from 'react'

export default React.createClass({
  render () {
    return <button onClick={this.edit}>Edit</button>
  },
  edit () {
    this.context.managr.fileAPI.readAsText(this.props.file)
      .then((text) => {
        window.alert(text)
      })
  },
  propTypes: {
    file: React.PropTypes.object.isRequired
  },
  contextTypes: {
    managr: React.PropTypes.object.isRequired
  }
})
