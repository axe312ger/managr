import React from 'react'

export const FilesTable = React.createClass({
  render () {
    if (!this.props.node.children) {
      return <div>Sorry, no files loaded yet</div>
    }

    const filesList = this.props.node.children.map((file) => {
      return (
        <tr key={file.name}>
          <td>{file.name}</td>
        </tr>
      )
    })

    return (
      <div>
        <p>Last update: { this.props.lastUpdated }</p>
        <table>
          <tbody>
            { filesList }
          </tbody>
        </table>
      </div>
    )
  },
  componentWillMount: function () {
    this.props.getTree()
  },
  propTypes: {
    node: React.PropTypes.object.isRequired,
    lastUpdated: React.PropTypes.number.isRequired,
    getTree: React.PropTypes.func.isRequired
  }
})

export default FilesTable
