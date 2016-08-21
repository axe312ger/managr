import React from 'react'

export default React.createClass({
  render () {
    return <button onClick={this.read}>Download</button>
  },
  read () {
    if (this.props.file.stats.size > 1.5 * 1024 * 1024) {
      window.alert(
        [
          'This seems to be a pretty big file.',
          'Downloads are currently very limited to your browser.',
          'Lets see what happens!'
        ].join('\n')
      )
    }
    this.context.managr.fileAPI.readAsDataURL(this.props.file)
      .then((dataURL) => {
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
