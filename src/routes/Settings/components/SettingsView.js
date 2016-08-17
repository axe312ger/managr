import React from 'react'

const SettingsView = React.createClass({
  render () {
    const toggleHiddenFilesShown = this.props.hiddenFilesShown
      ? this.props.hideHiddenFiles : this.props.showHiddenFiles

    return (
      <div>
        <h1>Settings</h1>
        <input type='checkbox'
          onClick={toggleHiddenFilesShown}
          defaultChecked={this.props.hiddenFilesShown}
          id='hiddenFiles'
        />
        &nbsp;
        <label htmlFor='hiddenFiles'>Show hidden files</label>
      </div>
    )
  },
  propTypes: {
    showHiddenFiles: React.PropTypes.func.isRequired,
    hideHiddenFiles: React.PropTypes.func.isRequired,
    hiddenFilesShown: React.PropTypes.bool.isRequired
  }
})

export default SettingsView
