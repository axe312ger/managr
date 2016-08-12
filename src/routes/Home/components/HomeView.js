import React from 'react'

import FilesTable from '../containers/FilesTableContainer'

export const HomeView = React.createClass({
  render: () => (
    <div>
      <h4>Welcome!</h4>
      <FilesTable />
    </div>
  ),
  componentWillMount: function () {
    this.props.loadFiles()
  },
  propTypes: {
    loadFiles: React.PropTypes.func.isRequired
  }
})

export default HomeView
