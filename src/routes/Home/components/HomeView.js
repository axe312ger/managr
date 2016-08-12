import React from 'react'

import FilesTable from '../containers/FilesTableContainer'

import DuckImage from '../assets/Duck.jpg'
import classes from './HomeView.scss'

export const HomeView = React.createClass({
  render: () => (
    <div>
      <h4>Welcome!</h4>
      <img
        alt='This is a duck, because Redux!'
        className={classes.duck}
        src={DuckImage} />
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
