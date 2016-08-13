import React from 'react'

import FilesTable from '../containers/FilesTableContainer'

export const HomeView = React.createClass({
  render: () => (
    <div>
      <h4>Welcome!</h4>
      <FilesTable />
    </div>
  )
})

export default HomeView
