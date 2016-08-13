import React from 'react'

export const FilesTable = React.createClass({
  render () {
    if (!this.props.files.children) {
      return <div>Sorry, no files loaded yet</div>
    }

    const filesList = this.props.files.children.reduce((filesList, file) => {
      filesList.push(
        <tr key={file.name}>
          <td>{file.name}</td>
        </tr>
      )
      return filesList
    }, [])

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
    files: React.PropTypes.object.isRequired,
    lastUpdated: React.PropTypes.number.isRequired,
    getTree: React.PropTypes.func.isRequired
  }
})

export default FilesTable
