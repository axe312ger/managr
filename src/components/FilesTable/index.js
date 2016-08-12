import React from 'react'

export const FilesTable = (props) => {
  console.log('props', props)

  if (!props.files.length) {
    return <div>Sorry, no files loaded yet</div>
  }

  const filesList = props.files.reduce((filesList, file) => {
    const actions = file.actions.reduce((actionList, action) => [
      ...actionList,
      <a href='#' key={action.id}>{action.title}</a>
    ], [])

    filesList.push(
      <tr key={file.filename}>
        <td>{file.filename}</td>
        <td>{actions}</td>
      </tr>
    )
    return filesList
  }, [])

  return (
    <div>
      <p>Last update: { props.lastUpdated }</p>
      <table>
        <tbody>
          { filesList }
        </tbody>
      </table>
    </div>
  )
}

FilesTable.propTypes = {
  files: React.PropTypes.array.isRequired,
  lastUpdated: React.PropTypes.number.isRequired
}

export default FilesTable
