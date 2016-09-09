import React from 'react'

const SettingsView = React.createClass({
  render () {
    const toggleHiddenFilesShown = this.props.hiddenFilesShown
      ? this.props.hideHiddenFiles : this.props.showHiddenFiles
    const toggleTableFoldersShown = this.props.tableFoldersShown
      ? this.props.tableHideFolders : this.props.tableShowFolders

    return (
      <div>
        <h1>Settings</h1>
        <ul>
          <li>
            <input type='checkbox'
              onClick={toggleHiddenFilesShown}
              defaultChecked={this.props.hiddenFilesShown}
              id='hiddenFiles'
            />
            &nbsp;
            <label htmlFor='hiddenFiles'>Show hidden files</label>
          </li>
          <li>
            <input type='checkbox'
              onClick={toggleTableFoldersShown}
              defaultChecked={this.props.tableFoldersShown}
              id='hiddenFolders'
            />
            &nbsp;
            <label htmlFor='hiddenFolders'>Show folders in main view</label>
          </li>
        </ul>
      </div>
    )
  },
  propTypes: {
    showHiddenFiles: React.PropTypes.func.isRequired,
    hideHiddenFiles: React.PropTypes.func.isRequired,
    hiddenFilesShown: React.PropTypes.bool.isRequired,
    tableShowFolders: React.PropTypes.func.isRequired,
    tableHideFolders: React.PropTypes.func.isRequired,
    tableFoldersShown: React.PropTypes.bool.isRequired
  }
})

export default SettingsView
