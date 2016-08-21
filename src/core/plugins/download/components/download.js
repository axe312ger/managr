import React from 'react'

export default React.createClass({
  render () {
    return <button onClick={this.read}>Download</button>
  },
  read () {
    this.context.managr.fileAPI.readAsDataURL(this.props.file)
      .then((dataURL, foo, bar) => {
        const link = document.createElement('a')
        link.download = this.props.file.name
        link.href = dataURL
        link.click()
      })
  },
  propTypes: {
    file: React.PropTypes.object.isRequired
  },
  contextTypes: {
    managr: React.PropTypes.object.isRequired
  }
})
